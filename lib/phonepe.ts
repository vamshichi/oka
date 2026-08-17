// lib/phonepe.ts

import crypto from "crypto";

export type PhonePeEnvironment = "SANDBOX" | "PRODUCTION";

const environment: PhonePeEnvironment =
  process.env.PHONEPE_ENV === "PRODUCTION"
    ? "PRODUCTION"
    : "SANDBOX";

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is missing`);
  }

  return value;
}

export function getPhonePeConfig() {
  return {
    clientId: getRequiredEnv("PHONEPE_CLIENT_ID"),
    clientSecret: getRequiredEnv("PHONEPE_CLIENT_SECRET"),
    clientVersion: getRequiredEnv("PHONEPE_CLIENT_VERSION"),
    environment,
    appUrl: getRequiredEnv("NEXT_PUBLIC_APP_URL"),
  };
}

/**
 * PhonePe Standard Checkout base URLs.
 *
 * Sandbox:
 * https://api-preprod.phonepe.com/apis/pg-sandbox
 *
 * Production:
 * Payment APIs:
 * https://api.phonepe.com/apis/pg
 */
export function getPhonePeBaseUrl(): string {
  if (environment === "PRODUCTION") {
    return "https://api.phonepe.com/apis/pg";
  }

  return "https://api-preprod.phonepe.com/apis/pg-sandbox";
}

/**
 * OAuth endpoint is different for production.
 */
export function getPhonePeAuthUrl(): string {
  if (environment === "PRODUCTION") {
    return "https://api.phonepe.com/apis/identity-manager/v1/oauth/token";
  }

  return "https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token";
}

/**
 * Generate a unique merchant order ID.
 */
export function generateMerchantOrderId(): string {
  const random = crypto.randomBytes(6).toString("hex");

  return `OAK_${Date.now()}_${random}`;
}

/**
 * Get OAuth access token from PhonePe.
 */
export async function getPhonePeAccessToken(): Promise<string> {
  const config = getPhonePeConfig();

  const body = new URLSearchParams();

  body.append("client_id", config.clientId);
  body.append("client_version", config.clientVersion);
  body.append("client_secret", config.clientSecret);
  body.append("grant_type", "client_credentials");

  const response = await fetch(getPhonePeAuthUrl(), {
    method: "POST",

    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },

    body: body.toString(),

    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("PhonePe authentication failed:", data);

    throw new Error(
      data?.message ||
        data?.error ||
        "PhonePe authentication failed"
    );
  }

  if (!data?.access_token) {
    throw new Error(
      "PhonePe did not return an access token"
    );
  }

  return data.access_token;
}

/**
 * Create PhonePe Standard Checkout order.
 */
export async function createPhonePePayment(params: {
  merchantOrderId: string;
  amount: number;
  customerName: string;
  email: string;
  mobile: string;
  ticketType: string;
  ticketName: string;
  quantity: number;
}) {
  const config = getPhonePeConfig();

  const accessToken = await getPhonePeAccessToken();

  const payload = {
    merchantOrderId: params.merchantOrderId,

    amount: params.amount,

    paymentFlow: {
      type: "PG_CHECKOUT",
    },

    expireAfter: 1200,

    metaInfo: {
  udf1: params.customerName,
  udf2: params.email,
  udf3: params.mobile,
  udf4: params.ticketType,
  udf5: String(params.quantity),
},

    redirectUrl: `${config.appUrl}/payment/success?orderId=${encodeURIComponent(
      params.merchantOrderId
    )}`,

    redirectMode: "REDIRECT",
  };

  const response = await fetch(
    `${getPhonePeBaseUrl()}/checkout/v2/pay`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Authorization: `O-Bearer ${accessToken}`,
      },

      body: JSON.stringify(payload),

      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("PhonePe payment creation failed:", data);

    throw new Error(
      data?.message ||
        data?.error ||
        "Unable to create PhonePe payment"
    );
  }

  return data;
}

export async function getPhonePeOrderStatus(
  merchantOrderId: string
) {
  const accessToken = await getPhonePeAccessToken();

  const response = await fetch(
    `${getPhonePeBaseUrl()}/checkout/v2/order/${encodeURIComponent(
      merchantOrderId
    )}/status`,
    {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `O-Bearer ${accessToken}`,
      },

      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error(
      "PhonePe status API failed:",
      data
    );

    throw new Error(
      data?.message ||
        data?.error ||
        "Unable to verify PhonePe payment"
    );
  }

  return data;
}
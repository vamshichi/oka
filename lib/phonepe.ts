// lib/phonepe.ts

import crypto from "crypto";

export type PhonePeEnvironment =
  | "SANDBOX"
  | "PRODUCTION";

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
    clientId: getRequiredEnv(
      "PHONEPE_CLIENT_ID"
    ),

    clientSecret: getRequiredEnv(
      "PHONEPE_CLIENT_SECRET"
    ),

    clientVersion: getRequiredEnv(
      "PHONEPE_CLIENT_VERSION"
    ),

    environment,

    appUrl: getRequiredEnv(
      "NEXT_PUBLIC_APP_URL"
    ),
  };
}

export function getPhonePeBaseUrl(): string {
  if (environment === "PRODUCTION") {
    return "https://api.phonepe.com/apis/pg";
  }

  return "https://api-preprod.phonepe.com/apis/pg-sandbox";
}

export function getPhonePeAuthUrl(): string {
  if (environment === "PRODUCTION") {
    return "https://api.phonepe.com/apis/identity-manager/v1/oauth/token";
  }

  return "https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token";
}

export function generateMerchantOrderId(): string {
  const random =
    crypto.randomBytes(6).toString("hex");

  return `OAK_${Date.now()}_${random}`;
}

export async function getPhonePeAccessToken(): Promise<string> {
  const config = getPhonePeConfig();

  const body = new URLSearchParams();

  body.append(
    "client_id",
    config.clientId
  );

  body.append(
    "client_version",
    config.clientVersion
  );

  body.append(
    "client_secret",
    config.clientSecret
  );

  body.append(
    "grant_type",
    "client_credentials"
  );

  const response = await fetch(
    getPhonePeAuthUrl(),
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },

      body: body.toString(),

      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error(
      "PhonePe authentication failed:",
      data
    );

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

  console.log("========== PHONEPE PAYMENT ==========");
  console.log("Environment:", config.environment);
  console.log("Base URL:", getPhonePeBaseUrl());
  console.log("Auth URL:", getPhonePeAuthUrl());
  console.log("App URL:", config.appUrl);
  console.log("Client ID:", config.clientId);
  console.log("Client Version:", config.clientVersion);
  console.log("Merchant Order ID:", params.merchantOrderId);
  console.log("Amount:", params.amount);
  console.log("======================================");

  const accessToken = await getPhonePeAccessToken();

  console.log("PhonePe access token received");

  const appUrl = config.appUrl.replace(/\/+$/, "");

const redirectUrl =
  `${appUrl}/payment/success?orderId=` +
  encodeURIComponent(
    params.merchantOrderId
  );

  const payload = {
    merchantOrderId: params.merchantOrderId,

    amount: params.amount,

    expireAfter: 1200,

    metaInfo: {
      udf1: params.customerName,
      udf2: params.email,
      udf3: params.mobile,
      udf4: params.ticketType,
      udf5: String(params.quantity),
    },

    paymentFlow: {
      type: "PG_CHECKOUT",

      merchantUrls: {
        redirectUrl,
      },
    },
  };

  console.log(
    "PhonePe payload:",
    JSON.stringify(payload, null, 2)
  );

  const paymentUrl =
    `${getPhonePeBaseUrl()}/checkout/v2/pay`;

  console.log(
    "Calling PhonePe payment API:",
    paymentUrl
  );

  const response = await fetch(paymentUrl, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `O-Bearer ${accessToken}`,
    },

    body: JSON.stringify(payload),

    cache: "no-store",
  });

  const rawResponse = await response.text();

  console.log(
    "PhonePe HTTP status:",
    response.status
  );

  console.log(
    "PhonePe raw response:",
    rawResponse
  );

  let data: any;

  try {
    data = JSON.parse(rawResponse);
  } catch {
    throw new Error(
      `PhonePe returned invalid JSON. HTTP ${response.status}`
    );
  }

  if (!response.ok) {
    console.error(
      "PhonePe payment creation failed:",
      data
    );

    throw new Error(
      data?.message ||
        data?.error ||
        data?.code ||
        `PhonePe payment failed with HTTP ${response.status}`
    );
  }

  if (!data?.redirectUrl) {
    console.error(
      "PhonePe response does not contain redirectUrl:",
      data
    );

    throw new Error(
      "PhonePe did not return a checkout URL"
    );
  }

  console.log(
    "PhonePe payment created successfully"
  );

  console.log(
    "Redirect URL received:",
    data.redirectUrl
  );

  return data;
}

export async function getPhonePeOrderStatus(
  merchantOrderId: string
) {
  const accessToken =
    await getPhonePeAccessToken();

  const response = await fetch(
    `${getPhonePeBaseUrl()}/checkout/v2/order/${encodeURIComponent(
      merchantOrderId
    )}/status`,
    {
      method: "GET",

      headers: {
        "Content-Type":
          "application/json",

        Authorization:
          `O-Bearer ${accessToken}`,
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
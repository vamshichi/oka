import crypto from "crypto";

export interface PaymentOrderData {
  merchantOrderId: string;

  customerName: string;
  customerEmail: string;
  mobile: string;

  ticketType: string;
  ticketName: string;

  quantity: number;
  amount: number;
}

function getSecret(): string {
  const secret = process.env.PAYMENT_ORDER_SECRET;

  if (!secret) {
    throw new Error(
      "PAYMENT_ORDER_SECRET is missing"
    );
  }

  return secret;
}

function base64UrlEncode(value: string): string {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64UrlDecode(value: string): string {
  return Buffer.from(
    value.replace(/-/g, "+").replace(/_/g, "/"),
    "base64"
  ).toString("utf8");
}

function createSignature(payload: string): string {
  return crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");
}

export function createPaymentOrderToken(
  data: PaymentOrderData
): string {
  const payload = base64UrlEncode(
    JSON.stringify(data)
  );

  const signature =
    createSignature(payload);

  return `${payload}.${signature}`;
}

export function verifyPaymentOrderToken(
  token: string
): PaymentOrderData | null {
  try {
    const [payload, signature] =
      token.split(".");

    if (!payload || !signature) {
      return null;
    }

    const expectedSignature =
      createSignature(payload);

    const signatureBuffer =
      Buffer.from(signature);

    const expectedBuffer =
      Buffer.from(expectedSignature);

    if (
      signatureBuffer.length !==
      expectedBuffer.length
    ) {
      return null;
    }

    if (
      !crypto.timingSafeEqual(
        signatureBuffer,
        expectedBuffer
      )
    ) {
      return null;
    }

    const data = JSON.parse(
      base64UrlDecode(payload)
    ) as PaymentOrderData;

    return data;
  } catch {
    return null;
  }
}
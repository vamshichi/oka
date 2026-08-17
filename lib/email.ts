import nodemailer from "nodemailer";

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is missing`);
  }

  return value.trim();
}

const transporter = nodemailer.createTransport({
  host: getRequiredEnv("SMTP_HOST"),

  port: Number(
    getRequiredEnv("SMTP_PORT")
  ),

  secure:
    process.env.SMTP_SECURE === "true",

  auth: {
    user: getRequiredEnv("SMTP_USER"),
    pass: getRequiredEnv("SMTP_PASS"),
  },
});

export interface PaymentEmailData {
  customerName: string;
  customerEmail: string;
  mobile: string;

  ticketName: string;
  ticketType: string;

  quantity: number;

  amount: number;

  merchantOrderId: string;

  phonePeOrderId: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendPaymentConfirmationEmail(
  data: PaymentEmailData
) {
  const smtpUser =
    getRequiredEnv("SMTP_USER");

  const notificationEmail =
    getRequiredEnv(
      "PAYMENT_NOTIFICATION_EMAIL"
    );

  const amountFormatted =
    `₹${data.amount.toLocaleString("en-IN")}`;

  /*
   * --------------------------------------------
   * EMAIL TO YOU
   * --------------------------------------------
   */

  await transporter.sendMail({
    from: `"The OAK Project" <${smtpUser}>`,

    to: notificationEmail,

    subject: `New Ticket Payment - ${data.ticketName}`,

    html: `
      <div style="
        font-family: Arial, sans-serif;
        background: #f4f4f4;
        padding: 30px;
      ">

        <div style="
          max-width: 650px;
          margin: auto;
          background: white;
          padding: 30px;
          border-radius: 12px;
        ">

          <h1 style="
            margin: 0;
            color: #111;
          ">
            The OAK Project
          </h1>

          <p style="
            color: #b08a3c;
            font-weight: bold;
            letter-spacing: 2px;
          ">
            NEW PAYMENT
          </p>

          <hr />

          <h2>Customer Details</h2>

          <p>
            <strong>Name:</strong>
            ${escapeHtml(data.customerName)}
          </p>

          <p>
            <strong>Email:</strong>
            ${escapeHtml(data.customerEmail)}
          </p>

          <p>
            <strong>Mobile:</strong>
            ${escapeHtml(data.mobile)}
          </p>

          <h2>Ticket Details</h2>

          <p>
            <strong>Pass:</strong>
            ${escapeHtml(data.ticketName)}
          </p>

          <p>
            <strong>Quantity:</strong>
            ${data.quantity}
          </p>

          <p>
            <strong>Amount:</strong>
            ${amountFormatted}
          </p>

          <h2>Payment Details</h2>

          <p>
            <strong>Merchant Order ID:</strong>
            ${escapeHtml(data.merchantOrderId)}
          </p>

          <p>
            <strong>PhonePe Order ID:</strong>
            ${escapeHtml(data.phonePeOrderId)}
          </p>

          <div style="
            margin-top: 25px;
            padding: 15px;
            background: #ecfdf5;
            color: #166534;
            border-radius: 8px;
            font-weight: bold;
          ">
            Payment Status: SUCCESS
          </div>

        </div>
      </div>
    `,
  });

  /*
   * --------------------------------------------
   * EMAIL TO CUSTOMER
   * --------------------------------------------
   */

  await transporter.sendMail({
    from: `"The OAK Project" <${smtpUser}>`,

    to: data.customerEmail,

    subject: `Payment Successful - ${data.ticketName}`,

    html: `
      <div style="
        font-family: Arial, sans-serif;
        background: #090909;
        padding: 40px 20px;
      ">

        <div style="
          max-width: 600px;
          margin: auto;
          background: #11110f;
          color: #f5f1e8;
          padding: 35px;
          border-radius: 14px;
        ">

          <p style="
            color: #c9a45c;
            text-transform: uppercase;
            letter-spacing: 3px;
            font-size: 12px;
            font-weight: bold;
          ">
            The OAK Project
          </p>

          <h1 style="
            font-family: Georgia, serif;
            font-size: 34px;
          ">
            Payment Successful
          </h1>

          <p style="
            color: #b8b3aa;
            line-height: 1.7;
          ">
            Hello ${escapeHtml(data.customerName)},
          </p>

          <p style="
            color: #b8b3aa;
            line-height: 1.7;
          ">
            Thank you for being part of The OAK Project.
            Your payment has been successfully verified.
          </p>

          <div style="
            margin-top: 30px;
            padding: 20px;
            border: 1px solid #332f26;
            border-radius: 10px;
          ">

            <p>
              <strong>Pass:</strong>
              ${escapeHtml(data.ticketName)}
            </p>

            <p>
              <strong>Quantity:</strong>
              ${data.quantity}
            </p>

            <p>
              <strong>Amount Paid:</strong>
              ${amountFormatted}
            </p>

            <p>
              <strong>PhonePe Order ID:</strong><br />
              ${escapeHtml(data.phonePeOrderId)}
            </p>

          </div>

          <p style="
            margin-top: 30px;
            color: #b8b3aa;
            line-height: 1.7;
          ">
            We look forward to having you with us.
          </p>

          <p style="
            color: #c9a45c;
            font-weight: bold;
          ">
            The OAK Project
          </p>

        </div>

      </div>
    `,
  });
}
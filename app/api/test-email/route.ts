import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET() {
  try {
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 465);
    const secure = process.env.SMTP_SECURE === "true";
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.PAYMENT_NOTIFICATION_EMAIL;

    if (!host || !user || !pass || !to) {
      return NextResponse.json(
        {
          success: false,
          message: "SMTP environment variables are missing.",
          debug: {
            host: !!host,
            user: !!user,
            pass: !!pass,
            to: !!to,
          },
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    await transporter.verify();

    const result = await transporter.sendMail({
      from: `"The OAK Project" <${user}>`,
      to,
      subject: "OAK Project - Test Email",
      text: "This is a test email from The OAK Project payment system.",
      html: `
        <h2>The OAK Project</h2>
        <p>SMTP email is working successfully.</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully.",
      messageId: result.messageId,
    });
  } catch (error) {
    console.error("TEST EMAIL ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Email failed.",
      },
      { status: 500 }
    );
  }
}
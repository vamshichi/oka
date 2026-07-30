import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      phone,
      email,
      eventType,
      message,
    } = body;

    if (!name || !phone || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Please fill all required fields." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"The OAK Project Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `New Booking Enquiry - ${eventType || "General"}`,
      html: `
      <div style="font-family:Arial,sans-serif;padding:20px">

        <h2 style="color:#b08d57">
          New Booking Enquiry
        </h2>

        <table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse;width:100%">
          <tr>
            <td><strong>Name</strong></td>
            <td>${name}</td>
          </tr>

          <tr>
            <td><strong>Phone</strong></td>
            <td>${phone}</td>
          </tr>

          <tr>
            <td><strong>Email</strong></td>
            <td>${email}</td>
          </tr>

          <tr>
            <td><strong>Event Type</strong></td>
            <td>${eventType}</td>
          </tr>

          <tr>
            <td><strong>Message</strong></td>
            <td>${message.replace(/\n/g, "<br/>")}</td>
          </tr>

        </table>

      </div>
      `,
    });

    // Confirmation mail to customer
    await transporter.sendMail({
      from: `"The OAK Project" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We've received your enquiry",
      html: `
      <div style="font-family:Arial,sans-serif;padding:20px">
        <h2>Thank you, ${name}!</h2>

        <p>
          We have received your enquiry and will contact you shortly.
        </p>

        <br/>

        <strong>Your Details</strong>

        <p>
          Event: ${eventType}
        </p>

        <p>
          Phone: ${phone}
        </p>

        <br/>

        <p>
          Blessings,<br/>
          <strong>The OAK Project</strong>
        </p>
      </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to send email.",
      },
      {
        status: 500,
      }
    );
  }
}
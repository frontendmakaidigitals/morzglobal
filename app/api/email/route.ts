import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");

export async function POST(req: Request) {
  const raw = await req.json();
  const date = new Date().toISOString().split("T")[0];

  try {
    await resend.emails.send({
      from:    "MORZ Global Website <noreply@morzglobal.com>",
      to:      "info@morzglobal.com",
      subject: `New Enquiry: ${raw.inquiryType || "Contact Form"} — ${raw.firstName} ${raw.lastName}`,
      html: `
        <h3>New Website Enquiry</h3>
        <p><b>Name:</b> ${raw.firstName} ${raw.lastName}</p>
        <p><b>Email:</b> ${raw.email}</p>
        <p><b>Phone:</b> ${raw.phone || "N/A"}</p>
        <p><b>Country:</b> ${raw.country || "N/A"}</p>
        <p><b>Type of Inquiry:</b> ${raw.inquiryType || "N/A"}</p>
        <p><b>Message:</b> ${raw.message || "N/A"}</p>
        <p><b>Newsletter:</b> ${raw.newsletter ? "Yes" : "No"}</p>
        <p><b>Date:</b> ${date}</p>
      `,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend error:", error);
    return new NextResponse("Failed to send", { status: 500 });
  }
}
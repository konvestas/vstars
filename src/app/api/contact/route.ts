import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, subject, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS,
            },
        });

        const year = new Date().getFullYear();

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            replyTo: email,
            subject: `📩 New Message: ${subject}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>Yeni Iletisim Mesaji</title>
                </head>
                <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1f2937; margin: 0; padding: 0; background-color: #f3f4f6;">
                    
                    <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                        
                        <div style="padding: 24px 30px; border-bottom: 1px solid #e5e7eb;">
                            <h2 style="margin: 0; font-size: 20px; font-weight: 600; color: #111827;">Yeni Mesaj</h2>
                            <p style="margin: 4px 0 0 0; font-size: 14px; color: #6b7280;">Vstars Websitesinden Ulasildi</p>
                        </div>

                        <div style="padding: 30px;">
                            
                            <h3 style="margin: 0 0 16px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #9ca3af;">Sender Details</h3>
                            
                            <table style="width: 100%; border-collapse: separate; border-spacing: 0;">
                                <tr>
                                    <td style="padding: 8px 0; width: 80px; font-size: 14px; color: #6b7280;">Isim:</td>
                                    <td style="padding: 8px 0; font-size: 15px; font-weight: 500; color: #111827;">${name}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; width: 80px; font-size: 14px; color: #6b7280;">Email:</td>
                                    <td style="padding: 8px 0; font-size: 15px; font-weight: 500;">
                                        <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; width: 80px; font-size: 14px; color: #6b7280;">Konu:</td>
                                    <td style="padding: 8px 0; font-size: 15px; font-weight: 500; color: #111827;">${subject}</td>
                                </tr>
                            </table>

                            <div style="border-top: 1px solid #f3f4f6; margin: 24px 0;"></div>

                            <h3 style="margin: 0 0 12px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #9ca3af;">Mesaj</h3>
                            
                            <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 20px; font-size: 15px; color: #374151;">
                                ${message.replace(/\n/g, '<br>')}
                            </div>

                            <div style="margin-top: 30px;">
                                <a href="mailto:${email}?subject=Re: ${subject}" style="display: inline-block; background-color: #111827; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 500; font-size: 14px;">Reply to ${name}</a>
                            </div>

                        </div>

                        <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                                © ${year} Vstars Transfer
                            </p>
                        </div>

                    </div>
                </body>
                </html>
            `,
        });

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error("Contact API Error:", error);
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }
}
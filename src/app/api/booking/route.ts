import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {fullName, phone, email, flightNumber, notes, bookingType, direction, duration, fromLocation, toLocation, dateInfo,
            passengers, luggage, passportPhoto, calculatedPrice,
        } = body;

        // Validation
        if (!fullName || !phone || !fromLocation || !dateInfo?.date || !dateInfo?.time) {
            return NextResponse.json({ error: "Missing required booking details" }, { status: 400 });
        }

        const formattedDate = new Date(dateInfo.date).toLocaleDateString('en-GB', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });

        // Transporter
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

        // Determine Rows based on booking type
        let routeRow = '';

        if (bookingType === "Transfer") {
            // Regular Transfer: Show pickup and dropoff
            routeRow = `<tr>
                <td style="padding: 8px 0; width: 80px; font-size: 14px; color: #6b7280;">Alış noktası:</td>
                <td style="padding: 8px 0; font-size: 15px; font-weight: 500;">${fromLocation || 'Not specified'}</td>
               </tr>
               <tr>
                <td style="padding: 8px 0; width: 80px; font-size: 14px; color: #6b7280;">Bırakış noktası:</td>
                <td style="padding: 8px 0; font-size: 15px; font-weight: 500;">${toLocation || 'Not specified'}</td>
               </tr>`;
        } else if (bookingType === "Airport Transfer") {
            // Airport Transfer: Show direction, pickup and dropoff
            const directionLabel = direction === "from-airport"
                ? "Havalimanından"
                : direction === "to-airport"
                    ? "Havalimanına"
                    : "Belirtilmemiş";

            routeRow = `<tr>
                <td style="padding: 8px 0; width: 80px; font-size: 14px; color: #6b7280;">Yön:</td>
                <td style="padding: 8px 0; font-size: 15px; font-weight: 500;">${directionLabel}</td>
               </tr>
               <tr>
                <td style="padding: 8px 0; width: 80px; font-size: 14px; color: #6b7280;">Alış noktası:</td>
                <td style="padding: 8px 0; font-size: 15px; font-weight: 500;">${fromLocation || 'Not specified'}</td>
               </tr>
               <tr>
                <td style="padding: 8px 0; width: 80px; font-size: 14px; color: #6b7280;">Bırakış noktası:</td>
                <td style="padding: 8px 0; font-size: 15px; font-weight: 500;">${toLocation || 'Not specified'}</td>
               </tr>`;
        } else if (bookingType === "Hourly Hire") {
            // Hourly: Show pickup and duration
            routeRow = `<tr>
                <td style="padding: 8px 0; width: 80px; font-size: 14px; color: #6b7280;">Alış noktası:</td>
                <td style="padding: 8px 0; font-size: 15px; font-weight: 500;">${fromLocation || 'Not specified'}</td>
               </tr>
               <tr>
                <td style="padding: 8px 0; width: 80px; font-size: 14px; color: #6b7280;">Süre:</td>
                <td style="padding: 8px 0; font-size: 15px; font-weight: 500;">${duration || '0'} Saat</td>
               </tr>`;
        }

        // Handle Attachments
        const attachments = [];
        if (passportPhoto && passportPhoto.data) {
            // Remove data:image/xxx;base64, header if present
            const base64Data = passportPhoto.data.includes(',')
                ? passportPhoto.data.split(',')[1]
                : passportPhoto.data;

            attachments.push({
                filename: passportPhoto.filename || 'passport.jpg',
                content: base64Data,
                encoding: 'base64',
                contentType: passportPhoto.mimeType || 'image/jpeg'
            });
        }

        // --- EMAIL TEMPLATE (White Theme) ---
        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Yeni Rezervasyon İsteği </title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1f2937; margin: 0; padding: 0; background-color: #f3f4f6;">
            
            <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                
                <div style="padding: 24px 30px; border-bottom: 1px solid #e5e7eb;">
                    <h2 style="margin: 0; font-size: 20px; font-weight: 600; color: #111827;">Yeni rezervasyon isteği tipi</h2>
                    <div style="margin-top:8px;">
                        <span style="background-color: #111827; color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; text-transform: uppercase;">${bookingType}</span>
                        ${bookingType === "Airport Transfer" && direction ? `
                        <span style="background-color: #2563eb; color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; text-transform: uppercase; margin-left: 8px;">
                            ${direction === "from-airport" ? "Havalimanından" : "Havalimanına"}
                        </span>` : ''}
                    </div>
                </div>

                <div style="padding: 30px;">
                    
                    <h3 style="margin: 0 0 16px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #9ca3af;">Guest Information</h3>
                    
                    <table style="width: 100%; border-collapse: separate; border-spacing: 0;">
                        <tr>
                            <td style="padding: 8px 0; width: 80px; font-size: 14px; color: #6b7280;">Isim:</td>
                            <td style="padding: 8px 0; font-size: 15px; font-weight: 500; color: #111827;">${fullName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; width: 80px; font-size: 14px; color: #6b7280;">Telefon:</td>
                            <td style="padding: 8px 0; font-size: 15px; font-weight: 500;"><a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a></td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; width: 80px; font-size: 14px; color: #6b7280;">Email:</td>
                            <td style="padding: 8px 0; font-size: 15px; font-weight: 500;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
                        </tr>
                         ${flightNumber ? `
                        <tr>
                            <td style="padding: 8px 0; width: 80px; font-size: 14px; color: #6b7280;">Uçuş numarası:</td>
                            <td style="padding: 8px 0; font-size: 15px; font-weight: 500;">${flightNumber}</td>
                        </tr>` : ''}
                    </table>

                    <div style="border-top: 1px solid #f3f4f6; margin: 24px 0;"></div>

                    <h3 style="margin: 0 0 16px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #9ca3af;">Yolculuk Detayı</h3>
                    
                    <table style="width: 100%; border-collapse: separate; border-spacing: 0;">
                        ${routeRow}
                        <tr>
                            <td style="padding: 8px 0; width: 80px; font-size: 14px; color: #6b7280;">Tarih:</td>
                            <td style="padding: 8px 0; font-size: 15px; font-weight: 500;">${formattedDate} saat ${dateInfo.time}</td>
                        </tr>
                         <tr>
                            <td style="padding: 8px 0; width: 80px; font-size: 14px; color: #6b7280;">Grup:</td>
                            <td style="padding: 8px 0; font-size: 15px; font-weight: 500;">${passengers} Kişi, ${luggage} Bagaj</td>
                        </tr>
                        ${calculatedPrice ? `
                        <tr>
                            <td style="padding: 8px 0; width: 80px; font-size: 14px; color: #6b7280;">Fiyat:</td>
                            <td style="padding: 8px 0; font-size: 16px; font-weight: 700; color: #16a34a;">${calculatedPrice} TL</td>
                        </tr>` : ''}
                    </table>

                    ${notes ? `
                    <div style="margin-top: 24px; background-color: #fffbeb; border: 1px solid #fcd34d; border-radius: 6px; padding: 15px;">
                        <strong style="color: #b45309; font-size: 12px; text-transform: uppercase; display: block; margin-bottom: 4px;">Ekstra Not:</strong>
                        <p style="margin: 0; font-size: 14px; color: #92400e;">${notes}</p>
                    </div>` : ''}
                    
                    ${passportPhoto ? `
                    <div style="margin-top: 15px; padding: 10px; background-color: #f3f4f6; border-radius: 6px; font-size: 13px; color: #4b5563;">
                        📎 <strong>Pasaport fotosu</strong> maile eklendi.
                    </div>` : ''}

                    <div style="margin-top: 30px; text-align: center;">
                        <a href="mailto:${email}?subject=Booking Confirmation: ${fullName}" style="display: inline-block; background-color: #111827; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 500; font-size: 14px;">Geri Cevap Yaz</a>
                    </div>

                </div>

                <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0; color: #9ca3af; font-size: 12px;">© ${new Date().getFullYear()} Vstars Transfer</p>
                </div>

            </div>
        </body>
        </html>
        `;

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: `🚖 Yeni transfer: ${fullName} - ${formattedDate}`,
            html: htmlContent,
            attachments,
        });

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error("Booking email error:", error);
        return NextResponse.json({ error: "Failed to send booking." }, { status: 500 });
    }
}
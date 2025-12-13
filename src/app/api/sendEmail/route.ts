import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            fullName,
            phone,
            email,
            flightNumber,
            signboardName,
            notes,
            bookingType,
            duration,
            fromLocation,
            toLocation,
            dateInfo,
            passengers,
            luggage,
            passportPhoto,
            calculatedPrice,
        } = body;

        // Backend Validation
        if (!fullName || !phone || !fromLocation || !dateInfo?.date || !dateInfo?.time) {
            return NextResponse.json(
                { error: "Missing required booking details" },
                { status: 400 }
            );
        }

        // Format Date
        const formattedDate = new Date(dateInfo.date).toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Create transporter
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

        // Determine Destination Display
        const destinationDisplay = bookingType === "One Way"
            ? `<li style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>📍 To:</strong> ${toLocation}</li>`
            : `<li style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>⏳ Duration:</strong> ${duration} Hours (Hourly Rent)</li>`;

        // Format Price for Email
        const priceDisplay = calculatedPrice
            ? `<li style="padding: 8px 0; border-bottom: 1px solid #eee; background-color: #f0fdf4;"><strong>💰 Estimated Bill:</strong> <span style="color: #16a34a; font-size: 1.1em; font-weight: bold;">${calculatedPrice.toLocaleString('tr-TR')} TL</span></li>`
            : '';

        // Prepare email attachments
        const attachments = [];
        if (passportPhoto && passportPhoto.data) {
            const base64Data = passportPhoto.data.split(',')[1] || passportPhoto.data;
            attachments.push({
                filename: passportPhoto.filename || 'passport-photo.jpg',
                content: base64Data,
                encoding: 'base64',
                contentType: passportPhoto.mimeType || 'image/jpeg'
            });
        }

        const passportPhotoSection = passportPhoto
            ? `<div style="margin-top: 20px; border-left: 4px solid #3b82f6; background-color: #eff6ff; padding: 10px; border-radius: 4px;">
                <strong style="color: #1e40af; display: block; font-size: 12px; margin-bottom: 4px;">📷 PASSPORT PHOTO:</strong>
                <p style="margin: 0; font-size: 14px; color: #1e3a8a;">✓ Attached to this email</p>
            </div>`
            : '';

        // Send email
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: process.env.EMAIL, // Sending to yourself
            subject: `New ${bookingType} Booking: ${fullName}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; border: 1px solid #e5e7eb; border-radius: 8px; background-color: #ffffff;">
                    
                    <!-- Header -->
                    <div style="text-align: center; border-bottom: 2px solid #16a34a; padding-bottom: 15px; margin-bottom: 20px;">
                        <h2 style="color: #16a34a; margin: 0;">New Booking Request</h2>
                        <span style="background-color: #f3f4f6; color: #374151; padding: 4px 8px; border-radius: 4px; font-size: 12px; display: inline-block; margin-top: 5px;">
                            ${bookingType.toUpperCase()}
                        </span>
                    </div>

                    <!-- Guest Details -->
                    <h3 style="color: #374151; font-size: 16px; margin-bottom: 10px;">👤 Guest Information</h3>
                    <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 5px 0; color: #6b7280; font-size: 14px;">Name:</td>
                                <td style="padding: 5px 0; font-weight: bold; color: #111827;">${fullName}</td>
                            </tr>
                            <tr>
                                <td style="padding: 5px 0; color: #6b7280; font-size: 14px;">Phone:</td>
                                <td style="padding: 5px 0;"><a href="tel:${phone}" style="color: #16a34a; text-decoration: none; font-weight: bold;">${phone}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 5px 0; color: #6b7280; font-size: 14px;">Email:</td>
                                <td style="padding: 5px 0;"><a href="mailto:${email}" style="color: #16a34a; text-decoration: none;">${email}</a></td>
                            </tr>
                            ${flightNumber ? `
                            <tr>
                                <td style="padding: 5px 0; color: #6b7280; font-size: 14px;">Flight No:</td>
                                <td style="padding: 5px 0; font-weight: bold; color: #111827;">${flightNumber}</td>
                            </tr>` : ''}
                            ${signboardName ? `
                            <tr>
                                <td style="padding: 5px 0; color: #6b7280; font-size: 14px;">Signboard:</td>
                                <td style="padding: 5px 0; font-weight: bold; color: #111827;">${signboardName}</td>
                            </tr>` : ''}
                        </table>
                    </div>

                    <!-- Trip Details -->
                    <h3 style="color: #374151; font-size: 16px; margin-bottom: 10px;">🚗 Trip Details</h3>
                    <ul style="list-style: none; padding: 0; margin: 0; font-size: 14px; color: #374151;">
                        <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                            <strong>📍 From:</strong> ${fromLocation}
                        </li>
                        ${destinationDisplay}
                        <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                            <strong>📅 Date:</strong> ${formattedDate}
                        </li>
                        <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                            <strong>⏰ Time:</strong> ${dateInfo.time}
                        </li>
                        <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                            <strong>👥 Passengers:</strong> ${passengers} Pax, ${luggage} Luggage
                        </li>
                        ${priceDisplay} <!-- NEW PRICE FIELD -->
                    </ul>

                    ${passportPhotoSection}

                    ${notes ? `
                    <div style="margin-top: 20px; border-left: 4px solid #fbbf24; background-color: #fffbeb; padding: 10px; border-radius: 4px;">
                        <strong style="color: #d97706; display: block; font-size: 12px; margin-bottom: 4px;">SPECIAL REQUESTS / NOTES:</strong>
                        <p style="margin: 0; font-size: 14px; color: #92400e;">${notes}</p>
                    </div>` : ''}

                    <div style="margin-top: 30px; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 20px;">
                        <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                            Sent automatically from <strong>VSTARS Website</strong>
                        </p>
                    </div>
                </div>
            `,
            attachments,
        });

        return NextResponse.json(
            { success: true, message: "Booking request sent successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Email sending error:", error);
        return NextResponse.json(
            { error: "Failed to send booking request." },
            { status: 500 }
        );
    }
}
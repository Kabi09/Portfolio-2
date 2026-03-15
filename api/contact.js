import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields required" });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
            },
        });

        // mail to you
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: `New message from ${name}`,
            html: `
        <h3>Contact Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${req.body.phone || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="background: #f9f9f9; padding: 10px; border-left: 5px solid #38bdf8;">${message}</blockquote>
      `,
        });

        // auto reply template
        const autoReplyTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
        <div style="background-color: #0f172a; padding: 40px 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">Thank You for Reaching Out!</h1>
        </div>
        <div style="padding: 30px 20px; background-color: #ffffff;">
          <p style="font-size: 16px; color: #333333; margin-bottom: 20px;">Hi ${name},</p>
          <p style="font-size: 16px; color: #555555; line-height: 1.6; margin-bottom: 20px;">
            I received your message and appreciate you contacting me. I'm currently reviewing your inquiry and will get back to you as soon as possible, usually within 24 hours.
          </p>
          <p style="font-size: 16px; color: #555555; line-height: 1.6; margin-bottom: 30px;">
            In the meantime, feel free to check out my latest work on my portfolio.
          </p>
          <div style="text-align: center;">
            <a href="https://www.kabilankaliyaperumal.in/" style="display: inline-block; padding: 12px 30px; background-color: #38bdf8; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold;">View Portfolio</a>
          </div>
        </div>
        <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #eeeeee;">
          <p style="font-size: 12px; color: #888888; margin: 0;">&copy; ${new Date().getFullYear()} Kabilan K. All rights reserved.</p>
        </div>
      </div>
    `;

        // auto reply
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Thanks for contacting Kabilan K!",
            html: autoReplyTemplate,
        });

        res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Email failed" });
    }
}

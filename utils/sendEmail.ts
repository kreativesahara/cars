import nodemailer from 'nodemailer';

interface MailOptions {
    from: string;
    to: string;
    subject: string;
    html: string;
    text?: string; // Optional text fallback
}

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587, // Ensure the correct port is used
    secure: false, // Use TLS
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD
    }
});

// Verify transporter dynamically before sending an email
const verifyTransporter = async () => {
    try {
        await transporter.verify();
        console.log("Mailer is ready to send messages.");
    } catch (error) {
        console.error("Mail transporter verification failed:", error);
    }
};

export const sendEmail = async (mailOptions: MailOptions) => {
    try {
        await verifyTransporter(); // Ensure transport is working before sending
        await transporter.sendMail({
            ...mailOptions,
            text: mailOptions.text || mailOptions.html.replace(/<[^>]*>?/gm, '') // Convert HTML to plain text
        });
        console.log(`Email sent to ${mailOptions.to}`);
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email. Please try again later.");
    }
};

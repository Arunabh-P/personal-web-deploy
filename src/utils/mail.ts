/* eslint-disable func-style */
/* eslint-disable max-statements */
import nodemailer from 'nodemailer';

interface EmailProps {
  to: string;
  name: string;
  subject: string;
  body: string;
}

export async function sendMail({ to, name, subject, body }: EmailProps) {
  const { SMTP_PASSWORD, SMTP_EMAIL } = process.env;

  if (!SMTP_PASSWORD || !SMTP_EMAIL) {
    throw new Error('Missing email configuration');
  }

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    await transport.verify();

    const mailOptions = {
      from: SMTP_EMAIL,
      to,
      name,
      subject,
      html: body,
    };

    const result = await transport.sendMail(mailOptions);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
}

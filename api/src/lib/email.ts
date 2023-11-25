import * as nodemailer from 'nodemailer'

interface Options {
  to: string | string[]
  subject: string
  html: string
  text: string
}

export async function sendEmail({ to, subject, text, html }: Options) {
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SEND_IN_BLUE_EMAIL,
      pass: process.env.SEND_IN_BLUE_KEY,
    },
  })

  const info = await transporter.sendMail({
    from: `"Parts Inventory (noreply)" \<${process.env.SEND_IN_BLUE_EMAIL}>`,
    to: Array.isArray(to) ? to : [to],
    subject,
    text,
    html,
  })

  return info
}

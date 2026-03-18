import transporter from './transporter'
import { render } from '@react-email/render'
import { ReactElement } from 'react'

interface SendEmailOptions {
  to: string
  subject: string
  component: ReactElement
}

export const sendEmail = async ({
  to,
  subject,
  component,
}: SendEmailOptions) => {
  const html = await render(component)

  await transporter.sendMail({
    from: `Ekad-Semua <${process.env.SMTP_SENDER}>`,
    to,
    subject,
    html,
  })
}

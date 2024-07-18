import { i18n } from '../../i18n-config'
import "./globals.css";
import { store } from '@/store'

import Provider from "@/provider";
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default function Root({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <html lang={params.lang}>
      <body>
        {/* <Provider > */}
          {children}
        {/* </Provider> */}
      </body>
    </html>
  )
}

export const metadata = {
  title: 'i18n within app directory - Vercel Examples',
  description: 'How to do i18n in Next.js 13 within app directory',
}

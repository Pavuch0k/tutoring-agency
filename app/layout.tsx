import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Твой Учитель - Образовательный центр в Саратове",
  description:
    "Лучший образовательный центр в Саратове. Подберём идеального репетитора для вашего ребёнка. Индивидуальный подход, проверенные методики, видимые результаты.",
  keywords: "репетитор, образование, Саратов, ЕГЭ, ОГЭ, математика, русский язык, английский язык",
  authors: [{ name: "Твой Учитель" }],
  creator: "Твой Учитель",
  publisher: "Твой Учитель",
  robots: "index, follow",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.WIDGET_CONFIG = {
                projectId: '5',
                apiUrl: 'https://ai.devorb.ru/projects/5'
              };
            `,
          }}
        />
        <link rel="stylesheet" href="https://ai.devorb.ru/projects/5/widget.css" />
        <script src="https://ai.devorb.ru/projects/5/widget.js" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

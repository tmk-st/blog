import './globals.css'
import 'zenn-content-css'
import Script from 'next/script'

export const metadata = {
  title: 'tmkst - Web developer',
  description: 'Personal Site',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <Script 
          src="https://embed.zenn.studio/js/listen-embed-event.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
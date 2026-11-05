import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'House Warming Ceremony Invitation',
  description: 'Join us to celebrate our new home!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

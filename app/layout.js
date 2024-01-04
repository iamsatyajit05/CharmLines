"use client"
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react';


const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'CharmLines',
//   description: 'Start a Charming Conversation with Every Line!',
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>CharmLines</title>
      </head>
      <body className={inter.className}>
        {children}
        <Analytics mode={'production'} />;
      </body>
    </html>
  )
}

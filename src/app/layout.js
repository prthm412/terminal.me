import { IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import './styles.css'

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata = {
  title: 'YOUR_NAME — Portfolio',
  description: 'Game & Systems Developer portfolio — C++, Vulkan, ML, and more.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${ibmPlexMono.variable} dark`} suppressHydrationWarning>
      <body className={ibmPlexMono.className}>
        {children}
      </body>
    </html>
  )
}

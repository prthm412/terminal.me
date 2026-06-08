'use client'

import dynamic from 'next/dynamic'

// Dynamically import the portfolio app with no SSR
// This is required because the components use window, canvas, and DOM APIs
const PortfolioApp = dynamic(
  () => import('../components/portfolio-app'),
  { ssr: false }
)

export default function Home() {
  return <PortfolioApp />
}

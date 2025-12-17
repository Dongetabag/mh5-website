import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/context'
import { siteConfig } from '@/config/site.config'
import ScrollAutoplayInit from '@/components/common/ScrollAutoplayInit'
import FluidBackground from '@/components/FluidBackground'
import CustomCursor from '@/components/CustomCursor'

export const metadata: Metadata = {
  title: `${siteConfig.meta.siteName} | ${siteConfig.meta.tagline}`,
  description: siteConfig.meta.description,
  keywords: siteConfig.meta.keywords,
  authors: [{ name: siteConfig.meta.author }],
  openGraph: {
    title: siteConfig.meta.siteName,
    description: siteConfig.meta.description,
    type: 'website',
    locale: siteConfig.meta.locale,
    url: siteConfig.meta.siteUrl,
    images: siteConfig.meta.ogImage ? [siteConfig.meta.ogImage] : undefined,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.meta.siteName,
    description: siteConfig.meta.description,
    creator: siteConfig.meta.twitterHandle,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme={siteConfig.theme.variant}>
      <body
        className="min-h-screen"
        style={{
          color: 'var(--color-text-primary)',
        }}
      >
        <ThemeProvider>
          <FluidBackground />
          <CustomCursor />
          <Navigation />
          <ScrollAutoplayInit />
          <main className="relative z-10 cursor-auto md:cursor-none">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

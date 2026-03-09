import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '../styles/globals.scss'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import path from 'path'
import readRoutes from '@/lib/getRoutes'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Contentful Admin',
  description: 'Run scripts and check their results'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const appDir = path.join(process.cwd(), 'src/app')
  const routes = readRoutes(appDir)

  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className='app-layout'>
          <Header />
          <div className='app-body'>
            <Sidebar routes={routes} />
            <main className='main'>{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}

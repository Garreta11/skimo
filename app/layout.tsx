import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Header from './header'
import Footer from './footer'

import Burger from '@/components/burger'

import './globals.css'
import SmoothScroll from '@/components/smoothScroll'

import localFont from '@next/font/local'
import { ThemeContextProvider } from '@/components/theme'
import Wrapper from './wrapper'
import Logo from '@/components/logo'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SkiMo',
  description: 'Explore the thrill of ski mountain with our comprehensive guide. Find expert feelings, gear configurator, and community images to plan your next backcountry adventure.'
}

const panchang = localFont({
  src: [
    {
      path: '../public/fonts/Panchang/Panchang-Extralight.otf',
      weight: '200'
    },
    {
      path: '../public/fonts/Panchang/Panchang-Light.otf',
      weight: '300'
    },
    {
      path: '../public/fonts/Panchang/Panchang-Regular.otf',
      weight: '400'
    },
    {
      path: '../public/fonts/Panchang/Panchang-Medium.otf',
      weight: '500'
    },
    {
      path: '../public/fonts/Panchang/Panchang-Semibold.otf',
      weight: '600'
    },
    {
      path: '../public/fonts/Panchang/Panchang-Bold.otf',
      weight: '700'
    },
    {
      path: '../public/fonts/Panchang/Panchang-Extrabold.otf',
      weight: '800'
    },
  ],
  variable: '--font-panchang'
})


export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} ${panchang.variable} overflow-x-hidden`}>

        <ThemeContextProvider>
          <div className='flex'>


            <Wrapper>
              <Logo />
              <div id="progress-bar-container" className="fixed z-50 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-screen bg-black flex flex-col justify-center items-center">
                <label className="font-panchang text-white text-5xl" htmlFor="progress-bar">Loading...</label>
                <progress id="progress-bar" className="w-4/12 h-0.5 mt-8" value="0" max="100"></progress>
              </div>
              <SmoothScroll>
                <main>{children}</main>
              </SmoothScroll>
              <Footer />

              <Burger />
            </Wrapper>

            <Header />

          </div>
        </ThemeContextProvider>

      </body>
    </html>
  )
}

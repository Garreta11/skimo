"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useThemeContext } from '@/components/theme'

export default function Header() {

  const { menu, setMenu } = useThemeContext();
  const [width, setWidth] = useState('w-0')

  useEffect(() => {
    if (menu) {
      setWidth('w-full')
    } else {
      setWidth('w-0')
    }
  }, [menu])

  const handleClick = () => {
    setMenu(false)
  }

  const handleMouseEnter = (e:any) => {
    const currentTarget = e.currentTarget
    const video = currentTarget.querySelector('video');

    video.classList.add('opacity-1')
    video.classList.remove('opacity-0')
    video.play()
  }

  const handleMouseLeave = (e:any) => {
    const currentTarget = e.currentTarget
    const video = currentTarget.querySelector('video');

    video.classList.add('opacity-0')
    video.classList.remove('opacity-1')
    video.pause()
  }

  return (
    <header className={`z-30 fixed right-0 flex justify-center items-center h-screen bg-black text-white font-bold ${width} transition-all duration-500 overflow-auto`}>
      <nav className='h-full w-full'>
        <ul className='font-panchang w-full h-full flex flex-col lg:flex-row w-screen items-center justify-center lg:justify-between text-center text-2xl'>
          <li className='lg:w-1/3 w-full h-1/6 lg:h-full flex items-center'>
            <Link className='relative w-full h-full flex items-center justify-center' href='/' onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              {/* <Image className='absolute w-full opacity-0 top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300' src="/images/menu/home.jpg" width={420} height={595} alt='menu-home' /> */}
              <video className='absolute object-cover w-full h-full opacity-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300' width="320" height="240" muted autoPlay={false} loop preload="none">
                <source src="/videos/home.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className='relative text-white mix-blend-difference'>Home</p>
            </Link>
          </li>
          <li className='lg:w-1/3 w-full h-1/6 lg:h-full flex items-center'>
            <Link className='relative w-full h-full flex items-center justify-center' href='/boots' onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              {/* <Image className='absolute w-full opacity-0 top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300' src="/images/menu/boots.jpg" width={420} height={595} alt='menu-boots' /> */}
              <video className='absolute object-cover w-full h-full opacity-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300' width="320" height="240" muted autoPlay={false} loop preload="none">
                <source src="/videos/boots.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className='relative text-white mix-blend-difference'>Boots Configurator</p>
            </Link>
          </li>
          <li className='lg:w-1/3 w-full h-1/6 lg:h-full flex items-center'>
            <Link className='relative w-full h-full flex items-center justify-center' href='/gallery' onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              {/* <Image className='absolute w-full opacity-0 top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300' src="/images/menu/gallery.jpg" width={420} height={595} alt='menu-gallery' /> */}
              <video className='absolute object-cover w-full h-full opacity-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300' width="320" height="240" muted autoPlay={false} loop preload="none">
                <source src="/videos/gallery.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className='relative text-white mix-blend-difference'>Gallery</p>
            </Link>
          </li>
          {/* <li>
            <Link href='/contact' onClick={handleClick}>Contact</Link>
          </li> */}
        </ul>
      </nav>
    </header>
  )
}

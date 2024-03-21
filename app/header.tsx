"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useThemeContext } from '@/components/theme'

export default function Header() {

  const { menu, setMenu } = useThemeContext();

  const [width, setWidth] = useState('w-0')

  useEffect(() => {
    if (menu) {
      setWidth('w-2/6')
    } else {
      setWidth('w-0')
    }
  }, [menu])

  const handleClick = () => {
    setMenu(false)
  }

  return (
    <header className={`z-10 fixed right-0 flex justify-center items-center h-screen bg-black text-white font-bold ${width} transition-all overflow-auto`}>
      <nav className='py-8'>
        <ul className='font-panchang container flex flex-col gap-5 items-center	justify-center text-center text-2xl'>
          <li>
            <Link href='/' onClick={handleClick}>Home</Link>
          </li>
          <li>
            <Link href='/boots' onClick={handleClick}>Boots Configurator</Link>
          </li>
          <li>
            <Link href='/gallery' onClick={handleClick}>Gallery</Link>
          </li>
          <li>
            <Link href='/contact' onClick={handleClick}>Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

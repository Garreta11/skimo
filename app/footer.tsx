'use client'
import { useEffect, useState } from 'react'
import { useThemeContext } from '@/components/theme'
import Link from 'next/link';

export default function Footer() {

  const { menu } = useThemeContext();
  const [width, setWidth] = useState('w-0')

  useEffect(() => {
    if (menu) {
      setWidth('w-4/6')
    } else {
      setWidth('w-full')
    }
  }, [menu])


  return <footer className={`${width} fixed bottom-0 py-5 px-5 text-white mix-blend-difference transition-all z-40`}>
    <div className="flex gap-10 m-0 justify-between w-full font-panchang font-bold ">
      <p>©2024</p>
      <p>design and code by: <Link href='https://jordigarreta.com'>Jordi Garreta</Link></p>
    </div>
    
  </footer>
}

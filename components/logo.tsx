'use client'

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useThemeContext } from '@/components/theme'
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Logo() {

  return (
    <Link href='/'>
      <div className='fixed left-5 top-5 cursor-pointer z-20 scale-100 transition-all text-white mix-blend-difference'>
        <p className='logo font-bold flex font-panchang text-5xl'>S<span className='max-w-0 inline-block overflow-hidden transition-all'>KiMO</span></p>
      </div>
    </Link>
  )
}

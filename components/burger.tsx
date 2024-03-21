'use client'

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useThemeContext } from '@/components/theme'

gsap.registerPlugin(ScrollTrigger);

export default function Burger() {

  const { menu, setMenu } = useThemeContext();

  const handleMenu = () => {
    setMenu(!menu)
  }

  return (
    <div className={`fixed font-bold right-5 top-5 cursor-pointer z-20 text-white mix-blend-difference font-panchang`} onClick={handleMenu}>
      <p>{menu ? "close" : "open"}</p>
    </div>
  )
}

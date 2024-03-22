'use client'

import Image from 'next/image';

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function Title({ children }: { children: React.ReactNode }) {

  const textRef = useRef()
  const characters = useRef([])

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.to('.char', {
        opacity: 1,
        stagger: 0.05,
        duration: 1,
        delay: 1
      })
      gsap.to('.image-intro', {
        opacity: 1,
        // scale: 1,
        duration: 1,
      })
      gsap.to('.image-intro', {
        width: '100%',
        height: '100%',
        delay: 1.5,
        duration: 1,
      })
      gsap.to('.white-bg', {
        height: '0%',
        delay: 1.5,
        duration: 1,
      }) 

      const tl = gsap.timeline({
        scrollTrigger: {
          target: '.target',
          start: "top 0",
          end: "bottom 90%",
          scrub: true,
          markers: false
        }
      })

      const tops = [1080, 1000, 1200, 900, 1000]

      characters.current.forEach((char, i) => {
        const top = Math.floor(Math.random() * (800 - 400 + 1) + 400)
        tl.to(char, {top: tops[i]}, 0)
      })

      // tl.to('.text-intro', {y: 1080}, 0)
      // tl.to('.image-intro', {y: 1080}, 0)

      
      
    })
    
    return () => context.revert()
  }, [])

  return (
    <section ref={textRef} className="w-full h-screen bg-white relative">
      <h1 className={`text-intro font-panchang text-full font-bold relative z-10 text-white mix-blend-difference left-1/2 transform top-56 -translate-x-1/2 w-fit`}>{
        children.split("").map((letter: string, i: number) => {
          return <span key={i} className='char opacity-0 relative transition-top' ref={ref => characters.current[i] = ref}>{letter}</span>
        })
      }</h1>

      <div className='image-intro absolute top-0 w-5/6 h-full transform -translate-x-1/2 origin-bottom left-1/2 top-0'>
        <div className='white-bg bg-white absolute top-0 w-full h-full' />
        <Image width={1536} height={896} alt='hero-image' className='top-0 w-full h-full object-cover scale-1 m-auto' src='/images/mountains.png' />
      </div>

      <div className='target absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-28' />
    </section>
  )
}
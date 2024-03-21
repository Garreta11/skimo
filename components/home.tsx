'use client'

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Sketch from './three-girl/module'
import { useThemeContext } from '@/components/theme'
import gsap from 'gsap'

import Section from "./section"
import Spacer from "./spacer"
import Title from "./title"

export default function HomeWrapper() {

  const sketchRef = useRef()
  const { menu } = useThemeContext();
  const [width, setWidth] = useState('w-full')

  useEffect(() => {
    if (menu) {
      setWidth('w-4/6')
    } else {
      setWidth('w-full')
    }
  }, [menu])

  useEffect(() => {

    let sketch = new Sketch({
      dom: document.getElementById('container')
    })

    console.log(sketch)

  }, [])

  return (
    <section className='relative'>
      
      <div id="container" className={`${width} h-screen fixed top-0 left-0 z-10 pointer-events-all `} />
      
      <Title>SkiMo</Title>
      <div className="page">
        <Section>
          <p className="text-3xl w-1/2 text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. A quam, deserunt suscipit eligendi nam quas cupiditate dolore et, voluptatibus sed debitis error dolor nulla modi natus in repellendus officia! Delectus?</p>
        </Section>
        <Section>
          <p className="text-3xl w-1/2 text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. A quam, deserunt suscipit eligendi nam quas cupiditate dolore et, voluptatibus sed debitis error dolor nulla modi natus in repellendus officia! Delectus?</p>
        </Section>
        <Section>
          <p className="text-3xl w-1/2 text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. A quam, deserunt suscipit eligendi nam quas cupiditate dolore et, voluptatibus sed debitis error dolor nulla modi natus in repellendus officia! Delectus?</p>
        </Section>
      </div>
      <Spacer />

      
    </section>
  )
}

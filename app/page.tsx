'use client'
import { useEffect, useState } from 'react'

/* import Scene from "@/components/scene"
import Section from "@/components/section"
import Spacer from "@/components/spacer"
import Title from "@/components/title" */

import { useThemeContext } from '@/components/theme'


import { useRef } from "react"
import HomeWrapper from '@/components/home'

export default function Home() {

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

  }, [])

  return (
    <>
      {/* <div className='py-0'>
        <div className={`${width} fixed top-0 transition-all`}>
          <Scene />
        </div>
        <Title>SkiMo</Title>
        <div className="page">
          <Spacer />
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
      </div> */}

      <HomeWrapper />
    </>
  )
}

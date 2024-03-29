'use client'

import { useEffect, useRef, useState } from "react"
import Sketch from './three-girl/module'

import Section from "./section"
import Spacer from "./spacer"
import Title from "./title"

export default function HomeWrapper() {

  const sketchRef = useRef<Sketch | undefined>(undefined);

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('');

  useEffect(() => {

    let sketch = new Sketch({
      dom: document.getElementById('container')
    })

    sketchRef.current = sketch

  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (currentScrollPos > prevScrollPos) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  /* useEffect(() => {
    if (sketchRef.current.model) {
      if (scrollDirection === 'up') {
        gsap.to(sketchRef.current.model.rotation, {
          x: 0.15 * Math.PI,
          y: Math.PI,
          z: 0
        })
      } else {
        gsap.to(sketchRef.current.model.rotation, {
          x: 0.15 * Math.PI,
          y: 0,
          z: 0
        })
      }
    }
  }, [scrollDirection]) */

  return (
    <section className='relative'>
      
      <div id="container" className={`w-full h-screen fixed top-0 left-0 z-30 pointer-events-all `} />
      
      <Title>SkiMo</Title>
      <div className="page relative z-20 bg-black text-white">
        {/* <Spacer /> */}

        {/* Gear Up */}
        <Section title='Gear Up' text="Before embarking on your ski randonnée journey, ensure you have all the necessary equipment for backcountry exploration. From avalanche safety gear like beacons, shovels, and probes to climbing skins and touring bindings, proper preparation is key to a safe and enjoyable experience in the wilderness." mediapath='/images/home/material.png' />

        {/* Ascend to Backcountry Bliss */}
        <Section title="Ascend to Backcountry Bliss" text="As you begin your ascent on skis, the tranquility of the backcountry envelops you. With each step or glide, you ascend higher into the pristine wilderness, leaving behind the crowds and noise of the resort for the serenity of untouched snow and breathtaking landscapes." side='right' mediapath='/images/home/ascend.jpeg' />

        {/* Summit Solitude */}
        <Section title="Summit Solitude" text="Reaching the summit after a challenging ascent rewards you with unobstructed views of the surrounding peaks and valleys. Take a moment to soak in the silence of the wilderness and the sense of accomplishment that comes with reaching the pinnacle of your backcountry adventure." mediapath='/images/home/top.jpeg' />

        {/* Descend with Purpose */}
        <Section title="Descend with Purpose" text="With the summit conquered, it is time to reap the rewards of your ascent with a thrilling descent through untouched powder fields and glades. As you carve your way down the mountain, each turn is a testament to your skill and determination, offering a pure and exhilarating skiing experience away from the crowds." side='right' mediapath='/images/home/down.MP4' video />

        {/* Après Randonnée Revelry */}
        <Section title="Après Randonnée Revelry" text="After a day of exploration and adventure in the backcountry, unwind and celebrate your accomplishments with fellow adventurers. Whether it is sharing stories over a hearty meal at a backcountry hut or toasting to your achievements with a warm beverage by a crackling fire, the camaraderie of the après-randonnée experience is a cherished part of backcountry skiing culture." mediapath='/images/horizontal.JPG' />

        <div className="mountain">
          <Spacer />
          <Spacer />
          <Spacer />
        </div>

      </div>
      <Spacer />

      
    </section>
  )
}

'use client'

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Sketch from './three-girl/module'
import { useThemeContext } from '@/components/theme'
import gsap from 'gsap'

import SplitType from 'split-type';


import Section from "./section"
import Spacer from "./spacer"
import Title from "./title"

export default function HomeWrapper() {

  const sketchRef = useRef<Sketch | undefined>(undefined);
  const { menu } = useThemeContext();
  const [width, setWidth] = useState('w-full')

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('');

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

    sketchRef.current = sketch

    setTimeout(() => {
      // Parallax images
      gsap.utils.toArray('.parallax').forEach((section: any) => {
        const heightDiff = section.offsetHeight - section.parentElement.offsetHeight;
  
        gsap.fromTo(
          section,
          {
            y: -heightDiff,
          },
          {
            scrollTrigger: {
              trigger: section.parentElement,
              scrub: true,
            },
            y: 0,
            ease: 'none',
          }
        );
      });
      // Scroll Text Reveal
      gsap.utils.toArray('.text-reveal').forEach((t: any) => {
        const text = new SplitType(t, { types: 'chars,words' });
  
        gsap.from(text.chars, {
          scrollTrigger: {
            trigger: t,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
            markers: false,
          },
          opacity: 0.3,
          stagger: 0.1,
        });
      })
    }, 1000)


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
      <div className="page relative z-20">
        {/* <Spacer /> */}

        {/* Gear Up */}
        <Section>
          <div className="w-full lg:w-1/2 p-8">
            <h2 className="text-3xl font-bold">Gear Up</h2>
            <p className="text-reveal text-1xl">Before embarking on your ski randonnée journey, ensure you have all the necessary equipment for backcountry exploration. From avalanche safety gear like beacons, shovels, and probes to climbing skins and touring bindings, proper preparation is key to a safe and enjoyable experience in the wilderness.</p>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="w-full padding-parallax before:padding-parallax-before">
              <div
                className="parallax absolute bg-center bg-no-repeat bg-cover -inset-y-32 -inset-x-32"
                style={{
                  backgroundImage: `url(/images/home/material.JPG)`,
                }}
              />
            </div>
            {/* <Image className="w-full h-auto" width={3024} height={4032} src='/images/home/material.JPG' alt="material" /> */}
          </div>
        </Section>

        {/* Ascend to Backcountry Bliss */}
        <Section side='right'>
          <div className="w-full lg:w-1/2 p-8">
            <h2 className="text-3xl font-bold">Ascend to Backcountry Bliss</h2>
            <p className="text-reveal text-1xl">As you begin your ascent on skis, the tranquility of the backcountry envelops you. With each step or glide, you ascend higher into the pristine wilderness, leaving behind the crowds and noise of the resort for the serenity of untouched snow and breathtaking landscapes.</p>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="w-full padding-parallax before:padding-parallax-before">
              <div
                className="parallax absolute bg-center bg-no-repeat bg-cover -inset-y-32 -inset-x-32"
                style={{
                  backgroundImage: `url(/images/home/ascend.JPG)`,
                }}
              />
            </div>
            {/* <Image className="w-full h-auto" width={1536} height={2048} src='/images/home/ascend.JPG' alt="up" /> */}
          </div>
        </Section>

        {/* Summit Solitude */}
        <Section>
          <div className="w-full lg:w-1/2 p-8">
            <h2 className="text-3xl font-bold">Summit Solitude</h2>
            <p className="text-reveal text-1xl">Reaching the summit after a challenging ascent rewards you with unobstructed views of the surrounding peaks and valleys. Take a moment to soak in the silence of the wilderness and the sense of accomplishment that comes with reaching the pinnacle of your backcountry adventure.</p>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="w-full padding-parallax before:padding-parallax-before">
              <div
                className="parallax absolute bg-center bg-no-repeat bg-cover -inset-y-32 -inset-x-32"
                style={{
                  backgroundImage: `url(/images/home/top.JPG)`,
                }}
              />
            </div>
            {/* <Image className="w-full h-auto" width={4032} height={3024} src='/images/home/top.JPG' alt="top" /> */}
          </div>
        </Section>

        {/* Descend with Purpose */}
        <Section side='right'>
          <div className="w-full lg:w-1/2 p-8">
            <h2 className="text-3xl font-bold">Descend with Purpose</h2>
            <p className="text-reveal text-1xl">With the summit conquered, it is time to reap the rewards of your ascent with a thrilling descent through untouched powder fields and glades. As you carve your way down the mountain, each turn is a testament to your skill and determination, offering a pure and exhilarating skiing experience away from the crowds.</p>
          </div>
          <div className="w-full lg:w-1/2">
            <video className="w-full h-auto" width="1920" height="1080" controls={false} muted autoPlay loop>
              <source src="/images/home/down.MP4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </Section>

        {/* Après Randonnée Revelry */}
        <Section>
          <div className="w-full lg:w-1/2 p-8">
            <h2 className="text-3xl font-bold">Après Randonnée Revelry</h2>
            <p className="text-reveal text-1xl">After a day of exploration and adventure in the backcountry, unwind and celebrate your accomplishments with fellow adventurers. Whether it is sharing stories over a hearty meal at a backcountry hut or toasting to your achievements with a warm beverage by a crackling fire, the camaraderie of the après-randonnée experience is a cherished part of backcountry skiing culture.</p>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="w-full padding-parallax before:padding-parallax-before">
              <div
                className="parallax absolute bg-center bg-no-repeat bg-cover -inset-y-32 -inset-x-32"
                style={{
                  backgroundImage: `url(/images/horizontal.JPG)`,
                }}
              />
            </div>
            {/* <Image className="w-full h-auto" width={1536} height={896} src='/images/horizontal.JPG' alt="up" /> */}
          </div>
        </Section>
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

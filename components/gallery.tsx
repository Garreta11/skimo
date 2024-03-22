'use client'

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Sketch from './three-gallery/module'
import { useThemeContext } from '@/components/theme'
import gsap from 'gsap'

export default function GalleryWrapper() {

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

  const images = [
    {
      name: '1.jpg',
      label: 'Soum de Salettes (2.976m)'
    },
    {
      name: '2.jpg',
      label: 'Soum de Salettes (2.976m)'
    },
    {
      name: '3.jpg',
      label: 'Pic de la Mina (2.683m)'
    },
    {
      name: '4.jpg',
      label: 'Soum de Salettes (2.976m)'
    },
    {
      name: '5.jpg',
      label: 'Refugi Gerber Mataró (2.460m)'
    },
    {
      name: '6.jpg',
      label: 'Pic de Pedrons (2.715m)'
    },
    {
      name: '7.jpg',
      label: 'Petit Peric (2.690m)'
    },
    {
      name: '8.jpg',
      label: 'Petit Peric (2.690m)'
    },
    {
      name: '8.jpg',
      label: 'Petit Peric (2.690m)'
    },
    {
      name: '8.jpg',
      label: 'Petit Peric (2.690m)'
    },
    {
      name: '8.jpg',
      label: 'Petit Peric (2.690m)'
    },
    {
      name: '8.jpg',
      label: 'Petit Peric (2.690m)'
    },
    {
      name: '8.jpg',
      label: 'Petit Peric (2.690m)'
    },
    {
      name: '8.jpg',
      label: 'Petit Peric (2.690m)'
    }
  ]
  useEffect(() => {

    let sketch = new Sketch({
      dom: document.getElementById('container')
    })

    sketchRef.current = sketch

    let attractMode = false
    let attractTo = 0
    let speed = 0
    let position = 0

    let objs = Array(images.length).fill({dist: 0})

    function raf() {
      position += speed
      speed *= 0.8

      objs.forEach((o, i) => {
        o.dist = Math.min(Math.abs(position - i), 1)
        o.dist = 1 - o.dist**2

        // let scale = 1 + 0.9 * o.dist
        let scale = 1 + 10 * o.dist
        let radius = 20.

        // Circle Shape
        /* let angle = ((i - position) / objs.length) * Math.PI * 2;
        sketch.meshes[i].position.x = radius * Math.cos(angle)
        sketch.meshes[i].position.y = radius * Math.sin(angle) */

        // S-Shape
        // let angle = Math.sin((i - position) / objs.length * Math.PI) * Math.PI * radius;
        let angle = radius * Math.sin((i - position) / objs.length * 3 * Math.PI)
        sketch.meshes[i].position.x = -angle; // Using angle for x position
        sketch.meshes[i].position.y = (i - position) * 3; // Adjust as needed for y position
    

        sketch.meshes[i].scale.set(scale, scale, scale)
        sketch.meshes[i].material.uniforms.distanceFromCenter.value = o.dist;
        sketch.meshes[i].position.z = o.dist * 10.;
        // sketch.meshes[i].rotation.x = 1. * (1 - o.dist);
        sketch.meshes[i].rotation.x = 0.6 * (o.dist);
      })

      position += -(position - attractTo) * 0.01

      window.requestAnimationFrame(raf)
    }

    raf()

    // let navs = [...document.querySelectorAll(".item")]
    let navs = Array.from(document.querySelectorAll(".item")) as HTMLElement[];
    let nav = document.querySelector(".nav")

    let rots = sketch.groups.map(e=>e.rotation)

    nav?.addEventListener('mouseenter', () => {
      attractMode = true
      // rotation
      /* gsap.to(rots, {
        duration: 0.3,
        x: 0,
        y: 0,
        z: 0,
      }) */
    })
    nav?.addEventListener('mouseleave', () => {
      attractMode = false
      // rotation
      /* gsap.to(rots, {
        duration: 0.3,
        x: 0.5,
        y: 0,
        z: 0,
      }) */
    })
    navs.forEach(el => {
      el.addEventListener('mouseover', (e) => {
        // attractTo = Number(e.target.getAttribute('data-nav'))
        attractTo = Number((e.target as HTMLElement).getAttribute('data-nav'));
        navs.forEach(n => {
          //if (n.getAttribute('data-nav') == attractTo) {
          if (n.getAttribute('data-nav') === String(attractTo)) {
            n.classList.add('opacity-100')
            n.classList.remove('opacity-10')
          } else {
            n.classList.add('opacity-10')
            n.classList.remove('opacity-100')
          }
        })

      })
    })

  }, [])

  return (
    <section className='relative'>
      <div className="font-panchang font-bold nav fixed z-30 h-1/2 left-8 top-1/2 transform -translate-y-1/2 text-white mix-blend-difference">
        {images.map((im, i) => {
          return(
            <div key={i} className={`item text-2xl my-2 ${i === 0 ? 'opacity-1' : 'opacity-10'} `} data-nav={i}>{im.label}</div>
          )
        })}
      </div>
      <div id="wrap" className="relative z-20 hidden">
        {images.map((im, i) => {
          return(
            <div key={i} className="n absolute w-2/3 h-2 bg-black">
              <Image className="gallery-images" src={`/images/gallery/${im.name}`} alt={i} width={800} height={800/1.5}/>
            </div>
          )
        })}
      </div>
      <div id="container" className={`${width} h-screen fixed top-0 left-0 z-10 pointer-events-none `} />
    </section>
  )
}

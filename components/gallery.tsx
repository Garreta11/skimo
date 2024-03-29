'use client'

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Sketch from './three-gallery/module'
import { useThemeContext } from '@/components/theme'
import gsap from 'gsap'

export default function GalleryWrapper() {

  // const sketchRef = useRef()
  const sketchRef = useRef<Sketch | undefined>(undefined);

  const { isScreenSmall } = useThemeContext()

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
      name: '9.jpg',
      label: "Cambre d'Aze (2.740m)"
    },
    
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
    let rounded = 0

    let initScale = 1
    let scale = 2
    let initRadius = 5.
    let radius = 10.

    let objs = Array(images.length).fill({dist: 0})

    objs.forEach((o, i) => {
      o.dist = Math.min(Math.abs(position - i), 1)
      o.dist = 1 - o.dist**2

      sketch.meshes[i].position.set(0, 0, 0)
      sketch.meshes[i].rotation.set(0, 0, 0)
      sketch.meshes[i].scale.set(initScale, initScale, initScale)

      // Circle Slider
      let pos = (position % objs.length)
      let angle = ((i - pos) / objs.length) * Math.PI * 2;
      gsap.to(sketch.meshes[i].position, {
        x: initRadius * Math.cos(angle + Math.PI / 2),
        y: initRadius * Math.sin(angle + Math.PI / 2),
        z: o.dist * 1.,
        duration: 0.8,
        delay: 1
      })
      gsap.to(sketch.groups[i].rotation, {
        z: 2 * Math.PI,
        duration: 0.8,
        delay: 1.8
      })
      gsap.to(sketch.groups[i].position, {
        y: -10,
        z: -2,
        duration: 0.8,
        delay: 2.6
      })
      gsap.to(sketch.meshes[i].scale, {
        x: scale,
        y: scale,
        z: scale,
        duration: 0.8,
        delay: 2.6
      })
      gsap.to(sketch.meshes[i].position, {
        x: radius * Math.cos(angle + Math.PI / 2),
        y: radius * Math.sin(angle + Math.PI / 2),
        z: o.dist * 1.,
        duration: 0.8,
        delay: 2.6
      })

      sketch.meshes[i].material.uniforms.distanceFromCenter.value = o.dist;

    })

    function raf() {
      position += speed
      speed *= 0.9

      // Clamp position so we don't have infinite scroll
      position = Math.min(Math.max(position, 0), objs.length - 1)

      // position = (position % objs.length)
      rounded = Math.round(position)

      let diff = (rounded - position)
      
      if (attractMode) {
        position += -(position - attractTo) * 0.01
      } else {
        position += Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.015
      }

      let navs = Array.from(document.querySelectorAll(".item")) as HTMLElement[];
      navs.forEach((n, i) => {
        if (i === Math.round(position)) {
          n.classList.add('text-white')
          n.classList.remove('text-gray-800')
        } else {
          n.classList.remove('text-white')
          n.classList.add('text-gray-800')
        }
      })

      objs.forEach((o, i) => {
        o.dist = Math.min(Math.abs(position - i), 1)
        o.dist = 1 - o.dist**2

        // Circle Slider
        let angle = ((i - position) / objs.length) * Math.PI * 2;
        sketch.meshes[i].position.x = radius * Math.cos(angle + Math.PI / 2)
        sketch.meshes[i].position.y = radius * Math.sin(angle + Math.PI / 2)
        sketch.meshes[i].position.z = o.dist * 1.;

        sketch.meshes[i].scale.set(scale, scale, scale)
        sketch.meshes[i].material.uniforms.distanceFromCenter.value = o.dist;
        
      })

      window.requestAnimationFrame(raf)
    }

    setTimeout(() => {
      window.addEventListener('wheel', (e) => {
        speed += (e.deltaY * 0.0002)
      })
      raf()
    }, 3400)

    
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
    navs.forEach((el:HTMLElement, i:any) => {
      el.addEventListener('mouseover', (e) => {
        // attractTo = Number(e.target.getAttribute('data-nav'))
        attractTo = Number((e.target as HTMLElement).getAttribute('data-nav'));
      })

      gsap.to(el, {
        x: 0,
        opacity: 1,
        delay: 3.4 + i * 0.1
      })

    })

  }, [])

  return (
    <section className='relative'>
      <div className="hidescrollbar animate-list text-center w-10/12 lg:w-fit overflow-y-scroll font-panchang font-bold nav fixed z-30 h-1/2 left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 text-white mix-blend-difference">
        {images.map((im, i) => {
          return(
            <div key={i} className={`cursor-pointer item opacity-0 w-fit m-auto -translate-x-10 text-1xl lg:text-2xl my-2 ${i === 0 ? 'text-white' : 'text-gray-800'} hover:!text-white`} data-nav={i}>{im.label}</div>
          )
        })}
      </div>
      <div id="wrap" className="relative z-20 hidden">
        {images.map((im, i) => {
          return(
            <div key={i} className="n absolute w-2/3 h-2 bg-black">
              <Image className="gallery-images" src={`/images/gallery/${im.name}`} alt={String(i)} width={800} height={800/1.5}/>
            </div>
          )
        })}
      </div>
      <div id="container" className={`w-screen h-screen fixed top-0 left-0 z-10 pointer-events-none `} />
    </section>
  )
}

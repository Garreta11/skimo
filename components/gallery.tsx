'use client'

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Sketch from './three-gallery/module'
import { useThemeContext } from '@/components/theme'
import gsap from 'gsap'

export default function GalleryWrapper() {

  // const sketchRef = useRef()
  const sketchRef = useRef<Sketch | undefined>(undefined);
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

    objs.forEach((o, i) => {
      o.dist = Math.min(Math.abs(position - i), 1)
      o.dist = 1 - o.dist**2

      let scale = 3 + 5 * o.dist
      // let scale = 1
      let radius = 10.

      sketch.meshes[i].position.set(0, 0, 0)
      sketch.meshes[i].rotation.set(0, 0, 0)

      // Horizontal Slider
      gsap.to(sketch.meshes[i].position, {
        y: (i * 4) - (position * 4),
        duration: 1,
        delay: 1  
      })

     
      sketch.meshes[i].scale.set(scale, scale, scale)
      sketch.meshes[i].rotation.z = Math.PI
      sketch.meshes[i].material.uniforms.distanceFromCenter.value = o.dist;

    })

    function raf() {
      position += speed
      speed *= 0.8

      // Clamp position so we don't have infinite scroll
      // position = Math.min(Math.max(position, 0), 15)

      let pos = (position % objs.length)

      objs.forEach((o, i) => {
        o.dist = Math.min(Math.abs(pos - i), 1)
        o.dist = 1 - o.dist**2

        // let scale = 1 + 0.9 * o.dist
        let scale = 3 + 8 * o.dist
        let radius = 10.

        // Circle Shape
        let angle = ((i - pos) / objs.length) * Math.PI * 2;
        /* sketch.meshes[i].position.x = radius * Math.cos(angle) + (10 * o.dist)
        sketch.meshes[i].position.y = radius * Math.sin(angle)
        sketch.meshes[i].position.z = o.dist * 10.; */

        // Horizontal Slider
        sketch.meshes[i].position.y = (i * 4) - (position * 4)
        sketch.meshes[i].position.z = o.dist * 1.;
    

        sketch.meshes[i].scale.set(scale, scale, scale)
        sketch.meshes[i].material.uniforms.distanceFromCenter.value = o.dist;
        
      })

      position += -(position - attractTo) * 0.01

      window.requestAnimationFrame(raf)
    }

    setTimeout(() => {
      /* window.addEventListener('wheel', (e) => {
        speed += (e.deltaY * 0.0002)
      }) */
      raf()
    }, 3000)

    
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
        navs.forEach(n => {
          //if (n.getAttribute('data-nav') == attractTo) {
          if (n.getAttribute('data-nav') === String(attractTo)) {
            n.classList.add('text-white')
            n.classList.remove('text-gray-800')
          } else {
            n.classList.add('text-gray-800')
            n.classList.remove('text-white')
          }
        })

      })

      gsap.to(el, {
        x: 0,
        opacity: 1,
        delay: 1+ i * 0.1
      })

    })

  }, [])

  return (
    <section className='relative'>
      <div className="animate-list font-panchang font-bold nav fixed z-30 h-1/2 left-8 top-1/2 transform -translate-y-1/2 text-white mix-blend-difference">
        {images.map((im, i) => {
          return(
            <div key={i} className={`item opacity-0 -translate-x-10 text-2xl my-2 ${i === 0 ? 'text-white' : 'text-gray-800'} `} data-nav={i}>{im.label}</div>
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
      <div id="container" className={`${width} h-screen fixed top-0 left-0 z-10 pointer-events-none `} />
    </section>
  )
}

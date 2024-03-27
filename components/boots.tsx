'use client'

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import Sketch from './three-boots/module'
import { useThemeContext } from '@/components/theme'
import * as THREE from 'three'
import gsap from 'gsap'

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';


export default function BootsWrapper() {

  const sketchRef = useRef<any>();
  const meshesRef = useRef<any[]>([]);
  const [settings, setSettings] = useState(false)
  const [selectedItem, setSelectedItem] = useState('base')
  const [textureSize, setTextureSize] = useState(false)

  const parts = [
    {
      name: 'base'
    },
    {
      name: 'chrome'
    },
    {
      name: 'cloth'
    },
    {
      name: 'lace'
    },
    {
      name: 'metal'
    },
    {
      name: 'plastic_1'
    },
    {
      name: 'plastic_2'
    },
  ]

  useLayoutEffect(() => {
    let sketch = new Sketch({
      dom: document.getElementById('container')
    })

    sketchRef.current = sketch
    meshesRef.current = sketch.meshes

    let items = Array.from(document.querySelectorAll(".item")) as HTMLImageElement[];

    items.forEach((im, i) => {
      gsap.to(im, {
        opacity: 1,
        left: 0,
        delay: 1.5 + i * 0.3
      })
    })


  }, [])

  useEffect(() => {

    meshesRef.current.forEach((mesh:any) => {
      if (selectedItem === 'plastic_1') {
        if(mesh.name === 'plastic_right_1' || mesh.name === 'plastic_left_1') {
          const color = mesh.material.color
          gsap.to(mesh.material.color, {
            r: 1,
            g: 1,
            b: 0,
            duration: 0.5
          })
          gsap.to(mesh.material.color, {
            r: color.r,
            g: color.g,
            b: color.b,
            delay: 0.5
          })
        }
      } else if (selectedItem === 'plastic_2') {
        if(mesh.name === 'plastic_right_2' || mesh.name === 'plastic_left_2') {
          const color = mesh.material.color
          gsap.to(mesh.material.color, {
            r: 1,
            g: 1,
            b: 0,
            duration: 0.5
          })
          gsap.to(mesh.material.color, {
            r: color.r,
            g: color.g,
            b: color.b,
            delay: 0.5
          })
        }
      } else {
        if (mesh.name.includes(selectedItem)) {
          const color = mesh.material.color
          gsap.to(mesh.material.color, {
            r: 1,
            g: 1,
            b: 0,
            duration: 0.5
          })
          gsap.to(mesh.material.color, {
            r: color.r,
            g: color.g,
            b: color.b,
            delay: 0.5
          })
        }
      }
    })
    switch (selectedItem) {
      case 'base':
        gsap.to(sketchRef.current.camera.position, {
          x: 0.,
          y: -40.,
          z: 60
        })
        break
      case 'chrome':
        gsap.to(sketchRef.current.camera.position, {
          x: 100.,
          y: 0.,
          z: -35
        })
        break
      case 'cloth':
        gsap.to(sketchRef.current.camera.position, {
          x: 50.,
          y: 40.,
          z: 70
        })
        break
      case 'lace':
        gsap.to(sketchRef.current.camera.position, {
          x: 30.,
          y: 40.,
          z: 30
        })
        break
      case 'metal':
        gsap.to(sketchRef.current.camera.position, {
          x: 50.,
          y: 0.,
          z: -50
        })
        break
      case 'plastic_1':
        gsap.to(sketchRef.current.camera.position, {
          x: -50.,
          y: 0.,
          z: -50
        })
        break
      case 'plastic_2':
        gsap.to(sketchRef.current.camera.position, {
          x: -50.,
          y: 0.,
          z: 60
        })
        break
      default:
        console.log(sketchRef.current)
        gsap.to(sketchRef.current.camera.position, {
          x: 0.,
          y: 0.,
          z: 0
        })
        break
    }
  }, [selectedItem])

  function hexToRgb(hex:any) {
    // Remove the '#' character if present
    hex = hex.replace('#', '');

    // Parse the hexadecimal color to separate red, green, and blue components
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Return the RGB values as an object
    return `rgb(${r}, ${g}, ${b})`;
  }
  const handleColor = (e:any) => {
    let decimalColor = hexToRgb(e.target.value);

    meshesRef.current.forEach((m:any) => {
      if (selectedItem === 'plastic_1') {
        if(m.name === 'plastic_right_1' || m.name === 'plastic_left_1') {
          m.material.color = new THREE.Color(decimalColor)
        }
      } else if (selectedItem === 'plastic_2') {
        if(m.name === 'plastic_right_2' || m.name === 'plastic_left_2') {
          m.material.color = new THREE.Color(decimalColor)
        }
      } else {
        if (m.name.includes(selectedItem)) {
          m.material.color = new THREE.Color(decimalColor)
        }
      }
    })
  }

  const handleRoughness = (e:any) => {
    meshesRef.current.forEach((mesh, i) => {
      if (selectedItem === 'plastic_1') {
        if(mesh.name === 'plastic_right_1' || mesh.name === 'plastic_left_1') {
          mesh.material.roughness = e.target.value / 100
        }
      } else if (selectedItem === 'plastic_2') {
        if(mesh.name === 'plastic_right_2' || mesh.name === 'plastic_left_2') {
          mesh.material.roughness = e.target.value / 100
        }
      } else {
        if (mesh.name.includes(selectedItem)) {
          mesh.material.roughness = e.target.value / 100
        }
      }
      
    })
  }
  
  const handleMetalness = (e:any) => {
    meshesRef.current.forEach((mesh, i) => {
      if (selectedItem === 'plastic_1') {
        if(mesh.name === 'plastic_right_1' || mesh.name === 'plastic_left_1') {
          mesh.material.metalness = e.target.value / 100
        }
      } else if (selectedItem === 'plastic_2') {
        if(mesh.name === 'plastic_right_2' || mesh.name === 'plastic_left_2') {
          mesh.material.metalness = e.target.value / 100
        }
      } else {
        if (mesh.name.includes(selectedItem)) {
          mesh.material.metalness = e.target.value / 100
        }
      }
    })
  }

  const handleSettings = () => {
    setSettings(!settings)
  }

  const handleTexture = (e:any) => {
    if (e.target.src) {
      setTextureSize(true)
      const url = e.target.src
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(url, (texture:any) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        meshesRef.current.forEach(mesh => {
          if (selectedItem === 'plastic_1') {
            if(mesh.name === 'plastic_right_1' || mesh.name === 'plastic_left_1') {
              mesh.material.map = texture
            }
          } else if (selectedItem === 'plastic_2') {
            if(mesh.name === 'plastic_right_2' || mesh.name === 'plastic_left_2') {
              mesh.material.map = texture
            }
          } else {
            if (mesh.name.includes(selectedItem)) {
              mesh.material.map = texture
            }
          }
          mesh.material.needsUpdate = true
        })
      });
    } else {
      setTextureSize(false)
      meshesRef.current.forEach(mesh => {
        if (selectedItem === 'plastic_1') {
          if(mesh.name === 'plastic_right_1' || mesh.name === 'plastic_left_1') {
            mesh.material.map = null
          }
        } else if (selectedItem === 'plastic_2') {
          if(mesh.name === 'plastic_right_2' || mesh.name === 'plastic_left_2') {
            mesh.material.map = null
          }
        } else {
          if (mesh.name.includes(selectedItem)) {
            mesh.material.map = null
          }
        }
        mesh.material.needsUpdate = true
      })
    }

  }

  const handleTextureSize = (e:any) => {
    meshesRef.current.forEach((mesh:any) => {
      
      if (selectedItem === 'plastic_1') {
        if(mesh.name === 'plastic_right_1' || mesh.name === 'plastic_left_1') {
          mesh.material.map.repeat.x = 1 + (e.target.value / 100) * 10
          mesh.material.map.repeat.y = 1 + (e.target.value / 100) * 10
        }
      } else if (selectedItem === 'plastic_2') {
        if(mesh.name === 'plastic_right_2' || mesh.name === 'plastic_left_2') {
          mesh.material.map.repeat.x = 1 + (e.target.value / 100) * 10
          mesh.material.map.repeat.y = 1 + (e.target.value / 100) * 10
        }
      } else {
        if (mesh.name.includes(selectedItem)) {
          mesh.material.map.repeat.x = 1 + (e.target.value / 100) * 10
          mesh.material.map.repeat.y = 1 + (e.target.value / 100) * 10
        }
      }
    })
  }

  return (
    <section className='relative h-screen'>

      <div className="absolute animate-show-up opacity-0 bottom-0 w-full bg-transparent backdrop-blur-2xl z-20 px-5">
        <Swiper navigation={true} loop={true} modules={[Navigation]} onSlideChange={(slide) => setSelectedItem(parts[slide.realIndex].name)} className="mySwiper text-white lg:max-w-screen-xl w-full h-full">
        {parts.map((p, i) => {
          return(
            <SwiperSlide key={p.name} className={`relative font-panchang font-bold`}>
              <div className={`px-8 pb-16 lg:px-28 lg:pb-28 transition-all ${settings ? 'pt-28' : 'pt-12'}`}>
                <div className={`flex gap-5 lg:gap-10 justify-center items-center transition-all ${settings ? 'mb-4' : 'mb-0'} `}>
                  <h2 className="text-2xl relative capitalize text-center">{p.name.replace('_', ' ')}</h2>
                  <img className={`w-10 h-10 cursor-pointer transition-all w-5 h-5 ${settings ? 'rotate-90' : '-rotate-90'}`} src="./arrow-white.svg" onClick={handleSettings} />
                </div>
                
                <div className={`flex justify-center lg:justify-between items-center w-full overflow-hidden transition-all ${settings ? 'max-h-44' : 'max-h-0'} px-5 lg:px-28`}>
                  <div className="mb-2.5 text-center">
                    <h2 className="font-panchang font-bold text-white">Color</h2>
                    <input className="colorchange appearance-none border-none bg-transparent w-10 h-10 accent-black cursor-pointer" type="color" value="#aaaaaa" onChange={handleColor} />
                  </div>
                  <div className="mb-2.5 text-center hidden lg:block">
                    <h2 className="font-panchang font-bold text-white">Roughness</h2>
                    <input className="accent-black cursor-pointer" type="range" onChange={handleRoughness} />
                  </div>
                  <div className="mb-2.5 text-center hidden lg:block">
                    <h2 className="font-panchang font-bold text-white">Metalness</h2>
                    <input className="accent-black cursor-pointer" type="range" onChange={handleMetalness} />
                  </div>
                  <div className="flex-wrap text-center hidden lg:flex justify-end gap-2.5">
                    <div className="w-10 h-10 border-black border-2 cursor-pointer rounded-full" onClick={handleTexture}/>
                    <img className="w-10 h-10 cursor-pointer rounded-full" src='./images/boot/textures/lines.jpg' onClick={handleTexture}/>
                    <img className="w-10 h-10 cursor-pointer rounded-full" src='./images/boot/textures/denim.jpg' onClick={handleTexture}/>
                    <img className="w-10 h-10 cursor-pointer rounded-full" src='./images/boot/textures/leather.png' onClick={handleTexture}/>
                    <img className="w-10 h-10 cursor-pointer rounded-full" src='./images/boot/textures/pattern.png' onClick={handleTexture}/>
                  </div>
                  {textureSize && (
                    <div className="mb-2.5 hidden lg:block">
                      <h2 className="font-panchang font-bold text-white">Texture Size</h2>
                      <input className="accent-black cursor-pointer" type="range" onChange={handleTextureSize} />
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          )
        })}
        </Swiper>
      </div>

      <div id="container" className={`w-full h-screen fixed top-0 left-0 z-10 pointer-events-all `} />
    </section>
  )
}

const SlideImg = ({img}:{img:String}) => {

  return (
    <img className="item w-20 h-20 cursor-pointer opacity-0 relative -left-4" src={`./images/boot/`+img+`.png`} alt={img} />
  )
}
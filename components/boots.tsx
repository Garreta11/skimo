'use client'

import { useEffect, useRef, useState } from "react"
import Sketch from './three-boots/module'
import { useThemeContext } from '@/components/theme'
import * as THREE from 'three'


export default function BootsWrapper() {

  const meshesRef = useRef()

  const { menu } = useThemeContext();
  const [width, setWidth] = useState('w-full')

  const [settings, setSettings] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')
  const [textureSize, setTextureSize] = useState(false)


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

    meshesRef.current = sketch.meshes
  }, [])

  useEffect(() => {
    let items = [...document.querySelectorAll(".item")]
    items.forEach((im, i) => {
      if (im.alt == selectedItem) {
        // opacity
        /* im.classList.add('opacity-1')
        im.classList.remove('opacity-60') */

        // width and height
        im.classList.add('w-40')
        im.classList.add('h-40')
        im.classList.remove('w-20')
        im.classList.remove('h-20')
      } else {
        // opacity
        /* im.classList.remove('opacity-1')
        im.classList.add('opacity-60') */

        // width and height
        im.classList.remove('w-40')
        im.classList.remove('h-40')
        im.classList.add('w-20')
        im.classList.add('h-20')
      }
    })
  }, [selectedItem])

  const handleItem = (item: string) => {
    setSelectedItem(item)
    setSettings(true)
  } 

  function hexToRgb(hex) {
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

    meshesRef.current.forEach((mesh, i) => {
      if (selectedItem === 'plastic_1') {
        if(mesh.name === 'plastic_right_1' || mesh.name === 'plastic_left_1') {
          mesh.material.color = new THREE.Color(decimalColor)
        }
      } else if (selectedItem === 'plastic_2') {
        if(mesh.name === 'plastic_right_2' || mesh.name === 'plastic_left_2') {
          mesh.material.color = new THREE.Color(decimalColor)
        }
      } else {
        if (mesh.name.includes(selectedItem)) {
          mesh.material.color = new THREE.Color(decimalColor)
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
    setSelectedItem('')
    setSettings(false)
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
    <section className='relative'>
      <div className="fixed rounded h-fit z-20 text-white top-1/2 left-0 p-8 transform -translate-y-1/2 flex flex-wrap flex-col justify-center font-panchang font-bold">
        <img className="item w-20 h-20 transition-all cursor-pointer hover:w-40 hover:h-40" src="./images/boot/base.png" alt="base" onClick={() => handleItem('base')}/>
        <img className="item w-20 h-20 transition-all cursor-pointer hover:w-40 hover:h-40" src="./images/boot/chrome.png" alt="chrome" onClick={() => handleItem('chrome')} />
        <img className="item w-20 h-20 transition-all cursor-pointer hover:w-40 hover:h-40" src="./images/boot/cloth.png" alt="cloth" onClick={() => handleItem('cloth')} />
        <img className="item w-20 h-20 transition-all cursor-pointer hover:w-40 hover:h-40" src="./images/boot/lace.png" alt="lace" onClick={() => handleItem('lace')} />
        <img className="item w-20 h-20 transition-all cursor-pointer hover:w-40 hover:h-40" src="./images/boot/metal.png" alt="metal" onClick={() => handleItem('metal')} />
        <img className="item w-20 h-20 transition-all cursor-pointer hover:w-40 hover:h-40" src="./images/boot/plastic_1.png" alt="plastic_1" onClick={() => handleItem('plastic_1')} />
        <img className="item w-20 h-20 transition-all cursor-pointer hover:w-40 hover:h-40" src="./images/boot/plastic_2.png" alt="plastic_2" onClick={() => handleItem('plastic_2')} />
      </div>

      <div className={`fixed flex flex-col justify-center w-1/4 font-panchang font-bold border-4 border-r-0 border-black backdrop-blur min-h-1-2 z-20 right-0 p-8 top-1/2 transform -translate-y-1/2 text-right text-black transition-all ${settings ? 'translate-x-0 opacity-1' : 'translate-x-1/2 opacity-0'}`}>
        <p className="cursor-pointer absolute right-3 top-3" onClick={handleSettings}>&#8594;</p>

        <h2 className="text-2xl mb-4">CoNFIGURAToR</h2>
        <div className="mb-2.5">
          <h2 className="font-panchang font-bold text-black">Color</h2>
          <input className="relative" type="color" onChange={handleColor} />
        </div>

        <div className="mb-2.5">
          <h2 className="font-panchang font-bold text-black">Roughness</h2>
          <input type="range" onChange={handleRoughness} />
        </div>
        
        <div className="mb-2.5">
          <h2 className="font-panchang font-bold text-black">Metalness</h2>
          <input type="range" onChange={handleMetalness} />
        </div>

        <div className="flex flex-wrap justify-end gap-2.5">
          <div className="w-16 h-16 border-black border-2 cursor-pointer grayscale hover:grayscale-0 transition-all" onClick={handleTexture}/>
          <img className="w-16 h-16 cursor-pointer grayscale hover:grayscale-0 transition-all" src='./images/boot/textures/lines.jpg' onClick={handleTexture}/>
          <img className="w-16 h-16 cursor-pointer grayscale hover:grayscale-0 transition-all" src='./images/boot/textures/denim.jpg' onClick={handleTexture}/>
          <img className="w-16 h-16 cursor-pointer grayscale hover:grayscale-0 transition-all" src='./images/boot/textures/leather.png' onClick={handleTexture}/>
          <img className="w-16 h-16 cursor-pointer grayscale hover:grayscale-0 transition-all" src='./images/boot/textures/pattern.png' onClick={handleTexture}/>
        </div>

        {textureSize && (
          <div className="mb-2.5">
            <h2 className="font-panchang font-bold text-black">Texture Size</h2>
            <input className="accent-black" type="range" onChange={handleTextureSize} />
          </div>
        )}
      </div>

      <div id="container" className={`${width} h-screen fixed top-0 left-0 z-10 pointer-events-all `} />
    </section>
  )
}

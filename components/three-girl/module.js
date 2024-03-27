import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import Resources from './resources'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default class Sketch {
  constructor(options) {
    this.scene = new THREE.Scene()

    this.container = options.dom
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.width, this.height)
    this.renderer.setClearColor(0x3e75c7, 0)
    // this.renderer.outputEncoding = THREE.sRGBEncoding

    this.container.appendChild(this.renderer.domElement)

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )

    this.loader = new FBXLoader()
    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()

    this.camera.position.set(0, 0, 400)
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.time = 0

    this.isPlaying = true

    const color = 0xffffff // white
    const near = 10
    const far = 500
    this.scene.fog = new THREE.Fog(color, near, far)

    this.meshes = []
    this.model
    this.mountains
    this.mixer

    this.sources = [
      {
        name: 'lady',
        type: 'fbxModel',
        path: './skiing-lady/source/ski24_sketchfab_003.fbx'
      },
      {
        name: 'mountaintexture',
        type: 'texture',
        file: './images/mountain/texture2.jpeg'
      },
      {
        name: 'mountainheight',
        type: 'texture',
        file: './images/mountain/height.png'
      },
      {
        name: 'envmap',
        type: 'envmap',
        file: './envMap/snow_low.hdr'
      }
    ]

    this.resources = new Resources(this.sources)

    this.resources.on('ready', () => {
      console.log('READY')
      this.envMap()
      this.addLights()
      this.addObjects()
      this.resize()
      this.render()
      this.setupResize()
    })

    // this.settings();

    window.addEventListener('mousemove', e => {
      this.mouse.x = e.clientX
      this.mouse.y = e.clientY
    })
  }

  scale = (number, [inMin, inMax], [outMin, outMax]) => {
    // if you need an integer value use Math.floor or Math.ceil here
    return ((number - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
  }

  settings() {
    let that = this
    this.settings = {
      progress: 0
    }
    this.gui = new dat.GUI()
    this.gui.add(this.settings, 'progress', 0, 1, 0.01)
  }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this))
  }

  resize() {
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.renderer.setSize(this.width, this.height)
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
  }

  envMap() {
    /* console.log(this.resources.items.envmap)
    const rgbeloader = new RGBELoader()

    rgbeloader.load('/envMap/snow_low.hdr', environmentMap => {
      environmentMap.mapping = THREE.EquirectangularReflectionMapping
      // this.scene.background = environmentMap
      // this.scene.backgroundIntensity = 0.1
      this.scene.environment = environmentMap
    }) */

    this.resources.items.envmap.mapping = THREE.EquirectangularReflectionMapping
    this.scene.environment = this.resources.items.envmap
  }

  addLights() {
    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    this.scene.add(ambientLight)

    // Directional Light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(5, 5, 5)
    this.scene.add(directionalLight)
  }

  addObjects() {
    this.model = this.resources.items.lady
    this.resources.items.lady.rotation.x = 0.15 * Math.PI
    this.resources.items.lady.traverse(child => {
      if (child.isMesh) {
        this.meshes.push(child)
      }
      if (child.isMesh) {
        if (child.name === 'ground') {
          // Apply a new material to the child object
          const newMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            transparent: true,
            opacity: 0.0
          }) // Example material
          child.material = newMaterial
        } else {
          // Apply a new material to the child object
          const newMaterial = new THREE.MeshStandardMaterial({
            roughness: 0.3,
            metalness: 1,
            color: 0xaaaaaa
          }) // Example material
          child.material = newMaterial
        }
      }
    })
    this.scene.add(this.resources.items.lady)

    this.resources.items.lady.position.z = 399
    this.resources.items.lady.scale.setScalar(0)
    gsap.to(this.resources.items.lady.scale, {
      x: 0.002,
      y: 0.002,
      z: 0.002,
      duration: 2,
      delay: 2.5
    })

    this.mixer = new THREE.AnimationMixer(this.resources.items.lady)
    const action = this.mixer.clipAction(
      this.resources.items.lady.animations[0]
    )

    const duration = this.resources.items.lady.animations[0].duration

    ScrollTrigger.create({
      trigger: '.page',
      start: 'top bottom',
      end: `bottom top`,
      scrub: true,
      markers: false,
      onUpdate: self => {
        const time = duration * self.progress * 2
        this.mixer.setTime(time)
      }
    })

    this.mixer.setTime(0)
    action.play()

    this.addMountains()
  }

  addMountains() {
    const geometry = new THREE.PlaneGeometry(20, 10, 256, 256)
    this.materialmountains = new THREE.MeshStandardMaterial({
      color: 0xfffafa,
      wireframe: false,
      map: this.resources.items.mountaintexture,
      displacementMap: this.resources.items.mountainheight,
      displacementScale: 2,
      transparent: true,
      opacity: 0
    })

    this.mountains = new THREE.Mesh(geometry, this.materialmountains)
    this.mountains.position.z = 398
    this.mountains.position.y = -0.8
    this.mountains.rotation.x = -Math.PI / 3
    this.scene.add(this.mountains)

    ScrollTrigger.create({
      trigger: '.mountain',
      start: 'top 60%',
      end: `bottom 40%`,
      scrub: true,
      markers: false,
      onUpdate: self => {
        this.mountains.material.opacity = self.progress

        this.renderer.setClearColor(0x3e75c7, self.progress)
        // gsap.to(scene.background,{ r:1, g:1, b:1, duration: 2 })
      }
    })
  }

  stop() {
    this.isPlaying = false
  }

  play() {
    if (!this.isPlaying) {
      this.render()
      this.isPlaying = true
    }
  }

  render() {
    if (!this.isPlaying) return
    this.time += 0.05

    if (this.materials) {
      this.materials.forEach(m => {
        m.uniforms.time.value = this.time
      })
    }

    if (this.materialmountains) {
      this.mountains.rotation.z = this.time * 0.03
      this.materialmountains.displacementScale = this.scale(
        this.mouse.x,
        [0, window.innerWidth],
        [1, 1.5]
      )
    }

    requestAnimationFrame(this.render.bind(this))
    this.renderer.render(this.scene, this.camera)
  }
}

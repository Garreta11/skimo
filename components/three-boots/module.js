import * as THREE from 'three'
import fragment from './shader/fragment.glsl'
import vertex from './shader/vertex.glsl'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Resources from './resources'
import gsap from 'gsap'

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
    this.renderer.setClearColor(0xffffff, 1)
    // this.renderer.outputEncoding = THREE.sRGBEncoding

    this.container.appendChild(this.renderer.domElement)

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      1000
    )

    this.loader = new FBXLoader()
    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()

    this.camera.position.set(0, 0, 70)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableZoom = true
    this.controls.minDistance = 40
    this.controls.maxDistance = 80
    this.controls.enablePan = false
    this.time = 0

    this.isPlaying = true

    this.model
    this.environmentMap
    this.meshes = []

    this.sources = [
      {
        name: 'boots',
        type: 'fbxModel',
        path: './ski-boot/Ski_Boots_bw.fbx'
      },
      {
        name: 'envmap',
        type: 'envmap',
        path: './envMap/snow_low.hdr'
      }
    ]

    this.resources = new Resources(this.sources)
    this.resources.on('ready', () => {
      console.log(this.resources)
      this.envMap()
      this.addLights()
      this.addObjects()
      this.resize()
      this.render()
      this.setupResize()
    })

    // this.settings();
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
    this.resources.items.envmap.mapping = THREE.EquirectangularReflectionMapping
    this.scene.background = this.resources.items.envmap
    this.scene.backgroundIntensity = 0.1
    this.scene.environment = this.resources.items.envmap
  }

  addLights() {
    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0)
    this.scene.add(ambientLight)

    // Directional Light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 10)
    directionalLight.position.set(1, 1, 1)
    this.scene.add(directionalLight)
  }

  addObjects() {
    let that = this
    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: '#extension GL_OES_standard_derivatives : enable'
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { type: 'f', value: 0 },
        distanceFromCenter: { type: 'f', value: 0 },
        texture1: { type: 't', value: null },
        resolution: { type: 'v4', value: new THREE.Vector4() },
        uvRate1: {
          value: new THREE.Vector2(1, 1)
        }
      },
      // wireframe: true,
      transparent: true,
      vertexShader: vertex,
      fragmentShader: fragment
    })

    this.resources.items.boots.traverse(child => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          roughness: 0.3,
          metalness: 1,
          color: 0xaaaaaa
        })
        child.material.envMapIntensity = 3
        child.material.depthWrite = true
        this.meshes.push(child)
      }
    })
    this.scene.add(this.resources.items.boots)

    this.resources.items.boots.scale.setScalar(0)
    gsap.to(this.resources.items.boots.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 2,
      delay: 1.5
    })
    gsap.to(this.resources.items.boots.rotation, {
      z: -2.1 * Math.PI,
      duration: 2,
      delay: 1.5
    })

    this.resources.items.boots.position.set(0, -10, 0)
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

    this.material.uniforms.time.value = this.time
    requestAnimationFrame(this.render.bind(this))
    this.renderer.render(this.scene, this.camera)
  }
}

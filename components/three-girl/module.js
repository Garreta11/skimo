import * as THREE from 'three'
import fragment from './shader/fragment.glsl'
import vertex from './shader/vertex.glsl'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
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
    this.renderer.setClearColor(0xffffff, 0)
    this.renderer.outputEncoding = THREE.sRGBEncoding

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

    this.model
    this.meshes = []
    this.mixer

    this.sources = [
      {
        name: 'lady',
        type: 'fbxModel',
        // path: './skiing-lady/lady.fbx'
        path: './skiing-lady/source/ski24_sketchfab_003.fbx'
      }
    ]

    this.envMap()
    this.addLights()
    this.addObjects()
    this.resize()
    this.render()
    this.setupResize()
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
    /* const cubeTexture = new THREE.CubeTextureLoader()
    // LDR Cube Texture
    this.environmentMap = cubeTexture.load([
      '/envMap/px.png',
      '/envMap/nx.png',
      '/envMap/py.png',
      '/envMap/ny.png',
      '/envMap/pz.png',
      '/envMap/nz.png'
    ])
    this.scene.background = this.environmentMap
    this.scene.environment = this.environmentMap */

    const rgbeloader = new RGBELoader()

    rgbeloader.load('/envMap/snow.hdr', environmentMap => {
      environmentMap.mapping = THREE.EquirectangularReflectionMapping
      // this.scene.background = environmentMap
      // this.scene.backgroundIntensity = 0.1
      this.scene.environment = environmentMap
    })
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

    this.resources = new Resources(this.sources)

    this.resources.on('ready', () => {
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
          console.log(self.progress)
          const time = duration * self.progress * 2
          this.mixer.setTime(time)

          // const newPositionY = THREE.MathUtils.lerp(350, -100, self.progress);
          // fbxRef.current.position.y = newPositionY;
          // camera.lookAt(fbxRef.current.position);
        }
      })

      action.play()
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

    this.material.uniforms.time.value = this.time
    requestAnimationFrame(this.render.bind(this))
    this.renderer.render(this.scene, this.camera)
  }
}

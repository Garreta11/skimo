import * as THREE from 'three'
import fragment from './shader/fragment.glsl'
import vertex from './shader/vertex.glsl'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
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
    this.renderer.setClearColor(0x080808, 1)
    // this.renderer.outputEncoding = THREE.sRGBEncoding

    this.container.appendChild(this.renderer.domElement)

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.001,
      1000
    )

    this.loader = new THREE.TextureLoader()
    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()

    // var frustumSize = 10;
    // var aspect = window.innerWidth / window.innerHeight;
    // this.camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, -1000, 1000 );
    this.camera.position.set(0, 0, 5)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.time = 0

    this.isPlaying = true

    this.addObjects()
    this.resize()
    this.render()
    this.setupResize()
    // this.settings();
    this.materials = []
    this.meshes = []
    this.groups = []
    this.handleImages()
    // this.handleClick()

    this.onMouseMove = this.onMouseMove.bind(this)
    document.addEventListener('mousemove', this.onMouseMove, false)
  }

  onMouseMove(event) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  }

  handleImages() {
    let images = [...document.querySelectorAll('.gallery-images')]
    images.forEach((im, i) => {
      let mat = this.material.clone()

      this.materials.push(mat)

      let group = new THREE.Group()

      this.loader.load(
        im.src,
        function (texture) {
          mat.uniforms.texture1.value = texture
        },
        function (err) {
          console.error('An error happened.')
        }
      )

      let geo = new THREE.PlaneGeometry(1.5, 1, 20, 20)
      let mesh = new THREE.Mesh(geo, mat)
      group.add(mesh)
      this.groups.push(group)
      this.scene.add(group)
      this.meshes.push(mesh)

      group.position.y = -10
    })
  }

  handleClick() {
    this.meshes.forEach((mesh, i) => {
      console.log(mesh)
    })
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

    /* this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1)

    this.plane = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.plane) */
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

    /* if (this.meshes) {
      this.raycaster.setFromCamera(this.mouse, this.camera)
      var intersects = this.raycaster.intersectObjects(this.scene.children)
      if (intersects.length > 0) {
        // console.log(intersects[0].object)
        // intersects[0].object.scale.set(20, 20, 20)
        gsap.to(intersects[0].object.scale, {
          duration: 0.3,
          x: 15,
          y: 15,
          z: 15
        })
      }
    } */

    this.material.uniforms.time.value = this.time
    requestAnimationFrame(this.render.bind(this))
    this.renderer.render(this.scene, this.camera)
  }
}

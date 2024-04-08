import EventEmitter from './EventEmitter'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

export default class Resources extends EventEmitter {
  constructor(sources) {
    super()
    this.sources = sources

    this.items = {}
    this.toLoad = this.sources.length

    this.loaded = 0

    /* this.loadingManager = new THREE.LoadingManager()

    this.loadingManager.onProgress = function () {
      console.log('IT IS LOADED !!')
    } */
    /* this.loadingManager.onLoad = function () {
      console.log('IT IS LOADED !!')
    } */

    this.setLoaders()
    this.startLoading()
  }

  setLoaders() {
    this.loaders = {}
    this.loaders.gltfLoader = new GLTFLoader(this.loadingManager)
    this.loaders.fbxLoader = new FBXLoader(this.loadingManager)
    this.loaders.textureLoader = new THREE.TextureLoader(this.loadingManager)
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader(
      this.loadingManager
    )
    this.loaders.rgbeLoader = new RGBELoader(this.loadingManager)
  }

  startLoading() {
    const progressbar = document.getElementById('progress-bar')
    progressbar.value = 0
    const progressBarContainer = document.getElementById(
      'progress-bar-container'
    )
    progressBarContainer.style.display = 'flex'
    for (const source of this.sources) {
      if (source.type === 'gltfModel') {
        this.loaders.gltfLoader.load(source.path, model => {
          this.sourceLoaded(source, model)
        })
      } else if (source.type === 'fbxModel') {
        this.loaders.fbxLoader.load(source.path, model => {
          this.sourceLoaded(source, model)
        })
      } else if (source.type === 'texture') {
        this.loaders.textureLoader.load(source.file, file => {
          this.sourceLoaded(source, file)
        })
      } else if (source.type === 'cubeTexture') {
        this.loaders.cubeTextureLoader.load(source.path, file => {
          this.sourceLoaded(source, file)
        })
      } else if (source.type === 'envmap') {
        this.loaders.rgbeLoader.load(source.file, file => {
          this.sourceLoaded(source, file)
        })
      }
    }
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file
    this.loaded++
    const progressbar = document.getElementById('progress-bar')
    progressbar.value = 100 * (this.loaded / this.toLoad)
    if (this.loaded === this.toLoad) {
      const progressBarContainer = document.getElementById(
        'progress-bar-container'
      )
      progressBarContainer.style.display = 'none'
      this.trigger('ready')
    }
  }
}

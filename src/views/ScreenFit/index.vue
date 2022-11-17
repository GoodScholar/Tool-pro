<template>
  <div class="container">
    <canvas id="three"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
export default {
  name: 'TestIndex',
  props: {},
  components: {},
  data() {
    return {}
  },
  watch: {},
  computed: {},
  methods: {
    initThree() {
      const scene = new THREE.Scene()
      scene.background = new THREE.Color('#eee')
      const canvas = document.querySelector('#three')
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
      const camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
      camera.position.z = 10

      function animate() {
        renderer.render(scene, camera)
        requestAnimationFrame(animate)
      }
      animate()
    }
  },
  async created() {},
  async mounted() {
    this.initThree()
  }
}
</script>

<style lang="scss" scoped>
#three {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
</style>

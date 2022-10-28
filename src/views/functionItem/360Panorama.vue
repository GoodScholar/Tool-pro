<!--
  功能：360全景图
  时间：2022年10月10日 15:13:24
  版本：v1.0
-->
<template>
  <div id="container"></div>
</template>

<script>
import * as PanoLens from 'panolens'
import * as THREE from 'three'

let camera
let renderer
let scene

export default {
  data() {
    return {
      // 全景图路径
      bigImg: require('@/assets/imgs/view.jpg')
    }
  },
  mounted() {
    /**
     * @description 使用全景图函数**/
    this.$nextTick(() => {
      this.init_y()
      // this.init()
      // this.animate()
    })
  },
  methods: {
    init_y() {
      this.viewer = new PanoLens.Viewer({
        container: document.querySelector('#container'),
        controlButtons: ['fullscreen', 'setting', 'video'],
        autoRotate: true, // 自动播放
        autoRotateActivationDuration: 2000, // 时长
        autoRotateSpeed: 0.3 // 速度
      })

      this.littlePlanet = new PanoLens.ImagePanorama(
        require('@/assets/imgs/pragmata.jpg')
      )

      this.viewer.add(this.littlePlanet)
    },
    /**
     * @description 全景图参数配置**/
    init() {
      const container = document.getElementById('container')
      // 创建渲染器
      renderer = new THREE.WebGLRenderer()
      // antialias：抗锯齿----THREE.js创建的WebGLRenderer对象有抗锯齿选项的支持，这个选项默认是关闭的，所以需要显式开启一下。
      renderer.antialias = true
      // setPixelRatio：设置像素比率
      renderer.setPixelRatio(window.devicePixelRatio)
      // setSize：画布宽高
      renderer.setSize(window.innerWidth, window.innerHeight)
      // 判断容器中子元素的长度
      const childs = container.childNodes
      if (container.childNodes.length > 0) {
        container.removeChild(childs[0])
        container.appendChild(renderer.domElement)
      } else {
        container.appendChild(renderer.domElement)
      }

      // THREE.Scen：创建全景场景
      scene = new THREE.Scene()
      /**
       * @description PerspectiveCamera: 创建相机
       * PerspectiveCamera( fov : Number , aspect : Number , near : Number , far : Number )
       * fov - 相机平截头体垂直视野。
       * aspect - 相机平截头体纵横比。
       * near - 平面附近的相机平截头体。
       * far — 相机平截头体远平面。
       * **/
      camera = new THREE.PerspectiveCamera(
        120,
        window.innerWidth / window.innerHeight,
        1,
        100
      )

      // position.set( <X> , <Y> , <Z> ) ：设置相机位置,<X>和<Z>是 2D 坐标 并且<Y>是 高度
      camera.position.set(0, 0, 0)
      // up：相机以哪个方向为上方
      camera.up.set(0, 0, 1)
      const material = new THREE.MeshBasicMaterial() // 材质
      // 初始化一个加载器加载全景图片资源
      const texture = new THREE.TextureLoader().load(this.bigImg)
      material.map = texture
      const skyBox = new THREE.Mesh(
        new THREE.SphereBufferGeometry(100, 100, 100),
        material
      )
      /*
                    Mesh( geometry : BufferGeometry, material : Material )
                    geometry —— （可选）BufferGeometry的实例，默认值是一个新的BufferGeometry。
                    material —— （可选）一个Material，或是一个包含有Material的数组，默认是一个新的MeshBasicMaterial。
                */
      // .scale ( x : Float, y : Float, z : Float )缩放几何体。该操作一般在一次处理中完成，不会循环处理。典型的用法是通过调用 Object3D.scale 实时旋转几何体。
      skyBox.geometry.scale(1, 1, -1)
      scene.add(skyBox)

      // 监听窗口缩放事件
      window.addEventListener('resize', this.onWindowResize, false)
      // 用于判断鼠标是按下还是松开，通过鼠标预览全景图
      let bMouseDown = false
      // x,y：全景图的坐标位置
      let x = -1
      let y = -1
      // 添加鼠标点击事件
      container.onmousedown = function (event) {
        event.preventDefault() // 取消默认事件
        // console.log(event)
        x = event.clientX
        y = event.clientY
        bMouseDown = true
      }
      // 鼠标按键被松开时的坐标
      container.onmouseup = function (event) {
        event.preventDefault()
        bMouseDown = false
      }
      // 鼠标在全景图上移动坐标
      container.onmousemove = function (event) {
        event.preventDefault()
        if (bMouseDown) {
          skyBox.rotation.y += -0.005 * (event.clientX - x)
          skyBox.rotation.x += -0.005 * (event.clientY - y)

          if (skyBox.rotation.x > Math.PI / 2) {
            skyBox.rotation.x = Math.PI / 2
          }
          if (skyBox.rotation.x < -Math.PI / 2) {
            skyBox.rotation.x = -Math.PI / 2
          }
          x = event.clientX
          y = event.clientY
        }
      }
      // 鼠标滚轮滚动事件
      container.onmousewheel = function (event) {
        event.preventDefault()
        console.log(camera)
        console.log(event.wheelDelta)
        if (event.wheelDelta !== 0) {
          /**
           * @description
           * camera.fov： 相机平截头体垂直视野
           * event.wheelDelta：前后缩放的方向：前(120)，后(-12)
           * **/
          camera.fov += event.wheelDelta > 0 ? 1 : -1
          if (camera.fov > 150) {
            camera.fov = 150
          } else if (camera.fov < 30) {
            camera.fov = 30
          }
          // 用来手动更新相机的投影矩阵的
          camera.updateProjectionMatrix()
        }
      }
    },
    onWindowResize() {
      // 窗口缩放的时候,保证场景也跟着一起缩放
      camera.aspect = window.innerWidth / window.innerHeight
      // updateProjectionMatrix()：用来手动更新相机的投影矩阵的
      camera.updateProjectionMatrix()
      // 重置画布宽高
      renderer.setSize(window.innerWidth, window.innerHeight)
    },
    /**
     * @description **/
    animate() {
      requestAnimationFrame(this.animate)
      renderer.render(scene, camera)
    }
  }
}
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;
}
</style>

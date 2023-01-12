<template>
  <div id="app">
    <div class="divContainer">
      <vue-draggable-resizable
        v-for="(item, index) in arr"
        :key="index"
        :x="item.x"
        :y="item.y"
        :w="200"
        :h="200"
        :parent="true"
        :min-width="200"
        :min-height="200"
        :multiSelect="false"
        :selected="item.selected"
        @activated="activated($event, index)"
        @deactivated="deactivated($event, index)"
      >
        <p>vue-drag111111</p>
      </vue-draggable-resizable>
    </div>
  </div>
</template>

<script>
import VueDraggableResizable from '@/components/vue-draggable-resizable/vue-draggable-resizable.vue'
import '@/components/vue-draggable-resizable/vue-draggable-resizable.css'
export default {
  name: 'app',
  components: {
    VueDraggableResizable
  },
  data() {
    return {
      arr: [
        {
          x: 0,
          y: 0,
          name: '测试1',
          selected: false
        },
        {
          x: 300,
          y: 0,
          name: '测试2',
          selected: false
        }
      ]
    }
  },
  methods: {
    // 选中
    activated(e, index) {
      console.log('activated', e, index)

      if (e === 'radio') {
        this.arr.forEach((item) => {
          item.selected = false
        })
        this.arr[index].selected = true
      } else {
        this.arr[index].selected = true
      }
    },
    // 取消选中
    deactivated(e, index) {
      console.log('deactivated', e, index)
      // if (e === 'check') {
      //   this.arr[index].selected = false
      // }

      if (e === 'all') {
        this.arr.forEach((item) => {
          item.selected = false
        })
      }
    }
  }
}
</script>

<style>
.divContainer {
  height: 700px;
  width: 1100px;
  border: 1px solid red;
  position: relative;
}
.vdr {
  border: 1px dashed black;
}
</style>

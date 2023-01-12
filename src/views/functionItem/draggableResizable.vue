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
        :active="item.activated"
        @activated="activated(index)"
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
          activated: false
        },
        {
          x: 300,
          y: 0,
          name: '测试2',
          activated: false
        }
      ]
    }
  },
  methods: {
    activated(index) {
      // console.log(this.arr[index].activated, !this.arr[index].activated)
      // this.arr[index].activated = !this.arr[index].activated
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

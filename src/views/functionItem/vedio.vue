<!--
  功能：功能描述
  时间：2022年10月31日 15:59:29
  版本：v1.0
-->
<template>
  <div class="test__container">
    <div
      class="box"
      v-for="(item, index) in arr"
      :key="index"
      @click="clickBOX"
    >
      {{ item.id }}

      <!-- 保持在最后一个 -->
      <input type="checkbox" :value="item.id" v-model="idArr" class="IdIpt" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'demoItem1',
  props: {},
  components: {},
  data() {
    return {
      idArr: [],
      selectStr: '',
      arr: [
        {
          id: '1'
        },
        {
          id: '2'
        },
        {
          id: '3'
        },
        {
          id: '4'
        },
        {
          id: '5'
        },
        {
          id: '6'
        }
      ]
    }
  },
  watch: {
    idArr: {
      handler(newVal) {
        console.log(newVal)
        this.selectStr = newVal.join(',')
      },
      deep: true
    }
  },
  computed: {},
  methods: {
    clickBOX(e) {
      const lastIndex = e.target.children.length - 1
      const checkbox = e.target.children[lastIndex]

      if (checkbox) {
        checkbox.checked = !checkbox.checked
        if (checkbox.checked) {
          this.idArr.push(checkbox.defaultValue)
        } else {
          this.idArr = this.idArr.filter(
            (item) => item !== checkbox.defaultValue
          )
        }
      }
    },
    click1() {
      console.log('1')
    },
    click2() {
      console.log('2')
    }
  },
  created() {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
.test__container {
  display: flex;
  flex-wrap: nowrap;
}
.box {
  position: relative;
  width: 200px;
  height: 200px;
  line-height: 200px;
  text-align: center;
  background-color: pink;
  margin: 0 20px 20px 0;
}

.IdIpt {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 20px;
  height: 20px;
}
</style>

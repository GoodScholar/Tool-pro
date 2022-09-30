<template>
  <div class>
    <h1>测试自定义组件</h1>
    <lz-menu
      :menuItems="menuItems"
      :iActiveColor="iActiveColor"
      :DefaultIndex="0"
      @clickLzMenuItem="clickMenuItem"
    ></lz-menu>
  </div>
</template>

<script>
import LzMenu from '../components/LzMenu'
export default {
  name: 'tabsIndex',
  components: {
    LzMenu
  },
  data() {
    return {
      menuItems: [
        {
          id: 1,
          name: '通知公告'
        },
        {
          id: 2,
          name: '讲座预告'
        },
        {
          id: 3,
          name: '综合新闻'
        },
        {
          id: 4,
          name: '校园动态'
        },
        {
          id: 5,
          name: '教育教学'
        },
        {
          id: 6,
          name: '创新创业'
        },
        {
          id: 7,
          name: '开放办学'
        },
        {
          id: 8,
          name: '我爱我家1'
        },
        {
          id: 9,
          name: '我爱我家2'
        },
        {
          id: 10,
          name: '我爱我家3'
        },
        {
          id: 11,
          name: '我爱我家4'
        },
        {
          id: 12,
          name: '我qewqweqwe爱我家'
        },
        {
          id: 13,
          name: '我爱我qeqweqweqweqweq家'
        },
        {
          id: 14,
          name: '我爱我家5'
        },
        {
          id: 15,
          name: '我爱我家6'
        },
        {
          id: 16,
          name: '我爱我家7'
        }
      ],
      iActiveColor: '#ff0' // 选中时文本为黄色
    }
  },
  methods: {
    clickMenuItem(item) {
      console.log(item.name)
    }
  }
}
</script>

<style lang="scss" scoped></style>

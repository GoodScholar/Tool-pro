<!--
  功能：低代码
  时间：2022年10月27日 09:20:17
  版本：v1.0
-->
<template>
  <div class="low-container">
    <div class="header">
      <div class="header__left">
        <img src="@/assets/imgs/G-icon.png" alt="" />
        <span class="header__left-title">Shadow</span>
      </div>
    </div>

    <div class="container">
      <div class="left column">
        <h3>Element</h3>
        <draggable
          class="list__group"
          :list="list1"
          :group="{ name: 'people', pull: 'clone', put: false }"
          :clone="cloneDog"
          animation="300"
          @change="log"
        >
          <div
            class="list__group-item"
            v-for="(item, index) in componentList"
            :key="index"
            :data-component="item.component"
          >
            <span @click="itemClick(item)">{{ item.label }}</span>
          </div>
        </draggable>
      </div>
      <div class="center column">
        <h3>Draggable 2</h3>
        <draggable :list="list2" animation="300" group="people" @change="log">
          <div
            class="list-group-item"
            v-for="element in list2"
            :key="element.id"
          >
            {{ element.name }}
          </div>
        </draggable>
      </div>
      <div class="right column">right</div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
let idGlobal = 8
export default {
  name: 'custom-clone',
  display: 'Custom Clone',
  order: 3,
  components: {
    draggable
  },
  data() {
    return {
      componentList: [
        {
          label: '输入框',
          component: 'ElInput'
        },
        {
          label: '选择器',
          component: 'ElSelect'
        },
        {
          label: '单选框',
          component: 'ElRadio'
        },
        {
          label: '多选框',
          component: 'ElCheckbox'
        },
        {
          label: '日期选择器',
          component: 'ElDatePicker'
        }
      ],
      list1: [
        { name: 'dog 1', id: 1 },
        { name: 'dog 2', id: 2 },
        { name: 'dog 3', id: 3 },
        { name: 'dog 4', id: 4 }
      ],
      list2: [
        { name: 'cat 5', id: 5 },
        { name: 'cat 6', id: 6 },
        { name: 'cat 7', id: 7 }
      ]
    }
  },
  methods: {
    log(evt) {
      window.console.log(evt)
    },
    cloneDog({ id }) {
      return {
        id: idGlobal++,
        name: `cat ${id}`
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.low-container {
  height: 100vh;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 30px;
  border-bottom: 1px solid #ccc;
  .header__left {
    display: flex;
    align-items: center;

    img {
      width: 40px;
    }

    .header__left-title {
      font-size: 23px;
      font-weight: bold;
      padding-left: 20px;
    }
  }
}

.container {
  display: flex;
  height: 100%;
  background-color: #fff;
  .left,
  .right {
    width: 250px;
    padding: 0 10px;
  }

  .center {
    flex: 1;
    padding: 0 10px;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }
}

.list__group {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .list__group-item {
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin: 0 10px 5px 0;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    border-radius: 4px;
    box-sizing: border-box;
    min-width: calc((100% - 20px) / 2);
    max-width: calc((100% - 20px) / 2);
    &:nth-child(2n) {
      margin-right: 0;
    }

    &:hover {
      background: rgba($color: #409eff, $alpha: 0.1);
      border: 1px solid #409eff;
      color: #409eff;
    }
  }
}

.list-group-item {
  height: 30px;
  border: 1px solid red;
  margin-bottom: 20px;
}
</style>

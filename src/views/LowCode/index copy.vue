<!--
  功能：低代码
  时间：2022年10月27日 09:20:17
  版本：v1.0
-->
<template>
  <div class="itxst">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="left">
          <draggable
            v-model="arr1"
            @end="end1"
            v-bind="{ group: { name: 'itxst', pull: 'clone' }, sort: true }"
            animation="300"
            :move="onMove"
          >
            <transition-group>
              <div
                :class="item.id == 1 ? 'item forbid' : 'item'"
                v-for="item in arr1"
                :key="item.id"
              >
                {{ item.name }}
              </div>
            </transition-group>
          </draggable>
        </div>
      </el-col>
      <el-col :span="16">
        <draggable v-model="arr2" group="itxst">
          <transition-group>
            <div
              :class="item.id == 12 ? 'item2 forbid' : 'item2'"
              v-for="item in arr2"
              :key="item.id"
            >
              {{ item.name }}
            </div>
          </transition-group>
        </draggable>
      </el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'lowCode',
  components: {
    draggable
  },
  data() {
    return {
      arr1: [
        { id: 1, name: 'www.itxst.com（不允许停靠）' },
        { id: 2, name: 'www.jd.com' },
        { id: 3, name: 'www.baidu.com' },
        { id: 5, name: 'www.google.com' },
        { id: 4, name: 'www.taobao.com（不允许拖拽）' }
      ],
      arr2: [{ id: 11, name: '常用菜单' }],
      moveId: -1
    }
  },
  methods: {
    // 左边往右边拖动时的事件
    end1(e) {
      const that = this
      const items = this.arr2.filter(function (m) {
        return m.id === that.moveId
      })
      // 如果左边
      if (items.length < 2) return
      this.arr2.splice(e.newDraggableIndex, 1)
    },
    // move回调方法
    onMove(e, originalEvent) {
      this.moveId = e.relatedContext.element.id
      // 不允许停靠
      if (e.relatedContext.element.id === 1) return false
      // 不允许拖拽
      if (e.draggedContext.element.id === 4) return false
      if (e.draggedContext.element.id === 11) return false
      return true
    }
  }
}
</script>
<style scoped>
.itxst {
  margin: 10px;
  text-align: left;
}
.col {
  width: 40%;
  flex: 1;
  padding: 10px;
  border: solid 1px #eee;
  border-radius: 5px;
  float: left;
}
.col + .col {
  margin-left: 10px;
}
.item {
  padding: 6px 12px;
  margin: 0px 10px 0px 10px;
  border: solid 1px #eee;
  background-color: #f1f1f1;
  text-align: left;
}
.item + .item {
  border-top: none;
  margin-top: 6px;
}

.item:hover {
  background-color: #fdfdfd;
  cursor: move;
}
.item2 {
  padding: 6px 12px;
  margin: 0px 10px 0px 10px;
  border: solid 1px #eee;
  background-color: pink;
  text-align: left;
}
.item2 + .item2 {
  border-top: none;
  margin-top: 6px;
}

.item2:hover {
  outline: solid 1px #ddd;
  cursor: move;
}
</style>

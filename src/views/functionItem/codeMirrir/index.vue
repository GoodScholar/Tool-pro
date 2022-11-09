<template>
  <div>
    <codemirror
      ref="jsonEditor"
      :value="code"
      :options="cmOptions"
      @ready="handleReady"
      @input="onCodeChange"
    ></codemirror>

    <el-button @click="handleSave(code)">保存</el-button>
  </div>
</template>

<script>
import { js_beautify } from 'js-beautify'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-dark.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/addon/selection/active-line' // 光标行背景高亮，配置里面也需要styleActiveLine设置为true
import 'codemirror/keymap/sublime'
import 'codemirror/mode/css/css'

import 'codemirror/addon/lint/lint.css'
import 'codemirror/addon/lint/json-lint'
import 'codemirror/addon/fold/xml-fold.js'
import 'codemirror/addon/fold/indent-fold.js'
import 'codemirror/addon/fold/markdown-fold.js'

// 折叠
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/comment-fold'

export default {
  name: 'JsonEditor',
  components: { codemirror },
  data() {
    return {
      code: `{xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },yAxis: {
          type: 'value'
        },series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'}}]}`,
      cmOptions: {
        tabSize: 4,
        mode: 'text/javascript',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true
      }
    }
  },
  watch: {},
  computed: {
    codemirror() {
      return this.$refs.jsonEditor.codemirror
    }
  },
  methods: {
    // 准备阶段
    handleReady() {
      this.code = js_beautify(this.code)
    },
    // 监听输入的数据
    onCodeChange(newCode) {
      this.code = newCode
    },
    // 保存时，自动代码格式化
    async handleEvent(event) {
      switch (event.keyCode) {
        case 83:
          // 阻止直接保存网页
          event.preventDefault()
          event.returnValue = false

          if (event.ctrlKey && event.code === 'KeyS') {
            this.code = js_beautify(this.code)
          }
          break
      }
    },
    handleSave(str) {
      if (str.slice(0, 1) !== '{' && str.slice(-1) !== '}') return false

      const obj2 = this.eval('(' + this.code + ')')
      console.log(obj2)
    },
    eval(fn) {
      const Fn = Function
      return new Fn('return ' + fn)()
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleEvent)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleEvent)
  }
}
</script>

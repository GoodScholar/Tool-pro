// vModelDialog.js
export default {
  model: {
    prop: 'value',
    event: 'toggle'
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    // 设置宽度
    title: {
      type: String,
      default: '标题'
    },
    // 设置宽度
    width: {
      type: String,
      default: '30%'
    },
    // 设置是否居中
    center: {
      type: Boolean,
      default: false
    }
  },
  watch: {},
  computed: {
    innerVisible: {
      get: function () {
        return this.value
      },
      set: function (val) {
        this.$emit('update:toggle', val)
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    }
  }
}

<script>
import { Radio } from 'element-ui'
export default {
  name: 'RadioItem',
  props: {
    enums: {
      type: Array,
      default: () => []
    },
    enumNames: {
      type: Array,
      default: () => []
    },
    ...Radio.props
  },
  render() {
    return (
      <div>
        {this.enums.map((val, index) => {
          return (
            <el-radio
              {...{
                props: { ...this.$props, label: val },
                on: this.$listeners
              }}
            >
              {this.enumNames[index]}
            </el-radio>
          )
        })}
      </div>
    )
  }
}
</script>

<style></style>

<!--
  功能：输入框
  时间：2022年08月17日 11:13:50
  版本：v1.0
-->
<template>
    <div class="elInput">
        <el-input
            :placeholder="placeholder"
            v-model="input"
            clearable
            :style="{ width: changeWidthStyle }"
        >
            <i
                v-if="icon.length > 0"
                slot="prefix"
                class="el-input__icon"
                :class="[icon]"
            ></i>
        </el-input>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: '',
        },
        widthStyle: {
            type: Number,
            default: 265,
        },
        icon: {
            type: String,
            default: '',
        },
    },
    components: {},
    data() {
        return {
            input: '',
        }
    },
    watch: {
        input(newVal) {
            this.$emit('input', newVal)
        },
    },
    computed: {
        changeWidthStyle() {
            return this.widthStyle + 'px'
        },
    },
    methods: {},
    created() {},
    mounted() {},
}
</script>

<style lang="scss" scoped>
.elInput {
    height: 36px;
    ::v-deep .el-input {
        height: 36px;
        background: rgba(16, 161, 221, 0);
        border: 1px solid rgba(16, 161, 221, 0.61);
        box-shadow: 0px 0px 29px 0px rgba(6, 70, 167, 0.72) inset;

        .el-input__suffix {
            background-color: transparent;
            height: 36px;
        }
        .el-input__inner {
            height: 36px;
            line-height: 36px;
            background: transparent;
            border: 1px solid transparent;
            color: #fff;
            &::placeholder {
                color: #58b2dd;
            }
        }

        .el-input__prefix {
            top: -2px;
        }
    }
}
</style>

<!--
  功能：Select选择框
  时间：2022年08月17日 08:13:58
  版本：v1.0
-->
<template>
    <div class="select">
        <el-select
            v-model="selectVal"
            placeholder="请选择"
            :popper-append-to-body="false"
            :style="{ width: changeWidthStyle }"
            :multiple="multiple"
            collapse-tags
            :clearable="!multiple"
            @remove-tag="handleChange($event, 'remove')"
        >
            <!-- <el-option v-if="!multiple" label="全部" :value="null"></el-option> -->
            <el-option
                v-for="(item, index) in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
                <div
                    v-if="showCheck"
                    class="multBox"
                    @click="handleChange(index, 'change')"
                >
                    <span>
                        {{ item.label }}
                    </span>

                    <span
                        class="iconCheck"
                        :class="{ 'is-check': item.flag }"
                    ></span>
                </div>
            </el-option>
        </el-select>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: [String, Array],
        },
        multiple: {
            type: Boolean,
            default: false,
        },
        labelOpt: {
            type: Array,
            default: () => [],
        },
        widthStyle: {
            type: Number,
            default: 118,
        },
        showCheck: {
            type: Boolean,
            default: false,
        },
    },
    components: {},
    data() {
        return {
            options: [],
            selectVal: '',
        }
    },
    watch: {
        selectVal: {
            handler: function (newVal) {
                if (Array.isArray(newVal) && newVal.length > 0) {
                    this.$emit('input', newVal)
                } else {
                    this.$emit('input', newVal)
                }
            },
            deep: true,
        },
        labelOpt: {
            handler: function (newVal) {
                if (this.multiple) {
                    this.options = newVal.map((item) => {
                        item.flag = false
                        return item
                    })
                } else {
                    this.options = newVal
                }
            },
            deep: true,
        },
    },
    computed: {
        changeWidthStyle() {
            return this.widthStyle + 'px'
        },
    },
    methods: {
        handleChange(val, event) {
            switch (event) {
                case 'change':
                    this.options[val].flag = !this.options[val].flag

                    break
                case 'remove':
                    if (typeof val === 'string') {
                        let index = this.labelOpt.findIndex((item) => {
                            return item.value === val
                        })
                        this.options[index].flag = !this.options[index].flag
                    }

                    break
            }
        },
    },
    created() {},
    mounted() {
        if (this.multiple) {
            this.options = this.labelOpt.map((item) => {
                item.flag = false
                return item
            })
        } else {
            this.options = this.labelOpt
        }
    },
}
</script>

<style lang="scss" scoped>
.select {
    ::v-deep .el-select {
        height: 36px;
        background: rgba(16, 161, 221, 0);
        border: 1px solid rgba(16, 161, 221, 0.6);
        box-shadow: 0px 0px 29px 0px rgba(6, 70, 167, 0.72) inset;

        .el-input__suffix {
            background-color: transparent;
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

        .el-icon-arrow-up:before {
            content: '\e78f';
            color: #10a1dd;
        }
    }

    ::v-deep .el-popper .popper__arrow,
    .el-popper .popper__arrow::after {
        display: none;
    }

    ::v-deep .el-popper {
        background: rgba(9, 39, 70, 0.83);
        border: 1px solid rgba(16, 161, 221, 0.6);
        box-shadow: 0px 0px 29px 0px rgba(6, 70, 167, 0.72) inset;
    }

    ::v-deep .el-select-dropdown__item {
        color: #fff;
        padding: 0 20px;
    }

    //item选项的hover样式
    ::v-deep .el-select-dropdown__item.hover,
    ::v-deep .el-select-dropdown__item:hover {
        color: #fff;
        background-color: #305986;
    }

    ::v-deep .el-select-dropdown__item.selected {
        color: #fff;
        background-color: #305986;
    }

    ::v-deep.el-select-dropdown.is-multiple
        .el-select-dropdown__item.selected.hover {
        color: #fff;
        background-color: #305986;
    }

    // ::v-deep .el-select__tags {
    //     span {
    //         &:nth-child(1) {
    //             background-color: transparent;
    //             border: 1px solid transparent;
    //             font-size: 14px;
    //             color: #fff;
    //             .el-tag__close {
    //                 display: none;
    //             }
    //         }
    //         &:nth-child(2) {
    //             display: none;
    //         }
    //     }
    // }

    .multBox {
        @extend %flex-center-between;

        .iconCheck {
            display: inline-block;
            position: relative;
            width: 13px;
            height: 13px;
            border: 1px solid #10a1dd;
            box-sizing: border-box;
            border-radius: 1px;
            background-color: transparent;
            z-index: 1;
            transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
                background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);

            &:after {
                content: '';
                position: absolute;
                left: 4px;
                top: 1px;
                box-sizing: content-box;
                border: 1px solid #fff;
                border-left: 0;
                border-top: 0;
                height: 7px;
                transform: rotate(45deg) scaleY(0);
                width: 3px;
                transition: transform 0.15s ease-in 0.05s;
                transform-origin: center;
            }
        }
        .is-check {
            background-color: #10a1dd;
            &:after {
                transform: rotate(45deg) scaleY(1);
                color: transparent;
            }
        }
    }
}
</style>

<!--
  功能：精确搜索
  时间：2022年08月17日 14:23:38
  版本：v1.0
-->
<template>
    <el-dialog
        :title="dialogTitle"
        class="search"
        :visible.sync="value"
        width="50%"
        :before-close="handleClose"
    >
        <ul class="form">
            <li>
                <span class="form-label">时间区间</span>
                <div class="form__cell">
                    <ElInput
                        v-model="searchForm.startTime"
                        :widthStyle="140"
                        :icon="'el-icon-date'"
                    />
                    <span>至</span>
                    <ElInput
                        v-model="searchForm.endTime"
                        :widthStyle="140"
                        :icon="'el-icon-date'"
                    />
                </div>
            </li>
            <li>
                <span class="form-label">属地</span>
                <ElSelect
                    v-model="searchForm.area"
                    :widthStyle="312"
                    :labelOpt="options"
                    :showCheck="false"
                />
            </li>
            <li>
                <span class="form-label">项目名称</span>
                <ElInput
                    v-model="searchForm.projectName"
                    :widthStyle="312"
                    :icon="'el-icon-date'"
                />
            </li>
            <li>
                <span class="form-label">是否已投产</span>
                <ElSelect
                    v-model="searchForm.isProduction"
                    :widthStyle="312"
                    :labelOpt="options"
                    :showCheck="false"
                />
            </li>
            <li>
                <span class="form-label">所属产业</span>
                <ElSelect
                    v-model="searchForm.industryType"
                    :widthStyle="312"
                    :labelOpt="industryArr"
                    :showCheck="false"
                />
            </li>
            <li>
                <span class="form-label">用地方式</span>
                <ElSelect
                    v-model="searchForm.ydfs"
                    :widthStyle="312"
                    :labelOpt="options"
                    :showCheck="false"
                />
            </li>
            <li>
                <span class="form-label">所处阶段</span>
                <ElSelect
                    v-model="searchForm.stage"
                    :widthStyle="312"
                    :labelOpt="options"
                    :showCheck="false"
                />
            </li>
            <li>
                <span class="form-label">产值空间(万元)</span>
                <div class="form__cell">
                    <ElInput
                        v-model="searchForm.sXMCZ"
                        :widthStyle="140"
                        :icon="'el-icon-date'"
                    />
                    <span>至</span>
                    <ElInput
                        v-model="searchForm.eXMCZ"
                        :widthStyle="140"
                        :icon="'el-icon-date'"
                    />
                </div>
            </li>
            <li>
                <span class="form-label">投资额区间(万元)</span>
                <div class="form__cell">
                    <ElInput
                        v-model="searchForm.sTZE"
                        :widthStyle="140"
                        :icon="'el-icon-date'"
                    />
                    <span>至</span>
                    <ElInput
                        v-model="searchForm.eTZE"
                        :widthStyle="140"
                        :icon="'el-icon-date'"
                    />
                </div>
            </li>
            <li>
                <span class="form-label">年度税收(万元)</span>
                <div class="form__cell">
                    <ElInput
                        v-model="searchForm.sNDSS"
                        :widthStyle="140"
                        :icon="'el-icon-date'"
                    />
                    <span>至</span>
                    <ElInput
                        v-model="searchForm.eNDSS"
                        :widthStyle="140"
                        :icon="'el-icon-date'"
                    />
                </div>
            </li>
            <li>
                <span class="form-label">亩均租收(万元)</span>
                <div class="form__cell">
                    <ElInput
                        v-model="searchForm.sMJSS"
                        :widthStyle="140"
                        :icon="'el-icon-date'"
                    />
                    <span>至</span>
                    <ElInput
                        v-model="searchForm.eMJSS"
                        :widthStyle="140"
                        :icon="'el-icon-date'"
                    />
                </div>
            </li>
            <li>
                <span class="form-label">电力能耗(度)</span>
                <div class="form__cell">
                    <ElInput
                        v-model="searchForm.sDLNH"
                        :widthStyle="140"
                        :icon="'el-icon-date'"
                    />
                    <span>至</span>
                    <ElInput
                        v-model="searchForm.eDLNH"
                        :widthStyle="140"
                        :icon="'el-icon-date'"
                    />
                </div>
            </li>
        </ul>
        <span slot="footer">
            <el-button type="primary" class="proList-btn" @click="handleSubmit">
                查 询
            </el-button>
        </span>
    </el-dialog>
</template>

<script>
import ElInput from '@/components/ElInput.vue'
import ElSelect from '@/components/SelectOpt'
import { dictionary } from '@/api/api'
export default {
    name: 'AccurateSearch',
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        dialogTitle: {
            type: String,
            default: '标题',
        },
    },
    components: { ElSelect, ElInput },
    data() {
        return {
            options: [
                {
                    value: '选项1',
                    label: '黄金糕',
                },
                {
                    value: '选项2',
                    label: '双皮奶',
                },
                {
                    value: '选项3',
                    label: '蚵仔煎',
                },
                {
                    value: '选项4',
                    label: '龙须面',
                },
                {
                    value: '选项5',
                    label: '北京烤鸭',
                },
            ],
            searchForm: {
                year: '',
                area: '',
                category: '',
                startTime: '',
                endTime: '',
                projectName: '',
                isProduction: '',
                industryType: '',
                ydfs: '',
                stage: '',
                sXMCZ: '',
                eXMCZ: '',
                sTZE: '',
                eTZE: '',
                sNDSS: '',
                eNDSS: '',
                sMJSS: '',
                eMJSS: '',
                sDLNH: '',
                eDLNH: '',
            },
            areaArr: [],
            industryArr: [],
        }
    },
    watch: {},
    computed: {},
    methods: {
        handleClose() {
            this.$emit('input', false)
        },
        handleSubmit() {
            this.$emit('submit', this.searchForm)
        },
        async getDictionary() {
            try {
                const area = await dictionary('PROJECT_AREA')
                const toIndustry = await dictionary('LIFE_CYCLE_INDUSTRYTYPE ')

                this.areaArr = this.makeOption(area)
                this.industryArr = this.makeOption(toIndustry)
            } catch (error) {
                console.error(error)
            }
        },
        makeOption(info) {
            const option = []
            for (const val in info) {
                option.push({
                    value: val,
                    label: info[val],
                })
            }
            return option
        },
    },
    created() {
        this.getDictionary()
    },
    mounted() {},
}
</script>

<style lang="scss" scoped>
.search {
    ::v-deep .el-dialog {
        border-radius: 0;
        background-color: #082940;
        border: 1px solid #637f97;
        .el-dialog__title {
            font-size: 18px;
            color: #2abced;
        }
        .el-dialog__body {
            color: #fff;
        }
        .el-dialog__close {
            color: #fff;
        }
    }

    .form {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        li {
            @extend %flex-center;
            justify-content: flex-end;
            flex: 1;
            margin: 0 50px 15px 0;
            width: calc((100% - 100px) / 2);
            min-width: calc((100% - 100px) / 2);
            &:nth-child(2n) {
                margin-right: 0;
            }

            .form-label {
                display: inline-block;
                text-align: center;
                width: 81px;
                margin-right: 21px;
                font-size: 16px;
                color: #ffffff;
            }

            .form__cell {
                @extend %flex-center-between;
                width: 312px;
            }
        }
    }

    ::v-deep .el-icon-arrow-up:before {
        content: '\e6e1' !important;
        color: #10a1dd;
    }
}
</style>

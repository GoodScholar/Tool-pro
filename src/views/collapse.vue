<template>
  <div class="collapse-cont">
    <el-collapse v-model="activeNames">
      <el-collapse-item v-for="(item, i) in list" :key="i" :name="i + 1">
        <template slot="title">
          <div class="_t">{{ item.name }}</div>
          <div class="_p">
            品种数量(
            <span>{{ item.level }}</span>
            )
          </div>
          <div class="_z">
            正在进行(
            <span class="blue">{{ item.reportingNum }}</span>
            )
          </div>
        </template>
        <div class="table-item-tit">
          <div class="items40">品种名称</div>
          <div class="items20">我的级别</div>
          <div class="items20">发布部门</div>
          <div class="items20"><span class="fr pr15">操作</span></div>
        </div>
        <div class="table-item-cont">
          <div class="items40 pl10">{{ item.typeName }}</div>
          <div class="items20">{{ item.level }}</div>
          <div class="items20">{{ item.publishUnit }}</div>
          <div class="items20">
            <router-link :to="{ name: 'xxxx' }">
              <em class="red cp fr fwb pr15">查看</em>
            </router-link>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  name: 'CollapseItem',
  components: {},
  data() {
    return {
      activeNames: ['1'],
      list: [
        {
          id: '74465699cbd92140e4fb',
          interpret: '<p>123123</p>',
          latelyAsk: null,
          level: '2',
          levelName: null,
          name: '测试1',
          platformCash: '1',
          policyNumber: '1231',
          publishTime: '2022-03-25 17:55:06',
          publishUnit: '123123',
          reportingNum: 1,
          startTime: '2022-03-10',
          status: '0',
          statusDesc: '有效',
          tagInfoList: null,
          type: 'lala_policy',
          typeName: '优惠政策'
        },
        {
          id: '7446562140e4fb',
          interpret: '<p>123123</p>',
          latelyAsk: null,
          level: '2',
          levelName: null,
          name: '测试2',
          platformCash: '1',
          policyNumber: '1231',
          publishTime: '2022-03-25 17:55:06',
          publishUnit: '123123',
          reportingNum: 1,
          startTime: '2022-03-10',
          status: '0',
          statusDesc: '正有效',
          tagInfoList: null,
          type: 'gaoxing_policy',
          typeName: '推行政策'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
:deep(.collapse-cont) .collapse-cont {
  padding: 5px;
  border: none;
  font-size: 14px;
  width: 70%;
  margin-top: 100px;
  margin-left: 100px;
  .el-collapse-item__header,
  .el-collapse-item__header.is-active,
  .el-collapse-item__wrap {
    border-bottom: 1px solid #dbe0ee;
    background: none;
  }
  .el-collapse-item__arrow {
    width: 40px;
  }
  .el-icon-arrow-right:before {
    content: ' 展开';
  }
  .el-collapse-item__arrow.is-active {
    transform: none;
  }
  .el-collapse-item__arrow.is-active:before {
    content: '- 折叠';
  }
  ._t {
    color: #333333;
    font-size: 22px;
    font-weight: bold;
    width: 40%;
  }
  ._p {
    width: 20%;
    color: #666666;
  }
  ._z {
    width: 20%;
    color: #666666;
  }
  .fold-btn {
    width: 20%;
    text-align: right;
    padding-right: 10px;
    color: #666666;
  }
  .table-item-tit,
  .table-item-cont {
    display: flex;
    box-sizing: border-box;
    line-height: 45px;
    .items20 {
      width: 20%;
      box-sizing: border-box;
      a {
        text-decoration: none;
      }
    }
    .items40 {
      width: 40%;
      box-sizing: border-box;
    }
  }
  .table-item-tit {
    .items20,
    .items40 {
      color: #999999;
    }
  }
}
</style>

<!--
  H5的可切换tab栏
  传参:tabs为一个可选tab数组
  回调:selectedTab,回传值data为选中tab的index索引,开发人员根据索引值的不同做相关操作
  author:lite
-->
<template>
  <div class="aresTab">
    <div v-for="(item,index) of tabs"
      :key="index"
      @click="selectedTab(index)">
      <span :style="select==index?'color:#F15F50;':''">{{item}}</span>
      <div v-show="select==index"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AresTab',
  props: {
    tabs: {
      type: Object,
      default: ['tab1', 'tab2', 'tab3', 'tab4', 'tab5']
    },
    select: {
      type: Number,
      default: 0
    }
  },

  methods: {
    selectedTab(data) {
      this.select = data;
      this.$emit('selectedTab', data);
    }
  }
};
</script>

<style lang="less" scoped>
.aresTab {
  display: flex;
  justify-content: space-around;
  background-color: #ffffff;
  padding-top: 0.15rem;
  color: #333333;
  font-size: 0.14rem;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    & > span {
      margin-bottom: 0.15rem;
      text-align: center;
      min-width: 0.34rem;
    }
    & > div {
      height: 0.04rem;
      background-color: #f15f50;
      width: 0.34rem;
    }
  }
}
</style>

<!--
  list 标题：title ,更多
  传参:title  左边列表名
  回调:moreClick 
  author:wwg
-->
<template>
  <div class="Ares-listHead">
    <div class="Ares-listHead-title">{{title}}</div>
    <div class="Ares-listHead-click"
      @click="moreClick">更多</div>
  </div>
</template>
<style lang="less" scoped>
.Ares-listHead {
  height: 0.3rem;
  line-height: 0.3rem;
  padding: 0rem 0.16rem;
  display: flex;
  justify-content: space-between;
  letter-spacing: 0;
  background-color: #fff;
  .Ares-listHead-title {
    font-size: 0.15rem;
    color: #333333;
    font-weight: 600;
    font-family: PingFangSC-Medium;
  }
  .Ares-listHead-click {
    font-size: 0.13rem;
    font-family: PingFangSC-Regular;
    color: #999999;
  }
}
</style>

<script>
export default {
  name: 'AresListHead',
  props: {
    classes: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: 'title'
    }
  },
  methods: {
    moreClick(evt) {
      // eslint-disable-next-line no-unused-expressions
      this.$emit('moreClick', evt);
    }
  }
};

</script>

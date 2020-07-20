<!--
  小按钮组组件
  传参:btnList  按钮组数据   tittle为按钮名称
  回调:btnClick 返回点击数组item
  author:wwg
-->
<template>
  <div class="Ares-smallButtons">
    <div v-for="item in btnList"
      :key="item">
      <div class="Ares-smallButtons-item"
        @click="btnClick(item)"
        :class="classes(item)">
        {{item.tittle}}
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.Ares-smallButtons {
  display: flex;
  justify-content: flex-start;
  .Ares-smallButtons-item {
    font-size: 14px;
    letter-spacing: -0.05px;
    padding: 0.02rem;
    width: 0.6rem;
    height: 0.3rem;
    text-align: center;
    line-height: 0.3rem;
    margin-right: 0.15rem;
  }
  .redColor {
    background-image: linear-gradient(129deg, #fc5451 3%, #ff7252 88%);
    border: 1px solid #ff7252;
    color: #fff;
  }
  .grayColor {
    border: 1px solid #999;
    color: #6b7378;
    text-align: center;
  }
}
</style>

<script>
export default {
  name: 'smallButtonS',
  props: {
    btnList: {
      type: Object,
      default: []
    }
  },
  methods: {
    btnClick(evt) {
      // eslint-disable-next-line no-unused-expressions
      this.$emit('btnClick', evt);
    },
    classes(item) {
      if (item.active) {
        return ['redColor'];
      }
      return ['grayColor'];
    }
  },
  computed: {
  }
};

</script>

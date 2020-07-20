<!--
  小按钮组件
  传参:classes  默认grayColor为灰色   redColor为红色
  回调:btnClick 
  author:wwg
-->
<template>
  <div class="Ares-smallButton">
    <div class="Ares-smallButton-item"
      @click="btnClick"
      :class="classes">
      <span v-if="$slots.default">
        <slot></slot>
      </span>
    </div>
  </div>
</template>
<style lang="less" scoped>
.Ares-smallButton {
  display: inline;
  margin-right: 0.1rem;
  .Ares-smallButton-item {
    font-size: 10px;
    letter-spacing: -0.05px;
    display: inline;
    padding: 0.02rem;
  }
  .redColor {
    border: 1px solid #f15f5f;
    color: #f15f5f;
  }
  .grayColor {
    border: 1px solid #999;
    color: #999;
  }
}
</style>

<script>
export default {
  name: 'AresSmallButton',
  props: {
    classes: {
      type: String,
      default: 'grayColor'
    }
  },
  methods: {
    btnClick(evt) {
      // eslint-disable-next-line no-unused-expressions
      this.$emit('btnClick', evt);
    }
  }
};

</script>

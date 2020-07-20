<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>
<style lang="less" scoped>
// @import '~common/css/button/index.less';
</style>

<script>
export default {
  name: 'group',
  props: {
    classes: {
      type: String,
      default: 'ui-btn-group'
    }
  }
};

</script>

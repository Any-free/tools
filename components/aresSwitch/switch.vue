<!--
  H5的开关
  传参:tabs为一个可选tab数组
  回调:selectedTab,回传值data为选中tab的index索引,开发人员根据索引值的不同做相关操作
  author:lite
-->
<template>
  <div>
    <div class="ares-ui-switch"
      @click="setSwitch">
      <input type="checkbox"
        :id="id"
        class="ares-ui-btn"
        v-model="checked">
      <label :for="id"
        class="ares-label"></label>
    </div>
  </div>
</template>
<script>
export default {
  name: 'aresSwitch',
  props: {
    checked: {
      type: Boolean,
      default: true
    },
    id: {
      //设置formInput组件id
      type: String,
      default: 'male'
    }
  },

  methods: {
    setSwitch() {
      this.$emit('setSwitch', '');
    }
  }
};
</script>

<style lang="less" scoped>
@import '~common/css/base.less';
</style>

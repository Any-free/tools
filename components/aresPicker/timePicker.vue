<template>
  <div>
    <div class="Ares-time-selected"
      v-show="showTimePicker"
      @click.self="close">
      <div class="Ares-time-content">
        <div class="title ui-border-b">
          <div class="left">取消</div>
          <div class="right">确认</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
@import url(~common/css/base.less);
.Ares-time-selected {
  position: fixed;
  height: 100%;
  width: 100%;
  padding: 0 0.16rem;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(34, 34, 34, 0.6);
  z-index: 9999999999999;
  .Ares-time-content {
    position: fixed;
    top: 26%;
    width: 92%;
    background: #ffffff;
    border-radius: 0.04rem;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 0.52rem;
      padding: 0 0.16rem;
      font-size: 0.16rem;
      .left {
        // font-family: PingFangSC-Regular;
        color: #999999;
      }
      .right {
        // font-family: PingFangSC-Regular;
        color: #eb2929;
      }
    }
  }
}
</style>

<script>
export default {
  name: 'timePicker',
  props :{
    showTimePicker: {
      type: Boolean,
      default: true
    }
  },
  methods :{
    close() {
      this.$emit('closeTimePicker', '');
    }
  }
}
</script>




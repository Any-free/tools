<!-- -->
<template>
  <div>
    <div v-show="showAccPicker"
      class="Ares-account-selected"
      @click.self="close">
      <div class="Ares-account-content">
        <div class="Ares-account-body">
          <div class="title ui-border-b"
            v-if="acctBox">
            <slot></slot>
          </div>
          <div class="account-outSide"
            v-if="acctBox">
            <div v-for="(item,index) in accountList"
              :key="index">
              <div class="account"
                :class="index===0?'':'ui-border-t'"
                @click="getCardNumber(item.account,index)">{{setData(item.account)}}</div>
            </div>
          </div>
          <div class="account-outSide"
            v-else>
            <div v-for="(item,index) in accountList"
              :key="index">
              <div class="account"
                :class="index===0?'':'ui-border-t'"
                @click="getCardNumber(item.btnName,index)">{{item.btnName}}</div>
            </div>
          </div>
        </div>
        <div class="Ares-account-cancel"
          @click="close">取消</div>
      </div>
    </div>
  </div>
</template>


<script>
import { fmtAcctNo } from 'common/js/util/Fw.api.js';
export default {
  name: 'pickerAccount',
  props: {
    accountList: {
      type: Object,
      default: ['tab1', 'tab2', 'tab3', 'tab4', 'tab5']
    },
    showAccPicker: {
      type: Boolean,
      default: true
    },
    acctBox: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    close() {
      this.showAccPicker = !this.showAccPicker;
      this.$emit('closePicker', '');
    },

    getCardNumber(item, index) {
      this.$emit('getSeleted', { index: index, val: item });
    },

    setData(val) {
      return fmtAcctNo(val, true);
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import url(~common/css/base.less);
.Ares-account-selected {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 0.15rem;
  background: rgba(34, 34, 34, 0.3);
  z-index: 999999999999999999;
  .Ares-account-content {
    position: fixed;
    width: 92%;
    bottom: 0.12rem;
    .Ares-account-body {
      background: #ffffff;
      border-radius: 0.1rem;
      .title {
        position: relative;
        top: 0;
        text-align: center;
        height: 0.52rem;
        line-height: 0.52rem;
        // font-family: PingFangSC-Regular;
        font-size: 0.16rem;
        color: #222222;
      }
      .account-outSide {
        max-height: 2.06rem;
        overflow: auto;
        .account {
          text-align: center;
          height: 0.52rem;
          line-height: 0.52rem;
          // font-family: PingFangSC-Regular;
          font-size: 0.16rem;
          color: #222222;
        }
      }
    }
    .Ares-account-cancel {
      text-align: center;
      height: 0.52rem;
      line-height: 0.52rem;
      background: #ffffff;
      border-radius: 0.1rem;
      margin-top: 0.08rem;
      // font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #f03838;
      text-align: center;
    }
  }
}
</style>



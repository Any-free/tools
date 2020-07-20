<template>
  <div>
    <div v-show="showMaAcc"
      class="Ares-account-selected"
      @click.self="close">
      <div class="Ares-account-content">
        <div class="Ares-account-body">
          <div class="title ui-border-b">信息</div>
          <div class="account-outSide">
            <div v-for="(item,index) in maAccList"
              :key="index"
              :class="index===0||index===maAccList.length?'':'ui-border-t'">
              <div @click="getCardNumber(item)">
                <div class="account">
                  <div class="up">{{setData(item.account)}}</div>
                  <div class="down">{{item.bank}}</div>
                </div>
                <img v-show="item.flag"
                  src="https://mcube-prod.oss-cn-hangzhou.aliyuncs.com/800ED2C221658_default/www/img/common/selected.png"
                  alt>
              </div>
            </div>
          </div>
          <div class="Ares-account-cancel ui-border-t"
            @click="confirm">确认</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
@import url(~common/css/base.less);
.Ares-account-selected {
  position: fixed;
  height: 100%;
  width: 100%;
  padding: 0 0.4rem;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(34, 34, 34, 0.6);
  z-index: 9999999999999;
  .Ares-account-content {
    position: fixed;
    width: 78%;
    top: 30%;
    .Ares-account-body {
      background: #ffffff;
      border-radius: 0.04rem;
      .title {
        position: relative;
        top: 0;
        text-align: center;
        height: 0.52rem;
        line-height: 0.52rem;
        // font-family: PingFangSC-Medium;
        font-size: 0.17rem;
        font-weight: bold;
        color: #222222;
        letter-spacing: 0;
      }
      .account-outSide {
        max-height: 2.06rem;
        overflow: auto;
        & > div {
          padding: 0 0.2rem;
          & > div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .account {
              height: 0.52rem;
              padding-top: 0.15rem;
              padding-bottom: 0.03rem;
              display: flex;
              flex-direction: column;
              .up {
                // font-family: PingFangSC-Regular;
                font-size: 0.16rem;
                color: #222222;
              }
              .down {
                // font-family: PingFangSC-Regular;
                font-size: 0.12rem;
                color: #3f3f3f;
                letter-spacing: 0;
              }
            }
            & > img {
              height: 0.16rem;
            }
          }
        }
      }
      .Ares-account-cancel {
        text-align: center;
        height: 0.4rem;
        line-height: 0.4rem;
        // font-family: PingFangSC-Regular;
        font-size: 0.14rem;
        color: #eb2929;
        letter-spacing: 0;
      }
    }
  }
}
</style>

<script>
import { fmtAcctNo } from 'common/js/util/Fw.api.js';
export default {
  name: 'manageAccount',
  data :{
    returnStr: ''
  },
  props :{
    maAccList: {
      type: Object,
      default: []
    },
    showMaAcc: {
      type: Boolean,
      default: true
    }
  },
  methods :{
    close() {
      this.$emit('closeMaAcc', '');
    },

    getCardNumber(item) {
      item.flag = !item.flag;
      this.returnStr = this.concatStr(this.maAccList);
    },

    setData(val) {
      return fmtAcctNo(val, true);
    },

    // 组合选中的条件为字符串
    concatStr(arr) {
      let str = '';
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].flag) {
          if (!str) {
            str = arr[i].account;
          } else {
            str += ',' + arr[i].account;
          }
        }
      }
      return str;
    },

    confirm() {
      // this.showMaAcc = false;
      this.$emit('confirm', this.returnStr);
    }
  }
}
</script>




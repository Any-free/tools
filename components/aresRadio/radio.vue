<!--
  H5的单选框
  传参:
  回调:
  author:lite
-->
<template>
  <div>
    <!-- 风险评估多列表单选框 -->
    <div v-if="radioType=='1'">
      <div class="title-list"
        :class="cla">{{Lists.title}}</div>
      <div v-for="(item,index) in Lists.list"
        :key="index">
        <div class="item-list"
          @click="selected({index,item})">
          <div :class="cla">
            <span>{{item}}</span>
            <img v-show="showTick==index"
              src="../../img/common/tick.png"
              alt="">
          </div>
        </div>
      </div>
    </div>

    <!-- 后台在线时常单选框 -->
    <div v-if="radioType=='2'">
      <div class="min-list"
        v-for="(item,index) in List"
        :key="index"
        :class="cla"
        @click="selected({index,item})">
        <span>{{item}}</span>
        <img v-show="showTick==index"
          src="../../img/common/selected.png"
          alt="">
      </div>
    </div>

    <!-- 开启收款手机号单选框 -->
    <div v-if="radioType=='3'">
      <div class="special-list"
        v-for="(item,index) in List"
        :key="index"
        @click="selected({index,item})">
        <div>
          <div>
            <img :src="getImg(item.bankCode)"
              alt="">
            <div>
              <div>
                <span>{{item.bankName}}</span>
                <p>{{item.type}}</p>
              </div>
              <span>{{item.account|fmtAccount}}</span>
            </div>
          </div>
          <img v-show="showTick==index"
            src="../../img/common/selected.png"
            alt="">
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { fmtAcctNo, getDeviceOS, returnUrl } from 'common/js/util/Fw.api.js';
export default {
  name: 'aresRadio',
  data() {
    return {
      showTick: null,
      cla: 'com-border'
    };
  },
  props: {
    Lists: {
      type: Object,
      default: {}
    },
    List: {
      type: Object,
      default: []
    },
    radioType: {
      type: String,
      default: '1'
    }
  },

  filters: {
    fmtAccount(acc) {
      return fmtAcctNo(acc, true);
    }
  },

  created() {
    if (getDeviceOS() === 'ios') {
      this.cla = 'com-border';
    } else {
      this.cla = 'ui-border-b';
    }
  },

  methods: {
    getImg(data) {
      return 'https://mcube-prod.oss-cn-hangzhou.aliyuncs.com/B55E8AF301213_default/www/img/bankLogo/' + data + '.png';
    },
    selected(data) {
      this.showTick = data.index;
      this.$emit('selected', data);
    }
  }
};

</script>

<style lang="less" scoped>
@import '~common/css/base.less';
.com-border {
  border-bottom: 0.5px solid #eee;
}
.title-list {
  padding: 0.11rem 0.16rem;
  margin-top: 0.12rem;
  font-size: 0.14rem;
  color: #6b7378;
  font-weight: bold;
  background-color: #ffffff;
}
.item-list {
  background-color: #ffffff;
  & > div {
    padding: 0.16rem 0;
    padding-right: 0.16rem;
    margin-left: 0.16rem;
    font-size: 14px;
    color: #6b7378;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > img {
      height: 0.17rem;
    }
  }
}

.min-list {
  padding: 0.11rem 0.16rem;
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  background-color: #ffffff;
  font-size: 0.15rem;
  color: #6c7479;
  height: 0.3rem;
  & > img {
    height: 0.2rem;
  }
}

.special-list {
  padding: 0 0.16rem;
  padding-top: 0.16rem;
  & > div {
    padding: 0.12rem 0.2rem;
    background: #ffffff;
    box-shadow: 0 0 14px 0 rgba(60, 60, 60, 0.08);
    border-radius: 3px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > div {
      display: flex;
      align-items: center;
      & > img {
        width: 0.24rem;
      }
      & > div {
        margin-left: 0.14rem;
        display: flex;
        flex-direction: column;
        & > div {
          display: flex;
          align-items: center;
          & > span {
            font-size: 0.15rem;
            color: #6b7378;
          }
          & > p {
            margin-left: 0.09rem;
            font-size: 13px;
            color: #9fa6a9;
          }
        }
        & > span {
          margin-top: 0.04rem;
          font-size: 13px;
          color: #9fa6a9;
        }
      }
    }

    & > img {
      height: 0.2rem;
    }
  }
}
</style>
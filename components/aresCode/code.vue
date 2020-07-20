<!--
  H5的验证码
  传参:
  回调:
  author:lite
-->
<template>
  <div>
    <div class="ares-code ui-border">
      <div class="code-left">
        <span>{{title}}</span>
        <aresInput style="width:55%"
          :placeholderMsg="placeholderMsg"
          :shortMessage="shortMessage"
          :keyBoard="keyBoard"
          :direction="direction"
          :isreadonly="isreadonly"
          :valueMsg="valueMsg"
          @inputChange="inputChange_"></aresInput>
      </div>
      <div class="code-right ui-border-l">
        <div v-show="verShow"
          @click="handleClick">获取验证码</div>
        <div v-show="!verShow"><span>{{timer}}</span>(s)后获取</div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'aresCode',

  data() {
    return {
      verShow: true,
      timer: 60
    };
  },

  props: {
    title: {
      type: String,
      default: '短信验证码'
    },
    placeholderMsg: {
      type: String,
      default: '请输入短信验证码'
    },
    isreadonly: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: 'right'
    },
    //输入框内容
    valueMsg: {
      type: String,
      default: ''
    },
    shortMessage: {
      type: String,
      default: '6'
    },
    keyBoard: {
      type: String,
      default: 'onlyNumber'
    }
  },

  created() {
  },

  methods: {
    inputChange_(data) {
      this.valueMsg = data;
    },
    handleClick() {
      alert(1);
      this.$emit('getCode', '');
      this.verShow = false;
      let authTimer = setInterval(() => {
        this.timer--;
        if (this.timer <= 0) {
          this.verShow = true;
          clearInterval(authTimer);
        }
      }, 1000);
    }
  },
  watch: {
    valueMsg() {
      this.$emit('inputChange', this.valueMsg);
    }
  }
};
</script>

<style lang="less" scoped>
@import '~common/css/base.less';

.ares-code {
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .code-left {
    display: flex;
    justify-content: space-between;
    padding: 0.13rem 0.16rem;
    & > span {
      font-size: 0.14rem;
      color: #333333;
    }
  }
  .code-right {
    padding: 0.13rem 0.16rem;
    font-size: 0.14rem;
    width: 22%;
    color: #333333;
    text-align: center;
  }
}
</style>

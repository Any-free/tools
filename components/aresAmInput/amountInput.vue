<!--
  H5的基础input框
  传参:
  回调:
  author:lite
-->
<template>
  <div>
    <div class="amountInput">
      <span>{{title}}</span>
      <div>
        <span>¥</span>
        <aresInput :placeholderMsg="placeholderMsg"
          :keyBoard="keyBoard"
          :valueMsg="valueMsg"
          @inputChange="inputChange_"></aresInput>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'aresAmInput',

  data() {
    return {

    };
  },

  props: {
    title: {
      type: String,
      default: ''
    },
    placeholderMsg: {
      type: String,
      default: ''
    },
    keyBoard: {
      type: String,
      default: 'numberKey'
    },
    //输入框内容
    valueMsg: {
      type: String,
      default: ''
    }
  },

  created() {

  },

  methods: {
    inputChange_(data) {
      this.valueMsg = data;
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

.amountInput {
  background-color: #ffffff;
  padding: 0.12rem 0.16rem;
  & > span {
    font-size: 0.14rem;
    color: #333333;
  }
  & > div {
    margin-top: 0.12rem;
    display: flex;
    & > span {
      margin-right: 0.12rem;
    }
  }
}
</style>

<!--
  H5的基础input框
  传参:
  回调:
  author:lite
-->
<template>
  <div>
    <div class="formInput ui-border-b">
      <span>{{title}}</span>
      <div>
        <aresInput :placeholderMsg="placeholderMsg"
          :shortMessage="shortMessage"
          :keyBoard="keyBoard"
          :direction="direction"
          :isreadonly="isreadonly"
          :valueMsg="valueMsg"
          @inputChange="inputChange_"></aresInput>
        <img v-if="rightImg!=='noImg'"
          :src="getImg(rightImg)"
          alt="">
      </div>
    </div>
  </div>
</template>


<script>
import { returnUrl } from 'common/js/util/Fw.api.js';
export default {
  name: 'aresCode',

  data() {
    return {

    };
  },

  props: {
    title: {
      type: String,
      default: ''
    },
    rightImg: {
      type: String,
      default: 'arrowR'
    },
    placeholderMsg: {
      type: String,
      default: ''
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
      default: ''
    }
  },

  created() {

  },

  methods: {
    getImg(url) {
      let fullPath = returnUrl();
      return fullPath + 'common/' + url + '.png';
    },
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
.formInput {
  background-color: #ffffff;
  padding: 0.13rem 0.16rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > span {
    font-size: 0.14rem;
    color: #333333;
  }
  & > div {
    display: flex;
    align-items: center;
    & > img {
      height: 0.16rem;
    }
  }
}
</style>

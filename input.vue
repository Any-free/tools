<!--
  H5的基础input框
  传参:valueMsg：输入框的内容
       keyBoard：输入框的键盘类型
       aresInput：输入框组件的类型
       placeholderMsg：输入框的提示文字
       inputType：输入框的类型
       isreadonly：设置输入框是否为只读模式
       shortMessage：输入框最大输入长度
       direction：输入框的起始位置
  回调:inputChange：发送输入框值得变化
  author:lite
-->
<template>
  <div>
    <!-- 最基础input输入框 -->
    <div v-if="aresInput=='1'"
      class="baseInput">
      <div>
        <input ref="textIn"
          :style="getDirection(direction,fontSize)"
          :class="cls"
          :type="inputType"
          :pattern="pat"
          :placeholder="placeholderMsg"
          :readonly="isreadonly"
          :maxlength="shortMessage"
          v-model="valueMsg"
          @paste="getOnpaste()"
          @keydown="preventNotNumber($event)"
          @click="inputClick"
          @blur="getBlur">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'aresInput',

  data() {
    return {
      pat: ''
    };
  },

  props: {
    //输入框内容
    valueMsg: {
      type: String,
      default: ''
    },
    //需要的输入框键盘限制模式
    keyBoard: {
      type: String,
      default: ''
    },
    //传入输出框组件类型
    aresInput: {
      type: String,
      default: '1'
    },
    //传入placeholder内容
    placeholderMsg: {
      type: String,
      default: ''
    },
    //输入框类型
    inputType: {
      type: String,
      default: 'text'
    },
    //设置输入框是否为只读模式
    isreadonly: {
      type: Boolean,
      default: false
    },
    //input框输入长度限制
    shortMessage: {
      type: String,
      default: ''
    },
    //输入框的起始位置
    direction: {
      type: String,
      default: 'left'
    },
    fontSize: {
      type: String,
      default: '0.14'
    }
  },

  created() {
    //初始化加载组件
    this.initComponent();
  },

  methods: {
    //加载组件
    initComponent() {
      try {
        if (this.keyBoard === 'onlyNumber') {
          this.onlyNumber();
        } else if (this.keyBoard === 'numberKey') {
          this.numberKey();
        } else if (this.keyBoard === 'textNum') {
          this.textNum();
        }
      } catch (error) {

      }
    },
    // 获取文字的起始位置
    getDirection(dir, size) {
      return `text-align: ${dir};font-size:${size}rem;`;
    },
    //获取失焦事件
    getBlur() {
      this.$emit('getBlur', '');
    },
    //点击输入框事件
    inputClick() {
      this.$emit('inputClick', '');
    },
    //键盘按钮触发时触发事件
    getOnpaste() {
      this.$emit('getpaste', '');
    },
    //仅数字键盘设置
    onlyNumber() {
      this.pat = '[0-9]*';
      this.inputType = 'number';
    },
    //数字键盘带小数点
    numberKey() {
      this.inputType = 'number';
    },
    //仅字母和数字
    textNum() {
      this.inputType = 'text';
    },
    isNumber(keyValue) {
      return keyValue >= 0 && keyValue <= 9;
    },
    isBackspace(keyValue) {
      return keyValue === 'Backspace';
    },
    isDot(keyValue) {
      return keyValue === '.';
    },
    //限制按键
    preventNotNumber(event) {
      if (typeof event.key === 'undefined') {
        return;
      }
      let keyValue = event.key;

      if (this.keyBoard === 'onlyNumber') {
        if (!this.isNumber(keyValue) && !this.isBackspace(keyValue)) {
          // 其他按键
          event.preventDefault();
          event.stopPropagation();
          return false;
        }
      } else if (this.keyBoard === 'numberKey') {
        if (
          !this.isBackspace(keyValue) &&
          !this.isDot(keyValue) &&
          !this.isNumber(keyValue)
        ) {
          // 其他按键
          event.preventDefault();
          event.stopPropagation();
          return false;
        }
      }

    }
  },
  watch: {
    //监听输入框的value的变化并发送inputChange方法将值传给父组件
    valueMsg(newVal, oldVal) {
      try {
        if (String(newVal).length > this.shortMessage && this.shortMessage !== '') {
          this.valueMsg = oldVal;
        }
        if (this.keyBoard === 'numberKey') {
          this.valueMsg = this.valueMsg.match(/^\d*(\.?\d{0,2})/g)[0] || null;
          if (isNaN(this.valueMsg)) {
            this.valueMsg = '';
          }
        } else if (this.keyBoard === 'textNum') {
          this.valueMsg = this.valueMsg.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, '');
        }
        this.$emit('inputChange', this.valueMsg);
      } catch (error) {
        this.$emit('inputChange', this.valueMsg);
      }

    }
  }
};
</script>

<style lang="less" scoped>
@import '~common/css/base.less';

.baseInput {
  // padding: 0 0.27rem;
  background-color: #ffffff;
  width: 100%;
  user-select: none;
}

input {
  font-size: 0.14rem;
  line-height: 0.16rem;
  width: 100%;
  color: #222222;
  border: 1px solid #ffffff;
  outline: none;
  -webkit-appearance: none;
}

input::placeholder {
  color: #ccc;
  font-size: 0.14rem;
}
</style>

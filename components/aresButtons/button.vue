<!--
  按钮组件
  传参:title  按钮名称
      classes  默认gradation为渐变色   white为白色   blue为蓝色
  回调:btnClick 
  author:wwg
-->
<template>
  <div :class='sizeUI'>
    <div class="Ares-buttons"
      :class="typeDivUI">
      <button class="ui-btn"
        :class="typeUI"
        @click="btnClick">
        <span v-if="$slots.default">
          <slot></slot>
        </span>
      </button>
    </div>
  </div>
</template>
<style lang="less" scoped>
.ui-btn-100 {
  width: 100%;
  & > .Ares-buttons {
    margin: 0.3rem 0.4rem;
  }
}
.ui-btn-50 {
  width: 50%;
  display: inline-block;
  & > .Ares-buttons-blue {
    padding: 0.3rem 0.1rem 0.3rem 0.2rem;
  }
  & > .Ares-buttons-gradation {
    padding: 0.3rem 0.2rem 0.3rem 0.1rem;
  }
}
.Ares-buttons {
  border-radius: 0.04rem;
  padding: 0.01rem;
  & > .ui-btn {
    border: none;
    border-radius: 4px;
    height: 0.45rem;
    width: 100%;
  }
  & > .ui-btn-white {
    background-color: #fff;
    color: #f15f50;
    border: 0.01rem solid #ff7252;
  }
  & > .ui-btn-gradation {
    background-image: linear-gradient(129deg, #fc5451 3%, #ff7252 88%);
    color: #fff;
  }
  & > .ui-btn-blue {
    background-image: linear-gradient(236deg, #6f80f7 0%, #4355d1 90%);
    color: #fff;
  }
}

.ui-btn-gradation:active {
  background-color: #fc5451 !important;
  opacity: 0.8;
}
.ui-btn-blue:active {
  background-color: #6f80f7 !important;
  opacity: 0.8;
}
.ui-btn-white:active {
  opacity: 0.8;
}
</style>

<script>
const cls = 'ui-btn';
export default {
  name: 'buttons',
  props: {
    classes: {
      type: String,
      default: 'gradation'
    },
    type: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: '100'
    }
  },
  methods: {
    btnClick(evt) {
      // eslint-disable-next-line no-unused-expressions
      this.$emit('btnClick', evt);
    }
  },
  computed: {
    typeUI() {
      return [
        this.type ? `${cls}-${this.type}` : ''
      ];
    },
    typeDivUI() {
      return [
        this.type ? `Ares-buttons-${this.type}` : ''
      ];
    },
    sizeUI() {
      return [
        this.size ? `${cls}-${this.size}` : ''
      ];
    },
    htmlType() {
      return this.action;
    }
  }
};

</script>

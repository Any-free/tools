<!--
  slot 插槽  展示信息由父类决定
  传参:toastShow  true/false是否展示隐藏
  author:wwg
-->
<template>
  <div>
    <transition name="fade">
      <div class="Ares-toast"
        v-show="toastShow">
        <span v-if="$slots.default">
          <slot></slot>
        </span>
      </div>
    </transition>
  </div>
</template>
<style lang="less" scoped>
.Ares-toast {
  border: none;
  background-image: linear-gradient(42deg, #f39552 0%, #ffd282 100%);
  font-size: 14px;
  color: #fff;
  position: absolute;
  height: 0.4rem;
  line-height: 0.4rem;
  width: 100%;
  top: 0;
  opacity: 0.9;
  z-index: 999;
  span {
    padding: 0.1rem 0.2rem;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
  border: none !important;
}
.fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
  opacity: 0;
}
</style>

<script>
export default {
  name: 'AresToast',
  data: {
    styleobj: {
      fontSize: '30px',
      color: 'red'
    }
  },
  props: {
    toastShow: {
      type: String,
      default: false
    }
  },
  methods: {

  }
};

</script>

<!--
size:large mini small|default:large
type:default primary ghost danger disabled
action:button, submit, reset
-->
<template>
  <div class="Ares-button">
    <button class="ui-btn"
      :class="classes"
      :AresPadding="AresPadding"
      :type="htmlType || 'button'"
      @click="onClick">
      <img :src="icon"
        v-if="icon">
      <span v-if="$slots.default">
        <slot></slot>
      </span>
    </button>
  </div>
</template>
<script>
const cls = 'ui-btn';
export default {
  name: 'AresButton',
  props: {
    //传入类型
    type: String,
    size: String,
    action: {
      type: String,
      default: ''
    },
    disabled: Boolean
  },

  methods: {
    onClick(evt) {
      // eslint-disable-next-line no-unused-expressions
      !this.disabled && this.$emit('click', evt);
    }
  },
  computed: {
    classes() {
      return [
        this.type ? `${cls}-${this.type}` : '',
        this.size ? `${cls}-${this.size}` : ''
      ];
    },
    htmlType() {
      return this.action;
    }
  }
};
</script>

<style lang="less" scoped>
// @import "~common/css/button/index.less";
.Ares-button {
  padding: 0 0.15rem;
}
</style>

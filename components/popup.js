import './popup.less';

export function assign(target, source) {
  if (target === null || target === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var to = Object(target);

  for (var s = 1; s < arguments.length; s++) {
    let from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
  }

  return to;
}

export default {
  name: 'Popup',
  props: {
    animation: {
      type: Boolean,
      default: true
    },
    mask: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: 'bottom' // top/bottom
    },
    show: Boolean,
    children: null,
    handleClose: Function,
    handleChange: Function,
    wrapperStyle: Object,
    wrapperHideStyle: Object
  },
  computed: {
    computedStyle() {
      let style = this.wrapperStyle;
      let hideStyle = this.wrapperHideStyle;
      if (this.position === 'top') {
        style = style || { top: 0 };
        hideStyle = hideStyle || {
          transform: 'translateY(-100%)',
          webkitTransform: 'translateY(-100%)'
        };
      } else if (this.position === 'left') {
        style = style || { left: 0 };
        hideStyle = hideStyle || {
          transform: 'translateX(-100%)',
          webkitTransform: 'translateX(-100%)'
        };
      } else if (this.position === 'right') {
        style = style || { right: 0 };
        hideStyle = hideStyle || {
          transform: 'translateX(100%)',
          webkitTransform: 'translateX(100%)'
        };
      } else if (this.position === 'bottom') {
        style = style || { bottom: 0 };
        hideStyle = hideStyle || {
          transform: 'translateY(100%)',
          webkitTransform: 'translateY(100%)'
        };
      } else if (this.position === 'center') {
        // flex居中
        style = style || {
          opacity: 1
        };
        hideStyle = hideStyle || {
          opacity: 0
        };
      }
      if (this.show) {
        return style;
      }
      return assign({}, style, hideStyle);
    }
  },
  methods: {
    onClick() {
      this.$emit('close');
      this.handleClose && this.handleClose();
    },
    onTransitionEnd() {
      this.$emit('change', this.show);
      this.handleChange && this.handleChange(this.show);
    }
  },
  mounted() {
    this.$refs.wrapper.addEventListener('transitionend', this.onTransitionEnd);
  },
  render() {
    return (
      <div class={`popup-container${this.show ? '' : ' hide'} popup-container-animation-${this.animation ? 'on' : 'off'}`}>
        <div class={`popup-mask popup-mask-${this.mask ? 'on' : 'off'}`} onClick={this.onClick}></div>
        <div class={`popup-wrapper popup-wrapper-${this.position}`} style={this.computedStyle} ref="wrapper">
          {this.children || this.$slots.default}
        </div>
      </div>
    );
  }
};

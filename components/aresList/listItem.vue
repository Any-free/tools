<!--
  无事件列表展示组件
  传参:itemList  列表数据   
       baseline  底线是虚线还是实线  dashed虚线  solid实线
       customBaseline  是否自定义展示下划线
       divRadius  是否圆角
       backgroundImg //背景图片地址
       itemHight  item高度
  回调:无
  author:wwg
-->
<template>
  <div class="Ares-listItem"
    :class="this.divRadius?'divRadius':''"
    :style="getBackImg(backgroundImg)">
    <div class="Ares-item-div"
      :class="[{'dashedClass':getDashedClass(index)},{'ui-border-b ':getSolidClass(index)},
      {'item50':itemHight==='50'},{'item40':itemHight==='40'},{'item30':itemHight==='30'},
      {'customBaselineStyle':customBaseline && item.baseline}]"
      v-for="(item ,index) in itemList"
      :key="index">
      <div class="Ares-item-divHead "
        v-if="item.headMsg">{{item.headMsg}}</div>
      <div v-if="!item.headMsg">{{item.tittle}}</div>
      <div v-if="!item.headMsg">{{item.msg}}</div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.Ares-listItem {
  background-color: #fff;
  .item50 {
    height: 0.5rem;
    line-height: 0.5rem;
  }
  .item40 {
    height: 0.4rem;
    line-height: 0.4rem;
  }
  .item30 {
    height: 0.3rem;
    line-height: 0.3rem;
  }
  .customBaselineStyle {
    padding-bottom: 0.1rem;
    margin-bottom: 0.1rem;
  }
  .Ares-item-div {
    display: flex;
    justify-content: space-between;
    margin-left: 0.16rem;
    margin-right: 0.16rem;
    font-size: 15px;
    .Ares-item-divHead {
      color: #333333 !important;
      font-weight: 600;
    }
  }
  .Ares-item-div div:nth-child(1) {
    color: #9da6ac;
  }
  .Ares-item-div div:nth-child(2) {
    color: #6b7378;
  }
  .dashedClass {
    border-bottom: 0.01rem dashed #cccccc;
  }
  .solidClass {
    border-bottom: 0.01rem solid #eee;
  }
}
.divRadius {
  border-radius: 0.1rem;
}
</style>

<script>
export default {
  name: 'AresListItem',
  props: {
    baseline: {//底线是虚线还是实线
      type: String,
      default: 'dashed'
    },
    customBaseline: {//是否自定义展示下划线
      type: String,
      default: false
    },
    divRadius: {//是否圆角
      type: String,
      default: false
    },
    backgroundImg: {//背景图片地址
      type: String,
      default: ''
    },
    itemHight: {//
      type: String,
      default: '50'
    },
    itemList: {//列表数据
      type: Object,
      default: []
    }
  },
  methods: {
    getDashedClass(index) {
      if (this.customBaseline && this.baseline === 'dashed') { //自定义展示下划线
        if (this.itemList[index].baseline) {
          return true;
        }
        return false;
      } else if ((index !== this.itemList.length - 1) && !this.itemList[index].headMsg && this.baseline === 'dashed') { //最后不展示下划线，非自定义
        return true;
      }
      return false;
    },
    getSolidClass(index) {
      if (this.customBaseline && this.baseline === 'solid') { //自定义展示下划线
        if (this.itemList[index].baseline) {
          return true;
        }
        return false;
      } else if ((index !== this.itemList.length - 1) && !this.itemList[index].headMsg && this.baseline === 'solid') {
        return true;
      }
      return false;
    },
    getBackImg(img) {
      if (img) {
        let imgUrl = require('common/img/common/bankNameImg.png');
        return (
          'background:url(' + imgUrl + ') no-repeat'
        );
      }
    }
  }
};

</script>

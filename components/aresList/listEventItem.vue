<!--
  点击事件列表展示组件
  传参:bottomLine  底线颜色
      itemList列表数据
        tittle1: 左边数据第一项
        tittle2: 左边数据第二项
        msg1: 右边数据第一项
        msg2: 右边数据第二项
        msg1Color: 右边数据第一项颜色自定义
        msg2Color: 右边数据第二项颜色自定义
        msg2Size: 右边数据第二项大小自定义
        msg2Img: 右边数据第二项图片自定义
        imgL: 左边图片
        imgR: 右边图片
  回调:itemCallBack
  author:wwg
-->
<template>
  <div class="Ares-listEventItem">
    <div class="Ares-listEventItem-div "
      v-for="(item,index) in itemList"
      :class="index < itemList.length - 1?'ui-border-b ':''"
      :key='item'
      @click="itemCallBack(item)">
      <div class="Ares-listEventItem-divL">
        <div class="Ares-listEventItem-divLImg"
          v-if="item.imgL"
          :style="getBackImg(item.imgL)">
        </div>
        <div class="Ares-listEventItem-divLMsg">
          <div v-if="item.tittle1">{{item.tittle1}}</div>
          <div>{{item.tittle2}}</div>
        </div>
      </div>
      <div class="Ares-listEventItem-divR">
        <div class="Ares-listEventItem-divRMsg">
          <div v-if="item.msg1 || item.tittle1"
            :style="{color:item.msg1Color}">{{item.msg1}}</div>
          <div :style="[{'color':item.msg2Color},{'font-size':item.msg2Size}]">{{item.msg2}}
            <img v-if="item.msg2Img"
              :src="getHeadImg('right')">
          </div>
        </div>
        <div class="
            Ares-listEventItem-divRImg"
          v-if="item.imgR"
          :style="getBackImg(item.imgR)">
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.Ares-listEventItem {
  background-color: #fff;
  .Ares-listEventItem-div {
    padding: 0 0.16rem;
    display: flex;
    justify-content: space-between;
    & .Ares-listEventItem-divL {
      color: #6b7378;
      display: flex;
      justify-content: start;
      & .Ares-listEventItem-divLMsg {
        margin: 0.09rem 0rem;
        & div {
          height: 0.28rem;
          line-height: 0.28rem;
        }
        & div:nth-child(1) {
          font-size: 0.15rem;
          font-weight: 600;
          width: 2rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        & div:nth-child(2) {
          font-size: 0.13rem;
          white-space: nowrap;
          width: 2rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      & .Ares-listEventItem-divLImg {
        height: 0.42rem;
        width: 0.42rem;
        margin: 0.16rem 0.16rem 0.16rem 0rem;
      }
    }
    & .Ares-listEventItem-divR {
      color: #6b7378;
      display: flex;
      justify-content: start;
      .Ares-listEventItem-divRMsg {
        margin: 0.09rem 0rem;
        & div {
          height: 0.28rem;
          line-height: 0.28rem;
          text-align: right;
        }
        & div:nth-child(1) {
          font-size: 0.14rem;
          color: #333;
        }
        & div:nth-child(2) {
          font-size: 0.12rem;
          color: #9da6ac;
          img {
            width: 0.08rem;
          }
        }
      }
      & .Ares-listEventItem-divRImg {
        height: 0.2rem;
        width: 0.12rem;
        margin-top: 0.27rem;
        margin-left: 0.1rem;
      }
    }
  }
}
</style>

<script>
export default {
  name: 'AresListEventItem',
  props: {
    itemList: {//列表数据
      type: Object,
      default: []
    },
    bottomLine: {//列表数据
      type: Object,
      default: '#e0e0e0'
    }
  },
  methods: {
    getBackImg(img) {
      let imgUrl = require('common/img/common/' + img + '.png');
      return (
        'background:url(' + imgUrl + ') no-repeat;background-size: 100% 100%;'
      );
    },
    getHeadImg() { //计算图片展示
      return require('common/img/common/arrowR.png');
    },
    getBottomLine(index, itemList) {
      if (index < itemList.length - 1) {
        return (
          'border-bottom: 1px solid  ' + this.bottomLine
        );
      }
    },
    itemCallBack(item) {
      this.$emit('itemClick', item);
    }
  }
};

</script>

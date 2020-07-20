<!--
  slot 插槽  展示信息由父类决定
  传参：customTimeS自定义时间开始  customTimeE自定义时间结束
          timeList 左边列表     此列表若title为自定义则为日期选择自定义选项
          typeList 右边列表项
  author:wwg
-->
<template>
  <div class="Ares-timeSelect">
    <div class="Ares-timeSelect-div">
      <div class="timeSelect-head">
        <!-- 选择器head -->
        <div @click="timeShowFun('left')"
          class="timeSelect-head-div timeSelect-head-interval"
          :class="showDiv === 'left'?'seleteIng':selectEdStyle === 'left'||selectEdStyle === 'leftright'?'blackClor':''">{{timeSeleNow}}
          <img :src="getHeadImg('left')">
        </div>
        <div @click="typeShowFun('right')"
          class="timeSelect-head-div"
          :class="showDiv === 'right'?'seleteIng':selectEdStyle === 'right'||selectEdStyle === 'leftright'?'blackClor':''">{{typeSeleNow}}
          <img :src="getHeadImg('right')">
        </div>
      </div>
      <div class="timeSelect-body"
        v-show="timeSelectBody">
        <!-- 选择器隐藏部分 -->
        <div v-for="item in showList"
          class="timeSelect-body-item ui-border-b "
          :class="item.active?'timeSelected':''"
          :key='item'
          @click="itemSelected(item)">
          <!-- 选择某项按钮事件 -->
          <div v-if="item.tittle==='自定义'"
            class="timeSelect-body-timeDivS">
            <div class="timeSelect-body-timeDiv">{{customTimeS}}
              <img :src="getHeadImg('calendar')">
            </div>
            <div class="horizontalLine"></div>
            <div class="timeSelect-body-timeDiv">{{customTimeE}}
              <img :src="getHeadImg('calendar')">
            </div>
          </div>
          <div v-else>{{item.tittle}}</div>
          <div v-if="item.tittle!='自定义'"><img v-show="item.active"
              src="../../img/common/checkMark.png"></div>
        </div>
        <div class=" timeSelect-body-itemClick"
          @click="screenSelected">确定</div>
      </div>
    </div>

    <div class="timeSelect-shade"
      v-show="timeSelectBody"
      @touchmove.prevent
      @click="screenSelected"></div>
  </div>
</template>
<style lang="less" scoped>
.Ares-timeSelect {
  border: none;
  width: 100%;
  .Ares-timeSelect-div {
    position: relative;
    background-color: #fff;
  }
  //选择头
  .timeSelect-head {
    display: flex;
    justify-content: center;
    background-color: #fff;
    z-index: 999;
    position: relative;
    width: 100%;
    height: 0.45rem;
    color: #6c7479;
    & > .blackClor {
      color: #000;
    }
    & > .seleteIng {
      color: #f15f50;
    }
    & > .timeSelect-head-div {
      width: 49%;
      text-align: center;
      height: 0.17rem;
      margin: auto;
      & > img {
        height: 0.17rem;
      }
    }
    .timeSelect-head-interval {
      //中间间隔
      border-right: 0.01rem solid #e6e6e6;
    }
  }
  //选择器隐藏部分
  .timeSelect-body {
    background-color: #fff;
    z-index: 999;
    position: absolute;
    top: 0.44rem;
    width: 100%;
    color: #999999;
    .timeSelected {
      color: #2c2c2c !important;
      img {
        width: 0.16rem;
        margin-right: 0.15rem;
      }
    }
    .timeSelect-body-item {
      font-size: 15px;
      margin-left: 0.15rem;
      height: 0.5rem;
      line-height: 0.5rem;
      display: flex;
      justify-content: space-between;
      & .timeSelect-body-timeDivS {
        display: flex;
        justify-content: start;
        .horizontalLine {
          width: 0.1rem;
          height: 0.01rem;
          background: #333;
          margin: 0.23rem 0.1rem;
        }
        & .timeSelect-body-timeDiv {
          width: 1.1rem;
          height: 0.28rem;
          background: #f5f5f5;
          margin: auto;
          line-height: 0.28rem;
          padding-left: 0.1rem;
          & > img {
            width: 0.16rem;
            position: relative;
            top: 0.01rem;
            margin: 0 auto;
          }
        }
      }
    }
    .timeSelect-body-itemClick {
      font-size: 15px;
      height: 0.5rem;
      line-height: 0.5rem;
      margin-left: 0.15rem;
      color: #f15f50;
      text-align: center;
    }
  }
}
.timeSelect-shade {
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 998;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>

<script>
export default {
  name: 'AresTimeSelect',
  props: {
    customTimeS: {//自定义时间开始
      type: String,
      default: '03/09/2019'
    },
    customTimeE: {//自定义时间结束
      type: String,
      default: '03/09/2019'
    },
    timeList: {//左边列表
      type: Object,
      default: []
    },
    typeList: {//右边列表
      type: Object,
      default: []
    },
    // 以下为默认参数
    timeSeleNow: {//默认数据-时间选择
      type: String,
      default: ''
    },
    typeSeleNow: {//默认数据-类型选择
      type: String,
      default: ''
    },
    timeSelectBody: {//默认数据
      type: String,
      default: false
    },
    selectEdStyle: {//默认筛选中数据
      type: String,
      default: ''
    },
    showList: [],//默认数据-可变展示列表选项
    showDiv: ''//默认数据-目前展示的是哪个列表
  },
  watch: {

  },
  methods: {
    timeShowFun() { //左边列表
      if (this.showDiv !== 'left' || this.timeSelectBody === false) {
        this.showList = this.timeList;//时间列表
        this.timeSelectBody = true;
        this.showDiv = 'left';
        this.selectEdStyle = '';
      } else {
        this.timeSelectBody = false;
        this.showDiv = '';
      }
    },
    typeShowFun() { //右边列表
      if (this.showDiv !== 'right' || this.timeSelectBody === false) {
        this.showList = this.typeList;//类型列表
        this.timeSelectBody = true;
        this.showDiv = 'right';
        this.selectEdStyle = '';
      } else {
        this.timeSelectBody = false;
        this.showDiv = '';
      }
    },
    itemSelected(item) { //列表选择
      if (this.showDiv === 'left') {
        for (let index = 0; index < this.timeList.length; index++) {
          if (item.tittle === this.timeList[index].tittle) {
            this.timeList[index].active = true;
            this.timeSeleNow = item.tittle;//时间展示
          } else {
            this.timeList[index].active = false;
          }
        }
      } else if (this.showDiv === 'right') {
        for (let index = 0; index < this.typeList.length; index++) {
          if (item.tittle === this.typeList[index].tittle) {
            this.typeList[index].active = true;
            this.typeSeleNow = item.tittle;//类型展示
          } else {
            this.typeList[index].active = false;
          }
        }
      }
    },
    screenSelected() { //确认按钮
      this.timeSelectBody = false;
      // eslint-disable-next-line no-unused-expressions
      this.$emit('selectedFun', '');
      this.selectEdStyle = this.showDiv;
      this.showDiv = '';
    },
    getHeadImg(msg) { //计算图片展示
      if (msg === 'left') {
        if (this.showDiv === 'left') {
          return require('common/img/common/triangleOT.png');
        }
      } else if (msg === 'right') {
        if (this.showDiv === 'right') {
          return require('common/img/common/triangleOT.png');
        }
      } else if (msg === 'calendar') {
        return require('common/img/common/calendar.png');
      }
      return require('common/img/common/triangleGD.png');
    }
  }
};

</script>

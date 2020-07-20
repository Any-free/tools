<!--
  H5的多选框
  传参:
  回调:
  author:lite
-->
<template>
  <div>
    <!-- 消费分期型多选框 -->
    <div v-if="checkBoxType=='1'">
      <div class="ares-check-title">
        <span>{{title}}</span>
        <div>
          <input type="checkbox"
            v-model="checkedAll"
            @click="selectAll()"
            id="all" />
          <span><label for="all">全选</label></span>
        </div>
      </div>
      <div v-for="(item,index) in List"
        :key="index">
        <div class="ares-check">
          <div class="ares-check-content ui-border-b">
            <div class="ares-check-left">
              <span><label :for="index">{{item.content}}</label></span>
              <div>
                <span>{{item.time}}</span>
                <p>未入账</p>
              </div>
            </div>
            <div class="ares-check-right">
              <span><label :for="index">¥{{item.price}}</label></span>
              <!-- <img src="../../img/common/unselected.png"
              alt=""> -->
              <input type="checkbox"
                :id="index"
                v-model="checked"
                :value="getReturn(item,index)" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 缴费型复选框 -->
    <div v-if="checkBoxType=='2'">
      <div class="ares-check2-title">
        <span>{{title}}</span>
        <div>
          <input type="checkbox"
            v-model="checkedAll"
            @click="selectAll()"
            id="all2" />
          <span><label for="all2">全选</label></span>
        </div>
      </div>
      <div v-for="(item,index) in List"
        :key="index">
        <div class="ares-check2-content ui-border-b">
          <div>
            <input type="checkbox"
              :id="index+'1'"
              v-model="checked"
              :value="getReturn(item,index)" />
            <span>
              <label :for="index+'1'">{{item.content}}</label>
            </span>
          </div>
          <span>¥{{item.price}}</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { getDeviceOS } from 'common/js/util/Fw.api.js';
export default {
  name: 'aresCheck',
  data() {
    return {
      checked: [],
      checkedAll: false
    };
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    List: {
      type: Object,
      default: []
    },
    checkBoxType: {
      type: String,
      default: '1'
    }
  },

  filters: {

  },

  created() {

  },

  watch: {
    checked() {
      this.$emit('choose', this.checked);
    }
  },

  methods: {
    getReturn(item, index) {
      item.index = index;
      return item;
    },
    selectAll() {
      if (this.checkedAll) {
        // 全不选
        this.checked = [];
      } else {
        // 全选
        this.checked = [];
        this.List.forEach((item) => {
          this.checked.push(item);
        });
      }
    }
  }
};

</script>

<style lang="less" scoped>
@import '~common/css/base.less';
input[type='checkbox'] {
  width: 0.2rem;
  height: 0.2rem;
  background: url('../../img/common/unselected.png');
  background-size: cover;
  -webkit-appearance: none;
  // border: 1px solid #c9c9c9;
  // border-radius: 2px;
  outline: none;
  cursor: pointer;
}
input[type='checkbox']:checked {
  background: url('../../img/common/selected.png');
  background-size: cover;
}

.ares-check-title {
  display: flex;
  justify-content: space-between;
  color: #333333;
  background-color: #ffffff;
  padding: 0.16rem;
  align-items: center;
  & > span {
    font-size: 0.15rem;
    font-weight: bold;
  }
  & > div {
    display: flex;
    align-items: center;
    & > input {
      width: 0.16rem;
      height: 0.16rem;
    }
    & > span {
      margin-left: 0.08rem;
      font-size: 0.13rem;
      color: #333333;
      font-weight: bold;
    }
  }
}
.ares-check {
  background-color: #ffffff;
  padding-left: 0.16rem;
  padding-top: 0.1rem;
  .ares-check-content {
    padding-right: 0.16rem;
    padding-bottom: 0.12rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // border-bottom: 1px solid #e0e0e0;
    .ares-check-left {
      font-size: 0.14rem;
      font-weight: bold;
      color: #6b7378;
      display: flex;
      flex-direction: column;
      & > div {
        display: flex;
        align-items: center;
        margin-top: 0.04rem;
        & > span {
          font-size: 0.12rem;
          color: #6b7378;
        }
        & > p {
          margin-left: 0.12rem;
          padding: 0.02rem 0.09rem;
          border: 1px solid #f15f5f;
          text-align: center;
          font-size: 0.1rem;
          color: #f15f5f;
        }
      }
    }
    .ares-check-right {
      font-size: 0.14rem;
      color: #ed5252;
      display: flex;
      align-items: center;
      & > input {
        margin-left: 0.16rem;
      }
    }
  }
}

.ares-check2-title {
  background-color: #ffffff;
  font-size: 0.16rem;
  font-weight: bold;
  color: #333333;
  padding: 0.16rem;
  display: flex;
  align-items: center;
  & > div {
    display: flex;
    align-items: center;
    & > input {
      margin-left: 0.26rem;
      height: 0.16rem;
      width: 0.16rem;
    }
    & > span {
      font-size: 0.13rem;
      color: #333333;
      margin-left: 0.08rem;
    }
  }
}
.ares-check2-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 0.16rem;
  & > div {
    display: flex;
    align-items: center;
    & > span {
      margin-left: 0.08rem;
      font-size: 0.16rem;
      color: #6c7479;
    }
  }
  & > span {
    font-size: 0.15rem;
    color: #333333;
  }
}
</style>
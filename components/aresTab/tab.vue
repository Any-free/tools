<!--
  H5的可切换tab栏
  传参:tabs为一个可选tab数组
  回调:selectedTab,回传值data为选中tab的index索引,开发人员根据索引值的不同做相关操作
  author:lite
-->
<template>
  <div class="md-example-child md-example-child-tabs md-example-child-tab-bar-5">
    <md-tab-bar v-model="current"
      :items="items"
      @change="onChange" />
  </div>
</template>

<script>
import { TabBar, Toast } from 'mand-mobile';
Vue.component(TabBar.name, TabBar);

export default {
  name: 'tab-bar-demo',
  components: {
    [TabBar.name]: TabBar
  },
  data() {
    return {
      current: 1,
      items: [{ name: 1, label: '标签1' }, { name: 2, label: '标签2' }, { name: 3, label: '标签3' }]
    };
  },
  methods: {
    onChange(item, index, prevIndex) {
      Toast.info(`index: ${index}, prevIndex: ${prevIndex}, label: ${item.label}`);
    }
  }
};

</script>
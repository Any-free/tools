/*
 * @Author: yql@yitong.com.cn
 * @Date: 2019-01-01 15:49:13
 * @Last Modified time: 2018-07-09 15:49:13
 * @Description: 将该组件作为 Vue 插件
 */

import AresListHead, {
  AresListItem,
  AresListEventItem
} from './aresList/index';
import AresSmallButton, {
  AresButtons,
  AresSmallButtonS
} from './aresButtons/index';
import AresToast from './aresToast/index';
import AresTimeSelect from './aresDropMenu/index';
import AresTab from './aresTab/index';
import aresRadio from './aresRadio/index.js';
import aresCheck from './aresCheck/index.js';
import aresSwitch from './aresSwitch/index.js';
import aresInput from './aresInput/index.js';
import aresAmInput from './aresAmInput/index.js';
import aresFormInput from './aresFormInput/index.js';
import aresCode from './aresCode/index.js';

const components = [
  AresTab, AresListHead, AresSmallButton, aresRadio, aresCheck, aresSwitch, aresInput, aresAmInput, aresFormInput, aresCode, AresListHead, AresListItem, AresListEventItem, AresSmallButton, AresSmallButtonS, AresButtons, AresToast, AresTimeSelect
];

const install = function (Vue) {
  if (install.installed) {
    return;
  }
  components.map(component => {
    Vue.component(component.name, component);
  });
};

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  // install,
  AresListHead,
  AresListItem,
  AresListEventItem,
  AresSmallButton,
  AresTab,
  aresRadio,
  aresCheck,
  aresSwitch,
  aresInput,
  aresAmInput,
  aresFormInput,
  aresCode,
  AresSmallButtonS,
  AresButtons,
  AresToast,
  AresTimeSelect
};

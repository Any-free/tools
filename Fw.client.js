/**
 * 判断客户端类型
 */
class Client {
  constructor(userAgent) {
    if (userAgent) {
      return this.ua = userAgent.toLowerCase();
    }
    if (window) {
      return this.ua = window.navigator.userAgent.toLowerCase();
    }
    throw new Error('userAgent is not defined！');
  }

  //是否是isMobile
  isMobile() {
    return this.ua.match(/(iPhone|iPod|android|ios|iPad|windows phone|tablet)/i);
  }

  //返回手机系统
  getPhoneSystemType() {
    let u = this.ua;
    let isAndroid = u.indexOf('android') > -1 || u.indexOf('adr') > -1; //android终端
    let isiOS = Boolean(u.match(/\(i[^;]+;( u;)? cpu.+mac os x/)); //ios终端
    let isWinPhone = u.indexOf('Windows Phone'.toLowerCase()) > -1;
    if (isAndroid) return 'Android';
    if (isiOS) return 'IOS';
    if (isWinPhone) return 'Windows Phone';
    return '';
  }

  getDevice() {
    let isIOS = true;
    if (this.isMobile()) {
      let phone = this.getPhoneSystemType();
      if (phone != 'IOS') {
        isIOS = false;
      }
      return isIOS;
    }
    return isIOS;
  }
}

import * as iphone from 'common/js/device/Fw.ios.js';
import * as android from 'common/js/device/Fw.android';
const isIOS = new Client().getDevice();
export const client = isIOS ? iphone : android;

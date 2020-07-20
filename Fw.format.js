/**
 * 是否是URL
 * @param v
 * @returns {boolean}
 */
export function isUrl(v) {
  return /(((^https?)|(^ftp)):\/\/((([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*)|(localhost|LOCALHOST|127.0.0.1))\/?)/i
    .test(v);
}

/**
 * 转换为字符
 * @param v {object}
 * @returns {string}
 */
export function toString(v) {
  return Object.prototype.toString.apply(v);
}

/**
 * 是否是数组
 * @param v
 * @returns {boolean}
 */
export function isArray(v) {
  return toString(v) === '[object Array]';
}

/**
 * 判断值是否已定义
 * @param v {*}
 * @returns {boolean}
 */
export function isDefined(v) {
  return typeof v !== 'undefined';
}

/**
 * 获取指定位数的随机数
 * @param num
 * @returns {string}
 */
export function getRandom(num) {
  let tmp = '';
  if (num && num > 0) {
    for (let i = 0; i < num; i++) {
      tmp += Math.floor(Math.random() * 10);
    }
  }
  return tmp;
}

/**
 * 是否为空
 * @param v  {*} 值
 * @param allowBlank {boolean} 是否允许空
 * @returns {boolean|*}
 */
export function isEmpty(v, allowBlank) {
  return v === null || v === undefined ||
    String(v).toUpperCase() === 'NULL' ||
    ((isArray(v) && !v.length)) ||
    (!allowBlank ? v === '' : false);
}

/**
 * 是否是日期
 * @param v
 * @returns {boolean}
 */
export function isDate(v) {
  return toString(v) === '[object Date]';
}

/**
 * 是否是对象
 * @param v
 * @returns {boolean}
 */
export function isObject(v) {
  return Boolean(v) && toString(v) === '[object Object]';
}

/**
 * 是否是函数
 * @param v
 * @returns {boolean}
 */
export function isFunction(v) {
  return toString(v) === '[object Function]';
}

/**
 * 是否是数值型
 * @param v
 * @returns {boolean}
 */
export function isNumber(v) {
  return typeof v === 'number' && isFinite(v);
}

/**
 * 是否是字符型
 * @param v
 * @returns {boolean}
 */
export function isString(v) {
  return typeof v === 'string';
}

/**
 * 是否是布尔型
 * @param v
 * @returns {boolean}
 */
export function isBoolean(v) {
  return typeof v === 'boolean';
}

/**
 * 是否是原始类型
 * @param v
 * @returns {*|boolean}
 */
export function isPrimitive(v) {
  return isString(v) || isNumber(v) || isBoolean(v);
}

/**
 * 是否可迭代
 * @param v
 * @returns {*}
 */
export function isIterable(v) {
  return (v && typeof v !== 'string') ? isDefined(v.length) : false;
}

/**
 * 查询当前日前几天的日期
 * @param AddDayCount {int} 负数为前X天 正数为后X天
 * @returns {string}
 * @exaple
 *    getDate(-6)
 */
export function getDate(AddDayCount) { //日期查询
  let dd = new Date();
  dd.setDate(dd.getDate() + AddDayCount + 1);
  let y = dd.getYear() + 1900;
  let m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1);
  let d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate();
  return y + '-' + m + '-' + d;
}

/**
 * JSON对象转换为String
 * @param json
 * @constructor
 */
export function JsonToStr(json) {
  return JSON.stringify(json);
}

/**
 * 日期格式化
 * 20170911->2017-09-11
 * @param str
 */
export function dateFormat(str) {
  if (str.length === 0) {
    return null;
  }
  let date = str.substring(0, 4) + '-' + str.substring(4, 6) + '-' + str.substring(6, 8);
  return date;
}

/**
 * 日期格式化
 * 20170911->2017-09-11
 * @param str
 */
export function finDateForm(str) {
  if (str.length === 0) {
    return null;
  }
  if (str.length === 5) {
    let date = str.substring(0, 2) + '月' + str.substring(3) + '日';
    return date;
  }
  if (str.length === 10) {
    let date = str.substring(0, 4) + '年' + str.substring(5, 7) + '月' + str.substring(8) + '日';
    return date;
  }

}

/**
 * 判断是否手持设备
 * @returns {boolean}
 */
export function getDeviceOS() {
  //获取浏览器类型
  let ua = navigator.userAgent;
  //
  let os = {};
  let android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
  let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  let iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
  let ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  if (android) {
    os.android = true;
  }
  if (iphone && !ipod) {
    os.ios = os.iphone = true;
  }
  //
  return os;
}

export function dayFmt(date) {
  return date.substring(0, 4) + '-' + date.substring(4, 6) + '-' + date.substring(6, 8);
}

export function timeFmt(date) {
  return date.substring(0, 2) + ':' + date.substring(2, 4) + ':' + date.substring(4, 6);
}

/**
 * 格式化金额
 * @param v
 * @param c
 * @param d
 * @param t
 * @returns {string}
 */
export function fmtMoney(v, c, d, t) {
  // 防止JSON传过来的类型为number
  if (typeof (v) == 'number') {
    v = v.toString();
  }
  v = v.replace(/,/g, '');
  v *= 1;
  let p = v < 0 ? '-' : '';
  c = c || 2;
  //        v = v.toFixed(c);
  v = Math.round(v * 100000) / 100000;
  c = Math.abs(c) + 1 ? c : 0;
  d = d || '.';
  t = t || ',';
  let m = (/(\d+)(?:(\.\d+)|)/.exec(String(v)));
  let x = m[1].length > 3 ? m[1].length % 3 : 0;
  return p + (x ? m[1].substr(0, x) + t : '') +
    m[1].substr(x).replace(/(\d{3})(?=\d)/g, '$1' + t) +
    (c ? d + (Number(m[2]) || 0).toFixed(c).substr(2) : '');
}

/**
 * 金额格式化保留2位小数点
 * @param s
 * @returns {*}
 */
export function fmtAmt(s) {
  try {
    return fmtMoney(s, 2, '.', ',');
  } catch (e) {
    return '0.00';
  }
}

//格式化利率
export function fmtRate(str) {
  str = str.replace(/^0+/, '');
  if (str.indexOf('.') >= 0) {
    str = fmtMoney(str, 4, '.', ',');
    str = str.replace(/0+$/, '');
    let temp = str.split('.')[1];
    if (temp.length == 1) {
      str += '0';
    }
    if (temp.length == 0) {
      str += '00';
    }
    return str;
  } else {
    return str + '.00';
  }
}

//身份证校验
export function isIdNo(idNo) {
  if (!idNo || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X|x)$/.test(idNo)) {
    return false;
  } else {
    return true;
  }
}

/**
 * 格式化手机(格式：133****3333)
 */
export function fmtPhoneNo(value) {
  if (value == null || value == '') {
    return '';
  }
  value = removeSpace(value);
  let tmpStr = '';
  let start = value.length - 4;
  if (start < 4) {
    start = 4;
  }
  tmpStr = tmpStr + value.substring(0, 3) + '****' + value.substring(start, value.length);
  return tmpStr;
}

/**
 * 格式化手机号(格式：133 3333 3333)
 */
export function fmtPhoneNum(phoneNum) {
  if (phoneNum.length > 3) {
    phoneNum = phoneNum.replace(/\s*/g, '');
    if (phoneNum.length > 7) {
      phoneNum = phoneNum.replace(/^(...)(....)/g, '$1 $2 ');
    } else if (phoneNum.length > 3) {
      phoneNum = phoneNum.replace(/^(...)/g, '$1 ');
    }
  }
}

/**
 * 帐号格式化、 添加空格分隔符    hidden = true将隐藏部分号码
 * @param  value {string}账户
 * @param hidden {bool}  是否隐藏账户  true为隐藏
 */
export function fmtAcctNo(value, hidden) {
  if (value == null || value == '') {
    return '';
  }
  value = removeSpace(value);
  let tmpStr = '';
  if (hidden) {
    let start = value.length - 4;
    if (start < 4) {
      start = 4;
    }
    tmpStr = tmpStr + value.substring(0, 4) + ' **** **** ' + value.substring(start, value.length);
  } else {
    while (value.length > 4) {
      tmpStr = tmpStr + value.substring(0, 4);
      tmpStr = tmpStr + ' ';
      value = value.substring(4, value.length);
    }
    tmpStr = tmpStr + value;
  }
  return tmpStr;
}

/**
 * 是否脱敏显示账号
 * @param acctNo
 * @param isProtect
 * @returns {*}
 */
export function fmtAcctNoProtect(acctNo, isProtect) {
  //let isProtect = Fw.getAcctProtect();
  if (isProtect == '1') {
    return this.fmtAcctNo(acctNo, true);
  } else {
    return this.fmtAcctNo(acctNo);
  }
}

/**
 * 是否脱敏显示证件号
 * @param phoneNo
 * @returns
 */
export function fmtIDNoProtect(idNo, isProtect) {
  //let isProtect = Fw.getAcctProtect();
  if (isProtect == '1') {
    return fmtAcctNo(idNo, true);
  } else {
    return fmtAcctNo(idNo);
  }
}

/**
 * 卡号末4位
 */
export function fmtAcctStop4(value) {
  if (value == null || value == '') {
    return '';
  }
  let n = 4;
  let acct4 = value.substring(value.length - n, value.length);
  return acct4;
}

export function fmtAccInput(ele) {
  ele.on('keyup', function () {
    let oW = ele.val();
    ele.val(oW.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 '));
  });
}

/**
 * 去除字符串空格
 * @param value
 * @returns {string}
 */
export function removeSpace(value) {
  let rtnVal = String(value);
  return rtnVal.replace(/\s/g, '');
}

/**
 * 格式化证件类型
 * @param type
 * @returns {*}
 */
export function fmtIdentityType(type) {
  let text = type;
  switch (String(type)) {
  case 'I':
    text = '身份证';
    break;
  case 'T':
    text = '临时身份证';
    break;
  case 'S':
    text = '军官证/士兵证';
    break;
  case 'P':
    text = '护照';
    break;
  case 'L':
    text = '营业执照';
    break;
  case 'O':
    text = '其他有效证件';
    break;
  case 'R':
    text = '户口簿';
    break;
  case 'H':
    text = '港澳居民来往内地通行证';
    break;
  case 'W':
    text = '台湾同胞来往内地通行证';
    break;
  case 'F':
    text = '外国人居留证';
    break;
  case 'C':
    text = '警官证';
    break;
  }
  return text;
}

/**
 * 金额格式化保留2位小数点
 * @param s
 * @returns {*}
 */
export function fmtAmtTwo(s) {
  try {
    return this.fmtMoney(s, 2, '.', ',');
  } catch (e) {
    return '0.00';
  }
}

/**
 * 金额格式化保留3位小数点
 * @param s
 * @returns {*}
 */
export function fmtAmtThree(s) {
  try {
    return this.fmtMoney(s, 3, '.', ',');
  } catch (e) {
    return '0';
  }
}

/**
 * 数量格式化""显示为0否则返回s
 * @param s
 * @returns {*}
 */
export function fmtNum(s) {
  let r;
  if (s === '') {
    r = '0';
  } else {
    r = s;
  }
  return r;
}

/**
 * 距离格式化如果s为""显示为""如果s<1000? s+"m" : (s/1000).toFixed(1)+"km"
 * @param s
 * @returns {*}
 */
export function fmtDistance(s) {
  if (s == '') {
    return s;
  } else {
    s = parseInt(s * 100 / 100); //去掉小数部分
    s1 = String(s);
    if (s1.length > 4 || s1.length == 4) { //整数部分大于等于4位显示km，小数部分保留一位
      return (s1 / 1000.0).toFixed(1) + 'km';
    } else { //整数部分小于4位，显示m
      return s1 + 'm';
    }
  }
}

/**
 * 金额格式化保留4位小数点
 * @param s
 * @returns {*}
 */
export function fmtAmt4s(s) {
  try {
    return this.fmtMoney(Number(s), 4, '.', ',');
  } catch (e) {
    return '0.0000';
  }
}

/**
 * 去除金额格式化
 * @param b
 * @returns {string}
 */
export function delFmtMony(b) {
  let a = String(b.trim());
  if (a.indexOf('.') != -1) {
    a = a.substr(0, a.indexOf('.') + 3);
  }
  return a.replace(/,/g, '');
}

/**
 * 金额去除格式化，去除小数后的.00。
 * 如果是0.00 则返回 “”;
 */
export function unfmtAmtRemove(s) {
  function unfmtAmt(s) {
    return s.replace(/,/g, '');
  }
  s = unfmtAmt(s);
  // s = this.unfmtAmt(s);
  let reg = /^\d+\.00$/;
  s = s.replace(reg, s.substring(0, s.length - 3));
  if (s == '0') {
    s = '';
  }
  return s;
}

/**
 * 金额去格式化
 * @param s
 * @returns {string|void|XML}
 */
export function unfmtAmt(s) {
  return s.replace(/,/g, '');
}

/**
 * 利率格式化
 * @param b
 * @returns {string}
 */
export function fmtAddPercent(b) {
  let a = Math.floor(b * 100) / 100;
  a = (a.toFixed(2));
  return a + '%';
}

/**
 * 格式化数字为大写汉字
 * @param num
 * @returns {string}
 */
export function fmtNumber2Chinese(n) {
  let AmtUnitCN = '千百拾亿千百拾万千百拾元角分';
  let NumCN = '零壹贰叁肆伍陆柒捌玖';
  n = n.replace(/,/g, '');
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) {
    return '';
  }
  let unit = AmtUnitCN,
    str = '';
  n += '00';
  let p = n.indexOf('.');
  if (p >= 0) {
    n = n.substr(0, p) + n.substr(p + 1, 2);
  }
  unit = unit.substr(unit.length - n.length);
  for (let i = 0; i < n.length; i++) {
    str += NumCN.charAt(n.charAt(i)) + unit.charAt(i);
  }
  return str.replace(/零(千|百|拾|角)/g, '零').replace(/(零)+/g, '零').replace(/零(万|亿|元)/g, '$1').replace(
    /(亿)万|壹(拾)/g, '$1$2').replace(/^元零?|零分/g, '').replace(/^分/g, '').replace(/元$/g, '元整');
}

/**
 * 获取图片全路径
 * @param url (img/face.png)
 * @returns http://host:port/mbank/img/face.png
 */
export function fmtImgUrl(url) {
  url = (url.indexOf('/') == 0) ? url : ('/' + url);
  return basePath + url;
}

/**
 * @Desc 获取手机号运营商
 * @param mobile 手机号码
 * @returns
 */
export function fmtMobService(mobile) {
  if (mobile == null || mobile == '') {
    return '';
  }
  if (/^13[4-9]|147|15[0-27-9]|178|18[2-478]$/.test(mobile)) {
    return '移动';
  }
  if (/^13[0-2]|145|15[56]|176|18[56]$/.test(mobile)) {
    return '联通';
  }
  if (/^133|153|177|18[019]$/.test(mobile)) {
    return '电信';
  }
  return mobile;
}

export function fmtSHPwd(pwd) {
  //if(!Fw.isEmpty(pwd)){
  if (pwd) {
    pwd = pwd.replace(/\//g, '、').replace(/</g, '《').replace(/>/g, '》').replace(/=/g, '#');
    return pwd;
  } else {
    return '';
  }
}

/**
 * 将时间戳转换成年-月-日格式
 */
export function formatTimeToDate(sec) {
  if (!isNaN(sec)) {
    sec = parseInt(sec);
  }
  let time = new Date(sec);
  let y = time.getFullYear();
  let m = time.getMonth() + 1;
  let d = time.getDate();
  let mm = m < 10 ? ('0' + m) : m;
  let dd = d < 10 ? ('0' + d) : d;

  return y + '-' + mm + '-' + dd;
}

/**
 * 格式化阿拉伯金额为汉字大写
 */
export function formatNumToChinese(n) {
  let max = 99999999999.99;
  let integral, decimal, result, parts, digits, radices, bigRadices, decimals, zeroCount, i, p, d, ds, quotient, modulus;

  parts = n.split('.'); //将输入的数字从小数点分割成两部分
  if (parts.length > 1) {
    integral = parts[0];
    decimal = parts[1];
    decimal = decimal.substr(0, 2);
  } else {
    integral = parts[0];
    decimal = '';
  }

  digits = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
  radices = new Array('', '拾', '佰', '仟');
  bigRadices = new Array('', '万', '亿');
  decimals = new Array('角', '分');

  result = '';
  if (Number(integral) > 0) { //整数不为零
    zeroCount = 0;
    for (i = 0; i < integral.length; i++) {
      p = integral.length - i - 1;
      d = integral.substr(i, 1);
      quotient = p / 4;
      modulus = p % 4;
      if (d == '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          result += digits[0];
        }
        zeroCount = 0;
        result += digits[Number(d)] + radices[modulus];
      }
      if (modulus == 0 && zeroCount < 4) {
        result += bigRadices[quotient];
      }
    }
    result += '元';
  }

  if (decimal != '') { //有小数
    for (i = 0; i < decimal.length; i++) {
      d = decimal.substr(i, 1);
      ds = decimal.substr(-1, 1);
      if (d == 0) {
        if (ds == 0) {
          result = String(result);
        } else {
          result += digits[Number(d)];
        }
      } else {
        result += digits[Number(d)] + decimals[i];
      }
    }
  }

  if (result == '') {
    result = '零' + '元';
  }
  if (decimal == '') {
    result += '整';
  }

  return result;
}

/*
 * 姓名脱敏
 */
export function formatName(name) {
  if (name.length == 2) {
    return name.replace(/^./, '*');
  } else {
    return name.charAt(0) + name.substring(1, name.length - 1).replace(/./g, '*') + name.charAt(name.length - 1);
  }
}

/**
 * 获取传入元素的父元素----解决ios下使用swiper滑动点击bug
 */
export function closest(el, selector) {
  let matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      break;
    }
    el = el.parentElement;
  }
  return el;
}

/********************SM ADD 设备判断**********************************/

/**
 * 判断设备类型
 */
getDeviceOS = function () {
  let os = {},
    browser = {},
    ua = navigator.userAgent,
    platform = navigator.platform,
    webkit = ua.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
    android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
    osx = Boolean(ua.match(/\(Macintosh\; Intel /)),
    ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
    ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
    iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
    webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
    win = /Win\d{2}|Windows/.test(platform),
    wp = ua.match(/Windows Phone ([\d.]+)/),
    touchpad = webos && ua.match(/TouchPad/),
    kindle = ua.match(/Kindle\/([\d.]+)/),
    silk = ua.match(/Silk\/([\d._]+)/),
    blackberry = ua.match(/(BlackBerry).*Version\/([\d.]+)/),
    bb10 = ua.match(/(BB10).*Version\/([\d.]+)/),
    rimtabletos = ua.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
    playbook = ua.match(/PlayBook/),
    chrome = ua.match(/Chrome\/([\d.]+)/) || ua.match(/CriOS\/([\d.]+)/),
    firefox = ua.match(/Firefox\/([\d.]+)/),
    firefoxos = ua.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/),
    ie = ua.match(/MSIE\s([\d.]+)/) || ua.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
    webview = !chrome && ua.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
    safari = webview || ua.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);

  // Todo: clean this up with a better OS/browser seperation:
  // - discern (more) between multiple browsers on android
  // - decide if kindle fire in silk mode is android or not
  // - Firefox on Android doesn't specify the Android version
  // - possibly devide in os, device and browser hashes

  if (browser.webkit = Boolean(webkit)) browser.version = webkit[1];

  if (android) os.android = true, os.version = android[2];
  if (iphone && !ipod) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.');
  if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.');
  if (ipod) os.ios = os.ipod = true, os.version = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
  if (wp) os.wp = true, os.version = wp[1];
  if (webos) os.webos = true, os.version = webos[2];
  if (touchpad) os.touchpad = true;
  if (blackberry) os.blackberry = true, os.version = blackberry[2];
  if (bb10) os.bb10 = true, os.version = bb10[2];
  if (rimtabletos) os.rimtabletos = true, os.version = rimtabletos[2];
  if (playbook) browser.playbook = true;
  if (kindle) os.kindle = true, os.version = kindle[1];
  if (silk) browser.silk = true, browser.version = silk[1];
  if (!silk && os.android && ua.match(/Kindle Fire/)) browser.silk = true;
  if (chrome) browser.chrome = true, browser.version = chrome[1];
  if (firefox) browser.firefox = true, browser.version = firefox[1];
  if (firefoxos) os.firefoxos = true, os.version = firefoxos[1];
  if (ie) browser.ie = true, browser.version = ie[1];
  if (safari && (osx || os.ios || win)) {
    browser.safari = true;
    if (!os.ios) browser.version = safari[1];
  }
  if (webview) browser.webview = true;

  os.tablet = Boolean(ipad || playbook || (android && !ua.match(/Mobile/)) ||
    (firefox && ua.match(/Tablet/)) || (ie && !ua.match(/Phone/) && ua.match(/Touch/)));
  os.phone = Boolean(!os.tablet && !os.ipod && (android || iphone || webos || blackberry || bb10 ||
    (chrome && ua.match(/Android/)) || (chrome && ua.match(/CriOS\/([\d.]+)/)) ||
    (firefox && ua.match(/Mobile/)) || (ie && ua.match(/Touch/))));
  //
  //
  return os;
};

let os = getDeviceOS();

export function isIPhone() {
  //
  return Boolean(os.iphone) || Boolean(os.ipod);
}

export function isIPad() {
  return Boolean(os.ipad);
}

export function isIOS() {
  return Boolean(os.ios);
}
export function isAndroid() {
  return Boolean(os.android);
}
export function isTouch() {
  return isIOS() || isAndroid();
}
/********************SM ADD 设备判断**********************************/

/**
 * 获取当前日期的近一个月
 */
export function getLastMonth() {
  let date = new Date();
  let datastr = '';
  let daysInMonth = new Array([0], [31], [28], [31], [30], [31], [30], [31], [31], [30], [31], [30], [31]);
  let strYear = date.getFullYear();
  let strDay = date.getDate();
  let strMonth = date.getMonth() + 1;
  if (strYear % 4 == 0 && strYear % 100 != 0) {
    daysInMonth[2] = 29;
  }
  if (strMonth - 1 == 0) {
    strYear -= 1;
    strMonth = 12;
  } else {
    strMonth -= 1;
  }
  strDay = daysInMonth[strMonth] >= strDay ? strDay : daysInMonth[strMonth];
  if (strMonth < 10) {
    strMonth = '0' + strMonth;
  }
  if (strDay < 10) {
    strDay = '0' + strDay;
  }
  datastr = strYear + strMonth + strDay;
  return datastr;
}

/**
 * 获取当前日期的近三个月
 */
export function getThreeMonth() {
  let date = new Date();
  let datastr = '';
  let daysInMonth = new Array([0], [31], [28], [31], [30], [31], [30], [31], [31], [30], [31], [30], [31]);
  let strYear = date.getFullYear();
  let strDay = date.getDate();
  let strMonth = date.getMonth() + 1;
  if (strYear % 4 == 0 && strYear % 100 != 0) {
    daysInMonth[2] = 29;
  }
  if (strMonth - 3 == 0) {
    strYear -= 1;
    strMonth = 12;
  } else if (strMonth - 3 < 0) {
    strMonth = 12 + strMonth - 3;
    strYear -= 1;
  } else {
    strMonth -= 3;
  }
  strDay = daysInMonth[strMonth] >= strDay ? strDay : daysInMonth[strMonth];
  if (strMonth < 10) {
    strMonth = '0' + strMonth;
  }
  if (strDay < 10) {
    strDay = '0' + strDay;
  }
  datastr = strYear + strMonth + strDay;
  return datastr;
}

/**
 * 获取当前日期的近半年
 */
export function getHalfYear() {
  let date = new Date();
  let datastr = '';
  let daysInMonth = new Array([0], [31], [28], [31], [30], [31], [30], [31], [31], [30], [31], [30], [31]);
  let strYear = date.getFullYear();
  let strDay = date.getDate();
  let strMonth = date.getMonth() + 1;
  if (strYear % 4 == 0 && strYear % 100 != 0) {
    daysInMonth[2] = 29;
  }
  if (strMonth - 6 == 0) {
    strYear -= 1;
    strMonth = 12;
  } else if (strMonth - 6 < 0) {
    strMonth = 12 + strMonth - 6;
    strYear -= 1;
  } else {
    strMonth -= 6;
  }
  strDay = daysInMonth[strMonth] >= strDay ? strDay : daysInMonth[strMonth];
  if (strMonth < 10) {
    strMonth = '0' + strMonth;
  }
  if (strDay < 10) {
    strDay = '0' + strDay;
  }
  datastr = String(strYear) + strMonth + strDay;
  return datastr;
}

/**
 * 获取当前日期的近一年
 */
export function getOneYear() {
  let date = new Date();
  let datastr = '';
  let strYear = date.getFullYear() - 1;
  let strDay = date.getDate();
  let strMonth = date.getMonth() + 1;
  if (strMonth < 10) {
    strMonth = '0' + strMonth;
  }
  if (strDay < 10) {
    strDay = '0' + strDay;
  }
  datastr = String(strYear) + strMonth + strDay;
  return datastr;
}

/**
 * 解决JSBridge注入失败的方法
 */
export function ready(callback) {
  if (window.AlipayJSBridge) {
    callback && callback();
  } else {
    document.addEventListener('AlipayJSBridgeReady', callback, false);
  }
}
//时间格式化 20180606 ——>06-06
export function fmtDatejgx(date) {
  if (date.length > 4) {
    let del_date = date.substring(4, 6) + '-' + date.substring(6, 8);
    return del_date;
  } else {
    return null;
  }
}
// 时间格式化 20180606 -> 2018-06-06
export function fmtDateA(date) {
  if (date.length > 4) {
    let del_date = date.substring(0, 4) + '-' + date.substring(4, 6) + '-' + date.substring(6, 8);
    return del_date;
  } else {
    return null;
  }
}
// 身份证号码脱敏
export function fmtIdCard(num) {
  let del = '';
  if (num.length == 15) {
    del = num.substring(0, 4) + ' ******* ' + num.substring(11, 15);
  } else if (num.length == 18) {
    del = num.substring(0, 4) + ' ********** ' + num.substring(14, 18);
  } else {
    del = num;
  }
  return del;
}
// 截取字符串到传入的字符位置
export function substr_defined(str, code) {
  let ret = '';
  if (str.length > 0) {
    if (str.indexOf(code) > -1) {
      const index = str.indexOf(code);
      ret = str.substring(0, index);
    } else {
      ret = str;
    }
  }
  return ret;
}
export function fmt_money_unit(num) { // 金额超过1万元以‘万’为单位
  let retNum = parseFloat(num);
  if (retNum > 0) {
    if (retNum >= 10000) {
      retNum = parseFloat(retNum / 1000) + '万';
    }
  }
  return retNum;
}
export function special_fmt_chinese(chnStr) {
  function isNumber(val) {
    let regPos = /^\d+(\.\d+)?$/; //非负浮点数
    let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if (regPos.test(val) || regNeg.test(val)) {
      return true;
    } else {
      return false;
    }

  }
  if (isNumber(chnStr)) { // 纯数字
    return chnStr;
  } else {
    let lastStr = chnStr.charAt(chnStr.length - 1);
    if (lastStr == '元' || lastStr == '块') {
      chnStr = chnStr.substr(0, chnStr.length - 1);
    }
    // 初始化录入页面
    // let params=YT.getUrlParams();
    let chnNumChar = {
      零: 0,
      一: 1,
      二: 2,
      两: 2,
      三: 3,
      四: 4,
      五: 5,
      六: 6,
      七: 7,
      八: 8,
      九: 9
    };

    let chnNameValue = {
      十: {
        value: 10,
        secUnit: false
      },
      百: {
        value: 100,
        secUnit: false
      },
      千: {
        value: 1000,
        secUnit: false
      },
      万: {
        value: 10000,
        secUnit: true
      },
      亿: {
        value: 100000000,
        secUnit: true
      }
    };
    // function ChineseToNumber(chnStr){
    let rtn = 0;
    let section = 0;
    let number = 0;
    let secUnit = false;
    let str = chnStr.split('');
    for (let i = 0; i < str.length; i++) {
      let num = chnNumChar[str[i]];
      if (typeof num !== 'undefined') {
        number = num;
        if (i === str.length - 1) {
          section += number;
        }
      } else {
        let unit = chnNameValue[str[i]].value;
        secUnit = chnNameValue[str[i]].secUnit;
        if (secUnit) {
          section = (section + number) * unit;
          rtn += section;
          section = 0;
        } else {
          section += (number * unit);
        }
        number = 0;
      }
    }
    return rtn + section;
  }
}

// 放重复点击控制变量
export var isRun = true; //防重复点击 需要的一个全局变量

/**
 * 返回图片绝对路径
 * @returns {str}
 */
export function returnUrl() {
  //开发环境
  return 'https://mcube-prod.oss-cn-hangzhou.aliyuncs.com/ED94849190908_default/www/img/';
}

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
 * 字符转转义
 * @param v
 * @returns {boolean}
 */
export function transferStr(str) {

  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
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
  try {
    if (str.length === 0) {
      return null;
    }
    let date = str.substring(0, 4) + '-' + str.substring(4, 6) + '-' + str.substring(6, 8);
    return date;

  } catch (e) {
    return null;
  }
}

// 日期格式化  2019-01-10 -->   2019年1月10日
export function transferDateFormat(str) {
  try {
    if (str.length === 0) {
      return null;
    }
    let date = '';
    date = str.substring(0, 4) + '年' + str.substring(5, 7) + '月' + str.substring(8, 10) + '日';
    return date;
  } catch (e) {
    return null;
  }

}

/**
 * 判断是否手持设备
 * @returns {boolean}
 */
export function getDeviceOS() {
  let u = navigator.userAgent;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者UC浏览器
  let isIOS = Boolean(u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)); //IOS终端
  if (isAndroid) {
    return 'android';
  } else if (isIOS) {
    return 'ios';

  }
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
  let dataV = v;
  let dataC = c;
  let dataD = d;
  let dataT = t;
  // 防止JSON传过来的类型为number
  if (typeof (dataV) === 'number') {
    dataV = dataV.toString();
  }
  dataV = dataV.replace(/,/g, '');
  dataV *= 1;
  let p = dataV < 0 ? '-' : '';
  dataC = dataC || 2;
  //        v = v.toFixed(dataC);
  dataV = Math.round(dataV * 100000) / 100000;
  dataC = Math.abs(dataC) + 1 ? dataC : 0;
  dataD = dataD || '.';
  dataT = dataT || ',';
  let m = (/(\d+)(?:(\.\d+)|)/.exec(String(dataV)));
  let x = m[1].length > 3 ? m[1].length % 3 : 0;
  return p + (x ? m[1].substr(0, x) + dataT : '') +
    m[1].substr(x).replace(/(\d{3})(?=\d)/g, '$1' + dataT) +
    (dataC ? dataD + (Number(m[2]) || 0).toFixed(dataC).substr(2) : '');
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
 * 金额去除格式化，去除小数后的.00。
 * 如果是0.00 则返回 “”;
 */
export function unfmtAmtRemove(s) {
  let num = unfmtAmt(s);
  let reg = /^\d+\.00$/;
  num = num.replace(reg, num.substring(0, num.length - 3));
  if (num === '0') {
    num = '';
  }
  return num;
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

//身份证校验
export function isIdNo(idNo) {
  if (!idNo || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X|x)$/.test(idNo)) {
    return false;
  }
  return true;

}

/**
 * 去除字符串空格
 * @param value
 * @returns {string}
 */
export function removeSpace(value) {
  var rtnVal = String(value);
  return rtnVal.replace(/\s/g, '');
}

/**
 * 格式化手机(格式：133****3333)
 */
export function fmtPhoneNo(value) {
  let data = value;
  try {
    if (data === '') {
      return '';
    }
    data = removeSpace(data);
    let tmpStr = '';
    let start = data.length - 4;
    if (start < 4) {
      start = 4;
    }
    tmpStr = tmpStr + data.substring(0, 3) + '****' + data.substring(start, data.length);
    return tmpStr;
  } catch (e) {
    return '';
  }

}

/**
 * 格式化手机号(格式：133 3333 3333)
 */
export function fmtPhoneNum(phoneNum) {
  let iphoneNo = phoneNum;
  if (iphoneNo.length > 3) {
    iphoneNo = iphoneNo.replace(/\s*/g, '');
    if (iphoneNo.length > 7) {
      iphoneNo = iphoneNo.replace(/^(...)(....)/g, '$1 $2 ');
    } else if (iphoneNo.length > 3) {
      iphoneNo = iphoneNo.replace(/^(...)/g, '$1 ');
    }
  }
  return iphoneNo;
}

/**
 * 格式化手机号(格式：133 3333 3333)
 */
export function fmtPhone(phoneNum) {
  let iphoneNo = phoneNum;
  try {
    if (iphoneNo === '') {
      return '';
    }
    iphoneNo = removeSpace(iphoneNo);
    let tmpStr = '';
    if (iphoneNo.length > 3) {
      tmpStr = tmpStr + iphoneNo.substring(0, 3);
      tmpStr = tmpStr + ' ';
      // iphoneNo = iphoneNo.substring(4, iphoneNo.length);
    } else if (iphoneNo.length > 8) {
      tmpStr = tmpStr + ' ';
      // iphoneNo = iphoneNo.substring(4, iphoneNo.length);
    }
    // while (iphoneNo.length > 4) {
    //   tmpStr = tmpStr + iphoneNo.substring(0, 4);
    //   tmpStr = tmpStr + ' ';
    //   iphoneNo = iphoneNo.substring(4, iphoneNo.length);
    // }
    tmpStr = tmpStr + iphoneNo;
    return tmpStr;
  } catch (e) {
    return '';
  }
}

/**
 * 帐号格式化、 添加空格分隔符    hidden = true将隐藏部分号码
 * @param  value {string}账户
 * @param hidden {bool}  是否隐藏账户  true为隐藏
 */
export function fmtAcctNo(value, hidden, starLen) {
  let account = value;
  try {
    if (account === '') {
      return '';
    }
    account = removeSpace(account);
    let tmpStr = '';
    if (hidden) {
      let start = account.length - 4;
      if (start < 4) {
        start = 4;
      }
      if (starLen && starLen > 0) {
        let star = '';
        for (let i = 0; i < starLen; i++) {
          if (i > 0 && (i % 3 === 0)) {
            star += '* ';
          } else {
            star += '*';
          }
        }
        tmpStr = tmpStr + account.substring(0, 6) + ` ${star} ` + account.substring(start, account.length);
      } else {
        tmpStr = tmpStr + account.substring(0, 6) + ' **** **** ' + account.substring(start, account.length);
      }
    } else {
      while (account.length > 4) {
        tmpStr = tmpStr + account.substring(0, 4);
        tmpStr = tmpStr + ' ';
        account = account.substring(4, account.length);
      }
      tmpStr = tmpStr + account;
    }
    return tmpStr;
  } catch (e) {
    return '';
  }

}

/**
 * 是否脱敏显示账号
 * @param acctNo
 * @param isProtect
 * @returns {*}
 */
export function fmtAcctNoProtect(acctNo, isProtect) {
  //var isProtect = Fw.getAcctProtect();
  if (isProtect === '1') {
    return fmtAcctNo(acctNo, true);
  }
  return fmtAcctNo(acctNo);

}

/**
 * 卡号末4位
 */
export function fmtAcctStop4(value) {
  try {
    if (value === '') {
      return '';
    }
    let n = 4;
    let acct4 = value.substring(value.length - n, value.length);
    return acct4;
  } catch (e) {
    return '';
  }

}

export function fmtAccInput(ele) {
  ele.on('keyup', function () {
    var oW = ele.val();
    ele.val(oW.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 '));
  });
}

/**
 * 格式化证件类型
 * @param type
 * @returns {*}
 */
export function fmtIdentityType(type) {
  var text = type;
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
  default:
    text = '';
  }
  return text;
}

/**
 * 金额格式化保留3位小数点
 * @param s
 * @re
 * turns {*}
 */
export function fmtAmtThree(s) {
  try {
    return fmtMoney(s, 3, '.', ',');
  } catch (e) {
    return '0';
  }
}

/**
 * 金额格式化保留4位小数点
 * @param s
 * @returns {*}
 */
export function fmtAmt4s(s) {
  try {
    return fmtMoney(Number(s), 4, '.', ',');
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
  try {
    let a = String(b.trim());
    if (a.indexOf('.') !== -1) {
      a = a.substr(0, a.indexOf('.'));
    }
    return a.replace(/,/g, '');
  } catch (e) {
    return '';
  }

}

/**
 * 利率格式化
 * @param b
 * @returns {string}
 */
export function fmtAddPercent(b) {
  let a = b;
  try {
    if (a === '') {
      return '';
    }
    if (isNaN(a)) {
      return '';
    }
    a = Math.floor(b * 100) / 100;
    a = (a.toFixed(2));
    return a + '%';
  } catch (e) {
    return '';
  }

}

/**
 * 格式化数字为大写汉字
 * @param num
 * @returns {string}
 */
export function fmtNumber2Chinese(n) {
  let AmtUnitCN = '千百拾亿千百拾万千百拾元角分';
  let NumCN = '零壹贰叁肆伍陆柒捌玖';
  let num = n;
  num = num.replace(/,/g, '');
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(num)) {
    return '';
  }
  let unit = AmtUnitCN;
  let str = '';
  num += '00';
  let p = num.indexOf('.');
  if (p >= 0) {
    num = num.substr(0, p) + num.substr(p + 1, 2);
  }
  unit = unit.substr(unit.length - num.length);
  for (let i = 0; i < num.length; i++) {
    str += NumCN.charAt(n.charAt(i)) + unit.charAt(i);
  }
  return str.replace(/零(千|百|拾|角)/g, '零').replace(/(零)+/g, '零').replace(/零(万|亿|元)/g, '$1').replace(
    /(亿)万|壹(拾)/g, '$1$2').replace(/^元零?|零分/g, '').replace(/^分/g, '').replace(/元$/g, '元整');
}

/**
 * 判断是否为手机号
 *
 * @export
 * @param {*} $poneInput
 * @returns
 */
export function isPoneAvailable($poneInput) {
  var myreg = /^1\d{10}$/;
  if (!myreg.test($poneInput)) {
    return false;
  }
  return true;

}

/**
 * @Desc 获取手机号运营商
 * @param mobile 手机号码
 * @returns
 */
export function fmtMobService(mobile) {
  try {
    if (mobile === '') {
      return '';
    }
    if (/^(?:13[5-9]|147|148|15[0-27-9]|178|18[2-478]|198)\d{8}$|^(?:1440|170[35-6]|134[0-8])\d{7}$/.test(mobile)) {
      return '移动';
    }
    if (/^(?:13[0-2]|14[56]|15[56]|16[67]|17[56]|18[56])\d{8}|^(?:170[47-9]|171[0-9])\d{7}$/.test(mobile)) {
      return '联通';
    }
    if (/^(?:133|153|17[37]|18[019]|19[19])\d{8}$|(?:1349|1410|170[0-2]|1740)\d{7}$/.test(mobile)) {
      return '电信';
    }
    return '未知';
  } catch (e) {
    return '';
  }

}

/*
 * 姓名脱敏
 */
export function formatName(name) {
  if (name.length === 2) {
    return name.replace(/^./, '*');
  }
  return name.charAt(0) + name.substring(1, name.length - 1).replace(/./g, '*') + name.charAt(name.length - 1);

}

/**
 * 获取传入元素的父元素----解决ios下使用swiper滑动点击bug
 */
export function closest(el, selector) {
  let matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  let data = el;
  while (data) {
    if (matchesSelector.call(data, selector)) {
      break;
    }
    data = data.parentElement;
  }
  return data;
}

/**
 * 获取当前日期的近一个月
 */
export function getLastMonth() {
  var date = new Date();
  var datastr = '';
  var daysInMonth = [
    [0],
    [31],
    [28],
    [31],
    [30],
    [31],
    [30],
    [31],
    [31],
    [30],
    [31],
    [30],
    [31]
  ];
  var strYear = date.getFullYear();
  var strDay = date.getDate();
  var strMonth = date.getMonth() + 1;
  if (strYear % 4 === 0 && strYear % 100 !== 0) {
    daysInMonth[2] = 29;
  }
  if (strMonth - 1 === 0) {
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
  datastr = String(strYear) + String(strMonth) + String(strDay);
  return datastr;
}

/**
 * 获取当前日期的近三个月
 */
export function getThreeMonth() {
  var date = new Date();
  var datastr = '';
  var daysInMonth = [
    [0],
    [31],
    [28],
    [31],
    [30],
    [31],
    [30],
    [31],
    [31],
    [30],
    [31],
    [30],
    [31]
  ];
  var strYear = date.getFullYear();
  var strDay = date.getDate();
  var strMonth = date.getMonth() + 1;
  if (strYear % 4 === 0 && strYear % 100 !== 0) {
    daysInMonth[2] = 29;
  }
  if (strMonth - 3 === 0) {
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
  var date = new Date();
  var datastr = '';
  var daysInMonth = [
    [0],
    [31],
    [28],
    [31],
    [30],
    [31],
    [30],
    [31],
    [31],
    [30],
    [31],
    [30],
    [31]
  ];
  var strYear = date.getFullYear();
  var strDay = date.getDate();
  var strMonth = date.getMonth() + 1;
  if (strYear % 4 === 0 && strYear % 100 !== 0) {
    daysInMonth[2] = 29;
  }
  if (strMonth - 6 === 0) {
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
  var date = new Date();
  var datastr = '';
  var strYear = date.getFullYear() - 1;
  var strDay = date.getDate();
  var strMonth = date.getMonth() + 1;
  if (strMonth < 10) {
    strMonth = '0' + strMonth;
  }
  if (strDay < 10) {
    strDay = '0' + strDay;
  }
  datastr = String(strYear) + strMonth + strDay;
  return datastr;
}

// 身份证号码脱敏
export function fmtIdCard(num) {
  var del = '';
  if (num.length === 15) {
    del = num.substring(0, 4) + ' ******* ' + num.substring(11, 15);
  } else if (num.length === 18) {
    del = num.substring(0, 4) + ' ********** ' + num.substring(14, 18);
  } else {
    del = num;
  }
  return del;
}

// 截取字符串到传入的字符位置
export function substrDefined(str, code) {
  var ret = '';
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

// 转账模块，返回值带有小数点时原样输出，不带小数点时以万为单位
export function fmtMoneyUnit(num) {
  let data = '';
  if (num) {
    data = num;
  } else {
    data = 0;
  }
  // let data = num ? num : 0;
  let retNum = parseFloat(data);
  if (retNum >= 10000) {
    if (retNum % 10000 === 0) { // 能整除
      retNum = parseFloat(retNum / 10000) + '万';
    } else {
      retNum = fmtMoney(retNum, 0, '.', ',');
    }
  } else {
    retNum = fmtMoney(retNum, 0, '.', ',');
  }
  return retNum;
}

// 处理银行名称 显示简称
export function substrBankName(bankName) {
  let retStr = '';
  if (bankName && bankName.length > 0) {
    if (bankName.indexOf('行') > -1) {
      let index = bankName.indexOf('行');
      retStr = bankName.substring(0, index + 1);
    }
  }
  return retStr;
}

// var isRun = true;
//防重复点击
export function rejRepeatClick(func) {
  if (isRun) {
    func();
    isRun = false;
  }
  setTimeout(function () {
    isRun = true;
  }, 800);
}

// 获取当前时间第二天起近一年时间起始时间 例如当天2018-01-04 时间从2018-01-05 至 2019-01-04
// by zww
export function getNearlyAYear() {
  let obj = {
    startDate: '',
    endDate: ''
  };
  let date = new Date();
  // 当天时间
  let nowY = date.getFullYear();
  let nowM = date.getMonth() + 1;
  let nowD = date.getDate();
  // 明天时间
  let time = date.getTime() + 24 * 60 * 60 * 1000;
  let tomorrow = new Date(time);
  let tomY = tomorrow.getFullYear();
  let tomM = tomorrow.getMonth() + 1;
  let tomD = tomorrow.getDate();
  // 明年时间
  let endY = nowY + 1;
  let endM = nowM;
  let endD = nowD;

  let isLeapEndY;
  if ((endY % 4 === 0 && endY % 100 !== 0) || endY % 400 === 0) { // 闰年
    isLeapEndY = true;
  } else {
    isLeapEndY = false;
  }
  if (!isLeapEndY && endM === 2 && endD === 29) { // 平年且是二月份且是29日
    endD = 28;
  }

  obj.startDate = `${tomY}-${tomM < 10 ? ('0' + tomM) : tomM}-${tomD < 10 ? ('0' + tomD) : tomD}`;
  obj.endDate = `${endY}-${endM < 10 ? ('0' + endM) : endM}-${endD < 10 ? ('0' + endD) : endD}`;
  //alert(JSON.stringify(obj));
  return obj;
}

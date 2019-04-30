/*
* 移动端高清适配js适配方案;
* 750px为设计稿基准;
* 100rem = 1px;
* author: wangshuai
* 浏览器自小字号为10px;
*
* 更改
* */
/* eslint-disable */
let browser = {
  versions: function () {
    var u = navigator.userAgent;

    return {
      trident: u.indexOf('Trident') > -1,
      presto: u.indexOf('Presto') > -1,
      webKit: u.indexOf('AppleWebKit') > -1,
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
      mobile: (function () {
        var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
          if (u.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
          }
        }
        return !flag;
      })(),
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
      iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
      iPad: u.indexOf('iPad') > -1,
      webApp: u.indexOf('Safari') === -1,
      QQbrw: u.indexOf('MQQBrowser') > -1,
      weiXin: u.indexOf('MicroMessenger') > -1,
      ucLowEnd: u.indexOf('UCWEB7.') > -1,
      ucSpecial: u.indexOf('rv:1.2.3.4') > -1,
      ucweb: (function () {
        try {
          return parseFloat(u.match(/ucweb\d+\.\d+/gi).toString().match(/\d+\.\d+/).toString()) >= 8.2
        } catch (e) {
          if (u.indexOf('UC') > -1) {
            return true;
          } else {
            return false;
          }
        }
      })(),
      Symbian: u.indexOf('Symbian') > -1,
      ucSB: u.indexOf('Firefox/1.') > -1,
      Quark: u.indexOf('Quark') > -1,
      Hbuilder: u.indexOf('Html5Plus') > -1
    };
  }
};

function AdjustMethods(options) {
  this.fontEl = null;
  this.docEl = document.documentElement;
  this.metaEl = document.querySelector('meta[name="viewport"]');
  this.clientWidth = 0;
  this.dpr = window.devicePixelRatio || 1;
  this.options = options;
  this.scale = 1 / this.dpr;
  this.rem = 1;
  this.adapters = {};
  this.adapterName = undefined;
  this.debugger = options.debugger || false;
  this.ua = navigator.userAgent;
  this.initTimestamp;
};
AdjustMethods.prototype = {
  constructor: 'AdjustMethods',
  platformTester() {
    let i;
    let adapters = this.adapters;
    let validator;

    for (i in adapters) {
      validator = adapters[i].validator
      if (Object.prototype.toString.call(validator).indexOf('RegExp') >= 0) {
        if (validator.test(this.ua)) {
          return (this.adapterName = i);
        }
        ;
      } else if (typeof validator === 'function') {
        if (validator.call(this)) {
          return (this.adapterName = i);
        }
      } else {
        console.warn('A validator of platform should be a Regexp or a function, but ' + i + '\'s validator is neither');
      }
    }
  },
  getClientWidth() {
    if (!this.fontEl) {
      this.fontEl = document.createElement('style');
      this.fontEl.setAttribute('type', 'text/css');
      this.clientWidth = window.screen.width;
    } else {
      this.clientWidth = window.screen.width;
    }
  },
  appendAdaptor(arg1, arg2) {
    let i;

    if (Object.prototype.toString.call(arg1).indexOf('Object') >= 0) {
      for (i in arg1) {
        this.adapters[i] = arg1[i];
      }
    } else if (typeof arg1 === 'string' && Object.prototype.toString.call(arg2).indexOf('Object') >= 0) {
      this.adapters[arg1] = arg2;
    } else {
      console.error('arguments isn\'t validated!');
    }
    // 强制计算应用新规则
    if (+new Date() > this.initTimestamp) {
      this.applyView();
      this.log('rerender by adaptor appended!');
    }
  },
  applyView() {
    this.platformTester();
    // 设置data-dpr属性，留作的css hack之用
    this.docEl.setAttribute('data-dpr', this.dpr);
    this.initTimestamp = +new Date();
    this.updateView();

    // 动态写入样式
    this.docEl.firstElementChild.appendChild(this.fontEl);
  },
  updateView() {
    let string;
    let ua = navigator.userAgent;


    if (ua !== this.ua) {
      window.location.reload();
      return false;
    }

    this.getClientWidth();
    if (!this.adapterName) {
      console.warn('Not apply any appler.');
      return false;
    }

    this.rem = (this.clientWidth * this.dpr) * 100 / parseInt(this.options.standard, 10) / (750 / this.options.standard);

    if (typeof this.adapters[this.adapterName].applyer !== 'function') {
      console.warn('A applyer of any platform should be a function, but ' + this.adapterName + '\'s applyer is not a function.');
      string = '';
    } else {
      string = this.adapters[this.adapterName].applyer.call(this);
      if (typeof string !== 'string') {
        console.warn('A applyer of any platform should return a string to describe the style, but ' + this.adapterName + '\'s applyer return a' + typeof string + '.');
        string = '';
      }
    }
    this.fontEl.innerHTML = string;

    this.log('Applyed adapter is ' + this.adapterName + ';');
    this.log('The dpr is ' + this.dpr);
    this.log('The client width is ' + this.clientWidth + 'px;');
    this.log('The dynamic style is ' + string + '.');
    this.log('The scale is ' + this.scale + '.');
  },
  log(msg) {
    if (this.debugger) {
      console.log(msg);
    }
  }
};


let mobileTransfer = (function () {
  let adjust;
  return function (options) {
    if (adjust) {
      adjust.updateView();
    } else {
      adjust = new AdjustMethods(options);

      adjust.appendAdaptor({
        Quark: {
          validator: /Quark/,
          applyer() {
            this.rem = 60;
            return 'html{font-size:' + this.rem + 'px!important;}';
          }
        },
        Hbuilder: {
          validator: /Html5Plus/,
          applyer() {
            let styleStr;
            styleStr = 'html{font-size:' + this.rem + 'px!important; transform: scale(' + this.scale + ')!important; transform-origin: 0 0!important;}';
            // 设置viewport，进行缩放，达到高清效果
            this.metaEl.setAttribute('content', 'width=' + this.clientWidth + ',initial-scale=1,maximum-scale=1, minimum-scale=1,user-scalable=no');
            return styleStr;
          }
        },
        H5: {
          validator: function () {
            return browser.versions().mobile;
          },
          applyer() {
            let styleStr;
            // this.rem = 55;
            styleStr = 'html{font-size:' + this.rem + 'px!important;}';
            // 设置viewport，进行缩放，达到高清效果
            this.metaEl.setAttribute('content', 'width=' + this.dpr * this.clientWidth + ',initial-scale=' + this.scale + ',maximum-scale=' + this.scale + ', minimum-scale=' + this.scale + ',user-scalable=no');

           /* this.metaEl.setAttribute('content', 'width=' + this.clientWidth + ',initial-scale=1,maximum-scale=1, minimum-scale=1,user-scalable=no');*/
            return styleStr;
          }
        },
        PC: {
          validator: function () {
            return !browser.versions().Quark && !browser.versions().mobile;
          },
          applyer() {
            let styleStr;
            this.rem = 60;
            styleStr = 'html{font-size:' + this.rem + 'px!important;}';
            return styleStr;
          }
        },
      });

      adjust.applyView();

      // 给js调用的，某一dpr下rem和px之间的转换函数
      window.rem2px = function (v) {
        v = parseFloat(v);
        return v * adjust.rem;
      };
      window.px2rem = function (v) {
        v = parseFloat(v);
        return v / adjust.rem;
      };
      window.dpr = adjust.dpr;
      window.scale = adjust.scale;
      window.rem = adjust.rem;
      window.addEventListener('resize', function () {
        adjust.updateView();
      }, false);
    }
  };
})();

export default {
  init(opts = {
    'standard': 750,
    debugger: false
  }) {
    mobileTransfer(opts);
  },
  browser
}

/*
* 移动端高清适配js适配方案;
* 750px为设计稿基准;
* 100rem = 1px;
* author: wangshuai
* 浏览器自小字号为10px;
* */
/* eslint-disable */
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


export default AdjustMethods;

!function(e){function t(t){for(var r,s,i=t[0],c=t[1],u=t[2],f=0,p=[];f<i.length;f++)s=i[f],o[s]&&p.push(o[s][0]),o[s]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);for(a&&a(t);p.length;)p.shift()();return l.push.apply(l,u||[]),n()}function n(){for(var e,t=0;t<l.length;t++){for(var n=l[t],r=!0,i=1;i<n.length;i++){var c=n[i];0!==o[c]&&(r=!1)}r&&(l.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},o={4:0},l=[];function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var i=window.webpackJsonp=window.webpackJsonp||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var a=c;l.push(["./src/pages/collect-list/collect-list.js",0]),n()}({"./src/pages/collect-list/collect-list.js":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s(n("./src/assets/js/initial.js")),o=n("./src/assets/js/Utils.js");n("./src/components/ArticleRead.js");var l=s(n("./src/map.js"));function s(e){return e&&e.__esModule?e:{default:e}}var i=(0,r.default)();t.default=new i({el:"#base-panel__window",name:"markdown",data:function(){return{html:n("./src/pages/collect-list/collect-list.md")}},computed:{title:function(){return(0,o.getArticleInfo)(window.location.href,l.default)[0]}},mounted:function(){document.body.classList.remove("loading")}})},"./src/pages/collect-list/collect-list.md":function(e,t){e.exports="<h4 id=优博客收藏>优博客收藏</h4> <p>ljianshu：打造优质前端博客<a href=https://github.com/ljianshu/Blog>gihub博客</a>|<a href=https://juejin.im/user/56dea4aa7664bf00559f002d>掘金主页</a></p> <h4 id=待读书籍>待读书籍</h4> <h4 id=博客收藏>博客收藏</h4> <p><a href=https://juejin.im/post/5c23993de51d457b8c1f4ee1>九种跨域方式实现原理（完整版）</a></p> <p><a href=https://www.w3cplus.com/css/mindbemding-getting-your-head-round-bem-syntax.html>BEM思想之彻底弄清BEM语法</a></p> "}});
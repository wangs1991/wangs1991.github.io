!function(n){function e(e){for(var t,o,l=e[0],c=e[1],i=e[2],u=0,d=[];u<l.length;u++)o=l[u],a[o]&&d.push(a[o][0]),a[o]=0;for(t in c)Object.prototype.hasOwnProperty.call(c,t)&&(n[t]=c[t]);for(p&&p(e);d.length;)d.shift()();return r.push.apply(r,i||[]),s()}function s(){for(var n,e=0;e<r.length;e++){for(var s=r[e],t=!0,l=1;l<s.length;l++){var c=s[l];0!==a[c]&&(t=!1)}t&&(r.splice(e--,1),n=o(o.s=s[0]))}return n}var t={},a={11:0},r=[];function o(e){if(t[e])return t[e].exports;var s=t[e]={i:e,l:!1,exports:{}};return n[e].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.m=n,o.c=t,o.d=function(n,e,s){o.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:s})},o.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},o.t=function(n,e){if(1&e&&(n=o(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var s=Object.create(null);if(o.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var t in n)o.d(s,t,function(e){return n[e]}.bind(null,t));return s},o.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return o.d(e,"a",e),e},o.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},o.p="";var l=window.webpackJsonp=window.webpackJsonp||[],c=l.push.bind(l);l.push=e,l=l.slice();for(var i=0;i<l.length;i++)e(l[i]);var p=c;r.push(["./src/pages/notes/notes.js",0]),s()}({"./src/pages/notes/markdown.md":function(n,e){n.exports="<h2 id=git>git</h2> <blockquote> <p>git 项目提交过远程仓库，把某个不需要同步到平远端的文件夹添加到<code>.gitignore</code>后再次提交代码，还会读取到本地变化并提交远端记录的解决办法，运行如下指令清楚本地git缓存即可。</p> </blockquote> <pre><code class=base>    git rm -r --cache <span class=hljs-string>[目录]</span></code></pre> <h2 id=javascript>JavaScript</h2> <blockquote> <p>字符串分组处理方法</p> </blockquote> <pre><code class=javascript>function stringExecByGroup(<span class=hljs-built_in>string</span>, <span class=hljs-built_in>count</span>, callback) {\n    var floatIndex = <span class=hljs-number>0</span>;\n    var <span class=hljs-keyword>times</span> = <span class=hljs-number>0</span>;\n\n    <span class=hljs-keyword>while</span> (floatIndex &lt;= <span class=hljs-built_in>string</span>.<span class=hljs-built_in>length</span>) {\n        callback(<span class=hljs-built_in>string</span>.slice(floatIndex, floatIndex + <span class=hljs-built_in>count</span>), ++<span class=hljs-keyword>times</span>)\n        floatIndex += <span class=hljs-built_in>count</span>\n    }\n}</code></pre> "},"./src/pages/notes/notes.js":function(n,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t,a=s("./src/assets/js/initial.js"),r=(t=a)&&t.__esModule?t:{default:t},o=s("./src/assets/js/Utils.js");s("./src/components/ArticleRead.js");var l=s("./src/data.json"),c=(0,r.default)();e.default=new c({el:"#base-panel__window",name:"markdown",data:function(){return{html:s("./src/pages/notes/markdown.md")}},computed:{title:function(){return(0,o.getArticleInfo)(window.location.href,l)[0]}},mounted:function(){document.body.classList.remove("loading")}})}});
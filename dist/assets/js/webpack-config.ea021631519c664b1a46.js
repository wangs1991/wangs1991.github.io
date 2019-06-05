!function(s){function a(a){for(var e,p,t=a[0],r=a[1],o=a[2],u=0,d=[];u<t.length;u++)p=t[u],l[p]&&d.push(l[p][0]),l[p]=0;for(e in r)Object.prototype.hasOwnProperty.call(r,e)&&(s[e]=r[e]);for(i&&i(a);d.length;)d.shift()();return c.push.apply(c,o||[]),n()}function n(){for(var s,a=0;a<c.length;a++){for(var n=c[a],e=!0,t=1;t<n.length;t++){var r=n[t];0!==l[r]&&(e=!1)}e&&(c.splice(a--,1),s=p(p.s=n[0]))}return s}var e={},l={11:0},c=[];function p(a){if(e[a])return e[a].exports;var n=e[a]={i:a,l:!1,exports:{}};return s[a].call(n.exports,n,n.exports,p),n.l=!0,n.exports}p.m=s,p.c=e,p.d=function(s,a,n){p.o(s,a)||Object.defineProperty(s,a,{enumerable:!0,get:n})},p.r=function(s){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(s,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(s,"__esModule",{value:!0})},p.t=function(s,a){if(1&a&&(s=p(s)),8&a)return s;if(4&a&&"object"==typeof s&&s&&s.__esModule)return s;var n=Object.create(null);if(p.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:s}),2&a&&"string"!=typeof s)for(var e in s)p.d(n,e,function(a){return s[a]}.bind(null,e));return n},p.n=function(s){var a=s&&s.__esModule?function(){return s.default}:function(){return s};return p.d(a,"a",a),a},p.o=function(s,a){return Object.prototype.hasOwnProperty.call(s,a)},p.p="";var t=window.webpackJsonp=window.webpackJsonp||[],r=t.push.bind(t);t.push=a,t=t.slice();for(var o=0;o<t.length;o++)a(t[o]);var i=r;c.push(["./src/pages/webpack-config/webpack-config.js",0]),n()}({"./src/pages/webpack-config/markdown.md":function(s,a){s.exports="<h3 id=q-webpack如何配置文件资源通过cdn加载？>Q: webpack如何配置文件资源通过<code>cdn</code>加载？</h3> <blockquote> <p>图片体积很大，生产环境需要加载<code>cdn</code>资源替换文件路径如何进行配置？</p> </blockquote> <pre><code><span class=hljs-symbol>A:</span> 视情况添加`publicPath`配置 @中秋献礼H5页面</code></pre><ul> <li>全局替换</li> </ul> <pre><code class=javascript>    webpcak.<span class=hljs-built_in>config</span>.<span class=hljs-built_in>output</span> = {\n        filename: <span class=hljs-string>'[name].[hash].js'</span>,\n        <span class=hljs-built_in>path</span>: <span class=hljs-built_in>path</span>.resolve(__dirname, <span class=hljs-string>'dist'</span>),\n        publicPath: <span class=hljs-string>'http://***.com'</span>\n    }</code></pre> <ul> <li>局部资源替换</li> </ul> <pre><code class=javascript>    webpcak<span class=hljs-selector-class>.config</span><span class=hljs-selector-class>.module</span><span class=hljs-selector-class>.rules</span> = [{\n        test: /(bg-<span class=hljs-number>0</span>\\.gif)$/,\n        loader: <span class=hljs-string>'file-loader'</span>,\n        options: {\n            name: <span class=hljs-string>'df1f439a93e6e6433a9f2d4bfcb2bf25.gif'</span>,\n            publicPath: <span class=hljs-string>'https://mail.fengtuchina.com/'</span>\n        }\n    }]</code></pre> <h3 id=q-webpack打包文件体积过大怎么办？>Q: webpack打包文件体积过大怎么办？</h3> <blockquote> <p>一个项目引入很多第三方类，造成打包的<code>vendor</code>文件体积过大，验证影响页面加载。</p> </blockquote> <pre><code><span class=hljs-symbol>A:</span> 禁用第三方组件被`webpack`打包使用第三方`cdn`加载。@当代置业培训</code></pre><ul> <li>在<code>index.html</code>中引入第三方资源；</li> </ul> <pre><code class=html><span class=hljs-comment>&lt;!--引入vue--&gt;</span>\n    <span class=hljs-tag>&lt;<span class=hljs-name>script</span> <span class=hljs-attr>src</span>=<span class=hljs-string>\"https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js\"</span>&gt;</span><span class=\"undefined\"></span><span class=hljs-tag>&lt;/<span class=hljs-name>script</span>&gt;</span></code></pre> <ul> <li>在<code>webpack</code>配置中增加外部库声明</li> </ul> <pre><code class=javascript>webpack<span class=hljs-selector-class>.config</span><span class=hljs-selector-class>.externals</span> = {\n    <span class=hljs-string>'vue'</span>: <span class=hljs-string>'Vue'</span>,\n    <span class=hljs-string>\"node_module 包名\"</span>: <span class=hljs-string>'cdn包在window全局对象上注册的名字'</span>\n}</code></pre> <h3 id=q-公用scss声明的方法和变量想要在vue组件中使用，每个都需要引入，有没有统一注入的方法vue-cli生成的webpack项目？>Q: 公用scss声明的方法和变量想要在vue组件中使用，每个都需要引入，有没有统一注入的方法[vue cli生成的webpack项目]？</h3> <blockquote> <p>scss公用方法和变量在文件中统一声明，在组件中定义样式时总是不能直接使用已经声明的变量，需要显示的导入相关的文件，很繁琐。有没有自动注如的方法代替手工引入。</p> </blockquote> <pre><code><span class=hljs-symbol>A:</span> `build/utils.js`中修改配置，增加 `sass-resources-loader`，动态写入公用变量。@当代置业培训</code></pre><pre><code class=javascript>exports.cssLoaders = <span class=hljs-function><span class=hljs-keyword>function</span> <span class=hljs-params>(options)</span> {</span>\n    // ...\n    <span class=hljs-keyword>return</span> {\n        <span class=hljs-keyword>cs</span><span class=hljs-variable>s:</span> generateLoaders(),\n        postcs<span class=hljs-variable>s:</span> generateLoaders(),\n        les<span class=hljs-variable>s:</span> generateLoaders(<span class=hljs-string>'less'</span>),\n        sas<span class=hljs-variable>s:</span> generateLoaders(<span class=hljs-string>'sass'</span>, { indentedSyntax: true }),\n        <span class=hljs-keyword>scs</span><span class=hljs-variable>s:</span> generateLoaders(<span class=hljs-string>'sass'</span>).concat(\n          {\n            loader: <span class=hljs-string>'sass-resources-loader'</span>,\n            option<span class=hljs-variable>s:</span> {\n              resource<span class=hljs-variable>s:</span> [path.<span class=hljs-built_in>resolve</span>(__dirname, <span class=hljs-string>'../src/assets/styles/mixins.scss'</span>)]  //注意自己的文件路径\n            }\n          }\n        ),\n        stylu<span class=hljs-variable>s:</span> generateLoaders(<span class=hljs-string>'stylus'</span>),\n        sty<span class=hljs-variable>l:</span> generateLoaders(<span class=hljs-string>'stylus'</span>)\n      }\n}</code></pre> "},"./src/pages/webpack-config/webpack-config.js":function(s,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e,l=n("./src/assets/js/initial.js"),c=(e=l)&&e.__esModule?e:{default:e},p=n("./src/assets/js/Utils.js");n("./src/components/ArticleRead.js");var t=n("./src/data.json"),r=(0,c.default)();a.default=new r({el:"#base-panel__window",name:"markdown",data:function(){return{html:n("./src/pages/webpack-config/markdown.md")}},computed:{title:function(){return(0,p.getArticleInfo)(window.location.href,t)[0]}},mounted:function(){document.body.classList.remove("loading")}})}});
!function(s){function a(a){for(var p,t,c=a[0],r=a[1],o=a[2],h=0,d=[];h<c.length;h++)t=c[h],Object.prototype.hasOwnProperty.call(l,t)&&l[t]&&d.push(l[t][0]),l[t]=0;for(p in r)Object.prototype.hasOwnProperty.call(r,p)&&(s[p]=r[p]);for(i&&i(a);d.length;)d.shift()();return e.push.apply(e,o||[]),n()}function n(){for(var s,a=0;a<e.length;a++){for(var n=e[a],p=!0,c=1;c<n.length;c++){var r=n[c];0!==l[r]&&(p=!1)}p&&(e.splice(a--,1),s=t(t.s=n[0]))}return s}var p={},l={6:0},e=[];function t(a){if(p[a])return p[a].exports;var n=p[a]={i:a,l:!1,exports:{}};return s[a].call(n.exports,n,n.exports,t),n.l=!0,n.exports}t.m=s,t.c=p,t.d=function(s,a,n){t.o(s,a)||Object.defineProperty(s,a,{enumerable:!0,get:n})},t.r=function(s){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(s,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(s,"__esModule",{value:!0})},t.t=function(s,a){if(1&a&&(s=t(s)),8&a)return s;if(4&a&&"object"==typeof s&&s&&s.__esModule)return s;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:s}),2&a&&"string"!=typeof s)for(var p in s)t.d(n,p,function(a){return s[a]}.bind(null,p));return n},t.n=function(s){var a=s&&s.__esModule?function(){return s.default}:function(){return s};return t.d(a,"a",a),a},t.o=function(s,a){return Object.prototype.hasOwnProperty.call(s,a)},t.p="";var c=window.webpackJsonp=window.webpackJsonp||[],r=c.push.bind(c);c.push=a,c=c.slice();for(var o=0;o<c.length;o++)a(c[o]);var i=r;e.push(["./src/pages/h5-capture/h5-capture.js",0]),n()}({"./src/pages/h5-capture/h5-capture.js":function(s,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var p,l=n("./src/assets/js/initial.js"),e=(p=l)&&p.__esModule?p:{default:p},t=n("./src/assets/js/Utils.js");n("./src/components/ArticleRead.js");var c=n("./src/data.json"),r=(0,e.default)();a.default=new r({el:"#base-panel__window",name:"markdown",data:function(){return{html:n("./src/pages/h5-capture/markdown.md")}},computed:{title:function(){return(0,t.getArticleInfo)(window.location.href,c)[0]}},mounted:function(){document.body.classList.remove("loading")}})},"./src/pages/h5-capture/markdown.md":function(s,a){s.exports="<h3 id=个人脸认证h5项目获得的的知识点>个人脸认证H5项目获得的的知识点</h3> <h4 id=摄像头调取>摄像头调取</h4> <blockquote> <p>移动端调取摄像头，一个前端望而生畏的功能，存在太兼容问题。基本功能是可以实现的，但终究会存在一些变现不一致的地方。</p> </blockquote> <p>移动端调取摄像头获取图片和视频只能通过表单元素实现，即<code>input :file</code>，为<code>input:file</code>元素添加<code>capture</code>属性可以实现部分手机在点击输入框时直接调起摄像头进行拍照，而不是选择图库或者拍照。 首先看<code>capture</code>可选属性值【需要配置<code>accept</code>的类型使用】：</p> <table> <thead> <tr> <th align=left>属性值</th> <th align=center>作用</th> <th align=left>表现</th> <th align=left>备注</th> </tr> </thead> <tbody><tr> <td align=left>user</td> <td align=center>前置摄像头</td> <td align=left>直接调起摄像头，通过指定accept的值选择是进行拍照还是录像，少数会提供可选操作不是直接调起摄像头</td> <td align=left>一般不会打开前置摄像头，需要用户手动切换</td> </tr> <tr> <td align=left>camera</td> <td align=center>摄像头拍照</td> <td align=left>调起摄像头拍照或选择拍照/图库</td> <td align=left>-</td> </tr> <tr> <td align=left>camcorder</td> <td align=center>摄像头录像</td> <td align=left>调起摄像头拍照或选择录像/文件</td> <td align=left>-</td> </tr> <tr> <td align=left>microphone</td> <td align=center>录音机</td> <td align=left>调起摄像头拍照或仅选择音频文件</td> <td align=left>-</td> </tr> </tbody></table> <p><a href=http://playboygit.github.io/demo/input_file_capture.html>第三方效果测试地址</a></p> <h4 id=文件读取>文件读取</h4> <blockquote> <p>通过内置的<code>FileReader</code>对象可以读取到文件内容。</p> </blockquote> <ul> <li><code>FileReader</code>提供回调函数和读取文件到指定格式的方法。</li> <li><code>onload</code>是文件读取完毕回调事件注册方法；</li> <li><code>abort</code>终断文件读取；</li> <li><code>onloadStart</code>配合<code>onprogress</code>可以制作文件读取进度条；</li> <li><code>readAsArrayBuffer</code> 读取成ArrayBuffer格式数据</li> <li><code>readAsText</code> 读取成文本格式</li> <li><code>readAsDataURL</code> 读取成base64位数据</li> </ul> <p>在实际应用中，手机拍照体积都会比较大，动不动就达到6-8M。如果直接上传图片的话，一个是上传时间等待太久用户体验不好，再有就是用户流量的浪费。所以做文件压缩是非常有必要的。</p> <p>项目后台期待接收的是form提交的文件，是要包含文件名称后缀等等各种信息的。由于<code>form + iframe</code> 模拟 <code>ajax</code>提交台麻烦也有一些不太可控的问题，就尝试用<code>axios</code> 直接上传文件。</p> <h4 id=文件压缩>文件压缩</h4> <p><a href=https://github.com/nodeca/pica>pica</a>是一个不错的文件压缩工具，主要是之前项目用过上手较快，但是经测试发现在微信会直接崩溃退出。后来找到一个不错的移动端图片压缩插件<a href=https://github.com/xfhxbb/LUploader>LUploader</a>，但它不支持模块化加载，并且实际只是使用它的压缩方法，它本身是做了整体的文件上传及压缩功能的，所以就单独提取出<code>compress</code>方法了：</p> <pre><code class=javascript><span class=hljs-comment>// 图片压缩</span>\nexport const compress = <span class=hljs-keyword>function</span> (img, quality) {\n  var canvas = document.create<span class=hljs-constructor>Element(<span class=hljs-string>\"canvas\"</span>)</span>;\n  var ctx = canvas.get<span class=hljs-constructor>Context('2d')</span>;\n  var moreCanvas = document.create<span class=hljs-constructor>Element(<span class=hljs-string>\"canvas\"</span>)</span>;\n  var morectx = moreCanvas.get<span class=hljs-constructor>Context(<span class=hljs-string>\"2d\"</span>)</span>;\n  var maxsize = <span class=hljs-number>100</span><span class=hljs-operator> * </span><span class=hljs-number>1024</span>;\n  var width = img.width;\n  var height = img.height;\n  var ratio;\n  <span class=hljs-keyword>if</span> ((ratio = width<span class=hljs-operator> * </span>height<span class=hljs-operator> / </span><span class=hljs-number>4000000</span>) &gt; <span class=hljs-number>1</span>) {\n    ratio = <span class=hljs-module-access><span class=hljs-module><span class=hljs-identifier>Math</span>.</span></span>sqrt(ratio);\n    width /= ratio;\n    height /= ratio;\n  } <span class=hljs-keyword>else</span> {\n    ratio = <span class=hljs-number>1</span>;\n  }\n  canvas.width = width;\n  canvas.height = height;\n  ctx.fillStyle = <span class=hljs-string>\"#fff\"</span>;\n  ctx.fill<span class=hljs-constructor>Rect(0, 0, <span class=hljs-params>canvas</span>.<span class=hljs-params>width</span>, <span class=hljs-params>canvas</span>.<span class=hljs-params>height</span>)</span>;\n  var count;\n  <span class=hljs-keyword>if</span> ((count = width<span class=hljs-operator> * </span>height<span class=hljs-operator> / </span><span class=hljs-number>1000000</span>) &gt; <span class=hljs-number>1</span>) {\n    count = ~~(<span class=hljs-module-access><span class=hljs-module><span class=hljs-identifier>Math</span>.</span></span>sqrt(count) + <span class=hljs-number>1</span>);\n    var nw = ~~(width<span class=hljs-operator> / </span>count);\n    var nh = ~~(height<span class=hljs-operator> / </span>count);\n    moreCanvas.width = nw;\n    moreCanvas.height = nh;\n    for (var i = <span class=hljs-number>0</span>; i &lt; count; i++) {\n      for (var j = <span class=hljs-number>0</span>; j &lt; count; j++) {\n        morectx.draw<span class=hljs-constructor>Image(<span class=hljs-params>img</span>, <span class=hljs-params>i</span> <span class=hljs-operator>*</span> <span class=hljs-params>nw</span> <span class=hljs-operator>*</span> <span class=hljs-params>ratio</span>, <span class=hljs-params>j</span> <span class=hljs-operator>*</span> <span class=hljs-params>nh</span> <span class=hljs-operator>*</span> <span class=hljs-params>ratio</span>, <span class=hljs-params>nw</span> <span class=hljs-operator>*</span> <span class=hljs-params>ratio</span>, <span class=hljs-params>nh</span> <span class=hljs-operator>*</span> <span class=hljs-params>ratio</span>, 0, 0, <span class=hljs-params>nw</span>, <span class=hljs-params>nh</span>)</span>;\n        ctx.draw<span class=hljs-constructor>Image(<span class=hljs-params>moreCanvas</span>, <span class=hljs-params>i</span> <span class=hljs-operator>*</span> <span class=hljs-params>nw</span>, <span class=hljs-params>j</span> <span class=hljs-operator>*</span> <span class=hljs-params>nh</span>, <span class=hljs-params>nw</span>, <span class=hljs-params>nh</span>)</span>;\n      }\n    }\n  } <span class=hljs-keyword>else</span> {\n    ctx.draw<span class=hljs-constructor>Image(<span class=hljs-params>img</span>, 0, 0, <span class=hljs-params>width</span>, <span class=hljs-params>height</span>)</span>;\n  }\n  var ndata = canvas.<span class=hljs-keyword>to</span><span class=hljs-constructor>DataURL('<span class=hljs-params>image</span><span class=hljs-operator>/</span><span class=hljs-params>jpeg</span>', <span class=hljs-params>quality</span> <span class=hljs-operator>||</span> .5)</span>;\n  moreCanvas.width = moreCanvas.height = canvas.width = canvas.height = <span class=hljs-number>0</span>;\n  return ndata;\n};</code></pre> <p>基本原理就是用canvas绘制在读取达到图片压缩。这样得到的是一个base64格式的图片。</p> <h4 id=axious上传文件>axious上传文件</h4> <blockquote> <p>axios不仅仅支持restful接口请求，同样能轻松的完成类表单提交的文件上传功能。</p> </blockquote> <pre><code class=javascript>    <span class=hljs-selector-tag>axios</span>({\n        <span class=hljs-attribute>url</span>: <span class=hljs-string>'url address'</span>,\n        <span class=hljs-attribute>method</span>: <span class=hljs-string>'POST'</span>,\n        <span class=hljs-attribute>data</span>: formData\n    })<span class=hljs-selector-class>.then</span>(res =&gt; {\n        <span class=hljs-selector-tag>alert</span>(res);\n    });</code></pre> <p>这种实际编码操作和ajax请求是一致的。现在面临一个问题就是formaData的组装。</p> <h4 id=formdata数据格式>formData数据格式</h4> <blockquote> <p> <a href=https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects>FormData对象</a>用以将数据编译成键值对，以便用XMLHttpRequest来发送数据。其主要用于发送表单数据，但亦可用于发送带键数据(keyed data)，而独立于表单使用。如果表单enctype属性设为multipart/form-data ，则会使用表单的submit()方法来发送数据，从而，发送数据具有同样形式。</p> </blockquote> <p>利用FormData对象,我们可以通过JavaScript用一些键值对来模拟一系列表单控件,我们还可以使用XMLHttpRequest的send()方法来异步的提交这个”表单”.比起普通的ajax,使用FormData的最大优点就是我们可以异步上传一个二进制文件.</p> <p>通过formData对象可以传递数据，要拿到表单数据通过<code>input</code>的<code>change</code>事件的<code>e.target.files</code>来获取到一个文件数组，直接<code>append</code>到<code>formData</code>对象中可以完成提交，但是这样的话就没办法进行图片的压缩了。那传输文件体积过大就无解了么？</p> <p>尝试用<code>fileReader.readAsArrayBuffer</code>来获取到二进制<code>ArrayBuffer</code>,是不是把他直接给后台就可以了呢？我尝试了一下，发现不可以，后台报错说找不到文件后缀，无法识别文件。方了~</p> <p>既然<code>input.onchange</code>的<code>e.target.files</code>直接给后台可以，那就观察一下他们有啥不一样的吧。</p> <p>通过<code>console</code>打印，发现输出的是<code>File</code>类型的对象，既然是js的内置对象，肯定是可以手工创建。</p> <h4 id=javascript的file对象>JavaScript的File对象</h4> <blockquote> <p><a href=https://developer.mozilla.org/zh-CN/docs/Web/API/File/File>File对象官方文档及API</a></p> </blockquote> <p>首先File对象的构造函数可以有两个或三个参数。</p> <p>两个参数的例子是这样的：</p> <pre><code class=javascript>    <span class=hljs-keyword>var</span> objFile = <span class=hljs-keyword>new</span> <span class=hljs-type>File</span>([<span class=hljs-string>\"First Line Text\"</span>, <span class=hljs-string>\"Second Line Text\"</span>], FileName); </code></pre> <p>第一个参数是一个字符串数组。数组中的每一个元素对应着文件中一行的内容。</p> <p>第二个参数就是文件名字符串。</p> <p>如果是用三个参数的形式，代码就是这样的：</p> <pre><code class=javascript><span class=hljs-keyword>var</span> objFile = <span class=hljs-keyword>new</span> <span class=hljs-type>File</span>([<span class=hljs-string>\"First Line Text\"</span>, <span class=hljs-string>\"Second Line Text\"</span>], <span class=hljs-type>FileName</span>, { \n    <span class=hljs-class><span class=hljs-keyword>type</span></span>: <span class=hljs-string>\"text/plain\"</span>, \n    lastModified: date\n}); </code></pre> <p>第三个参数可以设定一些文件的属性，比如文件的MIME，最后更新时间等。</p> <p>得到这些信息，我们要准备的是一个图片的<code>ArrayBUffer</code>，前文已经得到了一个压缩过的<code>base64</code>格式的图片数据，只需要拿到<code>ArrayBUffer</code>我们就可以愉快的创建一个<code>File</code>对象传给后台了,需要制定<code>type=&#39;MIME&#39;</code>（跟后台判断有关）。</p> <p>查阅得到通过<code>blob</code>对象，可以创建<code>ArrayBUffer</code>，就得到下面的方法。</p> <h4 id=blob文件类型转化>Blob文件类型转化</h4> <p>把<code>base64</code>位图片转成二进制<code>ArrayBuffer</code>格式，需要借助浏览器中的<code>blob</code>对象，实现代码如下：</p> <pre><code class=javascript><span class=hljs-keyword>export</span> <span class=hljs-keyword>const</span> convertBase64ToBlob = <span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params>base64</span>) </span>{\n  <span class=hljs-keyword>var</span> base64Arr = base64.split(<span class=hljs-string>','</span>);\n  <span class=hljs-keyword>var</span> imgtype = <span class=hljs-string>''</span>;\n  <span class=hljs-keyword>var</span> base64String = <span class=hljs-string>''</span>;\n  <span class=hljs-keyword>if</span> (base64Arr.length &gt; <span class=hljs-number>1</span>) {\n    <span class=hljs-comment>//如果是图片base64，去掉头信息</span>\n    base64String = base64Arr[<span class=hljs-number>1</span>];\n    imgtype = base64Arr[<span class=hljs-number>0</span>].substring(base64Arr[<span class=hljs-number>0</span>].indexOf(<span class=hljs-string>':'</span>) + <span class=hljs-number>1</span>, base64Arr[<span class=hljs-number>0</span>].indexOf(<span class=hljs-string>';'</span>));\n  }\n  <span class=hljs-comment>// 将base64解码</span>\n  <span class=hljs-keyword>var</span> bytes = atob(base64String);\n  <span class=hljs-comment>//var bytes = base64;</span>\n  <span class=hljs-keyword>var</span> bytesCode = <span class=hljs-keyword>new</span> <span class=hljs-built_in>ArrayBuffer</span>(bytes.length);\n  <span class=hljs-comment>// 转换为类型化数组</span>\n  <span class=hljs-keyword>var</span> byteArray = <span class=hljs-keyword>new</span> <span class=hljs-built_in>Uint8Array</span>(bytesCode);\n\n  <span class=hljs-comment>// 将base64转换为ascii码</span>\n  <span class=hljs-keyword>for</span> (<span class=hljs-keyword>var</span> i = <span class=hljs-number>0</span>; i &lt; bytes.length; i++) {\n    byteArray[i] = bytes.charCodeAt(i);\n  }\n\n  <span class=hljs-comment>// 生成Blob对象（文件对象）</span>\n  <span class=hljs-keyword>return</span> <span class=hljs-keyword>new</span> Blob([bytesCode], {<span class=hljs-attr>type</span>: imgtype});\n};</code></pre> <h4 id=总结>总结</h4> <p>基本思路：用<code>input</code>调取摄像头捕捉用户图像 -&gt; 通过<code>FileReader</code>读取到<code>base64</code>位数据 -&gt; 再把压缩的<code>base64</code>字符串转成<code>ArrayBuffer</code>格式 -&gt; 经浏览器内置<code>File</code>对象创建一个文件 -&gt; 添加到<code>FormData</code>中完成表单数据的构建 -&gt; 再通过<code>axios</code>发送给后台服务来完成文件上传。</p> <p>封装vue组件如下：</p> <pre><code class=javascript>\n<span class=xml><span class=hljs-tag>&lt;<span class=hljs-name>template</span>&gt;</span>\n  <span class=hljs-tag>&lt;<span class=hljs-name>span</span> <span class=hljs-attr>class</span>=<span class=hljs-string>\"capture-ctner\"</span>\n        <span class=hljs-attr>:data-name</span>=<span class=hljs-string>\"name\"</span>\n        <span class=hljs-attr>:class</span>=<span class=hljs-string>\"</span></span></span><span class=xquery>{<span class=hljs-string>'no-name'</span>: !options<span class=hljs-built_in>.name</span>}</span><span class=xml><span class=hljs-tag><span class=hljs-string>\"</span>&gt;</span>\n    <span class=hljs-tag>&lt;<span class=hljs-name>input</span> <span class=hljs-attr>type</span>=<span class=hljs-string>\"file\"</span>\n           <span class=hljs-attr>class</span>=<span class=hljs-string>\"capture-input\"</span>\n           <span class=hljs-attr>:accept</span>=<span class=hljs-string>\"options.accept\"</span>\n           @<span class=hljs-attr>change</span>=<span class=hljs-string>\"readStream\"</span>\n           <span class=hljs-attr>:capture</span>=<span class=hljs-string>\"options.capture\"</span>/&gt;</span>\n    <span class=hljs-tag>&lt;<span class=hljs-name>button</span> <span class=hljs-attr>class</span>=<span class=hljs-string>\"capture-button\"</span>\n            <span class=hljs-attr>:class</span>=<span class=hljs-string>\"options.className\"</span>&gt;</span></span><span class=xquery>{{options.label}</span><span class=xml>}<span class=hljs-tag>&lt;/<span class=hljs-name>button</span>&gt;</span></span>\n  &lt;/span&gt;\n&lt;/template&gt;\n\n<span class=xml><span class=hljs-tag>&lt;<span class=hljs-name>script</span> <span class=hljs-attr>type</span>=<span class=hljs-string>\"text/javascript\"</span>&gt;</span><span class=actionscript>\n  <span class=hljs-meta><span class=hljs-meta-keyword>import</span> </span></span></span><span class=xquery>{compress, convertBase64ToBlob}</span><span class=xml><span class=javascript> <span class=hljs-keyword>from</span> <span class=hljs-string>'@/assets/js/Utils'</span>;\n  <span class=hljs-comment>// eslint-disable-next-line</span>\n  <span class=hljs-keyword>const</span> pica = <span class=hljs-built_in>require</span>(<span class=hljs-string>'pica'</span>)();\n\n  <span class=hljs-keyword>export</span> <span class=hljs-keyword>default</span> </span></span><span class=xquery>{\n   <span class=hljs-built_in> name</span>: <span class=hljs-string>'capture'</span>,\n    data() {\n      <span class=hljs-keyword>return</span> {\n       <span class=hljs-built_in> name</span>: <span class=hljs-string>''</span>\n      }</span><span class=xml>;\n    },\n    props: </span><span class=xquery>{\n      options: {\n        type: Object,\n        require:<span class=hljs-built_in> true</span>,\n        default: {\n          accept: <span class=hljs-string>'image/*'</span>,\n          capture: <span class=hljs-string>'user'</span>,\n          optimize:<span class=hljs-built_in> false</span>,\n          label: <span class=hljs-string>'上传文件'</span>,\n         <span class=hljs-built_in> name</span>:<span class=hljs-built_in> true</span>\n        }</span><span class=xml>\n      }\n    },\n    computed: </span><span class=xquery>{\n      type() {\n        <span class=hljs-keyword>let</span> type;\n\n        <span class=hljs-keyword>try</span> {\n          type = this.options.accept.split(<span class=hljs-string>'/'</span>)[<span class=hljs-number>0</span>];\n        }</span><span class=xml><span class=actionscript> <span class=hljs-keyword>catch</span> (e) </span></span><span class=xquery>{\n          <span class=hljs-keyword>return</span> <span class=hljs-string>''</span>;\n        }</span><span class=xml><span class=actionscript>\n        <span class=hljs-keyword>return</span> type;\n      }\n    },\n    methods: </span></span><span class=xquery>{\n      auType<span class=hljs-built_in>(name</span>) {\n        const RegMap = {\n          image: /\\.jpg$|\\.jpeg$|\\.png$/,\n          video: /\\.mp4$|/\n        }</span><span class=xml><span class=javascript>;\n        <span class=hljs-keyword>let</span> type = <span class=hljs-keyword>this</span>.type;\n\n        <span class=hljs-keyword>return</span> RegMap[type].test(name);\n      },\n      <span class=hljs-comment>/**\n       * 通过fileReader读取文件流\n       * <span class=hljs-doctag>@param <span class=hljs-variable>e</span></span>\n       */</span>\n      readStream(e) </span></span><span class=xquery>{\n        <span class=hljs-keyword>let</span> ipt = e.target;\n        <span class=hljs-keyword>let</span> reader;\n        <span class=hljs-keyword>let</span> self = this;\n\n        this.<span class=hljs-variable>$emit</span>(<span class=hljs-string>'change'</span>, e);\n        console.log(e);\n        <span class=hljs-keyword>if</span> (ipt.files &amp;&amp; ipt.files.length &gt; <span class=hljs-number>0</span>) {\n          this.<span class=hljs-variable>$emit</span>(<span class=hljs-string>'readStart'</span>, ipt.files[<span class=hljs-number>0</span>]<span class=hljs-built_in>.name</span>);\n          /*<span class=hljs-keyword>if</span> (!this.auType(ipt.files[<span class=hljs-number>0</span>]<span class=hljs-built_in>.name</span>)) {\n            this.<span class=hljs-variable>$emit</span>(<span class=hljs-string>'typeError'</span>, ipt.files[<span class=hljs-number>0</span>]<span class=hljs-built_in>.name</span>);\n            <span class=hljs-keyword>return</span><span class=hljs-built_in> false</span>;\n          }</span><span class=xml><span class=actionscript>*/\n          <span class=hljs-keyword>this</span>.name = ipt.files[<span class=hljs-number>0</span>].name;\n          reader = <span class=hljs-keyword>new</span> FileReader();\n          reader.onload = (e) =&gt; </span></span><span class=xquery>{\n            self.readComplete(e.target.result);\n          }</span><span class=xml><span class=actionscript>;\n          (<span class=hljs-keyword>this</span>.type === <span class=hljs-string>'image'</span>) &amp;&amp; reader.readAsDataURL(ipt.files[<span class=hljs-number>0</span>]);\n          (<span class=hljs-keyword>this</span>.type === <span class=hljs-string>'video'</span>) &amp;&amp; reader.readAsBinaryString(ipt.files[<span class=hljs-number>0</span>]);\n        }\n      },\n      <span class=hljs-comment>/**\n       * 图片是否压缩优化的判断\n       */</span>\n      readComplete(data) </span></span><span class=xquery>{\n        <span class=hljs-keyword>let</span> img;\n        <span class=hljs-keyword>let</span> self = this;\n\n        <span class=hljs-keyword>function</span> callback() {\n          var rs;\n\n          rs = compress(img, <span class=hljs-number>0</span>.<span class=hljs-number>05</span>);\n          rs = convertBase64ToBlob(rs);\n          rs = new File([rs], self<span class=hljs-built_in>.name</span>, {type: <span class=hljs-string>'mime'</span>}</span><span class=xml><span class=actionscript>);\n          self.$emit(<span class=hljs-string>'compressed'</span>, rs);\n        };\n\n        <span class=hljs-keyword>this</span>.$emit(<span class=hljs-string>'readed'</span>, data);\n\n        <span class=hljs-keyword>if</span> (!<span class=hljs-keyword>this</span>.options.optimize) </span></span><span class=xquery>{\n          <span class=hljs-keyword>return</span>;\n        }</span><span class=xml><span class=actionscript>;\n\n        img = <span class=hljs-keyword>new</span> Image();\n        img.src = data;\n        <span class=hljs-keyword>if</span> (img.complete) </span></span><span class=xquery>{\n          callback();\n        }</span><span class=xml><span class=actionscript> <span class=hljs-keyword>else</span> </span></span><span class=xquery>{\n          img.onload = callback;\n        }</span><span class=xml>;\n      }\n    }\n  };\n<span class=hljs-tag>&lt;/<span class=hljs-name>script</span>&gt;</span></span>\n\n<span class=xml><span class=hljs-tag>&lt;<span class=hljs-name>style</span> <span class=hljs-attr>lang</span>=<span class=hljs-string>\"scss\"</span>&gt;</span><span class=css>\n  <span class=hljs-selector-class>.capture-ctner</span> </span></span><span class=xquery>{\n   <span class=hljs-built_in> position</span>: relative;\n    z-index: <span class=hljs-number>1</span>;\n    display: inline-block;\n    height: <span class=hljs-number>5</span>em;\n  }</span><span class=xml><span class=css>\n\n  <span class=hljs-selector-class>.capture-ctner</span> <span class=hljs-selector-class>.capture-button</span> </span></span><span class=xquery>{\n   <span class=hljs-built_in> position</span>: absolute;\n    left: <span class=hljs-number>0</span>;\n    top: <span class=hljs-number>0</span>;\n    z-index: <span class=hljs-number>2</span>;\n    &amp;.disabled {\n      z-index: <span class=hljs-number>100</span>;\n    }</span><span class=xml><span class=css>\n  }\n\n  <span class=hljs-selector-class>.capture-ctner</span><span class=hljs-selector-pseudo>:after</span> </span></span><span class=xquery>{\n    display: inline-block;\n    content: attr(data-name);\n    font-size: <span class=hljs-number>12</span>px;\n    color: #<span class=hljs-number>989898</span>;\n    font-family: <span class=hljs-string>'微软雅黑'</span>;\n    margin-top: .<span class=hljs-number>1</span>em;\n  }</span><span class=xml><span class=css>\n\n  <span class=hljs-selector-class>.capture-ctner</span><span class=hljs-selector-class>.no-name</span><span class=hljs-selector-pseudo>:after</span> </span></span><span class=xquery>{\n    display: none;\n  }</span><span class=xml><span class=css>\n\n  <span class=hljs-selector-class>.capture-ctner</span> <span class=hljs-selector-class>.capture-input</span> </span></span><span class=xquery>{\n    border: <span class=hljs-number>1</span>px solid #f0<span class=hljs-number>0</span>;\n   <span class=hljs-built_in> position</span>: relative;\n    z-index: <span class=hljs-number>3</span>;\n    display: inline-block;\n    width: <span class=hljs-number>90</span>%;\n    left: <span class=hljs-number>5</span>%;\n    top: <span class=hljs-number>3</span>px;\n    height: <span class=hljs-number>2.5</span>em;\n    opacity: <span class=hljs-number>0</span>;\n   <span class=hljs-built_in> filter</span>: alpha(opacity=<span class=hljs-number>0</span>);\n    cursor: pointer;\n  }</span><span class=xml>\n<span class=hljs-tag>&lt;/<span class=hljs-name>style</span>&gt;</span></span>\n</code></pre> <p>使用方法：</p> <pre><code class=html>&lt;capture :<span class=hljs-attribute>options</span>=<span class=hljs-string>\"capOpts\"</span>\n               @<span class=hljs-attribute>change</span>=<span class=hljs-string>\"loading\"</span>\n               @<span class=hljs-attribute>compressed</span>=<span class=hljs-string>\"getFile\"</span>\n               @<span class=hljs-attribute>readed</span>=<span class=hljs-string>\"readFile\"</span>&gt;&lt;/capture&gt;</code></pre> <pre><code class=javascript><span class=hljs-attribute>capOpts</span>: {\n          <span class=hljs-attribute>optimize</span>: true,       <span class=hljs-comment>//是否启用压缩</span>\n          <span class=hljs-attribute>label</span>: <span class=hljs-string>'拍摄'</span>,        <span class=hljs-comment>// 按钮文字</span>\n          <span class=hljs-attribute>name</span>: false,          <span class=hljs-comment>// 是否显示文件名</span>\n          <span class=hljs-attribute>accept</span>: <span class=hljs-string>'image/*'</span>,    <span class=hljs-comment>// 可获取文件格式</span>\n          <span class=hljs-attribute>capture</span>: <span class=hljs-string>'user'</span>,      <span class=hljs-comment>// 捕获类型</span>\n          <span class=hljs-attribute>className</span>: <span class=hljs-string>'public-element-button block'</span>\n                                <span class=hljs-comment>// 按钮类名样式</span>\n        }</code></pre> <ul> <li>change 是图像刚被选择是触发，接收到change事件对象；</li> <li>compressd 是图像压缩完的触发，接收的是File对象；</li> <li>readed 是图像被FileReader读取完毕时触发，接收到的是base64位数据；</li> <li>capOpts 配置参数</li> </ul> "}});
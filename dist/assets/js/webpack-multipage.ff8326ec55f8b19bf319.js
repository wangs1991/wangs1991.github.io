!function(e){function t(t){for(var a,i,c=t[0],l=t[1],d=t[2],s=0,u=[];s<c.length;s++)i=c[s],o[i]&&u.push(o[i][0]),o[i]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);for(p&&p(t);u.length;)u.shift()();return r.push.apply(r,d||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],a=!0,c=1;c<n.length;c++){var l=n[c];0!==o[l]&&(a=!1)}a&&(r.splice(t--,1),e=i(i.s=n[0]))}return e}var a={},o={7:0},r=[];function i(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=a,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(n,a,function(t){return e[t]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var c=window.webpackJsonp=window.webpackJsonp||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var d=0;d<c.length;d++)t(c[d]);var p=l;r.push(["./src/pages/webpack-multipage/webpack-multipage.js",0]),n()}({"./src/pages/webpack-multipage/webpack-multipage.js":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i(n("./src/assets/js/initial.js")),o=n("./src/assets/js/Utils.js"),r=i(n("./src/map.js"));function i(e){return e&&e.__esModule?e:{default:e}}n("./src/components/ArticleRead.js");var c=(0,a.default)();t.default=new c({el:"#base-panel__window",name:"markdown",data:function(){return{html:n("./src/pages/webpack-multipage/webpack-multipage.md")}},computed:{title:function(){return(0,o.getArticleInfo)(window.location.href,r.default)[0]}},mounted:function(){document.body.classList.remove("loading")}})},"./src/pages/webpack-multipage/webpack-multipage.md":function(e,t){e.exports="<h3 id=个人脸认证h5项目获得的的知识点>个人脸认证H5项目获得的的知识点</h3> <h4 id=摄像头调取>摄像头调取</h4> <blockquote> <p>移动端调取摄像头，一个前端望而生畏的功能，存在太兼容问题。基本功能是可以实现的，但终究会存在一些变现不一致的地方。</p> </blockquote> <p>移动端调取摄像头获取图片和视频只能通过表单元素实现，即<code>input :file</code>，为<code>input:file</code>元素添加<code>capture</code>属性可以实现部分手机在点击输入框时直接调起摄像头进行拍照，而不是选择图库或者拍照。 首先看<code>capture</code>可选属性值【需要配置<code>accept</code>的类型使用】：</p> <table> <thead> <tr> <th align=left>属性值</th> <th align=center>作用</th> <th align=left>表现</th> <th align=left>备注</th> </tr> </thead> <tbody><tr> <td align=left>user</td> <td align=center>前置摄像头</td> <td align=left>直接调起摄像头，通过指定accept的值选择是进行拍照还是录像，少数会提供可选操作不是直接调起摄像头</td> <td align=left>一般不会打开前置摄像头，需要用户手动切换</td> </tr> <tr> <td align=left>camera</td> <td align=center>摄像头拍照</td> <td align=left>调起摄像头拍照或选择拍照/图库</td> <td align=left>-</td> </tr> <tr> <td align=left>camcorder</td> <td align=center>摄像头录像</td> <td align=left>调起摄像头拍照或选择录像/文件</td> <td align=left>-</td> </tr> <tr> <td align=left>microphone</td> <td align=center>录音机</td> <td align=left>调起摄像头拍照或仅选择音频文件</td> <td align=left>-</td> </tr> </tbody></table> <p><a href=http://playboygit.github.io/demo/input_file_capture.html>第三方效果测试地址</a></p> <h4 id=文件读取>文件读取</h4> <blockquote> <p>通过内置的<code>FileReader</code>对象可以读取到文件内容。</p> </blockquote> <ul> <li><code>FileReader</code>提供回调函数和读取文件到指定格式的方法。</li> <li><code>onload</code>是文件读取完毕回调事件注册方法；</li> <li><code>abort</code>终断文件读取；</li> <li><code>onloadStart</code>配合<code>onprogress</code>可以制作文件读取进度条；</li> <li><code>readAsArrayBuffer</code> 读取成ArrayBuffer格式数据</li> <li><code>readAsText</code> 读取成文本格式</li> <li><code>readAsDataURL</code> 读取成base64位数据</li> </ul> <p>在实际应用中，手机拍照体积都会比较大，动不动就达到6-8M。如果直接上传图片的话，一个是上传时间等待太久用户体验不好，再有就是用户流量的浪费。所以做文件压缩是非常有必要的。</p> <p>项目后台期待接收的是form提交的文件，是要包含文件名称后缀等等各种信息的。由于<code>form + iframe</code> 模拟 <code>ajax</code>提交台麻烦也有一些不太可控的问题，就尝试用<code>axios</code> 直接上传文件。</p> <h4 id=文件压缩>文件压缩</h4> <p><a href=https://github.com/nodeca/pica>pica</a>是一个不错的文件压缩工具，主要是之前项目用过上手较快，但是经测试发现在微信会直接崩溃退出。后来找到一个不错的移动端图片压缩插件<a href=https://github.com/xfhxbb/LUploader>LUploader</a>，但它不支持模块化加载，并且实际只是使用它的压缩方法，它本身是做了整体的文件上传及压缩功能的，所以就单独提取出<code>compress</code>方法了：</p> <pre><code class=language-javascript>// 图片压缩\nexport const compress = function (img, quality) {\n  var canvas = document.createElement(&quot;canvas&quot;);\n  var ctx = canvas.getContext(&#39;2d&#39;);\n  var moreCanvas = document.createElement(&quot;canvas&quot;);\n  var morectx = moreCanvas.getContext(&quot;2d&quot;);\n  var maxsize = 100 * 1024;\n  var width = img.width;\n  var height = img.height;\n  var ratio;\n  if ((ratio = width * height / 4000000) &gt; 1) {\n    ratio = Math.sqrt(ratio);\n    width /= ratio;\n    height /= ratio;\n  } else {\n    ratio = 1;\n  }\n  canvas.width = width;\n  canvas.height = height;\n  ctx.fillStyle = &quot;#fff&quot;;\n  ctx.fillRect(0, 0, canvas.width, canvas.height);\n  var count;\n  if ((count = width * height / 1000000) &gt; 1) {\n    count = ~~(Math.sqrt(count) + 1);\n    var nw = ~~(width / count);\n    var nh = ~~(height / count);\n    moreCanvas.width = nw;\n    moreCanvas.height = nh;\n    for (var i = 0; i &lt; count; i++) {\n      for (var j = 0; j &lt; count; j++) {\n        morectx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);\n        ctx.drawImage(moreCanvas, i * nw, j * nh, nw, nh);\n      }\n    }\n  } else {\n    ctx.drawImage(img, 0, 0, width, height);\n  }\n  var ndata = canvas.toDataURL(&#39;image/jpeg&#39;, quality || .5);\n  moreCanvas.width = moreCanvas.height = canvas.width = canvas.height = 0;\n  return ndata;\n};</code></pre> <p>基本原理就是用canvas绘制在读取达到图片压缩。这样得到的是一个base64格式的图片。</p> <h4 id=axious上传文件>axious上传文件</h4> <blockquote> <p>axios不仅仅支持restful接口请求，同样能轻松的完成类表单提交的文件上传功能。</p> </blockquote> <pre><code class=language-javascript>    axios({\n        url: &#39;url address&#39;,\n        method: &#39;POST&#39;,\n        data: formData\n    }).then(res =&gt; {\n        alert(res);\n    });</code></pre> <p>这种实际编码操作和ajax请求是一致的。现在面临一个问题就是formaData的组装。</p> <h4 id=formdata数据格式>formData数据格式</h4> <blockquote> <p> <a href=https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects>FormData对象</a>用以将数据编译成键值对，以便用XMLHttpRequest来发送数据。其主要用于发送表单数据，但亦可用于发送带键数据(keyed data)，而独立于表单使用。如果表单enctype属性设为multipart/form-data ，则会使用表单的submit()方法来发送数据，从而，发送数据具有同样形式。</p> </blockquote> <p>利用FormData对象,我们可以通过JavaScript用一些键值对来模拟一系列表单控件,我们还可以使用XMLHttpRequest的send()方法来异步的提交这个&quot;表单&quot;.比起普通的ajax,使用FormData的最大优点就是我们可以异步上传一个二进制文件.</p> <p>通过formData对象可以传递数据，要拿到表单数据通过<code>input</code>的<code>change</code>事件的<code>e.target.files</code>来获取到一个文件数组，直接<code>append</code>到<code>formData</code>对象中可以完成提交，但是这样的话就没办法进行图片的压缩了。那传输文件体积过大就无解了么？</p> <p>尝试用<code>fileReader.readAsArrayBuffer</code>来获取到二进制<code>ArrayBuffer</code>,是不是把他直接给后台就可以了呢？我尝试了一下，发现不可以，后台报错说找不到文件后缀，无法识别文件。方了~</p> <p>既然<code>input.onchange</code>的<code>e.target.files</code>直接给后台可以，那就观察一下他们有啥不一样的吧。</p> <p>通过<code>console</code>打印，发现输出的是<code>File</code>类型的对象，既然是js的内置对象，肯定是可以手工创建。</p> <h4 id=javascript的file对象>JavaScript的File对象</h4> <blockquote> <p><a href=https://developer.mozilla.org/zh-CN/docs/Web/API/File/File>File对象官方文档及API</a></p> </blockquote> <p>首先File对象的构造函数可以有两个或三个参数。</p> <p>两个参数的例子是这样的：</p> <pre><code class=language-javascript>    var objFile = new File([&quot;First Line Text&quot;, &quot;Second Line Text&quot;], FileName); </code></pre> <p>第一个参数是一个字符串数组。数组中的每一个元素对应着文件中一行的内容。</p> <p>第二个参数就是文件名字符串。</p> <p>如果是用三个参数的形式，代码就是这样的：</p> <pre><code class=language-javascript>var objFile = new File([&quot;First Line Text&quot;, &quot;Second Line Text&quot;], FileName, { \n    type: &quot;text/plain&quot;, \n    lastModified: date\n}); </code></pre> <p>第三个参数可以设定一些文件的属性，比如文件的MIME，最后更新时间等。</p> <p>得到这些信息，我们要准备的是一个图片的<code>ArrayBUffer</code>，前文已经得到了一个压缩过的<code>base64</code>格式的图片数据，只需要拿到<code>ArrayBUffer</code>我们就可以愉快的创建一个<code>File</code>对象传给后台了,需要制定<code>type=&#39;MIME&#39;</code>（跟后台判断有关）。</p> <p>查阅得到通过<code>blob</code>对象，可以创建<code>ArrayBUffer</code>，就得到下面的方法。</p> <h4 id=blob文件类型转化>Blob文件类型转化</h4> <p>把<code>base64</code>位图片转成二进制<code>ArrayBuffer</code>格式，需要借助浏览器中的<code>blob</code>对象，实现代码如下：</p> <pre><code class=language-javascript>export const convertBase64ToBlob = function (base64) {\n  var base64Arr = base64.split(&#39;,&#39;);\n  var imgtype = &#39;&#39;;\n  var base64String = &#39;&#39;;\n  if (base64Arr.length &gt; 1) {\n    //如果是图片base64，去掉头信息\n    base64String = base64Arr[1];\n    imgtype = base64Arr[0].substring(base64Arr[0].indexOf(&#39;:&#39;) + 1, base64Arr[0].indexOf(&#39;;&#39;));\n  }\n  // 将base64解码\n  var bytes = atob(base64String);\n  //var bytes = base64;\n  var bytesCode = new ArrayBuffer(bytes.length);\n  // 转换为类型化数组\n  var byteArray = new Uint8Array(bytesCode);\n\n  // 将base64转换为ascii码\n  for (var i = 0; i &lt; bytes.length; i++) {\n    byteArray[i] = bytes.charCodeAt(i);\n  }\n\n  // 生成Blob对象（文件对象）\n  return new Blob([bytesCode], {type: imgtype});\n};</code></pre> <h4 id=总结>总结</h4> <p>基本思路：用<code>input</code>调取摄像头捕捉用户图像 -&gt; 通过<code>FileReader</code>读取到<code>base64</code>位数据 -&gt; 再把压缩的<code>base64</code>字符串转成<code>ArrayBuffer</code>格式 -&gt; 经浏览器内置<code>File</code>对象创建一个文件 -&gt; 添加到<code>FormData</code>中完成表单数据的构建 -&gt; 再通过<code>axios</code>发送给后台服务来完成文件上传。</p> <p>封装vue组件如下：</p> <pre><code class=language-javascript>\n&lt;template&gt;\n  &lt;span class=&quot;capture-ctner&quot;\n        :data-name=&quot;name&quot;\n        :class=&quot;{&#39;no-name&#39;: !options.name}&quot;&gt;\n    &lt;input type=&quot;file&quot;\n           class=&quot;capture-input&quot;\n           :accept=&quot;options.accept&quot;\n           @change=&quot;readStream&quot;\n           :capture=&quot;options.capture&quot;/&gt;\n    &lt;button class=&quot;capture-button&quot;\n            :class=&quot;options.className&quot;&gt;{{options.label}}&lt;/button&gt;\n  &lt;/span&gt;\n&lt;/template&gt;\n\n&lt;script type=&quot;text/javascript&quot;&gt;\n  import {compress, convertBase64ToBlob} from &#39;@/assets/js/Utils&#39;;\n  // eslint-disable-next-line\n  const pica = require(&#39;pica&#39;)();\n\n  export default {\n    name: &#39;capture&#39;,\n    data() {\n      return {\n        name: &#39;&#39;\n      };\n    },\n    props: {\n      options: {\n        type: Object,\n        require: true,\n        default: {\n          accept: &#39;image/*&#39;,\n          capture: &#39;user&#39;,\n          optimize: false,\n          label: &#39;上传文件&#39;,\n          name: true\n        }\n      }\n    },\n    computed: {\n      type() {\n        let type;\n\n        try {\n          type = this.options.accept.split(&#39;/&#39;)[0];\n        } catch (e) {\n          return &#39;&#39;;\n        }\n        return type;\n      }\n    },\n    methods: {\n      auType(name) {\n        const RegMap = {\n          image: /\\.jpg$|\\.jpeg$|\\.png$/,\n          video: /\\.mp4$|/\n        };\n        let type = this.type;\n\n        return RegMap[type].test(name);\n      },\n      /**\n       * 通过fileReader读取文件流\n       * @param e\n       */\n      readStream(e) {\n        let ipt = e.target;\n        let reader;\n        let self = this;\n\n        this.$emit(&#39;change&#39;, e);\n        console.log(e);\n        if (ipt.files &amp;&amp; ipt.files.length &gt; 0) {\n          this.$emit(&#39;readStart&#39;, ipt.files[0].name);\n          /*if (!this.auType(ipt.files[0].name)) {\n            this.$emit(&#39;typeError&#39;, ipt.files[0].name);\n            return false;\n          }*/\n          this.name = ipt.files[0].name;\n          reader = new FileReader();\n          reader.onload = (e) =&gt; {\n            self.readComplete(e.target.result);\n          };\n          (this.type === &#39;image&#39;) &amp;&amp; reader.readAsDataURL(ipt.files[0]);\n          (this.type === &#39;video&#39;) &amp;&amp; reader.readAsBinaryString(ipt.files[0]);\n        }\n      },\n      /**\n       * 图片是否压缩优化的判断\n       */\n      readComplete(data) {\n        let img;\n        let self = this;\n\n        function callback() {\n          var rs;\n\n          rs = compress(img, 0.05);\n          rs = convertBase64ToBlob(rs);\n          rs = new File([rs], self.name, {type: &#39;mime&#39;});\n          self.$emit(&#39;compressed&#39;, rs);\n        };\n\n        this.$emit(&#39;readed&#39;, data);\n\n        if (!this.options.optimize) {\n          return;\n        };\n\n        img = new Image();\n        img.src = data;\n        if (img.complete) {\n          callback();\n        } else {\n          img.onload = callback;\n        };\n      }\n    }\n  };\n&lt;/script&gt;\n\n&lt;style lang=&quot;scss&quot;&gt;\n  .capture-ctner {\n    position: relative;\n    z-index: 1;\n    display: inline-block;\n    height: 5em;\n  }\n\n  .capture-ctner .capture-button {\n    position: absolute;\n    left: 0;\n    top: 0;\n    z-index: 2;\n    &amp;.disabled {\n      z-index: 100;\n    }\n  }\n\n  .capture-ctner:after {\n    display: inline-block;\n    content: attr(data-name);\n    font-size: 12px;\n    color: #989898;\n    font-family: &#39;微软雅黑&#39;;\n    margin-top: .1em;\n  }\n\n  .capture-ctner.no-name:after {\n    display: none;\n  }\n\n  .capture-ctner .capture-input {\n    border: 1px solid #f00;\n    position: relative;\n    z-index: 3;\n    display: inline-block;\n    width: 90%;\n    left: 5%;\n    top: 3px;\n    height: 2.5em;\n    opacity: 0;\n    filter: alpha(opacity=0);\n    cursor: pointer;\n  }\n&lt;/style&gt;\n</code></pre> <p>使用方法：</p> <pre><code class=language-html>&lt;capture :options=&quot;capOpts&quot;\n               @change=&quot;loading&quot;\n               @compressed=&quot;getFile&quot;\n               @readed=&quot;readFile&quot;&gt;&lt;/capture&gt;</code></pre> <pre><code class=language-javascript>capOpts: {\n          optimize: true,       //是否启用压缩\n          label: &#39;拍摄&#39;,        // 按钮文字\n          name: false,          // 是否显示文件名\n          accept: &#39;image/*&#39;,    // 可获取文件格式\n          capture: &#39;user&#39;,      // 捕获类型\n          className: &#39;public-element-button block&#39;\n                                // 按钮类名样式\n        }</code></pre> <ul> <li>change 是图像刚被选择是触发，接收到change事件对象；</li> <li>compressd 是图像压缩完的触发，接收的是File对象；</li> <li>readed 是图像被FileReader读取完毕时触发，接收到的是base64位数据；</li> <li>capOpts 配置参数</li> </ul> "}});
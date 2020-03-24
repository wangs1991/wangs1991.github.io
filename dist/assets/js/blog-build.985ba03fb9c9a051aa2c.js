!function(s){function n(n){for(var l,t,c=n[0],r=n[1],i=n[2],h=0,j=[];h<c.length;h++)t=c[h],Object.prototype.hasOwnProperty.call(p,t)&&p[t]&&j.push(p[t][0]),p[t]=0;for(l in r)Object.prototype.hasOwnProperty.call(r,l)&&(s[l]=r[l]);for(o&&o(n);j.length;)j.shift()();return e.push.apply(e,i||[]),a()}function a(){for(var s,n=0;n<e.length;n++){for(var a=e[n],l=!0,c=1;c<a.length;c++){var r=a[c];0!==p[r]&&(l=!1)}l&&(e.splice(n--,1),s=t(t.s=a[0]))}return s}var l={},p={3:0},e=[];function t(n){if(l[n])return l[n].exports;var a=l[n]={i:n,l:!1,exports:{}};return s[n].call(a.exports,a,a.exports,t),a.l=!0,a.exports}t.m=s,t.c=l,t.d=function(s,n,a){t.o(s,n)||Object.defineProperty(s,n,{enumerable:!0,get:a})},t.r=function(s){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(s,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(s,"__esModule",{value:!0})},t.t=function(s,n){if(1&n&&(s=t(s)),8&n)return s;if(4&n&&"object"==typeof s&&s&&s.__esModule)return s;var a=Object.create(null);if(t.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:s}),2&n&&"string"!=typeof s)for(var l in s)t.d(a,l,function(n){return s[n]}.bind(null,l));return a},t.n=function(s){var n=s&&s.__esModule?function(){return s.default}:function(){return s};return t.d(n,"a",n),n},t.o=function(s,n){return Object.prototype.hasOwnProperty.call(s,n)},t.p="";var c=window.webpackJsonp=window.webpackJsonp||[],r=c.push.bind(c);c.push=n,c=c.slice();for(var i=0;i<c.length;i++)n(c[i]);var o=r;e.push(["./src/pages/blog-build/blog-build.js",0]),a()}({"./src/pages/blog-build/blog-build.js":function(s,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var l,p=a("./src/assets/js/initial.js"),e=(l=p)&&l.__esModule?l:{default:l},t=a("./src/assets/js/Utils.js");a("./src/components/ArticleRead.js");var c=a("./src/data.json"),r=(0,e.default)();n.default=new r({el:"#base-panel__window",name:"README",data:function(){return{html:a("./src/pages/blog-build/markdown.md")}},computed:{title:function(){return(0,t.getArticleInfo)(window.location.href,c)[0]}},mounted:function(){document.body.classList.remove("loading")}})},"./src/pages/blog-build/markdown.md":function(s,n){s.exports="<h2 id=webpack-配置多页面博客系统>webpack 配置多页面博客系统</h2> <blockquote> <p>依靠webpack打包能力，构建的vue多页面应用构建的<a href=https://wangs1991.github.io/ >Github Blog</a>.</p> </blockquote> <h3 id=思路>思路</h3> <blockquote> <p><code>gitpage</code>是<code>github</code>提供给开发者的个人域名，指到个人用户名下面。很多开发者利用gitpage结合博客模板工具搭建了个人博客。 我按照网络文章指导利用gitpage+hexo搭建博客，在创建之后总感觉主题不是很喜欢，如果自定义样式的话又需要了解模板语法，如果想要<code>JavaScript</code>相关的效果有比较麻烦（这些纯属臆想，实际实践步骤仅仅是本地创建页面运行服务浏览报错就放弃了模板工具）。 分析发现gitpage的主页指向的项目根目录的<code>index.html</code>，其他页面的路径只需要通过该页面提供入口就能组织好博客页面间的跳转关系。 so要自己实现一个博客模板工具的话只需要可以自动把子页的链接以及标题放到根目录的入口页面，然后简单操作就能发布更新就ok了。基本思路有了，刚好手头时间又比较充裕，就有了用<code>webpack</code>自己配置搭建一个博客模板的想法。总结需要解决的问题如下：</p> </blockquote> <ul> <li>首页自动生成文章列表并提供链接查看详情</li> <li>基础主题样式提供</li> <li>文章创建简单方便</li> <li>markdown语法支持</li> <li>博客的发布更新方便</li> </ul> <h3 id=组织文件目录>组织文件目录</h3> <p>预期的目录结构如下，分离源码和产出文件夹。</p> <pre><code class=text> root\n  |<span class=hljs-string>---- dist                // webpack构建产出的项目\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- assets           // 静态资源存放的位置\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- html             // html页面\n  </span>|<span class=hljs-string>---- node_modules\n  </span>|<span class=hljs-string>---- src                 // 开发源码位置\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- assets           // 静态资源位置\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- css           \n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- fonts\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- images\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- js            // 存放公用的js文件\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- components       // 公用的组件文件\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- libs             // 组件类文章对应的文档资源\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- lib\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>   </span>|<span class=hljs-string> lib.js        // *必需* 组件源码类文件\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>   </span>|<span class=hljs-string> lib.markdown  // *必需* 相关文档说明\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>   </span>|<span class=hljs-string> config.json   // *必需* 组建信息配置\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- pages            // 博客页面\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- index         // 每个页面独立一个文件夹，包含所有的模板文件、脚本、样式等\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>     </span>|<span class=hljs-string>---- index.js   // *必需* 和文件夹同名的js文件作为页面打包的入口\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>     </span>|<span class=hljs-string>---- index.html // *可选* 和文件夹同名的html文件作为页面模板，如果不提供会根据是否当前文件夹是否存在.md文档判断文章类型，以 src/template/(html</span>|<span class=hljs-string>markdown)/template.html作为页面模板\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>     </span>|<span class=hljs-string>---- index.css  // *可选* 页面的特殊样式\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>     </span>|<span class=hljs-string>---- index.md   // *可选* 支持md语法，可以使用md编辑内容\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- static           // 标签分类等信息的数据 （*.js）\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- labels.js     // 个人数据的配置信息：用户名，页面title等\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- template         // 文章模板，· 复制可快速创建文章结构文件，· 在文章模板缺少时作为公用模板渲染页面\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- html          \n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- config.json\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- template.html\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- template.js\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- markdown\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- config.json\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- markdown.html\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- template.html\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- template.js\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- config.js        // 站点博客信息配置\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- data.json        // 全部文档的列表数据，webpack依据src/pages下目录结构以及对应子文件夹下的config.json文件自动生成，用来生成首页列表数据\n  </span>|<span class=hljs-string>---- .babelrc\n  </span>|<span class=hljs-string>---- .gitingnore\n  </span>|<span class=hljs-string>---- .stylelintignore\n  </span>|<span class=hljs-string>---- .stylelintrc\n  </span>|<span class=hljs-string>---- _config.yml\n  </span>|<span class=hljs-string>---- generate.js         // node 读取检索文件结构，\n  </span>|<span class=hljs-string>---- index.html          // gitpage 指向首页\n  </span>|<span class=hljs-string>---- package.json\n  </span>|<span class=hljs-string>---- postcss.config.json   // postcss 配置\n  </span>|<span class=hljs-string>---- README.md           // github 生成的md说明文件，项目说明\n  </span>|<span class=hljs-string>---- utils.js\n  </span>|<span class=hljs-string>---- webpack.common.js\n  </span>|<span class=hljs-string>---- webbpack.dev.js\n  </span>|<span class=hljs-string>---- webpack.prod.js</span></code></pre> <h3 id=配置说明>配置说明</h3> <h4 id=数据自动生成配置>数据自动生成配置</h4> <p>主页列表需要展示全部的文章列表，因而需要一个完整的数据依赖。如果每次创建和删除一篇文章都需要手动维护这个整体数据的话，会增加一个额外的负担，无法将精力完整的投入到文章的创作与记录中。node提供了文件的读写能力，如果可以借助这个能力实现文章数据的自动拼接组合就可以减少数据维护的负担。</p> <p>通过<code>fs</code>模块读取<code>pages</code>目录下的所有文件，筛选出<code>config.json</code>文件并读取数其中的内容，组装所有互数据并生成<code>src/data.json</code>文件，这样就解决了整个文章的查找与数据依赖维护的问题。</p> <p>此外，<code>github</code>主页可以展示整体的文章列表，借助这个数据可以写出<code>readme..md</code>文件到根目录下。相关的执行代码在文件<code>./generate.js</code>中。</p> <h4 id=webpack配置>webpack配置</h4> <p>除了配置不同类型文件的相关<code>loader</code>之外，一个多页面的<code>webpack</code>配置无非就是指定多个<code>javascript</code>的入口文件和对应的页面模板。</p> <p>由于页面数量以及页面名称的可变性，能够实现自动查找是最理想的情况了。同样利用<code>fs</code>模块，检索<code>pages</code>文件夹下的文件，通过查找同文件夹下存在的文件类型，判断文章博客可能的书写类型是<code>mardown</code>笔记还是自定的<code>html</code>页面。并且通过判断同目录下是否有<code>html</code>文件判断当前的文章是否设置的自定义的模板文档，如果无则设置文档的默认模板是<code>src/tempalte/(html|markdwon)/tempalte.html</code>。</p> <p>如何文件和模板计算判断的关键性代码如下：</p> <pre><code class=javascript><span class=hljs-built_in>module</span>.exports = {\n    <span class=hljs-comment>/*\n    * 通过自执行匿名方法，计算多入口文件\n    * 主入口设置成 app.js\n    * 其他页面入口根据页面名称动态定义\n    * */</span>\n    <span class=hljs-attr>entry</span>: (<span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params></span>) </span>{\n        <span class=hljs-keyword>let</span> ret = {}\n        <span class=hljs-keyword>let</span> chunk\n\n        ret.app = <span class=hljs-string>'./src/pages/index/index.js'</span> <span class=hljs-comment>// 设置主入口文件是app.js</span>\n\n        pages.filter(<span class=hljs-function><span class=hljs-params>n</span> =&gt;</span> {\n            <span class=hljs-keyword>return</span> <span class=hljs-regexp>/\\.js$/</span>.test(n)  <span class=hljs-comment>// 过滤读取到的pages目录下的所有文件中后缀名为.js的文件</span>\n        }).forEach(<span class=hljs-function><span class=hljs-params>n</span> =&gt;</span> {\n            chunk = n.split(<span class=hljs-string>'\\\\'</span>).pop().split(<span class=hljs-string>'.'</span>).shift()  <span class=hljs-comment>// 通过路径读取到文件名称</span>\n\n            ret[chunk] = <span class=hljs-string>'./'</span> + n   <span class=hljs-comment>// 设置相关的入口文件</span>\n        })\n\n        <span class=hljs-keyword>return</span> ret <span class=hljs-comment>// 返回多个页面入口</span>\n    })(),\n    <span class=hljs-attr>output</span>: {\n        <span class=hljs-attr>filename</span>: <span class=hljs-string>\"assets/js/[name].[hash].js\"</span>,    <span class=hljs-comment>// js文件输出到dist/script/name.hash.js</span>\n        <span class=hljs-attr>path</span>: path.resolve(__dirname, <span class=hljs-string>'./dist/'</span>)\n    },\n    <span class=hljs-attr>plugins</span>: [\n       <span class=hljs-comment>/*\n        * 匿名自执行方法遍历页面数据，生成到模块的html文件到dist/html/[name]/name.html\n        * 判断逻辑：判断pages下某个子目录中是否存在html文件：\n        *     如果存在该文件为页面的模板文件；\n        *     如果不存在在判断该目录下是否存在md文件：\n        *           如果存在那么设置模板文件为template/mardown/template.html;\n        *           如果不存在那么设置模板文件为template/html/template.html;\n        * */</span>\n        ...(<span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params></span>) </span>{\n            <span class=hljs-keyword>let</span> ret = []\n            <span class=hljs-keyword>let</span> name\n            <span class=hljs-keyword>let</span> folder\n            <span class=hljs-keyword>let</span> filterRes\n            <span class=hljs-keyword>let</span> cache\n\n            <span class=hljs-comment>/*\n            * 过滤获取pages下后缀名为.js、.html、.md的文件\n            * */</span>\n            filterRes = pages.filter(<span class=hljs-function><span class=hljs-params>n</span> =&gt;</span> {\n                <span class=hljs-keyword>let</span> tmp\n                <span class=hljs-keyword>let</span> folder\n\n                tmp = n.split(<span class=hljs-string>'\\\\'</span>)\n                tmp.pop()\n                folder = tmp.pop()\n\n                <span class=hljs-keyword>return</span> <span class=hljs-keyword>new</span> <span class=hljs-built_in>RegExp</span>(folder + <span class=hljs-string>'\\.html$'</span>).test(n) \n                        || <span class=hljs-keyword>new</span> <span class=hljs-built_in>RegExp</span>(folder + <span class=hljs-string>'\\.js$'</span>).test(n) \n                        || <span class=hljs-regexp>/.md$/</span>.test(n)\n\n            })\n\n            cache = {}\n            filterRes.forEach(<span class=hljs-function>(<span class=hljs-params>n, i</span>) =&gt;</span> {\n                <span class=hljs-keyword>let</span> tmp = n.split(<span class=hljs-string>'\\\\'</span>)\n                <span class=hljs-keyword>let</span> tmpFilterRes\n                <span class=hljs-keyword>let</span> template\n                <span class=hljs-keyword>let</span> tpmFolder\n                name = tmp.pop()\n                folder = tmp.pop()\n\n                <span class=hljs-comment>/*\n                * 通过cache变量缓存目录数据，和目录下的文件名称\n                * 通过文件路径读取到目录名，和缓存的目录进行比较\n                * 如果当前目录和缓存的目录不同，或者已经读取到最后一个文件了\n                *   那么可以确认某一个文件夹下的所有文件\n                *       再在目录文件中一次查找html文件md文件，完成模板文件的指定\n                * */</span>\n                cache[folder] = cache[folder] || []\n                cache[folder].push(n)\n\n                <span class=hljs-keyword>if</span> (!((cache.preFolder === <span class=hljs-literal>undefined</span> \n                        || cache.preFolder === folder) \n                        &amp;&amp; i &lt; filterRes.length - <span class=hljs-number>1</span>)) {\n\n                    tpmFolder = (i === filterRes.length - <span class=hljs-number>1</span>) ? \n                        folder: cache.preFolder\n\n                    tmpFilterRes = cache[tpmFolder].filter(<span class=hljs-function><span class=hljs-params>n</span> =&gt;</span> <span class=hljs-regexp>/.html$/</span>.test(n))\n                    <span class=hljs-keyword>if</span> (tmpFilterRes.length &gt; <span class=hljs-number>0</span>) {\n                        template = tmpFilterRes[<span class=hljs-number>0</span>]\n                    } <span class=hljs-keyword>else</span> {\n                        tmpFilterRes = cache[tpmFolder].filter(<span class=hljs-function><span class=hljs-params>n</span> =&gt;</span> <span class=hljs-regexp>/.md/</span>.test(n))\n                        template = tmpFilterRes.length &gt; <span class=hljs-number>0</span> ? \n                            __dirname + <span class=hljs-string>'/src/template/markdown/template.html'</span>\n                            : __dirname + <span class=hljs-string>'/src/template/html/template.html'</span>\n                    }\n\n                    ret.push(<span class=hljs-keyword>new</span> HtmlWebpackPlugin({\n                        <span class=hljs-attr>filename</span>: __dirname + <span class=hljs-string>'/dist/html/'</span> + tpmFolder + <span class=hljs-string>'.html'</span>,  <span class=hljs-comment>// 设置输出的html文件位置</span>\n                        <span class=hljs-attr>template</span>: template,     <span class=hljs-comment>// 设置模板文件</span>\n                        <span class=hljs-attr>title</span>: (<span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params></span>) </span>{\n                            <span class=hljs-keyword>if</span> (tpmFolder === <span class=hljs-string>'index'</span>) {\n                                <span class=hljs-keyword>return</span> <span class=hljs-string>''</span>\n                            }\n                            <span class=hljs-keyword>let</span> config = utils.getFileContent(<span class=hljs-string>'./src/pages/'</span> + tpmFolder + <span class=hljs-string>'/config.json'</span>)\n\n                            <span class=hljs-keyword>return</span> config.name + <span class=hljs-string>' | '</span> + Info.title  <span class=hljs-comment>// 动态计算html的title属性</span>\n                        })(),\n                        <span class=hljs-attr>description</span>: Info.description,  <span class=hljs-comment>// 动态计算html的description属性</span>\n                        <span class=hljs-attr>chunks</span>: [<span class=hljs-string>'common'</span>, tpmFolder],\n                        <span class=hljs-attr>minify</span>:\n                            {\n                                <span class=hljs-attr>removeComments</span>: <span class=hljs-literal>true</span>,<span class=hljs-comment>//删除注释</span>\n                                <span class=hljs-attr>collapseWhitespace</span>:\n                                    <span class=hljs-literal>true</span><span class=hljs-comment>//删除空格</span>\n                            }\n                    }))\n                }\n                cache.preFolder = folder\n            })\n            <span class=hljs-keyword>return</span> ret\n        })()\n    ]\n}</code></pre> <h4 id=开发环境和生产环境的差异化配置>开发环境和生产环境的差异化配置</h4> <p>相对于开发环境，生产环境需要对代码进行的优化操作比较多，其中包括代码的分隔、压缩与hash命名、css处理。对于这个项目还有一个坑，对开发环境指定的根目录是在<code>dist</code>下：</p> <pre><code class=javascript>    <span class=hljs-string>...</span>\n    <span class=hljs-attr>mode:</span> <span class=hljs-string>'development'</span><span class=hljs-string>,</span>\n    <span class=hljs-attr>devtool:</span> <span class=hljs-string>'inline-source-map'</span><span class=hljs-string>,</span>\n    <span class=hljs-attr>devServer:</span> <span class=hljs-string>{</span>\n        <span class=hljs-attr>host:</span> <span class=hljs-string>'0.0.0.0'</span><span class=hljs-string>,</span>\n        <span class=hljs-attr>port:</span> <span class=hljs-number>8090</span><span class=hljs-string>,</span>\n        <span class=hljs-attr>contentBase:</span> <span class=hljs-string>['./dist'],</span>\n        <span class=hljs-attr>inline:</span> <span class=hljs-literal>true</span><span class=hljs-string>,</span>\n        <span class=hljs-attr>hot:</span> <span class=hljs-literal>true</span>\n    <span class=hljs-string>}</span>\n    <span class=hljs-string>....</span></code></pre> <p>但是gitpage引用的首页<code>index.html</code>是位于项目根目录下的，这就需要在分别在根目录和<code>dist</code>目录下分别生成一个<code>index.html</code>。</p> <pre><code class=javascript><span class=hljs-comment>// webpack.dev.js</span>\n    <span class=hljs-attribute>plugins</span>: [\n        new HtmlWebpackPlugin({\n            <span class=hljs-attribute>filename</span>: __dirname + <span class=hljs-string>'/dist/index.html'</span>, <span class=hljs-comment>// 生成html到指定位置</span>\n            <span class=hljs-attribute>template</span>: __dirname + <span class=hljs-string>\"/src/pages/index/index.html\"</span>, <span class=hljs-comment>// 模板文件</span>\n            <span class=hljs-attribute>title</span>: Info.title,\n            <span class=hljs-attribute>description</span>: Info.description,\n            <span class=hljs-attribute>chunks</span>: [<span class=hljs-string>'common'</span>, <span class=hljs-string>'app'</span>],\n            <span class=hljs-attribute>minify</span>: {\n                <span class=hljs-attribute>removeComments</span>: true,<span class=hljs-comment>//删除注释</span>\n                <span class=hljs-attribute>collapseWhitespace</span>: true<span class=hljs-comment>//删除空格</span>\n            }\n        }),\n        ...\n    ]\n<span class=hljs-comment>// webpack.prod.js</span>\n    <span class=hljs-attribute>plugins</span>: [\n        new HtmlWebpackPlugin({\n            <span class=hljs-attribute>filename</span>: __dirname + <span class=hljs-string>'/index.html'</span>, <span class=hljs-comment>// 生成html到指定位置</span>\n            <span class=hljs-attribute>template</span>: __dirname + <span class=hljs-string>\"/src/pages/index/index.html\"</span>, <span class=hljs-comment>// 模板文件</span>\n            <span class=hljs-attribute>title</span>: Info.title,\n            <span class=hljs-attribute>description</span>: Info.description,\n            <span class=hljs-attribute>chunks</span>: [<span class=hljs-string>'common'</span>, <span class=hljs-string>'app'</span>],\n            <span class=hljs-attribute>minify</span>: {\n                <span class=hljs-attribute>removeComments</span>: true,<span class=hljs-comment>//删除注释</span>\n                <span class=hljs-attribute>collapseWhitespace</span>: true<span class=hljs-comment>//删除空格</span>\n            }\n        }),\n        ...\n    ]</code></pre> <h3 id=固定数据格式说明>固定数据格式说明</h3> <h4 id=configjson>config.json</h4> <pre><code>每篇文章是位于`pages`下的一个子目录，里面的`config.json`是一个特别重要的文件，格式如下：</code></pre><pre><code class=javascript>{\n  <span class=hljs-attr>\"typeId\"</span>: <span class=hljs-number>1000</span>,       <span class=hljs-comment>// Int: 标签id</span>\n  <span class=hljs-attr>\"type\"</span>: <span class=hljs-string>\"功能测试\"</span>,    <span class=hljs-comment>// String: 标签名称</span>\n  <span class=hljs-attr>\"keywords\"</span>: [],       <span class=hljs-comment>// Array: 关键字</span>\n  <span class=hljs-attr>\"script\"</span>: <span class=hljs-literal>true</span>,       <span class=hljs-comment>// Boolean: 预留字段，非必须</span>\n  <span class=hljs-attr>\"title\"</span>: <span class=hljs-string>\"个人信息\"</span>,   <span class=hljs-comment>// String: 文章的标题</span>\n  <span class=hljs-attr>\"uri\"</span>: <span class=hljs-string>\"about.html\"</span>,  <span class=hljs-comment>// String: 页面的相对路径uri</span>\n  <span class=hljs-attr>\"date\"</span>: <span class=hljs-string>\"2019-01-26\"</span>, <span class=hljs-comment>// String: 发布日期</span>\n  <span class=hljs-attr>\"isPrivate\"</span>: <span class=hljs-literal>true</span>     <span class=hljs-comment>// Boolean: 是否公开发布</span>\n}</code></pre> <pre><code>配置文件的几个作用：\n<span class=hljs-bullet>* </span>webpack会查找该文件生成data.json，用来生成列表主页以及数据搜索\n<span class=hljs-bullet>* </span>webpack生成html时注入页面title使用</code></pre><h4 id=分类标签管理>分类标签管理</h4> <p> 配置文件：<code>src &gt; static &gt; labels.js</code></p> <p> 字段说明：</p> <pre><code class=javascript>     <span class=hljs-keyword>module</span>.<span class=hljs-keyword>exports</span> = [{\n         id: <span class=hljs-number>1004</span>,                       <span class=hljs-comment>// 唯一Id，会和文章列表关联</span>\n         label: <span class=hljs-string>'webpack'</span>,               <span class=hljs-comment>// 显示的标签名</span>\n         color: <span class=hljs-string>'rgba(16,58,177,.5)'</span>     <span class=hljs-comment>// 标签的颜色色值[任何合法的色值标识方式均可]</span>\n     }]</code></pre> <h4 id=configjs-站点配置>config.js 站点配置</h4> <pre><code>文件配置了整站的信息，位于`src/config`。</code></pre><pre><code class=javascript><span class=hljs-keyword>module</span>.<span class=hljs-keyword>exports</span> = {\n    nickname: <span class=hljs-string>'网站名字'</span>,\n    description: <span class=hljs-string>'类签名简单描述'</span>,\n    title: <span class=hljs-string>'页面title注入值'</span>,\n    host: <span class=hljs-string>'gitpage访问路径'</span>\n}</code></pre> <h3 id=文章的创建与发布>文章的创建与发布</h3> <h4 id=创建>创建</h4> <pre><code>说明： 创建页面后需要重启`webpack`，刷新页面就可以看到新的页面数据。</code></pre><h5 id=html>html</h5> <p> 直接拷贝<code>src/template/html</code>文件夹重命名文件夹、<code>.js</code>、<code>.html</code>文件即可。 如果是单纯的文档记录，建议创建<code>mardown</code>类型，如果需要页面需要自己定制结构以及样式，或者做效果展示可以创建该类型文章。自己写<code>js</code>以及<code>css</code>完全自由，没有任何限制。</p> <pre><code><span class=hljs-title>&gt; 说明:</span> 如果需要和其他页面保持同样的结构样式，只需要把写入的新内容全部放到`slot`标签中。</code></pre><h5 id=markdown>markdown</h5> <p> 直接拷贝<code>src/template/markdown</code>文件夹重命名文件夹、<code>.js</code>、<code>.html</code>文件即可。 如果不保留<code>html</code>文件<code>webpack</code>会默认<code>src/template/markdown/template.html</code>为模板文件。如果没有特殊修改，建议不创建该文件使用默认模板，对于后期修改布局的需求比较容易满足，否则需要修改多个<code>html</code>文件。</p> <p> 当然，你也可以自定义样式文件，这里没有任何限制。</p> <h5 id=componets-doc>componets doc</h5> <p> 系统以一篇文章的形式定义了组件文档的格式，文件位于<code>src/pages/libs-gather/*</code>，展示的组件数据来自<code>src/libs/</code>。 和页面的计算规则一样，<code>webpack</code>查找每个<code>libs</code>下每个文件夹下的<code>config.json</code>来组装<code>data.js</code>，从而提供了组件的列表数据来源。该目录下的<code>.md</code>文件是组件文档，<code>browser</code>可以理解为组件的源文件，<code>config.json</code>的字段及其作用说明如下：</p> <pre><code class=javascript>{\n  <span class=hljs-attr>\"title\"</span>: <span class=hljs-string>\"浏览器、平台版本检测\"</span>,    <span class=hljs-comment>// 组件标题</span>\n  <span class=hljs-attr>\"uri\"</span>: <span class=hljs-string>\"https://github.com/wangs1991/wangs1991.github.io/blob/master/src/libs/browser/browser.js\"</span>,    <span class=hljs-comment>// 组件在服务器上的下载地址</span>\n  <span class=hljs-attr>\"doc\"</span>: <span class=hljs-string>\"../libs/browser/browser.md\"</span>   <span class=hljs-comment>// 说明文档文件地址</span>\n}</code></pre> <pre><code>说明： 组件样式定义在`src/components/LibItem.js`中，定义了交互样式。</code></pre><h4 id=发布>发布</h4> <p>执行命令<code>npm run build</code>，等待打包构建成功后把产出文件推送到github远程分支即可。 </p> <h3 id=主题样式>主题样式</h3> <p> 文档样式采用的是github的文档样式。</p> <h4 id=内置组件>内置组件</h4> <h5 id=公用头部-titleheader>公用头部 <code>titleHeader</code></h5> <ul> <li><p>自动读取labels的分类数据填充到头部滚动分类栏；</p> </li> <li><p>根据地址栏数据自动选中当前分类；</p> </li> <li><p>点击分类项，筛选列表数据；</p> </li> <li><p>头像应用<code>src &gt; assets &gt; images &gt; avator.jpg</code>文件；</p> <h5 id=文章信息栏-articletitle>文章信息栏 <code>articleTitle</code></h5> <ul> <li>头像应用<code>src &gt; assets &gt; images &gt; avator.jpg</code>文件；</li> <li>文章对应的数据标签和关键字展示；</li> </ul> <h5 id=文章详情阅读-articleread>文章详情阅读 <code>ArticleRead</code></h5> <ul> <li>默认文章详情的展示视图；</li> <li>必要参数<code>data=&quot;title&quot;</code>，应用于<code>articleTitle</code>组件； </li> </ul> <h5 id=gotop组件-gotop>goTop组件 <code>goTop</code></h5> <ul> <li>返回顶部</li> </ul> <h5 id=组件展示-libitem>组件展示 <code>LibItem</code></h5> </li> <li><p>组件信息展示</p> </li> <li><p>组件文档展示</p> </li> </ul> <h3 id=webpack命令说明>webpack命令说明</h3> <h4 id=开发调试>开发调试</h4> <pre><code class=ssh>npm <span class=hljs-keyword>run</span><span class=bash> start</span></code></pre> <p>默认路径指到<code>/dist</code>目录下，<code>webpack.dev.js</code>特别将入口<code>html</code>模板文件<code>index.html</code>生成到该目录下。</p> <h4 id=打包发布>打包发布</h4> <pre><code class=ssh>npm <span class=hljs-keyword>run</span><span class=bash> build</span></code></pre> <p>执行代码优化和压缩，产出文件到<code>/dist</code>目录下，同时额外讲<code>index.html</code>生成一份到项目根目录下，供Github Pages 查找到首页。</p> <h4 id=postcss配置>postcss配置</h4> <pre><code class=javascript>module.exports = {\n    <span class=hljs-symbol>parser:</span> <span class=hljs-string>'postcss-scss'</span>,     <span class=hljs-regexp>//</span> css内scss语法支持\n    <span class=hljs-symbol>plugins:</span> [\n        <span class=hljs-keyword>require</span>(<span class=hljs-string>'postcss-import'</span>),  <span class=hljs-regexp>//</span> css文件内支持<span class=hljs-variable>@import</span>导入其他样式\n        <span class=hljs-keyword>require</span>(<span class=hljs-string>'precss'</span>),\n        <span class=hljs-keyword>require</span>(<span class=hljs-string>'autoprefixer'</span>)({   <span class=hljs-regexp>//</span> css3属性添加私有样式前缀\n            <span class=hljs-symbol>browsers:</span> [<span class=hljs-string>'last 5 versions'</span>]\n        })\n    ]\n}</code></pre> <h4 id=文件输出>文件输出</h4> <ul> <li>公用样式输出为<code>common.hash.css</code>，页面样式单独输出样式文件为<code>name.hash.css</code>；</li> <li>公用的脚本被分割为<code>common.hash.js</code>，页面脚本单独输出样式文件为<code>name.hash.js</code>;</li> <li>图片字体文件体积小的直接转成<code>base64</code>为数据替换到代码中，其他输出到<code>dist/assets/**/*</code>中;</li> <li><code>src/static</code>中的文件经过相关处理后输出到<code>dist/assets/static/</code>下；</li> </ul> <h3 id=todo>TODO</h3> <p> -[x] mardomn 代码高亮; -[ ] todo list支持； -[ ] cli 命令支持 </p> "}});
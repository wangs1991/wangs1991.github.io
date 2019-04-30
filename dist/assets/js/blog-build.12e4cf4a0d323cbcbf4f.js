!function(s){function a(a){for(var l,c,e=a[0],r=a[1],i=a[2],o=0,j=[];o<e.length;o++)c=e[o],p[c]&&j.push(p[c][0]),p[c]=0;for(l in r)Object.prototype.hasOwnProperty.call(r,l)&&(s[l]=r[l]);for(h&&h(a);j.length;)j.shift()();return t.push.apply(t,i||[]),n()}function n(){for(var s,a=0;a<t.length;a++){for(var n=t[a],l=!0,e=1;e<n.length;e++){var r=n[e];0!==p[r]&&(l=!1)}l&&(t.splice(a--,1),s=c(c.s=n[0]))}return s}var l={},p={3:0},t=[];function c(a){if(l[a])return l[a].exports;var n=l[a]={i:a,l:!1,exports:{}};return s[a].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=s,c.c=l,c.d=function(s,a,n){c.o(s,a)||Object.defineProperty(s,a,{enumerable:!0,get:n})},c.r=function(s){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(s,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(s,"__esModule",{value:!0})},c.t=function(s,a){if(1&a&&(s=c(s)),8&a)return s;if(4&a&&"object"==typeof s&&s&&s.__esModule)return s;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:s}),2&a&&"string"!=typeof s)for(var l in s)c.d(n,l,function(a){return s[a]}.bind(null,l));return n},c.n=function(s){var a=s&&s.__esModule?function(){return s.default}:function(){return s};return c.d(a,"a",a),a},c.o=function(s,a){return Object.prototype.hasOwnProperty.call(s,a)},c.p="";var e=window.webpackJsonp=window.webpackJsonp||[],r=e.push.bind(e);e.push=a,e=e.slice();for(var i=0;i<e.length;i++)a(e[i]);var h=r;t.push(["./src/pages/blog-build/blog-build.js",0]),n()}({"./src/pages/blog-build/blog-build.js":function(s,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var l,p=n("./src/assets/js/initial.js"),t=(l=p)&&l.__esModule?l:{default:l},c=n("./src/assets/js/Utils.js");n("./src/components/ArticleRead.js");var e=n("./src/data.json"),r=(0,t.default)();a.default=new r({el:"#base-panel__window",name:"README",data:function(){return{html:n("./src/pages/blog-build/markdown.md")}},computed:{title:function(){return(0,c.getArticleInfo)(window.location.href,e)[0]}},mounted:function(){document.body.classList.remove("loading")}})},"./src/pages/blog-build/markdown.md":function(s,a){s.exports="<h2 id=welcome-to-github-pages>Welcome to GitHub Pages</h2> <blockquote> <p>vue 多页面应用构建的<a href=https://wangs1991.github.io/ >Github Blog</a>.</p> </blockquote> <h2 id=思路>思路</h2> <blockquote> <p>gitpage是github提供给开发者的个人域名，指到个人用户名下面。很多开发者利用gitpage结合博客模板工具搭建了个人博客。 我按照网络文章指导利用gitpage+hexo搭建博客，在创建之后总感觉主题不是很喜欢，如果自定义样式的话又需要了解模板语法，如果想要<code>JavaScript</code>相关的效果有比较麻烦（这些纯属意淫，实际实践步骤仅仅是本地创建页面运行服务浏览报错就放弃了模板工具）。 分析发现gitpage的主页指向的项目根目录的<code>index.html</code>，其他页面的路径只需要通过该页面提供入口就能组织好博客页面间的跳转关系。 so要自己实现一个博客模板工具的话只需要可以自动把子页的链接以及标题放到根目录的入口页面，然后简单操作就能发布更新就ok了。基本思路有了，刚好手头时间又比较充裕，就有了用<code>webpack</code>自己配置搭建一个博客模板的想法。总结需要解决的问题如下：</p> </blockquote> <ul> <li>首页自动生成子页入口链接</li> <li>基础主题样式提供</li> <li>文章创建简单方便</li> <li>markdown语法支持</li> <li>博客的发布更新方便</li> </ul> <h3 id=文章数据集合>文章数据集合</h3> <p>通过一个数组记录全部文章数据。基本数据格式如下：</p> <pre><code class=javascript>[{\n    typeId: <span class=hljs-number>1003</span>,\n    type: <span class=hljs-symbol>'日常总结</span>',\n    keywords: [<span class=hljs-symbol>'博客搭建过程</span>'],\n    script: true,\n    name: <span class=hljs-symbol>'记录依赖GitHub搭建博客的过程</span>',\n    uri: <span class=hljs-symbol>'blog-build.html</span>',\n    date: <span class=hljs-symbol>'2019-01-28</span>'\n},\n...\n]</code></pre> <p>这个数据做承载的使命还是挺多的：</p> <ul> <li>生成首页列表提供文章的入口链接；</li> <li><code>webpack</code>生成多页面的配置数据；</li> <li>页面模板标题数据的来源；</li> </ul> <h4 id=组织文件目录>组织文件目录</h4> <p>预期的目录结构如下，分离源码和产出文件夹。</p> <pre><code class=text> root\n  |<span class=hljs-string>---- dist                // webpack构建产出的项目\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- assets           // 静态资源存放的位置\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- html             // html页面\n  </span>|<span class=hljs-string>---- node_modules\n  </span>|<span class=hljs-string>---- src                 // 开发源码位置\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- assets           // 静态资源位置\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- css           \n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- fonts\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- images\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- js            // 存放公用的js文件\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- components       // 公用的组件文件\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- pages            // 博客页面\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- index         // 每个页面独立一个文件夹，包含所有的模板文件、脚本、样式等\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>     </span>|<span class=hljs-string>---- index.js\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>     </span>|<span class=hljs-string>---- index.html\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>     </span>|<span class=hljs-string>---- index.css\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>     </span>|<span class=hljs-string>---- index.md   // 支持md语法，可以使用md编辑内容，如果用html自定义则可以无这个文件\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- static           // 静态/模拟json数据\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- config.json        // 个人数据的配置信息：用户名，页面title等\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- data.js           // 博客页面数据集合，需手动维护\n  </span>|<span class=hljs-string>---- .babelrc\n  </span>|<span class=hljs-string>---- .gitingnore\n  </span>|<span class=hljs-string>---- .stylelintrc\n  </span>|<span class=hljs-string>---- _config.yml\n  </span>|<span class=hljs-string>---- index.html          // gitpage 指向首页\n  </span>|<span class=hljs-string>---- package.json\n  </span>|<span class=hljs-string>---- postcss.config.json   // postcss 配置\n  </span>|<span class=hljs-string>---- README.md           // github 生成的md说明文件，项目说明\n  </span>|<span class=hljs-string>---- webpack.common.js\n  </span>|<span class=hljs-string>---- webbpack.dev.js\n  </span>|<span class=hljs-string>---- webpack.prod.js</span></code></pre> <h4 id=webpack基本配置>webpack基本配置</h4> <p><code>webpack</code>配置中通过<code>data.js</code>的遍历指定每个页面入口<code>js</code>位置。同时通过这个数据还指定了每个页面的<code>html</code>模板文件。</p> <pre><code class=javascript><span class=hljs-built_in>module</span>.exports = {\n    <span class=hljs-attr>entry</span>: (<span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params></span>) </span>{\n        <span class=hljs-keyword>let</span> ret = {\n            <span class=hljs-attr>app</span>: <span class=hljs-string>'./src/pages/index/index.js'</span> <span class=hljs-comment>// index.html 中 index.js 的入口文件</span>\n        }\n        <span class=hljs-keyword>let</span> chunk\n\n        <span class=hljs-comment>// 根据页面数据遍历js入口的集合</span>\n        pages.filter(<span class=hljs-function><span class=hljs-params>n</span> =&gt;</span> {\n            <span class=hljs-keyword>return</span> !!n.script\n        }).forEach(<span class=hljs-function><span class=hljs-params>n</span> =&gt;</span> {\n            chunk = n.uri.split(<span class=hljs-string>'.'</span>)[<span class=hljs-number>0</span>]\n\n            ret[chunk] = __dirname + <span class=hljs-string>'/src/pages/'</span> + chunk + <span class=hljs-string>'/'</span> + chunk + <span class=hljs-string>'.js'</span>\n        })\n\n        <span class=hljs-keyword>return</span> ret <span class=hljs-comment>// 返回多个页面入口</span>\n    })(),\n    <span class=hljs-attr>output</span>: {\n        <span class=hljs-attr>filename</span>: <span class=hljs-string>\"assets/js/[name].[hash].js\"</span>,    <span class=hljs-comment>// js文件输出到dist/script/name.hash.js</span>\n        path: path.resolve(__dirname, <span class=hljs-string>'./dist/'</span>)\n    },\n    <span class=hljs-attr>plugins</span>: [\n        <span class=hljs-keyword>new</span> HtmlWebpackPlugin({\n            <span class=hljs-attr>filename</span>: __dirname + <span class=hljs-string>'/dist/index.html'</span>, <span class=hljs-comment>// 生成html到指定位置</span>\n            template: __dirname + <span class=hljs-string>\"/src/pages/index/index.html\"</span>, <span class=hljs-comment>// 模板文件</span>\n            title: Info.title,\n            <span class=hljs-attr>description</span>: Info.description,\n            <span class=hljs-attr>chunks</span>: [<span class=hljs-string>'common'</span>, <span class=hljs-string>'app'</span>],\n            <span class=hljs-attr>minify</span>: {\n                <span class=hljs-attr>removeComments</span>: <span class=hljs-literal>true</span>,<span class=hljs-comment>//删除注释</span>\n                collapseWhitespace: <span class=hljs-literal>true</span><span class=hljs-comment>//删除空格</span>\n            }\n        }),\n        ...(<span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params></span>) </span>{ <span class=hljs-comment>// 匿名自执行方法遍历页面数据，生成到模块的html文件到dist/html/[name]/name.html</span>\n            <span class=hljs-keyword>let</span> ret = []\n            <span class=hljs-keyword>let</span> folder\n            <span class=hljs-comment>// let exec = /\\.html/</span>\n\n            pages.forEach(<span class=hljs-function><span class=hljs-params>n</span> =&gt;</span> {\n                folder = n.uri.split(<span class=hljs-string>'.'</span>)[<span class=hljs-number>0</span>]\n\n                ret.push(<span class=hljs-keyword>new</span> HtmlWebpackPlugin({\n                    <span class=hljs-attr>filename</span>: __dirname + <span class=hljs-string>'/dist/html/'</span> + n.uri,\n                    <span class=hljs-attr>template</span>: __dirname + <span class=hljs-string>'/src/pages/'</span> + folder + <span class=hljs-string>'/'</span> + n.uri,\n                    <span class=hljs-attr>title</span>: (<span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params></span>) </span>{\n                        <span class=hljs-keyword>return</span> n.name + <span class=hljs-string>' | '</span> + Info.title  <span class=hljs-comment>// 动态更改页面的title属性值</span>\n                    })(),\n                    <span class=hljs-attr>description</span>: Info.description,\n                    <span class=hljs-attr>chunks</span>: [<span class=hljs-string>'common'</span>, folder],\n                    <span class=hljs-attr>minify</span>:\n                        {\n                            <span class=hljs-attr>removeComments</span>: <span class=hljs-literal>true</span>,<span class=hljs-comment>//删除注释</span>\n                            collapseWhitespace:\n                                <span class=hljs-literal>true</span><span class=hljs-comment>//删除空格</span>\n                        }\n                }))\n            })\n\n            <span class=hljs-keyword>return</span> ret\n        })()\n    ]\n}</code></pre> <h3 id=开发环境和生产环境的差异化配置>开发环境和生产环境的差异化配置</h3> <p>相对于开发环境，生产环境需要对代码进行的优化操作比较多，其中包括代码的分隔、压缩与hash命名、css处理。对于这个项目还有一个坑，对开发环境指定的根目录是在<code>dist</code>下：</p> <pre><code class=javascript>    <span class=hljs-string>...</span>\n<span class=hljs-attr>    mode:</span> <span class=hljs-string>'development'</span><span class=hljs-string>,</span>\n<span class=hljs-attr>    devtool:</span> <span class=hljs-string>'inline-source-map'</span><span class=hljs-string>,</span>\n<span class=hljs-attr>    devServer:</span> <span class=hljs-string>{</span>\n<span class=hljs-attr>        host:</span> <span class=hljs-string>'0.0.0.0'</span><span class=hljs-string>,</span>\n<span class=hljs-attr>        port:</span> <span class=hljs-number>8090</span><span class=hljs-string>,</span>\n<span class=hljs-attr>        contentBase:</span> <span class=hljs-string>['./dist'],</span>\n<span class=hljs-attr>        inline:</span> <span class=hljs-literal>true</span><span class=hljs-string>,</span>\n<span class=hljs-attr>        hot:</span> <span class=hljs-literal>true</span>\n    <span class=hljs-string>}</span>\n    <span class=hljs-string>....</span></code></pre> <p>但是gitpage引用的首页<code>index.html</code>是位于项目根目录下的，这就需要在分别在根目录和<code>dist</code>目录下分别生成一个<code>index.html</code>。</p> <pre><code class=javascript><span class=hljs-comment>// webpack.dev.js</span>\n    <span class=hljs-attribute>plugins</span>: [\n        new HtmlWebpackPlugin({\n            <span class=hljs-attribute>filename</span>: __dirname + <span class=hljs-string>'/dist/index.html'</span>, <span class=hljs-comment>// 生成html到指定位置</span>\n            <span class=hljs-attribute>template</span>: __dirname + <span class=hljs-string>\"/src/pages/index/index.html\"</span>, <span class=hljs-comment>// 模板文件</span>\n            <span class=hljs-attribute>title</span>: Info.title,\n            <span class=hljs-attribute>description</span>: Info.description,\n            <span class=hljs-attribute>chunks</span>: [<span class=hljs-string>'common'</span>, <span class=hljs-string>'app'</span>],\n            <span class=hljs-attribute>minify</span>: {\n                <span class=hljs-attribute>removeComments</span>: true,<span class=hljs-comment>//删除注释</span>\n                <span class=hljs-attribute>collapseWhitespace</span>: true<span class=hljs-comment>//删除空格</span>\n            }\n        }),\n        ...\n    ]\n<span class=hljs-comment>// webpack.prod.js</span>\n    <span class=hljs-attribute>plugins</span>: [\n        new HtmlWebpackPlugin({\n            <span class=hljs-attribute>filename</span>: __dirname + <span class=hljs-string>'/index.html'</span>, <span class=hljs-comment>// 生成html到指定位置</span>\n            <span class=hljs-attribute>template</span>: __dirname + <span class=hljs-string>\"/src/pages/index/index.html\"</span>, <span class=hljs-comment>// 模板文件</span>\n            <span class=hljs-attribute>title</span>: Info.title,\n            <span class=hljs-attribute>description</span>: Info.description,\n            <span class=hljs-attribute>chunks</span>: [<span class=hljs-string>'common'</span>, <span class=hljs-string>'app'</span>],\n            <span class=hljs-attribute>minify</span>: {\n                <span class=hljs-attribute>removeComments</span>: true,<span class=hljs-comment>//删除注释</span>\n                <span class=hljs-attribute>collapseWhitespace</span>: true<span class=hljs-comment>//删除空格</span>\n            }\n        }),\n        ...\n    ]</code></pre> <h3 id=主题样式>主题样式</h3> <p>默认引入的是github的文档样式。同时内置了一部分组件样式。</p> <h4 id=内置组件>内置组件</h4> <h5 id=公用头部-titleheader>公用头部 <code>titleHeader</code></h5> <ul> <li><p>自动读取labels的分类数据填充到头部滚动分类栏；</p> </li> <li><p>根据地址栏数据自动选中当前分类；</p> </li> <li><p>点击分类项，筛选列表数据；</p> </li> <li><p>头像应用<code>src &gt; assets &gt; images &gt; avator.jpg</code>文件；</p> <h5 id=文章信息栏-articletitle>文章信息栏 <code>articleTitle</code></h5> <ul> <li>头像应用<code>src &gt; assets &gt; images &gt; avator.jpg</code>文件；</li> <li>文章对应的数据标签和关键字展示；</li> </ul> <h5 id=文章详情阅读-articleread>文章详情阅读 <code>ArticleRead</code></h5> <ul> <li>默认文章详情的展示视图；</li> <li>必要参数<code>data=&quot;title&quot;</code>，应用于<code>articleTitle</code>组件； </li> </ul> </li> </ul> <h3 id=文章的创建与发布>文章的创建与发布</h3> <h4 id=创建>创建</h4> <p>在<code>pages</code>目录下创建一个文件夹命名为<code>readme</code>，位于该文件夹下创建一个同名的<code>readme.html</code>，同时相关的资源比如css、js、md都位于这个文件夹下。为了能在<code>index.html</code>中的列表中添加页面的入口，在<code>data.js</code>中添加数据，重启<code>npm run start</code>就完成了页面的新增。</p> <p><code>readme.js</code>主要负责创建并挂在vue应用，从而渲染公用的组件和依赖的数据。<code>md</code>类型的文件需要显式的指定路径到<code>readme.js &gt; data.html</code>中，经过<code>mardown-loader</code>会被转化成<code>html</code>串放到指定位置。一个标准的页面入口<code>JavaScript</code>文件如下：</p> <pre><code class=javascript><span class=hljs-keyword>import</span> init <span class=hljs-keyword>from</span> <span class=hljs-string>'../../assets/js/initial'</span>  <span class=hljs-comment>// 页面的初始化操作</span>\n<span class=hljs-keyword>import</span> {getArticleInfo} <span class=hljs-keyword>from</span> <span class=hljs-string>'../../assets/js/Utils'</span> <span class=hljs-comment>// 根据地址去查找文章在类表中定义的数据信息</span>\n<span class=hljs-keyword>import</span> <span class=hljs-string>'../../components/ArticleRead'</span>   <span class=hljs-comment>// 公用的布局模板</span>\n<span class=hljs-keyword>import</span> articles <span class=hljs-keyword>from</span> <span class=hljs-string>'../../map'</span>    <span class=hljs-comment>// 文章列表定义的数据信息</span>\n\n<span class=hljs-keyword>const</span> vue = init() <span class=hljs-comment>// 完成页面的初始化操作并返回vue构建函数的引用</span>\n\n<span class=hljs-keyword>export</span> <span class=hljs-keyword>default</span> <span class=hljs-keyword>new</span> vue({\n    <span class=hljs-attr>el</span>: <span class=hljs-string>'#base-panel__window'</span>,\n    <span class=hljs-attr>name</span>: <span class=hljs-string>'README'</span>,\n    data () {\n        <span class=hljs-keyword>return</span> {\n            <span class=hljs-attr>html</span>: <span class=hljs-built_in>require</span>(<span class=hljs-string>'../../../README.md'</span>) <span class=hljs-comment>// mardown格式的博客需要指定.md文件的路径</span>\n        }\n    },\n    <span class=hljs-attr>computed</span>: {\n        title () {\n            <span class=hljs-keyword>return</span> getArticleInfo(<span class=hljs-built_in>window</span>.location.href, articles)[<span class=hljs-number>0</span>]\n        }\n    },\n    mounted () {\n        <span class=hljs-comment>// 移除加载过程隐藏所有元素</span>\n        <span class=hljs-built_in>document</span>.body.classList.remove(<span class=hljs-string>'loading'</span>)\n    }\n})</code></pre> <p><code>ArticleRead.js</code>定义了文章详情的组件引用和模板布局，只需要在<code>slot</code>中填充<code>html</code>内容或者<code>mardowm</code>转化内容即可。一个标准的页面入口<code>html</code>文件如下：</p> <pre><code class=html><span class=xml><span class=hljs-meta>&lt;!doctype html&gt;</span>\n<span class=hljs-tag>&lt;<span class=hljs-name>html</span> <span class=hljs-attr>lang</span>=<span class=hljs-string>\"en\"</span>&gt;</span>\n<span class=hljs-tag>&lt;<span class=hljs-name>head</span>&gt;</span>\n    <span class=hljs-tag>&lt;<span class=hljs-name>meta</span> <span class=hljs-attr>charset</span>=<span class=hljs-string>\"UTF-8\"</span>&gt;</span>\n    <span class=hljs-tag>&lt;<span class=hljs-name>meta</span> <span class=hljs-attr>name</span>=<span class=hljs-string>\"viewport\"</span>\n          <span class=hljs-attr>content</span>=<span class=hljs-string>\"width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0\"</span>&gt;</span>\n    <span class=hljs-tag>&lt;<span class=hljs-name>meta</span> <span class=hljs-attr>http-equiv</span>=<span class=hljs-string>\"X-UA-Compatible\"</span> <span class=hljs-attr>content</span>=<span class=hljs-string>\"ie=edge\"</span>&gt;</span>\n    <span class=hljs-tag>&lt;<span class=hljs-name>title</span>&gt;</span>$</span><span class=hljs-template-variable>{htmlWebpackPlugin.options.title}</span><span class=xml><span class=hljs-tag>&lt;/<span class=hljs-name>title</span>&gt;</span>\n<span class=hljs-tag>&lt;/<span class=hljs-name>head</span>&gt;</span>\n<span class=hljs-tag>&lt;<span class=hljs-name>body</span> <span class=hljs-attr>class</span>=<span class=hljs-string>\"loading\"</span>&gt;</span>\n<span class=hljs-tag>&lt;<span class=hljs-name>section</span> <span class=hljs-attr>id</span>=<span class=hljs-string>\"base-panel__window\"</span>&gt;</span>\n    <span class=hljs-tag>&lt;<span class=hljs-name>article-read</span> <span class=hljs-attr>:title</span>=<span class=hljs-string>\"title\"</span>&gt;</span>\n        <span class=hljs-tag>&lt;<span class=hljs-name>slot</span>&gt;</span>\n            <span class=hljs-tag>&lt;<span class=hljs-name>div</span> <span class=hljs-attr>class</span>=<span class=hljs-string>\"markdown-format\"</span> <span class=hljs-attr>v-html</span>=<span class=hljs-string>\"html\"</span>&gt;</span><span class=hljs-tag>&lt;/<span class=hljs-name>div</span>&gt;</span>\n        <span class=hljs-tag>&lt;/<span class=hljs-name>slot</span>&gt;</span>\n    <span class=hljs-tag>&lt;/<span class=hljs-name>article-read</span>&gt;</span>\n<span class=hljs-tag>&lt;/<span class=hljs-name>section</span>&gt;</span>\n<span class=hljs-tag>&lt;/<span class=hljs-name>body</span>&gt;</span>\n<span class=hljs-tag>&lt;/<span class=hljs-name>html</span>&gt;</span></span></code></pre> <blockquote> <p>在<code>src&gt;tempalte</code>目录下分别定了2种类型的博客模板文件，复制重命名可以完成文档的创建。</p> </blockquote> <h4 id=发布>发布</h4> <p>执行命令<code>npm run build</code>，等待打包构建成功后把产出文件推送到github远程分支即可。</p> <h4 id=页面内容类型支持>页面内容类型支持</h4> <h5 id=html>html</h5> <p> 在<code>*.html</code>中编辑代码，自定义样式和效果即可。</p> <h5 id=mardown>mardown</h5> <p> 通过<code>markdown</code>语法快速编辑文章，通过<code>markdown-loader</code>转化讲代码添加到html模板文件中。</p> <h4 id=分类标签管理>分类标签管理</h4> <p> 配置文件：<code>src &gt; static &gt; labels.js</code></p> <p> 字段说明：</p> <pre><code class=javascript>     module<span class=hljs-selector-class>.exports</span> = [{\n         id: <span class=hljs-number>1004</span>,                       <span class=hljs-comment>// 唯一Id，会和文章列表关联</span>\n         <span class=hljs-selector-tag>label</span>: <span class=hljs-string>'webpack'</span>,               <span class=hljs-comment>// 显示的标签名</span>\n         <span class=hljs-attribute>color</span>: <span class=hljs-string>'rgba(16,58,177,.5)'</span>     // 标签的颜色色值[任何合法的色值标识方式均可]\n     }]</code></pre> <h4 id=用户信息配置说明>用户信息配置说明</h4> <p> 配置文件：<code>src &gt; data.js</code></p> <p> 字段说明：</p> <pre><code class=javascript>     module<span class=hljs-selector-class>.exports</span> = [{\n         id: <span class=hljs-number>1004</span>,                       <span class=hljs-comment>// 唯一Id，会和文章列表关联</span>\n         <span class=hljs-selector-tag>label</span>: <span class=hljs-string>'webpack'</span>,               <span class=hljs-comment>// 显示的标签名</span>\n         <span class=hljs-attribute>color</span>: <span class=hljs-string>'rgba(16,58,177,.5)'</span>     // 标签的颜色色值[任何合法的色值标识方式均可]\n     }]</code></pre> <h3 id=最终文件目录结构>最终文件目录结构</h3> <h4 id=页面目录>页面目录</h4> <pre><code class=text>  root\n  |<span class=hljs-string>---- dist                // webpack打包项目\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- assets           // 静态资源存放的位置\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- html             // html页面\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- index.html       // 页面的入口文件（开发环境） \n  </span>|<span class=hljs-string>---- node_modules\n  </span>|<span class=hljs-string>---- src                 // 开发源码位置\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- assets           // 静态资源位置\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- css           \n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- fonts\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- images\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- js            // 存放公用的js文件\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- components       // 公用的组件文件\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- pages            // 博客页面\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- index         // 每个页面独立一个文件夹，包含所有的模板文件、脚本、样式等\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>     </span>|<span class=hljs-string>---- index.js\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>     </span>|<span class=hljs-string>---- index.html\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>     </span>|<span class=hljs-string>---- index.css\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>     </span>|<span class=hljs-string>---- index.md   // 支持md语法，可以使用md编辑内容，如果用html自定义则可以无这个文件\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- static           // 静态\\模拟json数据\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- config.json        // 个人数据的配置信息：用户名，页面title等\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- data.js           // 博客页面数据集合，需手动维护\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- template\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- html          // html 类型博客模板\n  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>  </span>|<span class=hljs-string>---- markdown      // markdown 类型博客模板\n  </span>|<span class=hljs-string>---- .babelrc\n  </span>|<span class=hljs-string>---- .gitingnore\n  </span>|<span class=hljs-string>---- .stylelintrc\n  </span>|<span class=hljs-string>---- _config.yml\n  </span>|<span class=hljs-string>---- index.html          // * 由webpack打包成成，gitpage默认以这个文件为入口，见webpack.prod.js\n  </span>|<span class=hljs-string>---- package.json\n  </span>|<span class=hljs-string>---- postcss.config.json   // postcss 配置\n  </span>|<span class=hljs-string>---- README.md           // github 生成的md说明文件，项目说明\n  </span>|<span class=hljs-string>---- webpack.common.js\n  </span>|<span class=hljs-string>---- webbpack.dev.js\n  </span>|<span class=hljs-string>---- webpack.prod.js</span></code></pre> <h3 id=webpack命令说明>webpack命令说明</h3> <h4 id=开发调试>开发调试</h4> <pre><code class=ssh>npm <span class=hljs-keyword>run</span><span class=bash> start</span></code></pre> <p>默认路径指到<code>/dist</code>目录下，<code>webpack.dev.js</code>特别将入口<code>html</code>模板文件<code>index.html</code>生成到该目录下。</p> <h4 id=打包发布>打包发布</h4> <pre><code class=ssh>npm <span class=hljs-keyword>run</span><span class=bash> build</span></code></pre> <p>执行代码优化和压缩，产出文件到<code>/dist</code>目录下，同时额外讲<code>index.html</code>生成一份到项目根目录下，供Github Pages 查找到首页。</p> <h4 id=postcss配置>postcss配置</h4> <pre><code class=javascript>module.exports = {\n    <span class=hljs-symbol>parser:</span> <span class=hljs-string>'postcss-scss'</span>,     <span class=hljs-regexp>//</span> css内scss语法支持\n    <span class=hljs-symbol>plugins:</span> [\n        <span class=hljs-keyword>require</span>(<span class=hljs-string>'postcss-import'</span>),  <span class=hljs-regexp>//</span> css文件内支持<span class=hljs-variable>@import</span>导入其他样式\n        <span class=hljs-keyword>require</span>(<span class=hljs-string>'precss'</span>),\n        <span class=hljs-keyword>require</span>(<span class=hljs-string>'autoprefixer'</span>)({   <span class=hljs-regexp>//</span> css3属性添加私有样式前缀\n            <span class=hljs-symbol>browsers:</span> [<span class=hljs-string>'last 5 versions'</span>]\n        })\n    ]\n\n}</code></pre> <h4 id=文件输出>文件输出</h4> <ul> <li>公用样式输出为<code>common.hash.css</code>，页面样式单独输出样式文件为<code>name.hash.css</code>；</li> <li>公用的脚本被分割为<code>common.hash.js</code>，页面脚本单独输出样式文件为<code>name.hash.js</code>;</li> <li>图片字体文件体积小的直接转成<code>base64</code>为数据替换到代码中，其他输出到<code>dist/assets/**/*</code>中;</li> <li><code>src/static</code>中的文件经过相关处理后输出到<code>dist/assets/static/</code>下；</li> </ul> <h3 id=todo>TODO</h3> <p> -[x] mardomn 代码高亮; -[ ] todo list支持； -[ ] cli 命令支持 </p> "}});
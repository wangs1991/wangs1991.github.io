## Welcome to GitHub Pages
> vue 多页面应用构建的[Github Blog](https://wangs1991.github.io/).
## 思路
> gitpage是github提供给开发者的个人域名，指到个人用户名下面。很多开发者利用gitpage结合博客模板工具搭建了个人博客。
我按照网络文章指导利用gitpage+hexo搭建博客，在创建之后总感觉主题不是很喜欢，如果自定义样式的话又需要了解模板语法，如果想要`JavaScript`相关的效果有比较麻烦（这些纯属意淫，实际实践步骤仅仅是本地创建页面运行服务浏览报错就放弃了模板工具）。
分析发现gitpage的主页指向的项目根目录的`index.html`，其他页面的路径只需要通过该页面提供入口就能组织好博客页面间的跳转关系。
so要自己实现一个博客模板工具的话只需要可以自动把子页的链接以及标题放到根目录的入口页面，然后简单操作就能发布更新就ok了。基本思路有了，刚好手头时间又比较充裕，就有了用`webpack`自己配置搭建一个博客模板的想法。总结需要解决的问题如下：

* 首页自动生成子页入口链接
* 基础主题样式提供
* 文章创建简单方便
* markdown语法支持
* 博客的发布更新方便

### 文章数据集合
通过一个数组记录全部文章数据。基本数据格式如下：
```javascript
[{
    typeId: 1003,
    type: '日常总结',
    keywords: ['博客搭建过程'],
    script: true,
    name: '记录依赖GitHub搭建博客的过程',
    uri: 'blog-build.html',
    date: '2019-01-28'
},
...
]
```
这个数据做承载的使命还是挺多的：
- 生成首页列表提供文章的入口链接；
- `webpack`生成多页面的配置数据；
- 页面模板标题数据的来源；

#### 组织文件目录
预期的目录结构如下，分离源码和产出文件夹。
```text
 root
  |---- dist                // webpack构建产出的项目
  |  |---- assets           // 静态资源存放的位置
  |  |---- html             // html页面
  |---- node_modules
  |---- src                 // 开发源码位置
  |  |---- assets           // 静态资源位置
  |  |  |---- css           
  |  |  |---- fonts
  |  |  |---- images
  |  |  |---- js            // 存放公用的js文件
  |  |---- components       // 公用的组件文件
  |  |---- pages            // 博客页面
  |  |  |---- index         // 每个页面独立一个文件夹，包含所有的模板文件、脚本、样式等
  |  |     |---- index.js
  |  |     |---- index.html
  |  |     |---- index.css
  |  |     |---- index.md   // 支持md语法，可以使用md编辑内容，如果用html自定义则可以无这个文件
  |  |---- static           // 静态/模拟json数据
  |  |---- config.js        // 个人数据的配置信息：用户名，页面title等
  |  |---- data.js           // 博客页面数据集合，需手动维护
  |---- .babelrc
  |---- .gitingnore
  |---- .stylelintrc
  |---- _config.yml
  |---- index.html          // gitpage 指向首页
  |---- package.json
  |---- postcss.config.js   // postcss 配置
  |---- README.md           // github 生成的md说明文件，项目说明
  |---- webpack.common.js
  |---- webbpack.dev.js
  |---- webpack.prod.js
```
#### webpack基本配置
`webpack`配置中通过`data.js`的遍历指定每个页面入口`js`位置。同时通过这个数据还指定了每个页面的`html`模板文件。
```javascript
module.exports = {
    entry: (function () {
        let ret = {
            app: './src/pages/index/index.js' // index.html 中 index.js 的入口文件
        }
        let chunk

        // 根据页面数据遍历js入口的集合
        pages.filter(n => {
            return !!n.script
        }).forEach(n => {
            chunk = n.uri.split('.')[0]

            ret[chunk] = __dirname + '/src/pages/' + chunk + '/' + chunk + '.js'
        })

        return ret // 返回多个页面入口
    })(),
    output: {
        filename: "assets/js/[name].[hash].js",    // js文件输出到dist/script/name.hash.js
        path: path.resolve(__dirname, './dist/')
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: __dirname + '/dist/index.html', // 生成html到指定位置
            template: __dirname + "/src/pages/index/index.html", // 模板文件
            title: Info.title,
            description: Info.description,
            chunks: ['common', 'app'],
            minify: {
                removeComments: true,//删除注释
                collapseWhitespace: true//删除空格
            }
        }),
        ...(function () { // 匿名自执行方法遍历页面数据，生成到模块的html文件到dist/html/[name]/name.html
            let ret = []
            let folder
            // let exec = /\.html/

            pages.forEach(n => {
                folder = n.uri.split('.')[0]

                ret.push(new HtmlWebpackPlugin({
                    filename: __dirname + '/dist/html/' + n.uri,
                    template: __dirname + '/src/pages/' + folder + '/' + n.uri,
                    title: (function () {
                        return n.name + ' | ' + Info.title  // 动态更改页面的title属性值
                    })(),
                    description: Info.description,
                    chunks: ['common', folder],
                    minify:
                        {
                            removeComments: true,//删除注释
                            collapseWhitespace:
                                true//删除空格
                        }
                }))
            })

            return ret
        })()
    ]
}
```

### 开发环境和生产环境的差异化配置
相对于开发环境，生产环境需要对代码进行的优化操作比较多，其中包括代码的分隔、压缩与hash命名、css处理。对于这个项目还有一个坑，对开发环境指定的根目录是在`dist`下：
```javascript
    ...
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        host: '0.0.0.0',
        port: 8090,
        contentBase: ['./dist'],
        inline: true,
        hot: true
    }
    ....
```
但是gitpage引用的首页`index.html`是位于项目根目录下的，这就需要在分别在根目录和`dist`目录下分别生成一个`index.html`。
```javascript
// webpack.dev.js
    plugins: [
        new HtmlWebpackPlugin({
            filename: __dirname + '/dist/index.html', // 生成html到指定位置
            template: __dirname + "/src/pages/index/index.html", // 模板文件
            title: Info.title,
            description: Info.description,
            chunks: ['common', 'app'],
            minify: {
                removeComments: true,//删除注释
                collapseWhitespace: true//删除空格
            }
        }),
        ...
    ]
// webpack.prod.js
    plugins: [
        new HtmlWebpackPlugin({
            filename: __dirname + '/index.html', // 生成html到指定位置
            template: __dirname + "/src/pages/index/index.html", // 模板文件
            title: Info.title,
            description: Info.description,
            chunks: ['common', 'app'],
            minify: {
                removeComments: true,//删除注释
                collapseWhitespace: true//删除空格
            }
        }),
        ...
    ]
```
### 主题样式
默认引入的是github的文档样式。同时内置了一部分组件样式。

#### 内置组件
##### 公用头部 `titleHeader`

 + 自动读取labels的分类数据填充到头部滚动分类栏；
 + 根据地址栏数据自动选中当前分类；
 + 点击分类项，筛选列表数据；
 + 头像应用`src > assets > images > avator.jpg`文件；
 
 ##### 文章信息栏 `articleTitle`
 
  + 头像应用`src > assets > images > avator.jpg`文件；
  + 文章对应的数据标签和关键字展示；
  
  ##### 文章详情阅读 `ArticleRead`
   
   + 默认文章详情的展示视图；
   + 必要参数`data="title"`，应用于`articleTitle`组件；   


### 文章的创建与发布
#### 创建
在`pages`目录下创建一个文件夹命名为`readme`，位于该文件夹下创建一个同名的`readme.html`，同时相关的资源比如css、js、md都位于这个文件夹下。为了能在`index.html`中的列表中添加页面的入口，在`data.js`中添加数据，重启`npm run start`就完成了页面的新增。

`readme.js`主要负责创建并挂在vue应用，从而渲染公用的组件和依赖的数据。`md`类型的文件需要显式的指定路径到`readme.js > data.html`中，经过`mardown-loader`会被转化成`html`串放到指定位置。一个标准的页面入口`JavaScript`文件如下：
```javascript
import init from '../../assets/js/initial'  // 页面的初始化操作
import {getArticleInfo} from '../../assets/js/Utils' // 根据地址去查找文章在类表中定义的数据信息
import '../../components/ArticleRead'   // 公用的布局模板
import articles from '../../map'    // 文章列表定义的数据信息

const vue = init() // 完成页面的初始化操作并返回vue构建函数的引用

export default new vue({
    el: '#base-panel__window',
    name: 'README',
    data () {
        return {
            html: require('../../../README.md') // mardown格式的博客需要指定.md文件的路径
        }
    },
    computed: {
        title () {
            return getArticleInfo(window.location.href, articles)[0]
        }
    },
    mounted () {
        // 移除加载过程隐藏所有元素
        document.body.classList.remove('loading')
    }
})
```

`ArticleRead.js`定义了文章详情的组件引用和模板布局，只需要在`slot`中填充`html`内容或者`mardowm`转化内容即可。一个标准的页面入口`html`文件如下：
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${htmlWebpackPlugin.options.title}</title>
</head>
<body class="loading">
<section id="base-panel__window">
    <article-read :title="title">
        <slot>
            <div class="markdown-format" v-html="html"></div>
        </slot>
    </article-read>
</section>
</body>
</html>
```
> 在`src>tempalte`目录下分别定了2种类型的博客模板文件，复制重命名可以完成文档的创建。

#### 发布
执行命令`npm run build`，等待打包构建成功后把产出文件推送到github远程分支即可。

#### 页面内容类型支持
 ##### html
 在`*.html`中编辑代码，自定义样式和效果即可。
 ##### mardown
 通过`markdown`语法快速编辑文章，通过`markdown-loader`转化讲代码添加到html模板文件中。
 
 #### 分类标签管理
 配置文件：`src > static > labels.js`
 
 字段说明：
 ```javascript
     module.exports = [{
         id: 1004,                       // 唯一Id，会和文章列表关联
         label: 'webpack',               // 显示的标签名
         color: 'rgba(16,58,177,.5)'     // 标签的颜色色值[任何合法的色值标识方式均可]
     }]
 ```
 
 #### 用户信息配置说明
 配置文件：`src > data.js`
 
 字段说明：
 ```javascript
     module.exports = [{
         id: 1004,                       // 唯一Id，会和文章列表关联
         label: 'webpack',               // 显示的标签名
         color: 'rgba(16,58,177,.5)'     // 标签的颜色色值[任何合法的色值标识方式均可]
     }]
 ```

### 最终文件目录结构

#### 页面目录
```text
  root
  |---- dist                // webpack打包项目
  |  |---- assets           // 静态资源存放的位置
  |  |---- html             // html页面
  |  |---- index.html       // 页面的入口文件（开发环境） 
  |---- node_modules
  |---- src                 // 开发源码位置
  |  |---- assets           // 静态资源位置
  |  |  |---- css           
  |  |  |---- fonts
  |  |  |---- images
  |  |  |---- js            // 存放公用的js文件
  |  |---- components       // 公用的组件文件
  |  |---- pages            // 博客页面
  |  |  |---- index         // 每个页面独立一个文件夹，包含所有的模板文件、脚本、样式等
  |  |     |---- index.js
  |  |     |---- index.html
  |  |     |---- index.css
  |  |     |---- index.md   // 支持md语法，可以使用md编辑内容，如果用html自定义则可以无这个文件
  |  |---- static           // 静态\模拟json数据
  |  |---- config.js        // 个人数据的配置信息：用户名，页面title等
  |  |---- data.js           // 博客页面数据集合，需手动维护
  |  |---- template
  |  |  |---- html          // html 类型博客模板
  |  |  |---- markdown      // markdown 类型博客模板
  |---- .babelrc
  |---- .gitingnore
  |---- .stylelintrc
  |---- _config.yml
  |---- index.html          // * 由webpack打包成成，gitpage默认以这个文件为入口，见webpack.prod.js
  |---- package.json
  |---- postcss.config.js   // postcss 配置
  |---- README.md           // github 生成的md说明文件，项目说明
  |---- webpack.common.js
  |---- webbpack.dev.js
  |---- webpack.prod.js
```



### webpack命令说明
#### 开发调试 
```ssh
npm run start
```
默认路径指到`/dist`目录下，`webpack.dev.js`特别将入口`html`模板文件`index.html`生成到该目录下。
#### 打包发布
```ssh
npm run build
```
执行代码优化和压缩，产出文件到`/dist`目录下，同时额外讲`index.html`生成一份到项目根目录下，供Github Pages 查找到首页。
    
#### postcss配置
```javascript
module.exports = {
    parser: 'postcss-scss',     // css内scss语法支持
    plugins: [
        require('postcss-import'),  // css文件内支持@import导入其他样式
        require('precss'),
        require('autoprefixer')({   // css3属性添加私有样式前缀
            browsers: ['last 5 versions']
        })
    ]

}
```

#### 文件输出
 + 公用样式输出为`common.hash.css`，页面样式单独输出样式文件为`name.hash.css`；
 + 公用的脚本被分割为`common.hash.js`，页面脚本单独输出样式文件为`name.hash.js`;
 + 图片字体文件体积小的直接转成`base64`为数据替换到代码中，其他输出到`dist/assets/**/*`中;
 + `src/static`中的文件经过相关处理后输出到`dist/assets/static/`下；
 
 
### TODO
 -[x] mardomn 代码高亮;
 -[ ] todo list支持；
 -[ ] cli 命令支持 
## Welcome to GitHub Pages
> vue 多页面应用构建的[Github Blog](https://wangs1991.github.io/).
### 文件目录结构

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
  |  |---- map.js           // 博客页面数据集合，需手动维护
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
配置文件：`src > map.js`

字段说明：
```javascript
    module.exports = [{
        id: 1004,                       // 唯一Id，会和文章列表关联
        label: 'webpack',               // 显示的标签名
        color: 'rgba(16,58,177,.5)'     // 标签的颜色色值[任何合法的色值标识方式均可]
    }]
```

### 文章的创建与发布
#### 创建
在`pages`目录下创建一个文件夹命名为`readme`，位于该文件夹下创建一个同名的`readme.html`，同时相关的资源比如css、js、md都位于这个文件夹下。为了能在`index.html`中的列表中添加页面的入口，在map.js中添加数据，重启`npm run start`就完成了页面的新增。

`readme.js`主要负责创建并挂在vue应用，从而渲染公用的组件和依赖的数据。`md`类型的文件需要显式的指定路径到`app.data.html`中，经过`mardown-loader`会被转化成`html`串放到指定位置。一个标准的页面入口`JavaScript`文件如下：
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
#### 发布
执行命令`npm run build`，等待打包构建成功后把产出文件推送到github远程分支即可。

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


#### 页面内容类型支持
 ##### html
 在`*.html`中编辑代码，自定义样式和效果即可。
 ##### mardown
 通过`markdown`语法快速编辑文章，通过`markdown-loader`转化讲代码添加到html模板文件中。
 
 
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


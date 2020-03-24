## webpack 配置多页面博客系统
> 依靠webpack打包能力，构建的vue多页面应用构建的[Github Blog](https://wangs1991.github.io/).

### 思路
> `gitpage`是`github`提供给开发者的个人域名，指到个人用户名下面。很多开发者利用gitpage结合博客模板工具搭建了个人博客。
我按照网络文章指导利用gitpage+hexo搭建博客，在创建之后总感觉主题不是很喜欢，如果自定义样式的话又需要了解模板语法，如果想要`JavaScript`相关的效果有比较麻烦（这些纯属臆想，实际实践步骤仅仅是本地创建页面运行服务浏览报错就放弃了模板工具）。
分析发现gitpage的主页指向的项目根目录的`index.html`，其他页面的路径只需要通过该页面提供入口就能组织好博客页面间的跳转关系。
so要自己实现一个博客模板工具的话只需要可以自动把子页的链接以及标题放到根目录的入口页面，然后简单操作就能发布更新就ok了。基本思路有了，刚好手头时间又比较充裕，就有了用`webpack`自己配置搭建一个博客模板的想法。总结需要解决的问题如下：

* 首页自动生成文章列表并提供链接查看详情
* 基础主题样式提供
* 文章创建简单方便
* markdown语法支持
* 博客的发布更新方便

### 组织文件目录
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
  |  |---- libs             // 组件类文章对应的文档资源
  |  |  |---- lib
  |  |  |   | lib.js        // *必需* 组件源码类文件
  |  |  |   | lib.markdown  // *必需* 相关文档说明
  |  |  |   | config.json   // *必需* 组建信息配置
  |  |---- pages            // 博客页面
  |  |  |---- index         // 每个页面独立一个文件夹，包含所有的模板文件、脚本、样式等
  |  |     |---- index.js   // *必需* 和文件夹同名的js文件作为页面打包的入口
  |  |     |---- index.html // *可选* 和文件夹同名的html文件作为页面模板，如果不提供会根据是否当前文件夹是否存在.md文档判断文章类型，以 src/template/(html|markdown)/template.html作为页面模板
  |  |     |---- index.css  // *可选* 页面的特殊样式
  |  |     |---- index.md   // *可选* 支持md语法，可以使用md编辑内容
  |  |---- static           // 标签分类等信息的数据 （*.js）
  |  |  |---- labels.js     // 个人数据的配置信息：用户名，页面title等
  |  |---- template         // 文章模板，· 复制可快速创建文章结构文件，· 在文章模板缺少时作为公用模板渲染页面
  |  |  |---- html          
  |  |  |  |---- config.json
  |  |  |  |---- template.html
  |  |  |  |---- template.js
  |  |  |---- markdown
  |  |  |  |---- config.json
  |  |  |  |---- markdown.html
  |  |  |  |---- template.html
  |  |  |  |---- template.js
  |  |---- config.js        // 站点博客信息配置
  |  |---- data.json        // 全部文档的列表数据，webpack依据src/pages下目录结构以及对应子文件夹下的config.json文件自动生成，用来生成首页列表数据
  |---- .babelrc
  |---- .gitingnore
  |---- .stylelintignore
  |---- .stylelintrc
  |---- _config.yml
  |---- generate.js         // node 读取检索文件结构，
  |---- index.html          // gitpage 指向首页
  |---- package.json
  |---- postcss.config.json   // postcss 配置
  |---- README.md           // github 生成的md说明文件，项目说明
  |---- utils.js
  |---- webpack.common.js
  |---- webbpack.dev.js
  |---- webpack.prod.js
```
### 配置说明
#### 数据自动生成配置
主页列表需要展示全部的文章列表，因而需要一个完整的数据依赖。如果每次创建和删除一篇文章都需要手动维护这个整体数据的话，会增加一个额外的负担，无法将精力完整的投入到文章的创作与记录中。node提供了文件的读写能力，如果可以借助这个能力实现文章数据的自动拼接组合就可以减少数据维护的负担。

通过`fs`模块读取`pages`目录下的所有文件，筛选出`config.json`文件并读取数其中的内容，组装所有互数据并生成`src/data.json`文件，这样就解决了整个文章的查找与数据依赖维护的问题。

此外，`github`主页可以展示整体的文章列表，借助这个数据可以写出`readme..md`文件到根目录下。相关的执行代码在文件`./generate.js`中。

#### webpack配置 
除了配置不同类型文件的相关`loader`之外，一个多页面的`webpack`配置无非就是指定多个`javascript`的入口文件和对应的页面模板。

由于页面数量以及页面名称的可变性，能够实现自动查找是最理想的情况了。同样利用`fs`模块，检索`pages`文件夹下的文件，通过查找同文件夹下存在的文件类型，判断文章博客可能的书写类型是`mardown`笔记还是自定的`html`页面。并且通过判断同目录下是否有`html`文件判断当前的文章是否设置的自定义的模板文档，如果无则设置文档的默认模板是`src/tempalte/(html|markdwon)/tempalte.html`。

如何文件和模板计算判断的关键性代码如下：
```javascript
module.exports = {
    /*
    * 通过自执行匿名方法，计算多入口文件
    * 主入口设置成 app.js
    * 其他页面入口根据页面名称动态定义
    * */
    entry: (function () {
        let ret = {}
        let chunk

        ret.app = './src/pages/index/index.js' // 设置主入口文件是app.js

        pages.filter(n => {
            return /\.js$/.test(n)  // 过滤读取到的pages目录下的所有文件中后缀名为.js的文件
        }).forEach(n => {
            chunk = n.split('\\').pop().split('.').shift()  // 通过路径读取到文件名称

            ret[chunk] = './' + n   // 设置相关的入口文件
        })

        return ret // 返回多个页面入口
    })(),
    output: {
        filename: "assets/js/[name].[hash].js",    // js文件输出到dist/script/name.hash.js
        path: path.resolve(__dirname, './dist/')
    },
    plugins: [
       /*
        * 匿名自执行方法遍历页面数据，生成到模块的html文件到dist/html/[name]/name.html
        * 判断逻辑：判断pages下某个子目录中是否存在html文件：
        *     如果存在该文件为页面的模板文件；
        *     如果不存在在判断该目录下是否存在md文件：
        *           如果存在那么设置模板文件为template/mardown/template.html;
        *           如果不存在那么设置模板文件为template/html/template.html;
        * */
        ...(function () {
            let ret = []
            let name
            let folder
            let filterRes
            let cache

            /*
            * 过滤获取pages下后缀名为.js、.html、.md的文件
            * */
            filterRes = pages.filter(n => {
                let tmp
                let folder

                tmp = n.split('\\')
                tmp.pop()
                folder = tmp.pop()

                return new RegExp(folder + '\.html$').test(n) 
                        || new RegExp(folder + '\.js$').test(n) 
                        || /.md$/.test(n)

            })

            cache = {}
            filterRes.forEach((n, i) => {
                let tmp = n.split('\\')
                let tmpFilterRes
                let template
                let tpmFolder
                name = tmp.pop()
                folder = tmp.pop()

                /*
                * 通过cache变量缓存目录数据，和目录下的文件名称
                * 通过文件路径读取到目录名，和缓存的目录进行比较
                * 如果当前目录和缓存的目录不同，或者已经读取到最后一个文件了
                *   那么可以确认某一个文件夹下的所有文件
                *       再在目录文件中一次查找html文件md文件，完成模板文件的指定
                * */
                cache[folder] = cache[folder] || []
                cache[folder].push(n)

                if (!((cache.preFolder === undefined 
                        || cache.preFolder === folder) 
                        && i < filterRes.length - 1)) {

                    tpmFolder = (i === filterRes.length - 1) ? 
                        folder: cache.preFolder

                    tmpFilterRes = cache[tpmFolder].filter(n => /.html$/.test(n))
                    if (tmpFilterRes.length > 0) {
                        template = tmpFilterRes[0]
                    } else {
                        tmpFilterRes = cache[tpmFolder].filter(n => /.md/.test(n))
                        template = tmpFilterRes.length > 0 ? 
                            __dirname + '/src/template/markdown/template.html'
                            : __dirname + '/src/template/html/template.html'
                    }

                    ret.push(new HtmlWebpackPlugin({
                        filename: __dirname + '/dist/html/' + tpmFolder + '.html',  // 设置输出的html文件位置
                        template: template,     // 设置模板文件
                        title: (function () {
                            if (tpmFolder === 'index') {
                                return ''
                            }
                            let config = utils.getFileContent('./src/pages/' + tpmFolder + '/config.json')

                            return config.name + ' | ' + Info.title  // 动态计算html的title属性
                        })(),
                        description: Info.description,  // 动态计算html的description属性
                        chunks: ['common', tpmFolder],
                        minify:
                            {
                                removeComments: true,//删除注释
                                collapseWhitespace:
                                    true//删除空格
                            }
                    }))
                }
                cache.preFolder = folder
            })
            return ret
        })()
    ]
}
```

#### 开发环境和生产环境的差异化配置
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

### 固定数据格式说明

#### config.json
    每篇文章是位于`pages`下的一个子目录，里面的`config.json`是一个特别重要的文件，格式如下：
```javascript
{
  "typeId": 1000,       // Int: 标签id
  "type": "功能测试",    // String: 标签名称
  "keywords": [],       // Array: 关键字
  "script": true,       // Boolean: 预留字段，非必须
  "title": "个人信息",   // String: 文章的标题
  "uri": "about.html",  // String: 页面的相对路径uri
  "date": "2019-01-26", // String: 发布日期
  "isPrivate": true     // Boolean: 是否公开发布
}
```
    配置文件的几个作用：
    * webpack会查找该文件生成data.json，用来生成列表主页以及数据搜索
    * webpack生成html时注入页面title使用

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
 #### config.js 站点配置
    文件配置了整站的信息，位于`src/config`。

```javascript
module.exports = {
    nickname: '网站名字',
    description: '类签名简单描述',
    title: '页面title注入值',
    host: 'gitpage访问路径'
}
```
 
### 文章的创建与发布

#### 创建
    说明： 创建页面后需要重启`webpack`，刷新页面就可以看到新的页面数据。
##### html

   直接拷贝`src/template/html`文件夹重命名文件夹、`.js`、`.html`文件即可。
   如果是单纯的文档记录，建议创建`mardown`类型，如果需要页面需要自己定制结构以及样式，或者做效果展示可以创建该类型文章。自己写`js`以及`css`完全自由，没有任何限制。
    
    > 说明: 如果需要和其他页面保持同样的结构样式，只需要把写入的新内容全部放到`slot`标签中。
    
##### markdown

   直接拷贝`src/template/markdown`文件夹重命名文件夹、`.js`、`.html`文件即可。
    如果不保留`html`文件`webpack`会默认`src/template/markdown/template.html`为模板文件。如果没有特殊修改，建议不创建该文件使用默认模板，对于后期修改布局的需求比较容易满足，否则需要修改多个`html`文件。
    
   当然，你也可以自定义样式文件，这里没有任何限制。
   
##### componets doc

   系统以一篇文章的形式定义了组件文档的格式，文件位于`src/pages/libs-gather/*`，展示的组件数据来自`src/libs/`。
   和页面的计算规则一样，`webpack`查找每个`libs`下每个文件夹下的`config.json`来组装`data.js`，从而提供了组件的列表数据来源。该目录下的`.md`文件是组件文档，`browser`可以理解为组件的源文件，`config.json`的字段及其作用说明如下：
   
```javascript
{
  "title": "浏览器、平台版本检测",    // 组件标题
  "uri": "https://github.com/wangs1991/wangs1991.github.io/blob/master/src/libs/browser/browser.js",    // 组件在服务器上的下载地址
  "doc": "../libs/browser/browser.md"   // 说明文档文件地址
}
```
    说明： 组件样式定义在`src/components/LibItem.js`中，定义了交互样式。
   
#### 发布
执行命令`npm run build`，等待打包构建成功后把产出文件推送到github远程分支即可。 
 
### 主题样式

 文档样式采用的是github的文档样式。
 
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
    
  ##### goTop组件 `goTop`
    
    + 返回顶部

  ##### 组件展示 `LibItem`
  
  + 组件信息展示
  + 组件文档展示

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
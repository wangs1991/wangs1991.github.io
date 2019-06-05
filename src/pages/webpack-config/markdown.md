### Q: webpack如何配置文件资源通过`cdn`加载？

> 图片体积很大，生产环境需要加载`cdn`资源替换文件路径如何进行配置？

    A: 视情况添加`publicPath`配置 @中秋献礼H5页面
    
- 全局替换

```javascript
    webpcak.config.output = {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'http://***.com'
    }
```
- 局部资源替换

```javascript
    webpcak.config.module.rules = [{
        test: /(bg-0\.gif)$/,
        loader: 'file-loader',
        options: {
            name: 'df1f439a93e6e6433a9f2d4bfcb2bf25.gif',
            publicPath: 'https://mail.fengtuchina.com/'
        }
    }]
```

### Q: webpack打包文件体积过大怎么办？

> 一个项目引入很多第三方类，造成打包的`vendor`文件体积过大，验证影响页面加载。
    
    A: 禁用第三方组件被`webpack`打包使用第三方`cdn`加载。@当代置业培训
    
- 在`index.html`中引入第三方资源；

```html
<!--引入vue-->
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
```
- 在`webpack`配置中增加外部库声明

```javascript
webpack.config.externals = {
    'vue': 'Vue',
    "node_module 包名": 'cdn包在window全局对象上注册的名字'
}
```

### Q: 公用scss声明的方法和变量想要在vue组件中使用，每个都需要引入，有没有统一注入的方法[vue cli生成的webpack项目]？

> scss公用方法和变量在文件中统一声明，在组件中定义样式时总是不能直接使用已经声明的变量，需要显示的导入相关的文件，很繁琐。有没有自动注如的方法代替手工引入。

    A: `build/utils.js`中修改配置，增加 `sass-resources-loader`，动态写入公用变量。@当代置业培训
    
```javascript
exports.cssLoaders = function (options) {
    // ...
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', { indentedSyntax: true }),
        scss: generateLoaders('sass').concat(
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [path.resolve(__dirname, '../src/assets/styles/mixins.scss')]  //注意自己的文件路径
            }
          }
        ),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
      }
}
```


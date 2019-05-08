const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const StylelintWebpackPlugin = require('stylelint-webpack-plugin')
const webpack = require('webpack')
const marked = require('marked')
const renderer = new marked.Renderer()
const utils = require('./utils')
const Info = require('./src/config')

const htmlReg = /\.html$/
const jsReg = /\.js$/
const pages = utils.getJsonFiles('src/pages')// 多页面配置新数据

function resolve(dir) {
    return path.join(__dirname, dir)
}

console.log('==============================================')
console.log(process.env.NODE_ENV)
console.log('==============================================')

;(function () {
    /*自动生成页面相关的文件*/
    let jsonfyPage = utils.getPagesJson(pages)

    /*自动生成data文件*/
    utils.writeFile('./src/data.json', (function () {

        console.log('--------------------------------------')
        console.log('/    ', '总共检索到' + jsonfyPage.length + '条文章', '     /')
        console.log('--------------------------------------')

        return JSON.stringify(jsonfyPage.filter(n => !n.isPrivate))
    })())


    /*自动生成readme文件*/
    utils.writeFile('README.md', (function () {
        let string

        string = []
        string.push('### 目录')
        string.push('+ [首页]('+ Info.host +')')

        jsonfyPage.forEach(n => {
            if (!n.isPrivate) {
                string.push('+ ['+ n.name +']('+ Info.host + n.uri +')')
            }
        })

        console.log('--------------------------------------')
        console.log('/    ', 'readme.md目录生成成功', '     /')
        console.log('--------------------------------------')

        return string.join('\n')
    })())
})();

;(function () {
    /*自动生成组件库列表相关的文件*/
    const libs = utils.getJsonFiles('src/libs')
    let jsonfyPage = utils.getPagesJson(libs)
    var regExp = /(\"doc\"):(\"[0-9a-zA-Z\.\/]*\")/ig

    /*自动生成data文件*/
    utils.writeFile('./src/libs/data.js', (function () {
        let context = 'module.exports = '

        context += JSON.stringify(jsonfyPage.filter(n => {
            if (!n.doc) {
                n.doc = "../libs/help.md"
            }
            return !n.isPrivate
        }))

        console.log('--------------------------------------')
        console.log('/    ', '总共检测到组件类' + jsonfyPage.length + '个', '     /')
        console.log('--------------------------------------')

        return context.replace(regExp, '$1: require($2)')
    })())
})();

module.exports = {
    entry: (function () {
        let ret = {}
        let chunk

        ret.app = './src/pages/index/index.js'

        pages.filter(n => {
            return jsReg.test(n)
        }).forEach(n => {
            chunk = n.split('\\').pop().split('.').shift()

            ret[chunk] = './' + n
        })

        return ret // 返回多个页面入口
    })(),
    output: {
        filename: "assets/js/[name].[hash].js",    // js文件输出到dist/script/name.hash.js
        path: path.resolve(__dirname, './dist/')
    },
    resolve: {
        alias: {
            '@': resolve('src')
        }
    },
    plugins: [
        ...(function () { // 匿名自执行方法遍历页面数据，生成到模块的html文件到dist/html/[name]/name.html
            let ret = []
            let name
            let folder

            pages.filter(n => {
                return htmlReg.test(n)
            }).forEach(n => {
                let tmp = n.split('\\')

                name = tmp.pop()
                folder = tmp.pop()

                ret.push(new HtmlWebpackPlugin({
                    filename: __dirname + '/dist/html/' + name,
                    template: n,
                    title: (function () {
                        if (folder === 'index') {
                            return ''
                        }
                        let config = utils.getFileContent('./src/pages/' + folder + '/config.json')

                        return config.name + ' | ' + Info.title
                    })(),
                    description: Info.description,
                    chunks: ['common', name.split('.').shift()],
                    minify:
                        {
                            removeComments: true,//删除注释
                            collapseWhitespace:
                                true//删除空格
                        }
                }))
            })
            return ret
        })(),
        new StylelintWebpackPlugin({
            context: 'src',
            configFile: path.resolve(__dirname, './.stylelintrc'),
            failOnError: true,
            lintDirtyModulesOnly: true,
            syntax: 'scss'
        })
    ],
    module: {
        rules: [
            {
                test: /\.md$/,
                use: [
                    {
                        loader: "html-loader"
                    },
                    {
                        loader: "markdown-loader",
                        options: {
                            langPrefix: '',
                            renderer: renderer,
                            highlight: function (code) {
                                return require('highlight.js').highlightAuto(code).value;
                            },
                            pedantic: false,
                            gfm: true,
                            tables: true,
                            breaks: false,
                            sanitize: false,
                            smartLists: true,
                            smartypants: true,
                            xhtml: false
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                    }
                ],
                exclude: /node_modules/,
                include: [resolve('src')] // 所有的js用babel转码到es5标准，指定包含全部的用户js路径
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    }, {
                        loader: 'postcss-loader'
                    }
                ],
                exclude: [resolve('node_modules')] // 所有的js用babel转码到es5标准，指定包含全部的用户js路径
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: function () {
                        if (process.env.NODE_ENV === 'production') {
                            return '/assets/images/[name].[hash:7].[ext]'
                        } else {
                            return '/assets/images/[name].[hash:7].[ext]'
                        }
                    }
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: function () {
                        if (process.env.NODE_ENV === 'production') {
                            return '/assets/fonts/[name].[hash:7].[ext]'
                        } else {
                            return '/assets/fonts/[name].[hash:7].[ext]'
                        }
                    }
                }
            }
        ]
    }
}
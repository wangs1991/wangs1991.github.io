const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const StylelintWebpackPlugin = require('stylelint-webpack-plugin')
const webpack = require('webpack')
const marked = require('marked')
const renderer = new marked.Renderer()
const utils = require('./utils')
const Info = require('./src/config')
const generate = require('./generate')

const pages = utils.getJsonFiles('src/pages')// 多页面配置新数据

function resolve(dir) {
    return path.join(__dirname, dir)
}

console.log('==============================================')
console.log(process.env.NODE_ENV)
console.log('==============================================')

generate.exec();

module.exports = {
    entry: (function () {
        let ret = {}
        let chunk

        ret.app = './src/pages/index/index.js'

        pages.filter(n => {
            return /\.js$/.test(n)
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
            let filterRes
            let cache

            filterRes = pages.filter(n => {
                let tmp
                let folder

                tmp = n.split('\\')
                tmp.pop()
                folder = tmp.pop()

                return new RegExp(folder + '\.html$').test(n) || new RegExp(folder + '\.js$').test(n) || /.md$/.test(n)

            })

            cache = {}
            filterRes.forEach((n, i) => {
                let tmp = n.split('\\')
                let tmpFilterRes
                let template
                let tpmFolder
                name = tmp.pop()
                folder = tmp.pop()

                cache[folder] = cache[folder] || []
                cache[folder].push(n)

                if (!((cache.preFolder === undefined || cache.preFolder === folder) && i < filterRes.length - 1)) {

                    tpmFolder = (i === filterRes.length - 1) ? folder: cache.preFolder

                    tmpFilterRes = cache[tpmFolder].filter(n => /.html$/.test(n))
                    if (tmpFilterRes.length > 0) {
                        template = tmpFilterRes[0]
                    } else {
                        tmpFilterRes = cache[tpmFolder].filter(n => /.md/.test(n))
                        template = tmpFilterRes.length > 0 ? __dirname + '/src/template/markdown/template.html': __dirname + '/src/template/html/template.html'
                    }

                    ret.push(new HtmlWebpackPlugin({
                        filename: __dirname + '/dist/html/' + tpmFolder + '.html',
                        template: template,
                        title: (function () {
                            if (tpmFolder === 'index') {
                                return ''
                            }
                            let config = utils.getFileContent('./src/pages/' + tpmFolder + '/config.json')

                            return config.name + ' | ' + Info.title
                        })(),
                        description: Info.description,
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
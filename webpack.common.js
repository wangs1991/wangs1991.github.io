const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const StylelintWebpackPlugin = require('stylelint-webpack-plugin')
const webpack = require('webpack')
const pages = require('./src/map') // 多页面配置新数据
/*const marked = require("marked")
const renderer = new marked.Renderer()*/

console.log('==============================================')
console.log(process.env.NODE_ENV)
console.log('==============================================')

module.exports = {
    entry: (function () {
        let ret = {
            app: './src/pages/index/index.js'
        }
        let chunk

        // 根据页面数据遍历出入口的集合
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
            title: 'web-utils examples',
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
        })(),
        new StylelintWebpackPlugin({
            context: 'src',
            configFile: path.resolve(__dirname,'.stylelintrc'),
            failOnError: true,
            lintDirtyModulesOnly: true,
            syntax: 'css'
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
                        loader: "markdown-loader"
                    }
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: [path.resolve('pages'), path.resolve('components'), path.resolve('index.js')] // 所有的js用babel转码到es5标准，指定包含全部的用户js路径
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: function () {
                        if (process.env.NODE_ENV === 'production') {
                            return '/dist/assets/images/[name].[hash:7].[ext]'
                        } else {
                            return '/assets/images/[name].[hash:7].[ext]'
                        }
                    }
                }
            },
            /*{
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },*/
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: function () {
                        if (process.env.NODE_ENV === 'production') {
                            return '/dist/assets/fonts/[name].[hash:7].[ext]'
                        } else {
                            return '/assets/fonts/[name].[hash:7].[ext]'
                        }
                    }
                }
            }
        ]
    }
}
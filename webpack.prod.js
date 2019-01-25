const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const common = require('./webpack.common')

const config = merge(common, {
    mode: 'production',
    optimization: {
        minimize: true,
        splitChunks: { // 代码分隔，公用的脚本到common.js
            cacheGroups: {
                commons: {
                    name: "common",
                    chunks: "all",
                    minChunks: 2
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: 'css-loader',
                        options: {importLoaders: 1},
                    },
                        'postcss-loader',
                    ]
                })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: __dirname + '/index.html', // 生成html到指定位置
            template: __dirname + "/src/pages/index/index.html", // 模板文件
            title: 'web-utils examples',
            chunks: ['common', 'app'],
            minify: {
                removeComments: true,//删除注释
                collapseWhitespace: true//删除空格
            }
        }),
        new CleanWebpackPlugin(['dist'], {  // 每次打包前删除生成的dist文件夹
            root: __dirname
        }),
        new ExtractTextPlugin({
            filename:  (getPath) => {
                return getPath('assets/css/[name].[hash].css').replace('css/js', 'css');
            },
            allChunks: true
        }),
        new OptimizeCSSPlugin({ // css压缩
            cssProcessorOptions: {
                safe: true
            }
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, './src/static'),
                to: 'assets/static',
                ignore: ['.*']
            }
        ]),
        new webpack.NamedModulesPlugin()
    ],
})

module.exports = config
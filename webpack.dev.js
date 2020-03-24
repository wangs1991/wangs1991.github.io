const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const common = require('./webpack.common')
const Info = require('./src/config')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        host: '127.0.0.1',
        port: 8040,
        // contentBase: ['./dist'],
        inline: true,
        lazy: false,
        open: false,
        hot: true
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
        new webpack.HotModuleReplacementPlugin() // 开发环境热替换
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                include: /node_modules/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                }] // 样式文件分别经过postcss、css、style loader出来
            }
        ]
    }
})
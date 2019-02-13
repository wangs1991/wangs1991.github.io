const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const common = require('./webpack.common')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        host: '0.0.0.0',
        port: 8090,
        contentBase: ['./dist'],
        inline: true,
        hot: true
    },
    plugins: [
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
// nodeJS 基础包用于处理路径的
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

const config = {
    target: 'web',
    // 整个项目的入口文件
    entry: path.join(__dirname, 'src/index.js'),
    // 编译好的代码存的地方
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,  
                loader: 'vue-loader'
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }, {
                test: /\.styl/,
                use: [
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            }, {
                test: /\.(git|jpg|jpeg|png|svg)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: '[name].aaa.[ext]'
                    }
                }]
            }
        ]
    }, 
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? ' "development" ' : ' "production" '
            }
        }),
        new HTMLPlugin()
    ]
}

if(isDev) {
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port: 7000,
        host: '0.0.0.0',
        overlay: {
            errors: true
        },
        open: true
    }
}

module.exports = config
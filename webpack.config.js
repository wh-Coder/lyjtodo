// nodeJS 基础包用于处理路径的
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// 分开 CSS
const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
    target: 'web',
    // 整个项目的入口文件
    entry: path.join(__dirname, 'src/todo_index.js'),
    // 编译好的代码存的地方
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,  
                loader: 'vue-loader'
            }, {
                test: /\.jsx$/,
                loader: 'babel-loader'
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
    config.module.rules.push({
        test: /\.styl/,
        use: [
            'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true
                }
            },
            'stylus-loader'
        ]
    })
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port: 7000,
        host: '0.0.0.0',
        overlay: {
            errors: true
        },
        open: true
    }
} else {
    config.entry = {
        app: path.join(__dirname, 'src/todo_index.js'),
        vendor: ['vue']
    }
    config.output.filename = '[name].[chunkhash:8].js'
    config.module.rules.push({
        test: /\.styl/,
        use: ExtractPlugin.extract({
            fallback: 'style-loader',
            use: [
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                },
                'stylus-loader'
            ]
        })
    })
    config.plugins.push(
        new ExtractPlugin('styles.[md5:contenthash:hex:8].css')
    )
    // webpack4 的新写法
    config.optimization = {
        splitChunks: {
            name: 'vendor'
        },
        runtimeChunk: true
    }
}

module.exports = config
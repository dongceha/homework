const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'index.js',
        path: path.join(__dirname, 'dist')
    },
    externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
    },
    resolve: {
        extensions: ['*', '.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'src': path.resolve(__dirname, './src'),
            'assets': path.resolve(__dirname, './src/assets'),
            'components': path.resolve(__dirname, './src/components')
        }
    },
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: 3
                        }
                    },
                    'babel-loader?cacheDirectory=true',
                ]
            },
            {
                test: /\.(js|vue)$/,
                use: ['eslint-loader'],
                enforce: 'pre',
                include: path.resolve(__dirname, './src'),
            },
            {
                test: /.css$/,
                use: [
                    process.env.NODE_ENV !== 'production'
                      ? 'vue-style-loader'
                      : MiniCssExtractPlugin.loader,
                    'css-loader'
                  ]
            },
            {
                test: /.less$/,
                use: [
                    process.env.NODE_ENV !== 'production'
                      ? 'vue-style-loader'
                      : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                  ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                  extractCSS: true,
                  loaders: {
                    'less': [
                      'vue-style-loader',
                      'css-loader',
                      'less-loader'
                    ],
                    'css': [
                      'vue-style-loader',
                      'css-loader'
                    ]
                  }
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            esModule: false,
                            limit: 10 * 1024,
                        }
                    },
                    {
                        loader: 'image-webpack-loader',// 压缩图片
                        options: {
                          bypassOnDebug: true,
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    esModule: false,
                    limit: 10 * 1024,
                }
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html',
            favicon: './public/favicon.ico',
            inject: true
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }), // 将 css 提取出来
    ]
}
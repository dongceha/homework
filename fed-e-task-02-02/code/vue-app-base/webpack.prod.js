const common = require('./webpack.common')

const path = require('path')

const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPluin = require('copy-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = merge(common, {
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[name].[chunkhash].min.js',
        library: '[name]_[hash]'
    },
    mode: "production",
    optimization: {
        minimize: true,
        minimizer: [ // 配置了数组之后，自定义压缩器插件
            new TerserWebpackPlugin({
                parallel: true,
                cache: true
            }), // js 压缩
            new OptimizeCssAssetsWebpackPlugin() // 压缩css
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPluin({
            patterns: [
                {
                    from: path.resolve(__dirname, './public'),
                    to: 'public'
                }
            ]
        }),
        new webpack.DefinePlugin({
            BASE_URL: '',
            'process.env': 'production'
        }),
        new MiniCssExtractPlugin(), // 将 css 提取出来
        new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /.(js|css)$/,
            threshold: 10 * 1024,
            minRatio: 0.8
        })
    ]
})
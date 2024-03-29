const common = require('./webpack.common')

const path = require('path')

const merge = require('webpack-merge')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPluin = require('copy-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin-fixed-hashbug');

module.exports = merge(common, {
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].[hash].js',
        publicPath: './',
        chunkFilename: 'js/[name].[chunkhash].min.js',
    },
    mode: "production",
    devtool: 'hidden-source-map',  // 只暴露 行列信息，但是点不进去
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
        // new HardSourceWebpackPlugin(),
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
            'process.env': {
                NODE_ENV: '"production"',
            },
            BASE_URL: "''"
        }),
        // 压缩为 gzip
        new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /.(js|css)$/,
            threshold: 10 * 1024,
            minRatio: 0.8
        })
    ]
})
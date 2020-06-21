const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const common = require('./webpack.common')
const webpack = require('webpack')

module.exports = merge(common, {
    mode: "development",
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        hotOnly: true,
        port: 8080
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': 'development',
            BASE_URL: '',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin(), // 将 css 提取出来
    ]
})
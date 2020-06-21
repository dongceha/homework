const merge = require('webpack-merge')
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
            'process.env.NODE_ENV': JSON.stringify('development'),
            BASE_URL: '',
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]
})
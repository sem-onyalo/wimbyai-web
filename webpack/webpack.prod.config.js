var webpack = require('webpack');
var path = require('path');

var parentDir = path.join(__dirname, '../');

module.exports = {
    entry: [
        'babel-polyfill',
        path.join(__dirname, '../index.js')
    ],
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.css$/,
            loaders: ["style-loader", "css-loader"]
        }]
    },
    output: {
        path: parentDir + '/build',
        publicPath: 'build/',
        filename: 'main.js'
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
}
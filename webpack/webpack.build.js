var loaders = require("./loaders");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    entry: ['./src/index.ts'],
    output: {
        filename: 'build.js',
        path: 'dist'
    },
    devtool: 'source-map',
    resolve: {
        root: __dirname,
        extensions: ['', '.ts', '.js', '.json']
    },
    resolveLoader: {
        modulesDirectories: ["node_modules"]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(
            {
                warning: false,
                mangle: true,
                comments: false
            }
        )
    ],
    module:{
        loaders: loaders
    }
};
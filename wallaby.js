var babel = require('babel-core');
var wallabyWebpack = require('wallaby-webpack');
var webpack = require('webpack');

var webpackPostprocessor = wallabyWebpack({
    module: {
        loaders: [
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'raw'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            }
        ]
    }
});

module.exports = function (wallaby) {
    return {
        compilers: {
          '**/*.ts': wallaby.compilers.typeScript({
            module: 5,
            target: 2
          })
        },
        files: [
            {pattern: 'node_modules/babel-polyfill/dist/polyfill.js', instrument: false},
            {pattern: 'src/**/*.html', load: false},
            {pattern: 'src/**/*.scss', load: false},
            {pattern: 'src/**/*.css', load: false},
            {pattern: 'src/**/*.ts', load: false},
            {pattern: 'src/**/*.spec.ts', ignore: true},
            {pattern: 'node_modules/**/*.js', ignore: true}
        ],

        tests: [
            {pattern: 'src/test.ts', load: false},
            {pattern: 'src/**/*.spec.ts', load: false},
            {pattern: 'node_modules/**/*.js', ignore: true}
        ],

        preprocessors: {
            '**/*.js': file => babel.transform(file.content, {sourceMap: true, presets: ['es2015']})
        },
        "testFramework": "jasmine",
        postprocessor: webpackPostprocessor,
        bootstrap: function () {
            // require('babel/node_modules/babel-core/polyfill.js');
            window.__moduleBundler.loadTests();
        }
    };
};

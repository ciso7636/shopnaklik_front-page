const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = {
    // First, let's define an entry point for webpack to start its crawling.
    entry: './src/index.js',
    // Second, we define where the files webpack produce, are placed
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
};

module.exports = {
    entry: ['babel-polyfill', './src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            { 
                test: /\.less$/,
                use: [ 
                    'style-loader',
                    'css-loader', 
                    'less-loader'
                ],
            },
        ]
    }
};

const path = require('path');   // nodejs function - includes 'path' package into project
const HtmlWebpackPlugin = require('html-webpack-plugin');   // another package for webpack to build/stream html from src
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    devtool: 'cheap-module-eval-source-map',    // to get right line numbers in source files in debugger
    entry: ['babel-polyfill','./src/js/main.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),  // was: path.resolve(__dirname, 'dist/js'), but dev-server wasn't updating when changes in index.html done
        filename: 'js/bundle.js',                // was: 'bundle.js'
        publicPath: ''
    },
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node-modules/,
                use: 'babel-loader'
            },    // load all files ending with '.js' using babel-loader
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images/',
                        name: '[name].[ext]',        // keeps original file name, without it was a hash
                        publicPath: '../images/'
                    }
                  },
                  {
                    loader: 'image-webpack-loader', // to reduce image files sizes
                  }

                ]
            },
            {
                test: [/.css$|.scss$/],
                use: [
                        MiniCssExtractPlugin.loader,    //loader: "style-loader" // creates style nodes from JS strings
                        'css-loader', // translates CSS into CommonJS
                        'sass-loader' // compiles Sass to CSS
                ],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {template: './src/index.html'}
        ),
        new MiniCssExtractPlugin({
            filename: 'css/style.css',
            publicPath: './'
        })
    ],
};
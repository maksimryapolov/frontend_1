var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var CopyPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
    entry: {
        app: ['@babel/polyfill', './src/script/index.js'],
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: './js/[name].js'
    },

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        overlay: true,
        compress: true,
        port: 9000
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/html/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: './styles/style.css'
        }),
        new CopyPlugin([
            { from: './src/images/', to: './images' },
            { from: './src/fonts/', to: './fonts' },
          ]),
          new webpack.ProvidePlugin({
              $: 'jquery',
              jQuery: 'jquery',
              'window.jQuery': 'jquery'
          })
    ],

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    }, 
                    {
                        loader: 'css-loader',
                        options: { 
                            url: false 
                        }
                    },
                    {
                        loader: 'postcss-loader', // Run post css actions
                        options: {
                            plugins: function () { // post css plugins, can be exported to postcss.config.js
                                return [
                                    require('precss'),
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                    }
                ],
            },
            { 
                test: /\.[tj]s$/,
                exclude: /node_modules/, 
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-typescript'],
                    plugins: ['@babel/plugin-proposal-class-properties']
                },
            },
            
        ],
    },
};
/*const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const FileManagerPlugin = require("filemanager-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/,
        },
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            },
            {
                test: /\.(scss|css)$/,
                // use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'template.pug'),  //'template.html'
            filename: 'index.html',
        }),

        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: ['dist']
                },
            },
        }),

        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),


    ],

    devServer: {
        watchFiles: path.join(__dirname, 'src'),
        port: 9000,
    },
};
*/


const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PugPlugin = require("pug-plugin");

module.exports = {
    entry: {
        index: "./src/template.pug",
        //☝🏽 Insert your PUG HTML files here
    },
    output: {
        path: path.join(__dirname, "dist/"),
        publicPath: "/",
        filename: "assets/js/[name].[contenthash:8].js",
        //☝🏽 Output filename of files with hash for unique id
    },
    plugins: [
        new PugPlugin({
            pretty: true,
            //☝🏽 Format HTML (only in dev mode)
            extractCss: {
                filename: "assets/css/[name].[contenthash:8].css",
            },
        }),
    ],
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: PugPlugin.loader,
                //☝🏽 Load Pug files
            },
            {
                test: /\.(css|sass|scss)$/,
                use: ["css-loader", "sass-loader"],
                //☝🏽 Load Sass files
            },
            {
                // To use images on pug files:
                test: /\.(png|jpg|jpeg|ico)/,
                type: "asset/resource",
                generator: {
                    filename: "assets/img/[name].[hash:8][ext]",
                },
            },
            {
                // To use fonts on pug files:
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
                type: "asset/resource",
                generator: {
                    filename: "assets/fonts/[name][ext][query]",
                },
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        watchFiles: {
            paths: ["src/**/*.*", "assets/scss/**/*.*"],
            //☝🏽 Enables HMR in these folders
            options: {
                usePolling: true,
            },
        },
    },
    stats: "errors-only",
    //☝🏽 For a cleaner dev-server run
};

/*
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/,
        },
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            },
            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            }
        ]
    },
    plugins: [new HTMLWebpackPlugin({
        template: path.join(__dirname, 'src', 'template.pug'), //.html
        filename: 'index.html'
    }),
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: ['dist']
                },
            },
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],
    devServer: {
        watchFiles: path.join(__dirname, 'src'),
        port: 9000,
    },
};

*/
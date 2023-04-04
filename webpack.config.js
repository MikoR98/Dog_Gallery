const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index: "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.[contenthash].js",
        clean: true
    },
    devtool: "source-map",
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 8080
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                // "style-loader",
                "css-loader",
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: [
                                ["autoprefixer"]
                            ]
                        }
                    }

                }
            ]
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        },
        {
            test: /\.(png|svg|jpeg|jpg|gif)$/,
            type: 'asset/resource'
        }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin()
    ],
};
const webpack = require("webpack");
const path = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
const postcss = require("postcss");
const precss = require("precss");
const fs = require("fs");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/main.js"
  },
  output: {
    path: path.resolve("./dist"),
    filename: "app.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                sourceMap: false,
                minimize: false
              }
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: loader => [
                  require("autoprefixer")({
                    browsers: ["last 2 versions, > 1%"]
                  })
                ]
              }
            }
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                sourceMap: false,
                minimize: false
              }
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: loader => [
                  require("autoprefixer")({
                    browsers: ["last 2 versions, > 1%"]
                  })
                ]
              }
            },
            "sass-loader"
          ]
        })
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin({
      exclude: /\/excludes/
    }),
    new ExtractTextPlugin("style.css")
  ],
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  devServer: {
    host: "0.0.0.0"
  }
};

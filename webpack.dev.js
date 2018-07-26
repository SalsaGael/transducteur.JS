const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');
const precss = require('precss');
const fs = require('fs');

module.exports = {
  mode: 'development',
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  entry: {
    main: './src/main.js'
  },
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [{
              loader: "css-loader",
              options: {
                importLoaders: 1,
                sourceMap: false,
                minimize: false,
              }
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: (loader) => [
                  require('autoprefixer')({
                    browsers: ['last 2 versions', 'ie > 9']
                  }),
                  require('precss'),
                ]
              }
            }
          ],
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [{
              loader: "css-loader",
              options: {
                importLoaders: 1,
                sourceMap: false,
                minimize: false,
              }
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: (loader) => [
                  require('autoprefixer')({
                    browsers: ['last 2 versions', 'ie > 9']
                  }),
                  require('precss'),
                ]
              }
            },
            'sass-loader'
          ],
        })
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin({
      exclude: /\/excludes/
    }),
    new ExtractTextPlugin('./style.css')
  ]
}
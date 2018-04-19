const webpack = require('webpack')
const path = require('path')

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');




/*
 * We've enabled commonsChunkPlugin for you. This allows your app to
 * load faster and it splits the modules you provided as entries across
 * different bundles!
 *
 * https://webpack.js.org/plugins/commons-chunk-plugin/
 *
 */

/*
 * We've enabled ExtractTextPlugin for you. This allows your app to
 * use css modules that will be moved into a separate CSS file instead of inside
 * one of your module entries!
 *
 * https://github.com/webpack-contrib/extract-text-webpack-plugin
 *
 */

const ExtractTextPlugin = require('extract-text-webpack-plugin');




module.exports = {
  mode: 'production',
  entry: {
    main: './src/main.js'
  },

  output: {
    path: path.resolve('./dist'),   
    filename: './bundle.js'
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',

      options: {
        presets: ['env']
      }
    }, {
      test: /\.css$/,

      use: ExtractTextPlugin.extract({ 
                      use: [{
                        loader: "css-loader",
                        options: {
                          sourceMap: true
                        }
                      }],
                      fallback: "style-loader"
                     })
    }]
  },

  plugins: [new UglifyJSPlugin(), new ExtractTextPlugin('style.css.[contentHash].css')]
}
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
require("babel-polyfill");
module.exports = {

  mode: 'development',
  entry: ["babel-polyfill", './public/print.js'],
  output: {
    //filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js",
    publicPath: "/"
    //path: __dirname + '/dist',
    //filename: 'index_bundle.js'
  },
  devtool: 'inline-source-map',
  // devServer: {
  //   contentBase: './dist'
  // },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {

            limit: 8000, // Convert images < 8kb to base64 strings
            name: 'public/images/[hash]-[name].[ext]'
          }
        }]
      },

    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      //hash: true,
      filename: 'index.html'
    }),
    // new HtmlWebpackPlugin({
    //   template: "./public/index.html",
    //   filename: "test.html"
    // }),

    //new CopyWebpackPlugin([ { from: './public', to: './dist' } ])
  ],

};

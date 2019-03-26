const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './public/print.js',
  output: {
    //filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js",
    publicPath: "/"
    //path: __dirname + '/dist',
    //filename: 'index_bundle.js'
  },
  // devtool: 'inline-source-map',
  // devServer: {
  //   contentBase: './dist'
  // },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
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

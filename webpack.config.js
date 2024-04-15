/* eslint-disable */
var path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'node_modules/@javascriptui/core/dist/instance'),
  target: 'electron-renderer',
  node: {global: true},
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'app/public/index.html'),
      template: path.resolve(__dirname, 'src/index.html'),
    }),
  ],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, 'app/public'),
    filename: 'app.js',
    library: 'js-native',
    libraryTarget: 'umd',
    publicPath: '/'
  },
  module: {
    rules: [
      {test: /\.tsx?$/, loader: 'ts-loader'},
      {test: /\.svg$/, type: 'asset/resource'},
      {test: /\.(png|jpg|gif)$/, type: 'asset/resource'},
      {test: /\.(woff(2)?|ttf|eot|svg)?$/, type: 'asset/resource'},
      {test: /\.css$/, use: ['style-loader', 'css-loader']}
    ]
  }
};

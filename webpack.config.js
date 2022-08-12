/* eslint-disable */
var path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'node_modules/@js-native/core/instance.ts'),
  target: 'electron-renderer',
  node: { global: true },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'dist/index.html'),
      template: path.resolve(__dirname, 'src/index.html'),
      inject: true
    }) 
  ],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'node_modules/@js-native/core')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  }, 
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
    library: 'js-native',
    libraryTarget: 'umd',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.svg$/, type: 'asset/resource' },
      { test: /\.(png|jpg|gif)$/, type: 'asset/resource' },
      { test: /\.(woff(2)?|ttf|eot|svg)?$/, type: 'asset/resource' },
      { test: /\.css$/, use: ['style-loader', 'css-loader' ] }
    ]
  } 
};

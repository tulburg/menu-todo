/* eslint-disable */
var path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'node_modules/@js-native/core/instance.ts'),
  target: 'electron-renderer',
  node: { global: true },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'app/public/index.html'),
      template: path.resolve(__dirname, 'src/index.html'),
      inject: true
    }),
    new CopyPlugin([
      { from: 'public', to: path.resolve(__dirname, 'public/') },
      { from: 'assets', to: path.resolve(__dirname, 'app/assets/') }
    ])
  ],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'node_modules/@js-native/core')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  }, 
  output: {
    path: path.resolve(__dirname, 'app/public'),
    filename: 'app.js',
    library: 'js-native',
    libraryTarget: 'umd',
    // publicPath: '/'
    publicPath: '../public/'
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

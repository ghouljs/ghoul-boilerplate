/**
 * @Author: zero
 * @Date:   2017-09-12T17:11:11+08:00
 * @Last modified by:   zero
 * @Last modified time: 2017-09-13T13:26:18+08:00
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');

module.exports = {
  context: __dirname,
  target: 'web',
  entry: {
    app: './src/app',
    // sw: './src/sw',
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.join(__dirname, 'src'),
        ],
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', { modules: false }],
          ],
          plugins: [
            ['transform-react-jsx', { 'pragma': 'h' }],
            ['transform-runtime', {
              'helpers': false,
              'polyfill': true,
              'regenerator': true,
              'moduleName': 'babel-runtime',
            }],
            'transform-object-rest-spread'
          ],
        },
      },
      {
        test: /\.css$/,
        include: [
          path.join(__dirname, 'node_modules'),
        ],
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.css$/,
        include: [
          path.join(__dirname, 'src'),
        ],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            // options: {
            //   modules: true,
            //   localIdentName: process.env.NODE_ENV === 'production' ? '[hash:base64:5]' : '[path][name]__[local]--[hash:base64:5]',
            // },
          },
        ],
      },
      {
        test: /\.scss$/,
        include: [
          path.join(__dirname, 'src'),
        ],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: process.env.NODE_ENV === 'production' ? '[hash:base64:5]' : '[path][name]__[local]--[hash:base64:5]',
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src'),
    ],
    alias: {
      components: './components',
      utils: './utils',
    },
    extensions: ['.js', '.jsx', '.json'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Ghoul - Chat',
      template: path.join(__dirname, 'public/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ].concat(process.env.VISUALIZE ? [new Visualizer()] : [])
  .concat(process.env.NODE_ENV === 'production' ? [new webpack.optimize.UglifyJsPlugin({
        parallel: true,
        uglifyOptions: {
          compress: {
            screw_ie8: true, // React doesn't support IE8
            warnings: false,
            drop_console: true,
            pure_funcs: ['console.log'],
          },
          mangle: {
            screw_ie8: true,
          },
          output: {
            comments: false,
            screw_ie8: true,
            ascii_only: true,
          },
        },
      })] : []),
  devServer: {
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || 9000,
    proxy: {
      '/api': 'http://localhost:3000',
    },
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    hot: true,
    https: false,
    noInfo: true,
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'cheap-source-map',
};

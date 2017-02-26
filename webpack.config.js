const path = require('path')
const webpack = require('webpack')

const config = {
  entry: path.resolve(__dirname, 'client', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/static',
    filename: 'mascot.js',
    library: 'mascot',
    libraryTarget: 'var'
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js?$/,
        include: path.resolve(__dirname, 'client'),
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: false
    })
  ]
}

module.exports = config

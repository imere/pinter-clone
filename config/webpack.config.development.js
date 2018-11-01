const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const {
  scriptDist
} = require('./utils')
module.exports = {
  output: {
    filename: scriptDist('[name].js'),
    publicPath: '/'
  },
  devtool: 'nosources-source-map',
  plugins: [
    new ParallelUglifyPlugin({
      exclude: /\.min\.js$/,
      uglifyES: {
        output: {
          beautify: true,
          comments: true
        },
        compress: {
          warnings: true,
          drop_console: false,
          collapse_vars: true
        }
      }
    })
  ]
}

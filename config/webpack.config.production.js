const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const {
  scriptDist
} = require('./utils')

module.exports = {
  output: {
    filename: scriptDist('[name].[hash:5].js'),
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          reuseExistingChunk: true
        }
      }
    }
  },
  performance: {
    hints: false
  },
  plugins: [
    new ParallelUglifyPlugin({
      exclude: /\.min\.js$/,
      // workCount: require('os').cpus().length,
      uglifyES: {
        output: {
          beautify: false,
          comments: false
        },
        compress: {
          warnings: false,
          drop_console: false,
          collapse_vars: true
        }
      }
    }),
    new OptimizeCSSAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', {
          discardComments: {
            removeAll: true
          }
        }],
      },
      canPrint: true
    })
  ],
}

const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

const { scriptDist } = require('./utils');

module.exports = {
  output: {
    filename: scriptDist('[name].js'),
  },
  devtool: 'cheap-module-eval-source-map',
  optimization: {
    noEmitOnErrors: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          reuseExistingChunk: true,
        },
        commons: {
          chunks: 'initial',
          name: 'common',
          minChunks: 1,
          maxInitialRequests: 5,
          minSize: 0,
        },
      },
    },
    runtimeChunk: {
      name: entry => `r~${entry.name}`,
    },
  },
  plugins: [
    new ParallelUglifyPlugin({
      exclude: /\.min\.js$/,
      uglifyES: {
        output: {
          beautify: true,
          comments: true,
        },
        compress: {
          warnings: true,
          drop_console: false,
          collapse_vars: true,
        },
      },
    }),
  ],
};

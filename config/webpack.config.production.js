const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const { scriptDist } = require('./utils');

module.exports = {
  output: {
    filename: scriptDist('[name].[hash:5].js'),
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    disableHostCheck: true,
  },
  optimization: {
    noEmitOnErrors: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        hot: {
          test: /[\\/]node_modules[\\/](.*hot.*)[\\/]/,
          name: 'ch',
          reuseExistingChunk: true,
        },
        loader: {
          test: /[\\/]node_modules[\\/](.*loader.*)[\\/]/,
          name: 'cl',
          reuseExistingChunk: true,
        },
        vue: {
          test: /[\\/]node_modules[\\/](vue.*)[\\/]/,
          name: 'cv',
          reuseExistingChunk: true,
        },
        http: {
          test: /[\\/]node_modules[\\/](.*axios.*)[\\/]/,
          name: 'ct',
          reuseExistingChunk: true,
        },
        ui: {
          test: /[\\/]node_modules[\\/](element.*)[\\/]/,
          name: 'ce',
          reuseExistingChunk: true,
        },
        // vendors: {
        //   test: /[\\/]node_modules[\\/]/,
        //   name: 'vendor',
        //   reuseExistingChunk: true
        // },
        // commons: {
        //   chunks: 'initial',
        //   name: 'common',
        //   minChunks: 1,
        //   maxInitialRequests: 5,
        //   minSize: 0
        // },
      },
    },
    runtimeChunk: {
      name: entry => `r~${entry.name}`,
    },
  },
  performance: {
    hints: false,
  },
  plugins: [
    new ParallelUglifyPlugin({
      exclude: /\.min\.js$/,
      // workCount: require('os').cpus().length,
      uglifyES: {
        output: {
          beautify: false,
          comments: false,
        },
        compress: {
          warnings: false,
          drop_console: false,
          collapse_vars: true,
        },
      },
    }),
    new OptimizeCSSAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: [
          'default',
          {
            discardComments: {
              removeAll: true,
            },
          },
        ],
      },
      canPrint: true,
    }),
  ],
};

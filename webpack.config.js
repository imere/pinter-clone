const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BuildNotifier = require('webpack-build-notifier')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const DeepScopePlugin = require('webpack-deep-scope-plugin').default
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractWebpackPlugin = require('mini-css-extract-plugin')
const PurifyCSSWebpack = require('purifycss-webpack')
const WebpackMerge = require('webpack-merge')
const webpack = require('webpack')
const glob = require('glob')
const path = require('path')
const {
  cssDist,
  vueLoaderOptions,
} = require('./config/utils')

const args = require('yargs-parser')(process.argv.slice(2))
const currentEnv = args.mode || 'development'
const isProd = currentEnv === 'production'
require('node-bash-title')(currentEnv)

const baseConfig = {
  entry: {
    app: './src/index.ts'
  },
  output: {
    hotUpdateChunkFilename: '[id].[hash].hot-update.js'
  },
  devServer: {
    port: process.env.PORT || 80,
    historyApiFallback: {
      rewrites: [{
        from: /.*/,
        to: '/index.html'
      }],
    },
    before: (app) => {
      require('dotenv').config()
      require('mongoose').connect(process.env.uuri || 'mongodb://127.0.0.1:27017/test', {
        useNewUrlParser: true
      })
      require('./server/middleware')(app)
      require('./server/routes')(app)
    }
  },
  module: {
    rules: [{
        test: /\.pug$/,
        loader: 'pug-plain-loader'
      }, {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderOptions(currentEnv)
      },
      {
        test: /\.(sc|c)ss$/,
        // test: /\.css$/,
        use: [{
            loader: 'vue-style-loader'
          },
          {
            loader: MiniCSSExtractWebpackPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              data: ``
            }
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              appendTsxSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: isProd ? 'img/[name].[hash:5].[ext]' : 'img/[name].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: isProd ? 'media/[name].[hash:5].[ext]' : 'media/[name].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: isProd ? 'fonts/[name].[hash:5].[ext]' : 'fonts/[name].[ext]'
        }
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    }
  },
  optimization: {
    noEmitOnErrors: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/](vue)[\\/]/,
          name: 'cm'
        },
        hot: {
          test: /[\\/]node_modules[\\/](.*hot.*)[\\/]/,
          name: 'ch'
        },
        view: {
          test: /[\\/]node_modules[\\/](vue-property-decorator|.*loader.*)[\\/]/,
          name: 'cv'
        },
        data: {
          test: /[\\/]node_modules[\\/](vuex)[\\/]/,
          name: 'cd'
        },
        logic: {
          test: /[\\/]node_modules[\\/](vue-router)[\\/]/,
          name: 'cl'
        },
        eleui: {
          test: /[\\/]node_modules[\\/](element-ui)[\\/]/,
          name: 'ce'
        },
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
      name: entry => `r~${entry.name}`
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ProgressBarWebpackPlugin(),
    new BuildNotifier({
      title: currentEnv,
      suppressSuccess: true,
    }),
    new webpack.WatchIgnorePlugin([
      /\.js$/,
      /\.d\.ts$/
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true,
      minify: {
        removeComments: isProd ? true : false,
        collapseWhitespace: isProd ? true : false,
        removeAttributeQuotes: isProd ? true : false
      },
      chunksSortMode: 'dependency'
    }),
    // new PurifyCSSWebpack({
    //   paths: glob.sync(path.join(__dirname, './dist/*.html'))
    // }),
    new MiniCSSExtractWebpackPlugin({
      filename: isProd ? cssDist('[name].[hash:5].css') : cssDist('[name].css'),
      chunkFilename: isProd ? cssDist('[name].[hash:5].css') : cssDist('[name].css'),
    }),
    new VueLoaderPlugin(),
    new DeepScopePlugin(),
  ],
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

module.exports = new SpeedMeasureWebpackPlugin().wrap(WebpackMerge(baseConfig, require(`./config/webpack.config.${currentEnv}.js`)))

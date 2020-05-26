const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BuildNotifier = require('webpack-build-notifier');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const DeepScopePlugin = require('webpack-deep-scope-plugin').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractWebpackPlugin = require('mini-css-extract-plugin');
const PurifyCSSWebpack = require('purifycss-webpack');
const WebpackMerge = require('webpack-merge');
const webpack = require('webpack');

const path = require('path');

const {
  cssDist,
  createPugLoader,
  createVueLoader,
  createCssLoader,
  createScssLoader,
  createSassLoader,
  createTsxLoader,
  createImageLoader,
  createMediaLoader,
  createFontLoader,
} = require('./config/utils');

const args = require('yargs-parser')(process.argv.slice(2));
const currentEnv = args.mode || 'development';
const isProd = currentEnv === 'production';
require('node-bash-title')(currentEnv);

const baseConfig = {
  entry: {
    app: './src/index.ts',
  },
  output: {
    publicPath: '/',
    hotUpdateChunkFilename: '[id].[hash].hot-update.js',
  },
  devServer: {
    port: process.env.PORT || require(path.join(__dirname, './config/config')).FALLBACK_PORT,
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: '/index.html',
        },
      ],
    },
    before: app => {
      require('mongoose').connect(
        process.env.uuri || require('./config/config').FALLBACK_UURI,
        {
          useNewUrlParser: true,
        }
      );
      require('./server/middleware')(app);
      require('./server/routes')(app);
    },
  },
  module: {
    rules: [
      createPugLoader(currentEnv),
      createVueLoader(currentEnv),
      createCssLoader(currentEnv),
      createScssLoader(currentEnv),
      createSassLoader(currentEnv),
      createTsxLoader(currentEnv),
      createImageLoader(currentEnv),
      createMediaLoader(currentEnv),
      createFontLoader(currentEnv),
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    // alias: {
    //   vue$: 'vue/dist/vue.esm.js',
    // },
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ProgressBarWebpackPlugin(),
    new BuildNotifier({
      title: currentEnv,
      suppressSuccess: true,
    }),
    new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true,
      minify: {
        removeComments: isProd ? true : false,
        collapseWhitespace: isProd ? true : false,
        removeAttributeQuotes: isProd ? true : false,
      },
      chunksSortMode: 'dependency',
    }),
    // new PurifyCSSWebpack({
    //   paths: require('glob').sync(require('path').join(__dirname, './dist/*.html'))
    // }),
    new MiniCSSExtractWebpackPlugin({
      filename: isProd ? cssDist('[name].[hash:5].css') : cssDist('[name].css'),
      chunkFilename: isProd
        ? cssDist('[name].[hash:5].css')
        : cssDist('[name].css'),
    }),
    new VueLoaderPlugin(),
    new DeepScopePlugin(),
    new DashboardPlugin(),
  ],
  externals: [
    {
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT',
    },
  ],
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};

module.exports = new SpeedMeasureWebpackPlugin().wrap(
  WebpackMerge(baseConfig, require(`./config/webpack.config.${currentEnv}.js`))
);

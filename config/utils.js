const MiniCSSExtractWebpackPlugin = require('mini-css-extract-plugin')

const path = require('path')

const cssDist = (sub) => {
  return path.join('styles', sub)
}

const scriptDist = (sub) => {
  return path.join('scripts', sub)
}

const vueLoaderOptions = (env) => {
  return {
    loaders: [{
        loader: 'vue-style-loader',
        options: {
          sourceMap: false
        }
      },
      {
        loader: MiniCSSExtractWebpackPlugin.loader,
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          sourceMap: false
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: false
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: false
        }
      },
    ],
    transformToRequire: {
      video: ['src', 'poster'],
      source: 'src',
      img: 'src',
      image: 'xlink:href'
    }
  }
}

module.exports = {
  cssDist,
  scriptDist,
  vueLoaderOptions
}

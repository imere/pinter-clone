const MiniCSSExtractWebpackPlugin = require('mini-css-extract-plugin');

const path = require('path');

const cssDist = sub => {
  return path.join('styles', sub);
};

const scriptDist = sub => {
  return path.join('scripts', sub);
};

const vueLoaderOptions = env => {
  let isProd = env === 'production';
  return {
    loaders: [
      {
        loader: 'vue-style-loader',
        options: {
          sourceMap: !isProd,
        },
      },
      {
        loader: MiniCSSExtractWebpackPlugin.loader,
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          sourceMap: !isProd,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: !isProd,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: !isProd,
        },
      },
    ],
    transformToRequire: {
      video: ['src', 'poster'],
      source: 'src',
      img: 'src',
      image: 'xlink:href',
    },
  };
};

const createPugLoader = env => {
  return {
    test: /\.pug$/,
    loader: 'pug-plain-loader',
  };
};

const createVueLoader = env => {
  return {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: vueLoaderOptions(env),
  };
};

const createTsxLoader = env => {
  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          appendTsxSuffixTo: [/\.vue$/],
        },
      },
    ],
  };
};

const createCssLoader = env => {
  return {
    test: /\.css$/,
    use: [
      {
        loader: 'vue-style-loader',
      },
      {
        loader: MiniCSSExtractWebpackPlugin.loader,
      },
      {
        loader: 'css-loader',
      },
      'postcss-loader',
    ],
  };
};

const createSassLoader = env => {
  return {
    test: /\.sass$/,
    use: [
      {
        loader: 'vue-style-loader',
      },
      {
        loader:
          env === 'production'
            ? MiniCSSExtractWebpackPlugin.loader
            : 'style-loader',
      },
      {
        loader: 'css-loader',
      },
      'postcss-loader',
      {
        loader: 'sass-loader',
        options: {
          indentedSyntax: true,
          data: ``,
        },
      },
    ],
  };
};

const createScssLoader = env => {
  return {
    test: /\.scss$/,
    use: [
      {
        loader: 'vue-style-loader',
      },
      {
        loader:
          env === 'production'
            ? MiniCSSExtractWebpackPlugin.loader
            : 'style-loader',
      },
      {
        loader: 'css-loader',
      },
      'postcss-loader',
      {
        loader: 'sass-loader',
        options: {
          data: ``,
        },
      },
    ],
  };
};

const createLessLoader = env => {
  return {};
};

const createStylusLoader = env => {
  return {};
};

const createImageLoader = env => {
  return {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name:
        env === 'production' ? 'img/[name].[hash:5].[ext]' : 'img/[name].[ext]',
    },
  };
};

const createMediaLoader = env => {
  return {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name:
        env === 'production'
          ? 'media/[name].[hash:5].[ext]'
          : 'media/[name].[ext]',
    },
  };
};

const createFontLoader = env => {
  return {
    test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name:
        env === 'production'
          ? 'fonts/[name].[hash:5].[ext]'
          : 'fonts/[name].[ext]',
    },
  };
};

module.exports = {
  cssDist,
  scriptDist,
  createPugLoader,
  createVueLoader,
  createTsxLoader,
  createCssLoader,
  createSassLoader,
  createScssLoader,
  createLessLoader,
  createStylusLoader,
  createImageLoader,
  createMediaLoader,
  createFontLoader,
};

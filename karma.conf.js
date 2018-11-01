module.exports = function (config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    frameworks: [
      'jasmine',
      'karma-typescript',
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'src/**/*.spec.ts',
    ],
    exclude: [
      'node_modules',
    ],
    preprocessors: {
      'src/**/*.spec.ts': [
        'karma-typescript',
        // 'webpack',
      ],
    },
    karmaTypescriptConfig: {
      tsconfig: './tsconfig.test.json',
      bundlerOptions: {
        addNodeGlobals: true,
        entrypoints: /\.spec\.(ts|tsx)$/,
        exclude: [],
        ignore: [],
        noParse: "",
        resolve: {
          alias: {},
          extensions: [".js", ".json"],
          directories: ["node_modules"]
        },
        sourceMap: false,
        transforms: [require("karma-typescript-es6-transform")()],
        validateSyntax: true
      },
      compilerDelay: 500,
      compilerOptions: {
        noImplicitAny: true,
      },
    },
    // webpack: require('./config/webpack.config.test'),
    // webpackMiddleware: {
    //   noInfo: true
    // },
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots', 'kjhtml'],
    port: 9876,
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    autoWatch: true,
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      'PhantomJS',
      // 'Chrome',
    ],
    singleRun: false,
    concurrency: 1, // Infinity,
  })
}

const path = require('path')

module.exports = (env, argv) => {
  // Set NODE_ENV for Babel
  process.env.NODE_ENV = argv.mode

  return {
    entry: path.join(__dirname, 'srcjs', 'index.js'),

    output: {
      filename: 'reactable.js',
      path: path.join(__dirname, 'inst', 'htmlwidgets')
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [require('autoprefixer'), require('cssnano')]
              }
            }
          ]
        }
      ]
    },

    externals: {
      react: 'window.React',
      'react-dom': 'window.ReactDOM',
      reactR: 'window.reactR'
    },

    stats: {
      colors: true
    },

    devtool: 'source-map'
  }
}

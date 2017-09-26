const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './index.js',
  output: {
    filename: './build/index.js'
  },
  resolve: {
    extensions: [".js", ".turo"],
  },
  module: {
    rules: [
      {
        test: /\.turo$/,
        use: 'raw-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [new UglifyJSPlugin()],
};

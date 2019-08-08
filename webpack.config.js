const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './build/'),
    filename: 'index.js',
    publicPath: 'build/'
  },
  
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },

  devServer: {
    historyApiFallback: true
  }
}
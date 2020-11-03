const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'gem-puzzle'),
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'gem-puzzle'),
    watchContentBase: true,
    port: 9000
  }
};


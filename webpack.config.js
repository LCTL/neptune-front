var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/app.tsx',
  output: {
    path: './dist',
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.ts', '.tsx']
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: "style!css"
    }, {
      test: /\.tsx?$/,
      loader: 'ts-loader'
    }, {
      test: /\.png$/,
      loader: "url-loader?mimetype=image/png"
    }, {
      test: /\.jpg$/,
      loader: "url-loader?mimetype=image/jpeg"
    }, {
      test: /\.gif$/,
      loader: "url-loader?mimetype=image/gif"
    }, {
      test: /\.svg$/,
      loader: "url-loader?mimetype=image/svg+xml"
    }, {
      test: /\.woff$/,
      loader: "url-loader?mimetype=font/woff"
    }, {
      test: /\.woff2$/,
      loader: "url-loader?mimetype=font/woff2"
    }, {
      test: /\.eot$/,
      loader: "url-loader?mimetype=font/eot"
    }, {
      test: /\.ttf$/,
      loader: "url-loader?mimetype=font/ttf"
    }, ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Docker Machine Manager',
      filename: 'index.html'
    })
  ]
};

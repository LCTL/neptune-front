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
    }]
  }
};

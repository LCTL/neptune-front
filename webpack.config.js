var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {
    app: [
      './src/app.tsx',
      './src/styles/app.css'
    ],
    vendor: [
      'bluebird',
      'formsy-react',
      'history',
      'http-proxy',
      'jquery',
      'lodash',
      'notie',
      'prettysize',
      'react',
      'react-dom',
      'react-router',
      'react-semantify',
      'reflux',
      'superagent',
      './node_modules/semantic-ui/dist/semantic.js',
      '!style!css!./node_modules/semantic-ui/dist/semantic.css'
    ]
  },
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.ts', '.tsx']
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader!postcss-loader'
    }, {
      test: /\.tsx?$/,
      loader: 'ts-loader'
    }, {
      test: /\.png$/,
      loader: 'url-loader?mimetype=image/png'
    }, {
      test: /\.jpg$/,
      loader: 'url-loader?mimetype=image/jpeg'
    }, {
      test: /\.gif$/,
      loader: 'url-loader?mimetype=image/gif'
    }, {
      test: /\.svg$/,
      loader: 'url-loader?mimetype=image/svg+xml'
    }, {
      test: /\.woff$/,
      loader: 'url-loader?mimetype=font/woff'
    }, {
      test: /\.woff2$/,
      loader: 'url-loader?mimetype=font/woff2'
    }, {
      test: /\.eot$/,
      loader: 'url-loader?mimetype=font/eot'
    }, {
      test: /\.ttf$/,
      loader: 'url-loader?mimetype=font/ttf'
    }, ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Docker Machine Manager',
      filename: 'index.html'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  postcss: function(webpack) {
    return [
      require('postcss-import')({
        addDependencyTo: webpack
      }),
      require('postcss-nested'),
      require('cssnext')(),
      require('autoprefixer')
    ];
  },
  devServer: {
    proxy: [{
      path: /\/api\/(.+)/,
      target: 'http://127.0.0.1:3000/',
      rewrite: function(req, opt) {
        req.url = req.url.replace(opt.path, '/$1');
      }
    }]
  }
};

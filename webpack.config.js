module.exports = {
  entry: './src/js/app.js',
  output: {
    path: __dirname+'/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.scss$/,
        use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]},
      {test: /\.js$/, loader: "babel-loader", exclude: /node_modules/, query: {presets: ['es2015']}},
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  externals: {
       fs: '{}',
       tls: '{}',
       net: '{}',
       console: '{}'
     }
}

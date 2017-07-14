const path = require('path');
module.exports = {
  entry: {
    app: './client/app/main.tsx'
  },
  devtool: 'source-maps',
  cache: true,
  output: {
    path: path.join(__dirname, './client/static/'),
    filename: '[name].bundle.js'
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", "jsx", ".json"]
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {test: /\.tsx?$/, loader: 'awesome-typescript-loader'},
      {test: /\.css$/, use: [{loader: 'style-loader'}, {loader: 'css-loader'},]},
    ]
  }
};
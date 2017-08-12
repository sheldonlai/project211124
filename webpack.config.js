const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './client/app/main.tsx',
    // question: './client/app/views/question/QuestionRouter.tsx'
  },
  devtool: 'source-maps',
  cache: true,
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    })
  ],
  output: {
    path: path.join(__dirname, './client/static/'),
    filename: '[name].bundle.js',
    chunkFilename : '[name].js', // or whatever other format you want.
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
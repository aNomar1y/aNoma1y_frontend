const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 플러그인 추가

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true, // dist 폴더 정리
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // HTML 템플릿 경로
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'public'),
    compress: true,
    port: 3000,
    open: true,
    hot: true,
  },
};
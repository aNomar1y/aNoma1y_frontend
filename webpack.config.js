const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv").config();

const HtmlWebpackPlugin = require("html-webpack-plugin"); // 플러그인 추가

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true, // dist 폴더 정리
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // 이미지 파일 처리
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(dotenv.parsed),
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html", // HTML 템플릿 경로
    }),
  ],
  devServer: {
    static: path.join(__dirname, "public"),
    compress: true,
    port: parseInt(process.env.PORT, 10) || 3001,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
};

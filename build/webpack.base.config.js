/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * @version: V1.0.0
 * @Author: 小杨不吃土豆
 * @Date: 2023-03-27 14:59:59
 * @LastEditors: 小杨不吃土豆
 * @LastEditTime: 2023-03-27 16:15:35
 * @company: xxx
 * @Mailbox: y1597355434@gamil.com
 * @FilePath: /www/webpack-test/build/webpack.base.config.js
 * @Descripttion:
 * @Params:
 * @Return:
 */
const { join, resolve } = require("path"); // 系统路径模块
const htmlWebpackPlugin = require("html-webpack-plugin"); // 引入模板渲染插件
const { VueLoaderPlugin } = require("vue-loader"); // 将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackBar = require("webpackbar");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = {
  entry: resolve(__dirname, "../src/main.js"),
  output: {
    path: join(__dirname, "../dist"),
    filename: "bundle-[hash].js",
  },
  resolve: {
    extensions: [".json", ".js", ".vue", ".css"],
    alias: {
      // vue$: "vue/dist/vue.esm.js",
      "@": resolve("src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["vue-style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.png/,
        type: "asset",
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  plugins: [
    // 请确保引入这个插件！

    // new webpack.BannerPlugin("最终版权归jkc所有"),
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      filename: "index.html",
      template: "/public/index.html",
      inject: "body", // 指定插入的 <script> 标签在 body 底部
      // chunks: ["index"],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    }),
    new VueLoaderPlugin(),
    new WebpackBar({
      color: "#85d", // 默认green，进度条颜色支持HEX
      basic: false, // 默认true，启用一个简单的日志报告器
      profile: false, // 默认false，启用探查器。
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
    }),
  ],
};

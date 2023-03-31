/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * @version: V1.0.0
 * @Author: 小杨不吃土豆
 * @Date: 2023-03-27 14:59:59
 * @LastEditors: 小杨不吃土豆
 * @LastEditTime: 2023-03-31 18:32:57
 * @company: xxx
 * @Mailbox: y1597355434@gamil.com
 * @FilePath: /www/Y-reader/build/webpack.base.config.js
 * @Descripttion:
 * @Params:
 * @Return:
 */
const { join, resolve } = require("path"); // 系统路径模块
const htmlWebpackPlugin = require("html-webpack-plugin"); // 引入模板渲染插件
const { VueLoaderPlugin } = require("vue-loader"); // 将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackBar = require("webpackbar");
const webpack = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
//安装插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: resolve(__dirname, "../src/main.js"),
  output: {
    path: join(__dirname, "../dist"),
    filename: "js/[name].js",
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
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["vue-style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        //webpack5版本
        type: "asset/resource",
        generator: {
          //图片路径，存放在dist/imgs/原名+8位hash+后缀
          // filename: "images/[name]_[hash:8][ext]"
          filename: "img/[name]_[hash:8][ext]",
        },
      },
      {
        // webpack5默认内部不认识这些文件, 所以当做静态资源直接输出即可
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        type: "asset/resource",
        generator: {
          filename: "font/[name].[hash:6][ext]",
        },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  plugins: [
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
    new MiniCssExtractPlugin({
      filename: "css/name.[hash:8].css",
    }),
    new OptimizeCssAssetsPlugin({}),
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 10000, // Minimum number of characters
    }),

    // new TerserPlugin()
  ],
  optimization: {
    minimizer: [new TerserPlugin()],
    splitChunks: {
      minSize: 30, //提取出的chunk的最小大小
      cacheGroups: {
        default: {
          name: "common",
          chunks: "initial",
          minChunks: 2, //模块被引用2次以上的才抽离
          priority: -20,
        },
        // vendors: {
        //   //拆分第三方库（通过npm|yarn安装的库）
        //   test: /[\\/]node_modules[\\/]/,
        //   name: "vendor",
        //   chunks: "initial",
        //   priority: -10,
        // },
      },
    },
  },
};

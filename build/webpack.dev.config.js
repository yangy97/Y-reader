/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * @version: V1.0.0
 * @Author: 小杨不吃土豆
 * @Date: 2023-03-27 15:01:56
 * @LastEditors: 小杨不吃土豆
 * @LastEditTime: 2023-03-27 16:22:44
 * @company: xxx
 * @Mailbox: y1597355434@gamil.com
 * @FilePath: /www/Y-reader/build/webpack.dev.config.js
 * @Descripttion:
 * @Params:
 * @Return:
 */
const merge = require("webpack-merge");
const path = require("path");
const common = require("./webpack.base.config.js");
module.exports = merge(common, {
  mode: "development",
  devServer: {
    // disableHostCheck: true,
    // contentBase: "../dist",
    // inline: true,
    port: 8000,
    static: {
      directory: path.join(__dirname, "../public/index.html"),
    },
    proxy: {
      "/api": {
        target: "http://api.zhuishushenqi.com",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
      "/content": {
        target: "http://chapter2.zhuishushenqi.com",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/content": "",
        },
      },
    },
  },
});

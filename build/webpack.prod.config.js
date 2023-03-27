/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * @version: V1.0.0
 * @Author: 小杨不吃土豆
 * @Date: 2023-03-27 15:03:31
 * @LastEditors: 小杨不吃土豆
 * @LastEditTime: 2023-03-27 15:03:45
 * @company: xxx
 * @Mailbox: y1597355434@gamil.com
 * @FilePath: /www/webpack-test/webpack.prod.config.js
 * @Descripttion:
 * @Params:
 * @Return:
 */
const { merge } = require("webpack-merge");
const common = require("./webpack.base.config.js");
module.exports = merge(common, {
  mode: "production",
});

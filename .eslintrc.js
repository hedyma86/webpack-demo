/*
 * @description: 
 * @Author: Hedy Ma
 * @Date: 2021-01-31 18:20:34
 * @LastEditTime: 2021-01-31 18:31:29
 */
module.exports = {
    root: true,
    parser:"babel-eslint",
    extend:'airbnb',
    //指定解析器选项
    parserOptions: {
        sourceType: "module",
        ecmaVersion: 2015
    },
    //指定脚本的运行环境
    env: {
        browser: true,
    },
    // 启用的规则及其各自的错误级别
    rules: {
        "indent": ["error",2],//缩进风格
        "quotes":  "off",//引号类型 
        "no-console": "off",//禁止使用console
    }
}
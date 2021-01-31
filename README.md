### 命令行传递参数,使用双横杠

为webpack传参  --修改打包模式
```shell
$ webpack --mode=development

```
为devServer传参  --启用压缩
```shell
$ webpack serve --compress

```


### webpack内置插件
> DefinePlugin,定义全局变量，mode对应的process.env.NODE_ENV
> webpack-dev-server,开发服务器，对应devServer配置

### 配置辅助说明

> 说明①：mode 打包模式  
> development:开启详细debug信息
> production：代码压缩

> 说明② 常用loader介绍。webpack只能解析js和json文件格式，so需要加载loader以处理其他文件格式。
> raw-loader 普通文件loader

> style-loader 将css已<style>标签插入到hmtl中

> css-loader 解析css中的@import等语法

> url-loader
> 该loader为file-loader的增强版,file-loader为将文件复制到指定输出目录。url-loader在此基础上可以将小于指定体积的文件已base64字符串形式内嵌

eslint-loader
> 默认调用 .eslintrc.js配置文件

.eslintrc.js
```js
//.eslintrc.js
module.exports = {
    root:true,  //根配置文件(因为配置文件可继承)
    parser:"babel-eslint", //需要一个parser解析器把代码转换成AST抽象语法树
    //继承airbnb，需要安装 eslint-config-airbnb，不用自己手动配置
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
        "indent": ["error",2],      //缩进风格
        "quotes":  "off",           //引号类型 
        "no-console": "off",        //禁止使用console
    }
}
```
> 自动修复，推荐vscode 插件 ESLint

### babel-loader 

babel-loader 作用是内部调用babel-core
 presets：Array [pluginName,optionsObject] 预设，是插件的集合。
- 1、babel-core 作用是进行 语法树与代码 之间的转换
- 2、babel/preset-env es6转换成es5

> es6代码 => es6语法树 babelCore
> es6语法树 =》es5语法树 preset-env
> es5语法树 =》es5语代码 babelCore

babel/preset-env 选项说明
> useBuiltIns: 'usage'|'entry'|false
> false 默认值。不对polyfill处理，全部引入。
> usage 按需加载。
> entry 在入口文件手工引入polyfill。根据配置的target浏览器，引入浏览器不兼容的polyfill，这里需要指定 core-js的版本



plugins:
@babel/plugin-proposal-decorators
> legacy: Boolean 默认false；true为用stage1的语法(用废弃的语法)
@babel/plugin-proposal-class-properties
> loose:Boolean  默认 false; 定义类属性的方式
>  true 则为  this.x=1
>  false 则为 
```js
Object.defineProperty(this,'x',{
    configurable:true,
    enumerable:true,
    writable:true,
    value:'1' 
 });

 ```

### 开发环境调试

- 我们在开发环境对sourceMap的要求是：速度快，调试更友好
- 要想速度快 推荐 eval-cheap-source-map
- 如果想调试更友好 cheap-module-source-map
- 折中的选择就是 eval-source-map
### 生产环境调试
- 首先排除内联，因为一方面我们了隐藏源代码，另一方面要减少文件体积
- 要想调试友好 sourcemap>cheap-source-map/
- cheap-module-source-map>hidden-source-map/nosources-sourcemap
- 要想速度快 优先选择cheap
- 折中的选择就是 hidden-source-map 隐藏source-map

> webpack打包仍然生成sourceMap，但是将map文件挑出放到本地服务器，将不含有map文件的部署到服务器
> webpack.SourceMapDevToolPlugin  或 fiddler

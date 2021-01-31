/*
 * @description:webpack config file introduce
 * @Author: Hedy Ma
 * @Date: 2021-01-31 11:54:25
 * @LastEditTime: 2021-01-31 21:57:55
 */ 


module.exports={
  mode:'development',        //打包模式，三种 none|development|production，默认为production ----------说明①
  entry:"src/index.js",          //一个入口文件
 /* entry:{                 //多个入口文件
      app:'./src/app.js',
      search:'./src/search.js'
  }*/
  output:{                   //打包后的文件配置
    path:__dirname+'dist',  //打包后的输出目录
    filename:'bundle.js',   //打包后的文件名称 多个则为[name].js
    //打包文件bundle.js将已此目录访问 如/bundle.js==》/test/bundle.js,比如放cdn地址
    publicPath:'/'
  },
  //开发服务器配置，注意-打包后的文件在内存中
  devServer:{
      //静态文件访问目录，注意不影响output 输出的文件访问
      contentBase:path.join(__dirname,'asset'),  
      //writeToDisk:true, //默认false 是否将打包的文件输出到硬盘，默认为否，只在内存中
      compress:true,                            //启用压缩
      port:5000,                                //端口号
      //虚拟目录，该地址也可指向生成地址，使该地址可访问
     // publicPath:'http://localhost:8080/test'       

  },
  module:{
      //--说明② 常用loader介绍。注意多个loader从右向左解析。
      rules:[
          {
            test:/\.jsx?$/,
            use:'eslint-loader', 
            enforce:'pre',  //强制指定loader的运行顺序
            options:{fix:true}, //启动自动修复
            include:resolve(__dirnam,'src'), //loader应用到哪个目录
            //exclude:/node_modules/   //排除目录
        },
          {test:/\.jsx?$/,use:[{
              loader:'babel-loader',
              options:{
                  //预设
                  presets:[
                      //preset-env 可以转换JS语法 es6-》es5。但只转换基本的，不转换promise Map Set等
                      ["@babel/preset-env",{
                            useBuiltIns:'usage',    //按需加载polyfill
                            corejs:{version:3},    //指定版本，与useBuiltIns（usage和entry时）配合
                            //指定要兼容哪些浏览器
                            target:{
                                chrome:'60',
                                firefox:'60',
                                ie:'9',
                                safari:'10',
                                edge:'10'
                            }
                      }]   
                  ],
                  plugins:[
                      //支持 装饰器 符号
                      [
                          '@babel/plugin-proposal-decorators',
                          {legacy:tue}
                      ],
                      //支持类属性定义
                      [
                          '@babel/plugin-proposal-class-properties',
                          {loose:true}
                      ]      
                  ]

              }
          }]},
          {test:/\.txt$/,use:'raw-loader'},      //test 正则表达式，匹配文件名
          {test:/\.css$/,use:['style-loader','css-loader']},     //use String 一个loader;|String Array 多个loader;|Object Array 多个带参数配置的loader 
          {test:/\.(jpg|png|gif|bmp)$/,use:[{
              loader:'url-loader',
              options:{
                  name:'[hash:10].[ext]',   //将文件改名为 哈希值的前十位+原来的扩展名
                //name:'[path][name].[ext]',
                  esModule:false,
                  limit:8*1024
              }
          }]            
      ]
  }

}


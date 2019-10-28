# next_project 同构REACT应用
react + next 使用服务端渲染 缩短首屏加载时间 采用同构策略

## 初始化项目
react react-dom next依赖 安装
编写第一个组件进行渲染

## 路由
next/link 包 

## 添加第三方组件库
ant-design 按需加载需要安装babel-plugin-import .babelrc文件转化器配置
服务端加载css报错： 安装@zeit/next-css 配置next.config.js
识别装饰报错：在转换器上配置["@babel/plugin-proposal-decorators", { "legacy": true }]

## 目录重构
pages只做路由的工作  components抽离组件  static静态资源 constants静态常量 

路由是否单独抽离（传参） 如果是需要重写server 

-- root  
   | -- components // 组件目录
   | -- constants  // 常量目录
   | -- pages      // 路由目录
   | -- static     // 静态资源目录
   | -- .babelrc
   | -- .eslintrc
   | -- .gitignore
   | -- package.json
   | -- ...其他配置文件

## 自定义server

可拆分出路由配置 解决具名路由（参数匹配）问题： 方案一， 使用query 方案二，使用customer server

进行环境配置与服务配置  使用中间件 路由分割

-- root  
   | -- components // 组件目录
   | -- constants  // 常量目录
   | -- pages      // 路由目录
   | -- static     // 静态资源目录
   | -- reducers   // 状态管理器
   | -- routes     // 路由配置
        | -- apis  // api配置
        | -- pages // 页面路由配置
   | -- .babelrc
   | -- .eslintrc
   | -- .gitignore
   | -- package.json
   | -- ...其他配置文件

next内置了http服务，使得不配置也可以很好地渲染页面。next也需要部署在服务器，如果不是单单渲染页面，还要输出api， 就需要custom server


## redux (redux redux-saga react-redux)

基于next进行安装需要 添加redux对next的依赖

## 再次进行目录重构

// ================ 目录结构 ================== //
——————
  | -- asserts         // ant-design全局less变量设置文件夹
  | -- components      // React展示组件(也就是UI组件)文件夹
  | -- constants       // 整个应用的常量文件夹
      | -- ActionsTypes.js   // 存放所有action type的常量文件
      | -- ApiUrlForBE.js    // 存放所有后端数据的apiUrl
      | -- ...
  | -- containers      // React状态组件文件夹
  | -- pages           // Next.js路由文件夹
  | -- redux
      | -- actions     // 处理整个应用所有的action
      | -- middlewares // 中间件，处理各种特殊情况，比如获取失败之后的message提醒
      | -- reducers    // 处理整个应用所有的reducer
      | -- sagas       // 处理整个应用所有的saga
      | -- store.js  
  | -- static          // 存放整个应用所有的静态资源(如图片等)
  | -- .babelrc
  | -- .eslintrc
  | -- .gitignore
  | -- next.config.js  // Next.js配置文件
  | -- package.json   
  | -- server.js       // 服务端server文件
  | ...

## 页面缓存

在页面缓存标记时 还有一定误差 需要进行优化

## 请求工具

支付服务端和客户端发送请求 isomorphic-unfetch  组件内服务端动作方法getInitialProps 

## 样式
css-in-js  styled-jsx 不提倡这种混合写法，单文件模块化较好


## 部署

script配置如下：

"build": "next build"
"start": "npm run build && cross-env NODE_ENV=production node server.js"
"dev": "cross-env NODE_ENV=development node server.js"

npm run build 打包项目
npm run start 生产环境部署项目
npm run dev 开发环境启动项目







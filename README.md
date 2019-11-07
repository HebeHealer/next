# next_project 同构REACT应用
react + next 使用服务端渲染 缩短首屏加载时间 采用同构策略

## 初始化项目
react react-dom next依赖 安装
编写第一个组件进行渲染

## 修改全局配置文件 
进入文件夹： cd && ls -a
查看文件： view [filename]

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
  |      -- constants       // 整个应用的常量文件夹
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

支付服务端和客户端发送请求 isomorphic-unfetch  next提供组件内服务端动作方法getInitialProps 

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

## 强调编程格式

### 函数式编程 

引入概念： 纯函数（输入输出格式一致，比如slice是，splice不是， slice的输出不会改变原始作用对象）， 另外纯函数也不会使用外部作用变量，增加了认知负荷

目的： 可缓存性、可移植性、可测试性、合理性

### JSX 语法实用性
    jsx会在执行渲染前，react dom会对任何嵌入的变量进行编码， 达到防注入攻击的目的，防止XSS
    jsx可以使用React.createElement 进行对象方式创建组件
    jsx可以是表达式，也可以嵌入表达式

### 好用API 首先检查兼容性
    上can i use 检测
    
    scrollIntoView  如果元素不在可视区域范围内，触发可使得元素滚动到可视区域范围内

### 切换加载器
    .styl 文件 安装 @zeit/next-stylus
    .css  文件 安装 @zeit/next-css
    .scss 文件 安装 @zeit/next-sass
    .less 文件 安装 @zeit/next-less

### 生命周期
    getInititialProps 场景：在页面加载时加载数据, 返回js对象  
                      运行位置： 服务器， 仅仅在page上，不可使用于子组件  触发点： 当切换link或者route时

### 组件
    1、生成<head> 添加key属性避免标签重复渲染，保证组件只渲染一次
    2、动态导入: 自定义组件，决定SRR开启， 同时加载多个模块
    3、自定义<App> _app.js : 控制页面初始化 可以处理如下事务： ① 当页面变化时保持页面布局 ② 当路由变化时保持页面状态 ③ 使用componentDidCatch 处理页面异常 ④ 注入额外数据到页面 
    4、自定义<Document> _document.js: 
    5、自定义错误处理_error.js
    6、自定义配置
    7、自定义目录配置
    8、自定义next.config.js配置 webpack
    9、启用简单命令

### 使用技能
    1、代码分割：异常边界捕获、 组件懒加载lazy、 组件降级处理（优化加载顺序）Suspense、路由分割





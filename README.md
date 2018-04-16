# vue-todo 

[![Build Status](https://travis-ci.org/wh-Coder/lyjtodo.svg?branch=master)](https://travis-ci.org/wh-Coder/lyjtodo)

> vue 入门

## 学前

- 课程目的
    - 前端工程
    - webpack
    - vue
- 课程目标
    - 配置开发时前端工程
    - 实现一个简单的 TODO 应用
    - 优化配置达到上线标准
- 前端的价值
    - 搭建前端工程
    - 网络优化
    - API 定制
    - nodejs 层

## 配置 webpack

- 执行 `npm init -y` 生成一个 package.json 文件用来管理项目依赖。（-y 表示所有默认）

- 安装需要的依赖，依赖分为两种：
    - 一种是用于开发环境的，例如 webpack 它是用来编译代码的，使用 npm install -D xxx 下载
    - 一种用于线上代码必须的， 例如 vue 它是线上必须的，使用 npm install -S xxx 下载

- 各个依赖的说明：
    - vue 
    - vue-loader
    - css-loader
    - vue-template-compiler

- 新建一个 src 目录用于存放项目代码，先写一个 app.vue 感受下写一个组件的过程

```vue

```

- 在根目录下再新建一个 webpack.config.js 这个是 webpack 的配置文件，运行 webpack 是 node 环境

- package.json 中配置一条命令：

    ```
    "scripts": {
        "build": "webpack --config webpack.config.js"
    }

    ```

    稍后，通过 npm run build 执行 webpack.config.js

- webpack 默认只是支持 js 的编译，显然 .vue 文件是不被识别的，所以需要配置。


- 完成配置后执行 npm run build 观察 dist 是不是生成了一个 dist 文件，这就是 webpack 的作用，把浏览器不认识的东西转换成认识的

- 设置跨平台常用用的依赖：cross-env

## vue2

- 数据绑定

- vue 单文件开发，组件化框架

- API重点

    - 生命周期方法

    - computed

- 继续优化 webpack

    - postcss-loader

    - autoprefixer

    - babel-loader

    - babel-core

    - babel-preset-env

    - babel-plugin-transform-vue-jsx

## vue-todo

- 保留之前的测试代码，新建一个 todo 目录


## 优化

- css 独立出来，插件：extract-text-webpack-plugin (webpack4用 npm i -D extract-text-webpack-plugin@next)

- 配置 config.optimization.splitChunks 把第三方库的 JS 独立出来

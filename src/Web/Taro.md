# Taro快速开始

## 是什么

基于React的 **类小程序解释器**。  
使用Taro组件编写代码，使用脚手架工具解释成对应平台的小程序代码，进而调试、测试、发布。

## 为什么

微信小程序糟糕且特立独行的~~架构设计~~使得代码的编写异常困难，编写的代码难以复用。使用React开发微信小程序可以提升代码复用率，**组件化**、**模块化**开发小程序可以极大地提升开发效率，使开发者尽情享受小程序的商业成果。

## 怎么做 (MacOS 2020.11.27)

- ### 环境准备

    [Node.js官网](https://nodejs.org/en/)下载安装包  
双击下载的安装包node-v14.15.1.pkg按照指引安装  
（实测最新15.3.0版本无法使用Taro）  
在终端输入`node`和`npm`检查Node.js环境

- ### 仅使用Taro

  1. 新建Taro项目（使用npx）  
    `npx @tarojs/cli init [项目名]`  

  2. 切换到项目目录，安装Node包  
    `cd [项目路径]`  
    `npm install`

  3. 解释React代码为目标平台代码  
    `npx taro build --type [目标平台]`

  - 注意事项：

    - 安装Node包时要找对路径，例如云开发路径为`./[项目名]/client`  
      不确定时可以执行`npm list`，如果提示有许多包没有安装那就对了

    - [type: 目标平台] = [weapp: 微信, alipay: 支付宝, tt: 头条, qq: 腾讯, jd: 京东, swan: 百度, h5: Web]

    - 第3条后加`--watch`并打开微信开发者工具可以边调试代码边查看模拟器

    - `src`是源代码路径，`dist`是生成的解释代码路径

    - 可能需要关闭微信开发者工具的 ES6 转 ES5 功能，关闭上传代码时样式自动补全，关闭代码压缩上传，否则可能报错

- ### 同时使用Taro-UI

  - 目前Taro和Taro-UI的适配不是很好，文档也没有及时更新，使用Taro3的模版代码竟然使用的是Taro-UI2，导致会自动下载Taro-UI2。然而UI2的架构已经无法适配，只能手动切换目前还处于开发阶段的Taro-UI3

  1. 新建Taro项目（使用npx）  
    `npx @tarojs/cli init [项目名]`  

  2. 切换到项目目录，修改packgage.json依赖，安装Node包  
    `cd [项目路径]`  
    `修改dependencies "taro-ui": "^3.0.0-alpha"`  
    `npm install`  
    tips: 如果不幸按照仅使用Taro安装了，那就删掉所有的node_modules重新安装依赖

  3. 解释React代码为目标平台代码  
    `npx taro build --type [目标平台]`

- ### 代码编写

  - Taro  
    `import React, { Component } from 'react'`  
    `import { View } from '@tarojs/components'`

  - Taro-UI  
    `在app.js全局引入一次 import 'taro-ui/dist/style/index.scss'`  
    `import { AtButton } from 'taro-ui'`  

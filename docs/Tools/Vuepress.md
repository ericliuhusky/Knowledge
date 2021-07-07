# Vuepress

## 准备

### 环境依赖

- [Node.js 12+](https://nodejs.org/en/)
- [Yarn 1](https://classic.yarnpkg.com/en/docs/install#mac-stable)

### 目录结构

```
├─ docs
│  ├─ .vuepress
│  │  ├─ .cache
│  │  ├─ .temp
│  │  ├─ public
│  │  │  └─ images
│  │  │  │  └─ logo.png
│  │  └─ config.js
│  └─ README.md
├─ node_modules
├─ .gitignore
├─ package.json
└─ yarn.lock
```

### `.gitignore`配置
```
.DS_Store
node_modules/
dist/
.cache
.temp
```

### `package.json`配置
```json
"scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
}
```
  
## 快速开始

### 1. 初始化

```shell
yarn init
```

### 2. 添加Vuepress依赖

```shell
yarn add vuepress
```

### 3. 热重载预览

```shell
yarn docs:dev
```

## Markdown扩展

#### [Markdown原生](Markdown.md)

### 目录

```markdown
[[toc]]
```

### 代码块高亮
`swift{1,3,5-6}`
```swift{1,3,5-6}
1
2
3
4
5
6
```

### 导入代码

`@[code swift]()`

@[code{1-3}](../.vuepress/config.js)

### Vue组件

`<Badge text="徽标"/>`

<Badge text="徽标"/>

## 配置

`.vuepress/congig.js`

```javascript
module.exports = {

  title: '网站标题',
  head: [['link', { rel: 'icon', href: '/images/logo.png' }]]

}
```

### 导航栏

```javascript
module.exports = {

  themeConfig: {

    navbar: [
      { text: '导航', link: '/目录/' },
      { text: '下拉列表导航', children: ['文件地址', '文件地址'] }
    ]

  }

}
```

### 侧边栏

```javascript
module.exports = {

  themeConfig: {

    sidebar: {
      
      '/目录/': [
        {
          text: '侧边栏',
          children: ['文件地址', '文件地址']
        },
        {
          text: '侧边栏',
          children: ['文件地址', '文件地址']
        }
      ]

    }

  }

}
```

### 404页面

```javascript
module.exports = {

  themeConfig: {
    notFound: ['404页面提示信息', '来到了没有知识的荒原'],
    backToHome: '返回首页'
  }

}
```

## 部署

### 1. 配置base

发布地址:`https://<USERNAME>.github.io/<REPONAME>`

设置`base`为`/<REPONAME>/`

### 2. 配置工作流

`.github/workflows/doc.yml`

```yml
name: Deploy Website CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Build
        run: |
          yarn install
          yarn docs:build
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@4.1.1
        with:
          branch: gh-pages
          folder: docs/.vuepress/dist
```

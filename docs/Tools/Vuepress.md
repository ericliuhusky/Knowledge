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

```shell
yarn init

yarn add vuepress

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

## 配置

## 部署

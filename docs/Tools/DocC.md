# DocC

DocC是Swift框架或包的文档编译器 (Documentation Compiler)。
文档标记语法 (Documentation Markup)基于Markdown，增加了特性如：标识符链接、术语定义列表、代码列表和旁注。
另可提供交互式指引。生成的文档不仅可以直接在Xcode文档窗口中查看，还可以托管在网站上。

## Requirements

- Xcode 13+
- Swift 5.5+

---

## 使用源代码中的文档注释来构建简单文档

1. 为代码添加文档注释

    <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>/</kbd>

2. 文档编译

    Product -> Build Documentation

    <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Command</kbd>+<kbd>D</kbd>

---

## 配置体验更丰富的文档

当你想要提供额外的内容（如：引导页、扩展页、文章、教程页、图片资源）时，使用文档目录 (Documentation Catalog)

文档目录是后缀名为".docc"的文件夹，引导页、扩展页和文章都是Markdown文件，
它们的区别就在于页面标题不同，分别为目标名标识符链接、待扩展的绝对路径标识符链接、纯文本

引导页是整个文档的第一个页面，扩展页用来扩展由每个标识符的文档注释生成的文档。
项目内的每个目标都可以有自己的文档目录，编译生成的文档与目标一一对应。

### 格式化文档内容

#### [Markdown原生](Markdown.md)

#### Documentation Markup特性

```markdown
``标识符链接``
<doc:文章链接>
<doc:/tutorials/教程链接>

![图像描述](图像名称)
图像文件名：图像名称~dark@2x.png

- term 术语: 定义
> Tip: 旁白
旁白类型：Note, Important, Warning, Tip, Experiment

代码块使用空格而不是Tab缩进
```

### 文档页面结构

文章无需多言就是普通的Markdown。

引导页和扩展页都要有一个页面标题，引导页标题为目标名标识符链接，扩展页标题为待扩展文档的标识符链接。

紧跟着页面标题是摘要，如果不编写摘要，文档就会显示 "No overview available."

Overview和Discussion都是可有可无的部分，可以换用其它的名字，Topics之上的部分是对页面的解释说明类似于文章非常自由。

Topics部分就是文档的层次结构了，如果不进行配置，就会使用默认的层次结构，按照protocol, struct, class等类型分类。配置之后可以使文档可以更好的按照逻辑来分类，拥有更易理解的层次结构。Topics的名字不可以随意更改，只能使用`Topics`


```markdown
# ``目标名/标识符链接``

摘要

## Overview概览

概览

## Discussion详述

详述

## Topics

### Group分组1

- ``标识符链接``

### Group分组2

- ``标识符链接``

```

## 发布部署
在Xcode文档窗口中手动导出

xcodebuild docbuild -scheme SlothCreator -derivedDataPath ~/Desktop/SlothCreatorBuild
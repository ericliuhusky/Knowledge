# CSS

## 1. css,html都不区分大小写

## 2. @imoprt 引入CSS

## 3. 元素居中

- ### 水平居中

行内元素居中

```css
.parent {
    text-align: center;
}
```

块级元素居中

```css
.child {
    margin: auto
}
```

- ### 水平垂直居中

```css
.parent {
    position: relative;
}
.child {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
```

```css
.parent {
    position: relative;
}
.child {
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

```css
.parent {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

```css
.parent {
    display: flex;
}
.child {
    margin: auto;
}
```

## 4. margin,padding对block和inline元素的不同影响

- ### 总结来说，横向内外边距对所有元素都起作用，纵向内外边距只对块级元素和可替换行内元素起作用

- ### margin-top, margin-bottom对inline元素

margin-left,margin-right对所有元素都起作用；
margin-top,margin-bottom只对块级(block)元素起作用，对大部分行内元素(inline)是不起作用的，
原因在于margin-top,margin-bottom影响不到inline元素的行高(line-height)，因此没有预期视觉效果；
不过对于可替换元素，margin-top,margin-bottom可以起作用

- ### padding-top,padding-bottom对inline元素

几乎和margin一样，只不过padding-top,padding-bottom对inline元素时，设置背景可以看到内边距增大，
可惜依然影响不到行高，不会撑开它的父级元素

## 5. rem

rem是以html中font-size为基准的相对度量单位，在这里给t类型设置宽度为10rem=10 * 20px = 200px

```css
html {
    font-size: 20px;
}
.t {
    width: 10rem;
}
```

## 6. :checked用于选择`<input type="radio"><input type="checkbox"><option>in<select>`选中的样式

## 7. :root选择文档的根元素

## 8. + 相邻兄弟选择器

## 9. :after在标签后插入

## 10. transform: translate(x,y) scale(x,y)

## 11. only 排除不支持媒体查询的浏览器

## 12. 媒体查询实现自适应布局

screen指的是浏览器窗口的大小，而不是物理设备屏幕的大小

```css
@media screen and (min-width: 1000px) and (max-width: 2100px) {

}
```

## 13. display: none;会使元素彻底消失不显示，visibility: hidden;只是隐藏不显示，但所占据的区域并不会释放

## 14. 重置(reset)CSS，就是把一些具有默认样式的元素清除自带样式，可以消除不同浏览器带来的渲染差异

## 15. CSS sprites精灵图，把小图片整合到一张图里，可以减少http请求次数，再使用backgroud-image和background-position来定位图片

## 16. 为获得统一的页面效果，给不同浏览器不同的版本写不同样式就叫做CSS hack

## 17. 高效CSS选择，组合选择器是从右到左解析的，效率: #id > .class > tag

## 18. 选择器优先级: #id > .class > tag

## 19. float浮动

向左或向右浮动，直到边缘触碰到父元素的边框或者触碰到另一个浮动元素的边框

## 20. 行内元素设置width和height无效

## 21. 块级格式上下文 BFC

BFC的目的是为了形成一个完全独立的容器，让其中的子元素不会影响到外面的布局

- ### 触发BFC的条件

  1. float不为none
  2. position: absolute/fixed
  3. display: inline-box
  4. overflow: hidden/auto/scroll

- ### BFC能解决的问题

外边距垂直方向重合

```html
<div style="overflow: hidden;">
    <div style="width: 100px;height: 100px;background: lightblue;margin: 100px;"></div>
</div>
<div style="overflow: hidden;">
    <div style="width: 100px;height: 100px;background: lightblue;margin: 100px;"></div>
</div>
```

浮动元素的父元素高度塌陷

```html
<div style="border: 1px solid #000; overflow: hidden">
    <div style="width: 100px;height: 100px;background: #eee;float: left;"></div>
</div>
```

浮动元素覆盖

```html
<div style="height: 100px;width: 100px;float: left;background: lightblue"></div>
<div style="width: 200px; height: 200px;background: #eee;overflow: hidden;"></div>
```

## 22. CSS冲突问题

CSS文件分离不等于CSS作用域分离，只要最终CSS被引入统一文件就会发生CSS污染

- ### 使用CSS预处理器，用命名空间来隔离

```css
.componentA {
    .title {
        width: 100px;
    }
}
.componentB {
    .title {
        width: 200px;
    }
}
```

```html
<div class='componentA'>
    <div class='title'></div>
</div>
<div class='componentB'>
    <div class='title'></div>
</div>
```

- ### 使用CSS in JS

- ### 配置Webpack使CSS作用域为局部module

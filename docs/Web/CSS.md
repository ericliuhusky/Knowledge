# CSS

## 1. css,html都不区分大小写

## 2. @imoprt 引入CSS

## 3. 可替换元素(replaced element)

展现效果不由CSS控制，渲染独立于CSS的元素，可理解为标签只为占位，渲染由其它替换；
有`<iframe>, <video>, <embed>, <img>, <input>`

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

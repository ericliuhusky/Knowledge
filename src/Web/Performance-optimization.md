# 性能优化

## 1. 减少http请求

## 2. 使用http2

## 3. 服务端渲染

客户端渲染：获取html,执行js,渲染
服务端渲染：返回html,解析html,渲染

## 4. 静态资源CDN加速

## 5. CSS和JavaScript标签位置

`<head>`标签里的CSS和JavaScript会阻塞渲染，但为了防止用户看到没有样式的丑陋的html骨架，CSS只能放到`<head>`里，
JavaScript则可以放到`<body>`标签的最底部

## 6. 使用字体图iconfont标代替图片图标

## 7. 缓存静态资源

添加过期时间以使得浏览器在过期时间内都使用缓存资源，另外在资源的URL中添加数据摘要(MD5)，当服务器资源更新时更新URL，
以使得浏览器加载新资源。

URL不能写死在页面中，比如要访问商品信息，可以通过访问商品接口得到要展示的商品图片的URL，每次
访问商品信息都会重新得到URL，那么图片更新的时候，就会得到新的URL，以使得浏览器重新加载资源。

小程序甚至iOS也是一样的思想，可以手动写缓存，保存资源数据和摘要，下一次访问接口比对摘要，有变化则更新缓存

## 8. 压缩文件

Webpack压缩
JavaScript：UglifyPlugin
CSS ：MiniCssExtractPlugin
HTML：HtmlWebpackPlugin

## 9. 图片优化

1. 图片延迟加载，只有当图片在可视区域才真正加载
2. 根据屏幕大小自动加载合适的图片
3. 使用WebP格式的图片

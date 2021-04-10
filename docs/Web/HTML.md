# HTML

## 1. `<bdo dir="rtl">`可以改变文本的左右书写顺序，rtl即right to left

## 2. `<small>`使用场景一般是版权信息和法律文本

## 3. `<mark>`使文本高亮

## 4. `<a>`本身是行内元素，但是子元素为块级元素时也支持块级链接

## 5. `<!DOCTYPE html>`作用是：对文档进行有效性验证，决定浏览器的呈现模式

## 6. `<div data-test-number></div>`用于数据传输，自定义数据可以从`dataset.testNumber`获取

## 7. LocalStorage永久存储，SessionStorage会话内有效，cookies会随请求发送到服务器

## 8. GET 和 POST的区别

- GET明文传输数据，数据以?和&拼接并附加在请求资源地址之后
- POST传输的数据封装在http报文的请求体(body)中

## 9. block, inline

- ### block
  
`<p>, <div>, <h1>, <ol>, <ul>, <dl>, <table>, <address>, <blockquote>, <form>`

- ### inline

`<a>, <span>, <br>, <i>, <em>, <strong>, <lable>, <q>, <var>, <cite>, <code>`

- ### inline-block

`<img>, <input>`

## 10. 可替换元素(replaced element)

展现效果不由CSS控制，渲染独立于CSS的元素，可理解为标签只为占位，渲染由其它替换；
有`<iframe>, <video>, <embed>, <img>, <input>`

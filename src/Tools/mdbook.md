# mdbook

## 环境依赖

- [Rust](https://www.rust-lang.org/)

## 快速开始

1. 安装mdbook `cargo install mdbook`
2. 创建book `mdbook init my-book`
3. 热重载预览 `mdbook serve --open`

## 配置目录

```markdown
[前缀章节](relative/path/to/markdown.md)

# 分割标题

- [第一个编号章节](relative/path/to/markdown.md)
- [第二个编号章节](relative/path/to/markdown2.md)
   - [子编号章节](relative/path/to/markdown3.md)

---

- [草稿章节]()

[后缀章节](relative/path/to/markdown2.md)
```

## 持续部署

```sh
curl -sSL https://github.com/rust-lang/mdBook/releases/download/v0.4.18/mdbook-v0.4.18-x86_64-unknown-linux-gnu.tar.gz | tar -xz
./mdbook build
```

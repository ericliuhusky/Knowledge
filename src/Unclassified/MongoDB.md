# MongoDB

## MongoDB Server

### 安装

1. 下载压缩包

`curl -C - -O https://fastdl.mongodb.org/osx/mongodb-macos-x86_64-5.0.5.tgz`

2. 解压文件

`tar -zxvf mongodb-macos-x86_64-5.0.5.tgz`

3. 将二进制程序移动到合适路径，并将该路径添加到环境变量$PATH中

`sudo mv mongodb-macos-x86_64-5.0.5 /usr/local/mongodb`

`echo 'export PATH="$PATH:/usr/local/mongodb/bin"'>>~/.zshrc`
`source .zshrc`

### 运行

1. 创建数据和日志目录

`sudo mkdir -p /usr/local/var/mongodb`
`sudo mkdir -p /usr/local/var/log/mongodb`

2. 以守护者进程的方式运行MongoDB Server

`sudo mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongod.log --fork`

3. 查看正在运行的MongoDB Server进程

`ps aux | grep -v grep | grep mongod`

4. 使用MongoDB Server内置shell与数据库交互

`mongo`

## MongoDB Shell

### 安装

1. 下载压缩包

`curl -C - -O https://downloads.mongodb.com/compass/mongosh-1.1.9-darwin-x64.zip`

2. 解压文件

`unzip mongosh-1.1.9-darwin-x64.zip`

3. 将二进制程序移动到合适路径，并将该路径添加到环境变量$PATH中

`sudo mv mongosh-1.1.9-darwin-x64 /usr/local/mongosh`

`echo 'export PATH="$PATH:/usr/local/mongosh/bin"'>>~/.zshrc`
`source .zshrc`

### 运行

`mongosh`

## MongoDB Compass

MongoDB Shell是命令行MongoDB客户端，MongoDB Compass是带有图形用户界面的MongoDB客户端

## MongoDB CRUD

### Insert

`db.collection.insertOne()`

### Query

`db.collection.find()`

### Update

`db.collection.updateOne()`

### Delete

`db.collection.deleteOne()`

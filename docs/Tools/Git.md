
# Git

## 本地仓库

- ### 基础操作

1. 初始化仓库

    `git init`

2. 添加新文件到暂存区

    `git add README.md`

3. 删除暂存区某文件

    `git rm --cache README.md`

4. 添加文件的更改到暂存区

    `git add README.md`

5. 恢复对暂存区文件的更改

    `git restore --staged README.md`

6. 从暂存区恢复工作区的文件更改

    `git restore README.md`

7. 将暂存区提交到本地仓库

    `git commit -m 'message'`

8. 重置本地仓库到指定版本，并将暂存区恢复为对应版本

    `git reset HEAD^`

9. 重提某个版本，将工作区恢复为某个版本之前的版本；并生成新的提交用于恢复远程仓库

    `git revert HEAD`

- ### 分支操作

1. 添加分支

    `git branch develop`

2. 删除分支

    `git branch -d develop`

3. 重命名分支

    `git branch -M main`

4. 强行改变某分支指向指定版本

    `git branch -f develop HEAD^`

5. 切换分支，并检出本地仓库某分支文件内容到工作区

    `git checkout develop`

    `git switch develop`

6. 添加并切换分支

    `git checkout -b develop`

    `git switch -c develop`

7. 当前分支合并某分支

    `git merge develop`

8. 变基当前分支到指定分支
   (建议此种方式合并分支)

    `git rebase develop`

9.  交互式变基，从某个版本起开始选择
    
    `git rebase -i HEAD~3`

10. 检出到某个版本，检出实际上就是改变HEAD的指向，检出到某分支，HEAD指向某分支；
    检出到某个版本而不是分支，HEAD指向某个版本，进入HEAD与分支分离的模式

    `git checkout HEAD^`


## 远程仓库

1. 克隆远程仓库到本地

    `git clone http://localhost:3000/ericliuhusky/test.git`

2. 推送本地仓库到远程仓库

    `git push`

3. 抓取远程仓库到本地的远程分支，并不与本地分支合并

    `git fetch`

4. 拉取远程仓库到本地并与本地分支合并 = `git fetch` + `git merge`

    `git pull`

5. 拉取远程仓库到本地并变基本地分支到远程分支

    `git pull --rebase`


## 查看信息

1. 查看有哪些分支

    `git branch`

2. 查看包括远程分支的所有分支

    `git branch -al`

3. 查看最近一次的提交记录以及最近一次提交相比上次提交的文件内容具体更改的不同

    `git show`

4. 查看工作区相比暂存区有哪些文件更改

    `git status`

5. 查看工作区相比暂存区的文件内容具体更改的不同

    `git diff`

6. 查看提交记录 
   (同时显示出版本哈希值和HEAD以及分支指向)

    `git log`

7. 责查用户对文件的修改记录

    `git blame README.md`

8. 查看有哪些远程仓库

    `git remote`

9. 查看远程仓库的url地址

    `git remote get-url origin`

## 配置

1. 设置提交用户信息

    `git config --global user.name 'ericliuhusky'`
    
    `git config --global user.email 'ericliuhusky@qq.com'`

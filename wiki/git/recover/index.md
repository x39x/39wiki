# git 文件恢复、撤销修改等

## 误删文件恢复

假设提交历史如下，最后一次 commit C 后误删全部文件，未 commit 的文件无法通过此方法找回

```sh
#HEAD^^:A HEAD^:B  HEAD:C
A -- B -- C (HEAD)
```

HEAD 指最后一次提交（C）
HEAD^ 指的是上一个提交（B）
`-- .` 表示当前前目录下所有文件

此命令表示把当前目录下所有文件恢复到 HEAD(commit C) 的状态，**未 commit 的更改也会一起丢失**

```sh
git checkout HEAD -- .
```

- 法2

这条命令会从最新 commit 中恢复整个 content/ 目录下的所有被删文件。

```
git restore content/blog
git restore content/wiki
```

如果只丢失部分文件，并且未丢失的文件中有修改还未提交，应逐个文件恢复

## 撤销工作区的文件修改

如果工作区的某个文件被改乱了，但还没有提交，可以用git checkout命令找回本次修改之前的文件。

```bash
git checkout -- [filename]
```

> [!WARNING]  
> 注意，工作区的文件变化一旦被撤销，就**无法找回**了。

它的原理是先找暂存区，如果该文件有暂存的版本，则恢复该版本，否则恢复上一次提交的版本

## 从暂存区撤销文件

如果不小心把一个文件添加到暂存区，可以用下面的命令撤销

```bash
git rm --cached [filename]
```

上面的命令不影响已经提交的内容

## 撤销当前分支的变化

在当前分支上做了几次提交，发现放错了分支，这几个提交本应该放到另一个分支

```bash
# 新建 feature 分支，指向当前最新的提交，这时依然停留在main分支
git branch feature
#将main分支切换到这几次提交之前的状态
git reset --hard [当前分支此前的最后一次提交]
#切换到 feature 分支
git checkout feature
```

上面的操作等于是将这些变化放到一个新建的分支，然后撤销当前分支的变化

## git reflog

git reflog 记录的是对 HEAD 引用的所有变动，而不仅仅是提交。它包括提交、分支切换、重置等操作。reflog 是本地的，并不会被推送到远程仓库，用于恢复误操作、找回丢失的提交等。

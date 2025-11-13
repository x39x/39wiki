# 常用命令

[GitHub Documentation](https://docs.github.com/cn/get-started)

[GIt Documentation](https://git-scm.com/doc)

## git stash 暂存

暂存不想 add 的修改

```sh
git stash # stash not add file
git stash pop  # pop stash file
git stash list
git stash show -p
```

## Branch

```sh
#shows branches
git branch

# creates a branch
git branch (name)

# creates a branch and switches to it
git checkout -b (name)

#查看分支最后一次提交
- git branch -v

#delete branch
#删除本地分支
git branch -d localBranchName
#删除远程分支
git push origin --delete remoteBranchName
```

github 上的默认分支必须去仓库页 setting 解除保护后删除

| 命令                      | 说明                                   |
| ------------------------- | -------------------------------------- |
| git branch -d branch-name | 安全删除，必须是已经完全合并的分支     |
| git branch -D branch-name | 强制删除，即使还有没合并的内容也直接删 |

## git cherry pick

git cherry-pick是一个很强大的命令，它可以将任何Git提交的内容单独拿出来，然后追加到当前HEAD快照中。比如在某一个分支中的某一次提交可以使用cherry-pick应用到另外一个分支中。git cherry-pick可以用于撤回改变。比如说某一次提交被放入了错误的分支，那么可以切换到正确的分支，然后使用cherry-pick将这次提交拿到正确的分支中。

```sh
git cherry-pick xxx
```

```sh
git checkout HEAD^ -- .gitignore
```

## squash

`--squash` 选项的含义是：本地文件内容与不使用该选项的合并结果相同，但是不提交、不移动HEAD，因此需要一条额外的commit命令。其效果相当于将another分支上的多个commit合并成一个，放在当前分支上，原来的commit历史则没有拿过来。

```bash
git merge/rebase --squash developing
git commit -m "message here"
```

## diff and log

```sh
# shows a flattened log of history
git log

# visualizes history as a graph
git log --all --graph --decorate

# show changes you made relative to the staging area
git diff (filename)

# shows differences in a file between snapshots
git diff (revision) (filename)

# updates HEAD and current branch
git checkout (revision)
```

## rm rename

```sh
# 从本地删除，不会出现在未跟踪文件中
- git rm （-f 强制删除在stage里的）

不在跟踪，本地依然存在
- git rm --cached file

rename
- git mv a b
```

## reset

```sh

`git reset HEAD  file` // unuse

`git reset --soft HEAD^`
```

HEAD^ 表示上一个版本，即上一次的commit，也可以写成HEAD~1 如果进行两次的commit，想要都撤回，可以使用HEAD~2

1. `—soft` 不删除工作空间的改动代码 ，撤销commit，不撤销git add file
2. `-hard` 删除工作空间的改动代码，撤销commit且撤销add
3. 如果commit注释写错了，先要改一下注释 `git commit --amend`

## 拉取变化

```sh
# retrieve objects/references from a remote
git fetch

# same as git fetch; git merge
git pull

# 查看远程仓库状态
git remote show remote

# not git fetch and git merge
git pull --rebase
```

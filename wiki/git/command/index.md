# git 常用命令

## git stash 暂存

暂存不想 add 的修改

```sh
git stash # stash not add file
git stash pop  # pop stash file
git stash list
git stash show -p
```

## delete branch

github 上的默认分支必须去仓库页 setting 解除保护后删除

| 命令                      | 说明                                   |
| ------------------------- | -------------------------------------- |
| git branch -d branch-name | 安全删除，必须是已经完全合并的分支     |
| git branch -D branch-name | 强制删除，即使还有没合并的内容也直接删 |

```sh
#删除本地分支
git branch -d localBranchName
#删除远程分支
git push origin --delete remoteBranchName
```

## rebase merge

```bash
git rebase/merge
#CONFLICT -> fix conflicts
git rebase/merge --continue
```

## git remote

### 查看与设置 Remote URL

```bash
git remote -v                      # 查看所有 remote 的 fetch/push URL
git remote show <name>            # 查看指定 remote 的详细信息
git remote get-url <name>         # 获取 fetch URL
git remote get-url --push <name> # 获取第一个 push URL
git remote get-url --push --all <name> # 获取所有 push URL
```

### 添加多个 push URL 到同一个 remote

```bash
git remote set-url --add --push <name> <url>  # 添加 push URL
```

注意：  
一旦使用 `--push` 设置 URL，Git 会**清除默认的 push 设置**，只保留你手动添加的。

示例（添加 GitHub 和 GitLab）：

```bash
git remote set-url --push github https://github.com/x39x/39link.git
git remote set-url --add  --push github https://gitlab.com/x39x/39link.git
```

### 推送到多个 URL

```bash
git push github <branch>
```

若有多个 push URL，Git 会依次推送到每一个。

## git cherry pick

git cherry-pick是一个很强大的命令，它可以将任何Git提交的内容单独拿出来，然后追加到当前HEAD快照中。比如在某一个分支中的某一次提交可以使用cherry-pick应用到另外一个分支中。git cherry-pick可以用于撤回改变。比如说某一次提交被放入了错误的分支，那么可以切换到正确的分支，然后使用cherry-pick将这次提交拿到正确的分支中。

```sh
git cherry-pick xxx
```

```sh
git checkout HEAD^ -- .gitignore
```

## git rebase -i 交互式变基

### 基本命令

```bash
git rebase -i <commit>
# 或
git rebase -i HEAD~N
```

- `<commit>`：要从哪个提交之后开始变基。
- `HEAD~N`：表示从当前 HEAD 向上 N 个提交开始。

### 常见操作关键词

| 命令     | 含义说明                             |
| -------- | ------------------------------------ |
| `pick`   | 使用该提交（默认行为）               |
| `reword` | 修改该提交的说明                     |
| `edit`   | 暂停变基，允许你修改该提交内容       |
| `squash` | 将该提交与上一个提交合并，并编辑说明 |
| `fixup`  | 与 squash 类似，但跳过提交说明编辑   |
| `drop`   | 删除该提交                           |

### 示例操作

```bash
git rebase -i HEAD~3
```

编辑器中可能出现：

```
pick 1234abc Fix typo
pick 5678def Add feature X
pick 9abc012 Refactor code
```

你可以修改为：

```
pick 1234abc Fix typo
squash 5678def Add feature X
reword 9abc012 Refactor code
```

含义：

- 第二个提交将合并到第一个提交中
- 第三个提交保留，但会要求修改提交说明

### 变基过程中的操作

- 遇到冲突时：

    ```bash
    # 解决冲突后
    git add <filename>
    git rebase --continue
    ```

- 放弃变基：

    ```bash
    git rebase --abort
    ```

- 跳过当前提交（不推荐）：
    ```bash
    git rebase --skip
    ```

### 使用场景

- 合并多个杂乱提交为一个逻辑清晰的提交（squash）
- 修改提交说明（reword）
- 删除误提交（drop）
- 调整提交顺序（上下移动行）

## squash

`--squash` 选项的含义是：本地文件内容与不使用该选项的合并结果相同，但是不提交、不移动HEAD，因此需要一条额外的commit命令。其效果相当于将another分支上的多个commit合并成一个，放在当前分支上，原来的commit历史则没有拿过来。

```bash
git merge/rebase --squash developing
git commit -m "message here"
```

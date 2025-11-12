# commit 撤销、丢弃

## 撤销提交

revert的原理是，在当前提交后面，新增一次提交，抵消掉上一次提交导致的所有变化。它不会改变过去的历史，所以是首选方式，没有任何丢失代码的风险。

git revert 命令只能抵消上一个提交，如果想抵消多个提交，必须在命令行**依次**指定这些提交

```bash
#提交代码以后，提交有问题，应该撤销掉
git revert HEAD
git revert [倒数第一个提交] [倒数第二个提交]
--no-edit #执行时不打开默认编辑器，直接使用 Git 自动生成的提交信息。
--no-commit #只抵消暂存区和工作区的文件变化，不产生新的提交。
```

## 丢弃提交

如果希望以前的提交在历史中彻底消失，而不是被抵消掉，可以使用git reset命令，丢弃掉某个提交之后的所有提交。

```bash
git reset [last good SHA]
reset --hard [last good SHA]
```

git reset的原理是，让最新提交的指针回到以前某个时点，该时点之后的提交都从历史中消失。 默认情况下，git reset不改变工作区的文件（但会改变暂存区），`--hard`参数可以让工作区里面的文件也回到以前的状态。

执行git reset命令之后，如果想找回那些丢弃掉的提交，可以使用git reflog命令，不过这种做法有时效性，时间长了找不回来。

## amend 追加提交内容

```bash
# 把漏提交的文件添加进 stage
git add path/to/missing-file
# 使用 --amend 将它们补进上一次 commit
git commit --amend
```

编辑 commit message（默认会打开编辑器），可以保留原信息或修改，保存退出即可
如果不想改 commit message，可以加 --no-edit

```bash
git commit --amend --no-edit
```

它的原理是产生一个新的提交对象，替换掉上一次提交产生的提交对象

- 用法2: 修改 commit 信息

提交信息写错，这时可以使用 amend 修改上一次的提交信息

```bash
git commit --amend -m "Fixes bug #42"
```

> 注意: 这时如果暂存区有发生变化的文件，会一起提交到仓库。

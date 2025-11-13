# gitignore

在 Git 项目内建立 .gitignore，写入需要忽略的文件，或者在 ~/.gitignore_global 写入文件进行全局忽略 然后对git进行全局设置，让 git 忽略 .gitignore_global 中的所有文件：

```sh
git config --global core.excludesfile ~/.gitignore_global

# or in config file
[user]
name = xxx
email = xxx@mail.com

[core]
excludesfile = ~/.gitignore_global
```

这样就不用每个 git 目录都设置忽略 .DS_Store 等文件了

## 格式

1. 注释`＃`

2. 第一个 `/` 会匹配路径的根目录，`/*.html`会匹配`index.html`，而不是`d/index.html`

3. `*` 匹配任意个任意字符，`?` 匹配一个任意字符

4. `* ?` 不会匹配文件路径中的 `/`，举个栗子，`d/*.html` 会匹配 `d/index.html`，但不会匹配`d/a/b/c/index.html`

5. 以 `**/` 开头表示匹配所有的文件夹，`**/test.md` 匹配所有的test.md文件

6. 以 `/**` 结尾表示匹配文件夹内所有内容，例如 `a/**` 匹配文件夹a中所有

7. `**` 前后分别被 `/` 夹住表示匹配0或者多层文件夹，例如 `a/**/b` 匹配到 `a/b` 、`a/x/b`、`a/x/y/b` 等

8. 前缀 `!` 表示如果前面匹配到被忽略，则重新添加回来。如果匹配到的父文件夹还是忽略状态，该文件还是保持忽略状态。如果路径名第一个字符为 `!` ，则需要在前面增加 `\` 进行转义

# 笔记

## bash zsh

zsh把“命令行输入框”当成一个可编程对象（ZLE） bash 只是 readline 的一层绑定

zsh 在交互、插件开发等方面更出色，比bash更易用，但速度略慢于zsh

## `[` 是`test`的别名

`[`并不是shell语法，而是一条命令

```sh
which [
/bin/[
```

判断一个条件如:

```bash
# -a:and, -o:or
[ "$(uname)" = "Darwin" -a -f "/opt/homebrew/bin/brew" ]
```

不能执行命令为条件

```bash
# 命令执行失败/成功不能当作条件
[ command -v nvim >/dev/null 2>&1 ]
```

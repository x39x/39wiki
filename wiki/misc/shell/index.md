# shell 配置，sh 语法

## 快捷键

### 光标移动

| 快捷键   | 含义                        |
| -------- | --------------------------- |
| `Ctrl-a` | 移动到行首                  |
| `Ctrl-e` | 移动到行尾                  |
| `Alt-b`  | 向后移动一个单词（word）    |
| `Alt-f`  | 向前移动一个单词            |
| `Ctrl-b` | 向左移动一个字符            |
| `Ctrl-f` | 向右移动一个字符            |
| `Ctrl-l` | 清屏（相当于 `clear` 命令） |

### 编辑命令

| 快捷键   | 含义                                     |
| -------- | ---------------------------------------- |
| `Ctrl-k` | 删除光标到行尾                           |
| `Ctrl-u` | 删除光标到行首                           |
| `Ctrl-w` | 删除光标前一个“单词”（以空格为单位）     |
| `Alt-d`  | 删除光标后一个“单词”                     |
| `Ctrl-d` | 删除光标所在字符（Del）                  |
| `Ctrl-h` | 删除光标前一个字符（Backspace）          |
| `Ctrl-t` | 交换光标前后两个字符                     |
| `Alt-t`  | 交换光标前后两个单词                     |
| `Ctrl-y` | 粘贴最后一次删除的内容（yank）           |
| `Alt-.`  | 插入上一条命令的最后一个参数（超级实用） |

### 历史命令相关

| 快捷键   | 含义                                 |
| -------- | ------------------------------------ |
| `Ctrl-r` | 反向搜索历史命令（增量搜索）         |
| `Ctrl-p` | 上一条历史命令（等同 ↑）             |
| `Ctrl-n` | 下一条历史命令（等同 ↓）             |
| `Alt-p`  | 向后搜索历史中与当前命令前缀匹配的项 |
| `Alt-n`  | 向前搜索历史中与当前命令前缀匹配的项 |

### 命令处理

| 快捷键   | 含义                                 |
| -------- | ------------------------------------ |
| `Ctrl-c` | 终止当前命令                         |
| `Ctrl-z` | 挂起当前任务（send to background）   |
| `Ctrl-o` | 执行当前命令并立即加载下一条历史     |
| `Ctrl-s` | 暂停终端（可用 `Ctrl-q` 恢复）       |
| `Ctrl-q` | 恢复终端输出（如果被 `Ctrl-s` 暂停） |

- `Alt-.` 快速重复上次命令最后一个参数（比如目录名）。

## 后台运行

[nohup命令行后面的& 符合代表什么意思？？](https://www.zhihu.com/question/40910876/answer/932403152)

1. 任务在后台运行，不阻塞当前终端

```sh
sleep 100 &
```

2. 运行后在 C-z 暂停，使用 bg 让暂停的任务在后台继续运行

3. 查看后台任务使用jobs（jobs -l）拉回前台使用 fg

4. nohup python train.py > output.log 2>&1 &

nohup 表示 no hang up ，常住后台，关闭终端不影响

## 切换shell

```bash
echo $SHELL
cat /etc/shells #add /bin/zsh
chsh -s /bin/zsh
```

## sh配置文件读取规则

### 登陆shell

#### bash

etc/profile `->` etc/profile.d `->` ~/.bash_profile `->` ~/.bash_login `->` ~/.profile `->` ~/.bashrc

其中前两者是系统级，其中bash_profile、bash_login、profile 为用户级，读取到任意一个就会停止不会重复加载，登陆时不会自动读取bashrc

#### zsh

- /etc/zshenv `->` ~/.zshenv `->` etc/zshrc `->` ~/.zshrc

zprofile: login , zshenv: always

`.zlogin` and `.zlogout`

- [参考](https://unix.stackexchange.com/questions/71253/what-should-shouldnt-go-in-zshenv-zshrc-zlogin-zprofile-zlogout)

### 非登陆shell

只加载xxshrc

## set and unset

- set

```bash
#子命令失败，整个管道命令就失败，脚本终止执行。搭配 -e 使用
set -o pipefail
#脚本只要发生错误，就终止执行,set +e表示关闭-e选项，set -e表示重新打开-e选项
set -o errexit = set -e
#遇到不存在的变量报错，并停止执行
set -o nounset = set -u
#在运行结果之前，先输出执行的那一行命令行,首以 + 表示
set -o xtrace   = set -x
```

- unset

```bash
# -f 　仅删除函数 -v 　仅删除变量。
unset [-fv][变量或函数名称]
```

## 单引号双引号

1. 单引号（' '）：单引号内的内容会被原样保留，不进行变量替换或命令替换。

2. 双引号（" "）：双引号内的内容会进行变量替换和命令替换。

例如：

```bash
$ echo '$(date)'
$(date)

$ echo "$(date)"
Mon Jul  1 12:34:56 UTC 2024
```

## shell 中变量的使用

`${VAR}` 和 `$VAR`：用于引用变量的值。`${VAR}` 提供了更多的灵活性，可以在变量名后紧跟其他字符时避免混淆。

`$(VAR)`：用于命令替换，将命令的输出赋值给变量或用于其他地方。

### 直接使用变量：`$VAR`

这是最常见的用法，用于直接引用变量的值。

```sh
NAME="Alice"
echo "Hello, $NAME!"
Hello, Alice!
```

### 使用大括号：`${VAR}`

使用 `${VAR}` 可以避免变量名和后续字符混淆，并且允许在变量扩展中使用一些特性。

```sh
NAME="Alice"
echo "Hello, ${NAME}!"
Hello, Alice!
```

避免混淆：

```sh
NAME="Alice"
echo "${NAME}123"  # 明确表示变量名结束
Alice123

# 如果不使用大括号，可能会产生混淆：
echo "$NAME123"  # 这里会尝试查找变量 NAME123
```

### 默认值：`${VAR:-default}`

如果变量未设置或为空，可以使用默认值。

```sh
echo "${USERNAME:-guest}"
```

如果 `USERNAME` 未设置或为空，则输出 `guest`。

### 变量替换：`${VAR/pattern/replacement}`

替换变量值中的某个部分。

```sh
PATH="/usr/bin:/bin:/usr/sbin:/sbin"
echo "${PATH/bin/local/bin}"
/usr/local/bin:/bin:/usr/sbin:/sbin
```

### 子字符串：`${VAR:offset:length}`

提取变量值中的子字符串。

```sh
TEXT="Hello, World!"
echo "${TEXT:7:5}"
World
```

### 获取变量长度：`${#VAR}`

```sh
TEXT="Hello, World!"
echo "${#TEXT}"
13
```

### 移除前缀或后缀：`${VAR#pattern}` 和 `${VAR%pattern}`

移除最短匹配的前缀：

```sh
FILE="archive.tar.gz"
echo "${FILE#*.}"
tar.gz
```

移除最短匹配的后缀：

```sh
echo "${FILE%.*}"
archive.tar
```

### 移除最长匹配的前缀或后缀：`${VAR##pattern}` 和 `${VAR%%pattern}`

移除最长匹配的前缀：

```sh
echo "${FILE##*.}"
gz
```

移除最长匹配的后缀：

```sh
echo "${FILE%%.*}"
archive
```

### 检查变量是否设置：`${VAR:+value}`

如果变量设置了，就使用 `value`，否则不进行任何替换。

```sh
USERNAME="Alice"
echo "${USERNAME:+User is set}"
User is set
```

如果 `USERNAME` 未设置，则不输出任何内容。

### 检查变量是否为空：`${VAR:?error message}`

如果变量未设置或为空，则打印错误消息并退出。

```sh
USERNAME="Alice"
echo ${USERNAME:?USERNAME is not set}
Alice
```

如果 `USERNAME` 未设置或为空，则输出：

```
bash: USERNAME: USERNAME is not set
```

## Tips

### sh 中 `source` 是 `.` 的别名，为了兼容性一般建议后者

```bash
. "$HOME/.cargo/env"
source "$HOME/.cargo/env"
```

### `[]` 是`test`的别名

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

### printf

不使用引号将变量传递给 printf，当变量值包含空格或其他特殊字符时，printf 命令会将其视为多个参数，而不是单个参数。

```bash
printf "$desktop_path"
```

### zip and unzip

解压缩名为 filename.zip 的 ZIP 文件，并将其内容提取到名为 directory_name 的新文件夹中，如果目录不存在，它会被创建

```bash
unzip filename.zip -d directory_name
```

这将创建名为 archive.zip 的 ZIP 文件，并将 file1、file2 和 file3 添加到其中。你还可以指定目录，以压缩整个目录及其内容：

```bash
zip archive.zip file1 file2 file3
```

### test if a command exist

```bash
command -v nvim >/dev/null 2>&1 && export EDITOR="nvim"
```

`>/dev/null` : 将输出重定向到 null

`2>&1`: 将标准错误重定向到标准输出

### 在 ssh 时

```sh
[ -n "$SSH_TTY" ] && command -v fish >/dev/null 2>&1  && exec fish
```

# 笔记｜技巧｜工具

## replace character

```sh
# use “tr” replace  ' '  with  '/n'
your-shell-command | tr ' ' '\n'`
```

## test if a command exist

```bash
command -v nvim >/dev/null 2>&1 && export EDITOR="nvim"
```

`>/dev/null` : 将输出重定向到 null

`2>&1`: 将标准错误重定向到标准输出

## if in ssh

```sh
[ -n "$SSH_TTY" ] && command -v fish >/dev/null 2>&1  && exec fish
```

## 后台运行

[nohup命令行后面的& 符合代表什么意思？？](https://www.zhihu.com/question/40910876/answer/932403152)

```sh
sleep 100 &
```

1. 任务在后台运行，不阻塞当前终端

2. 运行后在 C-z 暂停，使用 bg 让暂停的任务在后台继续运行

3. 查看后台任务使用jobs（jobs -l）拉回前台使用 fg

4. nohup python train.py > output.log 2>&1 &

5. nohup 表示 no hang up ，常住后台，关闭终端不影响

## 测试网络

```sh
curl https://clients3.google.com
```

this URL is the best option to ping as it should work 24/7 without maintenance pause

## 一些命令行工具收集

- 计算代码行数

https://github.com/XAMPPRocky/tokei

- 画图

gnuplot

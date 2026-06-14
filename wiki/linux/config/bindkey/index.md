# 改键

- https://github.com/rvaiya/keyd

keyd在内核劫持物理键盘的输入，但是输出时 `[command alt ctrl shift]`
这些修饰键默认的键值都是左边的，即 `command_r` 也会输出 `commadn_l` 的键值，
需要在配置文件中指定来修复

```ini
[main]
rightmeta=rightmeta
rightalt=rightalt
rightcontrol=rightcontrol
rightshift=rightshift
```

## 按键模拟

- https://github.com/ReimuNotMoe/ydotool

    https://askubuntu.com/questions/1413829/how-can-i-install-and-use-the-latest-ydotool-keyboard-automation-tool-working-o

- https://github.com/atx/wtype

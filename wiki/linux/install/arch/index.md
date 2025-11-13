# arch 安装

## 硬盘分区

Eg: 8g+128g

| 分区                 | 文件系统 | 大小 | 挂载点      | 说明                                                                       |
| -------------------- | -------- | ---- | ----------- | -------------------------------------------------------------------------- |
| **EFI 分区**         | FAT32    | 1G   | `/boot/efi` | 存放 UEFI 引导文件，必须为 FAT32 格式。旧电脑可能会不支持,使用传统引导     |
| **SWAP 分区**        | swap     | 10GB | `swap`      | 虚拟内存，支持内存溢出或休眠，一般为内存的1～2倍，支持休眠功能需不小于内存 |
| **根分区 `/`**       | ext4     | 40GB | `/`         | 存放系统文件，支持应用和软件安装。                                         |
| **用户数据 `/home`** | ext4     | 60GB | `/home`     | 存放用户数据和配置文件，适用于日常使用。                                   |

[Debian分区](https://www.yitu.xyz/2022/04/05/%E6%89%8B%E5%8A%A8%E5%88%86%E5%8C%BAdebian-boot%E3%80%81-swap%E3%80%81root%E3%80%81-home%E3%80%81-tmp%E3%80%81-srv%E3%80%81-var/)

## font

- noto-fonts
- noto-fonts-cjk
- noto-fonts-emoji
- noto-fonts-extra
- ttf-iosevkaterm-nerd
- ttf-fira-code

配置参考：https://catcat.cc/post/2021-03-07

## Volum

- https://wiki.archlinuxcn.org/wiki/WirePlumber
- https://wiki.archlinuxcn.org/wiki/PipeWire
- https://linuxgenie.net/install-pipewire-on-arch-linux/

```sh
pipewire         # 音频、视频流和硬件处理的核心服务
wireplumber      # PipeWire 的会话和策略管理器
pipewire-alsa    # pulse  兼容层
pipewire-pulse   # ALSA 兼容层
```

## 背光调节

https://github.com/Hummer12007/brightnessctl

## proxy

https://arch.icekylin.online/guide/rookie/transparent.html

## sway

- i3blocks
- swaybg
- swaylock
- swayidle
- tofi

### Input

- 查看设备名称。

```sh
swaymsg -t get_inputs

# 输出类似这样：
{
    "identifier": "1133:16450:Logitech_USB_Receiver",
    ...
}
```

- 调试

```sh
xkbcli interactive-wayland
```

- 键盘

    https://www.reddit.com/r/swaywm/comments/1b8hw3u/using_super_l_and_super_r_as_two_distinct/

- 鼠标、触控板

```sh
# accel_profile: #设置加速模式，adaptive（动态加速）或 flat（恒定速度）
# pointer_accel: #设置加速度，范围通常是 -1.0 到 1.0
# natural_scroll enabled # 是否启用自然滚动方向
# scroll_factor 1.5 # 滚轮滚动速度倍数（不一定所有设备都支持）
input "1133:16450:Logitech_USB_Receiver" {
    accel_profile "adaptive"
    pointer_accel 0.3
    natural_scroll enabled
}
```

## 剪切板

- https://github.com/bugaevc/wl-clipboard

    Wayland 的命令行复制/粘贴工具

- https://github.com/sentriz/cliphist

    支持多媒体的 Wayland 剪贴板管理器

配合 wtype

## 改键

- https://github.com/rvaiya/keyd
- https://github.com/xremap/xremap
- https://github.com/waycrate/swhkd

## 截图

- https://github.com/emersion/slurp
- https://git.sr.ht/~emersion/grim/
- https://github.com/jtheoof/swappy

```sh
#  对整个屏幕截屏
grim 截屏.png
# 在 Sway 中对当前窗口截屏
swaymsg -t get_tree | jq -r '.. | select(.focused?) | .rect | "\(.x),\(.y) \(.width)x\(.height)"' | grim -g - 截屏.png
# 在 Hyprland 中对当前窗口截屏
hyprctl -j activewindow | jq -r '"\(.at[0]),\(.at[1]) \(.size[0])x\(.size[1])"' | grim -g - 截屏.png
# 对选区截屏
slurp | grim -g - 截屏.png
# 对选区截屏并使用 wl-clipboard包 将结果存入剪贴板
slurp | grim -g - - | wl-copy

# swappy 编辑图片
grim -g "$(slurp)" - | swappy -f -
swappy -f "~/Desktop/my-gnome-saved-file.png"
# Grab a swappshot from a specific window under Sway, using swaymsg and jq:
grim -g "$(swaymsg -t get_tree | jq -r '.. | select(.pid? and .visible?) | .rect | "\(.x),\(.y) \(.width)x\(.height)"' | slurp)" - | swappy -f -
```

## 屏幕录制

- https://github.com/ammen99/wf-recorder

```sh
# 对整个屏幕录屏
wf-recorder -f recording.mp4
# 对选区录屏
wf-recorder -g "$(slurp)"
```

- https://wiki.archlinuxcn.org/wiki/%E5%B1%8F%E5%B9%95%E6%8D%95%E8%8E%B7#Wayland

## 按键模拟

- https://github.com/ReimuNotMoe/ydotool

    https://askubuntu.com/questions/1413829/how-can-i-install-and-use-the-latest-ydotool-keyboard-automation-tool-working-o

- https://github.com/atx/wtype

## 多媒体

### 图片查看

- https://sr.ht/~exec64/imv/
- https://github.com/artemsen/swayimg

### 音乐播放

- https://wiki.archlinux.org/title/Music_Player_Daemon

### 视频播放

- https://github.com/mpv-player/mpv

## 防火墙

- https://wiki.archlinux.org/title/Nftables

- https://wiki.archlinux.org/title/Firewalld

- https://wiki.archlinux.org/title/Uncomplicated_Firewall

## TODO

- https://github.com/elkowar/eww

    桌面小组件

- https://github.com/emersion/mako
- https://github.com/dunst-project/dunst

    通知

- https://github.com/coffeeispower/woomer

    Zoomer application for Wayland inspired by tsoding's boomer

- https://github.com/hyprwm/hyprpicker

    Wayland color picker

- https://gitlab.com/chinstrap/gammastep

    自动调节屏幕色温

---

## U盘

```sh
lsblk
#或者：
dmesg | tail
#通常U盘会出现在 /dev/sdX，如 /dev/sdb1。

#创建挂载点并挂载：
sudo mkdir /mnt/usb
sudo mount /dev/sdb1 /mnt/usb

cp -r /mnt/usb/Documents ~/

#卸载U盘：
sudo umount /mnt/usb
```

## pack

```sh
# sys
linux 6.15.2.arch1-1
linux-firmware 20250508.788aadc8-2
base 3-2
base-devel 1-2
# hw
intel-ucode 20250512-1
vulkan-intel 1:25.1.3-3

# ctr
iwd 3.9-1
brightnessctl 0.5.1-3
# yay
archlinuxcn-keyring 20250531-1
yay 12.5.0-1
###
daed 1.0.0-1
# wm
sway 1:1.11-1
swaybg 1.2.1-1
swayidle 1.8.0-2
swaylock 1.8.2-1
i3blocks 1.5-4
tofi 0.9.1-3
mako 1.10.0-1
# uf
swappy 1.5.1-2
slurp 1.5.0-1
grim 1.4.1-3
wl-clipboard 1:2.2.1-2
cliphist 1:0.6.1-1
wtype 0.4-2
# im
fcitx5 5.1.12-1
fcitx5-gtk 5.1.3-1
fcitx5-qt 5.1.9-6
fcitx5-rime 5.1.10-1
# md
mpv 1:0.40.0-3
imv 4.5.0-5
# xx
unzip 6.0-22
man-db 2.13.1-1
openssh 10.0p1-3
nodejs-lts-jod 22.16.0-1
npm 11.4.1-1
```

https://github.com/tldr-pages/tlrc

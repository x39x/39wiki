# Linux 新系统基本配置

常见系统都预装 sudo ，Debian等默认无 `sudo`

## 安装 `sudo` 并添加用户

```bash
su --login (or su -简写形式) # 需要root密码
apt update
apt install sudo
```

将用户添加到 `sudo` 组， 假设用户名为 `user1`：

```bash
su - # 需要root密码
usermod -aG sudo user1
```

### 验证配置

检查 `/etc/sudoers` 文件中是否有以下内容：

```
%sudo   ALL=(ALL:ALL) ALL
```

如果没有，可以使用 `visudo` 编辑该文件，添加上述内容。

需要注销并重新登录以应用更改, 可以通过以下命令验证是否具有 `sudo` 权限：

```bash
# 输出为 `root`，说明配置成功。
sudo whoami
```

### 使用 root 用户

```bash
sudo -i
sudo su
exit
```

## 其他

如果只想授予某些特定命令的权限，可以通过 visudo 为用户设置更精细的规则,
假设用户名为 `user1`：

```bash
# sudo command;sudo apt update 可以不需要密码执行
user1 ALL=(ALL) NOPASSWD: /path/to/command
user1 ALL=(ALL) NOPASSWD: /usr/bin/apt update
```

- 第一个 ALL： 适用于所有主机。如果在多主机环境下使用 sudoers 文件，可以指定特定的主机

- 第二个 ALL：允许以任何用户身份运行命令。默认是 root，但也可以指定为其他用户（如user1）

- NOPASSWD：表示执行该命令时，不需要输入用户密码。

> 在大型公司或云服务提供商的数据中心，可能有成百上千台服务器，分布在不同的物理位置上。这些服务器通常需要统一的管理和配置，而 sudoers 文件可以帮助管理员在不同的机器上以一致的方式管理用户权限。
>
> 例如，可能有多台 Web 服务器、数据库服务器、缓存服务器等，而管理员希望所有这些服务器上的某些用户能够执行相同的管理命令（例如备份、更新等），并且以相同的权限执行。

### 清除当前用户的 sudo 缓存，

下一次使用 sudo 将要求再次输入密码，适合完成任务后立即撤销 sudo 权限。

```bash
sudo -k
```

### 调整 sudo 的超时时间，

修改 sudo 配置 `/etc/sudoers`

```bash
Defaults timestamp_timeout=0
```

- 设置为 0：每次使用 sudo 都需要输入密码。
- 设置为负数（如 -1）：授权后永久有效，直到用户注销或清除缓存。

# 输入法

## Package

```
fcitx5 fcitx5-gtk fcitx5-qt fcitx5-configtool fcitx5-rime
```

- fcitx5: 输入法基础框架主程序
- fcitx5-gtk: GTK 程序的支持， 修复打字太快漏字的问题
- fcitx5-qt: QT5 程序的支持， 修复打字太快漏字的问题
- fcitx5-rime: RIME 输入法
- fcitx5-configtool: 图形化配置工具（）

## 配置

参考：
[fcitx](https://fcitx-im.org/wiki/Setup_Fcitx_5/zh-cn)
[archwiki](https://wiki.archlinuxcn.org/wiki/Fcitx5)

通常添加环境变量在 login shell 的配置文件里

```sh
# /etc/profile 兼容性最好, or .bash_profile/.profile 注意加载顺序
XMODIFIERS=@im=fcitx
GTK_IM_MODULE=fcitx
QT_IM_MODULE=fcitx
```

### 主题

[fcitx5-themes-candlelight](https://github.com/thep0y/fcitx5-themes-candlelight)

```bash
git clone https://github.com/thep0y/fcitx5-themes.git
# 将想要使用的皮肤复制到该放的位置
cd fcitx5-themes
cp spring ~/.local/share/fcitx5/themes -r
# 修改皮肤配置文件(若没有配置文件则自动创建)：
```

修改 `~/.config/fcitx5/conf/classicui.conf`

```bash
# 垂直候选列表
Vertical Candidate List=False
# 按屏幕 DPI 使用
PerScreenDPI=True
# Font (设置成你喜欢的字体)
Font="Smartisan Compact CNS 13"
# 主题(这里要改成你想要使用的主题名，主题名就在下面)
Theme=spring
```

## 雾凇拼音

[rime-ice](https://github.com/iDvel/rime-ice)

```bash
$HOME/.local/share/fcitx/rime # Linux
$HOME/Library/Rime # Mac
```

# Clash

[wiki](https://wiki.metacubex.one/startup/service/)
[blog](https://liyp.cc/archives/1696683830494)

# Key

## Xmodmap

写一个配置文件.Xmodmap放在 `~`下，使用`xmodmap ~/.Xmodmap` 命令加载

```bash
# set Caps_Lock as Control
remove Lock      = Caps_Lock
keysym Caps_Lock = Control_L
add    Control   = Control_L
```

### setxkbmap

添加到bash_profile

```bash
# swap left Control and Caps_Lock
setxkbmap -option ctrl:swapcaps
# set Caps_Lock as Control
setxkbmap -option ctrl:nocaps
# swap alt and super
setxkbmap -option altwin:swap_alt_win
```

# XFCE 桌面

- [参考](https://community.aidlux.com/postDetail/439)

# Font

- [参考](https://copr.fedorainfracloud.org/coprs/aquacash5/nerd-fonts/)

```bash
sudo dnf copr enable aquacash5/nerd-fonts
sudo dnf install fira-code-nerd-fonts
```

# Change Password

```bash
sudo passwd username
```

# 更改时区

### 查看当前时间和时区设置

运行以下命令查看当前的时间和相关配置：

```bash
timedatectl
```

### 设置系统时区

如果需要更改系统时区，可以使用以下命令列出所有可用时区：

```bash
timedatectl list-timezones
```

找到所需的时区后，设置它，例如将时区更改为 `Asia/Shanghai`：

```bash
sudo timedatectl set-timezone Asia/Shanghai
```

### 硬件时钟（RTC）同步

更改系统时间后，系统会自动同步硬件时钟。如果没有同步，可以手动运行以下命令：

```bash
sudo hwclock --systohc
```

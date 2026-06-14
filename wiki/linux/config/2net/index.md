# 网络配置

使用systemd 和 iwd，更加轻量化，简单

- iwd：负责 Wi-Fi 的扫描、认证、连接。
- systemd-networkd：负责所有接口（有线 + 无线）的 IP 地址、网关、DNS
- systemd-resolved：负责 DNS 解析

## 启用服务，配置DNS

```sh
sudo systemctl enable --now iwd systemd-networkd systemd-resolved
# 让 /etc/resolv.conf 指向 systemd-resolved 管理的文件
sudo ln -sf /run/systemd/resolve/stub-resolv.conf /etc/resolv.conf
```

## 配置 Systemd network

```sh
# /etc/systemd/network/20-wired.network
[Match]
Name=enp3s0 # 有线网口（用 ip link 查看，形如 enp2s0、eth0）。

[Network]
DHCP=yes    # 启用 DHCP，自动获取 IP、网关、DNS

[DHCPv4]
RouteMetric=100 # 路由优先级，保证有线优先于 Wi-Fi

# /etc/systemd/network/25-wireless.network
[Match]
Name=wlan0 # 无线网口（用 ip link 确认名字，通常是 wlan0）

[Network]
DHCP=yes

[DHCPv4]
RouteMetric=600  # 数字越大优先级越低，优先使用有线
```

## 连接网络

1. Wi-Fi

```sh
device list                    # 查看无线设备
station wlan0 scan             # 扫描 Wi-Fi
station wlan0 get-networks     # 列出 Wi-Fi
station wlan0 connect Wi-Fi_Name     # 连接 Wi-Fi
```

2. 有线

插上自动连接

## Clash

https://blog.iswiftai.com/posts/clash-linux/

使用带有 Tun 模式的 代理软件时
需要关闭 dns 解析，clash 会劫持 53 端口

```sh
sudo systemctl stop systemd-resolved
sudo systemctl disable systemd-resolved

# 还原 /etc/resolv.conf , 先移除软链接，再新建文件
sudo vim /etc/resolv.conf
nameserver 8.8.8.8
nameserver 1.1.1.1
nameserver 119.29.29.29 # TX
nameserver 223.5.5.5    # Ali
nameserver 114.114.114.114
```

## Wi-Fi 节能问题

> [!WARNING]  
> 有误! 待修改

如果通过 Wi-Fi 连接，使用以下命令看是否开启了 power saving

```bash
# wlp3s0: 接口名, iw dev 命令获取  Eg: Interface wlp3s0 ...
iw dev wlp3s0 get power_save
```

如果有，关闭它

```bash
sudo iw dev wlp3s0 set power_save off
```

### 开机自动关闭 Wi-Fi 节能

创建一个脚本，在每次网络接口启动时自动禁用省电功能：

```bash
sudo nano /etc/NetworkManager/dispatcher.d/99-wifi-powersave-off
```

脚本内容

```bash
#!/bin/bash

IF=$1
STATUS=$2

# 如果接口状态是"up"，则禁用省电模式
if [ "$STATUS" = "up" ]; then
 iw dev "$IF" set power_save off
fi
```

- `$1` 是接口名（例如 `wlp3s0`）。
- `$2` 是接口状态（`up` 或 `down`）。

给脚本加上执行权限：

```bash
sudo chmod +x /etc/NetworkManager/dispatcher.d/99-wifi-powersave-off
```

每次网络接口（如 Wi-Fi）启动时，它都会自动运行，检查并关闭 Wi-Fi 的省电模式。

可以手动重启网络服务或重启来检查

```bash
sudo systemctl restart NetworkManager
```

# Linux 网络配置

> Wi-Fi 节能问题

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

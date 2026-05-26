# shell cmd

## 签名 app

```bash
sudo xattr -rd com.apple.quarantine /Applications/x.app
```

## 允许安装任何来源

```sh
su -i # ?
sudo spctl --master-disable # 关闭
sudo spctl --master-enable  # 开启
```

## 复制文件到剪切板/粘贴文件到剪切板

```
pbcopy/bpaste
```

## shutdown after 60mins

```sh
shutdown -h +60
```

## network speed test

```sh
networkquality
```

## 查看内存使用情况

```sh
memory_pressure
```

## 获取自己公网ip

```sh
# 注意 clash tun
curl [ipinfo.io/ip](https://ipinfo.io/ip)
```

## 查看系统版本

```bash
sw_vers
```

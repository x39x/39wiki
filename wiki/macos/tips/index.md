# Tips

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

## 命令行操作

mac专有的命令行操作

- `pbcopy/bpaste`

复制文件到剪切板/粘贴文件到剪切板

- `shutdown -h +60`

shutdown after 60mins

- `networkquality`

network speed test

- `memory_pressure `

查看内存使用情况

## Emoj Shortcuts

Control + Command + Space

## 文件系统

https://docs.spryker.com/docs/dg/dev/integrate-and-configure/switch-to-a-case-sensitive-file-system-on-mac-os#create-the-disk-image

切换大小写敏感

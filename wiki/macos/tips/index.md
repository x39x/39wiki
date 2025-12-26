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

## Emoj Shortcuts

Control + Command + Space

## 文件系统

https://docs.spryker.com/docs/dg/dev/integrate-and-configure/switch-to-a-case-sensitive-file-system-on-mac-os#create-the-disk-image

切换大小写敏感

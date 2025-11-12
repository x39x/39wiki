# linux 输入法

ENV: wayland sway

目前只推荐 fcitx5

## fcitx5-im:

- fcitx5-configtool :gui config
- fcitx5
- fcitx5-gtk
- fcitx5-qt

## fcitx5-rime

1. config file

mkdir ~/.local/share/fcitx5/rime/

2. rime-ice

https://github.com/iDvel/rime-ice/issues/840

某些发行版可能会缺少 librime-lua，如 fedora 等

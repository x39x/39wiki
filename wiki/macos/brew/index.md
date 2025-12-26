# Homebrew

Homebrew 安装后需配置环境变量

```bash
# add below to shell profile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

## basic usage

```bash
# 新增软件源
brew tap homebrew/cask-fonts
# 管理版本
brew unlink python@3.8
brew link python@3.9
```

## 切换国内镜像

```bash
export HOMEBREW_API_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles/api"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles"
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git"
export HOMEBREW_PIP_INDEX_URL="https://pypi.tuna.tsinghua.edu.cn/simple"
```

详细可参考[清华镜像站](https://mirrors.tuna.tsinghua.edu.cn/help/homebrew/)

## Brew bundle

```sh
# 执行brew bundle dump备份命令
brew bundle dump --describe --force --file="~/.dotfile/Brewfile"
# 批量安装软件
brew bundle --file="~/.dotfile/Brewfile"
```

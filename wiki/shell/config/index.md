# 配置｜配置文件加载

## 切换shell

```bash
echo $SHELL
cat /etc/shells #add /bin/zsh
chsh -s /bin/zsh
```

## sh配置文件读取规则

### 登陆shell

#### bash

etc/profile `->` etc/profile.d `->` ~/.bash_profile `->` ~/.bash_login `->` ~/.profile `->` ~/.bashrc

其中前两者是系统级，其中bash_profile、bash_login、profile 为用户级，读取到任意一个就会停止不会重复加载，登陆时不会自动读取bashrc

#### zsh

- /etc/zshenv `->` ~/.zshenv `->` etc/zshrc `->` ~/.zshrc

zprofile: login , zshenv: always

`.zlogin` and `.zlogout`

- [参考](https://unix.stackexchange.com/questions/71253/what-should-shouldnt-go-in-zshenv-zshrc-zlogin-zprofile-zlogout)

### 非登陆shell

只加载xxshrc

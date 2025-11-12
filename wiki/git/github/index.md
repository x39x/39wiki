# github

## 配置SSH

### 生成密钥

[参考：SSH 密钥登录及相关配置](https://x39x.cc/wiki/ssh-passkey)

```bash
cd ~/.ssh
ssh-keygen -t rsa -C xxx@xxx.com  #一路回车
```

### 添加密钥到github

```sh
# copy
vim id_rsa.pub
```

![key](./key.png)

### 检验是否链接成功

```bash
ssh -T git@github.com
#出现以下则证明链接成功
"Hi lover! You've successfully authenticated, but GitHub does not provide shell access. "
```

### 错误排查

- 如果出现

```bash
git@github.com: Permission denied (publickey)
#运行代码
ssh-agent -s
ssh-add ~/.ssh/id_rsa
```

## Highlight words

> [!NOTE]  
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]  
> Crucial information necessary for users to succeed.

> [!WARNING]  
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.

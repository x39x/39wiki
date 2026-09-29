# proxy

fake-ip 作用是让 tun 模式的代理也能像传统 HTTP/SOCKS5 代理一样支持域名连接，减少不必要的 DNS 解析，并且充分利用路由规则（分流）

传统的 HTTP 或者 SOCKS5 代理都是可以直接用域名建立连接的，应用发起请求的时候不需要先通过系统进行 dns 解析得到 ip ，直接用域名向代理发起连接请求，这样的话就可以充分利用代理软件的域名分流规则的功能

> 有的应用支持代理如浏览器，有的不支持，虚拟网卡只能拿到ip

但是 tun 模式不一样，因为 tun 是虚拟网卡的原理，其它程序并不知道自己使用了代理，是像平常一样需要先进行 dns 解析得到 IP ，再用 IP 建立 tcp 或者 udp 连接，这样相比传统代理会带来一些麻烦

1. 代理软件就得分两步处理其它程序的请求，先是接管 dns 解析，再接管后续的真正的连接建立，比较耗时
2. 第二步建立连接的时候代理软件拿到的是 ip ，域名信息没有了，要实现域名分流规则的功能就很麻烦，现在的 v2ray 等解决这个问题的方法是“域名嗅探”，就是尝试通过应用层的 http/tls 里面的信息来获取域名，这种方法实现域名分流的准确性和普适性有限

而 fake-ip 就是用来解决这个问题的，fake-ip 模式下 tun 模式的代理软件接管了 dns 解析之后，对于被代理的程序的 dns 请求不会实际进行解析，而是给相应的域名关联一个假 ip ，后续程序拿到假 ip 建立实际连接的时候，代理软件就可以知晓这个请求对应的域名，从而像传统代理一样可以直接用域名建立连接（远程解析），或者进行更准确的域名分流等操作。

好处就是提高 tun 模式代理的效率，并且补全了原本 tun 模式相比传统代理反而不支持的一些功能。

缺点是假 ip 会进入系统 dns 缓存，如果关掉代理之后可能会上不了网，这时候需要清除一下系统的 dns 缓存。

---

## singbox

singbox 可将set_system_proxy设为true，由singbox自动设置系统代理

### fakeip/dns

```json5
"dns": {
    //............
    "rules": [
        {
            "clash_mode": "direct",
            "server": "cn_dns"
        },
        {
            "clash_mode": "global",
            "server": "proxy_dns"
        },
        {
            "rule_set": ["lan_nonip"],
            "server": "cn_dns"
        },
        {
            "query_type": ["A", "AAAA"],
            "server": "fake_dns"
        },
        {
            "rule_set": ["cnsite"],
            "server": "cn_dns"
        }
    ],
    "final": "proxy_dns"
},
```

将直连规则放在fakeip后，如果放在之前，会造成dns解析与连接不一致的情况

某些情况下，需要代理一些国内网站，比如:`bilibili.com`，如果直接dns规则在fakeip后面，就造成以下情况

```txt
本地解析ip -> 命中dns直连规则获取ip -> 嗅探后命中代理规则 -> 将这个ip的连接发送到server
```

这样获得的ip是距离本地较近而不是server，无法有效利用cdn节点，但如果fakeip在前

```txt
本地解析ip -> 获得fakeip -> 将fakeip还原成域名后命中代理规则 -> 将向`bilibili.com`的连接发送到server
```

这样dns解析交给了server，可以获得合适的cdn节点ip

#### tips

需要直连的网站如`qq.com`，获取fakeip后，还原成域名命中直连规则，这时需要获取真正的ip，依然会遵循dns rules，但会跳过fakeip

#### 局域网 dns

```jsonc
"inbounds": [
    //........
    {
        "tag": "dns-in",
        "type": "direct",
        "listen": "::",
        "listen_port": 53,
        "network": "udp"
    }
    //........
]
```

监听局域网 dns 请求需要添加以上入站，[参考](https://github.com/SagerNet/sing-box/issues/2729)

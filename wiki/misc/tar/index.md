# tar 常用命令总结

## 📦 打包与压缩

### 1. 打包（不压缩）

```bash
tar -cf archive.tar folder/
```

### 2. 打包 + gzip 压缩（.tar.gz）

```bash
tar -czf archive.tar.gz folder/
```

### 3. 打包 + bzip2 压缩（.tar.bz2）

```bash
tar -cjf archive.tar.bz2 folder/
```

### 4. 打包 + xz 压缩（.tar.xz）

```bash
tar -cJf archive.tar.xz folder/
```

## 📂 解包与解压

### 5. 解包 `.tar`

```bash
tar -xf archive.tar
```

### 6. 解压 `.tar.gz`

```bash
tar -xzf archive.tar.gz
```

### 7. 解压 `.tar.bz2`

```bash
tar -xjf archive.tar.bz2
```

### 8. 解压 `.tar.xz`

```bash
tar -xJf archive.tar.xz
```

### 9. 解压到指定目录

```bash
tar -xzf archive.tar.gz -C /path/to/destination/
```

## 🔍 查看归档内容（不解压）

```bash
tar -tvf archive.tar.gz
```

## 🚫 排除某些文件打包

```bash
tar -czf archive.tar.gz folder/ --exclude=folder/tmp.log
```

## 🛠 参数说明

| 参数        | 含义                 |
| ----------- | -------------------- |
| `-c`        | 创建归档             |
| `-x`        | 解开归档             |
| `-t`        | 查看归档内容         |
| `-f`        | 指定归档文件名       |
| `-v`        | 显示详细过程         |
| `-z`        | 使用 gzip 压缩/解压  |
| `-j`        | 使用 bzip2 压缩/解压 |
| `-J`        | 使用 xz 压缩/解压    |
| `-C`        | 指定解压到哪个目录   |
| `--exclude` | 排除某个文件/目录    |

## ✅ 小提示

- `tar` 不会自动根据 `.gz` `.xz` 等后缀选择压缩方式，一定要手动加 `-z/-j/-J`
- 解压时无需手动解压 `.gz/.xz`，直接用 `tar -xzf` 即可自动解压+解包
- 使用 `file archive.tar.gz` 可判断是否真正压缩

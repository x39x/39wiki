# Mac 配置 Scheme 环境

大多数 Scheme 教程都会推荐 Mit Scheme 作为开发环境，但在 Apple silicon 的 Mac 通过 Homebrew 安装mit-scheme时会得到如下错误

```bash
brew install mit-scheme
mit-scheme: The x86_64 architecture is required for this software.
Error: mit-scheme: Unsatisfied requirements failed this build.
```

因为 mit-scheme 只能在 Intel 的机型运行，以下推荐两种替代方案

# ChezScheme

```bash
# 安装
brew install chezscheme
# 进入交互环境
chez
# 运行 Scheme 代码
chez --script filename.scm

```

# Racket

racket 是 scheme 的一种方言，它也提供 `r5rs/r6rs` scheme 的支持

```sh
# 安装
brew install minimal‐racket
# 安装 r5rs 支持
raco pkg install ‐‐auto r5rs
# 运行
racket ‐I r5rs ‐r filename.scm
```

### 通过 hashbang 指定 r5rs

```scheme
#lang r5rs

(define (fibonacci-sum n)
  (define (fibonacci n)
    (if (< n 2)
        n
        (+ (fibonacci (- n 1))
           (fibonacci (- n 2)))))

  (define (sum-fibonacci n)
    (if (< n 2)
        n
        (+ (sum-fibonacci (- n 1))
           (fibonacci n))))

  (sum-fibonacci n))

(display (fibonacci-sum 10))

```

### 运行

```sh
racket filename.scm
```

将 hashbang 改为 `#lang racket` 则是以 racket 的语法运行

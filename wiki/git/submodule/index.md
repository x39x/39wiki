# submodule

https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97

https://superuser.com/questions/1600823/whats-the-benefit-of-specifying-a-branch-for-a-submodule

```sh
# add submodule
git submodule add  http://github.com/xxx
# add specific branch
git submodule add -b branchname http://github.com/xxx
```

## update

```sh
git submodule init
git submodule update --recursive --remote
```

# 常用命令

脚本里会用到的，非外部工具，尽量举例说明

## TODO

```sh
#Creates a physical link.
ln file1 file2

#Creates a symbolic link.
- ln -s source_file target
```

```bash
xxd #查看二进制
objdump #查看二进制
file #查看文件信息
ps -e
```

## du

Show disk usage.

## locate

 It is used to locate a file in Linux System

## df

 It is used to see the available disk space in each of the partitions in your system.

## tar

 Used to work with tarballs (or files compressed in a tarball archive)

## mv 

Used to move the files or directories. This command’s working is almost similar to *cp* command but it deletes a copy of the file or directory from the source path. - Move multiple files

```sh
mv a.py b.py c.py Dir
mv a b c -t Dir
```

## chown 

Used to change the owner of the file.

## chgrp 

Used to change the group owner of the file.

## chmod 

Used to modify the access/permission of a user.

```sh
#+ : add a permission
#- : cancel a permission
#=: add some permissions and can other permissions(if has)
#r: read x:Executable w: write
chmod +w file.sh
# 所有者读写权限（6），所属组有读权限（4），其他用户没有权限（0）
sudo chmod 640 .sshkey/id_rsa
```

## more

It is a filter for paging through text one screenful at a time.

## less

It is used to viewing the files instead of opening the file.Similar to *more* command but it allows backward as well as forward movement.

## head 

Used to print the first N lines of a file. It accepts N as input and the default value of N is 10.

## tail 

Used to print the last N-1 lines of a file. It accepts N as input and the default value of N is 10.

## grep 

This command is used to search for the specified text in a file.

## sort 

This command is used to sort the contents of files.

## wc 

Used to count the number of characters, words in a file.

## cut 

Used to cut a specified part of a file.

## awk

command line数据处理

## sed

截取文件内容，格式匹配

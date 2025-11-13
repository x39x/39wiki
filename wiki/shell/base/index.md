# 基础命令

[MIT-shell](https://missing.csail.mit.edu/2020/course-shell/)

[MIT-shell_tools](https://missing.csail.mit.edu/2020/shell-tools/)

## TODO

## ln

```sh
#Creates a physical link.
ln file1 file2

#Creates a symbolic link.
- ln -s file1 file2
```

## Basic Terminal Navigation

- ls 

To get the list of all the files or folders.

- cd

Used to change the directory.

- du

Show disk usage.

- pwd

Show the present working directory.

- man

Used to show the manual of any command present in Linux.

- rmdir

It is used to delete a directory if it is empty.

- locate

 It is used to locate a file in Linux System

- echo

 This command helps us move some data, usually text into a file.

- df

 It is used to see the available disk space in each of the partitions in your system.

- tar

 Used to work with tarballs (or files compressed in a tarball archive)

## File and Directory

- mkdir 

Used to create a directory if not already exist. It accepts the directory name as an input parameter.

- cp 

This command will copy the files and directories from the source path to the destination path. It can copy a file/directory with the new name to the destination path. It accepts the source file/directory and destination file/directory.

- mv 

Used to move the files or directories. This command’s working is almost similar to *cp* command but it deletes a copy of the file or directory from the source path. - Move multiple files

```sh
mv a.py b.py c.py Dir
mv a b c -t Dir
```

- rm

Used to remove files or directories.

## File Permissions

- chown 

Used to change the owner of the file.

- chgrp 

Used to change the group owner of the file.

- chmod 

Used to modify the access/permission of a user.

```sh
#+ : add a permission
#- : cancel a permission
#=: add some permissions and can other permissions(if has)
#r: read x:Executable w: write
chmod +w file.sh
```

## Displaying the file contents

- cat

It is generally used to concatenate the files. It gives the output on the standard output.

- more

It is a filter for paging through text one screenful at a time.

- less

It is used to viewing the files instead of opening the file.Similar to *more* command but it allows backward as well as forward movement.

- head 

Used to print the first N lines of a file. It accepts N as input and the default value of N is 10.

- tail 

Used to print the last N-1 lines of a file. It accepts N as input and the default value of N is 10.

## Extract, sort, and filter

- grep 

This command is used to search for the specified text in a file.

- grep with Regular Expressions:

Used to search for text using specific regular expressions in file.

- sort 

This command is used to sort the contents of files.

- wc 

Used to count the number of characters, words in a file.

- cut 

Used to cut a specified part of a file.

- awk

command line数据处理

- sed

截取文件内容，格式匹配

## 文件被添加忽略列表，但是每次变动仍会被提交
>  git 项目提交过远程仓库，把某个不需要同步到平远端的文件夹添加到`.gitignore`后再次提交代码，还会读取到本地变化并提交远端记录的解决办法，运行如下指令清楚本地git缓存即可。

```base
    git rm -r --cache [目录]
```

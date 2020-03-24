## git

> git 项目提交过远程仓库，把某个不需要同步到平远端的文件夹添加到`.gitignore`后再次提交代码，还会读取到本地变化并提交远端记录的解决办法，运行如下指令清楚本地git缓存即可。

```base
    git rm -r --cache [目录]
```

## JavaScript
> 字符串分组处理方法

```javascript
function stringExecByGroup(string, count, callback) {
    var floatIndex = 0;
    var times = 0;

    while (floatIndex <= string.length) {
        callback(string.slice(floatIndex, floatIndex + count), ++times)
        floatIndex += count
    }
}
```

> 序列化url参数
```javascript
/*解析url参数*/
function parseParams(url) {
    var data;
    var res;
    url = url || window.location.href;
    res = {};
    data = url.split('?');
    if (data.length === 1) {
        return null;
    }
    data = data.pop();
    data = data.split('&');
    for (var i = 0, l = data.length; i < l; i++) {
        var tmp = data[i].split('=');
        if (tmp.length === 2) {
            res[tmp[0]] = tmp[1];
        }
    }
    return res;
}
```


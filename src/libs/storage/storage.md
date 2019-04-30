### storage提供持久化数据存储和临时全局数据存储


> 两个工具类提供相同的api，入参和返回结果完全一致，可根据需求替换使用。storage持久化数据存储内部实现是使用localStorage实现。

```javascript
import Storage, {storage, globalStorage} from 'libs/storage/storage.js'

/*
* Storagge 可以访问到storage(持久化存储)和globalStorage(临时全局数据存储)
* */

/*不设置过期时间持久化存储*/
storage.setItem('name', 'Storage')
// <· true

/*设置过期时间为1天（数字的单位是天）持久化存储*/
storage.setItem('name', 'Storage', 1)
// <· true

/*获取数据*/
storage.getItem('name')
// <·  'Storage' || undefined (过期或者不存在)

/*获取数据并删除数据*/
storage.getItem('name', true)
// <·  'Storage' || undefined (过期或者不存在)

/*清除某个数据*/
storage.removeItem('name')
// <·  true

/*清空全部数据*/
storage.clear()
// <·  true
```
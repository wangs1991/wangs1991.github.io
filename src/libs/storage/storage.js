/*
* Storage 全局数据存储和定期持久化数据存储
* version 1.0.0
* date: 2019-04-29
* doc
* >>>>>>> storage
* 被存储的数据结构是：
* name => {
*   data: Any,
*   timestamp: timestamp,
*   *expires: Number (可选，不设置为永久有效)
* }
* 读取到的数据：
* name => Any 存入的value值，按照原来的格式返回，过期或者不存在会返回undefined
*
* */

/*
* 数据持久化存储
* */
export const storage = {
    /*
    * 存储数据
    * @params String:key 存储数据的属性名
    * @params Any:value 需要存储的对应值（数据存储之前会被序列化）
    * @params Number:expires 过期时间
    * @return Boolean 是否读取到可用的值
    * */
    setItem(key, value, expires) {
        var data

        data = {
            timestamp: +new Date(),
            data: value,
        }
        if (expires !== undefined) {
            data.expires = expires
        }
        localStorage.setItem(key, JSON.stringify(data))
        return !!this.getItem(key)
    },
    /*
    * 读取数据
    * @params String:key
    * @params Boolean:force 为true读取后回删除本地数据
    * @return Object
    * */
    getItem(key, force) {
        let res

        res = localStorage.getItem(key)
        if (!res) {
            return undefined
        }

        res = JSON.parse(res)
        /*如果expires过期，或者force是true的话就是一次性数据*/
        if (res.expires !== undefined && (+new Date() - res.timestamp) >= res.expires * 24 * 60 * 60 * 1000) {
            res = {
                expires: res.expires,
                timestamp: res.timestamp,
                data: undefined
            }
        }
        if (force === true) {
            localStorage.removeItem(key)
        }
        return res.data
    },
    /*
    * 删除某一条数据
    * @params key
    * */
    removeItem(key) {
        localStorage.removeItem(key)
        return !this.getItem(key)
    },
    /*
    * 清空本地的所有缓存数据
    * */
    clear() {
        localStorage.clear()
        return true
    }
}

/*
* 全局数据存储，刷新页面或者关闭页面直接清空
* */
export const globalStorage = (function () {
    let GLOBAL = {}

    const getCache = () => {
        return GLOBAL ? GLOBAL : GLOBAL = {}
    }
    const setItem = (key, value) => {
        let GLOBAL = getCache();

        if (!key || !value) {
            return false
        }
        GLOBAL[key] = value
        return true
    }

    const getItem = (key, remove) => {
        let GLOBAL = getCache()
        let ret

        if (!key) {
            return undefined
        }
        ret = GLOBAL[key]
        if (remove) {
            delete GLOBAL[key]
        }
        return ret
    }

    const removeItem = (key) => {
        let GLOBAL = getCache()

        if (key) {
            delete GLOBAL[key]
        } else {
            GLOBAL = {}
        }
        return true
    }

    const clear = () => {
        let GLOBAL = getCache()

        GLOBAL = {}
        return true
    }

    return {
        setItem,
        getItem,
        removeItem,
        clear
    }
})()

export default {
    storage,
    globalStorage
}
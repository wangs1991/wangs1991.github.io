export const serilizeUrl = (url, slot) => {
    let param = url || window.location.href
    let ret = {}
    let tmp

    param = param.split('?')[1]
    if (param) {
        param.split('&').forEach(n => {
           tmp = n.split('=')
           ret[tmp[0]] = tmp[1] || slot
        })
    }
    return ret
}

export const getUriRoot = () => {
    let tester = /github.io/

    return window.location.href.match(tester) ? '/dist/html/' : '/html/'
}

export const getArticleInfo = (uri, data) => {
    return data.filter(n => {
        return new RegExp(n.uri).test(uri)
    })
}
import menu from '../../data'
import Labels from '../../static/labels'
import init from '../../assets/js/initial'
import '../../components/titleHeader'
import '../../components/goTop'
import {serilizeUrl, getUriRoot} from '../../assets/js/Utils'
require('./index.css')

const vue = init()
const __BASEURI = getUriRoot()

const OjectLabels = (function (data) {
    var ret = {}

    data.forEach(n => {
        ret[n.id] = n
    })
    return ret
})(Labels)

export default new vue({
    el: '#base-panel__window',
    name: 'entry',
    data () {
        return {
            menus: [],
            baseUri: __BASEURI
        }
    },
    created () {
        let type = serilizeUrl(window.location.href, 0).type
        let data

        if (type && type != 0) {
            data = menu.filter(n => {
                return n.typeId == type
            })
        } else {
            data = menu
        }
        data.forEach(n => {
            n.labelColor = OjectLabels[n.typeId].color
        })

        this.menus.splice(0, this.menus.length, ...data)
    },
    mounted () {
        // 移除加载过程隐藏所有元素
        document.body.classList.remove('loading')
    }
})
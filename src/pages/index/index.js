import menu from '../../map'
import Labels from '../../static/labels'
import init from '../../assets/js/initial'
import {serilizeUrl} from '../../assets/js/Utils'
import '../../components/titleHeader'
require('./index.css')

const vue = init()
const __BASEURI = (function () {
    let tester = /github.io/

    return window.location.href.match(tester) ? './dist/html/' : './html/'
})()

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
    methods: {
        filterByKeyword (keyword) {
            this.menus.filter(n => {
                return n.keyword == keyword
            })
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
import menu from '../../map'
import init from '../../components/initial'
import '../../components/titleHeader'
require('./index.css')

const vue = init()
const __BASEURI = (function () {
    let tester = /github.io/

    return window.location.href.match(tester) ? './dist/html/' : './html/'
})()

const app = new vue({
    el: '#base-panel__window',
    name: 'entry',
    data () {
        return {
            menus: [],
            baseUri: __BASEURI
        }
    },
    created () {
        this.menus.splice(0, this.menus.length, ...menu)
    }
})
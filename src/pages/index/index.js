import menu from '../../map'
import init from '../../components/initial'
import '../../components/titleHeader'

const vue = init()
const __BASEURI = './dist/html/'

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
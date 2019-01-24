import init from '../../components/initial'
import '../../components/titleHeader'

require('./html.css')

const vue = init()

const app = new vue({
    el: '#base-panel__window',
    name: 'product',
    data () {
        return {
            header: {
                title: '排版测试'
            },
            icon: require('../../assets/images/icons/add_photo_icon.png')
        }
    }
})
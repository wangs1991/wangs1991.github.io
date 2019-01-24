import init from '../../components/initial'
import '../../components/titleHeader'

require('./product.css')

const vue = init()

const app = new vue({
    el: '#base-panel__window',
    name: 'product',
    data () {
        return {
            header: {
                title: 'iPhoneX'
            },
            icon: require('../../assets/images/icons/add_photo_icon.png')
        }
    }
})
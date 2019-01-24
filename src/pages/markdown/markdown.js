import init from '../../components/initial'
import '../../components/titleHeader'

const vue = init()

const app = new vue({
    el: '#base-panel__window',
    name: 'markdown',
    data () {
        return {
            header: {
                title: '排版测试'
            },
            icon: require('../../assets/images/icons/add_photo_icon.png'),
            html: require('./test.md')
        }
    }
})
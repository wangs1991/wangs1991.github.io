import init from '../../assets/js/initial'
import '../../components/titleHeader'

const vue = init()

export default new vue({
    el: '#base-panel__window',
    name: 'about',
    data () {
        return {
            header: {
                title: '个人信息-关于我们'
            }
        }
    },
    mounted () {
        // 移除加载过程隐藏所有元素
        document.body.classList.remove('loading')
    }
})
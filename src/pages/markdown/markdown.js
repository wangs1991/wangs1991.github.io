import init from '../../assets/js/initial'
import '../../components/titleHeader'

const vue = init()

module.exports = new vue({
    el: '#base-panel__window',
    name: 'markdown',
    data () {
        return {
            header: {
                title: '排版测试'
            },
            html: require('./test.md')
        }
    },
    mounted () {
        // 移除加载过程隐藏所有元素
        document.body.classList.remove('loading')
    }
})
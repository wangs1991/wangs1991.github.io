import init from '../../assets/js/initial'
import {getArticleInfo} from '../../assets/js/Utils'
import '../../components/ArticleRead'
import articles from '../../data'

const vue = init()

export default new vue({
    el: '#base-panel__window',
    name: 'markdown',
    data () {
        return {
            html: require('./markdown.md')
        }
    },
    computed: {
        title () {
            return getArticleInfo(window.location.href, articles)[0]
        }
    },
    mounted () {
        // 移除加载过程隐藏所有元素
        document.body.classList.remove('loading')
    }
})
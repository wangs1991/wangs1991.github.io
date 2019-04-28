import init from '../../assets/js/initial'
import {getArticleInfo} from '../../assets/js/Utils'
import '../../components/ArticleRead'
const articles = require('../../data.json')

const vue = init()

export default new vue({
    el: '#base-panel__window',
    name: 'README',
    data () {
        return {
            html: require('../../../README.md')
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
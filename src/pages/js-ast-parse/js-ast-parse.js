require('./js-ast-parse.css')
import init from '../../assets/js/initial'
import {getArticleInfo} from '../../assets/js/Utils'
import '../../components/ArticleRead'
const articles = require('../../data.json')
const {Parser} = require("acorn")
const MyParser = Parser.extend(
    // require("acorn-jsx"),
    require("acorn-bigint")
)
const vue = init()

export default new vue({
    el: '#base-panel__window',
    name: 'markdown',
    data () {
        return {
            html: require('./markdown.md'),
            origin: '{} + ""'
        }
    },
    computed: {
        title () {
            return getArticleInfo(window.location.href, articles)[0]
        },
        result () {
            return MyParser.parse(this.origin)
        }
    },
    mounted () {
        // 移除加载过程隐藏所有元素
        document.body.classList.remove('loading')
    }
})
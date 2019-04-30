import init from '../../assets/js/initial'
import {getArticleInfo} from '../../assets/js/Utils'
import '../../components/ArticleRead'
import '../../components/LibItem'

import {storage} from '../../libs/storage/storage'

const articles = require('../../data.json')

const vue = init()

export default new vue({
    el: '#base-panel__window',
    name: 'markdown',
    data() {
        return {
            libs: require('./data.js')
        }
    },
    computed: {
        title() {
            return getArticleInfo(window.location.href, articles)[0]
        }
    },
    mounted() {
        // 移除加载过程隐藏所有元素
        document.body.classList.remove('loading')
    },
    created() {

    }
})
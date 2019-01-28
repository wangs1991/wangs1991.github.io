// 每个模块都会用的样式
require('../css/reset.css')
require('../css/github.css')
require('../css/common.css')

// 公用的脚本
import mobileAdapt from './mobileAdapt'
import vue from 'vue/dist/vue'

// import '../../components/goTop'

export default () => {
    // 应用高清适配的脚本
    mobileAdapt.init({
        'standard': 350,
        debugger: true
    })
    return vue
}
// 每个模块都会用的样式
require('../assets/css/reset.css')
require('../assets/css/common.css')

// 公用的脚本
import mobileAdapt from './mobileAdapt'
import vue from 'vue/dist/vue'

export default () => {
    // 应用高清适配的脚本
    mobileAdapt.init({
        'standard': 450,
        debugger: true
    })

    return vue
}
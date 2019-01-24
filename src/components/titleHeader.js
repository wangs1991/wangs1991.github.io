import Vue from 'vue/dist/vue'
// 全局组件的注册与使用
Vue.component('titleHeader', {
    template: `<header class="component-header__static">
                 <div class="header-icon__back" @click="goBack"></div>
                 <div class="header-icon__changable"></div>
                 <div class="header-title__txt">{{config.title}}</div>
               </header>`,
    data() {
        return {}
    },
    props: {
        config: {
            type: Object,
            required: true,
            default() {
                return {
                    title: '文章详情'
                }
            }
        }
    },
    methods: {
        goBack() { // 顶部返回方法，尝试返回历史记录上一步，不存在返回首页
            window.history.go(-1)
        }
    }
})
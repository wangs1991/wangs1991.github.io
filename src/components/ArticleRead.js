import Vue from 'vue/dist/vue'
import './titleHeader'
import './articleTitle'
import './goTop'

// 全局组件的注册与使用
Vue.component('ArticleRead', {
    template: `<div>
                   <title-header></title-header>
                   <article class="base-panel__content pdlr pdtb" id="scrollerPanel">
                        <article-title :data="title"></article-title>
                        <slot></slot>
                    </article>
                    <back-top></back-top>
                </div>`,
    data () {
        return {
            active: false
        }
    },
    props: {
        title: {
            type: Object,
            required: true
        }
    }
})
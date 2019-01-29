import Vue from 'vue/dist/vue'
const Info = require('../config')
// 全局组件的注册与使用
Vue.component('ArticleTitle', {
    template: `<section class="component-articleTitle" v-if="data">
                    <!--文章的标题栏-->
                    <section class="component-art__title">
                        <h1>{{data.name}}</h1>
                    </section>
                    <section class="component-art__user">
                        <div class="art-user__avator"></div>
                        <div class="art-user__info">
                            <p class="art-iser__list">{{Info.nickname}} says: {{Info.description}}</p>
                            <p>
                                <span class="base-article__keyword" 
                                        v-for="(kword, idx) in data.keywords"
                                        :key="idx">{{kword}}</span>  @ 
                                <span class="base-article__date">{{data.date}}</span>
                            </p>
                        </div>
                    </section>
                </section>`,
    data () {
        return {
            active: false,
            Info
        }
    },
    props: {
        data: {
            type: Object,
            require: false
        }
    },
    methods: {
        backTop () {
            let $scroller = document.getElementById('scrollerPanel')

            $scroller.scrollTo(0, 0)
        }
    },
    mounted () {
        let view = document.body.getBoundingClientRect().height
        let $scroller = document.getElementById('scrollerPanel')
        let self = this

        $scroller.addEventListener('scroll', e => {
            if (e.target.scrollTop >= view / 2) {
                self.active = true
            } else {
                self.active = false
            }
        })
    }
})
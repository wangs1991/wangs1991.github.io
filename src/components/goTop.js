import Vue from 'vue/dist/vue'

// 全局组件的注册与使用
Vue.component('backTop', {
    template: `<section class="component-backTop" :class="{'active': active}" @click="backTop"> </section>`,
    data () {
        return {
            active: false
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
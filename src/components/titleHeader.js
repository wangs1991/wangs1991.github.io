import Vue from 'vue/dist/vue'
// 标签数据
import Labels from '../static/labels'
import {serilizeUrl, getUriRoot} from '../assets/js/Utils'
const Info = require('../config')
// 全局组件的注册与使用
Vue.component('titleHeader', {
    template: `<section class="component-header">
                    <header class="component-header__static">
                     <a class="header-icon__left" 
                        href="/">
                        <div class="logo"></div>
                     </a>
                     <div class="header-icon__right">
                        <a :href="uriRoot + 'about.html'"
                            :title="info.nickname"
                            :style="{'backgroundImage': 'url('+ info.avator() +')'}"
                            class="header-avator">
</a>   
                     </div>
                     <!--<div class="header-title__txt">{{config.title}}</div>-->
                    </header>
                    <section class="scroller-labels">
                        <div class="scroller-labels__panel" :style="scroller">
                            <span class="label-item"
                              :class="{active: item.id == active}"
                              v-for="item in labels"
                              v-if="item"
                              @click="linkTo(item)"
                              :key="item.id">
                              {{item.label}}
                        </span>
                        </div>
                    </section>
                </section>`,
    data() {
        return {
            labels: [{
                id: 0,
                label: '全部'
            }],
            active: 0
        }
    },
    props: {
        config: {
            type: Object,
            required: false,
            default() {
                return {
                    title: '文章详情'
                }
            }
        }
    },
    computed: {
        scroller () {
            let ret = 0

            this.labels.forEach(n => {
                if (n) {
                    ret += (n.label.length + 1.4) * window.rem2px(0.26)
                }
            })

            ret += this.labels.length * window.rem2px(0.30) + 'px'
            return {
                width: ret
            }
        },
        uriRoot () {
            return getUriRoot()
        },
        info () {
            return Info
        }
    },
    methods: {
        linkTo (item) {
            window.location.href = window.location.origin + '?type=' + item.id
        }
    },
    mounted () {
        this.labels.splice(1, 0, ...Labels)
        this.active = serilizeUrl(window.location.href, 0).type
    }
})
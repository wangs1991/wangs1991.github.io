import Vue from 'vue/dist/vue'

// 全局组件的注册与使用
Vue.component('LibItem', {
    template: `
        <div class="lib-item" 
             :class="{'lib-item__open': isExpand}"                        @click="isExpand = !isExpand">
            <h3 class="lib-title">
                {{data.name}}
                <a :href="data.uri"
                    :style="{'background-image': 'url('+ dwicon +')'}"
                    target="_blank" 
                    class="lib-down"></a>
            </h3>
            <section class="lib-doc">
                <slot></slot>
                <div v-html="data.doc"></div>
            </section>
        </div>`,
    data() {
        return {
            isExpand: false,
            dwicon: require('../assets/images/i-download.png')
        };
    },
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    methods: {
        toggle() {
            this.isExpand = !this.isExpand;
        }
    }
})
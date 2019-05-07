/**
 * Created by vonsh on 2019/4/20
 */
import browser from '../browser/browser'

/*pc端的适配器*/
export const Adapter_pc = {
    validator: function () {
        return !browser.versions().Quark && !browser.versions().mobile
    },
    applyer() {
        let styleStr

        this.rem = 1536 * 100 / this.options.standard * (this.options.standard / this.options.actual) / 1.6

        styleStr = 'html{font-size:' + this.rem + 'px!important;}'
        return styleStr
    }
}

/*H5端适配器*/
export const Adapter_H5 = {
    validator: function () {
        return browser.versions().mobile;
    },
    applyer() {
        let styleStr;

        styleStr = 'html{font-size:' + this.rem + 'px!important;}';
        // 设置viewport，进行缩放，达到高清效果
        this.metaEl.setAttribute('content', 'width=' + this.dpr * this.clientWidth + ',initial-scale=' + this.scale + ',maximum-scale=' + this.scale + ', minimum-scale=' + this.scale + ',user-scalable=no');

        return styleStr;
    }
}

/*hbuilder适配器*/
export const Adaptor_Hbuilder = {
    validator: /Html5Plus/,
    applyer() {
        let styleStr;
        styleStr = 'html{font-size:' + this.rem + 'px!important; transform: scale(' + this.scale + ')!important; transform-origin: 0 0!important;}';
        // 设置viewport，进行缩放，达到高清效果
        this.metaEl.setAttribute('content', 'width=' + this.clientWidth + ',initial-scale=1,maximum-scale=1, minimum-scale=1,user-scalable=no');
        return styleStr;
    }
}

/*夸克浏览器适配器*/
export const Adaptor_Quark = {
    validator: /Quark/,
    applyer() {
        this.rem = 60;
        return 'html{font-size:' + this.rem + 'px!important;}';
    }
}

export default {
    PC: Adapter_pc,
    H5: Adapter_H5,
    Hbuilder: Adaptor_Hbuilder,
    Quark: Adaptor_Quark
}
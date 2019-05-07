import AdpHander from '../../utils/AdpHandler'
import {PC} from './scaleAdapter'

let mobileTransfer = (function () {
    let adjust

    return function (options) {
        if (adjust) {
            adjust.updateView()
        } else {
            adjust = new AdpHander(options)

            adjust.appendAdaptor('PC', PC)

            adjust.applyView()

            // 给js调用的，某一dpr下rem和px之间的转换函数
            window.rem2px = function (v) {
                v = parseFloat(v)
                return v * adjust.rem
            }
            window.px2rem = function (v) {
                v = parseFloat(v)
                return v / adjust.rem
            }
            window.dpr = adjust.dpr
            window.scale = adjust.scale
            window.rem = adjust.rem
            window.addEventListener('resize', function () {
                adjust.updateView()
            }, false)
        }
    }
})()

export default{
    init (opts) {
        opts = _.merge({
            standard: 1200,
            actual: 1345,
            debugger: false
        }, opts)
        mobileTransfer(opts)
    }
}

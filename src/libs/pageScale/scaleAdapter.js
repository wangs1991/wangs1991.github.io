/**
 * Created by vonsh on 2019/4/20
 */
import AdpHander from '../../utils/AdpHandler'
import browser from '../../utils/browser'

let mobileTransfer = (function () {
  let adjust

  return function (options) {
    if (adjust) {
      adjust.updateView()
    } else {
      adjust = new AdpHander(options)

      adjust.appendAdaptor({
        PC: {
          validator: function () {
            return !browser.versions().Quark && !browser.versions().mobile
          },
          applyer () {
            let styleStr

            this.rem = 1536 * 100 / this.options.standard * (this.options.standard / this.options.actual) / 1.6

            styleStr = 'html{font-size:' + this.rem + 'px!important;}'
            return styleStr
          }
        }
      })

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

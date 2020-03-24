### browser 桌面移动平台检测、微信以及浏览器检测

```javascript
    import browser from '../../utils/browser'
    /*
    * 调用方法
    * @params 无
    * @return Object 
    * eg.{
    *      weiXin: Boolean,
    *      android: Boolean
    *    }
    */
    var list = browser.versions()
    
    /*
    * 可用的平台类型如下：
    * <· res = {
    *       trident: Boolean,
    *       presto: Boolean,
    *       webKit: Boolean,
    *       mobile: Boolean,
    *       ios: Boolean,
    *       android: Boolean,
    *       iPhone: Boolean,
    *       iPad: Boolean,
    *       webApp: Boolean,
    *       QQbrw: Boolean,
    *       weiXin: Boolean,
    *       ucLowEnd: Boolean,
    *       ucSpecial: Boolean,
    *       ucweb: Boolean,
    *       Symbian: Boolean,
    *       ucSB: Boolean,
    *       Quark: Boolean,
    *       Hbuilder: Boolean
    *     }
    */
    
```
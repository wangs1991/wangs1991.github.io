# 微信小程序人脸识别

### 授权
### 监听摄像头并获取数据
### 数据转化
### 人脸识别
## 其他操作

微信小程序通过API可以轻松的调取用户的相机进行操作。但是在程序调取摄像头的时候微信会提示用户授权操作，这个操作可以由用户自主选择。对于某些依赖硬件的需求（比如我要是实现的人脸认证功能），无法使用摄像头那么就无法提供服务。在这种情况下，我们需要提供一个检测机制，在检测到相关操作未被授权时不能使简单的提示“对不起，因为您未允许XX操作，无法提供XX功能”。在这个时候，微信不会再次弹出授权提示选择，官方是这样定义的授权有效期的：
> 授权有效期<br/>
 一旦用户明确同意或拒绝过授权，其授权关系会记录在后台，直到用户主动删除小程序。
 
而用户需要对拒绝的授权操作再次的操作是：
> 打开设置界面<br/>
  用户可以在小程序设置界面（「右上角」 - 「关于」 - 「右上角」 - 「设置」）中控制对该小程序的授权状态。
  
这种操作对于普通用户来说才做起来代价太高了，无异于是“爱我的请扣1，不爱我的请扣3.1415926...”。这也就意味着一个以人脸认证为核心服务的小程序一旦被拒绝的请求相机，那么他大概率无法在被用户使用了。

不过微信都提供了相关的API，合理的运用这些API，可以引导用户轻松修改授权并使用你的小程序，这对于用户体验的提升来说是不可估量的。下面记录的就是一个完整的授权检测流程：

## API

[授权](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html)

[wx.authorize()](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/authorize/wx.authorize.html)

[wx.getSetting()](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/setting/wx.getSetting.html)

[wx.openSetting()](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/setting/wx.openSetting.html)

[camera](https://developers.weixin.qq.com/miniprogram/dev/component/camera.html)

[createCameraContext]()

[CameraContext.onCameraFrame]()

[getFileSystemManager]()

[canvasPutImageData]()

[canvasToTempFilePath]()

[Tracking.js]()


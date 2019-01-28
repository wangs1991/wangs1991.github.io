### 个人脸认证H5项目获得的的知识点

#### 摄像头调取
> 移动端调取摄像头，一个前端望而生畏的功能，存在太兼容问题。基本功能是可以实现的，但终究会存在一些变现不一致的地方。

移动端调取摄像头获取图片和视频只能通过表单元素实现，即`input :file`，为`input:file`元素添加`capture`属性可以实现部分手机在点击输入框时直接调起摄像头进行拍照，而不是选择图库或者拍照。
首先看`capture`可选属性值【需要配置`accept`的类型使用】：

属性值 | 作用 | 表现 | 备注 
:- | :-: | :- | :-
user | 前置摄像头| 直接调起摄像头，通过指定accept的值选择是进行拍照还是录像，少数会提供可选操作不是直接调起摄像头 | 一般不会打开前置摄像头，需要用户手动切换
camera | 摄像头拍照 | 调起摄像头拍照或选择拍照/图库 | -
camcorder | 摄像头录像 | 调起摄像头拍照或选择录像/文件 | - 
microphone | 录音机 |         调起摄像头拍照或仅选择音频文件 | -

[第三方效果测试地址](http://playboygit.github.io/demo/input_file_capture.html)


#### 文件读取
> 通过内置的`FileReader`对象可以读取到文件内容。


* `FileReader`提供回调函数和读取文件到指定格式的方法。
* `onload`是文件读取完毕回调事件注册方法；
* `abort`终断文件读取；
* `onloadStart`配合`onprogress`可以制作文件读取进度条；
* `readAsArrayBuffer` 读取成ArrayBuffer格式数据
* `readAsText`   读取成文本格式
* `readAsDataURL`  读取成base64位数据

在实际应用中，手机拍照体积都会比较大，动不动就达到6-8M。如果直接上传图片的话，一个是上传时间等待太久用户体验不好，再有就是用户流量的浪费。所以做文件压缩是非常有必要的。

项目后台期待接收的是form提交的文件，是要包含文件名称后缀等等各种信息的。由于`form + iframe ` 模拟 `ajax`提交台麻烦也有一些不太可控的问题，就尝试用`axios` 直接上传文件。

#### 文件压缩
[pica](https://github.com/nodeca/pica)是一个不错的文件压缩工具，主要是之前项目用过上手较快，但是经测试发现在微信会直接崩溃退出。后来找到一个不错的移动端图片压缩插件[LUploader](https://github.com/xfhxbb/LUploader)，但它不支持模块化加载，并且实际只是使用它的压缩方法，它本身是做了整体的文件上传及压缩功能的，所以就单独提取出`compress`方法了：
```javascript
// 图片压缩
export const compress = function (img, quality) {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext('2d');
  var moreCanvas = document.createElement("canvas");
  var morectx = moreCanvas.getContext("2d");
  var maxsize = 100 * 1024;
  var width = img.width;
  var height = img.height;
  var ratio;
  if ((ratio = width * height / 4000000) > 1) {
    ratio = Math.sqrt(ratio);
    width /= ratio;
    height /= ratio;
  } else {
    ratio = 1;
  }
  canvas.width = width;
  canvas.height = height;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  var count;
  if ((count = width * height / 1000000) > 1) {
    count = ~~(Math.sqrt(count) + 1);
    var nw = ~~(width / count);
    var nh = ~~(height / count);
    moreCanvas.width = nw;
    moreCanvas.height = nh;
    for (var i = 0; i < count; i++) {
      for (var j = 0; j < count; j++) {
        morectx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
        ctx.drawImage(moreCanvas, i * nw, j * nh, nw, nh);
      }
    }
  } else {
    ctx.drawImage(img, 0, 0, width, height);
  }
  var ndata = canvas.toDataURL('image/jpeg', quality || .5);
  moreCanvas.width = moreCanvas.height = canvas.width = canvas.height = 0;
  return ndata;
};
```
基本原理就是用canvas绘制在读取达到图片压缩。这样得到的是一个base64格式的图片。

#### axious上传文件
> axios不仅仅支持restful接口请求，同样能轻松的完成类表单提交的文件上传功能。

```javascript
    axios({
        url: 'url address',
        method: 'POST',
        data: formData
    }).then(res => {
        alert(res);
    });
```
这种实际编码操作和ajax请求是一致的。现在面临一个问题就是formaData的组装。
#### formData数据格式
>  [FormData对象](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/Using_FormData_Objects)用以将数据编译成键值对，以便用XMLHttpRequest来发送数据。其主要用于发送表单数据，但亦可用于发送带键数据(keyed data)，而独立于表单使用。如果表单enctype属性设为multipart/form-data ，则会使用表单的submit()方法来发送数据，从而，发送数据具有同样形式。

利用FormData对象,我们可以通过JavaScript用一些键值对来模拟一系列表单控件,我们还可以使用XMLHttpRequest的send()方法来异步的提交这个"表单".比起普通的ajax,使用FormData的最大优点就是我们可以异步上传一个二进制文件.

通过formData对象可以传递数据，要拿到表单数据通过`input`的`change`事件的`e.target.files`来获取到一个文件数组，直接`append`到`formData`对象中可以完成提交，但是这样的话就没办法进行图片的压缩了。那传输文件体积过大就无解了么？

尝试用`fileReader.readAsArrayBuffer`来获取到二进制`ArrayBuffer`,是不是把他直接给后台就可以了呢？我尝试了一下，发现不可以，后台报错说找不到文件后缀，无法识别文件。方了~

既然`input.onchange`的`e.target.files`直接给后台可以，那就观察一下他们有啥不一样的吧。

通过`console`打印，发现输出的是`File`类型的对象，既然是js的内置对象，肯定是可以手工创建。

#### JavaScript的File对象
> [File对象官方文档及API](https://developer.mozilla.org/zh-CN/docs/Web/API/File/File)

首先File对象的构造函数可以有两个或三个参数。

两个参数的例子是这样的：

```javascript
    var objFile = new File(["First Line Text", "Second Line Text"], FileName); 
```
第一个参数是一个字符串数组。数组中的每一个元素对应着文件中一行的内容。

第二个参数就是文件名字符串。

如果是用三个参数的形式，代码就是这样的：

```javascript
var objFile = new File(["First Line Text", "Second Line Text"], FileName, { 
    type: "text/plain", 
    lastModified: date
}); 
```
第三个参数可以设定一些文件的属性，比如文件的MIME，最后更新时间等。

得到这些信息，我们要准备的是一个图片的`ArrayBUffer`，前文已经得到了一个压缩过的`base64`格式的图片数据，只需要拿到`ArrayBUffer`我们就可以愉快的创建一个`File`对象传给后台了,需要制定`type='MIME'`（跟后台判断有关）。

查阅得到通过`blob`对象，可以创建`ArrayBUffer`，就得到下面的方法。

#### Blob文件类型转化

把`base64`位图片转成二进制`ArrayBuffer`格式，需要借助浏览器中的`blob`对象，实现代码如下：
```javascript
export const convertBase64ToBlob = function (base64) {
  var base64Arr = base64.split(',');
  var imgtype = '';
  var base64String = '';
  if (base64Arr.length > 1) {
    //如果是图片base64，去掉头信息
    base64String = base64Arr[1];
    imgtype = base64Arr[0].substring(base64Arr[0].indexOf(':') + 1, base64Arr[0].indexOf(';'));
  }
  // 将base64解码
  var bytes = atob(base64String);
  //var bytes = base64;
  var bytesCode = new ArrayBuffer(bytes.length);
  // 转换为类型化数组
  var byteArray = new Uint8Array(bytesCode);

  // 将base64转换为ascii码
  for (var i = 0; i < bytes.length; i++) {
    byteArray[i] = bytes.charCodeAt(i);
  }

  // 生成Blob对象（文件对象）
  return new Blob([bytesCode], {type: imgtype});
};
```

#### 总结
基本思路：用`input`调取摄像头捕捉用户图像 -> 通过`FileReader`读取到`base64`位数据 -> 再把压缩的`base64`字符串转成`ArrayBuffer`格式 -> 经浏览器内置`File`对象创建一个文件 -> 添加到`FormData`中完成表单数据的构建 -> 再通过`axios`发送给后台服务来完成文件上传。

封装vue组件如下：
```javascript

<template>
  <span class="capture-ctner"
        :data-name="name"
        :class="{'no-name': !options.name}">
    <input type="file"
           class="capture-input"
           :accept="options.accept"
           @change="readStream"
           :capture="options.capture"/>
    <button class="capture-button"
            :class="options.className">{{options.label}}</button>
  </span>
</template>

<script type="text/javascript">
  import {compress, convertBase64ToBlob} from '@/assets/js/Utils';
  // eslint-disable-next-line
  const pica = require('pica')();

  export default {
    name: 'capture',
    data() {
      return {
        name: ''
      };
    },
    props: {
      options: {
        type: Object,
        require: true,
        default: {
          accept: 'image/*',
          capture: 'user',
          optimize: false,
          label: '上传文件',
          name: true
        }
      }
    },
    computed: {
      type() {
        let type;

        try {
          type = this.options.accept.split('/')[0];
        } catch (e) {
          return '';
        }
        return type;
      }
    },
    methods: {
      auType(name) {
        const RegMap = {
          image: /\.jpg$|\.jpeg$|\.png$/,
          video: /\.mp4$|/
        };
        let type = this.type;

        return RegMap[type].test(name);
      },
      /**
       * 通过fileReader读取文件流
       * @param e
       */
      readStream(e) {
        let ipt = e.target;
        let reader;
        let self = this;

        this.$emit('change', e);
        console.log(e);
        if (ipt.files && ipt.files.length > 0) {
          this.$emit('readStart', ipt.files[0].name);
          /*if (!this.auType(ipt.files[0].name)) {
            this.$emit('typeError', ipt.files[0].name);
            return false;
          }*/
          this.name = ipt.files[0].name;
          reader = new FileReader();
          reader.onload = (e) => {
            self.readComplete(e.target.result);
          };
          (this.type === 'image') && reader.readAsDataURL(ipt.files[0]);
          (this.type === 'video') && reader.readAsBinaryString(ipt.files[0]);
        }
      },
      /**
       * 图片是否压缩优化的判断
       */
      readComplete(data) {
        let img;
        let self = this;

        function callback() {
          var rs;

          rs = compress(img, 0.05);
          rs = convertBase64ToBlob(rs);
          rs = new File([rs], self.name, {type: 'mime'});
          self.$emit('compressed', rs);
        };

        this.$emit('readed', data);

        if (!this.options.optimize) {
          return;
        };

        img = new Image();
        img.src = data;
        if (img.complete) {
          callback();
        } else {
          img.onload = callback;
        };
      }
    }
  };
</script>

<style lang="scss">
  .capture-ctner {
    position: relative;
    z-index: 1;
    display: inline-block;
    height: 5em;
  }

  .capture-ctner .capture-button {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    &.disabled {
      z-index: 100;
    }
  }

  .capture-ctner:after {
    display: inline-block;
    content: attr(data-name);
    font-size: 12px;
    color: #989898;
    font-family: '微软雅黑';
    margin-top: .1em;
  }

  .capture-ctner.no-name:after {
    display: none;
  }

  .capture-ctner .capture-input {
    border: 1px solid #f00;
    position: relative;
    z-index: 3;
    display: inline-block;
    width: 90%;
    left: 5%;
    top: 3px;
    height: 2.5em;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer;
  }
</style>

```

使用方法：
```html
<capture :options="capOpts"
               @change="loading"
               @compressed="getFile"
               @readed="readFile"></capture>
```
```javascript
capOpts: {
          optimize: true,       //是否启用压缩
          label: '拍摄',        // 按钮文字
          name: false,          // 是否显示文件名
          accept: 'image/*',    // 可获取文件格式
          capture: 'user',      // 捕获类型
          className: 'public-element-button block'
                                // 按钮类名样式
        }
```
* change 是图像刚被选择是触发，接收到change事件对象；
* compressd 是图像压缩完的触发，接收的是File对象；
* readed 是图像被FileReader读取完毕时触发，接收到的是base64位数据；
* capOpts  配置参数
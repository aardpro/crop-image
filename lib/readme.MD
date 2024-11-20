# aadpro-crop-image
- <div>在上传图片文件或者dataURL编码前，对它进行<span style="color: red">剪裁和优化</span>到指定的<span style="color: red">尺寸和质量</span>。</div>
- <div style="margin-bottom:2em">Before uploading an image file or dataURL dataURL, <span style="color: red">crop and optimize</span> it to the <span style="color: red">specified size and quality</span>.</div>

## 注意 Note

- 仅支持在浏览器环境使用，不支持nodejs环境
- available only in browser environment only, unavailable in nodejs environment

# 安装 Installation

## pnpm
> pnpm i aadpro-crop-image

## npm
> npm i aadpro-crop-image

## yarn
> yarn add aadpro-crop-image


# 使用说明 - 中文 | [Usage - english](#en)

## cropFile
> 剪裁文件并返回文件对象   
```js
 import { cropFile  } from 'aadpro-crop-image'

 // sourceFile是从<input type="file" accept="image/*">获取到的文件
 const { dataURL, file }  = await cropFile({
   file: sourceFile,
   width: 300,
   height: 300,
   quality: 0.8,
   origin: 'center'
 })
```

## cropDataURL
> 剪裁dataURL字符串并返回dataURL字符串   

```js
 import { cropDataURL  } from 'aadpro-crop-image'

 // sourceDataURL是base64字符串, 比如: 'data:image/png;base64,xxx' 
 const { dataURL, file } = await cropDataURL({
   dataURL: sourceDataURL,
   width: 300,
   height: 300,
   quality: 0.8,
   origin: 'center'
 })
```

## fileToDataURL
> 将文件转为dataURL字符串    
```js
 import { fileToDataURL  } from 'aadpro-crop-image'

 const dataURl = await fileToDataURL(file)
```

## dataURLToFile
> 将dataURL字符串转为文件    

```js
 import { dataURLToFile  } from 'aadpro-crop-image'

 const file = await dataURLToFile(dataURL)
```

# 参数

| 参数    | 必须 | 类型   | 默认值 | 描述                          |
| ------- | ---- | ------ | ------ | ----------------------------- |
| file    | 是   | File   |        | 上传的文件                    |
| dataURL | 是   | string |        | 上传的dataURL字符串           |
| width   | 否   | number | 300    | 剪裁的宽度;0表示不剪裁        |
| height  | 否   | number | 300    | 剪裁的高度;0表示不剪裁        |
| quality | 否   | number | 0.75   | 压缩质量 0-1                  |
| origin  | 否   | string | center | [初始位置](#origin-values-cn) |

## origin可用值 <a id="origin-values-cn"></a>
| Origin       | Description  |
| ------------ | ------------ |
| center       | 从中心剪裁   |
| top-left     | 从左上角剪裁 |
| top-right    | 从右上角剪裁 |
| bottom-left  | 从左下角剪裁 |
| bottom-right | 从右下角剪裁 |


# <a id="en">Usage - english</a>

## cropFile
> Crop a file and return a File object
```js
 import { cropFile  } from 'aadpro-crop-image'

 // sourceFile is an File object  from <input type="file" accept="image/*">
 const { dataURL, file } = await cropFile({
   file: sourceFile,
   width: 300,
   height: 300,
   quality: 0.8,
   origin: 'center'
 })
```

## cropDataURL
> Crop a dataURL string and return a dataURL string

```js
 import { cropDataURL  } from 'aadpro-crop-image'

 // sourceDataURL is base64 dataURL string, eg: 'data:image/png;base64,xxx' 
 const { dataURL, file } = await cropDataURL({
   dataURL: sourceDataURL,
   width: 300,
   height: 300,
   quality: 0.8,
   origin: 'center'
 })
```

## fileToDataURL
> Convert a file to a dataURL string
```js
 import { fileToDataURL  } from 'aadpro-crop-image'

 const dataURl = await fileToDataURL(file)
```

## dataURLToFile
> Convert a dataURL string to a file

```js
 import { dataURLToFile  } from 'aadpro-crop-image'

 const file = await dataURLToFile(dataURL)
```

# Options

| parameter | required | type   | default | description                           |
| --------- | -------- | ------ | ------- | ------------------------------------- |
| file      | yes      | File   |         |                                       |
| dataURL   | yes      | string |         |                                       |
| width     | no       | number | 300     | target width;0 means no crop          |
| height    | no       | number | 300     | target height;0 means no crop         |
| quality   | no       | number | 0.75    | 0-1                                   |
| origin    | no       | string | center  | [origin positions](#origin-values-en) |


## origin values <a id="origin-values-en"></a>
| Origin       | Description                       |
| ------------ | --------------------------------- |
| center       | Crop from the center              |
| top-left     | Crop from the top-left corner     |
| top-right    | Crop from the top-right corner    |
| bottom-left  | Crop from the bottom-left corner  |
| bottom-right | Crop from the bottom-right corner |

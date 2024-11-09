# 使用

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

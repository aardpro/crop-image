# Usage

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

/**
 * @description Converts a dataURL to a File object.
 * @param {string} dataURL - The dataURL.
 * @param {string} filename - The name of the file.
 * @return {Promise<File>} - A promise that resolves to a File object.
 */
export async function dataURLToFile(
  dataURL: string,
  filename = "image_file"
): Promise<File | false> {
  if (!dataURL.startsWith("data:image")) {
    return false;
  }
  return new Promise((resolve) => {
    fetch(dataURL)
      .then((res) => res.arrayBuffer())
      .then((buf) => {
        resolve(new File([buf], filename, { type: "image/webp" }));
      });
  });
}

/**
 * Converts an image file to a data URL string.
 * @param {File} file - The image file to convert.
 * @returns {Promise<string>} A promise that resolves to the data URL string.
 */
export function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          resolve("");
        }
      },
      false
    );
    reader.readAsDataURL(file);
  });
}

function calculatePositions(
  image: HTMLImageElement,
  width: number,
  height: number,
  origin: string = "center"
): [number, number, number, number, number, number, number, number] | false {
  if (!image) {
    return false;
  }
  const sw = image.width;
  const sh = image.height;
  if (width === 0 || height === 0) {
    return [0, 0, sw, sh, 0, 0, sw, sh];
  }
  const ow = Math.min(sw, width);
  const oh = Math.min(sh, height);

  const rate = Math.min(sw / ow, sh / oh); // 取较小比率作为图形比率
  const w = ow * rate;
  const h = oh * rate;
  let x = 0;
  let y = 0;
  switch (origin) {
    case "center":
      x = (sw - w) / 2;
      y = (sh - h) / 2;
      break;
    case "top-right":
      x = sw - w;
      y = 0;
      break;
    case "bottom-left":
      x = 0;
      y = sh - h;
      break;
    case "bottom-right":
      x = sw - w;
      y = sh - h;
      break;
    default:
  }
  return [x, y, w, h, 0, 0, ow, oh];
}

function imageOnload(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  width: number,
  height: number,
  quality: number,
  origin: string = "center"
) {
  const pst = calculatePositions(image, width, height, origin);
  if (!pst) {
    return false;
  }
  const cvsWidth = pst[6];
  const cvsHeight = pst[7];
  canvas.width = cvsWidth;
  canvas.height = cvsHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return false;
  }
  ctx.drawImage(image, ...pst);
  return canvas.toDataURL("image/webp", quality);
}

/**
 * Crops an image file to the specified size and quality.
 * @function cropImage
 * @param {Object} [options] - The options.
 * @param {File} [options.file] - The image file to crop.
 * @param {number} [options.width=300] - The target width.
 * @param {number} [options.height=300] - The target height.
 * @param {number} [options.quality=0.75] - The target quality (0-1).
 * @param {string} [options.origin="center"] - The origin position.
 * @returns {Promise<{dataURL: string | false; file: File}>} - A promise that resolves to an object with a dataURL property and a file property.
 */

export async function cropFile({
  file = new File([], "image_file"),
  width = 300,
  height = 300,
  quality = 0.75,
  origin = "center",
}): Promise<{ dataURL: string | false; file: File }> {
  return new Promise((resolve) => {
    const box = document.createElement("div");
    box.style.display = "none";
    const image = document.createElement("img");
    box.appendChild(image);
    const canvas = document.createElement("canvas");
    box.appendChild(canvas);
    document.body.appendChild(box);

    image.onload = async () => {
      const dataURL = imageOnload(
        canvas,
        image,
        width,
        height,
        quality,
        origin
      );
      if (!dataURL) {
        resolve({ dataURL, file });
        document.body.removeChild(box);
        return;
      }
      const fileExt = file.name.split(".").pop() || "";
      const fileBlob = await dataURLToFile(
        dataURL,
        file.name.replace(new RegExp(`.${fileExt}$`), ".webp")
      );
      if (!fileBlob) {
        resolve({ dataURL, file });
        document.body.removeChild(box);
        return;
      }
      resolve({ dataURL, file: fileBlob });
      document.body.removeChild(box);
    };
    fileToDataURL(file).then((res) => {
      if (image && res) {
        image.src = res;
      } else {
        resolve({ dataURL: false, file });
      }
    });
  });
}

/**
 * @description Crops a dataURL string to the specified dimensions and returns the cropped image as a dataURL string.
 * @param {Object} options - The options for cropping the image.
 * @param {string} options.dataURL - The dataURL string of the image to be cropped.
 * @param {string} [options.fileName='file'] - The name of the file to create from the dataURL string.
 * @param {number} [options.width=300] - The target width for cropping the image.
 * @param {number} [options.height=300] - The target height for cropping the image.
 * @param {number} [options.quality=0.75] - The quality of the cropped image.
 * @returns {Promise<{ dataURL: string|false, file: File|false }>} - A promise that resolves to an object with two properties: dataURL which is the dataURL string of the cropped image, and file which is the cropped image file. If the input is invalid, dataURL will be false.
 */
export async function cropDataURL({
  dataURL = "",
  fileName = "image_file",
  width = 300,
  height = 300,
  quality = 0.75,
}): Promise<{ dataURL: string | false; file: File | false }> {
  if (!dataURL.startsWith("data:image")) {
    return { dataURL: false, file: false };
  }
  const fileBlob = await dataURLToFile(dataURL, fileName);
  if (!fileBlob) {
    return { dataURL: false, file: false };
  }
  return cropFile({ file: fileBlob, width, height, quality });
}

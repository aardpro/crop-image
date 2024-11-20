import "./style.css";
import { cropDataURL, cropFile } from "./package-entry";

window.onload = async () => {
  const imageInput = document.getElementById(
    "image-input"
  ) as HTMLInputElement | null;
  if (imageInput) {
    imageInput.addEventListener("change", async () => {
      if (!(imageInput.files instanceof FileList) || !imageInput.files[0]) {
        return;
      }
      const divWidth = document.getElementById(
        "width"
      ) as HTMLInputElement | null;
      const divHeight = document.getElementById(
        "height"
      ) as HTMLInputElement | null;
      const divQuality = document.getElementById(
        "quality"
      ) as HTMLInputElement | null;
      const divOrigin = document.getElementById(
        "origin"
      ) as HTMLInputElement | null;
      const width = divWidth ? parseInt(divWidth.value) : undefined;
      const height = divHeight ? parseInt(divHeight.value) : undefined;
      const quality = divQuality ? parseFloat(divQuality.value) : undefined;
      const origin = divOrigin ? divOrigin.value : undefined;
      const { dataURL, file } = await cropFile({
        file: imageInput.files[0],
        width,
        height,
        quality,
        origin,
      });
      console.log("🚀 ~ imageInput.addEventListener ~ file:", file);
      const result = document.getElementById("result") as HTMLDivElement | null;
      if (result) {
        result.style.display = "block";
      }
      const image = document.getElementById("image") as HTMLImageElement | null;
      if (image && dataURL) {
        image.src = dataURL;
        setTimeout(async () => {
          const { width: w, height: h } = image;

          const halfResult = await cropDataURL({
            dataURL,
            width: w / 2,
            height: h / 2,
          });
          const halfImage = document.getElementById(
            "image-half"
          ) as HTMLImageElement | null;
          if (halfResult.dataURL && halfImage) {
            halfImage.src = halfResult.dataURL;
          }
        }, 100);
      }

      imageInput.value = "";
    });
  }
};

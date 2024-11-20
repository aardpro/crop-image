export function dataURLToFile(
  dataURL: string,
  fileName: string
): Promise<File | false>;
export function fileToDataURL(file: File): Promise<string>;
export function cropDataURL({
  dataURL = "",
  fileName = "image_file",
  width = 300,
  height = 300,
  quality = 0.75,
}): Promise<string | false>;
export function cropFile({
  file = new File([], "image_file"),
  width = 300,
  height = 300,
  quality = 0.75,
  origin = "center",
}): Promise<{ dataURL: string | false; file: File }>;

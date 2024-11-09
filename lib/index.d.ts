export function dataURLToFile(dataURL: string, fileName: string): Promise<File|false>;
export function fileToDataURL(file: File): Promise<string>;
export function cropDataURL(dataURL: string, width: number, height: number, quality: number, origin: string): Promise<string|false>;
export function cropFile(file: File, width: number, height: number, quality: number, origin: string): Promise<{ dataURL: string | false; file: File }>;
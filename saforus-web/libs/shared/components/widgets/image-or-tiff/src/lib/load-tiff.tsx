import { fromArrayBuffer } from 'geotiff'; // Import fromUrl function
import { prependBaseUrl } from '@web-workspace/shared/api/http-client';

// Load a TIFF file from a base64-encoded image or a blob URL
const loadTiff = async (src: string, setUrl: (url: string) => void) => {
  const dataURL = src;

  let arrayBuffer: ArrayBuffer | null = null;
  // Check if the src is a base64-encoded
  if (src.startsWith('data:')) {
    // Extract the Base64 data
    const base64Data = dataURL.split(',')[1];

    // Convert Base64 to ArrayBuffer
    arrayBuffer = new Uint8Array(
      atob(base64Data)
        .split('')
        .map((char) => char.charCodeAt(0))
    ).buffer;
  } else {
    const response = await fetch(prependBaseUrl(dataURL));
    if (response.status === 200) {
      arrayBuffer = await response.arrayBuffer();
    }
  }

  if (arrayBuffer) {
    // Convert to data URL
    const dataURL = await convertData(arrayBuffer);
    setUrl(dataURL);
  }
};

const convertData = async (arrayBuffer: ArrayBuffer) => {
  // Use geotiff.js to parse the TIFF data
  const tiff = await fromArrayBuffer(arrayBuffer);
  const image = await tiff.getImage();

  // Read the data from the image
  const width = image.getWidth();
  const height = image.getHeight();
  const imageData = await image.readRasters({ width, height });

  // Create a new canvas and draw the image data
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');

  if (context) {
    const flatData = new Uint8ClampedArray(width * height * 4);
    for (let i = 0; i < width * height; i++) {
      flatData[i * 4] = imageData[0][i];
      flatData[i * 4 + 1] = imageData[1]?.[i] || imageData[0][i];
      flatData[i * 4 + 2] = imageData[2]?.[i] || imageData[0][i];
      flatData[i * 4 + 3] = 255;
    }

    const imageDataObject = new ImageData(flatData, width, height);
    context.putImageData(imageDataObject, 0, 0);
  }
  // Convert canvas to data URL
  const dataURL = canvas.toDataURL('image/png');
  return dataURL;
};
export default loadTiff;

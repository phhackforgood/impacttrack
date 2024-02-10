import * as faceapi from 'face-api.js';

import { canvas, faceDetectionNet, faceDetectionOptions, saveFile } from './commons';

export async function POST(request: Request, response: Response) { 
  const formData = await request.formData();
  const image = formData.get('image') as File;

  await faceDetectionNet.loadFromDisk('../../weights')

  const img = await canvas.loadImage(image);
  const detections = await faceapi.detectAllFaces(img, faceDetectionOptions)
  const numDetections = detections.length;

  const out = faceapi.createCanvasFromMedia(img) as any;
  faceapi.draw.drawDetections(out, detections);
  console.log(numDetections + ' faces detected');

  saveFile('faceDetection.jpg', out.toBuffer('image/jpeg'))
  console.log('done, saved results to out/faceDetection.jpg')
}


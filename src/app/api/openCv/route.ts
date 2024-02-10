import * as faceapi from 'face-api.js';
import { NextResponse } from 'next/server';

import { canvas, faceDetectionNet, faceDetectionOptions, saveFile } from "../../../../Facial/commons";

export async function POST(request: Request, response: Response) { 

  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;
  
    await faceDetectionNet.loadFromDisk('../../../../Facial/weights')
  
    const img = await canvas.loadImage(image);
    const detections = await faceapi.detectAllFaces(img, faceDetectionOptions)
    const numDetections = detections.length;
    const out = faceapi.createCanvasFromMedia(img) as any
    faceapi.draw.drawDetections(out, detections)
    console.log(numDetections + ' faces detected')
  
    saveFile('faceDetection.jpg', out.toBuffer('image/jpeg'))
    console.log('done, saved results to out/faceDetection.jpg')
    return NextResponse.json(numDetections) ;
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || err.toString() }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
 
}


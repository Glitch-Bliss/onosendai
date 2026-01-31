/// <reference lib="webworker" />
import QRCode from 'qrcode';

import { Encoded, Encoder, Byte } from '@nuintun/qrcode';

addEventListener('message', async ({ data }) => {
  const imagesEncoded: Encoded[] = [];

  for (let i = 0; i < data.length; i++) {
    const qr = data[i];

    const encoder = new Encoder({
      level: 'M', // L, M, Q, H
    });
    const encoded = encoder.encode(new Byte(qr));

    imagesEncoded.push(encoded);

    // Progress update
    postMessage({
      type: 'progress',
      value: Math.round(((i + 1) / data.length) * 100),
    });
  }

  postMessage({
    type: 'done',
    images: imagesEncoded.map(e => encodedToMatrix(e)),
  });
});

function encodedToMatrix(encoded: Encoded) {
  const matrix: number[][] = [];
  for (let row = 0; row < encoded.size; row++) {
    matrix[row] = [];
    for (let col = 0; col < encoded.size; col++) {
      matrix[row][col] = encoded.get(col, row);
    }
  }
  return matrix;
}
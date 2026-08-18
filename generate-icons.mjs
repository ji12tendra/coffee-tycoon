import fs from 'fs';
import zlib from 'zlib';

function createPNG(width, height, r, g, b) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // 8-bit depth
  ihdr.writeUInt8(2, 9); // RGB
  ihdr.writeUInt8(0, 10); // compression
  ihdr.writeUInt8(0, 11); // filter
  ihdr.writeUInt8(0, 12); // interlace

  const ihdrChunk = makeChunk('IHDR', ihdr);

  // Raw pixel data: each scanline starts with filter byte 0
  const scanlineLength = 1 + width * 3;
  const rawData = Buffer.alloc(scanlineLength * height);

  const cx = width / 2;
  const cy = height / 2;
  const radius = width * 0.38;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * scanlineLength;
    rawData[rowOffset] = 0; // Filter: none
    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 3;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= radius) {
        // Inner amber circle with coffee tone
        if (dist <= radius * 0.7 && Math.abs(dy) < radius * 0.35 && Math.abs(dx) < radius * 0.45) {
          // Cup icon shape (warm cream)
          rawData[pxOffset] = 255;
          rawData[pxOffset + 1] = 245;
          rawData[pxOffset + 2] = 230;
        } else {
          // Amber background
          rawData[pxOffset] = r;
          rawData[pxOffset + 1] = g;
          rawData[pxOffset + 2] = b;
        }
      } else {
        // Dark theme background (#0c1017)
        rawData[pxOffset] = 12;
        rawData[pxOffset + 1] = 16;
        rawData[pxOffset + 2] = 23;
      }
    }
  }

  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressedData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function makeChunk(type, data) {
  const length = data.length;
  const buf = Buffer.alloc(12 + length);
  buf.writeUInt32BE(length, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);

  const crcData = buf.subarray(4, 8 + length);
  const crcVal = crc32(crcData);
  buf.writeInt32BE(crcVal, 8 + length);
  return buf;
}

// Table-based CRC32 implementation
const crcTable = new Int32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) {
      c = 0xedb88320 ^ (c >>> 1);
    } else {
      c = c >>> 1;
    }
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return crc ^ -1;
}

if (!fs.existsSync('./public')) {
  fs.mkdirSync('./public', { recursive: true });
}

// Amber #d97706 -> RGB(217, 119, 6)
fs.writeFileSync('./public/icon-192.png', createPNG(192, 192, 217, 119, 6));
fs.writeFileSync('./public/icon-512.png', createPNG(512, 512, 217, 119, 6));
fs.writeFileSync('./public/icon-maskable-512.png', createPNG(512, 512, 217, 119, 6));
fs.writeFileSync('./public/screenshot1.png', createPNG(540, 960, 217, 119, 6));
fs.writeFileSync('./public/screenshot2.png', createPNG(1280, 720, 217, 119, 6));

console.log('✅ PWA Icons and screenshots generated successfully in /public!');

import { MimeTypes } from 'src/model';

export function convertBufferToImg(buffer: Buffer, mimeType: MimeTypes = 'image/png') {
    const b64 = Buffer.from(buffer).toString('base64');
    return `data:${mimeType};base64,${b64}`;
}

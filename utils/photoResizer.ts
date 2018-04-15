import sharp from 'sharp'
import { getImageBuffer } from './util'

const resizeImage = async (input: Buffer | string): Promise<Buffer> => {
    return sharp(input)
        .resize(256, 256, { kernel: 'cubic' })
        .toFormat('jpg')
        .toBuffer()
}

export default resizeImage



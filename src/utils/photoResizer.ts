import sharp from 'sharp'
import { getImageBuffer } from './'

const resizeImage = async (input: Buffer | string): Promise<Buffer> => {
    return sharp(input)
        .jpeg({ quality: 100, progressive: true })
        .resize(256, 256)
        .toFormat('jpg')
        .toBuffer()
}

export default resizeImage

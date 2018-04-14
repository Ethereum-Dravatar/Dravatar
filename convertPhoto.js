const sharp = require('sharp')
const { getImageBuffer } = require('./utils')

const resizeImage = async (input) => {
    return sharp(input)
        .resize(256, 256, { kernel: 'cubic' })
        .toFormat('jpg')
        .toBuffer()
}


module.exports = {
    resizeImage
}




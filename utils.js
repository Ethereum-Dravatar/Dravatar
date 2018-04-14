
const config = require('./config')

const fs = require('fs');
// function to encode file data to base64 encoded string

const convertSignToSignObject = (sign) => {
    return {
        id: undefined,
        jsonrpc: undefined,
        result: sign
    }
}

const getTokenFromAuthorization = (authorization) => {
    if (authorization === undefined) {
        return null
    } else {
        const sign = authorization.split(' ')[1]
        // Need these 3 params to be signature
        const signatureObj = convertSignToSignObject(sign)
        return signatureObj
    }
}

const getImageBuffer = (file) => new Buffer(fs.readFileSync(file))

function getImageBase64(file) {
    return getImageBuffer(file).toString('base64');
}

const { uploadImage } = require('./aws')
const { resizeImage } = require('./convertPhoto')
const uploadAvatarToAwsS3 = async (address, file) => {
    const buffer = getImageBuffer(file)
    const resizeBuff = await resizeImage(buffer)
    const base64 = resizeBuff.toString('base64')
    const data = new Buffer(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64')
    uploadImage(address, data)
}

module.exports = {
    getTokenFromAuthorization,
    getImageBuffer,
    uploadAvatarToAwsS3
}
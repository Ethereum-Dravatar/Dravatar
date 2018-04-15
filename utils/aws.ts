// You can either "yarn add aws-sdk" or "npm i aws-sdk"
// Credit to https://gist.github.com/SylarRuby/b60eea29c1682519e422476cc5357b60
import * as AWS from 'aws-sdk'
import { ACCESS_KEY_ID, SECRET_ACCESS_KEY, S3_BUCKET } from '../config'

// const AWS = require('aws-sdk')
// const config = require('./config')

// Configure AWS with your access and secret key. I stored mine as an ENV on the server
// ie: process.env.ACCESS_KEY_ID = "abcdefg"
AWS.config.update({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY
});

// Create an s3 instance
const s3 = new AWS.S3();

export const uploadImage = async (fileName: string, fileBuffer: Buffer) => {
    const params = {
        Bucket: S3_BUCKET,
        Key: `${fileName}`, // type is not required
        Body: fileBuffer,
        ACL: 'public-read',
        ContentEncoding: 'base64', // required
        ContentType: `image/jpeg` // required. Notice the back ticks
    }
    const result = await s3.upload(params).promise();
    return result
}

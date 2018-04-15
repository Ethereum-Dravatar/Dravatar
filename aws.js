// You can either "yarn add aws-sdk" or "npm i aws-sdk"
// Credit to https://gist.github.com/SylarRuby/b60eea29c1682519e422476cc5357b60
const AWS = require('aws-sdk')
const config = require('./config')

// Configure AWS with your access and secret key. I stored mine as an ENV on the server
// ie: process.env.ACCESS_KEY_ID = "abcdefg"
AWS.config.update({
    accessKeyId: config.ACCESS_KEY_ID,
    secretAccessKey: config.SECRET_ACCESS_KEY
});

// Create an s3 instance
const s3 = new AWS.S3();

const uploadImage = async (userName, base64Data) => {
    const params = {
        Bucket: config.S3_BUCKET,
        Key: `${userName}`, // type is not required
        Body: base64Data,
        ACL: 'public-read',
        ContentEncoding: 'base64', // required
        ContentType: `image/jpeg` // required. Notice the back ticks
    }
    return s3.upload(params, (err, data) => {
        if (err) { return console.log(err) }
        // Continue if no error
        // Save data.Location in your database
        console.log('Image successfully uploaded.');
    });
}

module.exports = {
    uploadImage
}
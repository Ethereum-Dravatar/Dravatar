var Router = require('koa-router');
var router = new Router();
const fs = require('fs');

const asyncBusboy = require('async-busboy')
const { getImageBuffer, getTokenFromAuthorization, uploadAvatarToAwsS3 } = require('./utils')
const { getAddressFromSignature } = require('./utils/signature')

router.post('/updateAvatar', async (ctx, next) => {
    const body = ctx.request.body
    const { files, fields } = await asyncBusboy(ctx.req)
    const file = files[0]
    const bearer = ctx.request.headers['authorization']
    const signature = getTokenFromAuthorization(bearer)

    if (signature !== null) {
        const addr = getAddressFromSignature(signature)
        const result = await uploadAvatarToAwsS3(addr, file['path'])
        const obj = {
            Code: 200,
            address: addr
        }
        console.log(obj)
        ctx.body = obj
    } else {
        const code = 401
        ctx.response.status = code
        ctx.body = {
            code,
            message: 'Corrupt Input'
        }
    }
});

module.exports = {
    routerRules: router.routes(),
    allowedMethods: router.allowedMethods()
}
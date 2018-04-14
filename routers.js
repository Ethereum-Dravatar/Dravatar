var Router = require('koa-router');
var router = new Router();
const { getAddressFromSignature, getTokenFromAuthorization } = require('./utils')

router.post('/updateAvatar', async (ctx, next) => {
    const body = ctx.request.body
    console.log(ctx.request.headers)
    const bearer = ctx.request.headers['authorization']
    const signature = getTokenFromAuthorization(bearer)

    if (signature !== null) {
        const addr = getAddressFromSignature(signature)
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
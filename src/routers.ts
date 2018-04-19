import Router from "koa-router";
var router = new Router();
import fs from "fs";
import { getImageBuffer, getTokenFromAuthorization, uploadAvatarToAwsS3 } from "./utils";

// @TODO: add type declaration for these module blow 
import asyncBusboy from "async-busboy";
import { getAddressFromSignature } from "./utils/signature";

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
            code: 200,
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

export const routerRules = router.routes();
export const allowedMethods = router.allowedMethods();
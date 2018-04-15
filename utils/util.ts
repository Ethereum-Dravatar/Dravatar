
// import config from "../config";

import { readFileSync } from "fs";
// function to encode file data to base64 encoded string

interface Signature {
    id?: string,
    jsonrpc?: string,
    result: string
}

const convertSignToSignObject = (sign: string): Signature => {
    return {
        id: undefined,
        jsonrpc: undefined,
        result: sign
    }
}

const getTokenFromAuthorization = (authorization: string): Signature | null => {
    if (authorization === undefined) {
        return null
    } else {
        const sign = authorization.split(' ')[1]
        // Need these 3 params to be signature
        const signatureObj = convertSignToSignObject(sign)
        return signatureObj
    }
}

export const getImageBuffer = (file: string): Buffer => new Buffer(readFileSync(file))

export function getImageBase64(file: string): string {
    return getImageBuffer(file).toString('base64');
}

import { uploadImage } from "./aws";
import resizeImage from "./photoResizer";
export const uploadAvatarToAwsS3 = async (address: string, file: string) => {
    const buffer = getImageBuffer(file)
    const resizeBuff = await resizeImage(buffer)
    const base64 = resizeBuff.toString('base64')
    const data = new Buffer(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64')
    uploadImage(address, data)
}

export default {
    getTokenFromAuthorization,
    getImageBuffer,
    uploadAvatarToAwsS3
}
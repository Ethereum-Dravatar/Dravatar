import { recoverTypedSignature } from "eth-sig-util";
import { APPROVE_MSG } from "../config";

export interface Signature {
    id?: string,
    jsonrpc?: string,
    result: string
}

export const convertSignToSignObject = (sign: string): Signature => {
    return {
        id: undefined,
        jsonrpc: undefined,
        result: sign
    }
}

export const getAddressFromSignature = (signature) => {
    const params = [{
        type: 'string', // Any valid solidity type
        name: 'Message', // Any string label you want
        value: APPROVE_MSG // The value to sign
    }]
    return decodeSignData(params, signature)
}

const decodeSignData = (msgParams, result) => {
    const recovered = recoverTypedSignature({
        data: msgParams,
        sig: result.result
    })
    return recovered
}

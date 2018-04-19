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

export function getAddressFromSignature(signature: Signature): string {
    const params = [{
        type: 'string', // Any valid solidity type
        name: 'Message', // Any string label you want
        value: APPROVE_MSG // The value to sign
    }]
    return decodeSignData(params, signature)
}

function decodeSignData(msgParams: Array<object>, signature: Signature): string {
    const recovered = recoverTypedSignature({
        data: msgParams,
        sig: signature.result
    })
    return recovered
}

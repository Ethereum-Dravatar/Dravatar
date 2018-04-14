const { recoverTypedSignature } = require("eth-sig-util");
const config = require('./config')
const getAddressFromSignature = (signature) => {
    const params = [{
        type: 'string', // Any valid solidity type
        name: 'Message', // Any string label you want
        value: config.APPROVE_MSG // The value to sign
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
        const sign = authorization.split(" ")[1]
        // Need these 3 params to be signature
        const signatureObj = convertSignToSignObject(sign)
        return signatureObj
    }
}

module.exports = {
    getAddressFromSignature,
    convertSignToSignObject,
    getTokenFromAuthorization
}
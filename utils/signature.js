const { recoverTypedSignature } = require('eth-sig-util')
const config = require('../config')
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


module.exports = {
    getAddressFromSignature
}
'use strict'
let sigUtil = require('eth-sig-util');
const ethUtil = require('ethereumjs-util');

module.exports = {
    ethjsSignTypedData(params,private_key) {
        const msgParams = {
            "data": params,
            "sig": ""
        };
        let signed = sigUtil.signTypedData(ethUtil.toBuffer(private_key), msgParams)
        msgParams.sig = signed;
        let recovered = sigUtil.recoverTypedSignature(msgParams);
        console.log(signed, recovered);
        return signed
    }
};

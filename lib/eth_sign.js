'use strict'
let sigUtil = require('eth-sig-util');
const ethUtil = require('ethereumjs-util');

module.exports = {
    ethSignTypedData(params, private_key) {
        try {
            let data = JSON.parse(params);
            const msgParams = {
                "data": data
            };
            return sigUtil.signTypedData(ethUtil.toBuffer(private_key), msgParams);
        } catch (err) {
            return ""
        }
    },
    ethRecoverTypedSign(params, signed) {
        try {
            let data = JSON.parse(params);
            const msgParams = {
                "data": data,
                "sig": signed
            };
            return sigUtil.recoverTypedSignature(msgParams);
        } catch (err) {
            return ""
        }
    },


};

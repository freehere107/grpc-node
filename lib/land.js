'use strict';
let Web3 = require('web3');
module.exports = {
    decodeTokenId(contractABI, contractAddr, tokenId, callback) {
        let web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/ZWef2NOidUm5XooBYqgl"));
        let contract = new web3.eth.Contract(contractABI, contractAddr);
        return contract.methods.decodeTokenId(tokenId).call().then(function (result) {
            return callback(JSON.stringify(result))
        })
    },

};

const secp256k1 = require('secp256k1');
const ethUtils = require('ethereumjs-util');
const HDKey = require('hdkey');

function ethDerivedAddressVerify(extendedPublicKey, path, address) {
    try {
        const publicHdKey = HDKey.fromExtendedKey(extendedPublicKey);
        const childHdKey = publicHdKey.derive(path);
        const compressedPublicKey = childHdKey.publicKey;
        const uncompressedPublicKey = secp256k1.publicKeyConvert(compressedPublicKey, false);
        const addressBuffer = ethUtils.pubToAddress(uncompressedPublicKey.slice(1, 65));
        const addressString = addressBuffer.toString('hex');
        if (address.length === 42) {
            address = address.substr(2, 40)
        }
        return addressString.toLowerCase() === address.toLowerCase()
    } catch (err) {
        return false
    }
}


module.exports = {
    ethDerivedAddressVerify
};

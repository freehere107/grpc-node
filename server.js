let PROTO_PATH = __dirname + '/protos/web3.proto';
let grpc = require('grpc');
let eth_sign = require(__dirname + '/lib/eth_sign');
let land = require(__dirname + '/lib/land');
let web3_proto = grpc.load(PROTO_PATH).web3;
let fs = require('fs');

function SignedTypeMsg(call, callback) {
    callback(null, {message: eth_sign.ethSignTypedData(call.request.msg, call.request.private_key)});
}

function RecoverSignedTypeMsg(call, callback) {
    callback(null, {message: eth_sign.ethRecoverTypedSign(call.request.msg, call.request.signed)});
}

function DecodeTokenId(call, callback) {
    let landAbi = JSON.parse(fs.readFileSync(__dirname + '/contract/land.json', 'utf8'));
    land.decodeTokenId(landAbi, call.request.address, call.request.tokenId, (result) => {
        callback(null, {message: result});
    })
}

function main() {
    let server = new grpc.Server();
    server.addService(web3_proto.EthWeb3.service, {
        SignedTypeMsg: SignedTypeMsg,
        RecoverSignedTypeMsg: RecoverSignedTypeMsg,
        DecodeTokenId: DecodeTokenId
    });
    server.bind('0.0.0.0:50052', grpc.ServerCredentials.createInsecure());
    server.start();
}

main();

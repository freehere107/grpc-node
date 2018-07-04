let PROTO_PATH = __dirname + '/protos/web3.proto';
let grpc = require('grpc');
let eth_sign = require(__dirname + '/lib/eth_sign');
let web3_proto = grpc.load(PROTO_PATH).web3;

function SignedTypeMsg(call, callback) {
    callback(null, {message: eth_sign.ethSignTypedData(call.request.msg, call.request.private_key)});
}

function RecoverSignedTypeMsg(call, callback) {
    callback(null, {message: eth_sign.ethRecoverTypedSign(call.request.msg, call.request.signed)});
}

function main() {
    let server = new grpc.Server();
    server.addService(web3_proto.EthWeb3.service, {
        SignedTypeMsg: SignedTypeMsg,
        RecoverSignedTypeMsg: RecoverSignedTypeMsg
    });
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
}

main();

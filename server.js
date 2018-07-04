let PROTO_PATH = __dirname + '/protos/web3.proto';
let grpc = require('grpc');
let eth_sign = require(__dirname + '/lib/eth_sign');
let web3_proto = grpc.load(PROTO_PATH).web3;

function SignedTypeMsg(call, callback) {
    params = JSON.parse(call.request.msg);
    privateKey = call.request.private_key;
    callback(null, {message: eth_sign.ethjsSignTypedData(params, privateKey)});
}
function main() {
    let server = new grpc.Server();
    server.addService(web3_proto.EthWeb3.service, {SignedTypeMsg: SignedTypeMsg});
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
}

main();

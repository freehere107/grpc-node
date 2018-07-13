let PROTO_PATH = __dirname + '/protos/web3.proto';

let grpc = require('grpc');
let hello_proto = grpc.load(PROTO_PATH).web3;

function main() {
    let client = new hello_proto.EthWeb3('localhost:50051', grpc.credentials.createInsecure());
    let private_key = "";
    let params = [
        {
            type: 'string',
            name: 'Message',
            value: 'Hi, Alice!'
        },
        {
            type: 'uint32',
            name: 'A number',
            value: '1337'
        }
    ];
    client.SignedTypeMsg({
        msg: JSON.stringify(params),
        private_key: private_key
    }, function (err, response) {
        console.log(response.message);
        client.RecoverSignedTypeMsg({
            msg: JSON.stringify(params),
            signed: response.message
        }, function (err, response) {
            console.log(response.message);
        });
    });
    client.DecodeTokenId({
        address: "0xd3fad65b9b5a0572cc6de4bdef4b32be84b161af",
        tokenId: "340282366920938463463374607431768211457"
    }, function (err, response) {
        console.log(response);
    });
}

main();

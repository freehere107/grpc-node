let PROTO_PATH = __dirname + '/protos/web3.proto';

let grpc = require('grpc');
let hello_proto = grpc.load(PROTO_PATH).web3;

function main() {
    let client = new hello_proto.EthWeb3('localhost:50051', grpc.credentials.createInsecure());
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
    paramsJson = JSON.stringify(params)
    console.log(typeof(paramsJson))
    client.SignedTypeMsg({
        msg: JSON.stringify(params),
        private_key: ""
    }, function (err, response) {
        console.log(response.message);
    });
}

main();

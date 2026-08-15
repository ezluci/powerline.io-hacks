import http from 'http';
import { WebSocketServer } from 'ws';
import { attachWsCallback } from './ws-callback.js';

// const SERVER_IP = '172.105.125.88'; // asia
// const SERVER_PORT = '8081';

// const SERVER_IP = '158.69.123.15'; // na
// const SERVER_PORT = '8181';

const SERVER_IP = '51.91.214.104'; // europe
let SERVER_PORT = '8183';

if (process.argv.length > 1) {
   const arg = process.argv[process.argv.length - 1];
   const number = parseInt(arg);
   if (8000 <= number && number < 9000) {
      SERVER_PORT = number.toString();
   }
}
console.log(`port ${SERVER_PORT}`);

// start ws-proxy

const httpServer = http.createServer((req, res) => { });
const proxy = new WebSocketServer({ server: httpServer });

attachWsCallback(proxy, SERVER_IP, SERVER_PORT);
httpServer.listen(44444);
console.log('ws-proxy ready');
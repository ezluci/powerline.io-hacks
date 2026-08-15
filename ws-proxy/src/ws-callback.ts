import { SocksProxyAgent } from "socks-proxy-agent";
import WebSocket, { RawData, WebSocketServer } from "ws";

export function attachWsCallback(
      proxy: WebSocketServer,
      SERVER_IP: string,
      SERVER_PORT: string
) {

   proxy.on('connection', (clientSocket, req) => {

      console.log('CLIENT OPEN');

      // setup backend socket

      let requestedProtocols = req.headers['sec-websocket-protocol'];
      if (!requestedProtocols) {
         return;
      }

      let backendSocket: WebSocket;

      let bot = false;
      if (requestedProtocols[0] === 'b') {
         bot = true;
         requestedProtocols = requestedProtocols.substring(1);
      }

      let socksUrl = '';
      let socksTimer: ReturnType<typeof setTimeout> | undefined;
      const idx4 = requestedProtocols.indexOf('+');
      if (idx4 !== -1) {
         socksUrl = 'socks5://' + requestedProtocols.substring(idx4 + 1).replace('+', ':');
         requestedProtocols = requestedProtocols.substring(0, idx4);
      }

      if (socksUrl) {
         let agent;
         try {
            agent = new SocksProxyAgent(socksUrl);
         } catch (e) {
            return clientSocket.terminate();
         }

         backendSocket = new WebSocket(`ws://${SERVER_IP}:${SERVER_PORT}`, requestedProtocols, {
            agent,
            headers: {
               'origin': 'http://powerline.io',
               'host': `${SERVER_IP}:${SERVER_PORT}`,
               'referer': 'http://powerline.io/'
            }
         });

         socksTimer = setTimeout(() => {
            backendSocket.terminate();
         }, 2000);
      } else {
         backendSocket = new WebSocket(`ws://${SERVER_IP}:${SERVER_PORT}`, requestedProtocols, {
            headers: {
               'origin': 'http://powerline.io',
               'host': `${SERVER_IP}:${SERVER_PORT}`,
               'referer': 'http://powerline.io/'
            }
         });
      }
      
      const toBackendQueue: RawData[] = [];
      let backendReady = false;

      backendSocket.on('open', () => {
         console.log('backend open!!!!!');
         if (socksTimer) {
            clearTimeout(socksTimer);
         }
         backendReady = true;
         toBackendQueue.forEach(packet => {
            backendSocket.send(packet);
         });
      })

      backendSocket.on('close', () => {
         console.log('backend closed');
      })

      backendSocket.on('message', (data, isBinary) => {
         if (!isBinary || !(data instanceof Buffer)) {
            return console.error('backend -> client: wrong data type');
         }
         const bytes = Array.from(data); // or [...data]
         // console.log('backend -> client: ', bytes[0]);
         clientSocket.send(data);
      });

      backendSocket.on('error', (error) => {
         console.error(`backend error: ${error}`);
         if (bot) {
            if (
                  error.message.includes('timed') || error.message.includes('timeout') ||
                  error.message.includes('Socket closed') || error.message.includes('ECONNREFUSED') ||
                  error.message.includes('hang up') || error.message.includes('invalid Socks5 initial') ||
                  error.message.includes('Unexpected server response: 200') || error.message.includes('ENETUNREACH') ||
                  error.message.includes('1234') || error.message.includes('1234') ||
                  error.message.includes('1234') || error.message.includes('1234')
            ) {
               console.log(`bad proxy: ${proxy}`);
            }
         }

         clientSocket.close();
      })



      // setup client socket

      clientSocket.on('message', (data, isBinary) => {
         if (!isBinary || !(data instanceof Buffer)) {
            return console.error('client -> backend: wrong data type');
         }
         const bytes = Array.from(data); // or [...data]
         // console.log(bytes);
         // 191,  176, 3,  197, 1,   0, 112, 43, 90,   133, 6
         //        -   -    -   -        -    -
         // console.log('client -> backend:', bytes.length, bytes);
         if (backendReady) {
            backendSocket.send(data);
         } else {
            toBackendQueue.push(data);
         }
      });

      clientSocket.on('close', () => {
         console.log('CLIENT CLOSE');
         backendSocket.close();
      });

      clientSocket.on('error', (error) => {
         console.error(`clientSocket error: ${error}`);
      })
   });

}
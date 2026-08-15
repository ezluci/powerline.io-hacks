// sniff websocket send
const orig = WebSocket.prototype.send;
let timecall = 0;
let count_sent = 0;
WebSocket.prototype.send = function(data) {
   if (count_sent++ >= 0) {
      const view = new Uint8Array(data);
      // console.log('[TM] ws send: ' + view + '   length: ' + view.length);
      /*if (view.length === 2) {
            if (view[1] === 3) {
               timecall = performance.now();
               const newbuf = new ArrayBuffer(1);
               const newview = new Uint8Array(newbuf);
               newview[0] = view[0];
               // console.log('new: ' + newview);
               return orig.call(this, newbuf);
            }
      }*/

      // const newbuf = new Uint8Array(view);
      // newbuf[8] = 87;
      // newbuf[9] = 134;
      // newbuf[10] = 3;

      return orig.call(this, data);
   }

   return orig.apply(this, arguments);
};




// sniff websocket receive
// Intercept WebSocket.onmessage
// const origWebSocket = window.WebSocket;
// window.WebSocket = function(...args) {
//    const ws = new origWebSocket(...args);
//    console.log(`[TM] websocket constructor called!!  0) ${args[0]} 1) ${args[1]}`);

//    const w = Math.floor(window.innerWidth / 2 / 10);
//    const h = Math.floor(window.innerHeight / 2 / 10);
//    const _pv = args[1];
//    const prekey = Math.floor(_pv % (w * h * 0x64));
//    const handshakeKey = Math.floor((prekey % 0x283f8) % 0x10000);
//    console.log(`[TM] calculations:
// w: ${w}
// h: ${h}
// pv (random): ${_pv}
// prekey: ${prekey}
// key: ${handshakeKey}`);

//    let countRecv = 0;
//    ws.addEventListener('message', function(event) {
//       if (countRecv++ >= 0 && performance.now() - timecall <= 1300) {
//             const data = event.data;
//             if (data instanceof ArrayBuffer) {
//                const view = new Uint8Array(data);
//                // console.log('[TM] ws recv:', view);
//                if (view.length >= 955) {
//                   console.log('[TM] good view!!!!!!!');
//                }
//             } else {
//                console.error('[TM] fixme');
//                // console.log('[TM] ws recv:', data);
//             }
//       }
//    });

//    return ws;
// };
// window.WebSocket.prototype = origWebSocket.prototype;
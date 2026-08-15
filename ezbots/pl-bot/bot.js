// this is a headless pl client, modified to work in nodejs.

import { KB, Kk, KT } from "./code-1.js";
import { EntityFood } from "./EntityFood.js";
import { EntityPlayer } from "./EntityPlayer.js";
import { KL, Kb, KV, Kq, KY, KO, KD, Kt, Kl, KJ, Kf, setup } from "./code-2.js";
setup(KT);
import { Camera } from "./Camera.js";
// import {  } from "./code-3.js";
import { c3, c5 } from "./code-4.js";

/* usage:
- node bot.js name
- node bot.js name ip+port (you can specify a socks proxy for the ws-proxy to use)
- node bot.js name ip+port TESTING

pl username is KT_{name}

when executed, the bot will connect to the ws-proxy (so to pl servers)
and do some sequence of turns.

if an error occurs when connecting to the server or if you get kicked inactive,
the bot exits with code 69 so you can catch it and restart it.

when TESTING, the bot tests the connection using that proxy. if it cant connect,
return 1 else return 0. the process will be done after max 4 seconds.

the bot has been modified so that it can notify the ws-proxy that it is a bot.
on the WebSocket constructor, alongside the _pv=X the bot will insert 'b' at the
beggining. so bX instead of X. if using a proxy, bX+ip+port
*/

KT.direction = KT.DIRECTION_UP;
KT.antiLagEnabled = true;
KT.app = new c5(null, KT, process.argv[3]);
KT.username = `KT_${process.argv[2]}`;
const testing = process.argv[4] === 'TESTING';

KT.botlog = (msg) => {
   const date = new Date();
   const ts = date.toLocaleTimeString([], { hour12: false }) + '.' + date.getMilliseconds().toString().padStart(0x3, '0');
   console.log(`[${ts}] [${KT.username}]: ${msg}`)
}
KT.botlog(`----- STARTING UP${testing ? ' -- TESTING' : ''}`);

setInterval(ck, 0x3e8 / 0x3c);

const possibleDirections = [];
possibleDirections[KT.DIRECTION_DOWN] = [KT.DIRECTION_LEFT, KT.DIRECTION_RIGHT];
possibleDirections[KT.DIRECTION_UP] = [KT.DIRECTION_LEFT, KT.DIRECTION_RIGHT];
possibleDirections[KT.DIRECTION_LEFT] = [KT.DIRECTION_DOWN, KT.DIRECTION_UP];
possibleDirections[KT.DIRECTION_RIGHT] = [KT.DIRECTION_DOWN, KT.DIRECTION_UP];

let lastSentNick = performance.now();
let lastTurned = performance.now();
let lastAlive = performance.now();
let turnDelay = randInt(30, 2000);
let loopUpDownIntv = undefined;

if (testing) {
   setInterval(() => {
      process.exit(1);
   }, 4000);
}

setInterval(() => {
   const timeNow = performance.now();

   // if it doesnt do anything for 5 seconds, kill it
   if (timeNow - Math.max(lastSentNick, lastTurned, lastAlive) > 5000) {
      KT.botlog(
         `i give up :( lastSentNick=${lastSentNick}  lastTurned=${lastTurned}  timeNow=${timeNow}  ` + 
         `hasConnection=${KT.network.hasConnection}  handshakeCompleted=${KT.network.handshakeCompleted}  ` +
         `isInGame=${KT.isInGame}`
      );
      process.exit(69);
   }

   if (KT.network.hasConnection && !KT.network.kickedInactive && KT.network.handshakeCompleted) {
      if (testing) {
         process.exit(0);
      }
      
      if (!KT.isInGame || !KT.localPlayer) {
         if (lastSentNick <= lastTurned && timeNow - lastAlive > 1500 + randInt(-700, 700)) {
            KT.botlog('SENDNICK');
            KT.network.sendNick(KT.username);
            lastSentNick = timeNow;
         }
      } else {
         // if (!loopUpDownIntv) {
         //    loopUpDownIntv = loopUpDown();
         // }
         if (timeNow - lastTurned > turnDelay) {
            const newDirection = KT.direction === KT.DIRECTION_UP ? KT.DIRECTION_DOWN : KT.DIRECTION_UP;
            turn(KT.DIRECTION_RIGHT, 0,0, KT.globalWebLag);
            setTimeout(()=>turn(newDirection, 0,0, KT.globalWebLag),80);
            KT.direction = newDirection;

            //const newDirection = possibleDirections[KT.direction][Math.round(Math.random())];
            //turn(newDirection, 0,0, KT.globalWebLag);
            //KT.direction = newDirection;
            
            lastTurned = timeNow;
            turnDelay = randInt(300, 4000);
         }
         lastAlive = timeNow;
      }
   }
}, 101);

function ck() {
    KT.now = +new Date();
    var cV = 0x0;
    KT.prevNow > 0x0 && (cV = KT.now - KT.prevNow),
    KT.prevNow = KT.now,
   //  KT.statsFPS && KT.statsFPS.begin(),
    KT.app.update(cV),
   //  KT.app.draw(cV),
   //  KT.statsFPS && KT.statsFPS.end(),
   //  window.requestAnimationFrame && window.requestAnimationFrame(ck),
    KT.lastFocus && (KT.lastFocus = !0x1);
}

function turn(dir, _unused_1, _unused_2, globalLag, _unused_3) {
   if (KT.antiLagEnabled) {
      const time = +new Date();
      const timeDiff = time - KT.lastTurnTime;
      KT.lastTurnTime = time;
      if (timeDiff < KT.fakeInputDelay) {
         globalLag += KT.fakeInputDelay; // default 30
      }
      
      var cl;
      var cJ = KT.localPlayer.addTurnPoint(dir, globalLag);
      if (dir == KT.DIRECTION_UP || dir == KT.DIRECTION_DOWN) {
         cl = cJ.x;
      } else {
         cl = -cJ.y;
      }
      KT.network.sendTurnPoint(dir, cl);
   } else {
      KT.network.sendDirection(dir);
   }
}

function randInt(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getPlayerPositionAfterTicks(ticks) {
   const travelDistance = ticks * KT.localPlayer.lastSpeed / KT.INTERP_TIME;
   
   const lastPoint = KT.localPlayer.findLastWaitingPoint(KT.localPlayer.direction);
   const offsetDistance = travelDistance - lastPoint.dist;
   const dirVec = Kb.GetDirectionVector(lastPoint.direction);
   
   return {
      x: lastPoint.x + dirVec.x * offsetDistance,
      y: lastPoint.y + dirVec.y * offsetDistance
   };
}

const MOVE_OFFSET_X = 0.0008;
function loopUpDown() {
   
   const length = 100;
   let y1, y2;
   
   return setInterval(() => {
      if (!KT.localPlayer) {
         clearInterval(loopUpDownIntv);
         loopUpDownIntv = undefined;
         return;
      }

      if (y1 === undefined) {
         y1 = KT.localPlayer.y - 0.1;
         y2 = KT.localPlayer.y + length - 0.1;
      }

      const next = getPlayerPositionAfterTicks(180);
      const nextX = next.x, nextY = next.y;
      const nowX = KT.localPlayer.x, nowY = KT.localPlayer.y;

      if (KT.direction === KT.DIRECTION_UP && nextY < y1) {
         swapDirection(nowX, y1);
      } else if (KT.direction === KT.DIRECTION_DOWN && nextY > y2) {
         swapDirection(nowX, y2);
      }
      
      lastTurned = performance.now();
   }, 20);

   function swapDirection(x, y) {
      const revDir = (KT.direction === KT.DIRECTION_UP ? KT.DIRECTION_DOWN : KT.DIRECTION_UP);

      // right
      KT.localPlayer.waitingPoints.push({ x: x, y: y, d: KT.DIRECTION_RIGHT });
      KT.localPlayer.waitingPointCount++;

      KT.network.sendTurnPoint(KT.DIRECTION_RIGHT, y / KT.GAME_SCALE);

      // reverse dir
      KT.localPlayer.waitingPoints.push({ x: x + MOVE_OFFSET_X, y: y, d: revDir });
      KT.localPlayer.waitingPointCount++;

      KT.network.sendTurnPoint(revDir, (x + MOVE_OFFSET_X) / KT.GAME_SCALE);

      KT.direction = revDir;
   }
}
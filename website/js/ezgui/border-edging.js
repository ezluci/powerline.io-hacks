let tried = false;
let cn = 0;
let dir;

function borderEdging() {
   if (!KT.isInGame || !KT.localPlayer) {
      window.targetX = window.targetY = undefined;
      return;
   }
   if (window.targetX === undefined && window.targetY === undefined) {
      window.targetX = KT.arenaWidth / 2;
   }

   // correcting if arena changed width
   if (window.targetX > 0) {
      window.targetX = KT.arenaWidth / 2;
   }
   if (window.targetX < 0) {
      window.targetX = -KT.arenaWidth / 2;
   }
   if (window.targetY > 0) {
      window.targetY = KT.arenaWidth / 2;
   }
   if (window.targetY < 0) {
      window.targetY = -KT.arenaWidth / 2;
   }

   // dir - wanted dir
   if (window.targetX > 0) {
      dir = KT.DIRECTION_UP;
   }
   if (window.targetY < 0) {
      dir = KT.DIRECTION_LEFT;
   }
   if (window.targetX < 0) {
      dir = KT.DIRECTION_DOWN;
   }
   if (window.targetY > 0) {
      dir = KT.DIRECTION_RIGHT;
   }

   // !! change here for custom target !!
   // window.targetX = undefined;
   // window.targetY = 40;
   // dir = KT.DIRECTION_LEFT;

   if (++cn % 20 == 0) {
      console.log('local ' + KT.localPlayer.x.toFixed(2) + ' ' + KT.localPlayer.y.toFixed(2) + '    target: ' + window.targetX?.toFixed(2) + ' ' + window.targetY?.toFixed(2));
   }

   const next = getPlayerPositionAfterTicks(200);
   const nextX = next.x, nextY = next.y;
   const nowX = KT.localPlayer.x, nowY = KT.localPlayer.y;

   if (window.targetX !== undefined) {
      const xx = window.targetX;
      
      if (Math.min(nowX, nextX) < xx && Math.max(nowX, nextX) > xx && !tried) {
         tried = true;
         setTimeout(()=>{tried=false}, 500);
         console.log('TRYING PRECISE');

         KT.localPlayer.waitingPoints.push({ x: xx, y: nowY, d: dir });
         KT.localPlayer.waitingPointCount++;

         KT.input.direction = dir;
         KT.network.sendTurnPoint(dir, xx / KT.GAME_SCALE);

         RECALC();
      }
   } else if (window.targetY !== undefined) {
      const yy = window.targetY;

      if (Math.min(nowY, nextY) < yy && Math.max(nowY, nextY) > yy && !tried) {
         tried = true;
         setTimeout(()=>{tried=false}, 500);
         console.log('TRYING PRECISE', yy);

         KT.localPlayer.waitingPoints.push({ x: nowX, y: yy, d: dir });
         KT.localPlayer.waitingPointCount++;

         KT.input.direction = dir;
         KT.network.sendTurnPoint(dir, -yy / KT.GAME_SCALE);

         RECALC();
      }
   }
}

function RECALC() {
   dir = (dir === KT.DIRECTION_UP ? KT.DIRECTION_LEFT : dir === KT.DIRECTION_LEFT ? KT.DIRECTION_DOWN : dir === KT.DIRECTION_DOWN ? KT.DIRECTION_RIGHT : KT.DIRECTION_UP);
   
   if (window.targetX !== undefined) {
      window.targetY = -window.targetX;
      window.targetX = undefined;
      window.targetY = KT.arenaHeight / 2 * (window.targetY < 0 ? -1 : +1);
   } else {
      window.targetX = window.targetY;
      window.targetY = undefined;
      window.targetX = KT.arenaWidth / 2 * (window.targetX < 0 ? -1 : +1);
   }
}
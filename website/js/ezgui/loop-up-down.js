const MOVE_OFFSET_X = 0.0008;

function loopUpDown() {
   
   const length = 100;
   let y1, y2;

   return setInterval(() => {
      if (!KT.localPlayer || (KT.input.direction !== KT.DIRECTION_UP && KT.input.direction !== KT.DIRECTION_DOWN)) {
         loopUpDownBut.disable();
         return;
      }

      if (y1 === undefined) {
         y1 = KT.localPlayer.y - 0.1;
         y2 = KT.localPlayer.y + length - 0.1;
      }

      const next = getPlayerPositionAfterTicks(180);
      const nextX = next.x, nextY = next.y;
      const nowX = KT.localPlayer.x, nowY = KT.localPlayer.y;

      if (KT.input.direction === KT.DIRECTION_UP && nextY < y1) {
         swapDirection(nowX, y1);
      } else if (KT.input.direction === KT.DIRECTION_DOWN && nextY > y2) {
         swapDirection(nowX, y2);
      }
   }, 20);

   function swapDirection(x, y) {
      const revDir = (KT.input.direction === KT.DIRECTION_UP ? KT.DIRECTION_DOWN : KT.DIRECTION_UP);

      // right
      KT.localPlayer.waitingPoints.push({ x: x, y: y, d: KT.DIRECTION_RIGHT });
      KT.localPlayer.waitingPointCount++;

      KT.network.sendTurnPoint(KT.DIRECTION_RIGHT, y / KT.GAME_SCALE);

      // reverse dir
      KT.localPlayer.waitingPoints.push({ x: x + MOVE_OFFSET_X, y: y, d: revDir });
      KT.localPlayer.waitingPointCount++;

      KT.network.sendTurnPoint(revDir, (x + MOVE_OFFSET_X) / KT.GAME_SCALE);

      KT.input.direction = revDir;
   }
}
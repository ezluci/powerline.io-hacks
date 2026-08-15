/*
you have to bump into the selected player in order for it to start.

when you bump into a segment, the points starting from there up to the head
are stored (and additional points are added after). then it tries to turn
on the first point in this list when you are close enough. and so on.
you understood everything
*/

const SEGMENT_ERROR = 1;
const FOLLOW_ERROR = 0.02;
const MOVE_TICKS = 120;

let following = false;
const usedPoints = []; // bit dirty

function followPlayer() {
   if (!KT.isInGame || !KT.localPlayer) {
      return;
   }
   if (KT.selectedPlayer === null) {
      return followPlayerBut.disable();
   }

   const next = getPlayerPositionAfterTicks(MOVE_TICKS);
   const nextX = next.x, nextY = next.y;
   const nowX = KT.localPlayer.x, nowY = KT.localPlayer.y;

   if (!following) {
      // searching for the segment which we will start with

      const plrPoints = [{ x: KT.selectedPlayer.x, y: KT.selectedPlayer.y }, ...KT.selectedPlayer.points];
      let bestDist = Infinity;
      let bestIdx;
      let bestSegX, bestSegY;

      for (let i = 1; i < plrPoints.length; ++i) {
         const p1 = plrPoints[i-1];
         const p2 = plrPoints[i];

         if (KT.input.direction === KT.DIRECTION_UP || KT.input.direction === KT.DIRECTION_DOWN) {
            if (Math.abs(p1.y - p2.y) <= SEGMENT_ERROR) {
               if (Math.min(p1.x, p2.x) <= nowX && nowX <= Math.max(p1.x, p2.x)) {
                  if (KT.input.direction === KT.DIRECTION_UP) {
                     const segY = Math.max(p1.y, p2.y) + FOLLOW_ERROR;
                     if (segY < nowY) {
                        if (nowY - segY < bestDist) {
                           bestDist = nowY - segY;
                           bestIdx = i;
                           bestSegY = segY;
                        }
                     }
                  } else {
                     const segY = Math.min(p1.y, p2.y) - FOLLOW_ERROR;
                     if (segY > nowY) {
                        if (segY - nowY < bestDist) {
                           bestDist = segY - nowY;
                           bestIdx = i;
                           bestSegY = segY;
                        }
                     }
                  }
               }
            }
         } else if (KT.input.direction === KT.DIRECTION_LEFT || KT.input.direction === KT.DIRECTION_RIGHT) {
            if (Math.abs(p1.x - p2.x) <= SEGMENT_ERROR) {
               if (Math.min(p1.y, p2.y) <= nowY && nowY <= Math.max(p1.y, p2.y)) {
                  if (KT.input.direction === KT.DIRECTION_LEFT) {
                     const segX = Math.max(p1.x, p2.x) + FOLLOW_ERROR;
                     if (segX < nowX) {
                        if (nowX - segX < bestDist) {
                           bestDist = nowX - segX;
                           bestIdx = i;
                           bestSegX = segX;
                        }
                     }
                  } else {
                     const segX = Math.min(p1.x, p2.x) - FOLLOW_ERROR;
                     if (segX > nowX) {
                        if (segX - nowX < bestDist) {
                           bestDist = segX - nowX;
                           bestIdx = i;
                           bestSegX = segX;
                        }
                     }
                  }
               }
            }
         }
      }

      let dir = -1, coord, coordX, coordY;
      if (bestDist !== Infinity) {
         const p1 = plrPoints[bestIdx-1];
         if (KT.input.direction === KT.DIRECTION_UP || KT.input.direction === KT.DIRECTION_DOWN) {
            const segY = bestSegY;
            if (Math.min(nowY, nextY) < segY && segY < Math.max(nowY, nextY)) {
               coord = -segY;
               coordX = nowX;
               coordY = segY;
               dir = (p1.x > nowX ? KT.DIRECTION_RIGHT : KT.DIRECTION_LEFT);
            }
         } else if (KT.input.direction === KT.DIRECTION_LEFT || KT.input.direction === KT.DIRECTION_RIGHT) {
            const segX = bestSegX;
            if (Math.min(nowX, nextX) < segX && segX < Math.max(nowX, nextX)) {
               coord = segX;
               coordX = segX;
               coordY = nowY;
               dir = (p1.y > nowY ? KT.DIRECTION_DOWN : KT.DIRECTION_UP);
            }
         }
      }

      if (dir !== -1) {
         // connect to the newly found segment
         KT.localPlayer.waitingPoints.push({ x: coordX, y: coordY, d: dir });
         KT.localPlayer.waitingPointCount++;
         KT.network.sendTurnPoint(dir, coord / KT.GAME_SCALE);
         KT.input.direction = dir;

         following = true;
      }
   } else {
      // so we need to follow the player
      // lets calculate which points are remaining

      const plrNow = KT.selectedPlayer.findLastWaitingPoint(KT.selectedPlayer.direction);
      const localNow = KT.localPlayer.findLastWaitingPoint(KT.input.direction);
      const points = [{ x: plrNow.x, y: plrNow.y }];
      let found = false;
      let oxSegment;

      for (let i = 0; i < KT.selectedPlayer.waitingPointCount && !found; ++i) {
         const p1 = points[points.length - 1];
         const p2 = KT.selectedPlayer.waitingPoints[i];

         if (Math.abs(p1.y - p2.y) <= SEGMENT_ERROR) {
            if (Math.max(p1.y, p2.y, localNow.y) - Math.min(p1.y, p2.y, localNow.y) <= SEGMENT_ERROR + 1.02 * FOLLOW_ERROR &&
                  Math.min(p1.x, p2.x) <= localNow.x && localNow.x <= Math.max(p1.x, p2.x)) {
               found = true;
               oxSegment = true;
            } else {
               points.push(p2);
            }
         } else {
            if (Math.max(p1.x, p2.x, localNow.x) - Math.min(p1.x, p2.x, localNow.x) <= SEGMENT_ERROR + 1.02 * FOLLOW_ERROR &&
                  Math.min(p1.y, p2.y) <= localNow.y && localNow.y <= Math.max(p1.y, p2.y)) {
               found = true;
               oxSegment = false;
            } else {
               points.push(p2);
            }
         }
      }
      for (let i = 0; i < KT.selectedPlayer.points.length && !found; ++i) {
         const p1 = points[points.length - 1];
         const p2 = KT.selectedPlayer.points[i];

         if (Math.abs(p1.y - p2.y) <= SEGMENT_ERROR) {
            if (Math.max(p1.y, p2.y, localNow.y) - Math.min(p1.y, p2.y, localNow.y) <= SEGMENT_ERROR + 1.02 * FOLLOW_ERROR &&
                  Math.min(p1.x, p2.x) <= localNow.x && localNow.x <= Math.max(p1.x, p2.x)) {
               found = true;
               oxSegment = true;
            } else {
               points.push(p2);
            }
         } else {
            if (Math.max(p1.x, p2.x, localNow.x) - Math.min(p1.x, p2.x, localNow.x) <= SEGMENT_ERROR + 1.02 * FOLLOW_ERROR &&
                  Math.min(p1.y, p2.y) <= localNow.y && localNow.y <= Math.max(p1.y, p2.y)) {
               found = true;
               oxSegment = false;
            } else {
               points.push(p2);
            }
         }
      }

      if (!found) {
         return console.error("segment has not been found!");
      }

      const travelDistance = MOVE_TICKS * KT.localPlayer.lastSpeed / KT.INTERP_TIME;
      let sumDistance = 0, p1 = localNow, dir = KT.input.direction;
      let countUsedPoints = 0;
      for (let i = points.length - 1; i >= points.length - 1; --i) {
         const p2 = points[i];
         if (oxSegment) {
            sumDistance += Math.abs(p1.x - p2.x);
         } else {
            sumDistance += Math.abs(p1.y - p2.y);
         }

         if (sumDistance > travelDistance) {
            break;
         }
         countUsedPoints++;

         // turn on this point
         let coord, coordX, coordY;
         if (oxSegment) {
            if (i != 0) {
               const p3 = points[i-1];
               dir = (p3.y >= p2.y ? KT.DIRECTION_DOWN : KT.DIRECTION_UP);
               const coord1 = Math.min(p2.x, p3.x) - FOLLOW_ERROR;
               const coord2 = Math.max(p2.x, p3.x) + FOLLOW_ERROR;
               if (p2.x > p1.x && p1.y > p2.y) {
                  if (p3.y < p2.y)  coord = coord2;
                  else  coord = coord1;
               }
               if (p2.x > p1.x && p1.y < p2.y) {
                  if (p3.y < p2.y)  coord = coord1;
                  else  coord = coord2;
               }
               if (p2.x < p1.x && p1.y > p2.y) {
                  if (p3.y < p2.y)  coord = coord1;
                  else  coord = coord2;
               }
               if (p2.x < p1.x && p1.y < p2.y) {
                  if (p3.y < p2.y)  coord = coord2;
                  else  coord = coord1;
               }
            } else {
               // fallback
               dir = KT.DIRECTION_DOWN;
               coord = p2.x + FOLLOW_ERROR * (p2.x > p1.x ? -1 : +1);
            }
            coordX = coord;
            coordY = p1.y;
         } else {
            if (i != 0) {
               const p3 = points[i-1];
               dir = (p3.x >= p2.x ? KT.DIRECTION_RIGHT : KT.DIRECTION_LEFT);
               const coord1 = Math.min(p2.y, p3.y) - FOLLOW_ERROR;
               const coord2 = Math.max(p2.y, p3.y) + FOLLOW_ERROR;
               if (p2.y > p1.y && p1.x > p2.x) {
                  if (p3.x < p2.x)  coord = coord2;
                  else  coord = coord1;
               }
               if (p2.y > p1.y && p1.x < p2.x) {
                  if (p3.x < p2.x)  coord = coord1;
                  else  coord = coord2;
               }
               if (p2.y < p1.y && p1.x > p2.x) {
                  if (p3.x < p2.x)  coord = coord1;
                  else  coord = coord2;
               }
               if (p2.y < p1.y && p1.x < p2.x) {
                  if (p3.x < p2.x)  coord = coord2;
                  else  coord = coord1;
               }
            } else {
               // fallback
               dir = KT.DIRECTION_LEFT;
               coord = p2.y + FOLLOW_ERROR * (p2.y > p1.y ? -1 : +1);
            }
            coordX = p1.x;
            coordY = coord;
            coord = -coord;
         }

         if (!usedPoints[p2.x.toFixed(3) + ' ' + p2.y.toFixed(3)]) {
            usedPoints[p2.x.toFixed(3) + ' ' + p2.y.toFixed(3)] = true;
            console.log(coord, coordX, coordY, (dir==1?'UP':dir==2?'LE':dir==3?'DW':'RI'));
            KT.localPlayer.waitingPoints.push({ x: coordX, y: coordY, d: dir });
            KT.localPlayer.waitingPointCount++;
            KT.network.sendTurnPoint(dir, coord / KT.GAME_SCALE);
            KT.input.direction = dir;
         }
         
         p1 = { x: coordX, y: coordY };
         oxSegment = !oxSegment;
      }

      if (points.length - countUsedPoints === 0) {
         followPlayerBut.disable();
      }
   }
}

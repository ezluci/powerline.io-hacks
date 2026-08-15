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

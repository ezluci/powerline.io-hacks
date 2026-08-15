// left
KT.localPlayer.waitingPoints.push({ x: nowX, y: yy, d: KT.DIRECTION_LEFT });
KT.localPlayer.waitingPointCount++;

KT.network.sendTurnPoint(KT.DIRECTION_LEFT, yy / KT.GAME_SCALE);

// // reverse dir
// KT.localPlayer.waitingPoints.push({ x: nowX - 2, y: yy, d: revDir });
// KT.localPlayer.waitingPointCount++;

// KT.network.sendTurnPoint(revDir, (nowX - 2) / KT.GAME_SCALE);

// // right
// KT.localPlayer.waitingPoints.push({ x: nowX - 2, y: yy - 1, d: KT.DIRECTION_RIGHT });
// KT.localPlayer.waitingPointCount++;

// KT.network.sendTurnPoint(KT.DIRECTION_RIGHT, (yy - 1) / KT.GAME_SCALE);

// reverse dir
KT.localPlayer.waitingPoints.push({ x: nowX - MOVE_OFFSET_X, y: yy, d: revDir });
KT.localPlayer.waitingPointCount++;

KT.input.direction = revDir;
KT.network.sendTurnPoint(revDir, (nowX - MOVE_OFFSET_X) / KT.GAME_SCALE);
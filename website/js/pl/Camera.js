class Camera {
   constructor(cV, cq, cY, cd) {
      var Ov = a0C,
      cO = {};
      cO.x = 0x0, cO.y = 0x0,
      this.canvas = cV,
      this.context = cq,
      this.x = cY,
      this.y = cd,
      this.minZoom = 0x1,
      this.maxZoom = 0x2,
      this.zoom = this.minZoom,
      this.followCameraPos = cO,
      this.cameraShiftValue = 1.5,
      this.backgroundColor = 0xc8,
      this.shakeRemainingTime = 0x0,
      this.shakePower = 0x0,
      this.randomAngleX = 0x0,
      this.randomAngleY = 0x0,
      this.shakeShiftX = 0x0,
      this.shakeShiftY = 0x0,
      this.camDist = 0x0,
      this.curSX = 0x0,
      this.curSY = 0x0,
      this.hasDamping = !0x1,
      this.lastCamX = 0x0,
      this.lastCamY = 0x0;
   } ["setupContext"](cV) {
      const cq = this.zoom,
      cY = this.canvas.width / 0x2 - this.x * cq,
      cd = this.canvas.height / 0x2 - this.y * cq;
      cV.setTransform(0x1, 0x0, 0x0, 0x1, 0x0, 0x0),
      cV.translate(cY + this.shakeShiftX, cd + this.shakeShiftY),
      cV.scale(cq, cq);
   } ["applyShake"](cV) {
      if (KT.firstClick) {
         if (this.shakeRemainingTime > 0x0) {
            var cq = this.shakePower;
            this.shakeRemainingTime < 0xfa && (cq = this.shakePower * (this.shakeRemainingTime / 0x3e8 / 0.5)), this.randomAngleX += 0x1, this.randomAngleY += 1.1;
            var cY = Math.sin(this.randomAngleX) * (cq / 0x4),
            cd = Math.cos(this.randomAngleY) * cq;
            this.shakeShiftX = cY, this.shakeShiftY = cd, this.shakeRemainingTime -= cV;
         } else this.shakeShiftX = 0x0, this.shakeShiftY = 0x0;
      }
   } ["update"](cV) {
      // console.log(KT.gameZoom, this.zoom, KT.targetZoom);
      if (KT.firstClick || (this.y = 0x0), KT.isInGame || KT.spectateMode != KT.SPECTATE_FREE || KT.UIVisible) {
         if (KT.zoomOut) {
            KT.targetZoom = KT.targetZoomOut;
         }
         KT.gameZoom += (KT.targetZoom - KT.gameZoom) / 0xa, this.zoom = KT.gameZoom * (0xa / KT.GAME_SCALE) * (0x1 / (window.devicePixelRatio / KT.defaultRetinaValue)), this.zoom *= KT.zoomAdjust;
         var cq = this.x,
         cY = this.y;
         if (KT.spectating) {
            if (KT.selectedPlayer !== null) {
               var cd = KT.selectedPlayer;
               cd && (cq += (cd.x - cq) / KT.cameraSmooth, cY += (cd.y - cY) / KT.cameraSmooth);
            }
         } else {
            if (KT.localPlayer && !KT.showBigPicture) KT.localPlayer.beingDeleted || (cq = KT.localPlayer.x, cY = KT.localPlayer.y), KT.firstClick = !0x0, KT.killCount < KT.KILLS_TO_FOLLOW && KT.app.resetAlpha();
            else {
               if (KT.lastKillerID > 0x0) {
                  var cd = KT.entities[KT.lastKillerID];
                  cd && (cq += (cd.x - cq) / KT.cameraSmooth, cY += (cd.y - cY) / KT.cameraSmooth);
               }
            }
         }
         KT.worldScreenDelta.x = cq - this.x, KT.worldScreenDelta.y = cY - this.y, this.x = cq, this.y = cY, this.applyShake(cV);
      }
   } ["setPosition"](cV, cq) {
      var OF = a0C;
      KT.worldScreenDelta.x = cV - this.x, KT.worldScreenDelta.y = cq - this.y, this.x = cV, this.y = cq;
   } ["shake"](cV) {
      var Oa = a0C;
      KT.firstClick && (this.shakeRemainingTime = 0x1f4, this.shakePower = cV);
   } ["getBounds"]() {
      var D0 = a0C,
      cV = {};
      cV.x = this.x - this.canvas.width / 0x2 / this.zoom, cV.y = this.y - this.canvas.height / 0x2 / this.zoom;
      var cq = {};
      return cq.x = this.x + this.canvas.width / 0x2 / this.zoom, cq.y = this.y + this.canvas.height / 0x2 / this.zoom, [cV, cq];
   } ["getOuterBounds"]() {
      var D1 = a0C,
      cV = {};
      cV.x = this.x - this.canvas.width / 0x2 / this.minZoom, cV.y = this.y - this.canvas.height / 0x2 / this.minZoom;
      var cq = {};
      return cq.x = this.x + this.canvas.width / 0x2 / this.minZoom, cq.y = this.y + this.canvas.height / 0x2 / this.minZoom, [cV, cq];
   } ["getInnerBounds"]() {
      var D2 = a0C,
      cV = {};
      cV.x = this.x - this.canvas.width / 0x2 / this.maxZoom, cV.y = this.y - this.canvas.height / 0x2 / this.maxZoom;
      var cq = {};
      return cq.x = this.x + this.canvas.width / 0x2 / this.maxZoom, cq.y = this.y + this.canvas.height / 0x2 / this.maxZoom, [cV, cq];
   } ["startUILayer"]() {
      var D3 = a0C;
      "DgRpA" === "DgRpA" ? this.context.setTransform(0x1, 0x0, 0x0, 0x1, 0x0, 0x0) : KU.event.trigger(KM, KE, this);
   }
}
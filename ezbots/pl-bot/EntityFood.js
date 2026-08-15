import { Kb } from "./code-2.js";

var KT;
var a0C;

export class EntityFood {
   constructor(KT2) {
      KT=KT2;
      this.id = -0x1, this.x = this.y = this.prevX = this.prevY = 0x0, this.origX = this.origY = this.dstX = this.dstY = 0x0, this.energy = 0xff, this.nick = '', this.hue = 0x0, this.lastUpdateTime, this.killedByID = 0x0, this.beingDeleted = !0x1, this.canInterpolate = !0x1, this.blendIn = 0x0, this.beginGrabX = 0x0, this.beginGrabY = 0x0, this.playSounds = 0x0, this.tutorial = !0x1, this._t = 0x0, this._style, this._renderedFrame, this._grabVal = 0x0, this._addRotation = 0x0, this._baseRotation = Math.random() * Math.PI, this._rndSign = Math.random() > 0.5 ? 0x1 : -0x1, this._bornValue = 0x0, this._alpha = 0x1;
   } ["update"](cV) {
      const cq = 0.06 * cV;
      if (this.beingDeleted) {
         var cY = KT.entities[this.killedByID];
         if (cY) {
            var cd, cO, cD = Math.pow(this._grabVal, 0x2);
            cd = cY.x, cO = cY.y,
            this.x = this.beginGrabX + (cd - this.beginGrabX) * cD,
            this.y = this.beginGrabY + (cO - this.beginGrabY) * cD,
            this._grabVal += 0.07 * cq,
            this._grabVal > 0x1 && delete KT.entities[this.id];
         } else this._grabVal += 0.07 * cq, this._grabVal > 0x1 && delete KT.entities[this.id];
      } else {
         this._bornValue < 0x1 && (this._bornValue += 0.03 * cq, this._bornValue > 0x1 && (this._bornValue = 0x1));
         var cI = Kb.clamp((KT.now - this.lastUpdateTime) / KT.INTERP_TIME, 0x0, 0x1);
         this.prevX = this.x, this.prevY = this.y;
         var cl = cI * (this.dstX - this.origX) + this.origX,
         cJ = cI * (this.dstY - this.origY) + this.origY;
         this.x = cl, this.y = cJ;
      }
      this.beingDeleted && (this._addRotation += 0.2);
   } ["drawAfter"](cV) {} ["draw"](cV) {
      var tk = a0C;
      if (KT.drawFood) {
         KT.GAME_SCALE, KT.GAME_SCALE, cV.save(), cV.translate(this.x, this.y), this._t += 0.05;
         var cq = 0.2 - 0.02 * Math.sin(this._t),
         cY = 0.2 - 0.02 * Math.sin(this._t),
         cd = 0.75 * Math.PI,
         cO = Math.sin(Math.sqrt(this._bornValue) * cd) / 0.75;
         cV.scale(cq * cO, cY * cO),
         cV.rotate((Math.PI / 0x4 + this._t / 0xf + this._baseRotation + 0x2 * this._bornValue) * this._rndSign),
         this.beingDeleted && (
            cV.rotate(this._addRotation),
            this.killedByID > 0x0 ? cV.scale(1.7, 1.7) : cV.scale(0x1 - this._grabVal, 0x1 - this._grabVal)
         ),
         cV.globalAlpha = this._alpha,
         this._renderedFrame.draw(cV),
         cV.globalAlpha = 0x1,
         cV.restore();
      }
   } ["drawInput"](cV) {} ["drawInfo"](cV) {} ["updateNetwork"](cV, cq, cY) {
      var tC = a0C,
      cd, cO;
      return cd = cV.getFloat32(cq, !0x0), cq += 0x4, cO = -cV.getFloat32(cq, !0x0), cq += 0x4, this.origX = this.x, this.origY = this.y, this.dstX = cd * KT.GAME_SCALE, this.dstY = cO * KT.GAME_SCALE, cY ? (this.origX = this.dstX, this.origY = this.dstY, this.x = this.dstX, this.y = this.dstY, this.hue = cV.getUint16(cq, !0x0), cq += 0x2, this._style = "hsl(" + this.hue + ", 100%, 50%)"/*, this._renderedFrame = KT.resources.frames.food.renderTintedFrame(this._style)*/) : this.canInterpolate = !0x0, this.lastUpdateTime = KT.now, cq;
   } ["deleteNetwork"](cV, cq) {
      var ts = a0C;
      if (KT.focus) {
         if (this.beingDeleted = !0x0, this.beginGrabX = this.x, this.beginGrabY = this.y, this.killedByID > 0x0 && this.playSounds) {
            var cY = Kb.GetVolumeAtPoint(this.x, this.y);
            KT.soundManager.playSound("foodgrab", 0.3 * cY * KT.masterVolume, 1.5, KT.PLAY_RULE_ALWAYSPLAY, null);
         }
         return cq;
      }
      return delete KT.entities[this.id], cq;
   } ["resume"]() {} ["cleanup"]() {} ["setKilledBy"](cV) {
      var tT = a0C;
      this.killedByID = cV;
   } ["setAlpha"](cV) {
      var tx = a0C;
      this._alpha = cV;
   }
};
import { Kb } from "./code-2.js";

var KT;
var KC = ["LOL", "EASY!", "OOPS!", "I DARE YOU!", "GOTCHA!", "RUN!", "TEAM?", "YES!", "NO!", "KILL THE KING!"];
var a0C;

export class EntityPlayer {
   constructor(KT2) {
      KT=KT2;
      var cV = {};
      cV.x = 0x0, cV.y = 0x0;
      var cq = {};
      cq.x = 0x0, cq.y = 0x0;
      var cY = {};
      cY.x = 0x0, cY.y = 0x0;
      var cd = {};
      cd.x = 0x0, cd.y = 0x0;
      var cO = {};
      cO.x = 0x0, cO.y = 0x0;
      var cD = {};
      cD.x = 0x0, cD.y = 0x0;
      this.snake = !0x0;
      this.killReason = KT.KILL_REASON_LEFT_SCREEN;
      this.id = -0x1;
      this.x = 0x0;
      this.y = 0x0;
      this.prevX = 0x0;
      this.prevY = 0x0;
      this.origX = 0x0;
      this.origY = 0x0;
      this.dstX = 0x0;
      this.dstY = 0x0;
      this.lastServerX = 0x0;
      this.lastServerY = 0x0;
      this.points = [];
      this.renderedPoints = [];
      this.pointServerFix = [];
      this.curLength = 0x0;
      this.curLengthDst = 0x0;
      this.direction = KT.DIRECTION_UP;
      this.hue = 0x0;
      this.attached = !0x0;
      this.attracting = !0x1;
      this.invulnerable = !0x1;
      this.shock = !0x1;
      this.decay = !0x1;
      this.still = !0x1;
      this.inside = !0x1;
      this.nick = '';
      this.lastUpdateTime;
      this.highlightTime = 0x0;
      this.highlightSin = 0x0;
      this.highlight = !0x0;
      this.highlightValue = 0xfa;
      this.glowFrame = null;
      this.glowFrameHigh = null;
      this.redTone = !0x1;
      this.beingDeleted = !0x1;
      this.snakeScale = 0x1;
      this.killedByID = 0x0;
      this.alpha = 0x1;
      this.locatorValue = 0x0;
      KT.playerCount++;
      this.lowerBound = cV;
      this.upperBound = cq;
      this.rubbing = !0x1;
      this.rubPoint = cY;
      this.rubPointOrig = cd;
      this.rubPointDst = cO;
      this.rubPointPrev = cD;
      this.extraSpeed = 0x0;
      this.boosting = !0x1;
      this.headDotCanvas;
      this.headAngle = 0x0;
      this.collidePoint = {};
      this.afterDieDeltaPos = {};
      this.t = 0x0;
      this.prevT = 0x0;
      this.prevDistToCollide = 0x63;
      this.dead = !0x1;
      this.speed1 = 0x0;
      this.speed2 = 0x0;
      this.renderedGlowFrame = null;
      this.renderedGlowHardFrame = null;
      this.particleSystem = null;
      this.colorStyle = null;
      this.sparkFrame = 0x0;
      this.sparkFrames = [];
      this.lightningFrames = [];
      this.rubSnakeID = 0x0;
      this.lowFreqGlow = 0x0;
      this.headScale = 0x1;
      this.pendingConfirmationPointCount = 0x0;
      this.lastSpeed = 0x0;
      this.waitingPoints = [];
      this.waitingPointCount = 0x0;
      this.ping = 0x0;
      this.headPos = void 0x0;
      this.shiftLen = 0x0;
      this.allServerPoints = [];
      this.tutorial = !0x1;
      this.testPoint1 = {};
      this.testPoint2 = {};
      this.mobile = !0x1;
      this.killedAnimTime = 0x0;
      this.loopSound;
      this.loopFastSound;
      this.loopElectroSound;
      this.adjustPitch = 0.4;
      this.lastDistVolume = 0x0;
      this.playSounds = 0x0;
      this.electroActive = !0x1;
      this.CONE_DISTANCE = 0x14;
      this.killedKing = !0x1;
      this.killstreak = 0x0;
      this.lastKillStreak = 0x0;
      this.boostTime = 0x0;
      this.demogorgon = !0x1;
      this.talkText = '';
      this.prevTalkID = 0x0;
      this.talkID = 0x0;
      this.balloonScale = 0x0;
      this.talkStamina = 0x0;
   }
   
   processPoint(cV) {
      this.setTurnPoint(cV.d, cV.x, cV.y), this.waitingPointCount--, this.waitingPoints.splice(0x0, 0x1);
      var cq = Kb.CalcLength(this.x, this.y, cV.x, cV.y),
      cY = Kb.GetDirectionVector(cV.d);
      if (this.x = cV.x + cY.x * cq, this.y = cV.y + cY.y * cq, this.waitingPointCount > 0x0) {
         var cd = this.waitingPoints[0x0];
         cq > Kb.CalcLength(cd.x, cd.y, cV.x, cV.y) && this.processPoint(cd);
      }
   }
   
   update(cV) {
      if (this.beingDeleted) {
         if (this.dead) this.snakeScale -= 0.1, this.snakeScale < 0x0 && (this.id == KT.localPlayerID && (/*KT.input.direction = KT.DIRECTION_UP,*/ KT.localPlayerID = 0x0, KT.localPlayer = null, KT.statKillReason = this.killReason, this.killedByID == this.id && (KT.statKillReason = KT.KILL_REASON_SUICIDE)), delete KT.entities[this.id], this.cleanup());
         else {
            var cq = Kb.CalcLength(this.x + this.afterDieDeltaPos.x, this.y + this.afterDieDeltaPos.y, this.collidePoint.x, this.collidePoint.y);
            cq > this.prevDistToCollide ? (this.dead = !0x0, this.points.unshift({
               'x': this.x,
               'y': this.y
            }), this.x = this.collidePoint.x, this.y = this.collidePoint.y) : (this.x += this.afterDieDeltaPos.x, this.y += this.afterDieDeltaPos.y), this.prevDistToCollide = cq, this.killedAnimTime += cV, this.killedAnimTime > 0xbb8 && !this.dead && (KT.debug && console.log('bf'), this.dead = !0x0);
         }
      } else {
         if (this.prevT = this.t, this.t = Kb.clamp((KT.now - this.lastUpdateTime) / KT.INTERP_TIME, 0x0, 0x1), this.prevT == this.t) return;
         this.prevX = this.x, this.prevY = this.y;
         var cY, cd, cO = 0x0,
         cD = 0x0;
         cO = this.t * (this.dstX - this.origX) + this.origX, cD = this.t * (this.dstY - this.origY) + this.origY, cY = this.dstX - this.origX, cd = this.dstY - this.origY, this.headAngle = Math.atan(cd / cY), cY < 0x0 && (this.headAngle = Math.PI + this.headAngle), this.headAngle += Math.PI / 0x2, this.x = cO, this.y = cD;
         var cI = this.x - this.prevX,
         cl = this.y - this.prevY;
         if (this.waitingPointCount > 0x0) {
            var cJ = this.waitingPoints[0x0],
            cf = (Kb.CalcLength(this.x, this.y, cJ.x, cJ.y), !0x1);
            this.direction == KT.DIRECTION_UP || this.direction == KT.DIRECTION_DOWN ? (this.prevY <= cJ.y && this.y >= cJ.y || this.y <= cJ.y && this.prevY >= cJ.y) && (cf = !0x0) : (this.prevX <= cJ.x && this.x >= cJ.x || this.x <= cJ.x && this.prevX >= cJ.x) && (cf = !0x0), cf && this.processPoint(cJ);
         }
         cI = Math.abs(cI), cl = Math.abs(cl), this.speed2 = this.speed1, this.speed1 = cI > cl ? cI : cl, cO = this.t * (this.rubPointDst.x - this.rubPointOrig.x) + this.rubPointOrig.x, cD = this.t * (this.rubPointDst.y - this.rubPointOrig.y) + this.rubPointOrig.y, this.rubPoint.x = cO, this.rubPoint.y = cD;
      }
      if (this.curLength += (this.curLengthDst - this.curLength) / 0xa, this.particleSystem && this.headPos) {
         var cp = this.headPos.x,
         ch = this.headPos.y;
         this.particleSystem.setPosition(cp, ch);
      }
      /*if (this.particleSystem && this.particleSystem.update(cV), this.extraSpeed > 0x1e || this.boosting ? this.particleSystem.enabled || this.particleSystem.setEnabled(!0x0) : this.extraSpeed <= 0x1e && this.particleSystem.enabled && this.particleSystem.setEnabled(!0x1), this.playSounds && (this.lastDistVolume = Kb.GetVolumeAtPoint(this.x, this.y)), KT.firstClick ? KT.UIVisible && (this.lastDistVolume = 0.3 * this.lastDistVolume) : this.lastDistVolume = 0x0, this.loopSound && this.playSounds) {
         this.adjustPitch -= 0.01, this.adjustPitch < 0x0 && (this.adjustPitch = 0x0);
         var cA = KT.soundManager.sound._nodeById(this.loopSound),
         cM = 0.8 + this.extraSpeed / 0x64 * 1.5 - this.adjustPitch;
         cA.bufferSource.playbackRate.value = cM;
         var cj = 0.05 + this.extraSpeed / 0x64 * 0.75;
         KT.soundManager.sound.volume(cj * this.lastDistVolume * KT.masterVolume, this.loopSound);
      }*/
      /*if (this.loopFastSound && this.playSounds) {
         var cN = Math.max(0x0, (this.extraSpeed - 0x1e) / 0x46);
         KT.soundManager.sound.volume(1.4 * cN * this.lastDistVolume * KT.masterVolume, this.loopFastSound);
      }*/
      //this.loopElectroSound && this.playSounds && (this.electroActive ? KT.soundManager.sound.volume(0x1 * this.lastDistVolume * KT.masterVolume, this.loopElectroSound) : KT.soundManager.sound.volume(0x0, this.loopElectroSound)), this.rubbing && !KT.inGameSpeedTutorial && KT.isInGame && KT.localPlayer == this && (this.boostTime += cV, this.boostTime > 0x7d0 && (KT.inGameSpeedTutorial = 0x1/*, window.localStorage.speedUpTut = 0x1*/));
      var cE = cV / 0x3e8 * 0x14;
      if (this.talkID > 0x0) {
         this.balloonScale += cE;
         var cS = 0x3 / 0x4 * Math.PI;
         this.balloonScale > cS && (this.balloonScale = cS);
      } else this.balloonScale -= cE, this.balloonScale < 0x0 && (this.balloonScale = 0x0);
   } ["drawCircle"](cV, cq, cY, cd, cO) {
      var Du = a0C;
      cV.beginPath(), cV.arc(cq, cY, cO, 0x0, 0x2 * Math.PI, !0x1), cV.fillStyle = cd, cV.fill();
   } ["drawSpark"](cV, cq, cY, cd, cO, cD) {
      var Dw = a0C;
      this.sparkFrames[cO] && (cD.save(), cD.globalAlpha = this.alpha, cD.translate(cV, cq), cD.rotate(cY), cD.scale(cd, cd), cD.translate(0x0, -this.sparkFrames[cO].height / 0x2), this.sparkFrames[cO].draw(cD), cD.restore());
   } ["drawTail"](cV, cq) {
      var DU = a0C,
      cY = cV.length,
      cd = cV[0x0].x,
      cO = cV[0x0].y;
      cq.beginPath(), cq.moveTo(cd, cO);
      for (var cD = 0x1; cD < cY; cD++) {
         var cI = cV[cD].x,
         cl = cV[cD].y;
         cq.lineTo(cI, cl), cd = cI, cO = cl;
      }
      cq.stroke();
   } ["getWidth"]() {
      var DG = a0C,
      cV = this.curLength - KT.startLength;
      return cV /= 0x3e8, (cV += 2.5) > 0x8 && (cV = 0x8), cV * (0x5 - 0x4 * this.snakeScale);
   } ["getPointList"](cV) {
      var DW = a0C;
      for (var cq = this.points.length, cY = this.x, cd = this.y, cO = 0x0, cD = cV.length, cI = cV[0x0], cl = [], cJ = 0x0; cJ < cq; cJ++) {
         var cf = this.points[cJ],
         cp = Kb.CalcLength(cY, cd, cf.x, cf.y);
         if ((cO += cp) > cI) {
            var ch = cO - cI,
            cA = cY - cf.x,
            cM = cd - cf.y,
            cj = Kb.VectorLength(cA, cM) - ch,
            cN = Kb.Normalize(cA, cM);
            if (cN.x *= cj, cN.y *= cj, cl.push({
               'x': cY - cN.x,
               'y': cd - cN.y
            }), cO -= cp, cJ--, cD--, cV.splice(0x0, 0x1), cI = cV[0x0], 0x0 == cD) break;
         } else cY = cf.x, cd = cf.y;
      }
      return cl;
   } ["calcRenderPoints"]() {
      var DH = a0C,
      cV = [],
      cq = this.points.length,
      cY = 0x0,
      cd = this.x,
      cO = this.y,
      cD = 0x0,
      cI = {
         'x': this.x,
         'y': this.y
      };
      KT.localPlayerID == this.id || this.tutorial || (this.mobile ? KT.globalMobileLag : KT.globalWebLag, cD = Math.max(KT.myPing / 0x2 + this.ping / 0x2 - KT.globalWebLag + KT.lagAddRender, 0x0) * this.lastSpeed / KT.INTERP_TIME);
      for (var cl, cJ = !0x1, cf = 0x0; cf < cq; cf++) {
         if (cl = this.points[cf], cY += Kb.CalcLength(cd, cO, cl.x, cl.y), cJ) {
            if (cY > this.curLength) {
               var cp = cY - this.curLength,
               ch = cd - cl.x,
               cA = cO - cl.y,
               cM = Kb.VectorLength(ch, cA) - cp;
               (cN = Kb.Normalize(ch, cA)).x *= cM, cN.y *= cM, cV.push({
                  'x': cd - cN.x,
                  'y': cO - cN.y
               });
               break;
            }
            var cj = {};
            cj.x = cl.x, cj.y = cl.y, cV.push(cj);
         } else {
            if (cY > cD) {
               var cN;
               cp = cY - cD, ch = cd - cl.x, cA = cO - cl.y, cM = Kb.VectorLength(ch, cA) - cp, (cN = Kb.Normalize(ch, cA)).x *= cM, cN.y *= cM, cd -= cN.x, cO -= cN.y, cV.push({
                  'x': cd,
                  'y': cO
               }), cI.x = cd, cI.y = cO, cY = 0x0, cJ = !0x0, cf--;
               continue;
            }
         }
         cd = cl.x, cO = cl.y;
      }
      var cE = {};
      cE.x = 0x0, cE.y = 0x0, (0x0 == cV.length && cV.push(cE), this.headPos = cI, this.renderedPoints = cV, this.shiftLen = cD);
   } ["drawAfter"](cV) {
      var Dm = a0C,
      cq = 0x32;
      this.beingDeleted && (cq = 0x64), this.demogorgon && (cq = 0x64);
      var cY = "hsl(" + this.hue + ", 100%, " + cq + '%)',
      cd = this.getWidth();
      this.headScale = cd / 2.5,
      this.headScale > 0x1 && (this.headScale = 0x1 + 0.6 * (this.headScale - 0x1));
      // if (KT.drawServerPos) {
      //    this.drawCircle(cV, this.lastServerX, this.lastServerY, "#FFFF00", 0x4),
      //    this.drawCircle(cV, this.testPoint1.x, this.testPoint1.y, "#00FFFF", 0x4),
      //    this.drawCircle(cV, this.testPoint2.x, this.testPoint2.y, "#00FFFF", 0x4)
      // }
      this.calcRenderPoints(), this.electroActive = !0x1;

      this.renderedPoints.forEach(pt=>{
         this.drawCircle(
            cV, pt.x, pt.y, '#ffff00', 3);
      });

      var cO = (0x64 - this.extraSpeed) / 0x1e;
      if (this.rubbing && this.headPos) {
         if (this.rubSnakeID > 0x0) {
            var cD = KT.entities[this.rubSnakeID];
            if (cD) {
               var cI = cD.getWidth() / 0x2 + 0.1,
               cl = this.headPos.x - this.rubPoint.x,
               cJ = this.headPos.y - this.rubPoint.y,
               cf = Math.atan2(cJ, cl),
               cp = cf + Math.PI / 0x2,
               ch = Math.sin(-cp),
               cA = Math.cos(-cp);
               ch *= cI, cA *= cI;
               var cM = {};
               cM.x = this.rubPoint.x - ch, cM.y = this.rubPoint.y - cA;
               var cj = cM;
               cl = this.headPos.x - cj.x, cJ = this.headPos.y - cj.y;
               var cN = (this.headPos.x + cj.x) / 0x2,
               cE = (this.headPos.y + cj.y) / 0x2,
               cS = parseInt(Kb.RandomWithRange(0x0, 0x2)), // bug with randomwithrange. fix this code!!
               cP = Math.sqrt(cl * cl + cJ * cJ);
               if (0x0 == this.sparkFrame && cP >= 0x5) {
                  cV.save(), cV.globalAlpha = this.alpha, cV.translate(cN, cE), cV.rotate(cf + Math.PI / 0x2);
                  var cX = cP / KT.resources.frames.lightning1.height,
                  cQ = Math.random(),
                  cZ = 0x1,
                  cg = 0x1;
                  cQ < 0x1 / 0x4 ? cZ = -0x1 : cQ < 0.5 ? cg = -0x1 : cQ < 0x3 / 0x4 && (cZ = -0x1, cg = -0x1), cV.scale(cX * cZ, cX * cg), this.lightningFrames[cS].draw(cV), cV.restore();
               }
               var cn = !0x1;
               (cO < 0x2 || cP <= this.CONE_DISTANCE) && (cn = !0x0, this.electroActive = !0x0);
               var cu = 0x1 - cP / 0x28;
               cu = Kb.Clamp(cu, 0.2, 0.5) + 0x0, this.extraSpeed > 0x28 && (cu += (this.extraSpeed - 0x28) / 0x3c * 0.3), cn && cD.drawSpark(this.rubPoint.x - ch, this.rubPoint.y - cA, cp, cu, cS, cV), cP < 0x5 && cD.drawSpark(this.rubPoint.x + ch, this.rubPoint.y + cA, cp, -cu, cS, cV);
            }
         }
         this.sparkFrame++, cO < 0x2 && (cO = 0x2), this.sparkFrame > cO && (this.sparkFrame = 0x0, this.playSounds && KT.soundManager.playSound("spark", 0.6 * this.lastDistVolume * KT.masterVolume, 0x1, 0x0, null));
      }
      KT.glowSnakes && KT.highQuality && (cV.shadowColor = cY, cV.shadowBlur = 0x5),
      cV.save(), cV.globalAlpha = 0x1 * this.alpha, cV.beginPath(), cV.lineWidth = cd * this.snakeScale,
      cV.lineCap = "round", cV.lineJoin = "round", cV.strokeStyle = cY, cq = 0x3c, this.beingDeleted && (cq = 0x64),
      this.demogorgon && (cq = 0x64, cV.lineWidth = (cd + 0x1) * this.snakeScale),
      cV.strokeStyle = "hsl(" + this.hue + ", 100%, " + cq + '%)', KT.glowSnakes && KT.highQuality && (cV.shadowBlur = 0xf),
      this.drawTail(this.renderedPoints, cV);
      if (this.demogorgon) {
         cV.lineWidth = cd * this.snakeScale,
         cV.strokeStyle = "hsl(0, 100%, 0%)",
         this.drawTail(this.renderedPoints, cV);
      }
      if (this.curLength > 0xfa0 && KT.highQuality) {
         var cw = 0x1;
         this.curLength < 0x1194 && (cw = 0x1 - (0x1194 - this.curLength) / 0x1f4),
         cV.globalAlpha = cw * this.alpha, cV.shadowBlur = 0x5,
         cV.lineWidth = (cd - 0x2) * this.snakeScale;
         var cU = "hsl(" + this.hue + ", 100%, 90%)";
         cV.strokeStyle = cU, cV.shadowColor = cU;
         var cG = cd / 0x4 * 1.5,
         cW = 0xa * cG,
         cH = 0xc * cG;
         cV.setLineDash([cW, cH]), cV.lineDashOffset = 0xf * this.headScale, this.drawTail(this.renderedPoints, cV), cV.globalAlpha = 0x1;
      }

      // stroke color on border of snake
      if (this.extraSpeed > 0xa) {
         var cm = (this.extraSpeed - 0xa) / 0x32;
         this.extraSpeed > 0x32 && (cm = 0x1), cV.globalAlpha = cm * this.alpha,
         cV.shadowBlur = 0x0, cV.strokeStyle = "hsl(" + this.hue + ", 100%, 90%)",
         cV.lineWidth = (cd - 0.8) * this.snakeScale, this.drawTail(this.renderedPoints, cV),
         cV.globalAlpha = 0x1 * this.alpha;
      }

      if (cV.shadowBlur = 0x0, KT.localPlayer, cV.translate(this.headPos.x, this.headPos.y), this.extraSpeed > 0x1e) {
         var cr = (this.extraSpeed - 0x1e) / 0x46;
         0x0 == this.lowFreqGlow && (cr *= 0.5), cV.globalAlpha = 0.4 * cr * this.alpha;
         var cy = 0.9;
         cV.scale(cy, cy), this.renderedGlowHardFrame.draw(cV), cV.scale(0x1 / cy, 0x1 / cy), cV.globalAlpha = 0x1 * this.alpha;
      }
      if (this.extraSpeed > 0x5) {
         var cv = (this.extraSpeed - 0x5) / 0x32;
         this.extraSpeed > 0x32 && (cv = 0x1);
         var cz = 0.6 * cv;
         cV.scale(cz, cz), this.renderedGlowFrame.draw(cV), cV.globalAlpha = 0x1 * this.alpha, cV.scale(0x1 / cz, 0x1 / cz),
         this.lowFreqGlow++, this.lowFreqGlow > 0x2 && (this.lowFreqGlow = 0x0);
      }
      var co = this.snakeScale * this.headScale;
      cV.scale(0.21 * co, 0.21 * co), this.headDotCanvas.draw(cV), cV.restore(), cV.shadowBlur = 0x0, cV.globalAlpha = 0.7 * this.alpha;
      var cR = this.getPointList([2.5 * co + this.shiftLen, 0x5 * co + this.shiftLen, 7.5 * co + this.shiftLen, 8.5 * co + this.shiftLen]);
      if (0x4 == cR.length) {
         cV.save();
         var cF = cR[0x0];
         cV.translate(cF.x, cF.y), cV.scale(0.19 * co, 0.19 * co), this.headDotCanvas.draw(cV),
         cV.restore(), cV.globalAlpha = 0.5 * this.alpha, cV.save(), cF = cR[0x1], cV.translate(cF.x, cF.y),
         cV.scale(0.16 * co, 0.16 * co), this.headDotCanvas.draw(cV), cV.restore(),
         cV.globalAlpha = 0.3 * this.alpha, cV.save(), cF = cR[0x2], cV.translate(cF.x, cF.y),
         cV.scale(0.12 * co, 0.12 * co), this.headDotCanvas.draw(cV), cV.restore(),
         cV.globalAlpha = 0.1 * this.alpha, cV.save(), cF = cR[0x3], cV.translate(cF.x, cF.y),
         cV.scale(0.12 * co, 0.12 * co), this.headDotCanvas.draw(cV), cV.restore();
      }
      cV.globalAlpha = 0x1 * this.alpha, KT.drawAABB && (
         cV.save(), cV.lineWidth = 0x2,
         cV.strokeStyle = "#FFFFFF", cV.beginPath(),
         cV.rect(this.lowerBound.x, this.upperBound.y, this.upperBound.x - this.lowerBound.x, this.lowerBound.y - this.upperBound.y),
         cV.stroke(), cV.restore()
      ),
      this.particleSystem && (this.particleSystem.alpha = 0x1 * this.alpha, this.particleSystem.draw(cV)),
      cV.globalAlpha = 0x1;
   } ["draw"](cV) {} ["drawInput"](cV) {} ["drawKillStreakIcon"](cV, cq) {
      var Dr = a0C,
      cY = 0x0;
      cq >= 0x8 && cq < 0xd ? cY = 0x0 : cq >= 0xd && cq < 0x12 ? cY = 0x1 : cq >= 0x12 && cq < 0x17 ? cY = 0x2 : cq >= 0x17 && (cY = 0x3);
      var cd = 0x1,
      cO = (cq - 0x8) / 0x16 * 0.8;
      cO > 0.8 && (cO = 0.8), cd += cO, cV.scale(cd, cd), cV.translate(0x0, -0x4 * cd), KT.resources.frames.skullback.draw(cV), 0x0 == cY ? (KT.resources.frames.skullbase.draw(cV), KT.resources.frames.skullglow.draw(cV), cq > 0x8 && KT.resources.frames.skulleyesred.draw(cV)) : 0x1 == cY ? (KT.resources.skullDarkBlue.draw(cV), KT.resources.skullDarkBlueGlow.draw(cV), KT.resources.frames.skulleyesyellow.draw(cV)) : 0x2 == cY ? (KT.resources.skullPurple.draw(cV), KT.resources.skullPurpleGlow.draw(cV), KT.resources.frames.skulleyesgreen.draw(cV)) : 0x3 == cY && (KT.resources.skullRed.draw(cV), KT.resources.skullRedGlow.draw(cV), KT.resources.frames.skulleyesblue.draw(cV)), KT.resources.frames.skullgradient.draw(cV);
      var cD = "rgba(0, 200, 255, 1.0)";
      cV.fillStyle = cD, cV.font = "Bold 18px 'proxima-nova-1','proxima-nova-2', Arial", cV.shadowBlur = 0x5, cV.shadowColor = cD;
      var cI = cV.measureText(cq).width;
      cV.fillText(cq, -cI / 0x2, -0x1e), cV.shadowBlur = 0x0, cV.scale(0x1 / cd, 0x1 / cd);
   } ["drawInfo"](cV) {
      if (null != this.headPos && !this.beingDeleted) {
         cV.save(), cV.globalAlpha = this.alpha, cV.translate(this.headPos.x, this.headPos.y);
         var cq = this.id == KT.kingID,
         cY = 0x14,
         cd = 0.5 * (this.headScale - 0x1) + 0x1,
         cO = 0.55 * cd;
         if (cq && (cV.translate(0x0, -cY * cd), cV.scale(cO, cO), KT.resources.frames.crown.draw(cV), cV.scale(0x1 / cO, 0x1 / cO), cV.translate(0x0, cY * cd), cY += 0x14), this.killedKing && (cO = 0.45 * cd, cV.translate(0x0, -cY * cd), cV.scale(cO, cO), KT.resources.frames.trophy.draw(cV), cV.scale(0x1 / cO, 0x1 / cO), cV.translate(0x0, cY * cd), cY += 0x14), this.killstreak > 0x0 && (cO = 0.35 * cd, cV.translate(0x0, -cY * cd), cV.scale(cO, cO), this.drawKillStreakIcon(cV, this.killstreak), cV.scale(0x1 / cO, 0x1 / cO), cV.translate(0x0, cY * cd)), cV.globalAlpha = 0.85 * this.alpha, this.drawName(cV), cV.restore(), this.balloonScale > 0x0) {
            cV.save(), cV.globalAlpha = 0x1, cV.translate(this.headPos.x, this.headPos.y);
            var cD = Math.sin(this.balloonScale),
            cI = Math.sin(Math.PI * (0x3 / 0x4));
            cD > cI && (cD = cI + 0.5 * (0x1 - cI)), cV.scale(cD, cD), cV.fillStyle = "rgba(0, 60, 60, 1.0)", cV.font = "Bold 8px 'proxima-nova-1','proxima-nova-2', Arial", cV.textBaseline = "hanging";
            var cl = cV.measureText(this.talkText).width,
            cJ = cl / 0x2 + 0xd,
            cf = cl + 0x8;
            cV.beginPath(), cV.moveTo(-0x4, -0x4), cV.lineTo(-0x1b, -0x14), cV.lineTo(-0xd, -0x14), cV.closePath(), cV.fill(), Kb.drawRoundedRectangle(cV, -cf / 0x2 - cJ, -24.5, cf, 0xd, 0x6), cV.fillStyle = "rgba(0, 255, 255, 1.0)", cV.fillText(this.talkText, -cl / 0x2 - cJ, -0x14), cV.restore();
         }
      }
   } ["drawName"](cV) {
      var Dv = a0C;
      cV.fillStyle = "rgba(255, 255, 255, 0.6)", cV.font = "Bold 10px 'proxima-nova-1','proxima-nova-2', Arial", cV.textBaseline = "hanging";
      var cq = this.nick.substring(0x0, 0x10);
      this.drawSpeed && (cq += ' (' + this.extraSpeed.toFixed(0x0) + ") (" + this.ping + ')');
      var cY = cV.measureText(cq).width;
      cV.fillText(cq, -cY / 0x2, 0x1e);
   } ["updateNetwork"](cV, cq, cY) {
      var Dz = a0C,
      cd, cO;
      cd = cV.getFloat32(cq, !0x0) * KT.GAME_SCALE, cq += 0x4, cO = -cV.getFloat32(cq, !0x0) * KT.GAME_SCALE, cq += 0x4, this.lastServerX = cd, this.lastServerY = cO, this.lastSpeed = cV.getFloat32(cq, !0x0) * KT.GAME_SCALE * KT.UPDATE_EVERY_N_TICKS, cq += 0x4, this.curLengthDst = cV.getFloat32(cq, !0x0) * KT.GAME_SCALE, cq += 0x4, cq += 0x1;
      var cD = cV.getUint16(cq, !0x0);
      if (cq += 0x2, 0x0 == this.waitingPointCount && this.pendingConfirmationPointCount <= 0x0) this.origX = this.x, this.origY = this.y, this.dstX = cd, this.dstY = cO;
      else {
         this.origX = this.x, this.origY = this.y;
         var cI = Kb.GetDirectionVector(this.direction);
         this.dstX += cI.x * this.lastSpeed, this.dstY += cI.y * this.lastSpeed;
      }
      var cl = cV.getUint8(cq, !0x0);
      if (cq += 0x1, 0x1 & cl) {
         this.lowerBound.x = cV.getFloat32(cq, !0x0), cq += 0x4, this.lowerBound.y = -cV.getFloat32(cq, !0x0), cq += 0x4, this.upperBound.x = cV.getFloat32(cq, !0x0), cq += 0x4, this.upperBound.y = -cV.getFloat32(cq, !0x0), cq += 0x4, this.lowerBound.x *= KT.GAME_SCALE, this.lowerBound.y *= KT.GAME_SCALE, this.upperBound.x *= KT.GAME_SCALE, this.upperBound.y *= KT.GAME_SCALE, this.testPoint1.x = cV.getFloat32(cq, !0x0) * KT.GAME_SCALE, cq += 0x4, this.testPoint1.y = -cV.getFloat32(cq, !0x0) * KT.GAME_SCALE, cq += 0x4, this.testPoint2.x = cV.getFloat32(cq, !0x0) * KT.GAME_SCALE, cq += 0x4, this.testPoint2.y = -cV.getFloat32(cq, !0x0) * KT.GAME_SCALE, cq += 0x4;
         var cJ = cV.getUint16(cq, !0x0);
         cq += 0x2, this.allServerPoints = [];
         for (var cf = 0x0; cf < cJ; cf++) {
            var cp = cV.getFloat32(cq, !0x0);
            cq += 0x4;
            var ch = -cV.getFloat32(cq, !0x0),
            cA = {};
            cA.x = cp * KT.GAME_SCALE, cA.y = ch * KT.GAME_SCALE, (cq += 0x4, this.allServerPoints.push(cA));
         }
      }
      if (0x2 & cl) {
         var cM = cV.getFloat32(cq, !0x0);
         cq += 0x4;
         var cj = -cV.getFloat32(cq, !0x0);
         cq += 0x4, this.rubSnakeID = cV.getUint16(cq, !0x0), cq += 0x2, this.rubPointOrig.x = this.rubPoint.x, this.rubPointOrig.y = this.rubPoint.y, this.rubPointDst.x = cM * KT.GAME_SCALE, this.rubPointDst.y = cj * KT.GAME_SCALE, this.rubbing || (this.rubPoint.x = this.rubPointDst.x, this.rubPoint.y = this.rubPointDst.y, this.rubPointOrig.x = this.rubPointDst.x, this.rubPointOrig.y = this.rubPointDst.y, this.rubbing = !0x0);
      } else this.rubbing = !0x1;
      if (this.boosting = !!(0x4 & cl), 0x8 & cl && (this.ping = cV.getUint16(cq, !0x0), cq += 0x2), this.killedKing = 0x10 & cl, 0x20 & cl ? (this.killstreak = cV.getUint16(cq, !0x0), cq += 0x2, this.lastKillStreak != this.killstreak && KT.localPlayer == this && KT.isInGame && (this.lastKillStreak = this.killstreak/*, KT.hud.addSpecialMessage(this.killstreak + " PLAYER KILL STREAK", 0x19)*/)) : this.killstreak = 0x0, 0x40 & cl ? (this.talkID = cV.getUint8(cq, !0x0), cq += 0x1, this.prevTalkID != this.talkID && (this.talkText = this.getTalkTextByTalkID(this.talkID), this.prevTalkID = this.talkID)) : this.talkID = 0x0, this.talkStamina = cV.getUint8(cq, !0x0), cq += 0x1, this.extraSpeed = cV.getUint8(cq, !0x0) / 0xff * 0x64, cq += 0x1, KT.localPlayer == this) {
         var cN = this.curLengthDst - KT.startLength,
         cE = Kb.Clamp(cN / KT.minZoomScore, 0x0, 0x1);
         KT.targetZoom = KT.defaultZoom - (KT.defaultZoom - KT.minZoom) * cE;
      }
      if (cY) {
         for ("demogorgon" == this.nick && (this.demogorgon = !0x0), this.origX = this.dstX, this.origY = this.dstY, this.x = this.dstX, this.y = this.dstY, this.curLength = this.curLengthDst, this.points = [], cf = 0x0; cf < cD; cf++) {
            var cS = cV.getFloat32(cq, !0x0);
            cq += 0x4;
            var cP = -cV.getFloat32(cq, !0x0),
            cX = {};
            cX.x = cS * KT.GAME_SCALE, cX.y = cP * KT.GAME_SCALE, (cq += 0x4, this.points.push(cX));
         }
         this.hue = cV.getUint16(cq, !0x0), cq += 0x2, this.mobile = 0x1 == cV.getUint8(cq), cq += 0x1, this.colorStyle = "hsl(" + this.hue + ", 100%, 50%)", this.eyesStyle = "hsl(" + this.hue + ", 100%, 20%)", this.brightStyle = "hsl(" + this.hue + ", 100%, 90%)", this.lightStyle = "hsl(" + this.hue + ", 100%, 70%)";
         //this.headDotCanvas = KT.resources.frames.head_dot.renderTintedFrame("#FFFFFF"), this.renderedGlowFrame = KT.resources.frames.glow.renderTintedFrame(this.colorStyle), this.renderedGlowHardFrame = KT.resources.frames.glow_hard.renderTintedFrame(this.brightStyle), this.lightningFrames.push(KT.resources.frames.lightning1.renderTintedFrame(this.colorStyle)), this.lightningFrames.push(KT.resources.frames.lightning2.renderTintedFrame(this.colorStyle)), this.lightningFrames.push(KT.resources.frames.lightning3.renderTintedFrame(this.colorStyle)), this.sparkFrames.push(KT.resources.frames.spark0.renderTintedFrame(this.lightStyle)), this.sparkFrames.push(KT.resources.frames.spark1.renderTintedFrame(this.lightStyle)), this.spa-rkFrames.push(KT.resources.frames.spark2.renderTintedFrame(this.lightStyle));
         /*var cQ = KT.resources.frames.particleDot.renderTintedFrame("hsl(" + this.hue + ", 100%, 80%)");
         if (this.particleSystem = new Kf(), this.particleSystem.particleFrame = cQ, this.particleSystem.init(0xa, this.x, this.y), this.playSounds) {
            var cZ = this;
            KT.soundManager.playSound("lineloop", 0x0, 0x1, 0x0, function(cy) {
               var Do = Dz;
               cZ.loopSound = cy;
            }), KT.soundManager.playSound("lineloopfast", 0x0, 0x1, 0x0, function(cy) {
               var DR = Dz;
               cZ.loopFastSound = cy;
            }), KT.soundManager.playSound("electroloop", 0x0, 0x1, 0x0, function(cy) {
               var DF = Dz;
               cZ.loopElectroSound = cy;
            });
         }*/
      } else {
         var cg = cV.getUint8(cq, !0x0);
         if (cq++, cg > 0x0) {
            var cn = [];
            for (cf = 0x0; cf < cg; cf++) {
               var cu = cV.getFloat32(cq, !0x0);
               cq += 0x4;
               var cw = -cV.getFloat32(cq, !0x0),
               cU = {};
               cU.x = cu * KT.GAME_SCALE, cU.y = cw * KT.GAME_SCALE, (cq += 0x4, cn.push(cU));
            }
            if (this.id == KT.localPlayerID && KT.antiLagEnabled) {
               var cG = Math.min(this.pendingConfirmationPointCount, cg);
               cG < 0x0 && (cG = 0x0);
               var cW = cg - this.pendingConfirmationPointCount;
               // if (cW < 0) console.log('AHAA!')
               for (this.pendingConfirmationPointCount, cf = 0x0; cf < cG; cf++) null == cn[cf + cW] || (this.points[cf] = cn[cf + cW]);
               for (cf = 0x0; cf < cg - cG; cf++) this.pointServerFix.unshift(cn[cf]);
               this.pendingConfirmationPointCount -= cg;
            } else {
               for (cf = cg - 0x1; cf >= 0x0; cf--) this.points.unshift(cn[cf]);
               this.playSounds && KT.soundManager.playSound(Ks, 0.6 * this.lastDistVolume * KT.masterVolume, 0x1, 0x0, null);
            }
         }
      }
      var cH = this.pendingConfirmationPointCount;
      cH < 0x0 && (cH = 0x0);
      var cm = cD + cH;
      return cm < this.points.length && this.points.splice(cm + 0x1, this.points.length - cm - 0x1), this.lastUpdateTime = KT.now, cq;
   } ["fixPoints"](cV, cq, cY) {
      var Da = a0C,
      cd = Kb.CalcLength(cq, cY, this.dstX, this.dstY),
      cO = Kb.CalcLength(this.origX, this.origY, cq, cY),
      cD = Kb.GetDirectionVector(cV),
      cI = cD.x * cd,
      cl = cD.y * cd;
      this.dstX = cq + cI, this.dstY = cY + cl;
      var cJ = cD.x * cO,
      cf = cD.y * cO;
      this.origX = cq - cJ, this.origY = cY - cf;
   }
   
   setTurnPoint(cV, cq, cY) {
      this.pendingConfirmationPointCount++, this.pointServerFix.length > 0x0 && (cq = this.pointServerFix[0x0].x, cY = this.pointServerFix[0x0].y, this.pointServerFix.splice(0x0, 0x1)), this.points.unshift({
         'x': cq,
         'y': cY
      }), this.pendingDirection = cV, this.direction = cV, this.fixPoints(cV, cq, cY), this.playSounds && KT.soundManager.playSound(Ks, 0.6 * this.lastDistVolume * KT.masterVolume, 0x1, 0x0, null);
   }
   
   findLastWaitingPoint(ldir) {
      var lx = this.x, ly = this.y, cd = 0;
      for (let cO = 0; cO < this.waitingPointCount; cO++) {
         var cD = this.waitingPoints[cO];
         cd += Kb.CalcLength(lx, ly, cD.x, cD.y);
         lx = cD.x;
         ly = cD.y;
         ldir = cD.d;
      }
      return { x: lx, y: ly, dist: cd, direction: ldir };
   }
   
   // Inserts a “turn point” into the waitingPoints array and returns its scaled coordinates
   addTurnPoint(turnFlag, tickCount) { // tickCount=globalLag=90 (for me)
      // Compensate for extra ping above the base (0x12c = 300)
      const BASE_PING = 300;
      let extraPing = 0;
      if (KT.myPing > BASE_PING) {
         extraPing = KT.myPing - BASE_PING;
      }
      
      // Total ticks including ping compensation
      const totalTicks = tickCount + extraPing;
      
      // Distance traveled since last update
      const travelDistance = totalTicks * this.lastSpeed / KT.INTERP_TIME; // 100
      
      // Find the last waiting point along current direction
      const lastPoint = this.findLastWaitingPoint(this.direction);
      
      // How far past that point we are
      const offsetDistance = travelDistance - lastPoint.dist;
      
      // Unit vector for that segment’s direction
      const dirVec = Kb.GetDirectionVector(lastPoint.direction);
      
      // Compute new world‑space position
      const worldX = lastPoint.x + dirVec.x * offsetDistance;
      const worldY = lastPoint.y + dirVec.y * offsetDistance;
      
      // Record the raw turn point (in game‐units)
      const rawPoint = {
         x: worldX,
         y: worldY,
         d: turnFlag
      };
      this.waitingPoints.push(rawPoint);
      this.waitingPointCount++;
      
      // Return the point scaled into “screen” or physics‐units
      return {
         x: worldX / KT.GAME_SCALE,
         y: worldY / KT.GAME_SCALE
      };
   }
   
   ["addTestTurnPoint"](cV, cq) {
      cY = this.findLastWaitingPoint(this.direction),
      cd = (Kb.GetDirectionVector(cY.direction), cY.x),
      cO = cY.y + cq,
      cD = {};
      cD.x = cd, cD.y = cO, cD.d = cV;
      var cI = {};
      return cI.x = cd / KT.GAME_SCALE, cI.y = cO / KT.GAME_SCALE, (this.waitingPointCount++, this.waitingPoints.push(cD), cI);
   } ["deleteNetwork"](cV, cq) {
      var t4 = a0C;
      if (this.id == KT.localPlayerID && KT.killCount + 0x1 >= KT.KILLS_TO_FOLLOW && (KT.lastKillerID = this.killedByID, KT.cameraSmooth = 0x1e), this.killedByID == KT.localPlayerID && this.id == KT.kingID && this.id != KT.localPlayerID && KT.isInGame && KT.hud.addSpecialMessage("YOU KILLED THE KING!", 0x1e), KT.focus && this.killReason != KT.KILL_REASON_LEFT_SCREEN) {
         this.beingDeleted = !0x0, this.id == KT.localPlayerID;
         var cY = cV.getFloat32(cq, !0x0);
         cq += 0x4;
         var cd = -cV.getFloat32(cq, !0x0);
         return cq += 0x4, this.killReason == KT.KILL_REASON_SUICIDE ? this.dead = !0x0 : (this.collidePoint.x = cY * KT.GAME_SCALE, this.collidePoint.y = cd * KT.GAME_SCALE, this.afterDieDeltaPos.x = this.x - this.prevX, this.afterDieDeltaPos.y = this.y - this.prevY, this.afterDieDeltaPos = Kb.Normalize(this.afterDieDeltaPos.x, this.afterDieDeltaPos.y), this.afterDieDeltaPos.x *= this.speed2, this.afterDieDeltaPos.y *= this.speed2), this.playSounds && KT.soundManager.playSound("crash", 0.2 * this.lastDistVolume * KT.masterVolume, 1.1, 0x0, null), cq;
      }
      return this.id == KT.localPlayerID && (KT.input.direction = KT.DIRECTION_UP, KT.localPlayerID = 0x0, KT.localPlayer = null, KT.statKillReason = this.killReason), cq += 0x4, cq += 0x4, delete KT.entities[this.id], this.cleanup(), cq;
   } ["resume"]() {} ["cleanup"]() {
      var t5 = a0C;
      KT.playerCount--, this.loopSound && this.playSounds && (KT.soundManager.sound.stop(this.loopSound), KT.soundManager.sound.stop(this.loopFastSound), KT.soundManager.sound.stop(this.loopElectroSound), this.loopSound = null, this.loopFastSound = null);
   } ["setKilledBy"](cV) {
      var t6 = a0C;
      this.killedByID = cV;
   } ["setDead"]() {
      var t7 = a0C;
      this.dead = !0x0;
   } ["setRubSnakeID"](cV) {
      var t8 = a0C;
      this.rubSnakeID = cV;
   } ["setAlpha"](cV) {
      var t9 = a0C;
      this.alpha = cV;
   } ["onBlur"]() {
      var tK = a0C;
      this.playSounds && (KT.soundManager.sound.volume(0x0, this.loopSound), KT.soundManager.sound.volume(0x0, this.loopFastSound), KT.soundManager.sound.volume(0x0, this.loopElectroSound));
   } ["getTalkTextByTalkID"](cV) {
      return KC[cV - 0x1];
   } ["canTalk"]() {
      var ti = a0C;
      return 0xff == this.talkStamina;
   }
}
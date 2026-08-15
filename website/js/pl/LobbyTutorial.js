// maybe lobby tutorial
class LobbyTutorial {
   constructor() {
      this.snake1 = null;
      this.snake2 = null;
      this.updateTime = 0x0;
      this.snake1X = 0x0;
      this.snake1Y = 0x0;
      this.snake2X = 0x8;
      this.snake2Y = -0x4;
      this.minSpeed = 0.5;
      this.snake2State = 0x0;
      this.snake2PointCount = 0x2;
      this.snake2ExtraSpeed = 0x0;
      this.snake2Speed = this.minSpeed;
      this.blockX = 0x0;
      this.snake2Length = 0xf;
      this.foodArray = [];
      this.entityCounterID = 0x1869f;
      this.snake1ID = null;
      this.snake2ID = null;
      this.snake1Hue = 0x140;
      this.snake2Hue = 0xaa;
      this.alpha = 0x0;
      this.maxFood = 0x14;
      this.fadeOutNow = !0x1;
      this.waitToFadeout = !0x1;
      this.dropFood = !0x1;
      this.fadeOutWaitTime = 0x0;
      this.isInitialized = !0x1;
   }
   
   buildFoodPacket(cV) {
      var J3 = dw,
      cq = new ArrayBuffer(0x64),
      cY = new DataView(cq),
      cd = 0x0;
      return cY.setFloat32(cd, cV.x, !0x0), cd += 0x4, cY.setFloat32(cd, cV.y, !0x0), cd += 0x4, cV.isFull && (cY.setUint16(cd, cV.hue, !0x0), cd += 0x2), cY;
   }
   
   buildSnakePacket(cV) {
      var J4 = dw,
      cq = new ArrayBuffer(0x64),
      cY = new DataView(cq),
      cd = 0x0;
      cY.setFloat32(cd, cV.x, !0x0), cd += 0x4, cY.setFloat32(cd, cV.y, !0x0), cd += 0x4, cY.setFloat32(cd, cV.lastLen, !0x0), cd += 0x4, cY.setFloat32(cd, cV.curLengthDst, !0x0), cd += 0x4, cd += 0x1;
      var cO = cV.pointCount;
      if (cY.setUint16(cd, cO, !0x0), cd += 0x2, cY.setUint8(cd, cV.flags, !0x0), cd += 0x1, 0x2 & cV.flags && (cY.setFloat32(cd, cV.rubPoint.x, !0x0), cd += 0x4, cY.setFloat32(cd, cV.rubPoint.y, !0x0), cd += 0x4, cY.setUint16(cd, 0x1, !0x0), cd += 0x2), cY.setUint8(cd, 0x0, !0x0), cd += 0x1, cY.setUint8(cd, cV.extraSpeed, !0x0), cd += 0x1, cV.isFull) {
         for (var cD = 0x0; cD < cO; cD++) cY.setFloat32(cd, cV.points[cD].x, !0x0), cd += 0x4, cY.setFloat32(cd, cV.points[cD].y, !0x0), cd += 0x4;
         cY.setUint16(cd, cV.hue, !0x0), cd += 0x2, cY.setUint8(cd, 0x0, !0x0), cd += 0x1;
      } else {
         var cI = cV.newPointCount;
         for (cY.setUint8(cd, cI, !0x0), cd += 0x1, cD = 0x0; cD < cI; cD++) cY.setFloat32(cd, cV.newPoints[cD].x, !0x0), cd += 0x4, cY.setFloat32(cd, cV.newPoints[cD].y, !0x0), cd += 0x4;
      }
      return cY;
   }
   
   update(cV) {
      var J5 = dw;
      if (this.isInitialized && !(cV > 0x64)) {
         this.waitToFadeout && (this.fadeOutWaitTime += cV, this.fadeOutWaitTime > 0x3e8 && (this.fadeOutWaitTime = 0x0, this.fadeOutNow = !0x0, this.waitToFadeout = !0x1)), 0x7 == this.snake2State && this.fadeOutNow ? (this.alpha -= 0.04, this.alpha < 0x0 && (this.alpha = 0x0, this.clear(), this.init(), showTip(0x0))) : (this.alpha += 0.04, this.alpha > 0x1 && (this.alpha = 0x1)), this.snake1.setAlpha(this.alpha), this.snake2.setAlpha(this.alpha);
         var cq = KT.INTERP_TIME;
         if (this.updateTime > cq) {
            if (null != KT.entities[this.snake1.id]) {
               if (this.snake2State >= 0x4 && this.snake1X > this.blockX) {
                  if (!this.dropFood) {
                     this.dropFood = !0x0, this.snake1.killReason = KT.KILL_REASON_SUICIDE, this.snake1.beingDeleted = !0x0, this.snake1.setDead();
                     for (var cY = 0x0; cY < this.maxFood; cY++) {
                        var cd = this.blockX - 0x1e + cY * (0x1e / this.maxFood),
                        cO = 0.5 * (Math.random() + 0.5),
                        cD = 0.3 * (Math.random() - 0.5);
                        (cA = this.initFood(cd, 0x0, this.snake1Hue - 0x19 + 0x32 * Math.random())).speedX = cO, cA.speedY = cD;
                     }
                  }
               } else {
                  this.snake1X += this.minSpeed, (cJ = {}).x = this.snake1X, cJ.y = this.snake1Y, cJ.lastLen = 0x2, cJ.curLengthDst = 0x1e, cJ.pointCount = 0x2, cJ.flags = 0x0, cJ.extraSpeed = 0x0, cJ.isFull = !0x1, cJ.newPointCount = 0x0;
                  var cI = this.buildSnakePacket(cJ);
                  this.snake1.updateNetwork(cI, 0x0, !0x1);
               }
            }
            var cl = {};
            cl.newPointCount = 0x0;
            var cJ = cl;
            0x0 == this.snake2State && (this.snake2Y > -2.6 ? (this.snake2State = 0x1, this.snake2PointCount++, cJ.newPointCount = 0x1, cJ.newPoints = [], cJ.newPoints.push({
               'x': this.snake2X,
               'y': this.snake2Y
            })) : this.snake2Y += this.minSpeed);
            var cf = !0x1,
            cp = !0x1;
            if (0x1 != this.snake2State && 0x3 != this.snake2State || (this.snake2X += this.snake2Speed, this.snake2X < this.snake1X - 0xa && 0x1 == this.snake2State || this.snake2X < this.snake1X && 0x3 == this.snake2State ? (this.snake2Speed += 0.03, cf = !0x0, this.snake2Speed > 0x5 && (this.snake2Speed = 0x5), this.snake2ExtraSpeed += 0x3, this.snake2ExtraSpeed > 0xc8 && (this.snake2ExtraSpeed = 0xc8), cJ.flags |= 0x2, cJ.rubPoint = {
               'x': this.snake2X - 0.06,
               'y': this.snake1Y
            }, cp = !0x0) : (this.snake2X >= this.snake1X - 0xa && 0x1 == this.snake2State || this.snake2X >= this.snake1X + 0x4) && (this.snake2X -= this.snake2Speed, 0x1 == this.snake2State ? this.snake2State = 0x2 : (this.snake2State = 0x4, this.blockX = this.snake2X), this.snake2PointCount++, cJ.newPointCount = 0x1, cJ.newPoints = [], cJ.newPoints.push({
               'x': this.snake2X,
               'y': this.snake2Y
            }))), cf || (this.snake2Speed -= 0.01, this.snake2Speed < this.minSpeed && (this.snake2Speed = this.minSpeed), this.snake2ExtraSpeed -= 0x1, this.snake2ExtraSpeed < 0x0 && (this.snake2ExtraSpeed = 0x0)), 0x2 != this.snake2State && 0x4 != this.snake2State || (0x2 == this.snake2State ? this.snake2Y > -1.2 ? (this.snake2State = 0x3, this.snake2PointCount++, cJ.newPointCount = 0x1, cJ.newPoints = [], cJ.newPoints.push({
               'x': this.snake2X,
               'y': this.snake2Y
            }), showTip(0x1)) : this.snake2Y += this.snake2Speed : this.snake2Y > 0.8 ? (this.snake2State = 0x5, this.snake2PointCount++, cJ.newPointCount = 0x1, cJ.newPoints = [], cJ.newPoints.push({
               'x': this.snake2X,
               'y': this.snake2Y
            })) : this.snake2Y += this.snake2Speed), 0x5 == this.snake2State && (this.snake2X > this.snake1X + 0xc ? (this.snake2State = 0x6, this.snake2PointCount++, cJ.newPointCount = 0x1, cJ.newPoints = [], cJ.newPoints.push({
               'x': this.snake2X,
               'y': this.snake2Y
            })) : this.snake2X += this.snake2Speed), 0x6 == this.snake2State && (this.snake2Y < 0x1 ? (this.snake2State = 0x7, this.snake2PointCount++, cJ.newPointCount = 0x1, cJ.newPoints = [], cJ.newPoints.push({
               'x': this.snake2X,
               'y': this.snake2Y
            }), showTip(0x2)) : this.snake2Y -= this.snake2Speed), 0x7 == this.snake2State) {
               if ("lOPcc" !== "lOPcc") this.interval = cY;
               else {
                  this.snake2X -= this.snake2Speed;
                  var ch = this.foodArray.length;
                  for (cY = 0x0; cY < ch; cY++) {
                     var cA = this.foodArray[cY];
                     this.snake2.x < cA.x + 0x1e && (null == KT.entities[cA.id] || cA.beingDeleted || (cA.beingDeleted = !0x0, cA.beginGrabX = cA.x, cA.beginGrabY = cA.y, cA.setKilledBy(this.snake2.id), this.snake2Length += 1.1));
                  }
               }
            }
            for (cJ.x = this.snake2X, cJ.y = this.snake2Y, cJ.lastLen = 0x2, cJ.curLengthDst = this.snake2Length, cJ.pointCount = this.snake2PointCount, cJ.isFull = !0x1, cJ.extraSpeed = this.snake2ExtraSpeed, cI = this.buildSnakePacket(cJ), this.snake2.updateNetwork(cI, 0x0, !0x1), cp && this.snake2.setRubSnakeID(this.snake1ID), ch = this.foodArray.length, cY = 0x0; cY < ch; cY++) cJ = {}, (cA = this.foodArray[cY]).speedX *= 0.9, cA.speedY *= 0.9, cJ.x = cA.x / KT.GAME_SCALE + cA.speedX, cJ.y = -cA.y / KT.GAME_SCALE + cA.speedY, cJ.isFull = !0x1, cI = this.buildFoodPacket(cJ), cA.updateNetwork(cI, 0x0, !0x1);
            this.updateTime -= cq;
         }
         for (null != KT.entities[this.snake1.id] && this.snake1.update(cV), null != KT.entities[this.snake2.id] && this.snake2.update(cV), ch = this.foodArray.length, cY = 0x0; cY < ch; cY++) null != KT.entities[this.foodArray[cY].id] && this.foodArray[cY].update(cV);
         this.updateTime += cV;
      }
   }
   
   draw(cV) {
      var J6 = dw;
      cV.save(), cV.translate(KT.screenWidth / 0x2 - 0x1b3 * KT.verticalZoom / 0x1, 0.5 * KT.screenHeight - 0x226 * KT.verticalZoom * 0.38 / 0x1), cV.scale(1.4 * KT.verticalZoom, 1.4 * KT.verticalZoom);
      for (var cq = this.foodArray.length, cY = 0x0, cd = 0x0; cd < cq; cd++) null != KT.entities[this.foodArray[cd].id] ? this.foodArray[cd].draw(cV) : cY++;
      cY == this.maxFood && 0x7 == this.snake2State && (this.waitToFadeout = !0x0), null != KT.entities[this.snake1.id] && (this.snake1.drawAfter(cV), this.snake1.drawAfter(cV)), null != KT.entities[this.snake2.id] && (this.snake2.drawAfter(cV), this.snake2.drawAfter(cV)), cV.restore();
   }
   
   initFood(cV, cq, cY) {
      var J7 = dw,
      cd = {},
      cO = new EntityFood();
      cO.playSounds = !0x1, cO.id = this.entityCounterID++, cO.tutorial = !0x0, cd.x = cV, cd.y = cq, cd.isFull = !0x0, cd.hue = cY;
      var cD = this.buildFoodPacket(cd);
      return cO.updateNetwork(cD, 0x0, !0x0), KT.entities[cO.id] = cO, this.foodArray.push(cO), cO;
   }
   
   initSnake(cV) {
      var J8 = dw,
      cq = {};
      if (0x0 == cV) {
         if ("nIaeD" === "SrHjI") KY.pause(KU);
         else {
            this.snake1 = new EntityPlayer(), this.snake1.playSounds = !0x1, this.snake1.tutorial = !0x0, this.snake1.id = this.entityCounterID++, KT.entities[this.snake1.id] = this.snake1, this.snake1ID = this.snake1.id, cq.lastLen = 0x2, cq.curLengthDst = 0x1e, cq.pointCount = 0x2, cq.flags = 0x0, cq.extraSpeed = 0x0, cq.isFull = !0x0, cq.points = [], cq.points.push({
               'x': this.snake1X,
               'y': this.snake1Y
            }), this.snake1X += 0x1e, cq.points.push({
               'x': this.snake1X,
               'y': this.snake1Y
            }), cq.x = this.snake1X, cq.y = this.snake1Y, cq.hue = this.snake1Hue;
            var cY = this.buildSnakePacket(cq);
            this.snake1.updateNetwork(cY, 0x0, !0x0);
         }
      } else this.snake2 = new EntityPlayer(), this.snake2.playSounds = !0x1, this.snake2.id = this.entityCounterID++, KT.entities[this.snake2.id] = this.snake2, this.snake2ID = this.snake2.id, this.snake2.tutorial = !0x0, cq.lastLen = 0x2, cq.curLengthDst = this.snake2Length, cq.pointCount = 0x2, cq.flags = 0x0, cq.extraSpeed = 0x0, cq.isFull = !0x0, cq.points = [], cq.points.push({
         'x': this.snake2X,
         'y': this.snake2Y
      }), cq.points.push({
         'x': this.snake2X,
         'y': this.snake2Y
      }), cq.x = this.snake2X, cq.y = this.snake2Y, cq.hue = this.snake2Hue, cY = this.buildSnakePacket(cq), this.snake2.updateNetwork(cY, 0x0, !0x0);
   }
   
   clear() {
      var J9 = dw;
      if (this.isInitialized) {
         this.isInitialized = !0x1, null != KT.entities[this.snake1ID] && (KT.entities[this.snake1ID].cleanup(), delete KT.entities[this.snake1ID]), null != KT.entities[this.snake2ID] && (KT.entities[this.snake2ID].cleanup(), delete KT.entities[this.snake2ID]);
         for (var cV = this.foodArray.length, cq = 0x0; cq < cV; cq++) null != KT.entities[this.foodArray[cq].id] && (KT.entities[this.foodArray[cq].id].cleanup(), delete KT.entities[this.foodArray[cq].id]);
      }
   }
   
   init() {
      this.snake1X = 0x0, this.snake1Y = 0x0, this.snake2X = 0x8, this.snake2Y = -0x4, this.snake2State = 0x0, this.snake2Speed = this.minSpeed, this.snake2ExtraSpeed = 0x0, this.blockX = 0x0, this.snake2Length = 0xf, this.entityCounterID = 0x1869f, this.foodArray = [], this.fadeOutNow = !0x1, this.waitToFadeout = !0x1, this.fadeOutWaitTime = 0x0, this.dropFood = !0x1, this.alpha = 0x0, this.initSnake(0x0), this.initSnake(0x1), this.isInitialized = !0x0;
   }
}
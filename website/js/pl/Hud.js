class Hud {
   constructor() {
      this.lastZoomAdjust = void 0x0, this.displayMessage = void 0x0, this.displayMessageName = void 0x0, this.displayTime = 0x0, this.messageType = void 0x0, this.spectatorModeText = void 0x0, this.displayText = void 0x0, this.displayTextName = void 0x0, this.display2Text = void 0x0, this.display2Message = void 0x0, this.display2Time = 0x0, this.display2Size = 0x0, this.lastScoreValue = -0x1, this.scoreText = void 0x0, this.scoreTextContext = void 0x0, this.renderedScore = void 0x0, this.renderedScoreWidth = void 0x0, this.ammoText = void 0x0, this.renderedAmmo = void 0x0, this.renderedAmmoWidth = void 0x0, this.lastAmmoValue = -0x1, this.updateLeaderboard = !0x1, this.leaderboardList = void 0x0, this.renderedLeaderboard = void 0x0, this.leaderboardWidth = void 0x0, this.leaderboardWidthScaled = void 0x0, this.leaderboardHeight = void 0x0, this.leaderboardMargin = 0x5, this.lastLocalPlayerRank = -0x1, this.currentWeapon = void 0x0, this.weaponToSwitch = void 0x0, this.weaponIconScale = 0x1, this.weaponIconPhase = 0x0, this.kingName = void 0x0, this.kingCachedText = void 0x0, this.renderedCachedText = void 0x0, this.prevKingID = 0x0, this.bottomTipMessage = void 0x0, this.bottomTipText = void 0x0, this.bottomTipTextRender = void 0x0, this.bottomTipMessageTime = 0x0, this.bottomTipMessageIsTimed = !0x0, this.bottomTipMessageDuration = 0xfa0, this.bottomTipFadeTime = 0x12c, this.bottomTipCurrentFadeTime = this.bottomTipFadeTime, this.bottomTipShowing = !0x1, this.bottomTipMessageColor1 = null, this.bottomTipMessageColor2 = null, this.renderedCachedLaserText = void 0x0, this.laserCachedText = void 0x0, this.assignedLaserPlayerName = -0x1, this.lastRankPos = void 0x0, this.rankCachedText = void 0x0, this.renderedCachedRankText = void 0x0, this.myRank = 0x0, this.myScore = 0x0, this.prevKillStreak = 0x0, this.prevLength = 0x0, this.cachedKillStreakText = void 0x0, this.cachedLengthText = void 0x0, this.renderedKillStreakText = void 0x0, this.renderedLengthText = void 0x0, this.cachedTalkText = void 0x0, this.renderedTalkText = void 0x0, this.talkBlink = 0x0, this.prev_talkStamina = 0x0, this.talkLayer = new c3();
   } ["draw"](cV) {
      if (this.displayTime > 0x0) {
         var cq = 0x0;
         (cf = +new Date() - this.displayTime) < 0xfa0 ? cq = cf < 0xbb8 ? 0x1 : 0x1 - (cf - 0xbb8) / 0x3e8 : this.displayTime = 0x0;
         var cY = !0x1;
         if (!this.displayText) {
            var cd = 0x16;
            if (this.displayMessageName) {
               var cO = 0x24;
               this.displayTextName = new KV(cO * KT.zoomAdjust, "#00FFFF", !0x1, "#00AAAA"), this.displayTextName.setValue(this.displayMessageName), this.displayTextName.setUsingRoundedFrame(!0x0), cY = !0x0, this.displayTextName.setAddTop(0x23), this.displayTextName.setShadowBlur(0x4);
            } else this.displayTextName = null, cd = 0x23;
            this.displayText = new KV(cd * KT.zoomAdjust, "#00FFFF", !0x1, "#00AAAA"), this.displayText.setValue(this.displayMessage), this.displayText.setUsingRoundedFrame(!cY), this.displayText.setShadowBlur(0x3), this.displayMessageName || this.displayText.setAddTop(-0x2);
         }
         var cD = 0.21 * KT.canvas.height;
         if (this.messageType == KT.HUD_BOTTOM) {
            cD = 0.55 * KT.canvas.height;
            var cI = "#f90600";
            this.displayText.setColor(cI), this.displayText.setStrokeColor(cI), this.displayText.setRoundedFrameStyle(cI), this.displayTextName && (this.displayTextName.setColor(cI), this.displayTextName.setStrokeColor(cI), this.displayTextName.setRoundedFrameStyle("#FF9999"), this.displayTextName.setRoundedFrameOpacity(0.1));
         }
         var cl, cJ = this.displayText.render();
         cY && this.displayTextName.setMinWidth(cJ.width), this.displayMessageName && (cl = this.displayTextName.render()), cV.globalAlpha = cq, cV.save(), cV.scale(KT.zoomAdjust, KT.zoomAdjust), cl && cV.drawImage(cl, 0.5 * KT.canvas.width / KT.zoomAdjust - cl.width / 0x2, (cD - 0x5) / KT.zoomAdjust), cV.drawImage(cJ, 0.5 * KT.canvas.width / KT.zoomAdjust - cJ.width / 0x2, cD / KT.zoomAdjust), cV.restore(), cV.globalAlpha = 0x1;
      }
      if (this.display2Time > 0x0) {
         var cf;
         cq = 0x0, (cf = +new Date() - this.display2Time) < 0xfa0 ? cf < 0xbb8 ? (cq = cf / 0xc8) > 0x1 && (cq = 0x1) : cq = 0x1 - (cf - 0xbb8) / 0x3e8 : this.display2Time = 0x0, cY = !0x1, this.display2Text || (cd = this.display2Size, this.display2Text = new KV(cd * KT.zoomAdjust, "#00FFFF", !0x1, "#00AAAA"), this.display2Text.setValue(this.display2Message), this.display2Text.setUsingRoundedFrame(!cY), this.display2Text.setShadowBlur(0x3), this.display2Text.setAddTop(-0x2)), cD = 0.7 * KT.canvas.height;
         var cp = "#00FFFF";
         this.display2Text.setColor(cp), this.display2Text.setStrokeColor(cp), this.display2Text.setRoundedFrameStyle(cp), this.display2Text.setRoundedFrameOpacity(0.11), cJ = this.display2Text.render(), cV.globalAlpha = cq, cV.save(), cV.scale(KT.zoomAdjust, KT.zoomAdjust), cV.drawImage(cJ, 0.5 * KT.canvas.width / KT.zoomAdjust - cJ.width / 0x2, cD / KT.zoomAdjust), cV.restore(), cV.globalAlpha = 0x1;
      }
      if (KT.isInGame && KT.localPlayer) {
         if (this.cachedKillStreakText && this.prevKillStreak == KT.killStreak || (this.cachedKillStreakText = new KV(0xf * KT.zoomAdjust, "#00FFFF", !0x1, "#00AAAA"), this.cachedKillStreakText.setValue("KILLS: " + KT.killStreak), this.renderedKillStreakText = this.cachedKillStreakText.render(), this.prevKillStreak = KT.killStreak, KT.statKillStreak = KT.killStreak), this.cachedLengthText && this.prevLength == this.myScore || (this.cachedLengthText = new KV(0xf * KT.zoomAdjust, "#00FFFF", !0x1, "#00AAAA"), this.cachedLengthText.setValue("SCORE: " + this.myScore), this.renderedLengthText = this.cachedLengthText.render(), this.prevLength = this.myScore), this.cachedTalkText || (this.cachedTalkText = new KV(0xf * KT.zoomAdjust, "#00FFFF", !0x1, "#00AAAA"), this.cachedTalkText.setValue("TALK"), this.renderedTalkText = this.cachedTalkText.render()), cV.save(), cV.scale(KT.zoomAdjust, KT.zoomAdjust), KT.talkEnabled > 0x0) {
            var ch = KT.localPlayer.talkStamina / 0xff;
            0xff == KT.localPlayer.talkStamina && this.prev_talkStamina < 0xff && (window.localStorage.talk ? window.localStorage.talk++ : window.localStorage.talk = 0x1, window.localStorage.talk <= 0x7 && window.localStorage.talk % 0x2 == 0x0 && KT.hud.showTip("Press T to talk", 0xfa0)), this.prev_talkStamina = KT.localPlayer.talkStamina, cV.globalAlpha = 0x1 == ch ? 0.3 : 0.1 + 0.6 * this.talkBlink;
            var cA = KT.canvas.height / KT.zoomAdjust - this.renderedKillStreakText.height - this.renderedLengthText.height - this.renderedTalkText.height - 0x5;
            cV.drawImage(this.renderedTalkText, 0x5, cA);
         }
         if (cV.globalAlpha = 0.3, cV.drawImage(this.renderedKillStreakText, 0x5, KT.canvas.height / KT.zoomAdjust - this.renderedKillStreakText.height - this.renderedLengthText.height - 0x5), cV.drawImage(this.renderedLengthText, 0x5, KT.canvas.height / KT.zoomAdjust - this.renderedKillStreakText.height - 0x5), KT.talkEnabled > 0x0) {
            if ("hrfQt" === "hrfQt") {
               var cM = this.renderedTalkText.width + 0x5 + 0x8,
               cj = cA + 0xd;
               this.drawTalkWaitFx(cV, cM, cj, 0x4, ch);
            } else this.parentNode && this.parentNode.insertBefore(cY, this);
         }
         cV.globalAlpha = 0x1, cV.restore();
      }
      if (this.updateLeaderboard) {
         this.renderedLeaderboard = document.createElement("canvas");
         var cN = this.renderedLeaderboard.getContext('2d');
         this.leaderboardList = this.leaderboardList.map(cP => (cP.nick = Kb.getPlayerName(cP.nick), cP)), this.renderLeaderboard(cN, this.renderedLeaderboard), this.updateLeaderboard = !0x1;
      }
      var cE;
      (this.renderedLeaderboard && KT.isInGame && this.drawLeaderboard(cV), this.bottomTipMessage && (this.bottomTipMessageTime > 0x0 && this.bottomTipMessageIsTimed || !this.bottomTipMessageIsTimed || this.bottomTipCurrentFadeTime > 0x0)) && (null == this.bottomTipTextRender && (cO = parseInt(0x14 * KT.zoomAdjust) + 0x1, this.bottomTipText = new KV(cO, this.bottomTipMessageColor1, !0x1, this.bottomTipMessageColor1), this.bottomTipText.setValue(this.bottomTipMessage), this.bottomTipText.setUsingRoundedFrame(!0x0), this.bottomTipText.setRoundedFrameStyle(this.bottomTipMessageColor2), this.bottomTipText.setShadowBlur(0x2), this.bottomTipTextRender = this.bottomTipText.render()), cE = this.bottomTipShowing ? 0x1 - this.bottomTipCurrentFadeTime / this.bottomTipFadeTime : this.bottomTipCurrentFadeTime / this.bottomTipFadeTime, cV.drawImage(this.bottomTipTextRender, KT.screenWidth / 0x2 - this.bottomTipTextRender.width / 0x2, 1.1 * this.bottomTipTextRender.height * cE - this.bottomTipTextRender.height)), (!KT.UIVisible && KT.talkEnabled > 0x0 && this.talkLayer.draw(cV), this.lastZoomAdjust != KT.zoomAdjust && (this.spectatorModeText = null, this.lastZoomAdjust = KT.zoomAdjust));
   } ["drawTalkWaitFx"](cV, cq, cY, cd, cO) {
      var JT = dw,
      cD = -Math.PI / 0x2,
      cI = cD,
      cl = 0x2 * Math.PI * cO + cD;
      cV.beginPath(), cV.lineWidth = 0x2 * cd, cV.arc(cq, cY, cd, 0x0, 0x2 * Math.PI, !0x1), cV.strokeStyle = "#00FFFF", cV.globalAlpha = 0.1, cV.stroke(), cV.beginPath(), cV.arc(cq, cY, cd, cI, cl, !0x1), cV.globalAlpha = 0.6, cV.stroke();
   } ["update"](cV) {
      var Jx = dw;
      this.bottomTipCurrentFadeTime > 0x0 ? (this.bottomTipCurrentFadeTime -= cV, this.bottomTipCurrentFadeTime <= 0x0 && !this.bottomTipShowing && (this.bottomTipMessage = null)) : this.bottomTipCurrentFadeTime = 0x0, this.bottomTipMessageIsTimed && (this.bottomTipMessageTime -= cV), this.bottomTipMessageIsTimed && this.bottomTipCurrentFadeTime <= 0x0 && this.bottomTipShowing && this.bottomTipMessageTime <= 0x0 && (this.bottomTipShowing = !0x1, this.bottomTipCurrentFadeTime = this.bottomTipFadeTime), this.talkBlink > 0x0 && (this.talkBlink -= cV / 0x1f4, this.talkBlink < 0x0 && (this.talkBlink = 0x0));
   } ["renderLeaderboard"](cV, cq) {
      var JL = dw;
      this.leaderboardWidth = 0xe6, this.leaderboardHeight = 0x0;
      var cY, cd = 0x5 * KT.zoomAdjust,
      cO = 0xa * KT.zoomAdjust,
      cD = 0x17 * KT.zoomAdjust,
      cI = 0x12 * KT.zoomAdjust,
      cl = (KT.zoomAdjust, 0x5 * KT.zoomAdjust),
      cJ = "Arial Black";
      this.leaderboardHeight += cd + cD + cd + 0xc, cY = 0x6 + cd + cD + cd;
      var cf = this.leaderboardList.length,
      cp = 0x0,
      ch = this;
      
      function cA(cW) {
         var Jb = JL;
         ch.leaderboardHeight += cI + cO;
         var cH = cV.measureText(cW).width;
         cp < cH && (cp = cH);
      }
      cV.font = cI + "px 'proxima-nova-1','proxima-nova-2', " + cJ;
      for (var cM = !0x1, cj = 0x0; cj < cf; cj++)(cZ = this.leaderboardList[cj]) && (KT.localPlayerID != cZ.id || cM || (cM = !0x0), cA(cZ.nick));
      !cM && KT.localPlayer && cA(Kb.getPlayerName(KT.localPlayer.nick)), this.leaderboardWidth = Kb.clamp(cp + 0x82, 0xe6, 0x159), KT.highQuality || (this.leaderboardWidth += 0x32), this.leaderboardWidthScaled = this.leaderboardWidth * KT.zoomAdjust, cq.width = this.leaderboardWidthScaled, cq.height = this.leaderboardHeight, cV.fillStyle = "#003a3a", cV.globalAlpha = 0.3, Kb.drawRoundedRectangle(cV, 0x6, 0x6, this.leaderboardWidthScaled - 0xc, this.leaderboardHeight - 0xc, 0xf * KT.zoomAdjust), cV.globalAlpha = 0x1;
      var cN = "#337777";
      cV.shadowColor = cN, cV.shadowBlur = 0x6, cV.fillStyle = cN, cV.globalAlpha = 0.5, Kb.drawTopRoundedRectangle(cV, 0x6, 0x6, this.leaderboardWidthScaled - 0xc, 0x20 * KT.zoomAdjust, 0xf * KT.zoomAdjust), cV.globalAlpha = 0x1;
      var cE = "LEADERBOARD",
      cS = "#09ffff";
      cV.font = cD + "px 'proxima-nova-1','proxima-nova-2', " + cJ, cV.textBaseline = "middle";
      var cP = cV.measureText(cE).width;
      cV.fillStyle = cS, cV.shadowColor = cS, cV.shadowBlur = 0x6, cV.fillText(cE, this.leaderboardWidthScaled / 0x2 - cP / 0x2, cd + 0x6 + cD / 0x2), cV.shadowBlur = 0x2;
      var cX = "#09ffff",
      cQ = cI + "px 'proxima-nova-1','proxima-nova-2', " + cJ;
      for (cV.font = cQ, cY += cl, cj = 0x0; cj < cf; cj++) {
         var cZ;
         if (cZ = this.leaderboardList[cj]) {
            var cg, cn = 0x0 == cj && KT.kingID > 0x0,
            cu = cj + 0x1 + '. ';
            cn && (cg = cV.measureText(cu).width, cu += "    "), cu += cZ.nick;
            var cw = 0x0;
            KT.localPlayerID == cZ.id ? cV.fillStyle = cX : cV.fillStyle = "rgba(0,255,255,0.4)", cV.font = cQ, cP = cV.measureText(cu).width, cV.fillText(cu, 0x6 + cd, cY + cw + cI / 0x2);
            var cU = cV.measureText(cZ.score).width;
            if (cV.fillText(cZ.score, this.leaderboardWidthScaled - cd - cU - 0x6, cY + cw + cI / 0x2), cn) {
               cV.save(), cV.translate(0x6 + cd + cg + 0xa, cY + cw + cI / 0x2 - 0x1);
               var cG = 0x1;
               KT.highQuality || (cG = 0.5), cV.scale(0.8 * cG, 0.8 * cG), KT.resources.frames.crown.draw(cV), cV.restore();
            }
            cY += cI + cO;
         }
      }!cM && KT.localPlayer && (cV.fillStyle = cX, cu = this.myRank + '. ' + Kb.getPlayerName(KT.localPlayer.nick), cP = cV.measureText(cu).width, cV.fillText(cu, 0x6 + cd, cY + cw + cI / 0x2), cU = cV.measureText(this.myScore).width, cV.fillText(this.myScore, this.leaderboardWidthScaled - cd - cU - 0x6, cY + cw + cI / 0x2));
   } ["drawLeaderboard"](cV) {
      var JV = dw;
      cV.drawImage(this.renderedLeaderboard, KT.screenWidth - this.leaderboardWidthScaled - this.leaderboardMargin, this.leaderboardMargin);
   } ["addMessage"](cV, cq, cY) {
      var Jq = dw;
      this.displayMessage = cV, this.displayText = null, this.displayMessageName = cY, this.displayTime = +new Date(), this.messageType = cq;
   } ["addSpecialMessage"](cV, cq) {
      var JY = dw;
      this.display2Message = cV, this.display2Text = null, this.display2Time = +new Date(), this.display2Size = cq;
   } ["refreshLeaderboard"](cV) {
      var Jd = dw;
      this.leaderboardList = cV, this.updateLeaderboard = !0x0;
   } ["showTip"](cV, cq, cY, cd) {
      var JO = dw;
      this.bottomTipMessage && this.clearTip(), this.bottomTipMessage = cV, this.bottomTipMessageTime = cq, this.bottomTipMessageIsTimed = cq > 0x0, this.bottomTipTextRender = null, this.bottomTipCurrentFadeTime = this.bottomTipFadeTime, this.bottomTipShowing = !0x0, cY ? (this.bottomTipMessageColor1 = cY, this.bottomTipMessageColor2 = cd) : (this.bottomTipMessageColor1 = "#00FFFF", this.bottomTipMessageColor2 = "#006666");
   } ["clearTip"]() {
      var JD = dw;
      this.bottomTipShowing = !0x1, this.bottomTipCurrentFadeTime = this.bottomTipFadeTime;
   } ["updateRank"](cV, cq) {
      var Jt = dw;
      this.myRank = cV, this.myScore = cq;
   } ["cantTalk"]() {
      var JI = dw;
      this.talkBlink = 0x1;
   } ["toggleTalkLayer"]() {
      var Jl = dw;
      this.talkLayer.visible ? this.talkLayer.visible = !0x1 : this.talkLayer.visible = !0x0;
   } ["hideTalkLayer"]() {
      var JJ = dw;
      this.talkLayer.visible = !0x1;
   } ["fastHideTalkLayer"]() {
      var Jf = dw;
      this.talkLayer.fastHide();
   }
}
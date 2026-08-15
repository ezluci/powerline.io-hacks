
// input class
// KT.input
class Input {
   constructor() {
      // this.mouseMoved = !0x1;
      this.direction = KT.DIRECTION_UP;
      // this.clickPosition = cV;
      // this.lastDirection = void 0x0;
      this.directionPresses = 0x0;
      this.mouseMoveEvents = 0x0;
      this.mousedown = this.mousedown.bind(this);
      this.keydown = this.keydown.bind(this);
      this.keyup = this.keyup.bind(this);
   }
   
   mousedown(cV) {
      KT.UIVisible || (
         this.mouseMoveEvents++,
         this.mouseMoveEvents > 0x2 && (KT.arrows = void 0x0, this.directionPresses = 0x0, this.mouseMoveEvents = 0x0)
      );
   }
   
   keydown(cV) {
      if (document.activeElement.id === 'varwatch') {
         return;
      }
      
      
      // ctrl-A on nickname
      if (KT.UIVisible && (cV.metaKey || cV.ctrlKey) && 0x41 == cV.keyCode) {
         var cq = $("#nick")[0x0];
         cq.setSelectionRange(0x0, cq.value.length);
      }

      if (cV.ctrlKey) {
         return; // dont interfere with ezgui
      }

      if (KT.spectating && KT.selectedPlayer === null) { // spectating in ezgui
         if (cV.keyCode === 37) {
            KT.camera.x -= 20 / KT.camera.zoom;
         } else if (cV.keyCode === 39) {
            KT.camera.x += 20 / KT.camera.zoom;
         } else if (cV.keyCode === 38) {
            KT.camera.y -= 20 / KT.camera.zoom;
         } else if (cV.keyCode === 40) {
            KT.camera.y += 20 / KT.camera.zoom;
         }
      }
      
      var cY = $("#statsPanel").is(":visible");
      if (KT.UIVisible && cY) {
         if (0xd == cV.keyCode || 0x20 == cV.keyCode) {
            clickPlay(window.localStorage.nick)
         } else {
            0x1b == cV.keyCode && ($("#statsPanel").hide(), $("#basePanel").show(), $("#nick").focus());
         }
      }
      else {
         if (0x43 == cV.keyCode && KT.UIVisible && KT.copyingLink) setTimeout(function() {
            copied();
         }, 0xa);
         else {
            if (!KT.UIVisible) { // in game
               if (0x20 == cV.keyCode && null != KT.arrows && 0 != KT.arrows) { // space - tutorial stuff
                  KT.spacePressedShowTutorialTime = 0x3e8;
               }
               
               if (KT.localPlayer && KT.talkEnabled > 0x0) { // talking
                  if (cV.keyCode >= 0x31 && cV.keyCode <= 0x39 || 0x30 == cV.keyCode)
                     if (KT.localPlayer.canTalk())
                        if (cV.keyCode >= 0x31 && cV.keyCode <= 0x39) {
                           KT.network.sendTalk(cV.keyCode - 0x31 + 0x1), KT.hud.hideTalkLayer()
                        } else {
                           KT.network.sendTalk(0xa), KT.hud.hideTalkLayer()
                        }
                  else KT.hud.cantTalk()
                  else 
                  0x54 == cV.keyCode && KT.hud.toggleTalkLayer()
               }
               
               if (0x49 == cV.keyCode) { // I
                  KT.statsVisible ? (KT.statsEnts.domElement.style.visibility = "hidden", KT.statsFPS.domElement.style.visibility = "hidden", KT.statsLAG.domElement.style.visibility = "hidden") : (KT.statsEnts.domElement.style.visibility = "visible", KT.statsFPS.domElement.style.visibility = "visible", KT.statsLAG.domElement.style.visibility = "visible"), KT.statsVisible = !KT.statsVisible, window.localStorage.statsVisible = KT.statsVisible
               } else if (0x42 == cV.keyCode) { // B
                  (console.log("B pressed"), KT.drawBoundaries = !KT.drawBoundaries)
               } else if (0x47 == cV.keyCode) { // G
                  window.toggleGraphics()
               } else if (0x50 == cV.keyCode) { // P
                  window.takeScreenshot()
               }
               
               if (0x4b == cV.keyCode) { // K
                  KT.network.leave();
               }
               
               if (KT.sdm) { // secret mode, enable with KT.sdm=1
                  if (0x4c == cV.keyCode) { // L - see all arena
                     KT.showBigPicture || KT.network.bigPicture();
                     KT.camera.x = 0x0;
                     KT.camera.y = 0x0;
                     KT.camera.zoom = 0.3599;
                     KT.isInGame = !0x1;
                     KT.showBigPicture = !0x0;
                  } else if (0x58 == cV.keyCode) { // X - nothing
                  } else if (0x43 == cV.keyCode) { // C - nothing
                     for (var cd in (Object.keys(KT.entities), Object.keys(KT.entities).count, KT.entities)) {
                        KT.entities[cd].snake;
                     }
                     KT.arenaWidth;
                     KT.GAME_SCALE;
                  } else if (0x52 == cV.keyCode) { // R
                     console.log('sssssss');
                     (window.location.href = window.location.href.split('?')[0x0] + "?v=" + new Date().getTime());
                  }
               }
               
               if (KT.localPlayer) { // movement
                  var lag = KT.globalWebLag;
                  const time = +new Date();
                  if (0x26 == cV.keyCode && !KT.spectating || 0x57 == cV.keyCode) { // up
                     if (this.direction != KT.DIRECTION_UP && this.direction != KT.DIRECTION_DOWN && this.direction != KT.DIRECTION_NONE)
                     {
                        this.direction = KT.DIRECTION_UP;
                        // this.turn(KT.DIRECTION_LEFT, -1, -1, lag, time);
                        this.turn(this.direction, -1, -1, lag, time);
                     }
                  } else if (0x25 == cV.keyCode && !KT.spectating || 0x41 == cV.keyCode) { // left
                     if (this.direction != KT.DIRECTION_LEFT && this.direction != KT.DIRECTION_RIGHT && this.direction != KT.DIRECTION_NONE)
                     {
                        this.direction = KT.DIRECTION_LEFT;
                        // this.turn(KT.DIRECTION_UP, -1, -1, lag, time);
                        this.turn(this.direction, -1, -1, lag, time);
                     }
                  } else if (0x28 == cV.keyCode && !KT.spectating || 0x53 == cV.keyCode) { // down
                     if (this.direction != KT.DIRECTION_DOWN && this.direction != KT.DIRECTION_UP && this.direction != KT.DIRECTION_NONE)
                     {
                        this.direction = KT.DIRECTION_DOWN;
                        // this.turn(KT.DIRECTION_LEFT, -1, -1, lag, time);
                        this.turn(this.direction, -1, -1, lag, time);
                     }
                  } else if (0x27 == cV.keyCode && !KT.spectating || 0x44 == cV.keyCode) { // right
                     if (this.direction != KT.DIRECTION_RIGHT && this.direction != KT.DIRECTION_LEFT && this.direction != KT.DIRECTION_NONE)
                     {
                        this.direction = KT.DIRECTION_RIGHT;
                        // this.turn(KT.DIRECTION_UP, -1, -1, lag, time);
                        this.turn(this.direction, -1, -1, lag, time);
                     }
                  }
               }
               if (KT.showBigPicture) {
                  var cl = 0.01;
                  if (cV.shiftKey) {
                     cl = 0.1;
                  }
                  
                  if (/*0x26*/188 == cV.keyCode) { // up
                     KT.camera.zoom += cl
                  } else if (/*0x28*/190 == cV.keyCode) { // down
                     KT.camera.zoom -= cl
                  }
                  
                  // KT.camera.zoom, KT.arenaWidth, KT.GAME_SCALE;
               }
               
               if (0x46 == cV.keyCode) { // F
                  Kb.toggleFullScreen();
                  KT.hud.clearTip();
               } else if (0x4d == cV.keyCode) { // M
                  toggleSound();
               } else if (0x5a == cV.keyCode && KT.sdm && KT.isInGame) { // Z + sdm
                  KT.zoomOut = !KT.zoomOut;
               }
               
               if (this.directionPresses > 0x2) {
                  KT.arrows = 0x1;
                  window.localStorage.arrows = KT.arrows
               }
            }
         }
      }
   }
   
   keyup(cV) {
      KT.UIVisible || 0x20 == cV.keyCode || 0x26 == cV.keyCode || 0x25 == cV.keyCode || 0x28 == cV.keyCode || cV.keyCode;
   }
   
   // why the fuck is this inside the input class
   turn(dir, _unused_1, _unused_2, globalLag, _unused_3) {
      this.directionPresses++;
      if (KT.antiLagEnabled) {
         const time = +new Date();
         const timeDiff = time - KT.lastTurnTime;
         KT.lastTurnTime = time;
         if (timeDiff < KT.fakeInputDelay) {
            globalLag += KT.fakeInputDelay; // default 30
         }
         
         var cl;
         var cJ = KT.localPlayer.addTurnPoint(dir, globalLag);
         if (dir == KT.DIRECTION_UP || dir == KT.DIRECTION_DOWN) {
            cl = cJ.x;
         } else {
            cl = -cJ.y;
         }
         KT.network.sendTurnPoint(dir, cl);
      } else {
         KT.network.sendDirection(dir);
      }
   }
   
   addListeners() {
      document.addEventListener("mousedown", this.mousedown, !0x1);
      document.addEventListener("keydown", this.keydown, !0x1);
      document.addEventListener("keyup", this.keyup, !0x1);
   }
};
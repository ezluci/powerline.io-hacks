const ezgui = document.querySelector('#ezgui');

const ezguiInfo = ezgui.querySelector('#ezgui-info');
const infoTitle = ezgui.querySelector('#ezgui-info-title');
const infoHacks = ezgui.querySelector('#ezgui-info-hacks');

const ezguiMain = ezgui.querySelector('#ezgui-main');
const mainTitle = ezgui.querySelector('#ezgui-main-title');
const mainHacks = ezgui.querySelector('#ezgui-main-hacks');

infoTitle.addEventListener('click', () => {
   if (infoHacks.hidden) {
      infoTitle.innerText = 'EZGUI INFO';
      infoHacks.hidden = false;
   } else {
      infoTitle.innerText = 'v EZGUI INFO v';
      infoHacks.hidden = true;
   }
});

mainTitle.addEventListener('click', () => {
   if (mainHacks.hidden) {
      mainTitle.innerText = 'EZGUI MAIN';
      mainHacks.hidden = false;
   } else {
      mainTitle.innerText = 'v EZGUI MAIN v';
      mainHacks.hidden = true;
   }
});


function setupButton(button, onEnable, onDisable, testShortcut) {
   if (onEnable && !onDisable) { // normal button
      button.enable = () => {
         onEnable();
      }
   } else { // on/off button
      button.enable = () => {
         if (!onEnable()) {
            return; // can't enable
         }
         button.pressed = true;
         button.classList.remove('ezgui-button-off');
         button.classList.add('ezgui-button-on');
      };
      button.disable = () => {
         if (!onDisable()) {
            return; // can't disable
         }
         button.pressed = false;
         button.classList.remove('ezgui-button-on');
         button.classList.add('ezgui-button-off');
      };
   }

   button.pressed = false;

   function onClick() {
      !button.pressed ? button.enable() : button.disable();
   }
   button.addEventListener('click', onClick);

   document.addEventListener('keydown', (e) => {
      if (testShortcut?.(e)) {
         e.preventDefault();
         onClick();
      }
   });

   return button;
}


function setupVarval(varval, object, property, value) {
   const varInput = varval.querySelector('input');
   varInput.value = value;

   object[property] = value;
   varInput.addEventListener('input', () => {
      value = parseInt(varInput.value);
   });
   varInput.addEventListener('focusout', () => {
      object[property] = value;
   });
}


// handle zoom scroll
KT.targetZoomOut = 1;
window.addEventListener('wheel', (e) => {
   KT.targetZoomOut -= e.deltaY * KT.targetZoomOut / 700;
});


const enableZoomBut = setupButton(
   ezgui.querySelector('#ezgui-enable-zoom'),
   () => {
      KT.zoomOut = true;
      return true;
   }, () => {
      KT.zoomOut = false;
      return true;
   },
   (e) => e.ctrlKey && e.key === 'z'
);
enableZoomBut.enable();


let moveMouseBut;
const switchTurnBut = setupButton(
   ezgui.querySelector('#ezgui-switch-turn'),
   () => {
      KT.antiLagEnabled = false;
      return true;
   }, () => {
      if (KT.isInGame) {
         return false;
      }
      if (moveMouseBut.pressed) {
         moveMouseBut.disable();
      }
      if (moveMouseBut.pressed) {
         return false;
      }

      KT.antiLagEnabled = true;
      return true;
   },
   (e) => e.ctrlKey && e.key === 'm'
);


let moveMouseIntv;
moveMouseBut = setupButton(
   ezgui.querySelector('#ezgui-move-mouse'),
   () => {
      if (!switchTurnBut.pressed) {
         switchTurnBut.enable();
      }
      if (!switchTurnBut.pressed) {
         return false;
      }
      
      moveMouseIntv = moveByMouse();
      return true;
   }, () => {
      clearInterval(moveMouseIntv);
      return true;
   },
   (e) => e.ctrlKey && e.key === 'x'
);


const talkUndefinedBut = setupButton(
   ezgui.querySelector('#ezgui-talk-undefined'),
   () => {
      KT.network.sendTalk(221);
      KT.hud.hideTalkLayer();
      return true;
   },
   null,
   (e) => e.key === ']'
);


let borderEdgingIntv;
let followPlayerBut;
const borderEdgingBut = setupButton(
   ezgui.querySelector('#ezgui-border-edging'),
   () => {
      followPlayerBut.disable();
      window.targetX = window.targetY = undefined;
      borderEdgingIntv = setInterval(borderEdging, 20);
      return true;
   }, () => {
      if (borderEdgingIntv) {
         clearInterval(borderEdgingIntv);
         borderEdgingIntv = undefined;
      }
      window.targetX = window.targetY = undefined;
      return true;
   },
   (e) => e.ctrlKey && e.key === 'b'
);


let followPlayerIntv;
followPlayerBut = setupButton(
   ezgui.querySelector('#ezgui-follow-player'),
   () => {
      if (KT.selectedPlayer === null) {
         return false;
      }
      borderEdgingBut.disable();
      following = false;
      usedPoints.length = 0;
      followPlayerIntv = setInterval(followPlayer, 8);
      return true;
   }, () => {
      if (followPlayerIntv) {
         clearInterval(followPlayerIntv);
         followPlayerIntv = undefined;
      }
      return true;
   },
   (e) => e.ctrlKey && e.key === 'f'
);


let loopUpDownIntv;
const loopUpDownBut = setupButton(
   ezgui.querySelector('#ezgui-loop-up-down'),
   () => {
      if (!KT.isInGame || KT.input.direction !== KT.DIRECTION_UP) {
         return false;
      }

      loopUpDownIntv = loopUpDown();
      return true;
   }, () => {
      clearInterval(loopUpDownIntv);
      return true;
   },
   (e) => e.ctrlKey && e.key === 'l'
);

const fastRespawnBut = setupButton(
   ezgui.querySelector('#ezgui-fast-respawn'),
   () => {
      KT.EZGUI_fadeinUITime = 0;
      return true;
   }, () => {
      KT.EZGUI_fadeinUITime = undefined;
      return true;
   },
   null
);
fastRespawnBut.enable();


setupVarval(
   ezgui.querySelector('#ezgui-fakeinputdelay'),
   KT, 'fakeInputDelay', 30
);


KT.selectedPlayer = null;
const selectedPlayerElm = ezgui.querySelector('#ezgui-selected-player');
setInterval(() => {
   if (KT.selectedPlayer?.dead) {
      KT.selectedPlayer = null;
   }

   let string = '';
   string += '(';
   string += (!KT.selectedPlayer ? 'null' : KT.selectedPlayer.id);
   string += ')';

   if (KT.selectedPlayer) {
      string += ' ';
      if (Object.keys(KT.entities).includes(KT.selectedPlayer.id.toString())) {
         string += KT.selectedPlayer.nick;
      } else {
         string += '?!?!';
      }
   }

   selectedPlayerElm.innerText = string;
}, 100);

const statsPanelElm = document.querySelector('#statsPanel');
const basePanelElm = document.querySelector('#basePanel');
let clickPlayIntv = null;
const spectateBut = setupButton(
   ezgui.querySelector('#ezgui-spectate'),
   () => {
      KT.spectating = true;
      statsPanelElm.style.display = 'none';
      basePanelElm.style.display = 'none';
      clickPlayIntv = setInterval(() => {
         if (KT.isInGame) {
            return;
         }
         clickPlay('speKTating');
      }, 50_000);
      return true;
   },
   () => {
      KT.spectating = false;
      statsPanelElm.style.display = 'block';
      basePanelElm.style.display = 'block';
      clearInterval(clickPlayIntv);
      return true;
   },
   (e) => e.ctrlKey && e.key === '1'
);

const selectPlayerBut = setupButton(
   ezgui.querySelector('#ezgui-select-player'),
   () => {
      document.addEventListener('click', onClick);
      function onClick(e) {
         if (ezgui.contains(e.target) || !selectPlayerBut.pressed) {
            return;
         }

         const bestObj = { dist: Infinity, player: null };
         function updateObj(obj) {
            if (obj.dist < bestObj.dist) {
               bestObj.dist = obj.dist;
               bestObj.player = obj.player;
            }
         }
         
         let mwx = mouseToWorldX, mwy = mouseToWorldY;

         Object.values(KT.entities).forEach(entity => {
            if (!(entity instanceof EntityPlayer)) {
               return;
            }

            for (let i = 1; i < entity.renderedPoints.length; ++i) {
               const lx = entity.renderedPoints[i-1].x;
               const ly = entity.renderedPoints[i-1].y;
               const x = entity.renderedPoints[i].x;
               const y = entity.renderedPoints[i].y;

               if (Math.abs(ly - y) < 1e-3) {
                  const x1 = Math.min(lx, x);
                  const x2 = Math.max(lx, x);
                  if (x1 <= mwx && mwx <= x2) {
                     updateObj({ dist: Math.abs(mwy - y), player: entity });
                  } else {
                     updateObj({
                        dist: Math.min(Kb.CalcLength(mwx, mwy, x, y), Kb.CalcLength(mwx, mwy, lx, ly)),
                        player: entity
                     });
                  }
               } else if (Math.abs(lx - x) < 1e-3) {
                  const y1 = Math.min(ly, y);
                  const y2 = Math.max(ly, y);
                  if (y1 <= mwy && mwy <= y2) {
                     updateObj({ dist: Math.abs(mwx - x), player: entity });
                  } else {
                     updateObj({
                        dist: Math.min(Kb.CalcLength(mwx, mwy, x, y), Kb.CalcLength(mwx, mwy, lx, ly)),
                        player: entity
                     });
                  }
               } else {
                  // console.error('select-player: line not straight');
                  // console.log(entity.nick);
                  // console.log(entity.points);
                  // console.log(lx,ly)
                  // console.log(x,y)
                  // return;
               }
            }
         });

         selectPlayerBut.disable();
         KT.selectedPlayer = bestObj.player;

         document.removeEventListener('click', onClick);
      }
      return true;
   },
   () => {
      KT.selectedPlayer = null;
      return true;
   },
   (e) => e.ctrlKey && e.key === 's'
);




// player/bot count
const playerCountElm = ezgui.querySelector('#ezgui-player-count');
const ktBotCountElm = ezgui.querySelector('#ezgui-kt-bot-count');
setInterval(() => {
   let playerCount = 0, botCount = 0;
   Object.values(KT.entities).forEach(entity => {
      if (entity instanceof EntityPlayer) {
         playerCount += 1;
         if (entity.nick.startsWith('KT_')) {
            botCount += 1;
         }
      }
   });
   playerCountElm.innerText = `player count: ${playerCount}`;
   ktBotCountElm.innerText = `KT bot count: ${botCount}`;
}, 500);





// eval expression

const infoText = document.createElement('span');
infoHacks.appendChild(infoText);
infoText.style.display = 'block';
infoText.innerText = 'variable name:';

const inputBox = document.createElement('input');
infoHacks.appendChild(inputBox);
inputBox.id = 'varwatch';
inputBox.style.display = 'block';
inputBox.style.width = '100%';

const valueText = document.createElement('span');
infoHacks.appendChild(valueText);
infoText.style.display = 'block';

setInterval(() => {
   try {
      valueText.innerText = eval(inputBox.value);
   } catch (e) {
      valueText.innerText = undefined;
   }
}, 30);
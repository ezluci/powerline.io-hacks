class Network {
   constructor() {
      var cV = c0;
      var cq = {};
      var cY = cq;
      this.webSocket = null;
      this.pingStart = null;
      this.pingCheckInterval = 0x3e8;
      this.hasConnection = false;
      this.isConnecting = false;
      this.sentHello = false;
      this.remoteHost = null;
      this.connectRetry = 0;
      this.lastUpdateBool = false;
      this.roomNumber = 0;
      this.directed = false;
      this.roomID = 0;
      this.connectVar = null;
      this.lastPosTime = 0;
      this.captchaAnimation = false;
      this.pendingResizeSend = false;
      this.atbairohcvr = false;
      this._pk = 0;
      this.prekey = 0;
      this.__VERSION = 95;
      this.__CTRL_KEY = 471;//0x6f2;
      this.handshake_key = 0;
      this.opcode_cycle_s = 0x0;
      this.opcode_cycle_c = 0x0;
      this.handshakeCompleted = false;
      this.control_number = 0;
      this.using_legacy_protocol = true;
      this.kickedInactive = false;
      this.didSendBrowser = false;
      this.atbairohcv = null;
      
      // opcodes
      var cd = {};

      // client -> server
      cd.CS_PING = 0x0;
      cd.CS_PONG = 0x10;
      cd.HELLO = 0xbf;
      cd.ENTER_GAME = 0x3;
      cd.LEAVE_GAME = 0x4;
      cd.TALK = 0xc;
      cd.INPUT = 0x5;
      cd.INPUT_POINT = 0x6;
      cd.AREA_UPDATE = 0x7;
      cd.BIG_PICTURE = 0xb;
      cd.CAPTCHA_RESPONSE_INGAME = 0xf;
      cd.CAPTCHA_RESPONSE_LOGIN = 0xe;

      // server -> client
      cd.KICK_INACTIVE = 0xd;
      cd.SC_PONG = 0x1;
      cd.OPCODE_SPECTATOR_MODE = 0xad;
      cd.ENTITY_INFO = 0xa3;
      cd.CONFIG = 0xa7;
      cd.EVENTS = 0xa4;
      cd.REQUEST_CAPTCHA_LOGIN = 0xa8;
      cd.SC_PING = 0x0;
      cd.LEADERBOARD = 0xa5;
      cd.ENTERED_GAME = 0xa1;
      cd.CAPTCHA_OK = 0xaa;
      cd.REQUEST_CAPTCHA_INGAME = 0xa9;
      cd.MINIMAP = 0xa6;
      cd.UPGRADE_PROTOCOL = 0xac;

      this.OPCODES = cd;
      this.EVENT_DID_KILL = 0x1;
      this.EVENT_WAS_KILLED = 0x2;
      this.ENTITY_ITEM = 0x4;
      this.ENTITY_PLAYER = 0x5;
      this.ENTITY_COLLIDER = 0x1;
      this.SUB_ENTITY_ITEM_FOOD = 0x0;
      this.SUB_ENTITY_ITEM_ENERGY = 0x1;
      this.SUB_ENTITY_ITEM_TRI_PLUS = 0x2;
      this.SUB_ENTITY_ITEM_TRI_MINUS = 0x3;
      this.MASTER_URL = "master.powerline.io";
      var cO = this;
      ((async () => {
         var cD = cV;
         const cI = await iR.load(),
         cl = await cI.get();
         console.log(cl);
         cl.visitorId = '00000000000000000000000000000000';
         cO.atbairohcv = cl.visitorId, cO.atbairohcvr = !0x0, cO.isConnecting && !cO.hasConnection && cO.getServerAndConnect();
      })());
   }
   
   tryConnect() {
      var cV = iF,
      cq = {
         'Gntgc': function(cY, cd, cO) {
            var lU = a0C;
            return "NRZRZ" === "NRZRZ" ? cY(cd, cO) : (KO[0x1] = Kv[0x1].replace(KX, cd), Kg[0x3] = (KV[0x3] || i3[0x4] || KD[0x5] || '').replace(Kt, Kd), '~=' === KP[0x2] && (Kw[0x3] = ' ' + cY[0x3] + ' '), KH.slice(0x0, 0x4));
         },
         'PGDSw': "tryConnect"
      };
      cq.Gntgc(slog, cq.PGDSw, 0x1), !KT.network.isConnecting && KT.network.getServerAndConnect();
   }
   
   getServerAndConnect() {
      if (slog("getServerAndConnect", 0x1), !this.atbairohcvr) {
         return void(KT.network.isConnecting = !0x0);
      }
      let cY, cd = null, cO = '';
      KT.network.isConnecting = !0x0;
      !window.inIframe() && (cY = window.parent.location.hash);
      (cY == "#google_vignette") && (cY = null);
      if (cY) {
         slog("Location hash: " + cY, 0x0), cd = cY.substring(0x1), cO = ';' + cd, KT.network.directed = 1;
      } else {
         if (KT.queryString.ip && KT.sdm) {
            const cl = KT.queryString.ip.replace("%3A", ':');
            return KT.network.remoteHost = cl, slog(">>> IP? Remote Host: " + KT.network.remoteHost, 0x0), void KT.network.connect();
         }
         if (KT.queryString["host"] && KT.sdm) return KT.network.remoteHost = KT.queryString["host"], slog(">>> Host? Remote Host: " + KT.network.remoteHost, 0x0), void KT.network.connect();
      }
      let cD = KT.countryCode;
      KT.queryString.cc && KT.sdm && (cD = KT.queryString.cc)
      
      // modified
      if (cD) {
         KT.isSecure = 0;
         KT.network.roomID = '2cfo';
         KT.network.roomNumber = 44444 - 8080;
         KT.network.remoteHost = 'localhost';
         KT.network.connect();
      } else KT.network.connectVar = setTimeout(KT.network.getServerAndConnect, 0xc8);
      
      // original
      /*if (cD) {
      var cI = '';
      KT.isSecure && (cI = 's'), $.ajax({
      'url': 'http' + cI + '://' + KT.network.MASTER_URL,
      'type': 'PUT',
      'success': function(cf) {
      if (cf == '0') return $('#topGui').hide(), $("#topGuiConnecting").hide(), void $("#roomFailed").show();
      
      var cj = cf.split('!');
      KT.network.roomID = 0x0;
      (cj.length > 0x1) && (KT.network.roomID = cj[0x1]);
      var cN = cj[0x0];
      var cE = cN.split('/');
      KT.network.roomNumber = 0x0;
      var cM = cN;
      (cE.length > 1) && (KT.network.roomNumber = cE[0x1], cM = cE[0x0]);
      KT.network.remoteHost = cM;
      KT.network.connect();
      },
      'error': function() {
      if ("BFCSW" !== "BFCSW") return !!KY("inverted") || !KU("none") && void 0x0;
      else {
      KT.network.connectVar = setTimeout(KT.network.getServerAndConnect, 0x3e8);
      }
      },
      'dataType': 'text',
      'contentType': 'text/plain',
      'method': 'PUT',
      'cache': !0x1,
      'crossDomain': !0x0,
      'data': cD + cO
      });
      } else KT.network.connectVar = setTimeout(KT.network.getServerAndConnect, 0xc8);*/
   }
   
   stopConnecting() {
      var cV = iF;
      KT.network.isConnecting = !0x1, KT.network.connectVar && {
         'qRjzj': function(cq, cY) {
            return cq(cY);
         }
      } .qRjzj(clearTimeout, KT.network.connectVar), KT.network.connectVar = null, KT.network.webSocket && KT.network.webSocket.close();
   }
   
   connect() {
      var cq = {
         'XTrEm': "host",
         'KwbEF': function(cN, cE) {
            return cN + cE;
         },
         'FigHr': function(cN, cE) {
            return cN + cE;
         },
         'LbkUY': function(cN, cE) {
            return cN + cE;
         },
         'iDIlE': function(cN, cE) {
            return cN + cE;
         },
         'cgSuI': function(cN, cE) {
            return cN + cE;
         },
         'oTRjn': function(cN, cE) {
            return cN + cE;
         },
         'zytIN': "wss://",
         'Oarms': function(cN, cE) {
            return cN > cE;
         },
         'MfWwE': function(cN, cE) {
            return cN + cE;
         },
         'xZLfB': function(cN, cE) {
            return cN(cE);
         },
         'IrqoQ': function(cN, cE) {
            return cN + cE;
         },
         'nAMqG': "ws:",
         'tJVPa': function(cN, cE) {
            return cN + cE;
         },
         'EqPgT': function(cN, cE) {
            return cN(cE);
         },
         'WzjyY': "arraybuffer",
         'txABl': function(cN, cE, cS) {
            return cN(cE, cS);
         },
         'ZtOfY': "connect",
         'YFbrk': function(cN, cE, cS) {
            return cN(cE, cS);
         },
         'BKUuO': "Connecting to ",
         'QgKdz': "...",
         'UZjiT': function(cN, cE) {
            return cN + cE;
         },
         'VLqQL': function(cN, cE) {
            return cN + cE;
         },
         'YkinR': function(cN, cE) {
            return cN * cE;
         },
         'tozIL': function(cN, cE) {
            return cN - cE;
         },
         'EnGea': function(cN, cE, cS) {
            return cN(cE, cS);
         },
         'vvtpV': function(cN, cE) {
            return cN + cE;
         },
         'sTPFP': "Error connecting to ",
         'XeRnQ': function(cN, cE, cS) {
            return cN(cE, cS);
         },
         'YLwtV': function(cN, cE) {
            return cN + cE;
         },
         'NQdvH': "ws://"
      };

      slog(cq.ZtOfY, 0x1);
      var cj = 'ws://' + KT.network.remoteHost;
      if (KT.isSecure) {
         var cp = KT.network.remoteHost;
         var cJ = cp.split(':');
         var cI = cJ[0x0];
         var cl = cJ[0x1];
         var ch = cI.split('.');
         var cf;
         cf = parseInt(cl) + 0x3e8;
         if (KT.network.roomNumber > 0x0) {
            cf = parseInt(KT.network.roomNumber) + 0x1f90 + 0x3e8;
         }
         cj = KT.queryString['host'] ? ('wss://' + KT.network.remoteHost) : cq.KwbEF(cq.FigHr(cq.KwbEF(cq.LbkUY(cq.iDIlE(cq.LbkUY(cq.LbkUY(cq.cgSuI(cq.oTRjn(cq.FigHr(cq.iDIlE(cq.zytIN, ch[0x0]), '-'), ch[0x1]), '-'), ch[0x2]), '-'), ch[0x3]), '.'), KT.gameName), ':'), cf);
      } else {
         if (KT.network.roomNumber > 0x0) {
            var cA = cj.split(':');
            cj = 'ws:' + cA[0x1] + ':' + (parseInt(KT.network.roomNumber) + 0x1f90);
         }
      }
      var cM = KT.queryString.ep;
      if (cM) {
         cj += '/' + cM;
      }
      cq.YFbrk(slog, cq.IrqoQ(cq.LbkUY(cq.BKUuO, cj), cq.QgKdz), 0x0);
      try {
         // this._pv = Math.floor(Math.random() * 1980189) + 0x6062b;
         // this._pv = 396795;
         this._pv = 2166078;
         this.webSocket = new WebSocket(cj, this._pv.toString());
      } catch (cN) {
         cq.EnGea(slog, cq.oTRjn(cq.vvtpV(cq.sTPFP, cj), cq.QgKdz), 0x0);
         cq.XeRnQ(slog, cN, 0x0);
         KT.network.connectVar = cq.EnGea(setTimeout, KT.network.getServerAndConnect, 0x3e8);
         return;
      }
      this.webSocket.binaryType = 'arraybuffer';
      this.webSocket.onopen = KT.network.onSocketOpen;
      this.webSocket.onclose = KT.network.onSocketClose;
      this.webSocket.onmessage = KT.network.onSocketMessage;
      this.webSocket.onerror = KT.network.onError;
   }
   
   disconnect() {
      var cV = iF;
      KT.network.isConnecting = !0x1, KT.network.directed && (!KT.network.inIframe() && (window.location.hash = ''), KT.network.directed = !0x1), KT.network.roomID = 0x0, KT.network.webSocket && KT.network.webSocket.close();
   }
   
   onSocketOpen(cV) {
      slog("Socket Open", 0x0);
      KT.network.isConnecting = 0;
      if (!window.didSendLoadingTime) {
         var cD = (+new Date()) - window.startTime;
         window.stats && slog("ltct " + cD, 0), window.mixpanel.track("Load Time To Play", {
            'deltatime': cD,
            'domain': window.location.hostname
         }), window.didSendLoadingTime = 1;
      }
      KT.network.connectVar && clearTimeout(KT.network.connectVar);
      slog("Connected!", 0);
      KT.network.connectRetry = 0;
      KT.network.hasConnection = 1;
      KT.network.directed = 0;
      KT.resources.loaded && KT.network.hello();
   }
   
   onSocketClose(cV) {
      for (var cq = iF, cY = {
         'bncgP': "2|0|4|1|3",
         'usEeR': function(cD, cI) {
            return cD(cI);
         },
         'ZYpXS': "#basePanel",
         'xolxK': function(cD, cI, cl) {
            return cD(cI, cl);
         },
         'eMSIY': "Socket closed!",
         'LQlsG': function(cD, cI) {
            return cD(cI);
         },
         'XtMOW': "#topGui",
         'WFzFk': function(cD, cI) {
            return cD(cI);
         },
         'XoCUe': "#statsPanel"
      }, cd = cY.bncgP.split('|'), cO = 0x0;;) {
         switch (cd[cO++]) {
            case '0':
            KT.network.connectionClosed();
            continue;
            case '1':
            cY.usEeR($, cY.ZYpXS).show();
            continue;
            case '2':
            cY.xolxK(slog, cY.eMSIY, 0x0);
            continue;
            case '3':
            cY.LQlsG($, cY.XtMOW).hide();
            continue;
            case '4':
            cY.WFzFk($, cY.XoCUe).hide();
            continue;
         }
         break;
      }
   }
   
   onSocketMessage(cV) {
      var cq = iF;
      KT.network.processMessage(cV.data);
   }
   
   onError(cV) {
      for (var cq = iF, cY = {
         'fYIHl': "1|5|2|3|0|4",
         'rkoFv': function(cD, cI, cl) {
            return cD(cI, cl);
         },
         'hUhJn': "socket error"
      }, cd = cY.fYIHl.split('|'), cO = 0x0;;) {
         switch (cd[cO++]) {
            case '0':
            KT.network.handshakeCompleted = !0x1;
            continue;
            case '1':
            cY.rkoFv(slog, cY.hUhJn, 0x0);
            continue;
            case '2':
            KT.network.hasConnection = !0x1;
            continue;
            case '3':
            KT.network.didSendBrowser = !0x1;
            continue;
            case '4':
            KT.receivedConfig = !0x1;
            continue;
            case '5':
            console.log(cV);
            continue;
         }
         break;
      }
   }
   
   hello() {
      KT.network.sendHello(), KT.network.sentHello = 1;
   }
   
   CreateEntity(cV, cq) {
      var cd = {
         'etEXt': function(cD, cI) {
            return cD == cI;
         },
         'hrDoy': function(cD, cI, cl) {
            return cD(cI, cl);
         },
         'QSMpC': function(cD, cI) {
            return cD + cI;
         },
         'YyGPK': function(cD, cI) {
            return cD + cI;
         },
         'bZCIi': "ERROR: Creating unknown entity type: ",
         'NekvH': " Subtype: ",
         'OJrfE': "Invalid Entity"
      },
      cO = null;
      switch (cV) {
         case this.ENTITY_PLAYER:
         cO = new EntityPlayer();
         break;
         case this.ENTITY_ITEM:
         cd.etEXt(cq, this.SUB_ENTITY_ITEM_FOOD) && (cO = new EntityFood());
         break;
         default:
         cd.hrDoy(slog, cd.QSMpC(cd.YyGPK(cd.QSMpC(cd.bZCIi, cV), cd.NekvH), cq), 0x0), cd.hrDoy(assert, !0x1, cd.OJrfE);
      }
      return cO;
   }
   
   processEvents(cV) {
      for (var cq = iF, cY = {
         'BiIVx': function(cl, cJ, cf) {
            return cl(cJ, cf);
         },
         'cPhxq': function(cl, cJ) {
            return cl + cJ;
         },
         'TFXvA': "ERROR: Unknown event code"
      }, cd = 0x1;;) {
         var cO = cV.getUint8(cd, !0x0);
         if (cd += 0x1, cO == 0x0) break;
         switch (cO) {
            case this.EVENT_DID_KILL:
            cV.getUint16(cd, !0x0), cd += 0x2;
            var cD = (cI = Kb.getString(cV, cd)).nick;
            cd = cI.offset, KT.hud.addMessage('Killed ', KT.HUD_TOP, Kb.getPlayerName(cD)), KT.killStreak++, KT.camera.shake(0x7);
            break;
            case this.EVENT_WAS_KILLED:
            var cI;
            cV.getUint16(cd, !0x0),
            cd += 0x2,
            cD = (cI = Kb.getString(cV, cd)).nick,
            cd = cI.offset,
            KT.hud.addMessage("Killed by ", KT.HUD_BOTTOM, Kb.getPlayerName(cD)),
            KT.statLastKiller = Kb.getPlayerName(cD),
            cY.BiIVx(slog, cY.cPhxq("Killed by ", cD), 0x0);
            break;
            default:
            cY.BiIVx(slog, cY.TFXvA, 0x0);
         }
      }
   }
   
   processLeaderboard(cV) {
      var i = 1;
      var leaderboard = [];
      var cI = false;
      while (true) {
         const id = cV.getUint16(i, true);
         i += 2
         if (id == 0) break;
         cI = true;
         const score = cV.getUint32(i, true);
         i += 4;
         var cp = Kb.getString(cV, i);
         const nick = cp.nick;
         i = cp.offset;
         
         var cA = { nick, score, id };
         leaderboard.push(cA);
      }
      if (cI) {
         KT.hud.refreshLeaderboard(leaderboard);
      }
      
      return i;
   }
   
   updateEntities(cV) {
      for (var cq = iF, cY = {
         'beHZU': function(cU, cG) {
            return cU == cG;
         },
         'RpwdC': function(cU, cG, cW) {
            return cU(cG, cW);
         },
         'TVIoX': function(cU, cG) {
            return cU + cG;
         },
         'iddzA': "ERROR: entity with id: ",
         'prwmd': " not found",
         'vhasr': function(cU, cG) {
            return cU + cG;
         },
         'bsdiA': "Unable to create entity. Entity Type is: ",
         'snyMK': "Suicided",
         'AcNnE': function(cU, cG, cW) {
            return cU(cG, cW);
         },
         'omEOS': function(cU, cG) {
            return cU + cG;
         },
         'ulLzV': "ERROR: Entity does not exist: ",
         'DQgNC': "ERROR: Invalid entity flag"
      }, cd = 0x1;;) {
         var cO = cV.getUint16(cd, !0x0);
         if (cd += 0x2, cO == 0x0) {
            if (cd != cV.byteLength && (KT.kingID = cV.getUint16(cd, !0x0), cd += 0x2, KT.kingID > 0x0)) {
               var cl = cV.getFloat32(cd, !0x0);
               cd += 0x4;
               var cJ = -cV.getFloat32(cd, !0x0);
               cd += 0x4;
               KT.kingPositionOrig.x = KT.kingPosition.x;
               KT.kingPositionOrig.y = KT.kingPosition.y;
               KT.kingPositionDst.x = cl * KT.GAME_SCALE;
               KT.kingPositionDst.y = cJ * KT.GAME_SCALE;
               KT.kingUpdateTime = KT.now;
            }
            break;
         }
         var cf = cV.getUint8(cd, !0x0);
         switch (cd += 0x1, cf) {
            case 0x0:
            (cu = KT.entities[cO]) ? cd = cu.updateNetwork(cV, cd, !0x1): cY.RpwdC(slog, cY.TVIoX(cY.TVIoX(cY.iddzA, cO), cY.prwmd), 0x0);
            break;
            case 0x1:
            var cp = cV.getUint8(cd, !0x0);
            cd += 0x1;
            var ch = cV.getUint8(cd, !0x0);
            cd += 0x1;
            var cA = Kb.getString(cV, cd),
            cM = cA.nick;
            if (cd = cA.offset, cu = KT.network.CreateEntity(cp, ch)) {
               cM = Kb.getPlayerName(cM);
               cu.nick = cM;
               if (cu instanceof EntityPlayer) {
                  if (cu.nick.startsWith('KT_')) {
                     cu.highlight = true;
                  }
               }
               cu.id = cO;
               KT.entities[cO] = cu;
               cd = cu.updateNetwork(cV, cd, !0x0);
            } else cY.RpwdC(slog, cY.vhasr(cY.bsdiA, cp), 0x0);
            break;
            case 0x2:
            var cw = cV.getUint16(cd, !0x0);
            cd += 0x2;
            var cP = cV.getUint8(cd);
            cd += 0x1;
            var cu = KT.entities[cO];
            if (cu) {
               cu.killReason = cP;
               cu.killedByID = cw;
               var cZ = cu === KT.localPlayer;
               cd = cu.deleteNetwork(cV, cd);
               if (cZ && KT.isInGame) {
                  KT.isInGame = !0x1;
                  KT.localPlayer = null;
                  window.wasKilled();
                  cY.RpwdC(slog, cY.snyMK, 0x0);
                  KT.showBigPicture || window.fadeinUI();
               }
            } else cY.AcNnE(slog, cY.omEOS(cY.ulLzV, cO), 0x0), window.location.href = window.location.href;
            break;
            default:
            cY.AcNnE(slog, cY.DQgNC, 0x0);
         }
      }
   }
   
   processConfig(cV) {
      var cq = iF,
      cY = {
         'wGlId': function(cj, cN) {
            return cj ^ cN;
         },
         'Xiwap': function(cj, cN, cE) {
            return cj(cN, cE);
         },
         'ouWDZ': "processConfig()",
         'clJLj': "7|2|4|6|11|5|3|0|9|1|8|10|12",
         'WYgVo': function(cj, cN) {
            return cj % cN;
         },
         'jnnkJ': function(cj, cN) {
            return cj + cN;
         },
         'jZNxw': function(cj, cN) {
            var lm = a0C;
            return "Rscqp" === "Rscqp" ? cj + cN : cf ^ KU;
         },
         'eVaeJ': function(cj, cN) {
            return cj | cN;
         },
         'LZqbR': function(cj, cN) {
            return cj << cN;
         },
         'kiGzr': function(cj, cN, cE) {
            return cj(cN, cE);
         },
         'PrTcm': "Decoded protocol_key:",
         'TtTgA': function(cj, cN) {
            return cj + cN;
         },
         'JwyiP': function(cj, cN) {
            return cj + cN;
         },
         'mMyZi': "Opcode cycle:",
         'fCojB': function(cj, cN, cE) {
            return cj(cN, cE);
         },
         'vcWOF': "Control number:",
         'FNlMy': function(cj, cN, cE, cS) {
            return cj(cN, cE, cS);
         },
         'JgHVv': function(cj, cN) {
            return cj * cN;
         },
         'ttooh': function(cj, cN, cE, cS) {
            return cj(cN, cE, cS);
         },
         'yksDH': function(cj, cN) {
            return cj * cN;
         },
         'YzhLf': function(cj, cN, cE, cS) {
            return cj(cN, cE, cS);
         },
         'hmthz': function(cj, cN, cE, cS) {
            return cj(cN, cE, cS);
         },
         'UcCbx': function(cj, cN, cE, cS) {
            return cj(cN, cE, cS);
         },
         'nLnsT': function(cj, cN) {
            return cj == cN;
         },
         'ejbWM': function(cj, cN, cE, cS) {
            return cj(cN, cE, cS);
         }
      };
      cY.Xiwap(slog, cY.ouWDZ, 0x0);
      var cd = 0x1,
      cO = new ArrayBuffer(0x4),
      cD = new Int32Array(cO),
      cI = new Float32Array(cO);
      
      function cl(cj, cN, pk) {
         var raw = cj.getUint32(cN, !0x0);
         cD[0x0] = raw ^ pk;
         return cI[0x0];
      }
      // cV.setUint32(cd, 1065353216, 1);
      if (!KT.network.handshakeCompleted) {
         var cA = cV.getUint32(cd, !0x0);
         cd += 0x4;
         var ch = (KT.network.prekey << 0x10) | KT.network.handshake_key;
         ch ^= 0x98733823;
         KT.network._pk = cA ^ ch;
         cY.kiGzr(slog, cY.jZNxw(cY.PrTcm, KT.network._pk), 0x2);
         KT.network.opcode_cycle_s = (KT.network._pk + KT.network.__VERSION) % 0x100;
         KT.network.opcode_cycle_c = (KT.network._pk + KT.network.opcode_cycle_s) % 0x100;
         cY.Xiwap(slog, cY.TtTgA(cY.JwyiP(cY.jZNxw(cY.mMyZi, KT.network.opcode_cycle_s), ','), KT.network.opcode_cycle_c), 0x2);
         var cp = cV.getUint32(cd, !0x0);
         KT.network.control_number = (cp ^ (KT.network._pk + KT.network.handshake_key));
         cd += 0x4;
         cY.fCojB(slog, cY.jnnkJ(cY.vcWOF, KT.network.control_number), 0x2);
      }
      KT.network.handshakeCompleted = 1;
      var cM = cY.FNlMy(cl, cV, cd, KT.network._pk);
      cd += 0x4;
      KT.arenaWidth = cY.JgHVv(cM, KT.GAME_SCALE);
      KT.arenaHeight = cY.JgHVv(cM, KT.GAME_SCALE);
      KT.defaultZoom = cY.ttooh(cl, cV, cd, KT.network._pk);
      cd += 0x4;
      KT.minZoom = cY.FNlMy(cl, cV, cd, KT.network._pk);
      cd += 0x4;
      KT.minZoomScore = cY.yksDH(cY.YzhLf(cl, cV, cd, KT.network._pk), KT.GAME_SCALE);
      cd += 0x4;
      KT.startLength = cY.yksDH(cY.YzhLf(cl, cV, cd, KT.network._pk), KT.GAME_SCALE);
      cd += 0x4;
      cd += 0x4;
      KT.globalWebLag = cl(cV, cd, KT.network._pk);
      cd += 0x4;
      KT.globalMobileLag = cY.UcCbx(cl, cV, cd, KT.network._pk);
      cd += 0x4;
      cY.nLnsT(KT.globalWebLag, 0x0) ? KT.antiLagEnabled = !0x1 : KT.antiLagEnabled = !0x0;
      KT.lagAddRender = cY.ttooh(cl, cV, cd, KT.network._pk);
      cd += 0x4;
      KT.talkEnabled = cY.ejbWM(cl, cV, cd, KT.network._pk);
      cd += 0x4;
      KT.receivedConfig = !0x0;
      KT.network.using_legacy_protocol = !0x1;
      window.displayNickInput();
      KT.network.pendingResizeSend && (KT.network.pendingResizeSend = !0x1, KT.network.sendResize());
   }
   
   processMessage(packet) {
      var cY = {
         'NNmuR': "CAPTCHA_OK",
         'Jqeig': "KICK_INACTIVE",
         'PYkFV': "UPGRADE_PROTOCOL",
         'nxMDu': function(cH, cm) {
            return cH + cm;
         },
         'bZbYB': function(cH, cm) {
            return cH + cm;
         },
         'vUPIv': "?v=",
         'yynaH': function(cH) {
            return cH();
         },
         'gHGXm': "pk: ",
         'xmgcc': function(cH, cm, cr) {
            return cH(cm, cr);
         },
         'jOdSa': function(cH, cm) {
            return cH + cm;
         },
         'flFtK': function(cH, cm, cr) {
            return cH(cm, cr);
         }
      };
      
      
      var cI = new DataView(packet);
      let opcode = cI.getUint8(0);
      if (this.handshakeCompleted) {
         opcode ^= this.opcode_cycle_c;
      }
      
      
      if (opcode == this.OPCODES.SC_PONG) {
         if (KT.statsVisible) {
            // var cJ = +new Date();    cJ - KT.network.pingStart,
            setTimeout(() => {
               if (KT.network.hasConnection) {
                  KT.network.ping();
               }
            }, KT.network.pingCheckInterval);
         }
      } else if (opcode == this.OPCODES.SC_PING) {
         var ch = 1;
         KT.myPing = cI.getUint16(ch, true);
         ch += 2;
         KT.statsVisible && KT.statsLAG && KT.myPing > 0 && KT.myPing < 0x2710 && KT.statsLAG.updateLag(KT.myPing);
         KT.network.pong();
      } else if (opcode == this.OPCODES.CONFIG) {
         KT.network.processConfig(cI);
      } else if (opcode == this.OPCODES.ENTERED_GAME) {
         slog('Did Enter Game!', 0);
         window.didFirstClick();
         ch = 1;
         var cj = cI.getUint32(ch, true);
         ch += 4;
         KT.localPlayerID = cj;
         KT.isInGame = true;
         KT.statBeginTime = +new Date();
         window.hideUI();
      } else if (opcode == this.OPCODES.ENTITY_INFO) {
         var cP = +new Date();
         var cS = cP - KT.network.lastPosTime;
         cS > 0 && cS < 0xea60 && KT.statsEnts && KT.statsEnts.updateEnts(cS);
         window.updateTitle();
         KT.network.updateEntities(cI);
         KT.network.lastPosTime = cP;
      } else if (opcode == this.OPCODES.EVENTS) {
         KT.network.processEvents(cI);
      } else if (opcode == this.OPCODES.LEADERBOARD) {
         if (ch = KT.network.processLeaderboard(cI), cj = cI.getUint16(ch, !0x0), ch += 0x2, cj > 0) {
            var cg = cI.getUint32(ch, !0x0);
            ch += 0x4;
            var cZ = cI.getUint16(ch, !0x0);
            ch += 0x2;
            KT.hud.updateRank(cZ, cg);
            (KT.statTopPosition == 0x0 || KT.statTopPosition > cZ) && (KT.statTopPosition = cZ);
            ((KT.statLength == 0x0) || KT.statLength < cg) && (KT.statLength = cg);
         } else {
            KT.hud.updateRank(0, 0);
         }
      } else if (opcode == this.OPCODES.REQUEST_CAPTCHA_LOGIN || opcode == this.OPCODES.REQUEST_CAPTCHA_INGAME) {
         $("#statsPanel").hide();
         $("#basePanel").show();
         $("#topGui").hide();
         $("#topGuiConnecting").hide();
         $("#entryturn").show();
         $("#entryturn").html('');
         turnstile.render("#entryturn", {
            'sitekey': "0x4AAAAAAA3uTRWohU0f4ROb",
            'callback': function(cm) {
               var co;
               if (opcode == KT.network.OPCODES.REQUEST_CAPTCHA_LOGIN) {
                  co = KT.network.OPCODES.CAPTCHA_RESPONSE_LOGIN;
               } else if (opcode == KT.network.OPCODES.REQUEST_CAPTCHA_INGAME) {
                  co = KT.network.OPCODES.CAPTCHA_RESPONSE_INGAME ^ KT.network.opcode_cycle_s;
               }
               KT.network.sendCaptcha(co, cm);
               KT.network.captchaAnimation = true;
               setTimeout(function() {
                  $("#entryturn").hide(), $("#entryturn").html('');
               }, 0x3e8);
            }
         });
      } else if (opcode == this.OPCODES.CAPTCHA_OK) {
         slog(cY.NNmuR, 0x0), window.displayNickInput(), KT.network.captchaAnimation = !0x1;
      } else if (opcode == this.OPCODES.KICK_INACTIVE) {
         slog(cY.Jqeig, 0x0), KT.network.kickedInactive = !0x0;
      } else if (opcode == this.OPCODES.UPGRADE_PROTOCOL) {
         console.log('upgrade protocol???!! no');
         //slog(cY.PYkFV, 0x0), window.location.href = cY.nxMDu(cY.bZbYB(window.location.href.split('?')[0x0], cY.vUPIv), new Date().getTime());
      } else if (opcode == this.OPCODES.OPCODE_SPECTATOR_MODE) {
         cY.yynaH(hideUI);
         KT.camera.x = 0x0;
         KT.camera.y = 0x0;
         KT.camera.zoom = 0.3599;
         KT.isInGame = !0x1;
         KT.showBigPicture = !0x0;
         KT.firstClick = !0x0;
      } else {
         slog(cY.jOdSa("Invalid Opcode from server: ", opcode.toString(0x10).toUpperCase()), 0x0);
         opcode ^= this.opcode_cycle_c;
         cY.flFtK(slog, cY.bZbYB(cY.bZbYB(cY.nxMDu('Xored Opcode: ', opcode.toString(0x10).toUpperCase()), " cycle: "), this.handshakeCompleted), 0x0);
         slog(cY.nxMDu(cY.gHGXm, this._pk), 0x0);
         cY.xmgcc(slog, cY.nxMDu("opcode_cycle_c: ", this.opcode_cycle_c), 0x0);
      }
   }
   
   connectionClosed() {
      for (var cV = iF, cq = {
         'lPKpE': "8|13|2|0|5|6|11|7|3|9|1|4|14|12|10",
         'MFHbp': "disabled",
         'RKZzZ': function(cI, cl) {
            return cI(cl);
         },
         'BhFQf': "#copyLink",
         'beJuu': "#topGui",
         'jMRgz': function(cI, cl) {
            var ly = a0C;
            if ("QNgZV" !== "ynvdH") return cI(cl);
            else {
               var cf = this.ownerDocument || this.document || this,
               cp = Ka.documentMode ? this : cf,
               ch = KF.get(cp, KO) - 0x1;
               ch ? Kv.set(cp, KX, ch) : (cl.documentMode ? this.removeEventListener(Kg, KV) : cf.removeEventListener(i3, KD, !0x0), Kt.remove(cp, Kd));
            }
         },
         'LYxXw': ".btn-needs-server",
         'sjPhf': "Connecting to server (after connectionClosed)...",
         'VHyfb': function(cI, cl, cJ) {
            return cI(cl, cJ);
         },
         'LDuzX': function(cI, cl) {
            return cI + cl;
         },
         'SITGt': function(cI, cl) {
            return cI * cl;
         },
         'XAULI': "#topGuiConnecting",
         'LnCSo': "#roomTimeout",
         'XyNRU': function(cI, cl) {
            return cI > cl;
         }
      }, cY = cq.lPKpE.split('|'), cd = 0x0;;) {
         switch (cY[cd++]) {
            case '0':
            KT.network.didSendBrowser = !0x1;
            continue;
            case '1':
            cD.attr(cq.MFHbp, cq.MFHbp);
            continue;
            case '2':
            KT.network.hasConnection = !0x1;
            continue;
            case '3':
            cq.RKZzZ($, cq.BhFQf).fadeOut(0x12c);
            continue;
            case '4':
            var cO = KT.network.connectRetry;
            continue;
            case '5':
            KT.network.handshakeCompleted = !0x1;
            continue;
            case '6':
            KT.receivedConfig = !0x1;
            continue;
            case '7':
            cq.RKZzZ($, cq.beJuu).hide();
            continue;
            case '8':
            KT.app.gameCleanup();
            continue;
            case '9':
            var cD = cq.jMRgz($, cq.LYxXw);
            continue;
            case '10':
            KT.network.connectRetry++;
            continue;
            case '11':
            window.fadeinUI(-0x1);
            continue;
            case '12':
            KT.network.kickedInactive ? cq.jMRgz($, cq.LnCSo).show() : KT.focus && (console.log(cq.sjPhf), KT.network.connectVar = cq.VHyfb(setTimeout, KT.network.getServerAndConnect, cq.LDuzX(0x3e8, cq.SITGt(cO, 0x3e8))), cq.jMRgz($, cq.XAULI).show());
            continue;
            case '13':
            KT.network.sentHello = !0x1;
            continue;
            case '14':
            cq.XyNRU(cO, 0x5) && (cO = 0x5);
            continue;
         }
         break;
      }
   }
   
   sendSingleByte(cV) {
      var cY = new ArrayBuffer(0x1);
      new DataView(cY).setUint8(0x0, cV), KT.network.webSocket.send(cY);
   }
   
   sendNick(cV, cq) {
      const nicknameBytes = [];
      for (let i = 0; i < cV.length; ++i) {
         nicknameBytes.push(cV.charCodeAt(i));
      }
      // console.log('nickname: ' + cV + '... bytes sent: ' + nicknameBytes);
      KT.myName = cV;
      var cA = 0x4;
      KT.network.using_legacy_protocol && (cA = 0x0);
      var cJ = new ArrayBuffer(0x3 + cV.length * 0x2 + cA);
      var cf = new DataView(cJ);
      var ch = KT.network.OPCODES.ENTER_GAME ^ KT.network.opcode_cycle_s;
      cf.setUint8(0x0, ch);
      for (var cp = 0x0; cp < cV.length; ++cp) cf.setUint16(0x1 + cp * 0x2, cV.charCodeAt(cp), !0x0);
      if (!KT.network.using_legacy_protocol) {
         var cl = KT.network.control_number ^ KT.network._pk;
         cf.setUint32(0x1 + cV.length * 0x2, cl, !0x0);
      }
      KT.network.webSocket.send(cJ);
   }
   
   // it just sends dir and coord, nothing else
   sendTurnPoint(dir, coord) {
      var cN = new ArrayBuffer(1+1+4+4+1);
      var cl = new DataView(cN);
      var i = 0;
      cl.setUint8(i, KT.network.OPCODES.INPUT_POINT ^ KT.network.opcode_cycle_s);
      i += 1;
      
      if (KT.network.using_legacy_protocol) {
         cl.setUint8(i, dir);
         i += 1;
         cl.setFloat32(i, coord, true);
         i += 4;
      } else {
         cl.setUint8(i, dir ^ this._pk);
         i += 1;
         cl.setFloat32(i, coord, true);
         var cj = cl.getUint32(i, true);
         var cM = cj ^ this._pk;
         var ch = (cM << 16 | cM >>> 16) >>> 0;
         cl.setUint32(i, ch, true);
         i += 4;
         var cA = (dir + cM) ^ KT.network._pk;
         cl.setUint32(i, cA, true);
      }
      
      KT.network.webSocket.send(cN);
   }
   
   sendHello() {
      // Determine SDM
      const sdmFlag = KT.sdm ? 4 : 0;
      
      // Calculate buffer size (opcode + widths + handshake + version + control key + token + optional SDM)
      const baseSize = 1 + 2 + 2 + 2 + 2 + 2 + 16;
      const bufferSize = baseSize + (KT.sdm ? 4 : 0);
      
      const buffer = new ArrayBuffer(bufferSize);
      const view = new DataView(buffer);
      
      // 1) Opcode
      view.setUint8(0, KT.network.OPCODES.HELLO);
      
      // 2) Viewport dims
      const viewportWidth  = (KT.screenWidth  / KT.GAME_SCALE) * KT.visionPerc;
      const viewportHeight = (KT.screenHeight / KT.GAME_SCALE) * KT.visionPerc;
      view.setUint16(1, viewportWidth,  true);
      view.setUint16(3, viewportHeight, true);
      // console.log(`prekey_w: ${viewportWidth}`);
      // console.log(`prekey_h: ${viewportHeight}`);
      
      // 3) Prekey
      const rawProduct = viewportWidth * viewportHeight;
      const prekey = KT.network._pv % (rawProduct * 0x64);
      KT.network.prekey = prekey;
      // console.log(`prekey: ${prekey}`);
      
      // 4) Handshake key & version
      const handshakeKey = Math.floor((prekey % 0x283f8) % 0x10000);
      KT.network.handshake_key = handshakeKey;
      view.setUint16(5, handshakeKey, true);
      
      const version = KT.network.__VERSION;
      view.setUint16(7, version, true);
      
      // 5-8) Byte-swapping of handshake and version bytes
      const b5 = view.getUint8(5),
      b6 = view.getUint8(6),
      b7 = view.getUint8(7),
      b8 = view.getUint8(8);
      view.setUint8(5, b8);
      view.setUint8(6, b6);
      view.setUint8(7, b5);
      view.setUint8(8, b7);
      
      console.log(`Key is: ${handshakeKey}`);
      console.log(`Version is: ${version}`);
      console.log(`pv is: ${KT.network._pv}`);
      console.log(`__CTRL_KEY is: ${KT.network.__CTRL_KEY}`);
      
      var bytes = [ //133,6,    
         0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0 // this is the visitorId
      ];
      console.log(bytes);
      for (let i =11; i < 27; ++i) {
         view.setUint8(i, bytes[i-11]);
      }
      
      
      // 9) Control-key XOR version
      const controlXor = KT.network.__CTRL_KEY ^ version;
      view.setUint16(9, controlXor, true);
      console.log('CONTROLXOR IS ' + controlXor);

      console.log(new Uint8Array(buffer));
      
      // 10) Session token bytes
      /* const token = KT.network.atbairohcv;
      for (let i = 0; i < 16; i++) {
      const byteHex = token.substr(i * 2, 2);
      view.setUint8(11 + i, parseInt(byteHex, 16));
      }
      
      // 11) Optional SDM
      if (KT.sdm) {
      view.setUint32(11 + 16, KT.sdm, true);
      console.log(`setting sdm is: ${KT.sdm}`);
      }*/
      
      KT.network.webSocket.send(buffer);
   }
   
   /*
   sendHello() {
   var cV = iF,
   cq = {
   'jtUnv': function(cM, cj) {
   return cM + cj;
   },
   'wdNnl': function(cM, cj) {
   return cM + cj;
   },
   'DPviR': function(cM, cj) {
   var lz = a0C;
   if ("ncYrE" !== "ncYrE") {
   var cE = Ka.createElement("canvas");
   cE.width = this.width, cE.height = this.height;
   var cS = cE.getContext('2d');
   cS.globalAlpha = 0x1, cS.globalCompositeOperation = "copy", cS.drawImage(KF[0x3], 0x0, 0x0), cS.globalCompositeOperation = "lighter", ch > 0x0 && (cS.globalAlpha = Kv / 0xff, cS.drawImage(KX[0x0], 0x0, 0x0)), cj > 0x0 && (cS.globalAlpha = Kg / 0xff, cS.drawImage(cl[0x1], 0x0, 0x0)), i3 > 0x0 && (cS.globalAlpha = cA / 0xff, cS.drawImage(Kt[0x2], 0x0, 0x0));
   var cP = new cp();
   return cP.frameWithCanvas(cE, this._offsetX, this._offsetY), cP;
   } else return cM + cj;
   },
   'qpMmu': function(cM, cj) {
   return cM + cj;
   },
   'IJWBW': function(cM, cj) {
   return cM * cj;
   },
   'MUlzq': function(cM, cj) {
   return cM / cj;
   },
   'LawlB': function(cM, cj) {
   return cM * cj;
   },
   'SVQLS': function(cM, cj, cN) {
   return cM(cj, cN);
   },
   'rEvmq': function(cM, cj) {
   return cM + cj;
   },
   'zAwSU': "prekey_w: ",
   'jiGTu': function(cM, cj, cN) {
   return cM(cj, cN);
   },
   'YccxH': "prekey_h: ",
   'nWhbC': function(cM, cj) {
   return cM % cj;
   },
   'fsdjN': function(cM, cj) {
   var lo = a0C;
   if ("eHwbr" === "eHwbr") return cM * cj;
   else {
   var cE;
   return KM(KE, "input") && "text" === cI.type && (null == (cE = KN.getAttribute("type")) || "text" === cE.toLowerCase());
   }
   },
   'PdUqp': function(cM, cj, cN) {
   return cM(cj, cN);
   },
   'JFjuM': "prekey: ",
   'MKdGq': function(cM, cj) {
   return cM % cj;
   },
   'OvYDc': function(cM, cj) {
   return cM % cj;
   },
   'qAzEE': function(cM, cj) {
   return cM + cj;
   },
   'TvMON': "Key is: ",
   'eHKvr': function(cM, cj, cN) {
   var lR = a0C;
   if ("Vfxvz" !== "RyUba") return cM(cj, cN);
   else {
   var cS = Ka("div", KF, "padding:0 0 3px 3px;text-align:left;background:" + ch),
   cP = Kv("div", KX + "Text", "font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px;color:" + cj);
   cP.innerHTML = Kg.toUpperCase(), cS.appendChild(cP);
   var cX = cl("div", i3 + "Graph", "width:94px;height:30px;background:" + cA);
   cS.appendChild(cX);
   for (var cQ = 0x0; cQ < 0x5e; cQ++) cX.appendChild(Kt("span", '', "width:1px;height:30px;float:left;opacity:0.9;background:" + cp));
   return cS;
   }
   },
   'EwNGF': function(cM, cj) {
   return cM + cj;
   },
   'IbiHM': "Version is: ",
   'uVxeZ': function(cM, cj) {
   return cM + cj;
   },
   'BSqgl': "pv is: ",
   'ZyyeM': function(cM, cj) {
   return cM + cj;
   },
   'AFAbr': "__CTRL_KEY is: ",
   'irfTc': function(cM, cj) {
   return cM ^ cj;
   },
   'WXabW': function(cM, cj) {
   return cM < cj;
   },
   'ERVrR': function(cM, cj) {
   return cM * cj;
   },
   'mXFcv': function(cM, cj) {
   var lF = a0C;
   if ("gRNlX" !== "KivtX") return cM + cj;
   else {
   var cE, cS = KX.pseudos[cj] || Kg.setFilters[cl.toLowerCase()] || i3.error("unsupported pseudo: " + cA);
   return cS[Kt] ? cS(cp) : cS.length > 0x1 ? (cE = [KP, Kw, '', cM], KH.setFilters.hasOwnProperty(KG.toLowerCase()) ? KZ(function(cP, cX) {
   var la = lF;
   for (var cQ, cZ = cS(cP, cE), cg = cZ.length; cg--;) cP[cQ = cS.call(cP, cZ[cg])] = !(cX[cQ] = cZ[cg]);
   }) : function(cP) {
   return cS(cP, 0x0, cE);
   }) : cS;
   }
   },
   'Xifob': function(cM, cj, cN) {
   return cM(cj, cN);
   },
   'LrHqq': "setting sdm is: "
   },
   cY = 0x0;
   KT.sdm && (cY = 0x4);
   var cd = new ArrayBuffer(cq.jtUnv(cq.jtUnv(cq.wdNnl(cq.DPviR(cq.DPviR(cq.qpMmu(0x1, 0x2), 0x2), 0x4), 0x10), cY), 0x2)),
   cO = new DataView(cd);
   cO.setUint8(0x0, KT.network.OPCODES.HELLO);
   var cD = cq.IJWBW(cq.MUlzq(KT.screenWidth, KT.GAME_SCALE), KT.visionPerc),
   cI = cq.LawlB(cq.MUlzq(KT.screenHeight, KT.GAME_SCALE), KT.visionPerc);
   cO.setUint16(0x1, cD, !0x0), cO.setUint16(0x3, cI, !0x0);
   var cl = cO.getUint16(0x1, !0x0),
   cJ = cO.getUint16(0x3, !0x0);
   cq.SVQLS(slog, cq.rEvmq(cq.zAwSU, cl), 0x2), cq.jiGTu(slog, cq.rEvmq(cq.YccxH, cJ), 0x2), KT.network.prekey = cq.nWhbC(KT.network._pv, cq.fsdjN(cq.IJWBW(cl, cJ), 0x64)), cq.PdUqp(slog, cq.wdNnl(cq.JFjuM, KT.network.prekey), 0x2), KT.network.handshake_key = Math.floor(cq.MKdGq(cq.OvYDc(KT.network.prekey, 0x283f8), 0x10000)), cO.setUint16(0x5, KT.network.handshake_key, !0x0), cO.setUint16(0x7, KT.network.__VERSION, !0x0);
   var cf = cO.getUint8(0x5),
   cp = cO.getUint8(0x6),
   ch = cO.getUint8(0x7),
   cA = cO.getUint8(0x8);
   cO.setUint8(0x5, cA), cO.setUint8(0x6, cp), cO.setUint8(0x7, cf), cO.setUint8(0x8, ch), cq.PdUqp(slog, cq.qAzEE(cq.TvMON, KT.network.handshake_key), 0x2), cq.eHKvr(slog, cq.EwNGF(cq.IbiHM, KT.network.__VERSION), 0x2), cq.eHKvr(slog, cq.uVxeZ(cq.BSqgl, KT.network._pv), 0x2), console.log(cq.ZyyeM(cq.AFAbr, KT.network.__CTRL_KEY)), cO.setUint16(0x9, cq.irfTc(KT.network.__CTRL_KEY, KT.network.__VERSION), !0x0);
   for (let cM = 0x0; cq.WXabW(cM, 0x10); cM++) {
   const cj = KT.network.atbairohcv.substr(cq.ERVrR(cM, 0x2), 0x2),
   cN = cq.SVQLS(parseInt, cj, 0x10);
   cO.setUint8(cq.uVxeZ(cq.ZyyeM(0x9, 0x2), cM), cN);
   }
   KT.sdm && (cO.setUint32(cq.wdNnl(cq.mXFcv(0x9, 0x2), 0x10), KT.sdm, !0x0), cq.Xifob(slog, cq.jtUnv(cq.LrHqq, KT.sdm), 0x0)), KT.network.webSocket.send(cd);
   }*/
   
   sendDirection(myDir) {
      // this function is ran only by 'turn' when KT.antiLagEnabled == false
      var cI = new ArrayBuffer(3);
      var cD = new DataView(cI);
      cD.setUint8(0, KT.network.OPCODES.INPUT ^ KT.network.opcode_cycle_s);
      cD.setUint8(1, (myDir ? myDir : KT.input.direction));
      cD.setUint8(2, (!KT.focus || KT.UIVisible));
      KT.network.webSocket.send(cI);
   }
   
   leave() {
      cd = new ArrayBuffer(0x1);
      new DataView(cd).setUint8(0x0, KT.network.OPCODES.LEAVE_GAME ^ KT.network.opcode_cycle_s);
      KT.network.webSocket.send(cd);
   }
   
   sendResize() {
      var cV = iF,
      cq = {};
      cq.VYCMy = "1|4|5|2|0|6|3|7|8", cq.kiWtH = function(cJ, cf) {
         return cJ ^ cf;
      }, cq.eSKna = function(cJ, cf) {
         return cJ * cf;
      }, cq.QalVV = function(cJ, cf) {
         return cJ * cf;
      }, cq.mJTZf = function(cJ, cf) {
         return cJ / cf;
      }, cq.cYAYX = function(cJ, cf) {
         return cJ + cf;
      }, cq.QWEap = function(cJ, cf) {
         return cJ + cf;
      };
      for (var cY = cq, cd = cY.VYCMy.split('|'), cO = 0x0;;) {
         switch (cd[cO++]) {
            case '0':
            var cD = 0x1;
            continue;
            case '1':
            if (!KT.receivedConfig) return void(KT.network.pendingResizeSend = !0x0);
            continue;
            case '2':
            cl.setUint8(0x0, cY.kiWtH(KT.network.OPCODES.AREA_UPDATE, KT.network.opcode_cycle_s));
            continue;
            case '3':
            cl.setUint16(0x1, cY.eSKna(cY.QalVV(cY.mJTZf(KT.screenWidth, KT.GAME_SCALE), KT.visionPerc), cD), !0x0);
            continue;
            case '4':
            var cI = new ArrayBuffer(cY.cYAYX(cY.QWEap(0x1, 0x2), 0x2));
            continue;
            case '5':
            var cl = new DataView(cI);
            continue;
            case '6':
            KT.highQuality || (cD = 0x2);
            continue;
            case '7':
            cl.setUint16(0x3, cY.eSKna(cY.QalVV(cY.mJTZf(KT.screenHeight, KT.GAME_SCALE), KT.visionPerc), cD), !0x0);
            continue;
            case '8':
            KT.network.webSocket.send(cI);
            continue;
         }
         break;
      }
   }
   
   bigPicture() {
      var cq = {};
      cq.lDwlT = function(cO, cD) {
         return cO ^ cD;
      };
      var cY = cq,
      cd = new ArrayBuffer(0x1);
      new DataView(cd).setUint8(0x0, cY.lDwlT(KT.network.OPCODES.BIG_PICTURE, KT.network.opcode_cycle_s)), KT.network.webSocket.send(cd);
   }
   
   sendCaptcha(cV, cq) {
      var cd = {};
      cd.wgnMt = "0|2|3|4|1", cd.kHgdg = function(cp, ch) {
         return cp + ch;
      }, cd.NuMlb = function(cp, ch) {
         return cp < ch;
      }, cd.FGNOH = function(cp, ch) {
         return cp + ch;
      };
      for (var cO = cd, cD = cO.wgnMt.split('|'), cI = 0x0;;) {
         switch (cD[cI++]) {
            case '0':
            var cl = new ArrayBuffer(cO.kHgdg(cq.length, 0x1));
            continue;
            case '1':
            KT.network.webSocket.send(cl);
            continue;
            case '2':
            var cJ = new DataView(cl);
            continue;
            case '3':
            cJ.setUint8(0x0, cV);
            continue;
            case '4':
            for (var cf = 0x0; cO.NuMlb(cf, cq.length); ++cf) cJ.setUint8(cO.FGNOH(0x1, cf), cq.charCodeAt(cf));
            continue;
         }
         break;
      }
   }
   
   sendTalk(cV) {
      var cI = new ArrayBuffer(0x2);
      var cl = new DataView(cI);
      cl.setUint8(0x0, KT.network.OPCODES.TALK ^ KT.network.opcode_cycle_s);
      cl.setUint8(0x1, cV);
      KT.network.webSocket.send(cI);
   }
   
   pong() {
      if (!KT.network.hasConnection) return;
      var cl = KT.network.didSendBrowser ? 0x0 : 0x1;
      var cI;
      cI = KT.focus && KT.isInGame ? new ArrayBuffer(2 + cl) : new ArrayBuffer(0x1);
      var cD = new DataView(cI);
      cD.setUint8(0x0, this.OPCODES.CS_PONG ^ this.opcode_cycle_s);
      if (KT.focus && KT.isInGame) {
         cD.setUint8(0x1, KT.averageFps);
         if (!KT.network.didSendBrowser) {
            cD.setUint8(2, KT.browser);
            KT.network.didSendBrowser = true;
         }
      }
      KT.network.webSocket.send(cI);
   }
   
   ping() {
      var cV = iF,
      cq = {};
      cq.uBQZI = "1|4|2|5|0|3", cq.TlAGU = function(cl, cJ) {
         return cl ^ cJ;
      };
      for (var cY = cq, cd = cY.uBQZI.split('|'), cO = 0x0;;) {
         switch (cd[cO++]) {
            case '0':
            KT.network.webSocket.send(cI);
            continue;
            case '1':
            if (!KT.network.hasConnection) return;
            continue;
            case '2':
            var cD = new DataView(cI);
            continue;
            case '3':
            KT.network.pingStart = +new Date();
            continue;
            case '4':
            var cI = new ArrayBuffer(0x1);
            continue;
            case '5':
            cD.setUint8(0x0, cY.TlAGU(this.OPCODES.CS_PING, this.opcode_cycle_s));
            continue;
         }
         break;
      }
   }
}
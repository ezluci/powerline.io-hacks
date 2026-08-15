




class c3 {
    constructor() {
        var Ji = dw;
        this.startX = 0xa, this.startY = 0x64, this.marginX = 0xa, this.labelWidth = 0xb4, this.renderedElement, this.visible = !0x1, this.hiddenOffsetX = -this.labelWidth - this.marginX, this.hideValue = 0x1, this.renderedElement = document.createElement("canvas");
        const cV = this.renderedElement.getContext('2d');
        this.preRender(cV, this.renderedElement);
    } ["fastHide"]() {
        var Jc = dw;
        this.hideValue = 0x1, this.visible = !0x1;
    } ["draw"](cV) {
        var JB = dw;
        if (this.visible ? this.hideValue += (0x0 - this.hideValue) / 0xa : this.hideValue += (0x1 - this.hideValue) / 0xa, !(this.hideValue > 0.99)) {
            if (cV.translate(this.startX + this.hiddenOffsetX * this.hideValue, this.startY), cV.scale(KT.zoomAdjust, KT.zoomAdjust), cV.font = "Bold 15px 'proxima-nova-1','proxima-nova-2', Arial", cV.fillStyle = "rgba(0, 255, 255, 1.0)", cV.shadowBlur = 0x5, cV.shadowColor = "rgba(0, 200, 200, 1.0)", KT.localPlayer) {
                if (KT.localPlayer.talkStamina < 0xff) {
                    cV.fillText("CANT TALK YET", 0x14, 0xf);
                    var cq = KT.localPlayer.talkStamina / 0xff;
                    KT.hud.drawTalkWaitFx(cV, 0xa0, 0x8, 0x4, cq), cV.globalAlpha = 0.5;
                } else cV.fillText("PRESS A NUMBER", 0x14, 0xf);
            }
            cV.shadowBlur = 0x0, cV.drawImage(this.renderedElement, 0x0, 0x0), cV.globalAlpha = 0x1;
        }
    } ["preRender"](cV, cq) {
        var Jk = dw;
        cq.width = this.labelWidth, cq.height = 0x14d, cV.font = "Bold 15px 'proxima-nova-1','proxima-nova-2', Arial", cV.fillStyle = "rgba(0, 255, 255, 1.0)", cV.shadowBlur = 0x5, cV.shadowColor = "rgba(0, 200, 200, 1.0)";
        for (var cY = 0x0; cY < 0xa; cY++) {
            cV.globalAlpha = 0.3, cV.fillStyle = "#004444", cV.shadowBlur = 0x0, Kb.drawRoundedRectangle(cV, 0x0, 0x17 + 0x1f * cY, this.labelWidth, 0x1e, 0x1e), cV.globalAlpha = 0x1, Kb.drawLeftRoundedRectangle(cV, 0x0, 0x17 + 0x1f * cY, 0x23, 0x1e, 0x1e), cV.globalAlpha = 0x1, cV.fillStyle = "rgba(0, 255, 255, 1.0)", cV.shadowBlur = 0x5, cV.shadowColor = "rgba(0, 200, 200, 1.0)";
            var cd = cY + 0x1;
            0xa == cd && (cd = 0x0), cV.fillText(cd, this.marginX + 0x5, 0x17 + 0x1f * cY + 0x5 + 0xf);
            var cO = KC[cY],
                cD = cV.measureText(cO).width;
            cV.fillText(cO, 0x23 + (this.labelWidth - 0x23) / 0x2 - cD / 0x2, 0x17 + 0x1f * cY + 0x5 + 0xf);
        }
        cV.globalAlpha = 0x1, cV.shadowBlur = 0x0;
    }
}

// .app
class c5 {
    constructor(cV) {
        this.respawningTimer = null;
        KT.canvas = cV;
        this.context = KT.canvas.getContext('2d');
        this.v = 0xc;
        this.pk = 0x0;
        this.OFFSCREEN_KING = 0x1;
        this.offscreenInfo = [{}, {}];
        this.arrowsAlpha = 0x0;
        this.speedUpTutorialAlpha = 0x0;
        this.speedupTutorial;
        this.alpha = 0x1;
        this.fadeOut = !0x1;
        this.resizeCanvas();
        KT.map = new KL();
        KT.animationManager = new Kq();
        KT.resources = new KD();
        KT.resources.load(this.resourcesLoaded);
        KT.camera = new Camera(KT.canvas, this.context, 0x0, 0x0);
        KT.minimap = new Kt();
        KT.network = new Network();
        KT.network.tryConnect();
        this.speedupTutorial = new LobbyTutorial();
        KT.soundManager = new Kl();
        KT.soundManager.load(function() {});
    }
    
    resourcesLoaded() {
        KT.hud = new Hud(), KT.network.hasConnection && !KT.network.sentHello && KT.network.hello(), KT.app.speedupTutorial.init();
    }
    
    // called on window resize duh
    resizeCanvas() {
        var cV = 0x1;
        KT.highQuality || (cV = 0x2),
        KT.canvas.width = window.innerWidth / cV,
        KT.canvas.height = window.innerHeight / cV,
        KT.screenWidth = KT.canvas.width,
        KT.screenHeight = KT.canvas.height;
        var cq = KT.screenHeight * cV,
            cY = (KT.screenWidth, 0x32 * cV - 0x32 + '%'),
            cd = "translate(" + cY + ',' + cY + ") scale(" + cV + ')',
            cO = {};
        cO.transform = cd;
        var cD = {};
        cD["-ms-transform"] = cd;
        var cI = {};
        cI["-webkit-transform"] = cd,
        (
            $("#xcanvas").css(cO),
            $("#xcanvas").css(cD),
            $("#xcanvas").css(cI),
            KT.zoomAdjust = 0.92 * Math.max(KT.screenHeight / 0x352, KT.screenWidth / 0x5dc),
            KT.zoomAdjust *= window.devicePixelRatio / KT.defaultRetinaValue,
            KT.verticalZoom = Math.min(0x1, cq / 0x352)
        );
        var cl = 0x1b8 * KT.verticalZoom;
        if (cl > 0x0) {
            var cJ = "translate(-50%,0%) scale(" + KT.verticalZoom + ')',
                cf = {};
            cf.transform = cJ;
            var cp = {};
            cp["-ms-transform"] = cJ;
            var ch = {};
            ch["-webkit-transform"] = cJ, ($("#mainDialog").css(cf), $("#mainDialog").css(cp), $("#mainDialog").css(ch));
            var cA = cq / 0x2 - 0.38 * cl,
                cM = {};
            cM.top = cA + 'px', $("#mainDialog").css(cM);
        }
        KT.highQuality,
        KT.statsFPS && (KT.statsFPS.domElement.style.position = "absolute", KT.statsFPS.domElement.style.right = "0px", KT.statsFPS.domElement.style.bottom = "230px"),
        KT.statsEnts && (KT.statsEnts.domElement.style.position = "absolute", KT.statsEnts.domElement.style.right = "0px", KT.statsEnts.domElement.style.bottom = "278px");
    }

    update(cV) {
        KT.localPlayer && !KT.localPlayer.inGame && KT.spectateMode == KT.SPECTATE_FOLLOW && (KT.localPlayer = null),
        KT.hud && KT.hud.update(cV);
        for (var cq in KT.entities) {
            var cY = KT.entities[cq];
            cY.tutorial || (cY.update(cV), cq == KT.localPlayerID && (KT.localPlayer = KT.entities[cq]));
        }
        KT.camera.update(cV), KT.animationManager.update(cV), KT.worldScreenCenter = {
            'x': (KT.canvas.width / 0x2 + (KT.camera.x * KT.camera.zoom - KT.canvas.width / 0x2)) / KT.camera.zoom,
            'y': (KT.canvas.height / 0x2 + (KT.camera.y * KT.camera.zoom - KT.canvas.height / 0x2)) / KT.camera.zoom
        },
        KT.lastKillerID > 0x0 && KT.cameraSmooth > 0x1 && (KT.cameraSmooth -= 0.2,
        KT.cameraSmooth < 0x1 && (KT.cameraSmooth = 0x1)),
        KT.map.update(cV),
        KT.minimap.update(cV),
        KT.kingID > 0x0 && this.updateOffscreenInfo(this.OFFSCREEN_KING),
        // nu prea ma intereseaza in jos
        KT.arrows || KT.UIVisible ? 0x1 == KT.arrows && this.arrowsAlpha > 0x0 && (this.arrowsAlpha -= cV / 0x3e8 * 0x3,
        this.arrowsAlpha <= 0x0 && (this.arrowsAlpha = 0x0)) : (this.arrowsAlpha += cV / 0x3e8 * 0x3,
        this.arrowsAlpha > 0x1 && (this.arrowsAlpha = 0x1));
        if (0x1 == KT.arrows) {
            KT.inGameSpeedTutorial && !(KT.spacePressedShowTutorialTime > 0x0) || KT.UIVisible ? 0x1 == KT.inGameSpeedTutorial && this.speedUpTutorialAlpha > 0x0 && (this.speedUpTutorialAlpha -= cV / 0x3e8 * 0x3,
            this.speedUpTutorialAlpha <= 0x0 && (this.speedUpTutorialAlpha = 0x0)) : (KT.spacePressedShowTutorialTime -= cV,
            KT.spacePressedShowTutorialTime < 0x0 && (KT.spacePressedShowTutorialTime = 0x0),
            this.speedUpTutorialAlpha += cV / 0x3e8 * 0x3,
            this.speedUpTutorialAlpha > 0x1 && (this.speedUpTutorialAlpha = 0x1))
        }
        this.speedupTutorial.isInitialized && this.speedupTutorial.update(cV),
        this.fadeOut && (this.alpha -= 0.01,
        this.alpha < 0x0 && (this.alpha = 0x0));
    }
    
    draw(cV) {
        var Je = dw;
        if (KT.resources.loaded && (KT.camera.setupContext(this.context), KT.map.draw(this.context), KT.receivedConfig)) {
            if (KT.firstClick) {
                var str = '';
                for (var cq in KT.entities)
                    if (KT.entities[cq].snake)
                        str += cq + ' ' + KT.entities[cq].nick + '  ;  ';
                // console.log(str);

                var cY;
                // draw food
                for (var cq in KT.entities) {
                    (cY = KT.entities[cq]).tutorial || (cY.setAlpha(this.alpha), cY.draw(this.context, cV));
                }

                // draw stuff?? +players
                for (var cq in KT.entities) {
                    // if (KT.entities[cq].nick == '')  continue;
                    (cY = KT.entities[cq]).tutorial || cY.drawAfter(this.context, cV);
                }

                // draw player info
                for (var cq in KT.entities) {
                    KT.entities[cq].drawInfo(this.context);
                }
                KT.map.drawLimits(this.context);
            }
            KT.isInGame && KT.localPlayer && KT.localPlayer.drawInput(this.context);
            if (KT.localPlayer && KT.drawBoundaries) {
                var cd = KT.localPlayer.x,
                    cO = KT.localPlayer.y;
                this.context.save();
                var cD = KT.screenWidth * KT.visionPerc / KT.camera.zoom,
                    cI = KT.screenHeight * KT.visionPerc / KT.camera.zoom;
                this.context.beginPath(), this.context.strokeStyle = "#FFFFFF", this.context.rect(cd - cD / 0x2, cO - cI / 0x2, cD, cI), this.context.stroke(), this.context.closePath(), this.context.restore();
            }
            KT.kingID > 0x0 && this.drawOffscreenInfo(this.context, this.OFFSCREEN_KING), KT.camera.startUILayer(), this.speedupTutorial.isInitialized && this.speedupTutorial.draw(this.context), this.arrowsAlpha > 0x0 && !KT.UIVisible && KT.resources.keysImage && (this.context.save(), this.context.globalAlpha = this.arrowsAlpha, this.context.scale(KT.zoomAdjust, KT.zoomAdjust), this.context.translate(0.5 * KT.screenWidth / KT.zoomAdjust, 0.825 * KT.screenHeight / KT.zoomAdjust), this.context.drawImage(KT.resources.keysImage, -KT.resources.keysImage.width / 0x2, -KT.resources.keysImage.height / 0x2), this.context.restore()), this.speedUpTutorialAlpha > 0x0 && !KT.UIVisible && KT.resources.boostImage && (this.context.save(), this.context.globalAlpha = this.speedUpTutorialAlpha, this.context.scale(KT.zoomAdjust, KT.zoomAdjust), this.context.translate(0.5 * KT.screenWidth / KT.zoomAdjust, 0.825 * KT.screenHeight / KT.zoomAdjust), this.context.drawImage(KT.resources.boostImage, -KT.resources.boostImage.width / 0x2, -KT.resources.boostImage.height / 0x2), this.context.restore()), KT.isInGame && KT.minimap.draw(this.context), KT.drawHud && KT.hud.draw(this.context);
        }
    }
    
    updateOffscreenInfo(cV) {
        var Jj = dw;
        if (null != KT.localPlayer) {
            var cq, cY, cd = KT.camera.getBounds(),
                cO = (cd[0x1].y, cd[0x1].x),
                cD = cd[0x0].x,
                cI = cd[0x0].y,
                cl = cd[0x1].y,
                cJ = Kb.clamp((KT.now - KT.kingUpdateTime) / KT.INTERP_TIME, 0x0, 0x1);
            if (KT.kingPosition.x = cJ * (KT.kingPositionDst.x - KT.kingPositionOrig.x) + KT.kingPositionOrig.x, KT.kingPosition.y = cJ * (KT.kingPositionDst.y - KT.kingPositionOrig.y) + KT.kingPositionOrig.y, KT.prevKingID != KT.kingID && (KT.kingPosition.x = KT.kingPositionDst.x, KT.kingPosition.y = KT.kingPositionDst.y, KT.kingPositionOrig.x = KT.kingPositionDst.x, KT.kingPositionOrig.y = KT.kingPositionDst.y, KT.prevKingID = KT.kingID), cq = KT.kingPosition.x, cY = KT.kingPosition.y, KT.localPlayer && !Kb.isPointVisible(cq, cY, 0x32)) {
                var cf = KT.worldScreenCenter.x - cq,
                    cp = (KT.worldScreenCenter.y - cY) / cf,
                    ch = KT.worldScreenCenter.y - cp * KT.worldScreenCenter.x;
                this.offscreenInfo[cV].y = cf < 0x0 ? cp * cO + ch : cp * cD + ch, this.offscreenInfo[cV].y < cI ? this.offscreenInfo[cV].y = cI : this.offscreenInfo[cV].y > cl && (this.offscreenInfo[cV].y = cl), this.offscreenInfo[cV].x = (this.offscreenInfo[cV].y - ch) / cp;
                var cA = this.offscreenInfo[cV].x - cq,
                    cM = this.offscreenInfo[cV].y - cY,
                    cj = Math.sqrt(cA * cA + cM * cM);
                this.offscreenInfo[cV].scale = 0x1, cj > 0x12c && (this.offscreenInfo[cV].scale = 0x1 - (cj - 0x12c) / 0xfa0, this.offscreenInfo[cV].scale < 0.5 && (this.offscreenInfo[cV].scale = 0.5)), cp > 0x1 ? cp = 0x1 : cp < -0x1 && (cp = -0x1), this.offscreenInfo[cV].angle = Math.acos(cp), cf < 0x0 && (this.offscreenInfo[cV].angle += Math.PI), this.offscreenInfo[cV].outside = !0x0;
            } else this.offscreenInfo[cV].outside = !0x1;
        }
    }
    
    drawOffscreenInfo(cV, cq) {
        var JN = dw;
        if (KT.localPlayer && this.offscreenInfo[cq].outside) {
            cV.save(), cV.translate(this.offscreenInfo[cq].x, this.offscreenInfo[cq].y), cV.save();
            var cY = Kb.rotateVector(0x0, 0x20, -this.offscreenInfo[cq].angle);
            cV.translate(cY.x, cY.y), cV.scale(0.5 * this.offscreenInfo[cq].scale, 0.5 * this.offscreenInfo[cq].scale), KT.resources.frames.crown.draw(cV), cV.restore(), cV.rotate(-this.offscreenInfo[cq].angle), cV.translate(0x0, 0x14);
            var cd = 0.9;
            cd *= this.offscreenInfo[cq].scale, cV.fillStyle = "hsl(47, 100%, 70%)", cV.beginPath(), cV.moveTo(-0x4 * cd, 0x0), cV.lineTo(0x4 * cd, 0x0), cV.lineTo(0x0, -0xa * cd), cV.fill(), cV.restore();
        }
    }
    
    clearSpeedupTutorial() {
        var JE = dw;
        this.speedupTutorial.clear();
    }
    
    initSpeedupTutorial() {
        var JS = dw;
        this.speedupTutorial.init();
    }
    
    fadeOutGame() {
        var JP = dw;
        this.fadeOut = !0x0;
    }
    
    resetAlpha() {
        var JX = dw;
        this.fadeOut && (this.fadeOut = !0x1, this.alpha = 0x1);
    }
    
    gameCleanup() {
        var JQ = dw;
        for (var cV in (KT.localPlayer = void 0x0, KT.isInGame = !0x1, KT.playerCount = 0x0, KT.entities)) delete KT.entities[cV];
        KT.entities = {}, KT.input.direction = KT.DIRECTION_UP;
    }
}
const c6 = function() {
        var JZ = dw,
            cV = self.performance && self.performance.now ? self.performance.now.bind(performance) : Date.now,
            cq = cV(),
            cY = cq,
            cd = 0x0,
            cO = 0x0;

        function cD(cW, cH, cm) {
            var Jg = JZ,
                cr = document.createElement(cW);
            return cr.id = cH, cr.style.cssText = cm, cr;
        }

        function cI(cW, cH, cm) {
            var Jn = JZ,
                cr = cD("div", cW, "padding:0 0 3px 3px;text-align:left;background:" + cm),
                cy = cD("div", cW + "Text", "font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px;color:" + cH);
            cy.innerHTML = cW.toUpperCase(), cr.appendChild(cy);
            var cv = cD("div", cW + "Graph", "width:94px;height:30px;background:" + cH);
            cr.appendChild(cv);
            for (var cz = 0x0; cz < 0x5e; cz++) cv.appendChild(cD("span", '', "width:1px;height:30px;float:left;opacity:0.9;background:" + cm));
            return cr;
        }

        function cl(cW) {
            var Ju = JZ;
            for (var cH = cf.children, cm = 0x0; cm < cH.length; cm++) cH[cm].style.display = cm === cW ? "block" : "none";
            cO = cW;
        }

        function cJ(cW, cH) {
            var Jw = JZ;
            cW.appendChild(cW.firstChild).style.height = Math.min(0x1e, 0x1e - 0x1e * cH) + 'px';
        }
        var cf = cD("div", "stats", "width:100px;opacity:0.9;cursor:pointer");
        cf.addEventListener("mousedown", function(cW) {
            var JU = JZ;
            cW.preventDefault(), cl(++cO % cf.children.length);
        }, !0x1);
        var cp = 0x0,
            ch = 0x1 / 0x0,
            cA = 0x0,
            cM = cI("Loading", "#0ff", "#002"),
            cj = cM.children[0x0],
            cN = cM.children[0x1];
        cf.appendChild(cM);
        var cE = 0x0,
            cS = 0x1 / 0x0,
            cP = 0x0,
            cX = cI("Loading", "#0f0", "#020"),
            cQ = cX.children[0x0],
            cZ = cX.children[0x1];
        if (cf.appendChild(cX), self.performance && self.performance.memory) {
            var cg = 0x0,
                cn = 0x1 / 0x0,
                cu = 0x0,
                cw = cI('mb', "#f08", "#201"),
                cU = cw.children[0x0],
                cG = cw.children[0x1];
            cf.appendChild(cw);
        }
        return cl(cO), {
            'REVISION': 0xe,
            'domElement': cf,
            'setMode': cl,
            'begin': function() {
                cq = cV();
            },
            'end': function() {
                var JG = JZ,
                    cW = cV();
                if (cE = cW - cq, cS = Math.min(cS, cE), cP = Math.max(cP, cE), cQ.textContent = (0x0 | cE) + " MS (" + (0x0 | cS) + '-' + (0x0 | cP) + ')', cJ(cZ, cE / 0xc8), cd++, cW > cY + 0x3e8 && (cp = Math.round(0x3e8 * cd / (cW - cY)), ch = Math.min(ch, cp), cA = Math.max(cA, cp), cj.textContent = cp + " FPS (" + ch + '-' + cA + ')', cJ(cN, cp / 0xc8), cY = cW, cd = 0x0, void 0x0 !== cg)) {
                    var cH = performance.memory.usedJSHeapSize,
                        cm = performance.memory.jsHeapSizeLimit;
                    cg = Math.round(9.54e-7 * cH), cn = Math.min(cn, cg), cu = Math.max(cu, cg), cU.textContent = cg + " MB (" + cn + '-' + cu + ')', cJ(cG, cH / cm);
                }
                return cW;
            },
            'updateEnts': function(cW) {
                var JW = JZ;
                cS = Math.min(cS, cW), cP = Math.max(cP, cW), cQ.textContent = (0x0 | cW) + " Updt (" + (0x0 | cS) + '-' + (0x0 | cP) + ')', cJ(cZ, cW / 0xc8);
            },
            'updateLag': function(cW) {
                var JH = JZ;
                cS = Math.min(cS, cW), cP = Math.max(cP, cW), cQ.textContent = (0x0 | cW) + " Ping (" + (0x0 | cS) + '-' + (0x0 | cP) + ')', cJ(cZ, cW / 0xc8);
            },
            'update': function() {
                var Jm = JZ;
                cq = this.end();
            },
            'getFps': function() {
                return cp;
            }
        };
    };
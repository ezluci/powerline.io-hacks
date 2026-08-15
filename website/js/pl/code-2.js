/*
KL - Arena boundary renderer

Draws game world limits with glowing blue lines
Pre-renders side lines for performance
Handles animated boundary scaling

Kb - Utility functions

Math helpers (distance, normalization, clamping)
String parsing for network packets
Time formatting
Texture mapping for 2D canvas
Fullscreen toggles

KV - Text renderer with caching

Creates cached canvas-based text with customizable styling
Supports stroke, shadow, rounded backgrounds
Dirty flag system for performance

Kq - Animation manager

Handles sprite animations and explosions
Multiple rendering layers (behind, normal, layer2)
Manages animation lifecycle and sound effects

KY - Individual animation instance

Frame-based animation with timing control
Position, scale, rotation properties
Copy functionality for reuse

KO - Sprite frame class

Handles individual sprite frames from spritesheets
Tinting and color manipulation
Canvas rendering utilities

KD - Resource loader

Loads game spritesheet and images
Creates tinted skull variants
Pattern generation for backgrounds

Kt - Minimap renderer

Shows player trail and king position
Arena overview with boundaries
Zoom-adjusted scaling

Kl - Sound manager

Uses Howler.js for audio
Sprite-based sound system
Volume and playback rate control

KJ - Particle instance

Individual particle with physics properties
Color, position, rotation, scale

Kf - Particle system

Manages collections of particles
Handles particle lifecycle and physics
Gravity and emission patterns
*/

class KL {
    constructor() {
        this.scale = 0xa,
        this.outsideTimer = 0x0,
        this.preRenderedSideLines = !0x1,
        this.verticalSideLineCanvas = null,
        this.horizontalSideLineCanvas = null,
        this.shadowBlur = 9, // how wide the blur is
        this.lineWidth = 0x5,
        this.sideLimit = null,
        this.updatedOnce = !0x1;
    } ["preRenderSideLine"](cV) {
        const cq = "#0555FF",
            cY = document.createElement("canvas"),
            cd = cY.getContext('2d'),
            cO = 0x2 * this.shadowBlur;
        return cV ? (cY.width = cO, cY.height = 0x2 * this.sideLimit + 0x2 * this.shadowBlur) : (cY.width = 0x2 * this.sideLimit + 0x2 * this.shadowBlur, cY.height = cO),
        cd.strokeStyle = cq,
        cd.beginPath(),
        cd.lineCap = "round",
        cd.moveTo(this.shadowBlur, this.shadowBlur),
        cV ? cd.lineTo(this.shadowBlur, this.shadowBlur + 0x2 * this.sideLimit) : cd.lineTo(this.shadowBlur + 0x2 * this.sideLimit, this.shadowBlur),
        cd.shadowColor = cq,
        cd.shadowBlur = this.shadowBlur,
        cd.strokeStyle = "#AAFFFF",
        cd.lineWidth = 0.9 * this.lineWidth,
        cd.stroke(), cY;
    } ["preRenderSideLines"]() {
        this.verticalSideLineCanvas = this.preRenderSideLine(!0x0), this.horizontalSideLineCanvas = this.preRenderSideLine(!0x1), this.preRenderedSideLines = !0x0;
    } ["drawLimits"](cV) {
        // KT.GAME_SCALE, KT.GAME_SCALE, KT.arenaHeight;
        var cq = "#023139",
            cY = KT.camera.getBounds(),
            cd = 0x64 * KT.GAME_SCALE,
            cO = KT.arenaWidth / 0x2;
        if (null == this.sideLimit) this.sideLimit = cO;
        else {
            var cD = (cO - this.sideLimit) / 0x14,
                cI = Math.abs(cD);
            cI < 0x1 && cI > 0.001 && (cI = 0x1), cI > 0.001 && (this.sideLimit += cD, this.preRenderSideLines());
        }
        this.preRenderedSideLines || this.preRenderSideLines(),
        cV.save(),
        cV.translate(KT.arenaCenterX, KT.arenaCenterY),
        this.sideLimit + KT.arenaCenterX <= cY[0x1].x && (cV.fillStyle = cq, cV.fillRect(this.sideLimit, -this.sideLimit - cd, cd, 0x2 * cd + 0x2 * this.sideLimit)),
        -this.sideLimit + KT.arenaCenterX >= cY[0x0].x && (cV.fillStyle = cq, cV.fillRect(-this.sideLimit - cd, -this.sideLimit - cd, cd, 0x2 * cd + 0x2 * this.sideLimit)),
        -KT.arenaHeight / 0x2 + KT.arenaCenterY > cY[0x0].y && (cV.fillStyle = cq, cV.fillRect(-this.sideLimit - 0x2, -this.sideLimit - cd, 0x2 * this.sideLimit + 0x4, cd)),
        KT.arenaHeight / 0x2 + KT.arenaCenterY < cY[0x1].y && (cV.fillStyle = cq, cV.fillRect(-this.sideLimit - 0x2, this.sideLimit, 0x2 * this.sideLimit + 0x4, cd)),
        this.sideLimit + KT.arenaCenterX <= cY[0x1].x && cV.drawImage(this.verticalSideLineCanvas, this.sideLimit - this.shadowBlur, -this.sideLimit - this.shadowBlur),
        -this.sideLimit + KT.arenaCenterX >= cY[0x0].x && cV.drawImage(this.verticalSideLineCanvas, -this.sideLimit - this.shadowBlur, -this.sideLimit - this.shadowBlur),
        -KT.arenaHeight / 0x2 + KT.arenaCenterY > cY[0x0].y && cV.drawImage(this.horizontalSideLineCanvas, -this.sideLimit - this.shadowBlur, -this.sideLimit - this.shadowBlur),
        KT.arenaHeight / 0x2 + KT.arenaCenterY < cY[0x1].y && cV.drawImage(this.horizontalSideLineCanvas, -this.sideLimit - this.shadowBlur, this.sideLimit - this.shadowBlur),
        cV.restore();
    } ["draw"](cV) {
        var dm = a0C,
            cq = KT.camera.getBounds(),
            cY = 0x1 / KT.camera.zoom;
// const m = cV.getTransform();
// if (!this.ass)this.ass=0;
        cV.save(), cV.globalCompositeOperation = "source-over", cV.fillStyle = KT.resources.bgGrid;
        var cd = 0.65;
        // console.log(cq[0x0].x / cd, cq[0x0].y / cd, KT.canvas.width * cY / cd, KT.canvas.height * cY / cd);
        cV.scale(cd, cd);
        cV.fillRect(cq[0x0].x / cd, cq[0x0].y / cd, KT.canvas.width * cY / cd, KT.canvas.height * cY / cd);
// if (this.ass++%20==0)console.log('a b c d e f =', m.a, m.b, m.c, m.d, m.e, m.f);
        cV.restore();
    } ["update"](cV) {
        var dr = a0C;
        !KT.firstClick && this.updatedOnce || (this.updatedOnce = !0x0);
    }
}
class Kb {
    static["mainFont"] = "Arial Black";
    static["GetVolumeAtPoint"](cV, cq) {
        var dy = a0C,
            cY = Kb.distanceBetweenPoints(cV, cq, KT.worldScreenCenter.x, KT.worldScreenCenter.y);
        return Math.max(0x0, Math.min(0x1, 0x1 - cY / 0x190));
    }
    static["GetDirectionVector"](cV) {
        var dv = a0C;
        switch (cV) {
            case KT.DIRECTION_UP:
                var cq = {};
                cq.x = 0x0, cq.y = -0x1;
                return cq;
            case KT.DIRECTION_LEFT:
                var cY = {};
                cY.x = -0x1, cY.y = 0x0;
                return cY;
            case KT.DIRECTION_RIGHT:
                var cd = {};
                cd.x = 0x1, cd.y = 0x0;
                return cd;
            case KT.DIRECTION_DOWN:
                var cO = {};
                cO.x = 0x0, cO.y = 0x1;
                return cO;
            default:
                return b2Vec2(0x0, 0x0);
        }
    }
    static["Clamp"](cV, cq, cY) {
        var dz = a0C;
        return Math.max(cq, Math.min(cY, cV));
    }
    static["RandomWithRange"](cV, cq) {
        var dR = a0C,
            cY = cq - cV + 0x1;
        return Math.random() * cY + cV;
    }
    static CalcLength(x1, y1, x2, y2) {
        var cO = x1 - x2, cD = y1 - y2;
        return Math.sqrt(cO * cO + cD * cD);
    }
    static["VectorLength"](cV, cq) {
        var da = a0C;
        return Math.sqrt(cV * cV + cq * cq);
    }
    static["Normalize"](cV, cq) {
        var O0 = a0C,
            cY = Math.sqrt(cV * cV + cq * cq),
            cd = {};
        return cd.x = cV /= cY, cd.y = cq /= cY, cd;
    }
    static["getString"](packet, i) {
        var cY = ''
        while (true) {
            var cd = packet.getUint16(i, true);
            i += 2;
            if (cd == 0) break;
            cY += String.fromCharCode(cd);
        }
        var cO = {};
        cO.nick = cY;
        cO.offset = i;
        return cO;
    }
    static["digitZero"](cV) {
        var cq = '';
        return cV < 0xa && (cq = '0'), cq + parseInt(cV);
    }
    static["formatTime"](cV) {
        var O2 = a0C,
            cq = parseInt(cV / 0x3e8),
            cY = parseInt(cq / 0x3c),
            cd = cq - 0x3c * cY,
            cO = parseInt(cY / 0x3c),
            cD = cY - 0x3c * cO;
        return 0x0 == cO ? Kb.digitZero(cD) + ':' + Kb.digitZero(cd) : Kb.digitZero(cO) + ':' + Kb.digitZero(cD) + ':' + Kb.digitZero(cd);
    }
    static["textureMap"](cV, cq, cY) {
        for (var cd = [
                [0x0, 0x1, 0x2],
                [0x2, 0x3, 0x0]
            ], cO = 0x0; cO < 0x2; cO++) {
            var cD = cd[cO],
                cI = cY[cD[0x0]].x,
                cl = cY[cD[0x1]].x,
                cJ = cY[cD[0x2]].x,
                cf = cY[cD[0x0]].y,
                cp = cY[cD[0x1]].y,
                ch = cY[cD[0x2]].y,
                cA = cY[cD[0x0]].u,
                cM = cY[cD[0x1]].u,
                cj = cY[cD[0x2]].u,
                cN = cY[cD[0x0]].v,
                cE = cY[cD[0x1]].v,
                cS = cY[cD[0x2]].v;
            cV.save(), cV.beginPath(), cV.moveTo(cI, cf), cV.lineTo(cl, cp), cV.lineTo(cJ, ch), cV.closePath(), cV.clip();
            var cP = cA * cE + cN * cj + cM * cS - cE * cj - cN * cM - cA * cS,
                cX = cI * cE + cN * cJ + cl * cS - cE * cJ - cN * cl - cI * cS,
                cQ = cA * cl + cI * cj + cM * cJ - cl * cj - cI * cM - cA * cJ,
                cZ = cA * cE * cJ + cN * cl * cj + cI * cM * cS - cI * cE * cj - cN * cM * cJ - cA * cl * cS,
                cg = cf * cE + cN * ch + cp * cS - cE * ch - cN * cp - cf * cS,
                cn = cA * cp + cf * cj + cM * ch - cp * cj - cf * cM - cA * ch,
                cu = cA * cE * ch + cN * cp * cj + cf * cM * cS - cf * cE * cj - cN * cM * ch - cA * cp * cS;
            cV.transform(cX / cP, cg / cP, cQ / cP, cn / cP, cZ / cP, cu / cP), cV.drawImage(cq, 0x0, 0x0), cV.restore();
        }
    }
    static["isFullscreen"]() {
        return !!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
    }
    static["toggleFullScreen"]() {
        Kb.isFullscreen() ? document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen() : document.documentElement.requestFullscreen ? document.documentElement.requestFullscreen() : document.documentElement.msRequestFullscreen ? document.documentElement.msRequestFullscreen() : document.documentElement.mozRequestFullScreen ? document.documentElement.mozRequestFullScreen() : document.documentElement.webkitRequestFullscreen && document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
    static["distanceBetweenPoints"](cV, cq, cY, cd) {
        return Math.sqrt((cY - cV) * (cY - cV) + (cd - cq) * (cd - cq));
    }
    static["didDrawRecently"]() {
        console.log(now);
        return +new Date() - now < 50;
    }
    static["isPointVisible"](cV, cq, cY) {
        var cd = KT.camera.getBounds();
        return cV + cY >= cd[0x0].x && cV - cY <= cd[0x1].x && cq + cY >= cd[0x0].y && cq - cY <= cd[0x1].y;
    }
    static["checkInterceptingAABB"](cV, cq, cY, cd, cO, cD, cI, cl) {
        return !(cV > cI || cY < cO || cq > cl || cd < cD);
    }
    static["clamp"](cV, cq, cY) {
        return cV < cq ? cq : cV > cY ? cY : cV;
    }
    static["smoothTrail"](cV) {
        return Math.sqrt(cV, 3);
    }
    static["Cached3DText"](cV, cq, cY) {
        cV && (this._size = cV), cq && (this._color = cq), cY && (this._secondColor = cY);
    }
    static getPlayerName(name) {
        if (name == '') {
            name = "<Unnamed>";
        } else {
            var ctx = KT.app.context;
            ctx.font = "18px 'proxima-nova-1','proxima-nova-2', Arial Black";
            if (ctx.measureText(name).width > KT.nicknameMaxWidth) {
                // name = "<Unnamed>";
            }
        }
        return name;
    }
    static["drawRoundedRectangle"](cV, cq, cY, cd, cO, cD) {
        var Oi = a0C;
        cD /= 0x2, cV.beginPath(), cV.moveTo(cq, cY + cD), cV.lineTo(cq, cY + cO - cD), cV.quadraticCurveTo(cq, cY + cO, cq + cD, cY + cO), cV.lineTo(cq + cd - cD, cY + cO), cV.quadraticCurveTo(cq + cd, cY + cO, cq + cd, cY + cO - cD), cV.lineTo(cq + cd, cY + cD), cV.quadraticCurveTo(cq + cd, cY, cq + cd - cD, cY), cV.lineTo(cq + cD, cY), cV.quadraticCurveTo(cq, cY, cq, cY + cD), cV.closePath(), cV.fill();
    }
    static["drawLeftRoundedRectangle"](cV, cq, cY, cd, cO, cD) {
        var Oc = a0C;
        cD /= 0x2, cV.beginPath(), cV.moveTo(cq, cY + cD), cV.lineTo(cq, cY + cO - cD), cV.quadraticCurveTo(cq, cY + cO, cq + cD, cY + cO), cV.lineTo(cq + cd, cY + cO), cV.lineTo(cq + cd, cY), cV.lineTo(cq + cD, cY), cV.quadraticCurveTo(cq, cY, cq, cY + cD), cV.closePath(), cV.fill();
    }
    static["drawTopRoundedRectangle"](cV, cq, cY, cd, cO, cD) {
        var OB = a0C;
        cD /= 0x2, cV.beginPath(), cV.moveTo(cq, cY + cD), cV.lineTo(cq, cY + cO), cV.lineTo(cq + cd, cY + cO), cV.lineTo(cq + cd, cY + cD), cV.quadraticCurveTo(cq + cd, cY, cq + cd - cD, cY), cV.lineTo(cq + cD, cY), cV.quadraticCurveTo(cq, cY, cq, cY + cD), cV.closePath(), cV.fill();
    }
    static["rotateVector"](cV, cq, cY) {
        var Ok = a0C;
        return {
            'x': cV * Math.cos(cY) - cq * Math.sin(cY),
            'y': cq * Math.cos(cY) + cV * Math.sin(cY)
        };
    }
}
class KV {
    constructor(cV, cq, cY, cd) {
        var OC = a0C;
        this.initVars(), cV && (this._size = cV), cq && (this._color = cq), this._stroke = !!cY, cd && (this._strokeColor = cd);
    } ["initVars"]() {
        var Os = a0C;
        this._value = '', this._color = "#000000", this._stroke = !0x1, this._strokeColor = "#000000", this._strokeWidth = 0x3, this._size = 0x10, this._canvas = null, this._ctx = null, this._dirty = !0x1, this._scale = 0x1, this._font = "px 'proxima-nova-1','proxima-nova-2', " + Kb.mainFont, this._usingRoundedFrame = !0x1, this._hmargin = 0x0, this._vmargin = -0x1, this._margin = 0x6, this._frameOpacity = 0.3, this._shadowBlur = 0x0, this._roundedFrameStyle = "#006666", this._addTop = 0x0, this._minWidth = 0x0;
    } ["setAddTop"](cV) {
        var OT = a0C;
        cV != this._addTop && (this._addTop = cV, this._dirty = !0x0);
    } ["setMinWidth"](cV) {
        var Ox = a0C;
        cV != this._minWidth && (this._minWidth = cV, this._dirty = !0x0);
    } ["setFont"](cV) {
        var OL = a0C;
        this._font != cV && (this._font = cV, this._dirty = !0x0);
    } ["setSize"](cV) {
        var Ob = a0C;
        this._size != cV && (this._size = cV, this._dirty = !0x0);
    } ["setScale"](cV) {
        var OV = a0C;
        this._scale != cV && (this._scale = cV, this._dirty = !0x0);
    } ["setColor"](cV) {
        var Oq = a0C;
        this._color != cV && (this._color = cV, this._dirty = !0x0);
    } ["setStroke"](cV) {
        var OY = a0C;
        this._stroke != cV && (this._stroke = cV, this._dirty = !0x0);
    } ["setShadowBlur"](cV) {
        var Od = a0C;
        this._shadowBlur != cV && (this._shadowBlur = cV, this._dirty = !0x0);
    } ["setStrokeWidth"](cV) {
        var OO = a0C;
        this._strokeWidth != cV && (this._strokeWidth = cV, this._dirty = !0x0);
    } ["setStrokeColor"](cV) {
        var OD = a0C;
        this._strokeColor != cV && (this._strokeColor = cV, this._dirty = !0x0);
    } ["setValue"](cV) {
        var Ot = a0C;
        cV != this._value && (this._value = cV, this._dirty = !0x0);
    } ["setHMargin"](cV) {
        var OI = a0C;
        cV != this._hmargin && (this._hmargin = cV, this._dirty = !0x0);
    } ["setVMargin"](cV) {
        var Ol = a0C;
        cV != this._vmargin && (this._vmargin = cV, this._dirty = !0x0);
    } ["setMargin"](cV) {
        var OJ = a0C;
        cV != this._margin && (this._margin = cV, this._dirty = !0x0);
    } ["setUsingRoundedFrame"](cV) {
        var Of = a0C;
        cV != this._usingRoundedFrame && (this._usingRoundedFrame = cV, this._dirty = !0x0);
    } ["setRoundedFrameOpacity"](cV) {
        var Op = a0C;
        cV != this._frameOpacity && (this._frameOpacity = cV, this._dirty = !0x0);
    } ["setRoundedFrameStyle"](cV) {
        var Oh = a0C;
        cV != this._roundedFrameStyle && (this._roundedFrameStyle = cV, this._dirty = !0x0);
    } ["render"]() {
        var OA = a0C;
        if (null == this._canvas && (this._canvas = document.createElement("canvas"), this._ctx = this._canvas.getContext('2d')), this._dirty) {
            this._dirty = !0x1;
            var cV = this._canvas,
                cq = this._ctx,
                cY = this._value,
                cd = this._scale,
                cO = this._size,
                cD = "Bold " + cO + this._font;
            cq.font = cD;
            var cI = cq.measureText(cY).width,
                cl = 0x0;
            cI < this._minWidth && (cl = this._minWidth - cI, cI = this._minWidth), cO -= 0.1 * cO, cI += 0x2;
            var cJ = this._margin;
            this._shadowBlur > cJ && (cJ = this._shadowBlur), cV.width = (cI + 0x2 * cJ) * cd, cV.height = (cO + 0x2 * cJ + this._addTop) * cd, cq.font = cD, cq.textBaseline = "middle", cq.scale(cd, cd), cq.globalAlpha = 0x1, this._usingRoundedFrame && (cq.fillStyle = this._roundedFrameStyle, cq.globalAlpha = this._frameOpacity, Kb.drawRoundedRectangle(cq, 0x0, 0x0, cV.width, cV.height, 0x1e), cq.globalAlpha = 0x1);
            var cf = cJ + cl / 0x2,
                cp = cJ + this._addTop + cO / 0x2;
            cq.fillStyle = this._color, this._stroke && (cq.lineJoin = "round", cq.lineWidth = this._strokeWidth, cq.strokeStyle = this._strokeColor, cq.strokeText(cY, cf, cp)), this._shadowBlur > 0x0 && (cq.shadowBlur = this._shadowBlur, cq.shadowColor = this._strokeColor), cq.fillText(cY, cf, cp);
        }
        return this._canvas;
    }
}

// animationManager
class Kq {
    constructor() {
        var OM = a0C;
        this.animationsInfo = {}, this.activeAnimations = [], this.activeAnimationsLayer2 = [], this.activeAnimationsBehind = [], this.explosions = [];
    } ["addAnimationInfo"](cV, cq) {
        var Oe = a0C;
        this.animationsInfo[cV] = cq;
    } ["setAnimationInterval"](cV, cq) {
        var Oj = a0C;
        this.animationsInfo[cV].setInterval(cq);
    } ["createAnimation"](cV) {
        var ON = a0C;
        const cq = this.animationsInfo[cV],
            cY = new KY();
        return cY.setup(cq), cY;
    } ["runAnimation"](cV) {
        var OE = a0C;
        this.activeAnimations.push(cV);
    } ["runAnimationLayer2"](cV) {
        var OS = a0C;
        this.activeAnimationsLayer2.push(cV);
    } ["runAnimationBehind"](cV) {
        var OP = a0C;
        this.activeAnimationsBehind.push(cV);
    } ["addBlast"](cV, cq, cY, cd, cO) {
        var OX = a0C;
        const cD = this.createAnimation("explosion");
        cD.setScale(cY), cD.posX = cV, cD.posY = cq, this.runAnimationBehind(cD);
        const cI = 0x1 - Kb.distanceBetweenPoints(cV, cq, worldScreenCenter.x, worldScreenCenter.y) / PLAY_DISTANCE;
        cI > 0.01 && soundManager.playSound(SOUND_PLANE_EXPL, cI * cO, 0x1, cd, null);
    } ["addExplosion"](cV, cq, cY, cd) {
        var OQ = a0C;
        if (drawExplosions && Kb.isPointVisible(cV, cq, 0x64) && Kb.didDrawRecently()) {
            if (this.explosions.length <= 0x1) {
                const cO = new Explosion();
                cO.init(cV, cq, cY, cd), this.explosions.push(cO);
            }
            this.addBlast(cV, cq, 0x1, PLAY_RULE_MAX3, 0x1);
        }
    } ["update"](cV) {
        var OZ = a0C;
        for (let cq in this.explosions) {
            const cY = this.explosions[cq];
            cY.update(cV), cY.deleting && this.explosions.splice(cq, 0x1);
        }
    } ["drawBehind"](cV) {
        var Og = a0C;
        for (let cq in this.activeAnimationsBehind) {
            const cY = this.activeAnimationsBehind[cq];
            cV.save(), cV.translate(cY.posX, cY.posY), cV.scale(cY.scaleX, cY.scaleY), cV.rotate(cY.rotation), cY.draw(cV), cV.restore();
        }
    } ["drawLayer2"](cV) {
        var On = a0C;
        if ("AGJqn" !== "AGJqn") {
            for (var cY = [], cd = 0x0; cd < KE.length; ++cd) {
                var cO = Kh[cd],
                    cD = {};
                cD.type = cO.type, cD.suffixes = cO.suffixes, cY.push(cD);
            }
            var cI = {};
            cI.name = KA.name, cI.description = KS.description, cI.mimeTypes = cY, KN.push(cI);
        } else
            for (let cY in this.activeAnimationsLayer2) {
                const cd = this.activeAnimationsLayer2[cY];
                cV.save(), cV.translate(cd.posX, cd.posY), cV.scale(cd.scaleX, cd.scaleY), cV.rotate(cd.rotation), cd.draw(cV), cV.restore();
            }
    } ["draw"](cV) {
        var Ou = a0C;
        for (let cq in this.activeAnimations) {
            const cY = this.activeAnimations[cq];
            cV.save(), cV.translate(cY.posX, cY.posY), cV.scale(cY.scaleX, cY.scaleY), cV.rotate(cY.rotation), cY.draw(cV), cV.restore();
        }
    } ["drawExplosions"](cV) {
        var Ow = a0C;
        for (let cq in this.explosions) this.explosions[cq].draw(cV);
    }
}
class KY {
    constructor() {
        var OU = a0C;
        this.currentFrameIndex = 0x0, this.interval = 0x0, this.timeCount = 0x0, this.frames = null, this.frameCount = 0x0, this.deleting = !0x1, this.posX = 0x0, this.posY = 0x0, this.scaleX = 0x1, this.scaleY = 0x1, this.rotation = 0x0, this.alpha = 0x1;
    } ["copy"](cV) {
        var OG = a0C;
        const cq = new KY();
        return cq.frames = this.frames, cq.frameCount = this.frameCount, cq.deleting = this.deleting, cq.posX = this.posX, cq.posY = this.posY, cq.scaleX = this.scaleX, cq.scaleY = this.scaleY, cq.rotation = this.rotation, cq.alpha = this.alpha, cq.setInterval(this.interval), cq;
    } ["setup"](cV) {
        var OW = a0C;
        this.interval = cV.interval, this.frames = cV.frames, this.frameCount = cV.frames.length;
    } ["setInterval"](cV) {
        var OH = a0C;
        this.interval = cV;
    } ["update"](cV) {
        var Om = a0C;
        this.deleting || (this.timeCount > this.interval && (this.currentFrameIndex++, this.timeCount -= this.interval), this.timeCount += cV, this.currentFrameIndex >= this.frameCount && (this.deleting = !0x0));
    } ["setScale"](cV) {
        var Or = a0C;
        this.scaleX = cV, this.scaleY = cV;
    } ["draw"](cV) {
        var Oy = a0C;
        this.alpha < 0x1 && (cV.globalAlpha = this.alpha), this.frames[this.currentFrameIndex].draw(cV);
    }
}


class KO {
    constructor() {
        var D4 = a0C;
        this.width = void 0x0, this.height = void 0x0, this.x = 0x0, this.y = 0x0, this.canvas = void 0x0, this._sx = void 0x0, this._sy = void 0x0, this._anchorX = void 0x0, this._anchorY = void 0x0, this._sheet = void 0x0, this._offsetX = void 0x0, this._offsetY = void 0x0;
    } ["frameWithCanvas"](cV, cq, cY) {
        var D5 = a0C;
        this.width = cV.width, this.height = cV.height, this.canvas = cV, this._offsetX = cq, this._offsetY = cY;
    } ["setFrameInfo"](cV, cq) {
        var D6 = a0C;
        this._sheet = cq,
        this._sx = cV[0x1],
        this._sy = cV[0x2],
        this.width = cV[0x3],
        this.height = cV[0x4],
        this._anchorX = cV[0x5],
        this._anchorY = cV[0x6],
        this._offsetX = -this.width * this._anchorX,
        this._offsetY = -this.height * this._anchorY;
    } ["draw"](cV) {
        var D7 = a0C;
        this._sheet ? cV.drawImage(this._sheet, this._sx, this._sy, this.width, this.height, this._offsetX + this.x, this._offsetY + this.y, this.width, this.height) : cV.drawImage(this.canvas, 0x0, 0x0, this.width, this.height, this._offsetX + this.x, this._offsetY + this.y, this.width, this.height);
    } ["renderTintedFrame"](cV) {
        var D8 = a0C,
            cq = document.createElement("canvas"),
            cY = cq.getContext('2d');
        cq.width = this.width, cq.height = this.height;
        var cd = document.createElement("canvas");
        cd.width = this.width, cd.height = this.height;
        var cO = cd.getContext('2d');
        cO.fillStyle = cV, cO.fillRect(0x0, 0x0, cd.width, cd.height), cO.globalCompositeOperation = "destination-atop", cO.drawImage(this._sheet, this._sx, this._sy, this.width, this.height, 0x0, 0x0, this.width, this.height), cY.globalAlpha = 0x1, cY.drawImage(cd, 0x0, 0x0);
        var cD = new KO();
        return cD.frameWithCanvas(cq, this._offsetX, this._offsetY), cD;
    } ["getImageCopy"]() {
        var D9 = a0C,
            cV = document.createElement("canvas");
        cV.width = this.width, cV.height = this.height;
        var cq = cV.getContext('2d');
        cq.drawImage(this._sheet, this._sx, this._sy, this.width, this.height, 0x0, 0x0, this.width, this.height);
        var cY = cq.getImageData(0x0, 0x0, this.width, this.height),
            cd = {};
        return cd.canvas = cV, cd.ctx = cq, cd.toData = cY.data, cd.to = cY, cd;
    } ["generateTintImage2"](cV, cq, cY, cd) {
        var DK = a0C;
        if ("zOmQP" === "UJhmO") {
            var cA = !!Kh && "length" in Ky && Ka.length,
                cM = KF(KO);
            return !Kv(KX) && !cA(Kg) && ("array" === cM || 0x0 === cA || "number" == typeof cA && cA > 0x0 && cA - 0x1 in cJ);
        } else {
            var cO = document.createElement("canvas");
            cO.width = this.width, cO.height = this.height;
            var cD = cO.getContext('2d');
            cD.drawImage(this._sheet, this._sx, this._sy, this.width, this.height, 0x0, 0x0, this.width, this.height);
            for (var cI = cD.getImageData(0x0, 0x0, this.width, this.height), cl = cI.data, cJ = cl.length, cf = 0x0; cf < cJ;) cl[cf] = cl[cf++] * (0x1 - cd) + cV * cd, cl[cf] = cl[cf++] * (0x1 - cd) + cq * cd, cl[cf] = cl[cf++] * (0x1 - cd) + cY * cd, cl[cf] = 0.8 * cl[cf++];
            cD.putImageData(cI, 0x0, 0x0);
            var cp = new KO();
            return cp.frameWithCanvas(cO, this._offsetX, this._offsetY), cp;
        }
    } ["generateTintImage"](cV, cq, cY, cd) {
        var Di = a0C,
            cO = document.createElement("canvas");
        cO.width = this.width, cO.height = this.height;
        var cD = cO.getContext('2d');
        cD.globalAlpha = 0x1, cD.globalCompositeOperation = "copy", cD.drawImage(cV[0x3], 0x0, 0x0), cD.globalCompositeOperation = "lighter", cq > 0x0 && (cD.globalAlpha = cq / 0xff, cD.drawImage(cV[0x0], 0x0, 0x0)), cY > 0x0 && (cD.globalAlpha = cY / 0xff, cD.drawImage(cV[0x1], 0x0, 0x0)), cd > 0x0 && (cD.globalAlpha = cd / 0xff, cD.drawImage(cV[0x2], 0x0, 0x0));
        var cI = new KO();
        return cI.frameWithCanvas(cO, this._offsetX, this._offsetY), cI;
    } ["generateRGBKs"]() {
        var Dc = a0C,
            cV = [],
            cq = document.createElement("canvas");
        cq.getContext('2d'), cq.width = this.width, cq.height = this.height;
        var cY = document.createElement("canvas");
        cY.width = this.width, cY.height = this.height;
        var cd = cY.getContext('2d');
        cd.drawImage(this._sheet, this._sx, this._sy, this.width, this.height, 0x0, 0x0, this.width, this.height);
        for (var cO = cd.getImageData(0x0, 0x0, this.width, this.height).data, cD = cO.length, cI = this.getImageCopy(), cl = this.getImageCopy(), cJ = this.getImageCopy(), cf = this.getImageCopy(), cp = 0x0; cp < cD; cp += 0x4) cI.toData[cp] = cO[cp], cI.toData[cp + 0x1] = 0x0, cI.toData[cp + 0x2] = 0x0, cI.toData[cp + 0x3] = cO[cp + 0x3], cl.toData[cp] = 0x0, cl.toData[cp + 0x1] = cO[cp + 0x1], cl.toData[cp + 0x2] = 0x0, cl.toData[cp + 0x3] = cO[cp + 0x3], cJ.toData[cp] = 0x0, cJ.toData[cp + 0x1] = 0x0, cJ.toData[cp + 0x2] = cO[cp + 0x2], cJ.toData[cp + 0x3] = cO[cp + 0x3], cf.toData[cp] = 0x0, cf.toData[cp + 0x1] = 0x0, cf.toData[cp + 0x2] = 0x0, cf.toData[cp + 0x3] = cO[cp + 0x3];
        cI.ctx.putImageData(cI.to, 0x0, 0x0), cl.ctx.putImageData(cl.to, 0x0, 0x0), cJ.ctx.putImageData(cJ.to, 0x0, 0x0), cf.ctx.putImageData(cf.to, 0x0, 0x0);
        var ch = new Image();
        ch.src = cI.canvas.toDataURL();
        var cA = new Image();
        cA.src = cl.canvas.toDataURL();
        var cM = new Image();
        cM.src = cJ.canvas.toDataURL();
        var cj = new Image();
        return cj.src = cf.canvas.toDataURL(), cV.push(ch), cV.push(cA), cV.push(cM), cV.push(cj), cV;
    } ["renderToCanvas"]() {
        var DB = a0C,
            cV = document.createElement("canvas"),
            cq = cV.getContext('2d');
        cV.width = this.width, cV.height = this.height;
        var cY = document.createElement("canvas");
        return cY.width = this.width, cY.height = this.height, cY.getContext('2d'), this._sheet ? cq.drawImage(this._sheet, this._sx, this._sy, this.width, this.height, 0x0, 0x0, this.width, this.height) : cq.drawImage(this.canvas, 0x0, 0x0, this.width, this.height, 0x0, 0x0, this.width, this.height), cq.globalAlpha = 0x1, cq.drawImage(cY, 0x0, 0x0), cV;
    }
}
class KD {
    constructor() {
        var Dk = a0C;
        this.loaded = !0x1, this.onLoad = null, this.spriteSheetLoaded = !0x1, this.gameSheet, this.frames = {}, this.keysImage = null, this.boostImage = null, this.bgGrid = null, this.skullPurple = null, this.skullDarkBlue = null, this.skullRed = null, this.skullPurpleGlow = null, this.skullDarkBlueGlow = null, this.skullRedGlow = null,
        this.gameSheetInfo = [
            //         sx     sy    w     h    anchx anchy
            ["crown", 0x17e, 0x66, 0x1f, 0x1b, 0.5, 0.5],
            ["food", 0x84, 0x2, 0x64, 0x64, 0.5, 0.5],
            ["glow", 0xea, 0x2, 0x62, 0x62, 0.5, 0.505],
            ["glow_hard", 0x14e, 0x2, 0x62, 0x62, 0.5, 0.505],
            ["grid", 0x2, 0x2, 0x80, 0x80, 0.5, 0.5],
            ["head_dot", 0x84, 0x68, 0x2f, 0x2e, 0.5, 0.5],
            ["lightning1", 0x19f, 0x66, 0x12, 0x1e, 0.5, 0.5],
            ["lightning2", 0x1e3, 0x63, 0x13, 0x1e, 0.526, 0.5],
            ["lightning3", 0x1cd, 0x63, 0x14, 0x1e, 0.5, 0.5],
            ["lightning_glow", 0x1b3, 0x63, 0x18, 0x24, 0.5, 0.5],
            ["particleDot", 0x1cd, 0x83, 0xe, 0x13, 0.5, 0.474],
            ["skullback", 0x12c, 0x85, 0x1c, 0x11, 0.5, 0.176],
            ["skullbase", 0xe2, 0x68, 0x23, 0x28, 0.514, 0.5],
            ["skulleyesblue", 0x2, 0x87, 0x18, 0xb, 0.5, 0.182],
            ["skulleyesgreen", 0x1dd, 0x83, 0x18, 0xb, 0.5, 0.182],
            ["skulleyesred", 0x17e, 0x83, 0x18, 0xb, 0.5, 0.182],
            ["skulleyesyellow", 0x2c, 0x84, 0x18, 0xb, 0.5, 0.182],
            ["skullglow", 0x1b2, 0x2, 0x3a, 0x40, 0.5, 0.5],
            ["skullgradient", 0x107, 0x66, 0x23, 0x28, 0.514, 0.5],
            ["spark0", 0x1b2, 0x44, 0x31, 0x1d, 0.51, 0.483],
            ["spark1", 0x12c, 0x66, 0x29, 0x1d, 0.61, 0.483],
            ["spark2", 0x157, 0x66, 0x25, 0x1e, 0.432, 0.5],
            ["trophy", 0xb5, 0x68, 0x2b, 0x2a, 0.5, 0.5],
            ["wall_stretch", 0x2, 0x84, 0x28, 0x1, 0.5, 0.5]
        ];
    } ["loadGameSpritesheet"]() {
        var DC = a0C;
        this.gameSheet = new Image(), this.gameSheet.src = "images/sheet.png?v=3", this.gameSheet.onload = () => {
            var Ds = DC;
            this.loadGameSpritesheetFrames(), this.spriteSheetLoaded = !0x0, this.loadPatterns(), this.skullDarkBlue = this.frames.skullbase.renderTintedFrame("#2a9de3"), this.skullDarkBlueGlow = this.frames.skullglow.renderTintedFrame("#1931d6"), this.skullPurple = this.frames.skullbase.renderTintedFrame("#c12ee5"), this.skullPurpleGlow = this.frames.skullglow.renderTintedFrame("#0000FF"), this.skullRed = this.frames.skullbase.renderTintedFrame("#ff2222"), this.skullRedGlow = this.frames.skullglow.renderTintedFrame("#552255"), this.loaded = !0x0, this.onLoad();
        };
    } ["loadPatterns"]() {
        var DT = a0C,
            cV = this.frames.grid.renderToCanvas();
        this.bgGrid = KT.app.context.createPattern(cV, "repeat");
    } ["loadGameSpritesheetFrames"]() {
        var Dx = a0C;
        for (var cV = this.gameSheetInfo.length, cq = 0x0; cq < cV; cq++) {
            var cY = this.gameSheetInfo[cq],
                cd = new KO();
            cd.setFrameInfo(cY, this.gameSheet), this.frames[cY[0x0]] = cd;
        }
    } ["load"](cV) {
        var DL = a0C;
        this.onLoad = cV, this.loadGameSpritesheet(), this.keysImage = new Image(), this.keysImage.src = "images/arrows.png", this.keysImage.onload = function() {}, this.boostImage = new Image(), this.boostImage.src = "images/close-to-boost-w.png", this.boostImage.onload = function() {};
    } ["loadTintImage"](cV, cq, cY) {
        var Db = a0C,
            cd = document.createElement("canvas"),
            cO = cd.getContext('2d'),
            cD = cV.width,
            cI = cV.height;
        cd.width = cD, cd.height = cI;
        var cl = document.createElement("canvas");
        cl.width = cD, cl.height = cI;
        var cJ = cl.getContext('2d');
        cJ.fillStyle = cY, cJ.fillRect(0x0, 0x0, cl.width, cl.height), cJ.globalCompositeOperation = "destination-atop", cJ.drawImage(cV, 0x0, 0x0), cO.globalAlpha = 0x1, cO.drawImage(cl, 0x0, 0x0), cq(cd);
    }
}
class Kt {
    constructor() {
        var DV = a0C;
        this.margin = 0x14, this.mapSide = 0x78, this.mapBorder = 0x14, this.detail = 0x100, this.mapInfo = [], this.preRenderedColliderCanvas = null, this.lastZoomAdjust = 0x0;
    } ["radiusFromMinimapRadiusPerc"](cV) {
        var Dq = a0C;
        return "ZwOPa" !== "ZwOPa" ? KM(KE, Kb, KN) : (0x3 + 0x8 * cV) * (0x1f40 / KT.arenaWidth);
    } /*["radiusToMinimapRadius"](cV) {
        var DY = a0C,
            cq = (cV - 0x1) / (0x36 * KT.gameZoom);
        return this.radiusFromMinimapRadiusPerc(cq);
    }*/ ["draw"](cV) {
        var Dd = a0C,
            cq = KT.screenWidth - this.mapSide * KT.zoomAdjust - this.margin * KT.zoomAdjust,
            cY = KT.screenHeight - this.mapSide * KT.zoomAdjust - this.margin * KT.zoomAdjust;
        cV.save();
        var cd = KT.zoomAdjust != this.lastZoomAdjust;
        if (this.lastZoomAdjust = KT.zoomAdjust, this.preRenderedColliderCanvas && !cd || this.preRenderColliders(), cV.drawImage(this.preRenderedColliderCanvas, cq - this.mapBorder * KT.zoomAdjust, cY - this.mapBorder * KT.zoomAdjust), KT.localPlayer && null != KT.localPlayer.renderedPoints) {
            for (var cO = KT.localPlayer.renderedPoints, cD = [], cI = cO.length, cl = 0x0; cl < cI; cl++) {
                if ("DhWrk" === "WeKng") {
                    var cN = [];
                    for (cJ = 0x0; Kp < i0; Kz++) {
                        var cE = Kq.getFloat32(KY, !0x0);
                        Kd += 0x4;
                        var cS = -KO.getFloat32(KD, !0x0),
                            cP = {};
                        cP.x = cE * KI.GAME_SCALE, cP.y = cS * Kl.GAME_SCALE, (Kt += 0x4, cN.push(cP));
                    }
                    if (this.id == Kr.localPlayerID && Ku.antiLagEnabled) {
                        var cX = KJ.min(this.pendingConfirmationPointCount, Kf);
                        cX < 0x0 && (cX = 0x0);
                        var cQ = Kp - this.pendingConfirmationPointCount;
                        for (this.pendingConfirmationPointCount, Kh = 0x0; KA < cX; KM++) null == cN[c4 + cQ] || (this.points[Kj] = cN[KN + cQ]);
                        for (KE = 0x0; KS < KP - cX; KX++) this.pointServerFix.unshift(cN[KQ]);
                        this.pendingConfirmationPointCount -= KZ;
                    } else {
                        for (Kg = Kn - 0x1; Ku >= 0x0; Kw--) this.points.unshift(cN[KU]);
                        this.playSounds && KG.soundManager.playSound(KW, 0.6 * this.lastDistVolume * KH.masterVolume, 0x1, 0x0, null);
                    }
                } else {
                    var cJ = cO[cl].x + KT.arenaWidth / 0x2 - KT.arenaCenterX,
                        cf = cO[cl].y + KT.arenaHeight / 0x2 - KT.arenaCenterY,
                        cp = cJ / KT.arenaWidth,
                        ch = cf / KT.arenaHeight,
                        cA = {};
                    cA.x = cp, cA.y = ch, cD.push(cA);
                }
            }
            cV.strokeStyle = "hsl(" + KT.localPlayer.hue + ", 100%, 50%)", cV.lineWidth = 0x2;
            var cM = cD.length;
            for (cJ = cD[0x0].x, cf = cD[0x0].y, cV.beginPath(), cV.moveTo(cq + cJ * this.mapSide * KT.zoomAdjust, cY + cf * this.mapSide * KT.zoomAdjust), cl = 0x1; cl < cM; cl++) cJ = cD[cl].x, cf = cD[cl].y, cV.lineTo(cq + cJ * this.mapSide * KT.zoomAdjust, cY + cf * this.mapSide * KT.zoomAdjust);
            cV.stroke(), KT.kingID > 0x0 && (cJ = KT.kingPosition.x + KT.arenaWidth / 0x2 - KT.arenaCenterX, cf = KT.kingPosition.y + KT.arenaHeight / 0x2 - KT.arenaCenterY, cp = cJ / KT.arenaWidth, ch = cf / KT.arenaHeight, cV.translate(cq + cp * this.mapSide * KT.zoomAdjust, cY + ch * this.mapSide * KT.zoomAdjust), cV.scale(0.5, 0.5), KT.resources.frames.crown.draw(cV));
        }
        cV.restore();
    } ["update"](cV) {} ["updateBoundaries"]() {} ["preRenderColliders"]() {
        var DO = a0C;
        this.preRenderedColliderCanvas = document.createElement("canvas");
        var cV = this.preRenderedColliderCanvas.getContext('2d');
        this.preRenderedColliderCanvas.width = (this.mapSide + 0x2 * this.mapBorder) * KT.zoomAdjust, this.preRenderedColliderCanvas.height = (this.mapSide + 0x2 * this.mapBorder) * KT.zoomAdjust, cV.lineWidth = 0x4, cV.strokeStyle = "#00ffff", cV.fillStyle = "#002222", cV.shadowBlur = 0xa, cV.shadowColor = "#00ffff", cV.beginPath(), cV.rect(this.mapBorder * KT.zoomAdjust, this.mapBorder * KT.zoomAdjust, this.mapSide * KT.zoomAdjust, this.mapSide * KT.zoomAdjust), cV.stroke(), cV.globalAlpha = 0.5, cV.shadowBlur = 0x0, cV.fill(), cV.globalAlpha = 0x1;
    }
}

class Kl {
    constructor() {
        var DD = a0C,
            cV = {};
        cV.crash = [0x0, 804.0589569160998], cV.electroloop = [0x7d0, 1821.1791383219954, 0x1], cV.foodgrab = [0x1388, 461.29251700680294], cV.lineloop = [0x1b58, 2946.1224489795923, 0x1], cV.lineloopfast = [0x2af8, 0x7d0, 0x1], cV.spark = [0x36b0, 87.93650793650798], cV.turn = [0x3e80, 0x1f4], (this.sound = null, this.loaded = !0x1, this.lastVolume = 0x1, this.playingSounds = {}, this.sprite = cV);
    } ["load"](cV) {
        var Dt = a0C;
        this.sound = new KI.Howl({
            'urls': ["sounds/out.ogg", "sounds/out.m4a", "sounds/out.mp3", "sounds/out.ac3"],
            'sprite': this.sprite,
            'onload': function() {
                var DI = Dt;
                KT.soundManager.loaded = !0x0, cV && cV();
            }
        });
    } ["playSound"](cV, cq, cY, cd, cO) {
        var Dl = a0C;
        if (this.loaded && KT.focus) {
            cq *= KT.masterVolume, KT.firstClick ? KT.UIVisible && (cq *= 0.3) : cq = 0x0;
            var cD = this.playingSounds[cV],
                cI = this.sprite[cV];
            cD || (this.playingSounds[cV] = 0x0);
            var cl = cd;
            if (!(cl > 0x0 && this.playingSounds[cV] >= cl)) {
                this.sound.play(cV, function(cf) {
                    var DJ = Dl,
                        cp = KT.soundManager.sound._nodeById(cf);
                    cp && cp.bufferSource && (cp.bufferSource.playbackRate.value = cY), KT.soundManager.sound.volume(cq, cf), cO && cO(cf);
                });
                var cJ = cI[0x1];
                0x0 != cd && this.playingSounds[cV]++, setTimeout(function() {
                    var Df = Dl;
                    0x0 != cd && KT.soundManager.playingSounds[cV]--;
                }, cJ);
            }
        }
    } ["stop"](cV) {
        var Dp = a0C;
        this.loaded && cV.stop();
    } ["setVolume"](cV) {
        var Dh = a0C;
        this.lastVolume = cV, this.sound.volume(cV);
    }
}
class KJ {
    constructor() {
        var DA = a0C,
            cV = {};
        cV.h = '61', cV.s = "100%", cV.l = "100%", cV.a = 0x1;
        var cq = {};
        cq.x = 0x0, cq.y = 0x0;
        var cY = {};
        cY.x = 0x0, cY.y = 0x0, (this.color = cV, this.rotation = 0x0, this.scale = 0x1, this.pos = cq, this.speed = cY, this.time = 0x0, this.active = !0x1, this.used = !0x1, this.rotationSpeed = 0x0);
    } ["draw"](cV, cq) {
        var DM = a0C;
        cV.save(), cV.translate(this.pos.x, this.pos.y), cV.scale(this.scale, this.scale), cV.rotate(this.rotation), this.color.h, this.color.s, this.color.l, this.color.a, cV.translate(0xa, -0x2), cV.globalAlpha = this.color.a, cq.draw(cV), cV.restore();
    }
}
class Kf {
    constructor() {
        var De = a0C,
            cV = {};
        cV.r = 0xc8, cV.g = 0xc8, cV.b = 0xc8, cV.a = 0x1, (this.x = 0x0, this.y = 0x0, this.color = cV, this.rotation = 0x0, this.scale = 0x1, this.particles = [], this.particleCount = 0x0, this.life = 0x190, this.gravity = {}, this.speed = {}, this.debreeAge = 0x0, this.alpha = 0x1, this.particleFrame, this.enabled = !0x1);
    } ["setEnabled"](cV) {
        var Dj = a0C;
        this.enabled || this.resetSystem(), this.enabled = cV;
    } ["init"](cV, cq, cY) {
        var DN = a0C;
        this.particleCount = cV, this.gravity.x = 0x0, this.gravity.y = 0x0, this.speed.x = 0x0, this.speed.y = 0x0, this.x = cq, this.y = cY, this.life, this.particleCount;
        for (let cd = 0x0; cd < this.particleCount; cd++) {
            if ("IEnbO" !== "IEnbO") {
                var cD = cY.parentNode;
                return cD && 0xb !== cD.nodeType ? cD : null;
            } else {
                const cD = new KJ();
                this.resetParticle(cD), cD.active = !0x1, cD.time = 0x270f, this.particles.push(cD);
            }
        }
    } ["resetSystem"]() {
        var DE = a0C;
        const cV = this.life / this.particleCount;
        for (let cq = 0x0; cq < this.particleCount; cq++) {
            const cY = this.particles[cq];
            this.resetParticle(cY), cY.active = !0x1, cY.time = cV * cq;
        }
    } ["resetParticle"](cV) {
        var DS = a0C;
        cV.pos.x = this.x, cV.pos.y = this.y, cV.speed.x = this.speed.x, cV.speed.y = this.speed.y, cV.time = 0x0, cV.color.a = 0x1, cV.rotationSpeed = (Math.random() - 0.5) / 0xa, cV.rotation = 0x168 * Math.random();
    } ["update"](cV) {
        var DP = a0C;
        cV = 0x3e8 / 0x3c;
        for (let cY = 0x0; cY < this.particleCount; cY++) {
            const cd = this.particles[cY];
            if (cd.time >= this.life && (cd.active || (cd.active = !0x0, cd.time = cd.time % this.life), this.enabled && this.resetParticle(cd)), cd.time += cV, cd.active) {
                var cq = cd.time / this.life;
                cq > 0x1 && (cq = 0x1), cd.pos.x += 0x1 * cd.speed.x, cd.pos.y += 0x1 * cd.speed.y;
                const cO = 0.1,
                    cD = 0.4;
                cd.scale = cq >= 0x0 && cq < cO ? cD : cD + 0.3 * (cq - cO), cd.rotation += cd.rotationSpeed;
                const cI = 0.1,
                    cl = 0.5;
                if (cd.color.a = 0x1, cq >= 0x0 && cq < cI) {
                    const cJ = cq / cI;
                    cd.color.a = cJ;
                } else cq > cl && (cd.color.a = 0x1 - (cq - cl) / (0x1 - cl));
                cd.color.a *= this.alpha, cd.speed.x += 0x1 * this.gravity.x, cd.speed.y += 0x1 * this.gravity.y;
            }
        }
    } ["setPosition"](cV, cq) {
        this.x = cV, this.y = cq;
    } ["setLife"](cV) {
        var DX = a0C;
        "NgRdY" !== "RcdUX" ? this.life = cV : (KU.timers.push(KM), KE.fx.start());
    } ["draw"](cV) {
        var DQ = a0C;
        for (let cq = this.particleCount - 0x1; cq >= 0x0; cq--) {
            const cY = this.particles[cq];
            cY.active && cY.draw(cV, this.particleFrame);
        }
    }
}

window.c8 = [document.getElementById("slot-1"), document.getElementById("slot-2"), document.getElementById("slot-3")];

var c9 = 0;

const cK = new ResizeObserver(cV => {
    var JF = dw;
    for (let cY of cV) {
        const {
            width: cd,
            height: cO
        } = cY.contentRect;
        if (cd > 0x0 && cO > 0x0) {
            if ("slot-1" === cY.target.id) {
                let cD = document.querySelector("#dynamic-styles-slot-1");
                var cq = 0x3e8;
                0x2d8 == cd ? cq = 0x42e : 0x3ca == cd && (cq = 0x523), cD && (cD.textContent = "\n                    @media screen and (min-width: " + cq + "px) and (min-height: 790px) {\n                        #slot-1 {\n                            display: block !important;\n                        }\n                    }\n                    ");
            } else {
                if ("slot-3" === cY.target.id) {
                    let cI = document.querySelector("#dynamic-styles-slot-3");
                    cq = 0x3e8, c9 = cd, 0x2d8 == cd ? cq = 0x94 : 0x3ca == cd && (cq = 0x48d), cI && (cI.textContent = "\n                    @media screen and (min-width: " + cq + "px) and (min-height: 690px) {\n                        #slot-3 {\n                            display: block !important;\n                        }\n                    }\n                    ");
                }
            }
        }
        if ("slot-3" === cY.target.id) {
            let cl = document.getElementById("slot-3-wrapper");
            ("block" === cY.target.style.display || null !== cY.target.querySelector("iframe")) && cd > 0x0 && cO > 0x0 ? (cl.style.width = cd + 0x18 + 'px', KT.isInGame && (cl.style.display = "block"), window.ad3Visible = !0x0) : (cl.style.display = "none", window.ad3Visible = !0x1), ci();
        } else "slot-1" === cY.target.id && ci();
    }
});

function ci() {
    var Ja = dw;
    const cV = document.getElementById("slot-3"),
        cq = document.getElementById("slot-3-wrapper"),
        cY = window.innerWidth;
    if (0x3ca == c9) {
        if (cY < (cO = 0x514)) {
            var cd = (cO - cY) / 0x2;
            cV.style.left = "calc(50% - " + cd + "px)", cq.style.left = "calc(50% - " + cd + "px - 18px)";
        } else cV.style.left = "50%";
    } else {
        if (0x2d8 == c9) {
            var cO;
            cY < (cO = 0x426) ? (cd = (cO - cY) / 0x2, cV.style.left = "calc(50% - " + cd + "px)", cq.style.left = "calc(50% - " + cd + "px - 18px)") : cV.style.left = "50%";
        }
    }
}
c8.forEach(cV => {
    var f0 = dw;
    cV && cK.observe(cV);
}), window.clickCloseAd = function() {
    var f1 = dw;
    const cV = document.getElementById("slot-3"),
        cq = document.getElementById("slot-3-wrapper");
    if (cq && (cq.style.display = "none"), cV) {
        cV.style.cssText = "display: none !important";
        const cY = cV.getElementsByTagName("iframe");
        for (let cd of cY) cd.style.cssText = "display: none !important";
    }
    window.adClosed = !0x0;
}, window.onresize = function() {
    ci();
};
var cc, cB = window.location.href.split('/');

// [IMPORTANT]
function ck() {
    KT.now = +new Date();
    var cV = 0x0;
    KT.prevNow > 0x0 && (cV = KT.now - KT.prevNow),
    KT.prevNow = KT.now,
    KT.statsFPS && KT.statsFPS.begin(),
    KT.app.update(cV),
    KT.app.draw(cV),
    KT.statsFPS && KT.statsFPS.end(),
    window.requestAnimationFrame && window.requestAnimationFrame(ck),
    KT.lastFocus && (KT.lastFocus = !0x1);
}

// called on window resize!!
function cC() {
    KT.app && KT.app.resizeCanvas(),
    null != KT.network && KT.network.hasConnection && (
        cc && clearTimeout(cc),
        cc = setTimeout(KT.network.sendResize, 0xc8)
    );
}

function cs() {
    var f4 = dw,
        cV = "LOW";
    KT.highQuality && (cV = "HIGH");
    var cq = $("#graphicsID")[0x0];
    cq && (cq.childNodes[0x0].data = "GRAPHICS: " + cV);
}
var cT = {};
cT.debug = !0x1, cT.track_pageview = !0x0, cT.persistence = "localStorage", (KT.domain = cB[0x2], KT.domainSplit = KT.domain.split('.'), KT.domainSplitLen = KT.domainSplit.length, window.mixpanel && window.mixpanel.init("208ce64093308da8075ba320f97c12fd", cT), window.wasKilled = function() {
    var f5 = dw;
    KT.input.angle = Math.PI, KT.input.throttle = 0x0, KT.killCount++, KT.killStreak = 0x0, window.localStorage.killCount = KT.killCount, KT.hud.fastHideTalkLayer();
}, window.inIframe = function() {
    var f6 = dw;
    try {
        return window.self !== window.top;
    } catch (cV) {
        return !0x0;
    }
}, window.didFirstClick = function() {}, window.resetCountdown = function() {
    var f7 = dw;
    KT.countDownBeginDate = +new Date();
}, window.hideContinueScreen = function() {
    var f8 = dw;
    $("#continueTop").hide(), $("#continueBR").hide(), $("#continue").hide(), $("#nickInput").show(), $("#skinPanel").hide(), $("#howto").show(), $("#beta").show(), window.resetCountdown();
}, window.updateTitle = function() {
    var f9 = dw,
        cV = Object.keys(KT.entities).length;
    cV > 0x0 && KT.debug ? document.title = KT.gameName + ' (' + KT.playerCount + ', ' + cV + ')' : document.title = KT.gameName + '!';
}, window.clickPlay = function(cV) {
    KT.app.clearSpeedupTutorial()
    if (!KT.network.hasConnection) {
        $("#topGui").hide();
        $("#topGuiConnecting").show();
        return;
    }
    if (!window.adClosed && window.ad3Visible) {
        $("#slot-3-wrapper").show();
    }

    if (KT.isInGame) {
        window.hideUI()
    } else {
        window.localStorage.nick = cV;
        KT.playClicks++;
        KT.input.mouseMoved = false;
        KT.network.sendNick(cV, KT.countingDown);
        if (KT.playClicks < 6 && KT.hud && KT.playClicks % 3 == 0) {
            KT.hud.showTip("Press 'M' to Toggle Sounds", 0xfa0);
        }
        if (KT.countingDown) {
            window.hideContinueScreen();
            KT.countingDown = false;
        }
    }
}, window.updateStats = function() {
    var fi = dw,
        cV;
   $("#basePanel").hide();
   if (!KT.spectating) {
      $("#statsPanel").show()
   }
    if (KT.statKillReason == KT.KILL_REASON_KILLED) {
        var cq = KT.statLastKiller;
        cV = "KILLED BY<br>" + $("<div>").text(cq).html();
    } else cV = "COLLIDED";
    $("#stat-title")[0x0].innerHTML = cV, $("#stat-length")[0x0].innerText = KT.statLength, $("#stat-ks")[0x0].innerText = KT.statKillStreak, $("#stat-top")[0x0].innerText = KT.statTopPosition;
    var cY = window.localStorage.bestLength;
    (cY < KT.statLength || null == cY) && (cY = KT.statLength, window.localStorage.bestLength = KT.statLength), $("#stat-blength")[0x0].innerText = cY;
    var cd = window.localStorage.bestKillStreak;
    (cd < KT.statKillStreak || null == cd) && (cd = KT.statKillStreak, window.localStorage.bestKillStreak = cd), $("#stat-bks")[0x0].innerText = cd;
    var cO = (+new Date() - KT.statBeginTime) / 0x3e8;
    if (cO > 0x3c) {
        var cD = Math.floor(cO / 0x3c);
        cO = cD + 'm ' + (cO - 0x3c * cD).toFixed(0x0) + 's';
    } else cO = cO.toFixed(0x1) + 's';
    $("#stat-time")[0x0].innerText = cO, KT.statTopPosition = 0x0, KT.statLength = 0x0, KT.statKillStreak = 0x0;
}, window.hideUI = function() {
    var fc = dw;
    if ("tugwP" !== "hQlLN") $("#overlay").hide(), KT.UIVisible = !0x1;
    else return KY.getAttribute('id') === KU;
}, window.fadeinUINow = function() {
    var fB = dw;
    $("#overlay").fadeIn(0x1f4), KT.focus && $("#nick").focus(), KT.network.hasConnection && (KT.killCount >= KT.KILLS_TO_FOLLOW && window.didFirstClick && window.updateStats(), KT.killCount < KT.KILLS_TO_FOLLOW && (KT.app.initSpeedupTutorial(), KT.app.fadeOutGame()));
}, window.fadeinUI = function() {
    var fk = dw;
    KT.UIVisible = !0x0, KT.isInGame || (KT.localPlayer = null), KT.network.kickedInactive || setTimeout(fadeinUINow, KT.EZGUI_fadeinUITime === undefined ? 1000 : KT.EZGUI_fadeinUITime);
}, window.displayNickInput = function() {
    var fC = dw,
        cV = KT.network.captchaAnimation ? 0x320 : 0x0;
    KT.network.captchaAnimation = !0x1, setTimeout(function() {
        var fs = fC;
        $("#copyLink").fadeIn(0x12c), $("#topGui").show(), $("#topGuiConnecting").hide(), $(".btn-needs-server").removeAttr("disabled"), $("#nick").focus();
    }, cV);
}, window.showTip = function(cV) {
    var fT = dw;
    KT.nextTipID = cV, KT.changeTip = !0x0;
});
var cx = $("#tips")[0x0];

function cL() {
    var fx = dw,
        cV = navigator.userAgent.indexOf("Chrome") > -0x1,
        cq = navigator.userAgent.indexOf("Safari") > -0x1;
    return cV && cq && (cq = !0x1), cq;
}

function cb() {
    var fL = dw;
    KT.network && KT.network.disconnect();
}
setInterval(function() {
    var fb = dw;
    if (KT.UIVisible) {
        var cV = 0x1 / 0x4 * (0x2 * Math.PI);
        KT.opacityVal += 0.3, KT.opacityVal > cV && 0x0 == KT.changeTip && (KT.opacityVal = cV);
        var cq = (Math.sin(KT.opacityVal) + 0x1) / 0x2;
        if (KT.opacityVal > 0x3 / 0x4 * (0x2 * Math.PI)) {
            var cY;
            switch (KT.tipTextID = KT.nextTipID, KT.opacityVal = KT.opacityVal - 0x2 * Math.PI, KT.changeTip = !0x1, KT.tipTextID) {
                case 0x0:
                    cY = KT.textTip1;
                    break;
                case 0x1:
                    cY = KT.textTip2;
                    break;
                default:
                    cY = KT.textTip3;
            }
            cx.innerHTML = cY;
        }
        cx.style.opacity = Math.sqrt(cq, 0x5);
    }
}, 0x32), cx.innerHTML = KT.textTip1, window.onbeforeunload = function() {
    var fV = dw;
    return KT.isInGame ? "Are you sure you want to quit?" : void 0x0;
}, document.oncontextmenu = function() {
    return !0x1;
}, window.toggleSound = function() {
    var fq = dw,
        cV = "images/sound_off.png";
    0x1 == KT.muteVolume ? (KT.muteVolume = 0x0, KT.masterVolume = KT.muteVolume, KT.hud && KT.hud.showTip("Sounds Disabled", 0xbb8)) : 0x0 == KT.muteVolume && (KT.muteVolume = 0x1, KT.masterVolume = 0x1, cV = "images/sound_on.png", KT.hud && KT.hud.showTip("Sounds Enabled", 0xbb8)), window.localStorage.muteVol = KT.muteVolume, $("#soundImg")[0x0].src = cV;
}, 0x0 == KT.muteVolume && (KT.muteVolume = 0x1, window.toggleSound()), window.copyRoomLink = function() {
    var fY = dw;
    $("#copyLink").hide(), $("#copyLinkBox").show();
    var cV = $("#roomlinkInput")[0x0];
    cV.value = "https://" + KT.gameName + '/#' + KT.network.roomID, KT.copyingLink = !0x0, cL() && ($("#copyButton")[0x0].childNodes[0x0].data = "Close", $("#safariTooltip").show()), setTimeout(function() {
        var fd = fY;
        cV.setSelectionRange(0x0, cV.value.length), cV.select(), cV.focus();
    }, 0x64);
}, window.setCopy = function() {
    var fO = dw,
        cV = $("#roomlinkInput")[0x0];
    if (cV.value = "https://" + KT.gameName + '/#' + KT.network.roomID, cV.setSelectionRange(0x0, cV.value.length), cV.select(), cV.focus(), cL()) return $("#copyLinkBox").hide(), $("#copyLink").show(), void(KT.copyingLink = !0x1);
    try {
        navigator.clipboard.writeText(cV.value);
    } catch (cq) {}
    $("#copycheckimage").hide(), $("#copyLink").show(), $("#copyLinkBox").hide(), $("#overlay2").fadeIn(0xc8), $("#pfArrow").hide(), $("#pfText").hide(), setTimeout(function() {
        var fD = fO;
        $("#copycheckimage").fadeIn(0x12c);
    }, 0xc8), setTimeout(function() {
        var ft = fO;
        $("#overlay2").fadeOut(0xc8), $("#nick").focus();
    }, 0x3e8), KT.copyingLink = !0x1;
}, window.onblur = function() {
    var fI = dw;
    for (var cV in (window.didSendLoadingTime = !0x0, KT.debug || (KT.disconnectTimer = setTimeout(cb, 0x493e0)), KT.focus = !0x1, KT.masterVolume = 0x0, KT.entities)) {
        var cq = KT.entities[cV];
        0x1 == cq.snake && cq.onBlur();
    }
    KT.network.webSocket && !KT.network.hasConnection && KT.network.stopConnecting();
}, window.onfocus = function(cV) {
    var fl = dw;
    if (cV.target == window && !(KT.focus || cV && cV.target != window)) {
        for (var cq in (KT.disconnectTimer && (clearTimeout(KT.disconnectTimer), KT.disconnectTimer = null), KT.discardNextFps = !0x0, KT.focus = !0x0, KT.lastFocus = !0x0, KT.entities)) KT.entities[cq].resume();
        KT.network.kickedInactive ? window.setReconnect() : !KT.network || KT.network.hasConnection || window.inIframe() ? KT.UIVisible && $("#nick").focus() : KT.network.tryConnect(), 0x1 == KT.muteVolume && (KT.masterVolume = 0x1);
    }
}, window.localStorage.nick && ($("#nick")[0x0].value = window.localStorage.nick), window.setReconnect = function() {
    var fJ = dw;
    !KT.network || KT.network.hasConnection || window.inIframe() || (KT.network.kickedInactive = !0x1, KT.network.getServerAndConnect(), $("#roomTimeout").hide(), $("#topGuiConnecting").show());
}, window.setContinue = function() {
    var ff = dw;
    $("#topGui").show(), $("#roomFailed").hide(), inIframe() || (parent.location.hash = ''), KT.network.getServerAndConnect();
}, window.toggleGraphics = function() {
    var fp = dw;
    KT.highQuality = !KT.highQuality, KT.app.resizeCanvas(), window.localStorage.lq = !KT.highQuality, cs();
}, window.slog = function(cV, cq = 0x0) {
    // if (cq > 0x0) return;
    var cY = {};
    cY.hour12 = !0x1;
    const cd = new Date(),
            cO = '[' + (cd.toLocaleTimeString([], cY) + '.' + cd.getMilliseconds().toString().padStart(0x3, '0')) + '] ' + cV;
    console.log(cO);
}, window.takeScreenshot = function() {
    var fA = dw;
    const cV = document.createElement("canvas");
    cV.width = KT.canvas.width, cV.height = KT.canvas.height, cV.getContext('2d').drawImage(KT.canvas, 0x0, 0x0, cV.width, cV.height);
    const cq = cV.toDataURL("image/png"),
        cY = document.createElement('a');
    cY.href = cq, cY.download = "screenshot.png", cY.click();
}, (function() {
    var fM = dw;
    KT.browser = (function() {
        var fe = fM;
        const cD = navigator.userAgent;
        return cD.indexOf("Firefox") > -0x1 ? 0x1 : cD.indexOf("Edg") > -0x1 ? 0x2 : cD.indexOf("OPR") > -0x1 || cD.indexOf("Opera") > -0x1 ? 0x3 : cD.indexOf("Chrome") > -0x1 ? 0x4 : cD.indexOf("Safari") > -0x1 ? 0x5 : cD.indexOf("Trident") > -0x1 ? 0x6 : 0x7;
    }()), KT.sdm = document.body.getAttribute("sdm"), KT.statsVisible = "true" === window.localStorage.statsVisible, KT.statsFPS = new c6(), KT.statsFPS.domElement.style.position = "absolute", KT.statsFPS.domElement.style.right = "0px", KT.statsFPS.domElement.style.bottom = "230px", document.getElementById("stats").appendChild(KT.statsFPS.domElement), KT.statsEnts = new c6(), KT.statsEnts.setMode(0x1), KT.statsEnts.domElement.style.position = "absolute", KT.statsEnts.domElement.style.right = "0px", KT.statsEnts.domElement.style.bottom = "278px", document.getElementById("stats").appendChild(KT.statsEnts.domElement), KT.statsLAG = new c6(), KT.statsLAG.setMode(0x1), KT.statsLAG.domElement.style.position = "absolute", KT.statsLAG.domElement.style.right = "0px", KT.statsLAG.domElement.style.bottom = "326px", document.getElementById("stats").appendChild(KT.statsLAG.domElement), KT.statsVisible || (KT.statsEnts.domElement.style.visibility = "hidden", KT.statsFPS.domElement.style.visibility = "hidden", KT.statsLAG.domElement.style.visibility = "hidden"), setInterval(function() {
        var fj = fM;
        if (KT.focus) {
            if (KT.discardNextFps) KT.discardNextFps = !0x1;
            else {
                var cD = KT.statsFPS.getFps();
                KT.lastFpsValues.push(cD), KT.lastFpsValues.length > 0x5 && KT.lastFpsValues.shift(), KT.averageFps = (KT.lastFpsValues.reduce((cI, cl) => cI + cl, 0x0) / KT.lastFpsValues.length).toFixed(0x0);
            }
        }
    }, 0x3e8);
    var cV, cq = window.location.search;
    '?' == cq.charAt(0x0) && (cq = cq.slice(0x1));
    for (var cY = cq.split('&'), cd = 0x0; cd < cY.length; cd++) {
        var cO = cY[cd].split('=');
        KT.queryString[cO[0x0]] = cO[0x1];
    }

    window.stats = !!KT.queryString.stats, "true" == window.localStorage.lq && (KT.highQuality = !0x1), null == window.localStorage.plCCTime || null != window.localStorage.plCC && 0x2 != window.localStorage.plCC.length ||
    +new Date() - window.localStorage.plCCTime > 0x1b77400 ? (
    cV = '', KT.isSecure && (cV = 's'),
    KT.countryCode = 'RO', window.localStorage.plCC = KT.countryCode, window.localStorage.plCCTime = +new Date()
    // $.get("http" + cV + "://ip2l.wings.io/cc", function(cD) {
    //    var fN = fM;
    //    KT.countryCode = cD.substring(0x0, 0x2), window.localStorage.plCC = KT.countryCode, window.localStorage.plCCTime = +new Date(), KT.countryCode;
    // }, "text")
    ) : KT.countryCode = window.localStorage.plCC,
    window.devicePixelRatio && (KT.defaultRetinaValue = window.devicePixelRatio > 1.5 ? 0x2 : 0x1),
    KT.app = new c5(document.getElementById("xcanvas")),
    window.addEventListener("resize", cC, !0x1),
    KT.input = new Input(),
    KT.input.addListeners(),
    window.requestAnimationFrame ? window.requestAnimationFrame(ck) : setInterval(ck, 0x3e8 / 0x3c),
    $("#overlay").show(),
    cs();
}());
i18n_lang = (window.navigator.userLanguage || window.navigator.language || 'en').split('-')[0];
//i18n_lang = 'de';
if (!i18n_dict.hasOwnProperty(i18n_lang)) i18n_lang = "en";

i18n = i18n_dict[i18n_lang];

(function(d, e) {
    function Nb() {
        Ga = !0;
        eb();
        setInterval(eb, 18E4);
        L = Ha = document.getElementById("canvas");
        f = L.getContext("2d");
        L.onmousedown = function(a) {
            if (fb) {
                var b = a.clientX - (5 + h / 5 / 2),
                    c = a.clientY - (5 + h / 5 / 2);
                if (Math.sqrt(b * b + c * c) <= h / 5 / 2) {
                    ba();
                    H(17);
                    return
                }
            }
            na = 1 * a.clientX;
            oa = 1 * a.clientY;
            Ia();
            ba()
        };
        L.onmousemove = function(a) {
            na = 1 * a.clientX;
            oa = 1 * a.clientY;
            Ia()
        };
        L.onmouseup = function() {};
        /firefox/i.test(navigator.userAgent) ? document.addEventListener("DOMMouseScroll", gb, !1) : document.body.onmousewheel = gb;
        var a = !1,
            b = !1,
            c = !1;
        d.onkeydown = function(p) {
            32 != p.keyCode || a || (ba(), H(17), a = !0);
            81 != p.keyCode || b || (H(18), b = !0);
            87 != p.keyCode || c || (ba(), H(21), c = !0);
            27 == p.keyCode && pa(300)
        };
        d.onkeyup = function(p) {
            32 == p.keyCode && (a = !1);
            87 == p.keyCode && (c = !1);
            81 == p.keyCode && b && (H(19), b = !1)
        };
        d.onblur = function() {
            H(19);
            c = b = a = !1
        };
        d.onresize = hb;
        d.requestAnimationFrame(ib);
        setInterval(ba, 40);
        z && e("#region").val(z);
        jb();
        qa(e("#region").val());
        0 == Ja && z && M();
        pa(0);
        hb();
        d.location.hash && 6 <= d.location.hash.length && kb(d.location.hash)
    }

    function gb(a) {
        N *=
            Math.pow(.9, a.wheelDelta / -120 || a.detail || 0);
        1 > N && (N = 1);
        N > 4 / g && (N = 4 / g)
    }

    function Ob() {
        if (.4 > g) ca = null;
        else {
            for (var a = Number.POSITIVE_INFINITY, b = Number.POSITIVE_INFINITY, c = Number.NEGATIVE_INFINITY, p = Number.NEGATIVE_INFINITY, d = 0; d < v.length; d++) {
                var e = v[d];
                !e.H() || e.M || 20 >= e.size * g || (a = Math.min(e.x - e.size, a), b = Math.min(e.y - e.size, b), c = Math.max(e.x + e.size, c), p = Math.max(e.y + e.size, p))
            }
            ca = Pb.X({
                ba: a - 10,
                ca: b - 10,
                Z: c + 10,
                $: p + 10,
                fa: 2,
                ha: 4
            });
            for (d = 0; d < v.length; d++)
                if (e = v[d], e.H() && !(20 >= e.size * g))
                    for (a = 0; a < e.a.length; ++a) b =
                        e.a[a].x, c = e.a[a].y, b < t - h / 2 / g || c < u - q / 2 / g || b > t + h / 2 / g || c > u + q / 2 / g || ca.Y(e.a[a])
        }
    }

    function Ia() {
        ra = (na - h / 2) / g + t;
        sa = (oa - q / 2) / g + u
    }

    function eb() {
        null == ta && (ta = {}, e("#region").children().each(function() {
            var a = e(this),
                b = a.val();
            b && (ta[b] = a.text())
        }));
        e.get(da + "info", function(a) {
            var b = {},
                c;
            for (c in a.regions) {
                var d = c.split(":")[0];
                b[d] = b[d] || 0;
                b[d] += a.regions[c].numPlayers
            }
            for (c in b) e('#region option[value="' + c + '"]').text(ta[c] + " (" + b[c] + " players)")
        }, "json")
    }

    function lb() {
        e("#adsBottom").hide();
        e("#overlays").hide();
        e("#stats").hide();
        e("#mainPanel").hide();
        V = ea = !1;
        jb();
        mb(d.aa.concat(d.ac))
    }

    function qa(a) {
        a && a != z && (e("#region").val() != a && e("#region").val(a), z = d.localStorage.location = a, e(".region-message").hide(), e(".region-message." + a).show(), e(".btn-needs-server").prop("disabled", !1), Ga && M())
    }

    function pa(a) {
        ea || V || (I = null, Ka || (e("#adsBottom").show(), e("#g300x250").hide(), e("#a300x250").show()), nb(Ka ? d.ac : d.aa), Ka = !1, 1E3 > a && (s = 1), ea = !0, e("#mainPanel").show(), 0 < a ? e("#overlays").fadeIn(a) : e("#overlays").show())
    }

    function fa(a) {
        e("#helloContainer").attr("data-gamemode", a);
        W = a;
        e("#gamemode").val(a)
    }

    function jb() {
        e("#region").val() ? d.localStorage.location = e("#region").val() : d.localStorage.location && e("#region").val(d.localStorage.location);
        e("#region").val() ? e("#locationKnown").append(e("#region")) : e("#locationUnknown").append(e("#region"))
    }

    function nb(a) {
        d.googletag && d.googletag.cmd.push(function() {
            La && (La = !1, setTimeout(function() {
                    La = !0
                }, 6E4 * Qb), d.googletag && d.googletag.pubads && d.googletag.pubads().refresh &&
                d.googletag.pubads().refresh(a))
        })
    }

    function mb(a) {
        d.googletag && d.googletag.pubads && d.googletag.pubads().clear && d.googletag.pubads().clear(a)
    }

    function ga(a) {
        return d.i18n[a] || d.i18n_dict.en[a] || a
    }

    function ob() {
        var a = ++Ja;
        console.log("Find " + z + W);
        e.ajax(da + "findServer", {
            error: function() {
                setTimeout(ob, 1E3)
            },
            success: function(b) {
                a == Ja && (b.alert && alert(b.alert), Ma("ws://" + b.ip, b.token))
            },
            dataType: "json",
            method: "POST",
            cache: !1,
            crossDomain: !0,
            data: (z + W || "?") + "\n2200049715"
        })
    }

    function M() {
        Ga && z && (e("#connecting").show(),
            ob())
    }

    function Ma(a, b) {
        if (r) {
            r.onopen = null;
            r.onmessage = null;
            r.onclose = null;
            try {
                r.close()
            } catch (c) {}
            r = null
        }
        Na.ip && (a = "ws://" + Na.ip);
        if (null != O) {
            var d = O;
            O = function() {
                d(b)
            }
        }
        if (Rb) {
            var e = a.split(":");
            a = e[0] + "s://ip-" + e[1].replace(/\./g, "-").replace(/\//g, "") + ".tech.agar.io:" + +e[2]
        }
        A = [];
        k = [];
        J = {};
        v = [];
        X = [];
        x = [];
        B = C = null;
        P = 0;
        ha = !1;
        console.log("Connecting to " + a);
        r = new WebSocket(a);
        r.binaryType = "arraybuffer";
        r.onopen = function() {
            var a;
            console.log("socket open");
            a = Q(5);
            a.setUint8(0, 254);
            a.setUint32(1, 5, !0);
            R(a);
            a = Q(5);
            a.setUint8(0, 255);
            a.setUint32(1, 2200049715, !0);
            R(a);
            a = Q(1 + b.length);
            a.setUint8(0, 80);
            for (var c = 0; c < b.length; ++c) a.setUint8(c + 1, b.charCodeAt(c));
            R(a);
            pb()
        };
        r.onmessage = Sb;
        r.onclose = Tb;
        r.onerror = function() {
            console.log("socket error")
        }
    }

    function Q(a) {
        return new DataView(new ArrayBuffer(a))
    }

    function R(a) {
        r.send(a.buffer)
    }

    function Tb() {
        ha && (ua = 500);
        console.log("socket close");
        setTimeout(M, ua);
        ua *= 2
    }

    function Sb(a) {
        Ub(new DataView(a.data))
    }

    function Ub(a) {
        function b() {
            for (var b = "";;) {
                var d = a.getUint16(c, !0);
                c += 2;
                if (0 == d) break;
                b += String.fromCharCode(d)
            }
            return b
        }
        var c = 0;
        240 == a.getUint8(c) && (c += 5);
        switch (a.getUint8(c++)) {
            case 16:
                Vb(a, c);
                break;
            case 17:
                ia = a.getFloat32(c, !0);
                c += 4;
                ja = a.getFloat32(c, !0);
                c += 4;
                ka = a.getFloat32(c, !0);
                c += 4;
                break;
            case 20:
                k = [];
                A = [];
                break;
            case 21:
                Oa = a.getInt16(c, !0);
                c += 2;
                Pa = a.getInt16(c, !0);
                c += 2;
                Qa || (Qa = !0, va = Oa, wa = Pa);
                break;
            case 32:
                A.push(a.getUint32(c, !0));
                c += 4;
                break;
            case 49:
                if (null != C) break;
                var d = a.getUint32(c, !0),
                    c = c + 4;
                x = [];
                for (var e = 0; e < d; ++e) {
                    var f = a.getUint32(c, !0),
                        c = c + 4;
                    x.push({
                        id: f,
                        name: b()
                    })
                }
                qb();
                break;
            case 50:
                C = [];
                d = a.getUint32(c, !0);
                c += 4;
                for (e = 0; e < d; ++e) C.push(a.getFloat32(c, !0)), c += 4;
                qb();
                break;
            case 64:
                xa = a.getFloat64(c, !0);
                c += 8;
                ya = a.getFloat64(c, !0);
                c += 8;
                za = a.getFloat64(c, !0);
                c += 8;
                Aa = a.getFloat64(c, !0);
                c += 8;
                ia = (za + xa) / 2;
                ja = (Aa + ya) / 2;
                ka = 1;
                0 == k.length && (t = ia, u = ja, g = ka);
                a.byteLength > c && (a.getUint32(c, !0), c += 4, rb = b(), console.log("Server version " + rb));
                break;
            case 81:
                var w = a.getUint32(c, !0),
                    c = c + 4,
                    l = a.getUint32(c, !0),
                    c = c + 4,
                    h = a.getUint32(c, !0),
                    c = c + 4;
                setTimeout(function() {
                    Y({
                        d: w,
                        e: l,
                        c: h
                    })
                }, 1200)
        }
    }

    function Vb(a, b) {
        function c() {
            for (var c = "";;) {
                var d = a.getUint16(b, !0);
                b += 2;
                if (0 == d) break;
                c += String.fromCharCode(d)
            }
            return c
        }

        function p() {
            for (var c = "";;) {
                var d = a.getUint8(b++);
                if (0 == d) break;
                c += String.fromCharCode(d)
            }
            return c
        }
        sb = F = Date.now();
        ha || (ha = !0, Wb());
        Ra = !1;
        var n = a.getUint16(b, !0);
        b += 2;
        for (var f = 0; f < n; ++f) {
            var w = J[a.getUint32(b, !0)],
                l = J[a.getUint32(b + 4, !0)];
            b += 8;
            w && l && (l.S(), l.o = l.x, l.p = l.y, l.n = l.size, l.C = w.x, l.D = w.y, l.m = l.size, l.L = F, Xb(w, l))
        }
        for (f = 0;;) {
            n = a.getUint32(b, !0);
            b += 4;
            if (0 == n) break;
            ++f;
            var g, w = a.getInt32(b, !0);
            b += 4;
            l = a.getInt32(b, !0);
            b += 4;
            g = a.getInt16(b, !0);
            b += 2;
            var m = a.getUint8(b++),
                K = a.getUint8(b++),
                S = a.getUint8(b++),
                K = Yb(m << 16 | K << 8 | S),
                S = a.getUint8(b++),
                h = !!(S & 1),
                q = !!(S & 16),
                r = null;
            S & 2 && (b += 4 + a.getUint32(b, !0));
            S & 4 && (r = p());
            var s = c(),
                m = null;
            J.hasOwnProperty(n) ? (m = J[n], m.K(), m.o = m.x, m.p = m.y, m.n = m.size, m.color = K) : (m = new Z(n, w, l, g, K, s), v.push(m), J[n] = m, m.ia = w, m.ja = l);
            m.f = h;
            m.j = q;
            m.C = w;
            m.D = l;
            m.m = g;
            m.L = F;
            m.U = S;
            r && (m.J = r);
            s && m.t(s); - 1 != A.indexOf(n) && -1 == k.indexOf(m) &&
                (k.push(m), 1 == k.length && (t = m.x, u = m.y, tb(), document.getElementById("overlays").style.display = "none", y = [], Sa = 0, Ta = k[0].color, Ua = !0, ub = Date.now(), T = Va = Wa = 0))
        }
        w = a.getUint32(b, !0);
        b += 4;
        for (f = 0; f < w; f++) n = a.getUint32(b, !0), b += 4, m = J[n], null != m && m.S();
        Ra && 0 == k.length && (vb = Date.now(), Ua = !1, ea || V || (wb ? (nb(d.ab), Zb(), V = !0, e("#overlays").fadeIn(3E3), e("#stats").show()) : pa(3E3)))
    }

    function Wb() {
        e("#connecting").hide();
        xb();
        O && (O(), O = null);
        null != Xa && clearTimeout(Xa);
        Xa = setTimeout(function() {
            d.ga && (++yb, d.ga("set",
                "dimension2", yb))
        }, 1E4)
    }

    function ba() {
        if ($()) {
            var a = na - h / 2,
                b = oa - q / 2;
            64 > a * a + b * b || .01 > Math.abs(zb - ra) && .01 > Math.abs(Ab - sa) || (zb = ra, Ab = sa, a = Q(13), a.setUint8(0, 16), a.setInt32(1, ra, !0), a.setInt32(5, sa, !0), a.setUint32(9, 0, !0), R(a))
        }
    }

    function xb() {
        if ($() && ha && null != I) {
            var a = Q(1 + 2 * I.length);
            a.setUint8(0, 0);
            for (var b = 0; b < I.length; ++b) a.setUint16(1 + 2 * b, I.charCodeAt(b), !0);
            R(a);
            I = null
        }
    }

    function $() {
        return null != r && r.readyState == r.OPEN
    }

    function H(a) {
        if ($()) {
            var b = Q(1);
            b.setUint8(0, a);
            R(b)
        }
    }

    function pb() {
        if ($() &&
            null != D) {
            var a = Q(1 + D.length);
            a.setUint8(0, 81);
            for (var b = 0; b < D.length; ++b) a.setUint8(b + 1, D.charCodeAt(b));
            R(a)
        }
    }

    function hb() {
        h = 1 * d.innerWidth;
        q = 1 * d.innerHeight;
        Ha.width = L.width = h;
        Ha.height = L.height = q;
        var a = e("#helloContainer");
        a.css("transform", "none");
        var b = a.height(),
            c = d.innerHeight;
        b > c / 1.1 ? a.css("transform", "translate(-50%, -50%) scale(" + c / b / 1.1 + ")") : a.css("transform", "translate(-50%, -50%)");
        Bb()
    }

    function Cb() {
        var a;
        a = 1 * Math.max(q / 1080, h / 1920);
        return a *= N
    }

    function $b() {
        if (0 != k.length) {
            for (var a =
                    0, b = 0; b < k.length; b++) a += k[b].size;
            a = Math.pow(Math.min(64 / a, 1), .4) * Cb();
            g = (9 * g + a) / 10
        }
    }

    function Bb() {
        var a, b = Date.now();
        ++ac;
        F = b;
        if (0 < k.length) {
            $b();
            for (var c = a = 0, d = 0; d < k.length; d++) k[d].K(), a += k[d].x / k.length, c += k[d].y / k.length;
            ia = a;
            ja = c;
            ka = g;
            t = (t + a) / 2;
            u = (u + c) / 2
        } else t = (29 * t + ia) / 30, u = (29 * u + ja) / 30, g = (9 * g + ka * Cb()) / 10;
        Ob();
        Ia();
        Ya || f.clearRect(0, 0, h, q);
        Ya ? (f.fillStyle = Ba ? "#111111" : "#F2FBFF", f.globalAlpha = .05, f.fillRect(0, 0, h, q), f.globalAlpha = 1) : bc();
        v.sort(function(a, b) {
            return a.size == b.size ? a.id - b.id :
                a.size - b.size
        });
        f.save();
        f.translate(h / 2, q / 2);
        f.scale(g, g);
        f.translate(-t, -u);
        for (d = 0; d < X.length; d++) X[d].s(f);
        for (d = 0; d < v.length; d++) v[d].s(f);
        if (Qa) {
            va = (3 * va + Oa) / 4;
            wa = (3 * wa + Pa) / 4;
            f.save();
            f.strokeStyle = "#FFAAAA";
            f.lineWidth = 10;
            f.lineCap = "round";
            f.lineJoin = "round";
            f.globalAlpha = .5;
            f.beginPath();
            for (d = 0; d < k.length; d++) f.moveTo(k[d].x, k[d].y), f.lineTo(va, wa);
            f.stroke();
            f.restore()
        }
        f.restore();
        B && B.width && f.drawImage(B, h - B.width - 10, 10);
        P = Math.max(P, Db());
        0 != P && (null == Ca && (Ca = new Da(24, "#FFFFFF")), Ca.u(ga("score") +
            ": " + ~~(P / 100)), c = Ca.F(), a = c.width, f.globalAlpha = .2, f.fillStyle = "#000000", f.fillRect(10, q - 10 - 24 - 10, a + 10, 34), f.globalAlpha = 1, f.drawImage(c, 15, q - 10 - 24 - 5));
        cc();
        b = Date.now() - b;
        b > 1E3 / 60 ? G -= .01 : b < 1E3 / 65 && (G += .01);.4 > G && (G = .4);
        1 < G && (G = 1);
        b = F - Eb;
        !$() || ea || V ? (s += b / 2E3, 1 < s && (s = 1)) : (s -= b / 300, 0 > s && (s = 0));
        0 < s ? (f.fillStyle = "#000000", Fb ? (f.globalAlpha = s, f.fillRect(0, 0, h, q), E.complete && E.width && (E.width / E.height < h / q ? (b = h, a = E.height * h / E.width) : (b = E.width * q / E.height, a = q), f.drawImage(E, (h - b) / 2, (q - a) / 2, b, a), f.globalAlpha =
            .5 * s, f.fillRect(0, 0, h, q))) : (f.globalAlpha = .5 * s, f.fillRect(0, 0, h, q)), f.globalAlpha = 1) : Fb = !1;
        Eb = F
    }

    function bc() {
        f.fillStyle = Ba ? "#111111" : "#F2FBFF";
        f.fillRect(0, 0, h, q);
        f.save();
        f.strokeStyle = Ba ? "#AAAAAA" : "#000000";
        f.globalAlpha = .2 * g;
        for (var a = h / g, b = q / g, c = (-t + a / 2) % 50; c < a; c += 50) f.beginPath(), f.moveTo(c * g - .5, 0), f.lineTo(c * g - .5, b * g), f.stroke();
        for (c = (-u + b / 2) % 50; c < b; c += 50) f.beginPath(), f.moveTo(0, c * g - .5), f.lineTo(a * g, c * g - .5), f.stroke();
        f.restore()
    }

    function cc() {
        if (fb && Za.width) {
            var a = h / 5;
            f.drawImage(Za, 5,
                5, a, a)
        }
    }

    function Db() {
        for (var a = 0, b = 0; b < k.length; b++) a += k[b].m * k[b].m;
        return a
    }

    function qb() {
        B = null;
        if (null != C || 0 != x.length)
            if (null != C || Ea) {
                B = document.createElement("canvas");
                var a = B.getContext("2d"),
                    b = 60,
                    b = null == C ? b + 24 * x.length : b + 180,
                    c = Math.min(200, .3 * h) / 200;
                B.width = 200 * c;
                B.height = b * c;
                a.scale(c, c);
                a.globalAlpha = .4;
                a.fillStyle = "#000000";
                a.fillRect(0, 0, 200, b);
                a.globalAlpha = 1;
                a.fillStyle = "#FFFFFF";
                c = null;
                c = ga("leaderboard");
                a.font = "30px Ubuntu";
                a.fillText(c, 100 - a.measureText(c).width / 2, 40);
                if (null ==
                    C)
                    for (a.font = "20px Ubuntu", b = 0; b < x.length; ++b) c = x[b].name || ga("unnamed_cell"), Ea || (c = ga("unnamed_cell")), -1 != A.indexOf(x[b].id) ? (k[0].name && (c = k[0].name), a.fillStyle = "#FFAAAA") : a.fillStyle = "#FFFFFF", c = b + 1 + ". " + c, a.fillText(c, 100 - a.measureText(c).width / 2, 70 + 24 * b);
                else
                    for (b = c = 0; b < C.length; ++b) {
                        var d = c + C[b] * Math.PI * 2;
                        a.fillStyle = dc[b + 1];
                        a.beginPath();
                        a.moveTo(100, 140);
                        a.arc(100, 140, 80, c, d, !1);
                        a.fill();
                        c = d
                    }
            }
    }

    function ec(a) {
        if (null == a || 0 == a.length) return null;
        if ("%" == a[0]) {
            if (!d.MC || !d.MC.getSkinInfo) return null;
            a = d.MC.getSkinInfo("skin_" + a.slice(1));
            if (null == a) return null;
            for (a = (+a.color).toString(16); 6 > a.length;) a = "0" + a;
            return "#" + a
        }
        return null
    }

    function fc(a) {
        if (null == a || 0 == a.length) return null;
        if (!la.hasOwnProperty(a)) {
            var b = new Image;
            if (":" == a[0]) b.src = a.slice(1);
            else if ("%" == a[0]) {
                if (!d.MC || !d.MC.getSkinInfo) return null;
                var c = d.MC.getSkinInfo("skin_" + a.slice(1));
                if (null == c) return null;
                b.src = "skins/premium/" + c.url
            }
            la[a] = b
        }
        return 0 != la[a].width && la[a].complete ? la[a] : null
    }

    function $a(a, b, c, d, e) {
        this.Q = a;
        this.x = b;
        this.y = c;
        this.g = d;
        this.b = e
    }

    function Z(a, b, c, d, e, f) {
        this.id = a;
        this.o = this.x = b;
        this.p = this.y = c;
        this.n = this.size = d;
        this.color = e;
        this.a = [];
        this.R();
        this.t(f)
    }

    function Yb(a) {
        for (a = a.toString(16); 6 > a.length;) a = "0" + a;
        return "#" + a
    }

    function Da(a, b, c, d) {
        a && (this.q = a);
        b && (this.N = b);
        this.P = !!c;
        d && (this.r = d)
    }

    function gc(a) {
        for (var b = a.length, c, d; 0 < b;) d = Math.floor(Math.random() * b), b--, c = a[b], a[b] = a[d], a[d] = c
    }

    function Y(a, b) {
        var c = "1" == e("#helloContainer").attr("data-has-account-data");
        e("#helloContainer").attr("data-has-account-data",
            "1");
        if (null == b && d.localStorage[U]) {
            var p = JSON.parse(d.localStorage[U]);
            p.xp = a.e;
            p.xpNeeded = a.c;
            p.level = a.d;
            d.localStorage[U] = JSON.stringify(p)
        }
        if (c) {
            var n = +e(".agario-exp-bar .progress-bar-text").first().text().split("/")[0],
                c = +e(".agario-exp-bar .progress-bar-text").first().text().split("/")[1].split(" ")[0],
                p = e(".agario-profile-panel .progress-bar-star").first().text();
            if (p != a.d) Y({
                e: c,
                c: c,
                d: p
            }, function() {
                e(".agario-profile-panel .progress-bar-star").text(a.d);
                e(".agario-exp-bar .progress-bar").css("width",
                    "100%");
                e(".progress-bar-star").addClass("animated tada").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                    e(".progress-bar-star").removeClass("animated tada")
                });
                setTimeout(function() {
                    e(".agario-exp-bar .progress-bar-text").text(a.c + "/" + a.c + " XP");
                    Y({
                        e: 0,
                        c: a.c,
                        d: a.d
                    }, function() {
                        Y(a, b)
                    })
                }, 1E3)
            });
            else {
                var f = Date.now(),
                    g = function() {
                        var c;
                        c = (Date.now() - f) / 1E3;
                        c = 0 > c ? 0 : 1 < c ? 1 : c;
                        c = c * c * (3 - 2 * c);
                        e(".agario-exp-bar .progress-bar-text").text(~~(n + (a.e - n) * c) + "/" + a.c +
                            " XP");
                        e(".agario-exp-bar .progress-bar").css("width", (88 * (n + (a.e - n) * c) / a.c).toFixed(2) + "%");
                        1 > c ? d.requestAnimationFrame(g) : b && b()
                    };
                d.requestAnimationFrame(g)
            }
        } else e(".agario-profile-panel .progress-bar-star").text(a.d), e(".agario-exp-bar .progress-bar-text").text(a.e + "/" + a.c + " XP"), e(".agario-exp-bar .progress-bar").css("width", (88 * a.e / a.c).toFixed(2) + "%"), b && b()
    }

    function Gb(a) {
        "string" == typeof a && (a = JSON.parse(a));
        Date.now() + 18E5 > a.expires ? e("#helloContainer").attr("data-logged-in", "0") : (d.localStorage[U] =
            JSON.stringify(a), D = a.authToken, e(".agario-profile-name").text(a.name), pb(), Y({
                e: a.xp,
                c: a.xpNeeded,
                d: a.level
            }), e("#helloContainer").attr("data-logged-in", "1"))
    }

    function hc(a) {
        a = a.split("\n");
        Gb({
            name: a[0],
            fbid: a[1],
            authToken: a[2],
            expires: 1E3 * +a[3],
            level: +a[4],
            xp: +a[5],
            xpNeeded: +a[6]
        })
    }

    function ab(a) {
        if ("connected" == a.status) {
            var b = a.authResponse.accessToken;
            console.log(b);
            d.FB.api("/me/picture?width=180&height=180", function(a) {
                d.localStorage.fbPictureCache = a.data.url;
                e(".agario-profile-picture").attr("src",
                    a.data.url)
            });
            e("#helloContainer").attr("data-logged-in", "1");
            null != D ? e.ajax(da + "checkToken", {
                error: function() {
                    D = null;
                    ab(a)
                },
                success: function(a) {
                    a = a.split("\n");
                    Y({
                        d: +a[0],
                        e: +a[1],
                        c: +a[2]
                    })
                },
                dataType: "text",
                method: "POST",
                cache: !1,
                crossDomain: !0,
                data: D
            }) : e.ajax(da + "facebookLogin", {
                error: function() {
                    D = null;
                    e("#helloContainer").attr("data-logged-in", "0")
                },
                success: hc,
                dataType: "text",
                method: "POST",
                cache: !1,
                crossDomain: !0,
                data: b
            })
        }
    }

    function kb(a) {
        fa(":party");
        e("#helloContainer").attr("data-party-state",
            "4");
        a = decodeURIComponent(a).replace(/.*#/gim, "");
        bb("#" + d.encodeURIComponent(a));
        e.ajax(da + "getToken", {
            error: function() {
                e("#helloContainer").attr("data-party-state", "6")
            },
            success: function(b) {
                b = b.split("\n");
                e(".partyToken").val("agar.io/#" + d.encodeURIComponent(a));
                e("#helloContainer").attr("data-party-state", "5");
                fa(":party");
                Ma("ws://" + b[0], a)
            },
            dataType: "text",
            method: "POST",
            cache: !1,
            crossDomain: !0,
            data: a
        })
    }

    function bb(a) {
        d.history && d.history.replaceState && d.history.replaceState({}, d.document.title,
            a)
    }

    function Xb(a, b) {
        var c = -1 != A.indexOf(a.id),
            d = -1 != A.indexOf(b.id),
            e = 30 > b.size;
        c && e && ++Sa;
        e || !c || d || ++Va
    }

    function Hb(a) {
        a = ~~a;
        var b = (a % 60).toString();
        a = (~~(a / 60)).toString();
        2 > b.length && (b = "0" + b);
        return a + ":" + b
    }

    function ic() {
        if (null == x) return 0;
        for (var a = 0; a < x.length; ++a)
            if (-1 != A.indexOf(x[a].id)) return a + 1;
        return 0
    }

    function Zb() {
        e(".stats-food-eaten").text(Sa);
        e(".stats-time-alive").text(Hb((vb - ub) / 1E3));
        e(".stats-leaderboard-time").text(Hb(Wa));
        e(".stats-highest-mass").text(~~(P / 100));
        e(".stats-cells-eaten").text(Va);
        e(".stats-top-position").text(0 == T ? ":(" : T);
        var a = document.getElementById("statsGraph");
        if (a) {
            var b = a.getContext("2d"),
                c = a.width,
                a = a.height;
            b.clearRect(0, 0, c, a);
            if (2 < y.length) {
                for (var d = 200, n = 0; n < y.length; n++) d = Math.max(y[n], d);
                b.lineWidth = 3;
                b.lineCap = "round";
                b.lineJoin = "round";
                b.strokeStyle = Ta;
                b.fillStyle = Ta;
                b.beginPath();
                b.moveTo(0, a - y[0] / d * (a - 10) + 10);
                for (n = 1; n < y.length; n += Math.max(~~(y.length / c), 1)) {
                    for (var f = n / (y.length - 1) * c, g = [], l = -20; 20 >= l; ++l) 0 > n + l || n + l >= y.length || g.push(y[n + l]);
                    g = g.reduce(function(a,
                        b) {
                        return a + b
                    }) / g.length / d;
                    b.lineTo(f, a - g * (a - 10) + 10)
                }
                b.stroke();
                b.globalAlpha = .5;
                b.lineTo(c, a);
                b.lineTo(0, a);
                b.fill();
                b.globalAlpha = 1
            }
        }
    }
    if (!d.agarioNoInit) {
        var cb = d.location.protocol,
            Rb = "https:" == cb,
            da = cb + "//m.agar.io/",
            Fa = d.navigator.userAgent;
        if (-1 != Fa.indexOf("Android")) d.ga && d.ga("send", "event", "MobileRedirect", "PlayStore"), setTimeout(function() {
            d.location.href = "https://play.google.com/store/apps/details?id=com.miniclip.agar.io"
        }, 1E3);
        else if (-1 != Fa.indexOf("iPhone") || -1 != Fa.indexOf("iPad") ||
            -1 != Fa.indexOf("iPod")) d.ga && d.ga("send", "event", "MobileRedirect", "AppStore"), setTimeout(function() {
            d.location.href = "https://itunes.apple.com/app/agar.io/id995999703?mt=8&at=1l3vajp"
        }, 1E3);
        else {
            var Ha, f, L, h, q, ca = null,
                r = null,
                t = 0,
                u = 0,
                A = [],
                k = [],
                J = {},
                v = [],
                X = [],
                x = [],
                na = 0,
                oa = 0,
                ra = -1,
                sa = -1,
                ac = 0,
                F = 0,
                Eb = 0,
                I = null,
                xa = 0,
                ya = 0,
                za = 1E4,
                Aa = 1E4,
                g = 1,
                z = null,
                Ib = !0,
                Ea = !0,
                db = !1,
                Ra = !1,
                P = 0,
                Ba = !1,
                Jb = !1,
                ia = t = ~~((xa + za) / 2),
                ja = u = ~~((ya + Aa) / 2),
                ka = 1,
                W = "",
                C = null,
                Ga = !1,
                Qa = !1,
                Oa = 0,
                Pa = 0,
                va = 0,
                wa = 0,
                Kb = 0,
                dc = ["#333333", "#FF3333", "#33FF33",
                    "#3333FF"
                ],
                Ya = !1,
                ha = !1,
                sb = 0,
                D = null,
                N = 1,
                s = 1,
                ea = !1,
                Ja = 0,
                Fb = !0,
                Na = {},
                rb = null;
            (function() {
                var a = d.location.search;
                "?" == a.charAt(0) && (a = a.slice(1));
                for (var a = a.split("&"), b = 0; b < a.length; b++) {
                    var c = a[b].split("=");
                    Na[c[0]] = c[1]
                }
            })();
            var E = new Image;
            E.src = "img/background.png";
            var fb = "ontouchstart" in d && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(d.navigator.userAgent),
                Za = new Image;
            Za.src = "img/split.png";
            var Lb = document.createElement("canvas");
            if ("undefined" == typeof console || "undefined" ==
                typeof DataView || "undefined" == typeof WebSocket || null == Lb || null == Lb.getContext || null == d.localStorage) alert("You browser does not support this game, we recommend you to use Firefox to play this");
            else {
                var ta = null;
                d.setNick = function(a) {
                    d.ga && d.ga("send", "event", "Nick", a.toLowerCase());
                    lb();
                    I = a;
                    xb();
                    P = 0
                };
                d.setRegion = qa;
                var Ka = !0;
                d.setSkins = function(a) {
                    Ib = a
                };
                d.setNames = function(a) {
                    Ea = a
                };
                d.setDarkTheme = function(a) {
                    Ba = a
                };
                d.setColors = function(a) {
                    db = a
                };
                d.setShowMass = function(a) {
                    Jb = a
                };
                d.spectate = function() {
                    I =
                        null;
                    H(1);
                    lb()
                };
                d.setGameMode = function(a) {
                    a != W && (":party" == W && e("#helloContainer").attr("data-party-state", "0"), fa(a), ":party" != a && M())
                };
                d.setAcid = function(a) {
                    Ya = a
                };
                null != d.localStorage && (null == d.localStorage.AB9 && (d.localStorage.AB9 = 0 + ~~(100 * Math.random())), Kb = +d.localStorage.AB9, d.ABGroup = Kb);
                e.get(cb + "//gc.agar.io", function(a) {
                        var b = a.split(" ");
                        a = b[0];
                        b = b[1] || ""; - 1 == ["UA"].indexOf(a) && Mb.push("ussr");
                        ma.hasOwnProperty(a) && ("string" == typeof ma[a] ? z || qa(ma[a]) : ma[a].hasOwnProperty(b) && (z || qa(ma[a][b])))
                    },
                    "text");
                var La = !0,
                    Qb = 0,
                    ma = {
                        AF: "JP-Tokyo",
                        AX: "EU-London",
                        AL: "EU-London",
                        DZ: "EU-London",
                        AS: "SG-Singapore",
                        AD: "EU-London",
                        AO: "EU-London",
                        AI: "US-Atlanta",
                        AG: "US-Atlanta",
                        AR: "BR-Brazil",
                        AM: "JP-Tokyo",
                        AW: "US-Atlanta",
                        AU: "SG-Singapore",
                        AT: "EU-London",
                        AZ: "JP-Tokyo",
                        BS: "US-Atlanta",
                        BH: "JP-Tokyo",
                        BD: "JP-Tokyo",
                        BB: "US-Atlanta",
                        BY: "EU-London",
                        BE: "EU-London",
                        BZ: "US-Atlanta",
                        BJ: "EU-London",
                        BM: "US-Atlanta",
                        BT: "JP-Tokyo",
                        BO: "BR-Brazil",
                        BQ: "US-Atlanta",
                        BA: "EU-London",
                        BW: "EU-London",
                        BR: "BR-Brazil",
                        IO: "JP-Tokyo",
                        VG: "US-Atlanta",
                        BN: "JP-Tokyo",
                        BG: "EU-London",
                        BF: "EU-London",
                        BI: "EU-London",
                        KH: "JP-Tokyo",
                        CM: "EU-London",
                        CA: "US-Atlanta",
                        CV: "EU-London",
                        KY: "US-Atlanta",
                        CF: "EU-London",
                        TD: "EU-London",
                        CL: "BR-Brazil",
                        CN: "CN-China",
                        CX: "JP-Tokyo",
                        CC: "JP-Tokyo",
                        CO: "BR-Brazil",
                        KM: "EU-London",
                        CD: "EU-London",
                        CG: "EU-London",
                        CK: "SG-Singapore",
                        CR: "US-Atlanta",
                        CI: "EU-London",
                        HR: "EU-London",
                        CU: "US-Atlanta",
                        CW: "US-Atlanta",
                        CY: "JP-Tokyo",
                        CZ: "EU-London",
                        DK: "EU-London",
                        DJ: "EU-London",
                        DM: "US-Atlanta",
                        DO: "US-Atlanta",
                        EC: "BR-Brazil",
                        EG: "EU-London",
                        SV: "US-Atlanta",
                        GQ: "EU-London",
                        ER: "EU-London",
                        EE: "EU-London",
                        ET: "EU-London",
                        FO: "EU-London",
                        FK: "BR-Brazil",
                        FJ: "SG-Singapore",
                        FI: "EU-London",
                        FR: "EU-London",
                        GF: "BR-Brazil",
                        PF: "SG-Singapore",
                        GA: "EU-London",
                        GM: "EU-London",
                        GE: "JP-Tokyo",
                        DE: "EU-London",
                        GH: "EU-London",
                        GI: "EU-London",
                        GR: "EU-London",
                        GL: "US-Atlanta",
                        GD: "US-Atlanta",
                        GP: "US-Atlanta",
                        GU: "SG-Singapore",
                        GT: "US-Atlanta",
                        GG: "EU-London",
                        GN: "EU-London",
                        GW: "EU-London",
                        GY: "BR-Brazil",
                        HT: "US-Atlanta",
                        VA: "EU-London",
                        HN: "US-Atlanta",
                        HK: "JP-Tokyo",
                        HU: "EU-London",
                        IS: "EU-London",
                        IN: "JP-Tokyo",
                        ID: "JP-Tokyo",
                        IR: "JP-Tokyo",
                        IQ: "JP-Tokyo",
                        IE: "EU-London",
                        IM: "EU-London",
                        IL: "JP-Tokyo",
                        IT: "EU-London",
                        JM: "US-Atlanta",
                        JP: "JP-Tokyo",
                        JE: "EU-London",
                        JO: "JP-Tokyo",
                        KZ: "JP-Tokyo",
                        KE: "EU-London",
                        KI: "SG-Singapore",
                        KP: "JP-Tokyo",
                        KR: "JP-Tokyo",
                        KW: "JP-Tokyo",
                        KG: "JP-Tokyo",
                        LA: "JP-Tokyo",
                        LV: "EU-London",
                        LB: "JP-Tokyo",
                        LS: "EU-London",
                        LR: "EU-London",
                        LY: "EU-London",
                        LI: "EU-London",
                        LT: "EU-London",
                        LU: "EU-London",
                        MO: "JP-Tokyo",
                        MK: "EU-London",
                        MG: "EU-London",
                        MW: "EU-London",
                        MY: "JP-Tokyo",
                        MV: "JP-Tokyo",
                        ML: "EU-London",
                        MT: "EU-London",
                        MH: "SG-Singapore",
                        MQ: "US-Atlanta",
                        MR: "EU-London",
                        MU: "EU-London",
                        YT: "EU-London",
                        MX: "US-Atlanta",
                        FM: "SG-Singapore",
                        MD: "EU-London",
                        MC: "EU-London",
                        MN: "JP-Tokyo",
                        ME: "EU-London",
                        MS: "US-Atlanta",
                        MA: "EU-London",
                        MZ: "EU-London",
                        MM: "JP-Tokyo",
                        NA: "EU-London",
                        NR: "SG-Singapore",
                        NP: "JP-Tokyo",
                        NL: "EU-London",
                        NC: "SG-Singapore",
                        NZ: "SG-Singapore",
                        NI: "US-Atlanta",
                        NE: "EU-London",
                        NG: "EU-London",
                        NU: "SG-Singapore",
                        NF: "SG-Singapore",
                        MP: "SG-Singapore",
                        NO: "EU-London",
                        OM: "JP-Tokyo",
                        PK: "JP-Tokyo",
                        PW: "SG-Singapore",
                        PS: "JP-Tokyo",
                        PA: "US-Atlanta",
                        PG: "SG-Singapore",
                        PY: "BR-Brazil",
                        PE: "BR-Brazil",
                        PH: "JP-Tokyo",
                        PN: "SG-Singapore",
                        PL: "EU-London",
                        PT: "EU-London",
                        PR: "US-Atlanta",
                        QA: "JP-Tokyo",
                        RE: "EU-London",
                        RO: "EU-London",
                        RU: "RU-Russia",
                        RW: "EU-London",
                        BL: "US-Atlanta",
                        SH: "EU-London",
                        KN: "US-Atlanta",
                        LC: "US-Atlanta",
                        MF: "US-Atlanta",
                        PM: "US-Atlanta",
                        VC: "US-Atlanta",
                        WS: "SG-Singapore",
                        SM: "EU-London",
                        ST: "EU-London",
                        SA: "EU-London",
                        SN: "EU-London",
                        RS: "EU-London",
                        SC: "EU-London",
                        SL: "EU-London",
                        SG: "JP-Tokyo",
                        SX: "US-Atlanta",
                        SK: "EU-London",
                        SI: "EU-London",
                        SB: "SG-Singapore",
                        SO: "EU-London",
                        ZA: "EU-London",
                        SS: "EU-London",
                        ES: "EU-London",
                        LK: "JP-Tokyo",
                        SD: "EU-London",
                        SR: "BR-Brazil",
                        SJ: "EU-London",
                        SZ: "EU-London",
                        SE: "EU-London",
                        CH: "EU-London",
                        SY: "EU-London",
                        TW: "JP-Tokyo",
                        TJ: "JP-Tokyo",
                        TZ: "EU-London",
                        TH: "JP-Tokyo",
                        TL: "JP-Tokyo",
                        TG: "EU-London",
                        TK: "SG-Singapore",
                        TO: "SG-Singapore",
                        TT: "US-Atlanta",
                        TN: "EU-London",
                        TR: "TK-Turkey",
                        TM: "JP-Tokyo",
                        TC: "US-Atlanta",
                        TV: "SG-Singapore",
                        UG: "EU-London",
                        UA: "EU-London",
                        AE: "EU-London",
                        GB: "EU-London",
                        US: "US-Atlanta",
                        UM: "SG-Singapore",
                        VI: "US-Atlanta",
                        UY: "BR-Brazil",
                        UZ: "JP-Tokyo",
                        VU: "SG-Singapore",
                        VE: "BR-Brazil",
                        VN: "JP-Tokyo",
                        WF: "SG-Singapore",
                        EH: "EU-London",
                        YE: "JP-Tokyo",
                        ZM: "EU-London",
                        ZW: "EU-London"
                    },
                    O = null;
                d.connect = Ma;
                var ua = 500,
                    Xa = null,
                    yb = 0,
                    zb = -1,
                    Ab = -1;
                d.refreshPlayerInfo = function() {
                    H(253)
                };
                var B = null,
                    G = 1,
                    Ca = null,
                    ib = function() {
                        var a = Date.now(),
                            b = 1E3 / 60;
                        return function() {
                            d.requestAnimationFrame(ib);
                            var c = Date.now(),
                                e = c - a;
                            e > b && (a = c - e % b, !$() || 240 > Date.now() - sb ? Bb() : console.warn("Skipping draw"), jc())
                        }
                    }(),
                    aa = {},
                    Mb = "poland;usa;china;russia;canada;australia;spain;brazil;germany;ukraine;france;sweden;chaplin;north korea;south korea;japan;united kingdom;earth;greece;latvia;lithuania;estonia;finland;norway;cia;maldivas;austria;nigeria;reddit;yaranaika;confederate;9gag;indiana;4chan;italy;bulgaria;tumblr;2ch.hk;hong kong;portugal;jamaica;german empire;mexico;sanik;switzerland;croatia;chile;indonesia;bangladesh;thailand;iran;iraq;peru;moon;botswana;bosnia;netherlands;european union;taiwan;pakistan;hungary;satanist;qing dynasty;matriarchy;patriarchy;feminism;ireland;texas;facepunch;prodota;cambodia;steam;piccolo;ea;india;kc;denmark;quebec;ayy lmao;sealand;bait;tsarist russia;origin;vinesauce;stalin;belgium;luxembourg;stussy;prussia;8ch;argentina;scotland;sir;romania;belarus;wojak;doge;nasa;byzantium;imperial japan;french kingdom;somalia;turkey;mars;pokerface;8;irs;receita federal;facebook;putin;merkel;tsipras;obama;kim jong-un;dilma;hollande;berlusconi;cameron;clinton;hillary;venezuela;blatter;chavez;cuba;fidel;merkel;palin;queen;boris;bush;trump".split(";"),
                    kc = "8;nasa;putin;merkel;tsipras;obama;kim jong-un;dilma;hollande;berlusconi;cameron;clinton;hillary;blatter;chavez;fidel;merkel;palin;queen;boris;bush;trump".split(";"),
                    la = {};
                $a.prototype = {
                    Q: null,
                    x: 0,
                    y: 0,
                    g: 0,
                    b: 0
                };
                Z.prototype = {
                    id: 0,
                    a: null,
                    name: null,
                    k: null,
                    I: null,
                    x: 0,
                    y: 0,
                    size: 0,
                    o: 0,
                    p: 0,
                    n: 0,
                    C: 0,
                    D: 0,
                    m: 0,
                    U: 0,
                    L: 0,
                    W: 0,
                    A: !1,
                    f: !1,
                    j: !1,
                    M: !0,
                    T: 0,
                    J: null,
                    S: function() {
                        var a;
                        for (a = 0; a < v.length; a++)
                            if (v[a] == this) {
                                v.splice(a, 1);
                                break
                            }
                        delete J[this.id];
                        a = k.indexOf(this); - 1 != a && (Ra = !0, k.splice(a, 1));
                        a = A.indexOf(this.id); - 1 != a && A.splice(a, 1);
                        this.A = !0;
                        0 < this.T && X.push(this)
                    },
                    i: function() {
                        return Math.max(~~(.3 * this.size), 24)
                    },
                    t: function(a) {
                        if (this.name = a) null == this.k ? this.k = new Da(this.i(), "#FFFFFF", !0, "#000000") : this.k.G(this.i()), this.k.u(this.name)
                    },
                    R: function() {
                        for (var a = this.B(); this.a.length > a;) {
                            var b = ~~(Math.random() * this.a.length);
                            this.a.splice(b, 1)
                        }
                        for (0 == this.a.length && 0 < a && this.a.push(new $a(this, this.x, this.y, this.size, Math.random() - .5)); this.a.length < a;) b = ~~(Math.random() * this.a.length), b = this.a[b], this.a.push(new $a(this,
                            b.x, b.y, b.g, b.b))
                    },
                    B: function() {
                        var a = 10;
                        20 > this.size && (a = 0);
                        this.f && (a = 30);
                        var b = this.size;
                        this.f || (b *= g);
                        b *= G;
                        this.U & 32 && (b *= .25);
                        return ~~Math.max(b, a)
                    },
                    da: function() {
                        this.R();
                        for (var a = this.a, b = a.length, c = 0; c < b; ++c) {
                            var d = a[(c - 1 + b) % b].b,
                                e = a[(c + 1) % b].b;
                            a[c].b += (Math.random() - .5) * (this.j ? 3 : 1);
                            a[c].b *= .7;
                            10 < a[c].b && (a[c].b = 10); - 10 > a[c].b && (a[c].b = -10);
                            a[c].b = (d + e + 8 * a[c].b) / 10
                        }
                        for (var f = this, k = this.f ? 0 : (this.id / 1E3 + F / 1E4) % (2 * Math.PI), c = 0; c < b; ++c) {
                            var l = a[c].g,
                                d = a[(c - 1 + b) % b].g,
                                e = a[(c + 1) % b].g;
                            if (15 <
                                this.size && null != ca && 20 < this.size * g && 0 < this.id) {
                                var h = !1,
                                    m = a[c].x,
                                    K = a[c].y;
                                ca.ea(m - 5, K - 5, 10, 10, function(a) {
                                    a.Q != f && 25 > (m - a.x) * (m - a.x) + (K - a.y) * (K - a.y) && (h = !0)
                                });
                                !h && (a[c].x < xa || a[c].y < ya || a[c].x > za || a[c].y > Aa) && (h = !0);
                                h && (0 < a[c].b && (a[c].b = 0), a[c].b -= 1)
                            }
                            l += a[c].b;
                            0 > l && (l = 0);
                            l = this.j ? (19 * l + this.size) / 20 : (12 * l + this.size) / 13;
                            a[c].g = (d + e + 8 * l) / 10;
                            d = 2 * Math.PI / b;
                            e = this.a[c].g;
                            this.f && 0 == c % 2 && (e += 5);
                            a[c].x = this.x + Math.cos(d * c + k) * e;
                            a[c].y = this.y + Math.sin(d * c + k) * e
                        }
                    },
                    K: function() {
                        if (0 >= this.id) return 1;
                        var a;
                        a = (F - this.L) / 120;
                        a = 0 > a ? 0 : 1 < a ? 1 : a;
                        var b = 0 > a ? 0 : 1 < a ? 1 : a;
                        this.i();
                        if (this.A && 1 <= b) {
                            var c = X.indexOf(this); - 1 != c && X.splice(c, 1)
                        }
                        this.x = a * (this.C - this.o) + this.o;
                        this.y = a * (this.D - this.p) + this.p;
                        this.size = b * (this.m - this.n) + this.n;
                        return b
                    },
                    H: function() {
                        return 0 >= this.id ? !0 : this.x + this.size + 40 < t - h / 2 / g || this.y + this.size + 40 < u - q / 2 / g || this.x - this.size - 40 > t + h / 2 / g || this.y - this.size - 40 > u + q / 2 / g ? !1 : !0
                    },
                    s: function(a) {
                        if (this.H()) {
                            ++this.T;
                            var b = 0 < this.id && !this.f && !this.j && .4 > g;
                            5 > this.B() && 0 < this.id && (b = !0);
                            if (this.M &&
                                !b)
                                for (var c = 0; c < this.a.length; c++) this.a[c].g = this.size;
                            this.M = b;
                            a.save();
                            this.W = F;
                            c = this.K();
                            this.A && (a.globalAlpha *= 1 - c);
                            a.lineWidth = 10;
                            a.lineCap = "round";
                            a.lineJoin = this.f ? "miter" : "round";
                            db ? (a.fillStyle = "#FFFFFF", a.strokeStyle = "#AAAAAA") : (c = ec(this.J) || this.color, a.fillStyle = c, a.strokeStyle = c);
                            if (b) a.beginPath(), a.arc(this.x, this.y, this.size + 5, 0, 2 * Math.PI, !1);
                            else {
                                this.da();
                                a.beginPath();
                                var d = this.B();
                                a.moveTo(this.a[0].x, this.a[0].y);
                                for (c = 1; c <= d; ++c) {
                                    var e = c % d;
                                    a.lineTo(this.a[e].x, this.a[e].y)
                                }
                            }
                            a.closePath();
                            d = this.name.toLowerCase();
                            !this.j && Ib && ":teams" != W ? (c = fc(this.J)) || (-1 != Mb.indexOf(d) ? (aa.hasOwnProperty(d) || (aa[d] = new Image, aa[d].src = "skins/" + d + ".png"), c = 0 != aa[d].width && aa[d].complete ? aa[d] : null) : c = null) : c = null;
                            e = c;
                            b || a.stroke();
                            a.fill();
                            null != e && (a.save(), a.clip(), a.drawImage(e, this.x - this.size, this.y - this.size, 2 * this.size, 2 * this.size), a.restore());
                            (db || 15 < this.size) && !b && (a.strokeStyle = "#000000", a.globalAlpha *= .1, a.stroke());
                            a.globalAlpha = 1;
                            c = -1 != k.indexOf(this);
                            b = ~~this.y;
                            if (0 != this.id && (Ea ||
                                    c) && this.name && this.k && (null == e || -1 == kc.indexOf(d))) {
                                e = this.k;
                                e.u(this.name);
                                e.G(this.i());
                                d = 0 >= this.id ? 1 : Math.ceil(10 * g) / 10;
                                e.V(d);
                                var e = e.F(),
                                    f = ~~(e.width / d),
                                    h = ~~(e.height / d);
                                a.drawImage(e, ~~this.x - ~~(f / 2), b - ~~(h / 2), f, h);
                                b += e.height / 2 / d + 4
                            }
                            0 < this.id && Jb && (c || 0 == k.length && (!this.f || this.j) && 20 < this.size) && (null == this.I && (this.I = new Da(this.i() / 2, "#FFFFFF", !0, "#000000")), c = this.I, c.G(this.i() / 2), c.u(~~(this.size * this.size / 100)), d = Math.ceil(10 * g) / 10, c.V(d), e = c.F(), f = ~~(e.width / d), h = ~~(e.height / d), a.drawImage(e, ~~this.x - ~~(f / 2), b - ~~(h / 2), f, h));
                            a.restore()
                        }
                    }
                };
                Da.prototype = {
                    w: "",
                    N: "#000000",
                    P: !1,
                    r: "#000000",
                    q: 16,
                    l: null,
                    O: null,
                    h: !1,
                    v: 1,
                    G: function(a) {
                        this.q != a && (this.q = a, this.h = !0)
                    },
                    V: function(a) {
                        this.v != a && (this.v = a, this.h = !0)
                    },
                    setStrokeColor: function(a) {
                        this.r != a && (this.r = a, this.h = !0)
                    },
                    u: function(a) {
                        a != this.w && (this.w = a, this.h = !0)
                    },
                    F: function() {
                        null == this.l && (this.l = document.createElement("canvas"), this.O = this.l.getContext("2d"));
                        if (this.h) {
                            this.h = !1;
                            var a = this.l,
                                b = this.O,
                                c = this.w,
                                d = this.v,
                                e = this.q,
                                f = e + "px Ubuntu";
                            b.font = f;
                            var g = ~~(.2 * e);
                            a.width = (b.measureText(c).width + 6) * d;
                            a.height = (e + g) * d;
                            b.font = f;
                            b.scale(d, d);
                            b.globalAlpha = 1;
                            b.lineWidth = 3;
                            b.strokeStyle = this.r;
                            b.fillStyle = this.N;
                            this.P && b.strokeText(c, 3, e - g / 2);
                            b.fillText(c, 3, e - g / 2)
                        }
                        return this.l
                    }
                };
                Date.now || (Date.now = function() {
                    return (new Date).getTime()
                });
                (function() {
                    for (var a = ["ms", "moz", "webkit", "o"], b = 0; b < a.length && !d.requestAnimationFrame; ++b) d.requestAnimationFrame = d[a[b] + "RequestAnimationFrame"], d.cancelAnimationFrame = d[a[b] + "CancelAnimationFrame"] ||
                        d[a[b] + "CancelRequestAnimationFrame"];
                    d.requestAnimationFrame || (d.requestAnimationFrame = function(a) {
                        return setTimeout(a, 1E3 / 60)
                    }, d.cancelAnimationFrame = function(a) {
                        clearTimeout(a)
                    })
                })();
                var Pb = {
                        X: function(a) {
                            function b(a) {
                                a < d && (a = d);
                                a > f && (a = f);
                                return ~~((a - d) / 32)
                            }

                            function c(a) {
                                a < e && (a = e);
                                a > g && (a = g);
                                return ~~((a - e) / 32)
                            }
                            var d = a.ba,
                                e = a.ca,
                                f = a.Z,
                                g = a.$,
                                l = ~~((f - d) / 32) + 1,
                                h = ~~((g - e) / 32) + 1,
                                m = Array(l * h);
                            return {
                                Y: function(a) {
                                    var d = b(a.x) + c(a.y) * l;
                                    null == m[d] ? m[d] = a : Array.isArray(m[d]) ? m[d].push(a) : m[d] = [m[d], a]
                                },
                                ea: function(a, d, e, f, g) {
                                    var n = b(a),
                                        k = c(d);
                                    a = b(a + e);
                                    d = c(d + f);
                                    if (0 > n || n >= l || 0 > k || k >= h) debugger;
                                    for (; k <= d; ++k)
                                        for (f = n; f <= a; ++f)
                                            if (e = m[f + k * l], null != e)
                                                if (Array.isArray(e))
                                                    for (var p = 0; p < e.length; p++) g(e[p]);
                                                else g(e)
                                }
                            }
                        }
                    },
                    tb = function() {
                        var a = new Z(0, 0, 0, 32, "#ED1C24", ""),
                            b = document.createElement("canvas");
                        b.width = 32;
                        b.height = 32;
                        var c = b.getContext("2d");
                        return function() {
                            0 < k.length && (a.color = k[0].color, a.t(k[0].name));
                            c.clearRect(0, 0, 32, 32);
                            c.save();
                            c.translate(16, 16);
                            c.scale(.4, .4);
                            a.s(c);
                            c.restore();
                            var d =
                                document.getElementById("favicon"),
                                e = d.cloneNode(!0);
                            e.setAttribute("href", b.toDataURL("image/png"));
                            d.parentNode.replaceChild(e, d)
                        }
                    }();
                e(function() {
                    tb()
                });
                var U = "loginCache3";
                e(function() {
                    +d.localStorage.wannaLogin && (d.localStorage[U] && Gb(d.localStorage[U]), d.localStorage.fbPictureCache && e(".agario-profile-picture").attr("src", d.localStorage.fbPictureCache))
                });
                d.facebookLogin = function() {
                    d.localStorage.wannaLogin = 1
                };
                d.fbAsyncInit = function() {
                    function a() {
                        d.localStorage.wannaLogin = 1;
                        null == d.FB ? alert("You seem to have something blocking Facebook on your browser, please check for any extensions") :
                            d.FB.login(function(a) {
                                ab(a)
                            }, {
                                scope: "public_profile, email"
                            })
                    }
                    d.FB.init({
                        appId: "677505792353827",
                        cookie: !0,
                        xfbml: !0,
                        status: !0,
                        version: "v2.2"
                    });
                    d.FB.Event.subscribe("auth.statusChange", function(b) {
                        +d.localStorage.wannaLogin && ("connected" == b.status ? ab(b) : a())
                    });
                    d.facebookLogin = a
                };
                d.logout = function() {
                    D = null;
                    e("#helloContainer").attr("data-logged-in", "0");
                    e("#helloContainer").attr("data-has-account-data", "0");
                    delete d.localStorage.wannaLogin;
                    delete d.localStorage[U];
                    delete d.localStorage.fbPictureCache;
                    M()
                };
                var jc = function() {
                    function a(a, b, c, d, e) {
                        var f = b.getContext("2d"),
                            g = b.width;
                        b = b.height;
                        a.color = e;
                        a.t(c);
                        a.size = d;
                        f.save();
                        f.translate(g / 2, b / 2);
                        a.s(f);
                        f.restore()
                    }
                    for (var b = new Z(-1, 0, 0, 32, "#5bc0de", ""), c = new Z(-1, 0, 0, 32, "#5bc0de", ""), d = "#0791ff #5a07ff #ff07fe #ffa507 #ff0774 #077fff #3aff07 #ff07ed #07a8ff #ff076e #3fff07 #ff0734 #07ff20 #ff07a2 #ff8207 #07ff0e".split(" "), f = [], g = 0; g < d.length; ++g) {
                        var h = g / d.length * 12,
                            l = 30 * Math.sqrt(g / d.length);
                        f.push(new Z(-1, Math.cos(h) * l, Math.sin(h) * l, 10, d[g],
                            ""))
                    }
                    gc(f);
                    var k = document.createElement("canvas");
                    k.getContext("2d");
                    k.width = k.height = 70;
                    a(c, k, "", 26, "#ebc0de");
                    return function() {
                        e(".cell-spinner").filter(":visible").each(function() {
                            var c = e(this),
                                d = Date.now(),
                                f = this.width,
                                g = this.height,
                                h = this.getContext("2d");
                            h.clearRect(0, 0, f, g);
                            h.save();
                            h.translate(f / 2, g / 2);
                            for (var l = 0; 10 > l; ++l) h.drawImage(k, (.1 * d + 80 * l) % (f + 140) - f / 2 - 70 - 35, g / 2 * Math.sin((.001 * d + l) % Math.PI * 2) - 35, 70, 70);
                            h.restore();
                            (c = c.attr("data-itr")) && (c = ga(c));
                            a(b, this, c || "", +e(this).attr("data-size"),
                                "#5bc0de")
                        });
                        e("#statsPellets").filter(":visible").each(function() {
                            e(this);
                            var b = this.width,
                                c = this.height;
                            this.getContext("2d").clearRect(0, 0, b, c);
                            for (b = 0; b < f.length; b++) a(f[b], this, "", f[b].size, f[b].color)
                        })
                    }
                }();
                d.createParty = function() {
                    fa(":party");
                    O = function(a) {
                        bb("/#" + d.encodeURIComponent(a));
                        e(".partyToken").val("agar.io/#" + d.encodeURIComponent(a));
                        e("#helloContainer").attr("data-party-state", "1")
                    };
                    M()
                };
                d.joinParty = kb;
                d.cancelParty = function() {
                    bb("/");
                    e("#helloContainer").attr("data-party-state",
                        "0");
                    fa("");
                    M()
                };
                var y = [],
                    Sa = 0,
                    Ta = "#000000",
                    V = !1,
                    Ua = !1,
                    ub = 0,
                    vb = 0,
                    Wa = 0,
                    Va = 0,
                    T = 0,
                    wb = !0;
                setInterval(function() {
                    Ua && y.push(Db() / 100)
                }, 1E3 / 60);
                setInterval(function() {
                    var a = ic();
                    0 != a && (++Wa, 0 == T && (T = a), T = Math.min(T, a))
                }, 1E3);
                d.closeStats = function() {
                    V = !1;
                    e("#stats").hide();
                    mb(d.ab);
                    pa(0)
                };
                d.setSkipStats = function(a) {
                    wb = !a
                };
                e(function() {
                    e(Nb)
                })
            }
        }
    }
})(window, window.jQuery);

< /script> < script >

    var hasBottomAd = false;

var dfp = null;
var dfpBottom = null;
var dfpStats = null;
var dfpInitial = null;

window['aa'] = [];
window['ab'] = [];
window['ac'] = [];

if (window.location.search.indexOf('fb') != -1) {
    dfp = '/53945695/agar_facebook/agar/300x250';
    dfpStats = '/53945695/agar_facebook/agar/300x250_Stats';
    dfpInitial = '/53945695/agar_facebook/agar/300x250';
} else {
    dfp = '/53945695/agar/300x250_CRL';
    dfpStats = '/53945695/agar/300x250_CRL_stats';
    dfpBottom = '/53945695/agar/728x90';
    dfpInitial = '/53945695/agar/300x250_Google_Test';
}

if (window.innerHeight > 960 && dfpBottom != null) {
    hasBottomAd = true;
}

googletag.cmd.push(function() {
            googletag.pubads().setTargeting("abtest", window.ABGroup + "");
            window['aa'].push(googletag.defineSlot(dfp, [300, 250], 'a300x250').addService(googletag.pubads()));
            if (hasBottomAd) window['aa'].push(googletag.defineSlot(dfpBottom, [728, 90], 'a728x90').addService(googletag.pubads()));
            window['ab'].push(googletag.defineSlot(dfpStats, [300, 250], 's300x250').addService(googletag.pubads()));
            window['ac'].push(googletag.defineSlot(dfpInitial, [300, 250], 'g300x250').addService(googletag.pubads()));
            googletag.pubads().enableSingleRequest();
            googletag.pubads().disableInitialLoad();
            googletag.enableServices();
            

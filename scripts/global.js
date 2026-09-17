var e = (e, t, n) => () => {
    if (n) throw n[0];
    try {
        return e && (t = e(e = 0)), t
    } catch (e) {
        throw n = [e], e
    }
},
    t = (e, t) => () => (t || (e((t = {
        exports: {}
    }).exports, t), e = null), t.exports);
(function () {
    let e = document.createElement(`link`).relList;
    if (e && e.supports && e.supports(`modulepreload`)) return;
    for (let e of document.querySelectorAll(`link[rel="modulepreload"]`)) n(e);
    new MutationObserver(e => {
        for (let t of e)
            if (t.type === `childList`)
                for (let e of t.addedNodes) e.tagName === `LINK` && e.rel === `modulepreload` && n(e)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function t(e) {
        let t = {};
        return e.integrity && (t.integrity = e.integrity), e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy), t.credentials = e.crossOrigin === `use-credentials` ? `include` : e.crossOrigin === `anonymous` ? `omit` : `same-origin`, t
    }

    function n(e) {
        if (e.ep) return;
        e.ep = !0;
        let n = t(e);
        fetch(e.href, n)
    }
})();
var n, r, i = e((() => {
    n = class {
        success;
        json;
        constructor(e, t) {
            this.success = e, this.json = t
        }
    }, r = class {
        constructor() { }
        async getRaw(e, t, r) {
            try {
                let i = await (await fetch(e, {
                    method: t,
                    body: JSON.stringify(r)
                })).json();
                if (!i) throw Error(`Response from the server was invalid (NO_JSON)`);
                return new n(!0, i)
            } catch (e) {
                return e instanceof Error ? new n(!1, {
                    errors: [{
                        stack: e.stack
                    }]
                }) : new n(!1, {})
            }
        }
    }
}));
t((() => {
    i(), new r
}))();
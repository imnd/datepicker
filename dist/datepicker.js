const o = function(w) {
  let i = w || null, c = [];
  const n = {};
  return n.get = () => i, n.getAll = () => c, n.each = (e) => {
    for (let t = 0; t < c.length; t++)
      e(c[t]);
  }, n.length = () => i.length, n.ready = (e) => {
    const t = "addEventListener";
    document[t] ? document[t]("DOMContentLoaded", e) : window.attachEvent("onload", e);
  }, n.click = (e) => n.setEventHandler("click", e), n.blur = (e) => n.setEventHandler("blur", e), n.change = (e) => n.setEventHandler("change", e), n.setEventHandler = (e, t) => i.addEventListener(e, t), n.find = (e, t) => (t === void 0 && (t = document), i = t.querySelector(e), n), n.findLast = (e, t) => {
    t === void 0 && (t = document);
    const d = t.querySelectorAll(e);
    return i = d[d.length - 1], n;
  }, n.findAll = (e, t) => (t === void 0 && (t = document), c = t.querySelectorAll(e), n), n.findById = (e, t) => (t === void 0 && (t = document), i = t.getElementById ? t.getElementById(e) : t.all ? t.all[e][1] : t.layers[e], n), n.findByName = (e, t) => (t === void 0 && (t = document), i = t.getElementsByName ? t.getElementsByName(e)[0] : t.all ? t.all[e] : t.layers[e], n), n.findObj = (e, t) => (i = typeof e == "object" ? e : n.findById(e, t) || n.findByName(e, t) || n.findByClass(e, t), n), n.findAllByTag = (e, t) => (t === void 0 && (t = document), t.getElementsByTagName && (c = t.getElementsByTagName(e)), n), n.findByTag = (e, t) => (i = n.findAllByTag(e, t)[0], n), n.findAllByName = (e, t) => (t === void 0 && (t = document), i = t.getElementsByName ? t.getElementsByName(e) : t.all ? t.all[e] : t.layers[e], n), n.findAllByClass = (e, t) => (t === void 0 && (t = document), t.getElementsByClassName(e) && (c = t.getElementsByClassName(e)), n), n.findByClass = (e, t) => (n.findAllByClass(e, t), c !== void 0 && (i = c[0]), n), n.findLastByClass = (e, t) => (n.findAllByClass(e, t), c !== void 0 && (i = c[c.length - 1]), n), n.parent = () => i.parentNode, n.child = (e) => (n.find(e, i), n), n.children = (e) => (n.findAll(e, i), n), n.create = (e) => {
    let t = document.createElement("div");
    return t.innerHTML = e.trim(), i = t.firstChild, n;
  }, n.replace = (e) => {
    const t = n.create(e);
    i.parentNode.replaceChild(t, i);
  }, n.html = (e) => i == null ? "" : e === void 0 ? i.innerHTML : (i.innerHTML = e, n), n.id = (e) => e === void 0 ? i.id : (i.id = e, n), n.class = (e) => e === void 0 ? i.className : (i.className = e, n), n.val = (e) => {
    if (i == null)
      return "";
    const t = i.type;
    if (t === "checkbox")
      return e === void 0 ? i.checked : (i.checked = e, n);
    if (t === "select-one" || t === "select-multiple") {
      if (e === void 0)
        return i.options[i.selectedIndex].value ? i.options[i.selectedIndex].value : i.options[i.selectedIndex].text;
      {
        let d = i.options;
        for (let s in d)
          d[s].value === e && (i.selectedIndex = s);
      }
    } else if (i.value !== void 0) {
      if (t === "text" || t === "password" || t === "hidden" || t === "select-one")
        return e === void 0 ? i.value : (i.value = e, n);
      if (t === "textarea" || t === "submit")
        return e === void 0 ? i.innerHTML : (i.innerHTML = e, n);
    } else if (i.innerHTML !== void 0)
      return e === void 0 ? i.innerHTML : (i.innerHTML = e, n);
  }, n.getAttr = (e) => {
    if (i.getAttribute)
      return i.getAttribute(e);
  }, n.setAttr = (e, t) => (i.setAttribute && i.setAttribute(e, t), n), n.attr = (e, t) => {
    if (t === void 0)
      return n.getAttr(e);
    n.setAttr(e, t);
  }, n.addClass = (e) => {
    let t = n.getAttr("class");
    n.setAttr("class", t + " " + e);
  }, n.removeClass = (e) => {
    let t = n.getAttr("class");
    if (t === "")
      return;
    let d = t.split(" ");
    for (let s in d)
      d[s] === e && d.splice(s, 1);
    n.setAttr("class", d.join(" "));
  }, n.clear = (e) => {
    if (n.findObj(e), i === void 0)
      return;
    const t = i.type;
    if (t !== void 0) {
      if (t === "checkbox")
        return i.checked = "", n;
      if (t === "select-one" || t === "select-multiple")
        return i.selectedIndex = 0, n;
      if (i.value !== void 0) {
        if (t === "text" || t === "password" || t === "hidden" || t === "textarea" || t === "select-one")
          return i.value = "", n;
      } else if (i.innerHTML)
        return i.innerHTML = "", n;
    }
  }, n.clearForm = () => {
    const t = n.findObj(arguments[0]).childNodes;
    for (let d in t)
      n.clear(t[d]);
  }, n.hide = (e) => {
    n.findById(e), i.className = "hidden";
  }, n.renderTemplate = (e, t) => {
    let d = e.indexOf("{{"), s;
    for (; d !== -1; ) {
      s = e.indexOf("}}");
      let x = e.substr(d + 2, s - d - 2).trim();
      e.substr(0, d), e.substr(s + 2), e = e.substr(0, d) + t[x] + e.substr(s + 2), d = e.indexOf("{{");
    }
    return e;
  }, n;
}, F = {
  placeholder: "ДД.ММ.ГГГГ",
  daysOfWeek: [
    "Пн",
    "Вт",
    "Ср",
    "Чт",
    "Пт",
    "Сб",
    "Вс"
  ],
  monthNames: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
  ]
}, P = {
  placeholder: "DD.MM.YYYY",
  daysOfWeek: [
    "Mo",
    "Tu",
    "Wd",
    "Th",
    "Fr",
    "St",
    "Su"
  ],
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
}, W = {
  ru: F,
  en: P
}, q = `.hidden{display:none}.form__field{position:relative;display:flex;flex-wrap:wrap;align-items:stretch;width:auto}.datepicker{position:absolute;z-index:50;margin-top:5px;padding:20px 16px;width:220px;top:100%;left:0;background-color:#fff;border:1px solid #D0D0D0;border-radius:5px}.datepicker__nav{padding:0 3px;margin-bottom:16px}.datepicker__nav,.datepicker__nav-content{display:flex;align-items:center;justify-content:space-between}.datepicker__nav-content{flex-grow:1;padding:0 15px}.datepicker__nav-action{width:30px;cursor:pointer;text-align:center;font-size:24px}.datepicker__month{flex-grow:1;color:#000;font-size:1.3em;text-align:center}.datepicker__year{display:flex;align-items:center;margin-left:6px;font-size:1.5em}.datepicker__year-arrows{margin-left:5px}.datepicker__week{display:flex;padding:0;margin:0 0 13px;list-style:none}.datepicker__week li{width:14.28571%;color:#000;font-size:1em;line-height:1;text-align:center}.datepicker__days{display:flex;flex-wrap:wrap;padding:0;margin:0;list-style:none}.datepicker__days li{margin-bottom:2px;width:14.28571%}.datepicker__days li span{display:flex;align-items:center;justify-content:center;width:30px;height:30px;border:1px solid transparent;border-radius:50%;color:#000;font-size:1rem;line-height:1;cursor:pointer;transition:all .3s}.datepicker__days li span:hover{border-color:#d0d0d0}.datepicker__days li span.is-active{background-color:#777;border-color:#777;color:#fff}.datepicker__days li span.prev-month,.datepicker__days li span.next-month{color:#7d7d7d}.datepicker__year-arrow{position:absolute;display:flex;width:10px;height:10px;cursor:pointer;font-weight:700}.datepicker__year-arrow.up{top:14px;font-size:.8em}.datepicker__year-arrow.down{top:26px;font-size:.7em;margin-left:1px}.datepicker .control{margin-right:0}
`, J = `
<div class="form__field datepicker-wrapper" id="datepicker-wrapper-{{ id }}">
    <div class="input-field input-field--append">
        <input class="datepicker-input" id="datepicker-input-{{ id }}" value="{{ value }}" placeholder="{{ placeholder }}" name="' + name + '"/>
        <div class="hidden datepicker" id="datepicker-{{ id }}">
            <div class="datepicker__nav">
                <div class="datepicker__nav-action on-prev-month" id="on-prev-month-{{ id }}">&#8592;</div>
                <div class="datepicker__nav-content">
                    <div class="datepicker__month">{{ curMonthName }}</div>
                    <div class="datepicker__year">{{ curYear }}
                        <div class="datepicker__year-arrows">
                            <div class="datepicker__year-arrow up on-next-year" id="on-next-year-{{ id }}">&#8743;</div>
                            <div class="datepicker__year-arrow down on-prev-year" id="on-prev-year-{{ id }}">&#8744;</div>
                        </div>
                    </div>
                </div>
                <div class="datepicker__nav-action control on-next-month" id="on-next-month-{{ id }}">&#8594;</div>
            </div>
            <ul class="datepicker__week">{{ daysOfWeek }}</ul>
            <ul class="datepicker__days">{{ datepickerDays }}</ul>
        </div>
    </div>
</div>
`, G = (w) => {
  const i = {
    class: "datepicker",
    locale: "en"
  }, c = (n) => {
    for (const e in n)
      i[e] = n[e];
  };
  c(w || {}), c(W[i.locale]), o().ready(() => {
    o().findAllByClass(i.class).each((e) => {
      const t = o(e).attr("name");
      let d = !0, s = (/* @__PURE__ */ new Date()).getTime(), x = "", I, E, f, $, b, l, m, u, _, D, B, A, T;
      const H = (r, a) => 32 - new Date(a, r, 32).getDate(), M = (r, a) => [...Array(a - r + 1)].map((p, y) => y + r), O = (r) => [6, 0, 1, 2, 3, 4, 5][r], S = (r) => {
        r = r ? o(r) : o().findById(`datepicker-wrapper-${s}`), r.replace(o().renderTemplate(J, {
          id: s,
          value: I,
          name: t,
          curMonthName: E,
          curYear: f,
          placeholder: $,
          daysOfWeek: x,
          datepickerDays: b
        }));
        const a = o().findById(`datepicker-${s}`);
        d === !1 && a.removeClass("hidden"), o().findById(`datepicker-input-${s}`).click((p) => {
          j(a), p.stopPropagation();
        }), a.click((p) => {
          T = !1, p.stopPropagation();
        }), o(window).click(() => {
          T && z(a), T = !0;
        }), o().findById(`on-prev-month-${s}`).click(() => {
          l--, l === -1 && (l = 11, f--), h();
        }), o().findById(`on-next-month-${s}`).click(() => {
          l++, l === 12 && (l = 0, f++), h();
        }), o().findById(`on-prev-year-${s}`).click(() => {
          f--, h();
        }), o().findById(`on-next-year-${s}`).click(() => {
          f++, h();
        }), N(B, l - 1), N(D, l), N(A, l + 1);
      }, N = (r, a) => {
        for (let p in r) {
          let y = r[p];
          o().findById(`datepicker-date-${s}${y}${a}`).click(() => {
            d = !0, _ = y, u = a, f !== void 0 && (m = f), u === -1 && (u = 11, m--), u === 12 && (u = 0, m++), l = u, L(), h();
          });
        }
      }, h = (r) => {
        E = i.monthNames[l];
        let a = new Date(f, l).getDay();
        a = O(a);
        const p = H(l, f);
        D = M(1, p);
        const y = new Date(f, l);
        y.setDate(0);
        const g = y.getDate(), k = g - a + 1;
        B = M(k, g), y.setDate(p + 1);
        const Y = 42 - p - (g - k) - 1;
        A = M(1, Y), b = "", C(B, l - 1, "prev-month"), C(D, l, "curr-month"), C(A, l + 1, "next-month"), S(r);
      }, C = (r, a, p) => {
        for (let y in r) {
          let g = "", k = r[y];
          k === _ && a === u && f === m && (g = " is-active"), b += `<li>
                <span
                    id="datepicker-date-${s}${k}${a}"
                    class="${p}${g}">
                    ${k}
                </span>
            </li>`;
        }
      }, j = (r) => {
        d = !1, r.removeClass("hidden");
      }, z = (r) => {
        d = !0, r.addClass("hidden");
      }, L = () => {
        const r = _.toString().padStart(2, 0), a = (u + 1).toString().padStart(2, 0);
        I = `${r}.${a}.${m}`;
      };
      $ = i.placeholder, i.daysOfWeek.map((r) => {
        x += `<li>${r}</li>`;
      });
      let v = o(e).val();
      if (v !== "" && v !== null && v !== void 0)
        [m, u, _] = v.split("-").map((r) => parseInt(r)), u--;
      else {
        const r = /* @__PURE__ */ new Date();
        _ = r.getDate(), u = r.getMonth(), m = r.getFullYear();
      }
      l = u, f = m, L(), h(e);
    });
    let n = document.createElement("style");
    n.innerHTML = q, document.getElementsByTagName("head")[0].appendChild(n);
  });
};
export {
  G as default
};

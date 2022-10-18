function listen(e) {
  e.addEventListener("click", function () {
    (alert.style.display = "none"),
      localStorage.setItem("AlertStatus--BrowserExtension", "hide");
  });
}
!(function (e) {
  //"use strict";
  function t(e) {
    for (var t, o, n = [], s = 0, a = e.length; s < a; )
      (t = e.charCodeAt(s++)),
        t >= 55296 && t <= 56319 && s < a
          ? ((o = e.charCodeAt(s++)),
            56320 == (64512 & o)
              ? n.push(((1023 & t) << 10) + (1023 & o) + 65536)
              : (n.push(t, o), s--))
          : n.push(t);
    return n;
  }
  function o(e) {
    return 0 == e.length
      ? 0
      : e.length <= 3
      ? 1
      : ((e = e.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "")),
        (e = e.replace(/^y/, "")),
        (e = e.match(/[aeiouy]{1,2}/g).length));
  }
  function n(e, t) {
    var o = Object.prototype.toString.call(e),
      n =
        e &&
        ((("[object NodeList]" === o || "[object HTMLCollection]" === o) &&
          e.length) ||
          1 === e.nodeType),
      s = t && "function" == typeof t;
    return (
      "console" in window &&
        "warn" in console &&
        (n || console.warn("Countable: No valid elements were found"),
        s ||
          console.warn(
            'Countable: "' + t + '" is not a valid callback function'
          )),
      n && s
    );
  }
  function s(e) {
    var t = {
      hardReturns: !1,
      stripTags: !1,
      ignoreReturns: !1,
      ignoreZeroWidth: !0
    };
    for (var o in e) t.hasOwnProperty(o) && (t[o] = e[o]);
    return t;
  }
  function a(e, n) {
    var s,
      a = "" + ("value" in e ? e.value : e.innerText || e.textContent);
    return (
      n.stripTags && (a = a.replace(/<\/?[a-z][^>]*>/gi, "")),
      n.ignoreZeroWidth && (a = a.replace(/[\u200B]+/, "")),
      (s = a.trim()),
      {
        paragraphs: s
          ? (s.match(n.hardReturns ? /\n{2,}/g : /\n+/g) || []).length + 1
          : 0,
        sentences: s ? (s.match(/[.?!…]+./g) || []).length + 1 : 0,
        words: s
          ? (s.replace(/['";:,.?\xbf\-!\xa1]+/g, "").match(/\S+/g) || []).length
          : 0,
        syllables: o(a),
        characters: s ? t(s.replace(/\s/g, "")).length : 0,
        all: t(n.ignoreReturns ? a.replace(/[\n\r]/g, "") : a).length
      }
    );
  }
  function r(e, t) {
    var o = e.length;
    if (void 0 !== o) for (; o--; ) t(e[o]);
    else t(e);
  }
  var u = [],
    i = "oninput" in document ? "input" : "keyup";
  navigator.userAgent.match(/MSIE 9.0/) && (i = "keyup"),
    String.prototype.trim ||
      (String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, "");
      });
  var c = {
    live: function (e, t, o) {
      var c = s(o),
        l = function (e) {
          var o = function () {
            t.call(e, a(e, c));
          };
          u.push({ element: e, handler: o }),
            o(),
            e.addEventListener
              ? e.addEventListener(i, o, !1)
              : e.attachEvent && e.attachEvent("on" + i, o);
        };
      if (n(e, t)) return e.length ? r(e, l) : l(e), this;
    },
    die: function (e) {
      if (n(e, function () {}))
        return (
          r(e, function (e) {
            var t;
            r(u, function (o) {
              o.element === e && (t = o);
            }),
              t &&
                (e.removeEventListener
                  ? e.removeEventListener(i, t.handler, !1)
                  : e.detachEvent && e.detachEvent("on" + i, t.handler),
                u.splice(u.indexOf(t), 1));
          }),
          this
        );
    },
    once: function (e, t, o) {
      if (n(e, t))
        return (
          r(e, function (e) {
            t.call(e, a(e, s(o)));
          }),
          this
        );
    },
    count: function (e, t, o) {
      return this.once(e, t, o);
    },
    enabled: function (e) {
      var t = !1;
      return (
        e &&
          1 === e.nodeType &&
          r(u, function (o) {
            o.element === e && (t = !0);
          }),
        t
      );
    }
  };
  "object" == typeof exports
    ? (module.exports = c)
    : "function" == typeof define && define.amd
    ? define(function () {
        return c;
      })
    : (e.Countable = c);
})(this);
var menu = {
  menuIsOpen: !1,
  toggleMenu: function () {
    var e = document.body;
    menu.menuIsOpen
      ? e.classList.remove("menu-is-open")
      : e.classList.add("menu-is-open"),
      (menu.menuIsOpen = !menu.menuIsOpen);
  },
  init: function () {
    document.addEventListener("click", function (e) {
      e.target &&
        e.target.classList.contains("js-menu-button") &&
        menu.toggleMenu(e);
    }),
      document.addEventListener("touchmove", function (e) {
        menu.menuIsOpen && e.preventDefault();
      });
  }
};
menu.init();
var alert = document.getElementsByClassName("js-alert")[0],
  alertActions = Array.from(document.getElementsByClassName("js-alert-action")),
  alertStatus = localStorage.getItem("AlertStatus--BrowserExtension"),
  referrer = new URL(window.location.href).searchParams.get("ref");
((alert && "hide" == alertStatus) || "producthunt" == referrer) &&
  (alert.style.display = "none"),
  alertActions.forEach(listen);
var affix = {
  offset: function (e) {
    var t = 0,
      o = 0;
    do {
      (t += e.offsetTop || 0), (o += e.offsetLeft || 0), (e = e.offsetParent);
    } while (e);
    return { top: t, left: o };
  },
  scroll: function () {
    var e = window.pageYOffset,
      t = document.getElementsByClassName("js-page-social")[0];
    affix.offset(t).top;
    e > 140 ? t.classList.add("is-fixed") : t.classList.remove("is-fixed");
  },
  init: function () {
    document.getElementsByClassName("js-page-social")[0] &&
      (window.onscroll = affix.scroll);
  }
};
affix.init();
var counters = {
    clearCounters: function () {
      var e = {
          characters: document.getElementById("js-count-characters"),
          words: document.getElementById("js-count-words"),
          sentences: document.getElementById("js-count-sentences"),
          paragraphs: document.getElementById("js-count-paragraphs"),
          pages: document.getElementById("js-count-pages"),
          google: document.getElementById("js-count-google"),
          twitter: document.getElementById("js-count-twitter"),
          facebook: document.getElementById("js-count-facebook")
        },
        t = {
          google: document.getElementById("js-chart-google"),
          twitter: document.getElementById("js-chart-twitter"),
          facebook: document.getElementById("js-chart-facebook")
        };
      for (var o in e) editor.updateEditor(e[o], e[o].dataset["default"]);
      for (var n in t) t[n].setAttribute("data-value", 360);
    },
    countBasics: function (e) {
      var t = {
        all: document.getElementById("js-count-characters"),
        words: document.getElementById("js-count-words"),
        sentences: document.getElementById("js-count-sentences"),
        paragraphs: document.getElementById("js-count-paragraphs"),
        pages: document.getElementById("js-count-pages")
      };
      for (var o in t)
        "pages" == o
          ? ((pageCount = Math.round((e.words / 250) * 10) / 10),
            editor.updateEditor(t[o], pageCount))
          : editor.updateEditor(t[o], e[o]);
    },
    countSocials: function (e) {
      var t = {
          google: document.getElementById("js-chart-google"),
          twitter: document.getElementById("js-chart-twitter"),
          facebook: document.getElementById("js-chart-facebook")
        },
        o = {
          google: 1 - e.characters / 300,
          twitter: 1 - e.characters / 280,
          facebook: 1 - e.characters / 250
        },
        n = {
          google: document.getElementById("js-count-google"),
          twitter: document.getElementById("js-count-twitter"),
          facebook: document.getElementById("js-count-facebook")
        },
        s = {
          google: 300 - e.characters,
          twitter: 280 - e.characters,
          facebook: 250 - e.characters
        },
        a = { social: 360, google: 300, twitter: 280, facebook: 250 };
      for (var r in t)
        e.characters <= a[r]
          ? t[r].setAttribute("data-value", Math.round(360 * o[r]))
          : t[r].setAttribute("data-value", 361);
      for (var u in n) editor.updateEditor(n[u], s[u]);
      for (var i in a)
        e.characters > a[i]
          ? document.body.classList.add("is-over-" + i)
          : document.body.classList.remove("is-over-" + i);
    }
  },
  keywords = {
    results: [],
    minOccur: 1,
    maxWords: 3,
    stopwords: [
      "a",
      "about",
      "above",
      "above",
      "across",
      "after",
      "afterwards",
      "again",
      "against",
      "all",
      "almost",
      "alone",
      "along",
      "already",
      "also",
      "although",
      "always",
      "am",
      "among",
      "amongst",
      "amoungst",
      "amount",
      "an",
      "and",
      "another",
      "any",
      "anyhow",
      "anyone",
      "anything",
      "anyway",
      "anywhere",
      "are",
      "around",
      "as",
      "at",
      "back",
      "be",
      "became",
      "because",
      "become",
      "becomes",
      "becoming",
      "been",
      "before",
      "beforehand",
      "behind",
      "being",
      "below",
      "beside",
      "besides",
      "between",
      "beyond",
      "bill",
      "both",
      "bottom",
      "but",
      "by",
      "call",
      "can",
      "cannot",
      "cant",
      "co",
      "con",
      "could",
      "couldnt",
      "cry",
      "de",
      "describe",
      "detail",
      "do",
      "done",
      "down",
      "due",
      "during",
      "each",
      "eg",
      "eight",
      "either",
      "eleven",
      "else",
      "elsewhere",
      "empty",
      "enough",
      "etc",
      "even",
      "ever",
      "every",
      "everyone",
      "everything",
      "everywhere",
      "except",
      "few",
      "fifteen",
      "fify",
      "fill",
      "find",
      "fire",
      "first",
      "five",
      "for",
      "former",
      "formerly",
      "forty",
      "found",
      "four",
      "from",
      "front",
      "full",
      "further",
      "get",
      "give",
      "go",
      "had",
      "has",
      "hasnt",
      "have",
      "he",
      "hence",
      "her",
      "here",
      "hereafter",
      "hereby",
      "herein",
      "hereupon",
      "hers",
      "herself",
      "him",
      "himself",
      "his",
      "how",
      "however",
      "hundred",
      "i",
      "ie",
      "if",
      "in",
      "inc",
      "indeed",
      "interest",
      "into",
      "is",
      "it",
      "it's",
      "its",
      "itself",
      "keep",
      "last",
      "latter",
      "latterly",
      "least",
      "less",
      "ltd",
      "made",
      "many",
      "may",
      "me",
      "meanwhile",
      "might",
      "mill",
      "mine",
      "more",
      "moreover",
      "most",
      "mostly",
      "move",
      "much",
      "must",
      "my",
      "myself",
      "name",
      "namely",
      "neither",
      "never",
      "nevertheless",
      "next",
      "nine",
      "no",
      "nobody",
      "none",
      "noone",
      "nor",
      "not",
      "nothing",
      "now",
      "nowhere",
      "of",
      "off",
      "often",
      "on",
      "once",
      "one",
      "only",
      "onto",
      "or",
      "other",
      "others",
      "otherwise",
      "our",
      "ours",
      "ourselves",
      "out",
      "over",
      "own",
      "part",
      "per",
      "perhaps",
      "please",
      "put",
      "rather",
      "re",
      "same",
      "see",
      "seem",
      "seemed",
      "seeming",
      "seems",
      "serious",
      "several",
      "she",
      "should",
      "show",
      "side",
      "since",
      "sincere",
      "six",
      "sixty",
      "so",
      "some",
      "somehow",
      "someone",
      "something",
      "sometime",
      "sometimes",
      "somewhere",
      "still",
      "such",
      "system",
      "take",
      "ten",
      "than",
      "that",
      "the",
      "their",
      "them",
      "themselves",
      "then",
      "thence",
      "there",
      "thereafter",
      "thereby",
      "therefore",
      "therein",
      "thereupon",
      "these",
      "they",
      "thickv",
      "thin",
      "third",
      "this",
      "those",
      "though",
      "three",
      "through",
      "throughout",
      "thru",
      "thus",
      "to",
      "together",
      "too",
      "top",
      "toward",
      "towards",
      "twelve",
      "twenty",
      "two",
      "un",
      "under",
      "until",
      "up",
      "upon",
      "us",
      "very",
      "via",
      "was",
      "we",
      "we've",
      "we're",
      "well",
      "were",
      "what",
      "whatever",
      "when",
      "whence",
      "whenever",
      "where",
      "whereafter",
      "whereas",
      "whereby",
      "wherein",
      "whereupon",
      "wherever",
      "whether",
      "which",
      "while",
      "whither",
      "who",
      "whoever",
      "whole",
      "whom",
      "whose",
      "why",
      "will",
      "with",
      "within",
      "without",
      "would",
      "yet",
      "you",
      "your",
      "yours",
      "yourself",
      "yourselves",
      "the"
    ],
    punctuation: /[\$\uFFE5\^\+=`~<>{}\[\]|\u3000-\u303F!-#%-\x2A,\-\/:;\x3F@\x5B-\x5D_\x7B}\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E3B\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]+/g,
    splitText: function (e) {
      return e
        .replace(/\n/g, " ")
        .replace(/\.(?!\S)/g, "")
        .replace(keywords.punctuation, "")
        .toLowerCase()
        .split(" ");
    },
    cleanText: function (e) {
      var t = [];
      for (var o in e)
        "" != e[o] && keywords.stopwords.indexOf(e[o]) < 0 && t.push(e[o]);
      return t;
    },
    arrayText: function (e) {
      var t = [null];
      for (o = 1; o <= keywords.maxWords; o++) t.push({});
      var o = undefined,
        n = undefined,
        s = (undefined, undefined),
        a = (undefined, undefined);
      for (o = 0, s = e.length; o < s; o++)
        for (
          a = e[o], t[1][a] = (t[1][a] || 0) + 1, n = 2;
          n <= keywords.maxWords && o + n <= s;
          n++
        )
          (a += " " + e[o + n - 1]), (t[n][a] = (t[n][a] || 0) + 1);
      for (var r = 1; r <= keywords.maxWords; r++) {
        keywords.results[r] = [];
        var u = t[r];
        for (var i in u)
          u[i] >= keywords.minOccur &&
            keywords.results[r].push({ word: i, count: u[i], total: u[i] });
      }
      var c = keywords.results[1],
        l = keywords.results[2],
        d = keywords.results[3].slice(0, 9);
      for (var m in d) {
        var g = d[m];
        for (var f in l) {
          var h = l[f];
          g.word.includes(h.word) && g.count == h.count && (h.total = 0);
        }
        for (var y in c) {
          var v = c[y];
          g.word.includes(v.word) && g.count == v.count && (v.total = 0);
        }
      }
      keywords.results = keywords.results.splice(0, 4);
      var p = [].concat.apply([], keywords.results);
      return (
        (p = p.filter(Boolean)),
        (keywordsSorted = p.sort(function (e, t) {
          return t.total - e.total;
        })),
        keywordsSorted
      );
    },
    clearKeywords: function () {
      Array.from(document.getElementsByClassName("js-keyword-list")).forEach(
        function (e) {
          var t = Array.from(e.getElementsByClassName("js-keyword-item")),
            o = Array.from(e.getElementsByClassName("js-keyword-title")),
            n = Array.from(e.getElementsByClassName("js-keyword-count")),
            s = Array.from(e.getElementsByClassName("js-keyword-ratio"));
          t.forEach(function (e) {
            e.classList.remove("is-active");
          }),
            o.forEach(function (e) {
              e.innerText = "";
            }),
            n.forEach(function (e) {
              e.innerText = "";
            }),
            s.forEach(function (e) {
              e.innerText = "";
            });
        }
      );
    },
    toggleKeywords: function (e) {
      var t = e.target.dataset.keyword,
        o = Array.from(document.getElementsByClassName("js-keyword-list")),
        n = Array.from(document.getElementsByClassName("js-keyword-toggle"));
      o.forEach(function (e) {
        e.dataset.keyword == t
          ? e.classList.contains("is-active")
            ? nil
            : e.classList.add("is-active")
          : e.classList.remove("is-active");
      }),
        n.forEach(function (e) {
          e.dataset.keyword == t
            ? e.classList.contains("is-active")
              ? nil
              : e.classList.add("is-active")
            : e.classList.remove("is-active");
        });
    },
    updateKeywords: function (e, t) {
      var o = document.getElementsByClassName("js-keyword-list"),
        n = function () {
          0 === i
            ? (t = keywordsSorted.slice(0, 10))
            : ((resultsArray = keywords.results[i].sort(function (e, t) {
                return t.count - e.count;
              })),
              (t = resultsArray.slice(0, 10)));
          var n = o[i].getElementsByClassName("js-keyword-item"),
            s = o[i].getElementsByClassName("js-keyword-title"),
            a = o[i].getElementsByClassName("js-keyword-count"),
            r = o[i].getElementsByClassName("js-keyword-ratio");
          for (z = 0; z < n.length; z++) n[z].classList.remove("is-active");
          t.forEach(function (t, o) {
            var u = Math.round((t.count / e.length) * 1e3) / 10;
            editor.updateEditor(s[o], t.word),
              editor.updateEditor(a[o], t.count),
              editor.updateEditor(r[o], u + "%"),
              n[o].classList.add("is-active");
          });
        };
      for (i = 0; i < o.length; i++) n();
    },
    countKeywords: function (e) {
      var t = keywords.splitText(e),
        o = keywords.cleanText(t),
        n = keywords.arrayText(o);
      keywords.updateKeywords(o, n);
    },
    init: function () {
      document.addEventListener("click", function (e) {
        e.target &&
          e.target.classList.contains("js-keyword-toggle") &&
          keywords.toggleKeywords(e);
      });
    }
  };
keywords.init();
var editor = {
  autosave: function () {
    var e = document.getElementsByClassName("js-editor-input")[0],
      t = JSON.parse(localStorage.getItem("editor")),
      o = JSON.parse(localStorage.getItem("settings"));
    o && 1 == o.autosave
      ? ((t.text = e.value), localStorage.setItem("editor", JSON.stringify(t)))
      : editor.clearLocalStorage();
  },
  initLocalStorage: function (e) {
    var t = "editor",
      o = e ? { text: e } : { text: null };
    return (
      localStorage.setItem(t, JSON.stringify(o)),
      JSON.parse(localStorage.getItem(t))
    );
  },
  clearLocalStorage: function () {
    var e = JSON.parse(localStorage.getItem("editor"));
    (e.text = ""), localStorage.setItem("editor", JSON.stringify(e));
  },
  createEditor: function (e, t, o) {
    (e.value = t.text),
      t.text && t.text.length > 0 && editor.expandEditor(),
      o &&
        o.grammar &&
        t &&
        (null == t.text || t.text.length < 15e3) &&
        (e.classList.add("perfecttense"),
        PerfectTenseEditor({
          clientId: "5b6088ccf3761010a6ef52d3",
          clientSecret: "4gsi3aejk9w938u"
        }),
        (document.body.scrollTop = document.documentElement.scrollTop = 0));
  },
  expandEditor: function () {
    var e = document.getElementsByClassName("js-page-header")[0];
    e.classList.contains("is-expanded") || e.classList.add("is-expanded");
  },
  shrinkEditor: function () {
    var e = document.getElementsByClassName("js-page-header")[0];
    e.classList.contains("is-expanded") && e.classList.remove("is-expanded");
  },
  updateEditor: function (e, t) {
    "textContent" in document.body ? (e.textContent = t) : (e.innerText = t);
  },
  updateStatus: function (e) {
    e
      ? (document.body.classList.add("e-is-live"),
        (document.getElementsByClassName("js-editor-input")[0].scrollTop = 0))
      : document.body.classList.remove("e-is-live");
  },
  init: function () {
    var e = document.getElementsByClassName("js-editor-input")[0],
      t =
        JSON.parse(localStorage.getItem("editor")) ||
        editor.initLocalStorage(e.value),
      o = JSON.parse(localStorage.getItem("settings"));
    e &&
      (editor.createEditor(e, t, o),
      Countable.live(e, function (t) {
        editor.autosave(),
          editor.updateStatus(e.value),
          counters.countBasics(t),
          counters.countSocials(t),
          keywords.countKeywords(e.value);
      }),
      setInterval(editor.autosave, 3e3)),
      document.addEventListener("keyup", function (e) {
        e.target &&
          e.target.classList.contains("js-editor-input") &&
          editor.expandEditor();
      }),
      document.addEventListener("click", function (e) {
        e.target &&
          e.target.classList.contains("js-editor-input") &&
          window.innerWidth <= 640 &&
          (e.stopPropagation(),
          (document.body.scrollTop = document.documentElement.scrollTop = 0));
      });
  }
};
editor.init();
var settings = {
  grammar: !0,
  autosave: !0,
  fontsize: "medium",
  typeface: "mono",
  resetEditor: function () {
    (document.getElementsByClassName("js-editor-input")[0].value = ""),
      editor.clearLocalStorage(),
      editor.shrinkEditor(),
      editor.updateStatus(null),
      counters.clearCounters(),
      keywords.clearKeywords();
  },
  refreshPage: function () {
    document.location.reload();
  },
  setGrammar: function (e) {
    var t,
      o = "e-grammar-" + e,
      n = ["e-grammar-true", "e-grammar-false"];
    (t = document.body.classList).remove.apply(t, n),
      document.body.classList.add(o);
  },
  setAutosave: function (e) {
    var t,
      o = "e-autosave-" + e,
      n = ["e-autosave-true", "e-autosave-false"];
    if (
      ((t = document.body.classList).remove.apply(t, n),
      document.body.classList.add(o),
      e)
    ) {
      var s = document.getElementsByClassName("js-editor-input")[0].value;
      editor.initLocalStorage(s);
    } else editor.clearLocalStorage();
  },
  setTypeface: function (e) {
    var t,
      o = "e-typeface-" + e,
      n = ["e-typeface-mono", "e-typeface-sans", "e-typeface-serif"];
    (t = document.body.classList).remove.apply(t, n),
      document.body.classList.add(o);
  },
  setFontsize: function (e) {
    var t,
      o = "e-fontsize-" + e,
      n = ["e-fontsize-small", "e-fontsize-medium", "e-fontsize-large"];
    (t = document.body.classList).remove.apply(t, n),
      document.body.classList.add(o);
  },
  toggleOption: function (e) {
    var t = e.target.dataset.setting,
      o = e.target.dataset.option;
    "toggle" == o && (o = !settings[t]),
      (settings[t] = o),
      settings.updateLocalStorage(t, o);
  },
  deliverMessage: function (e) {
    var t = document.getElementsByClassName("js-notification")[0],
      o = t.getElementsByClassName("js-notification-message")[0],
      n = "";
    switch (((o.innerHTML = ""), e.target.dataset.setting)) {
      case "grammar":
        n = settings.grammar
          ? "Grammar checking enabled"
          : "Grammar checking disabled";
        break;
      case "autosave":
        n = settings.autosave ? "Autosave enabled" : "Autosave disabled";
        break;
      case "fontsize":
        n = "Font size updated";
        break;
      case "typeface":
        n = "Typeface updated";
        break;
      case "reset":
        n = "Editor cleared";
        break;
      default:
        console.log("Invalid option");
    }
    (o.innerHTML = n),
      t.classList.add("is-active"),
      setTimeout(function () {
        t.classList.remove("is-active");
      }, 1500);
  },
  initLocalStorage: function () {
    var e = "settings",
      t = {
        grammar: settings.grammar,
        autosave: settings.autosave,
        fontsize: settings.fontsize,
        typeface: settings.typeface
      };
    return (
      localStorage.setItem(e, JSON.stringify(t)),
      JSON.parse(localStorage.getItem(e))
    );
  },
  updateLocalStorage: function (e, t) {
    var o =
      JSON.parse(localStorage.getItem("settings")) ||
      settings.initLocalStorage();
    (o[e] = t),
      localStorage.setItem("settings", JSON.stringify(o)),
      settings.render();
  },
  render: function () {
    var e = ["grammar", "autosave", "fontsize", "typeface"],
      t =
        JSON.parse(localStorage.getItem("settings")) ||
        settings.initLocalStorage();
    document.getElementsByClassName("js-editor-input")[0];
    t &&
      e.forEach(function (e) {
        settings[e] = t[e];
      }),
      settings.setGrammar(settings.grammar),
      settings.setAutosave(settings.autosave),
      settings.setFontsize(settings.fontsize),
      settings.setTypeface(settings.typeface);
  },
  init: function () {
    document.getElementsByClassName("js-editor-input")[0] && settings.render(),
      document.addEventListener("click", function (e) {
        e.target && e.target.classList.contains("js-setting-option")
          ? (settings.toggleOption(e),
            settings.deliverMessage(e),
            "grammar" == e.target.dataset.setting &&
              (console.log("REFRESHHHHHH"), settings.refreshPage()))
          : e.target &&
            e.target.classList.contains("js-setting-reset") &&
            (settings.resetEditor(), settings.deliverMessage(e));
      });
  }
};
settings.init();

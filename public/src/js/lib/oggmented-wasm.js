var Oggmented = (function () {
  var _scriptDir =
    typeof document !== 'undefined' && document.currentScript
      ? document.currentScript.src
      : undefined;

  return function (Oggmented) {
    Oggmented = Oggmented || {};

    (function (b, c) {
      function m(h) {
        delete k[h];
      }
      function l(h) {
        if (e) setTimeout(l, 0, h);
        else {
          var t = k[h];
          if (t) {
            e = !0;
            try {
              var p = t.A,
                y = t.v;
              switch (y.length) {
                case 0:
                  p();
                  break;
                case 1:
                  p(y[0]);
                  break;
                case 2:
                  p(y[0], y[1]);
                  break;
                case 3:
                  p(y[0], y[1], y[2]);
                  break;
                default:
                  p.apply(c, y);
              }
            } finally {
              m(h), (e = !1);
            }
          }
        }
      }
      function q() {
        r = function (h) {
          process.C(function () {
            l(h);
          });
        };
      }
      function u() {
        if (b.postMessage && !b.importScripts) {
          var h = !0,
            t = b.onmessage;
          b.onmessage = function () {
            h = !1;
          };
          b.postMessage('', '*');
          b.onmessage = t;
          return h;
        }
      }
      function w() {
        function h(p) {
          p.source === b &&
            'string' === typeof p.data &&
            0 === p.data.indexOf(t) &&
            l(+p.data.slice(t.length));
        }
        var t = 'setImmediate$' + Math.random() + '$';
        b.addEventListener
          ? b.addEventListener('message', h, !1)
          : b.attachEvent('onmessage', h);
        r = function (p) {
          b.postMessage(t + p, '*');
        };
      }
      function v() {
        var h = new MessageChannel();
        h.port1.onmessage = function (t) {
          l(t.data);
        };
        r = function (t) {
          h.port2.postMessage(t);
        };
      }
      function A() {
        var h = f.documentElement;
        r = function (t) {
          var p = f.createElement('script');
          p.onreadystatechange = function () {
            l(t);
            p.onreadystatechange = null;
            h.removeChild(p);
            p = null;
          };
          h.appendChild(p);
        };
      }
      function d() {
        r = function (h) {
          setTimeout(l, 0, h);
        };
      }
      if (!b.setImmediate) {
        var g = 1,
          k = {},
          e = !1,
          f = b.document,
          r,
          n = Object.getPrototypeOf && Object.getPrototypeOf(b);
        n = n && n.setTimeout ? n : b;
        '[object process]' === {}.toString.call(b.process)
          ? q()
          : u()
            ? w()
            : b.MessageChannel
              ? v()
              : f && 'onreadystatechange' in f.createElement('script')
                ? A()
                : d();
        n.setImmediate = function (h) {
          'function' !== typeof h && (h = new Function('' + h));
          for (var t = Array(arguments.length - 1), p = 0; p < t.length; p++)
            t[p] = arguments[p + 1];
          k[g] = { A: h, v: t };
          r(g);
          return g++;
        };
        n.clearImmediate = m;
      }
    })(
      'undefined' === typeof self
        ? 'undefined' === typeof global
          ? this
          : global
        : self
    );
    null;
    var a;
    a || (a = typeof Oggmented !== 'undefined' ? Oggmented : {});
    var x, z;
    a.ready = new Promise(function (b, c) {
      x = b;
      z = c;
    });
    const aa = new (window.AudioContext || window.webkitAudioContext)();
    a.decodeOggData = (b, c, m) => {
      try {
        var {
            channels: l,
            length: q,
            rate: u,
          } = ((g) => {
            const k = g.byteLength,
              e = B(k);
            g = new Int8Array(g);
            C.set(g, e);
            D('open_buffer', 'number', ['number', 'number'], [e, k]);
            return { channels: ba(), length: ca(), rate: da() };
          })(b),
          w = aa.createBuffer(l, q, u),
          v = B(Uint32Array.BYTES_PER_ELEMENT),
          A = 0;
      } catch (g) {
        return m && m(g);
      }
      const d = () => {
        try {
          const g = Date.now();
          let k;
          for (; (k = ea(v)); ) {
            const e = fa(v, '*'),
              f = new Uint32Array(ha.buffer, e, l);
            for (let r = 0; r < l; r++) {
              const n = new Float32Array(E.buffer, f[r], k);
              w.getChannelData(r).set(n, A);
            }
            A += k;
            if (g + 8 < Date.now()) {
              setImmediate(d);
              break;
            }
          }
          0 === k && (ia(), F(b), F(v), c && c(w));
        } catch (g) {
          return m && m(g);
        }
      };
      setImmediate(d);
      return w;
    };
    var G = {},
      H;
    for (H in a) a.hasOwnProperty(H) && (G[H] = a[H]);
    function ja(b, c) {
      throw c;
    }
    var I = '';
    'undefined' !== typeof document &&
      document.currentScript &&
      (I = document.currentScript.src);
    _scriptDir && (I = _scriptDir);
    0 !== I.indexOf('blob:')
      ? (I = I.substr(0, I.lastIndexOf('/') + 1))
      : (I = '');
    var J = a.printErr || console.warn.bind(console);
    for (H in G) G.hasOwnProperty(H) && (a[H] = G[H]);
    G = null;
    a.quit && (ja = a.quit);
    var K;
    a.wasmBinary && (K = a.wasmBinary);
    var noExitRuntime;
    a.noExitRuntime && (noExitRuntime = a.noExitRuntime);
    'object' !== typeof WebAssembly && L('no native wasm support detected');
    function fa(b, c) {
      c = c || 'i8';
      '*' === c.charAt(c.length - 1) && (c = 'i32');
      switch (c) {
        case 'i1':
          return C[b >> 0];
        case 'i8':
          return C[b >> 0];
        case 'i16':
          return ka[b >> 1];
        case 'i32':
          return M[b >> 2];
        case 'i64':
          return M[b >> 2];
        case 'float':
          return E[b >> 2];
        case 'double':
          return la[b >> 3];
        default:
          L('invalid type for getValue: ' + c);
      }
      return null;
    }
    var N,
      O = !1;
    function ma(b) {
      var c = a['_' + b];
      c ||
        L(
          'Assertion failed: Cannot call unknown function ' +
            (b + ', make sure it is exported')
        );
      return c;
    }
    function D(b, c, m, l) {
      var q = {
          string: function (d) {
            var g = 0;
            if (null !== d && void 0 !== d && 0 !== d) {
              var k = (d.length << 2) + 1;
              g = P(k);
              var e = g,
                f = Q;
              if (0 < k) {
                k = e + k - 1;
                for (var r = 0; r < d.length; ++r) {
                  var n = d.charCodeAt(r);
                  if (55296 <= n && 57343 >= n) {
                    var h = d.charCodeAt(++r);
                    n = (65536 + ((n & 1023) << 10)) | (h & 1023);
                  }
                  if (127 >= n) {
                    if (e >= k) break;
                    f[e++] = n;
                  } else {
                    if (2047 >= n) {
                      if (e + 1 >= k) break;
                      f[e++] = 192 | (n >> 6);
                    } else {
                      if (65535 >= n) {
                        if (e + 2 >= k) break;
                        f[e++] = 224 | (n >> 12);
                      } else {
                        if (e + 3 >= k) break;
                        f[e++] = 240 | (n >> 18);
                        f[e++] = 128 | ((n >> 12) & 63);
                      }
                      f[e++] = 128 | ((n >> 6) & 63);
                    }
                    f[e++] = 128 | (n & 63);
                  }
                }
                f[e] = 0;
              }
            }
            return g;
          },
          array: function (d) {
            var g = P(d.length);
            C.set(d, g);
            return g;
          },
        },
        u = ma(b),
        w = [];
      b = 0;
      if (l)
        for (var v = 0; v < l.length; v++) {
          var A = q[m[v]];
          A ? (0 === b && (b = na()), (w[v] = A(l[v]))) : (w[v] = l[v]);
        }
      m = u.apply(null, w);
      m = (function (d) {
        if ('string' === c)
          if (d) {
            for (var g = Q, k = d + NaN, e = d; g[e] && !(e >= k); ) ++e;
            if (16 < e - d && g.subarray && oa) d = oa.decode(g.subarray(d, e));
            else {
              for (k = ''; d < e; ) {
                var f = g[d++];
                if (f & 128) {
                  var r = g[d++] & 63;
                  if (192 == (f & 224))
                    k += String.fromCharCode(((f & 31) << 6) | r);
                  else {
                    var n = g[d++] & 63;
                    f =
                      224 == (f & 240)
                        ? ((f & 15) << 12) | (r << 6) | n
                        : ((f & 7) << 18) |
                          (r << 12) |
                          (n << 6) |
                          (g[d++] & 63);
                    65536 > f
                      ? (k += String.fromCharCode(f))
                      : ((f -= 65536),
                        (k += String.fromCharCode(
                          55296 | (f >> 10),
                          56320 | (f & 1023)
                        )));
                  }
                } else k += String.fromCharCode(f);
              }
              d = k;
            }
          } else d = '';
        else d = 'boolean' === c ? !!d : d;
        return d;
      })(m);
      0 !== b && pa(b);
      return m;
    }
    var oa =
        'undefined' !== typeof TextDecoder ? new TextDecoder('utf8') : void 0,
      R,
      C,
      Q,
      ka,
      M,
      ha,
      E,
      la;
    function qa(b) {
      R = b;
      a.HEAP8 = C = new Int8Array(b);
      a.HEAP16 = ka = new Int16Array(b);
      a.HEAP32 = M = new Int32Array(b);
      a.HEAPU8 = Q = new Uint8Array(b);
      a.HEAPU16 = new Uint16Array(b);
      a.HEAPU32 = ha = new Uint32Array(b);
      a.HEAPF32 = E = new Float32Array(b);
      a.HEAPF64 = la = new Float64Array(b);
    }
    var ra = a.INITIAL_MEMORY || 16777216;
    a.wasmMemory
      ? (N = a.wasmMemory)
      : (N = new WebAssembly.Memory({ initial: ra / 65536, maximum: 32768 }));
    N && (R = N.buffer);
    ra = R.byteLength;
    qa(R);
    var S,
      sa = [],
      ta = [],
      ua = [],
      va = [];
    function wa() {
      var b = a.preRun.shift();
      sa.unshift(b);
    }
    var T = 0,
      U = null,
      V = null;
    a.preloadedImages = {};
    a.preloadedAudios = {};
    function L(b) {
      if (a.onAbort) a.onAbort(b);
      J(b);
      O = !0;
      b = new WebAssembly.RuntimeError(
        'abort(' + b + '). Build with -s ASSERTIONS=1 for more info.'
      );
      z(b);
      throw b;
    }
    function xa() {
      var b = W;
      return String.prototype.startsWith
        ? b.startsWith('data:application/octet-stream;base64,')
        : 0 === b.indexOf('data:application/octet-stream;base64,');
    }
    var W = 'oggmented-wasm.wasm';
    if (!xa()) {
      var ya = W;
      W = a.locateFile ? a.locateFile(ya, I) : I + ya;
    }
    function za() {
      try {
        if (K) return new Uint8Array(K);
        throw 'both async and sync fetching of the wasm failed';
      } catch (b) {
        L(b);
      }
    }
    function Aa() {
      return K || 'function' !== typeof fetch
        ? Promise.resolve().then(za)
        : fetch(W, { credentials: 'same-origin' })
            .then(function (b) {
              if (!b.ok) throw "failed to load wasm binary file at '" + W + "'";
              return b.arrayBuffer();
            })
            .catch(function () {
              return za();
            });
    }
    function X(b) {
      for (; 0 < b.length; ) {
        var c = b.shift();
        if ('function' == typeof c) c(a);
        else {
          var m = c.B;
          'number' === typeof m
            ? void 0 === c.u
              ? S.get(m)()
              : S.get(m)(c.u)
            : m(void 0 === c.u ? null : c.u);
        }
      }
    }
    ta.push({
      B: function () {
        Ba();
      },
    });
    var Da = {
      b: function (b, c, m) {
        Q.copyWithin(b, c, c + m);
      },
      c: function (b) {
        b >>>= 0;
        var c = Q.length;
        if (2147483648 < b) return !1;
        for (var m = 1; 4 >= m; m *= 2) {
          var l = c * (1 + 0.2 / m);
          l = Math.min(l, b + 100663296);
          l = Math.max(16777216, b, l);
          0 < l % 65536 && (l += 65536 - (l % 65536));
          a: {
            try {
              N.grow((Math.min(2147483648, l) - R.byteLength + 65535) >>> 16);
              qa(N.buffer);
              var q = 1;
              break a;
            } catch (u) {}
            q = void 0;
          }
          if (q) return !0;
        }
        return !1;
      },
      d: function (b) {
        if (!noExitRuntime) {
          if (a.onExit) a.onExit(b);
          O = !0;
        }
        ja(b, new Ca(b));
      },
      a: N,
    };
    (function () {
      function b(q) {
        a.asm = q.exports;
        S = a.asm.e;
        T--;
        a.monitorRunDependencies && a.monitorRunDependencies(T);
        0 == T &&
          (null !== U && (clearInterval(U), (U = null)),
          V && ((q = V), (V = null), q()));
      }
      function c(q) {
        b(q.instance);
      }
      function m(q) {
        return Aa()
          .then(function (u) {
            return WebAssembly.instantiate(u, l);
          })
          .then(q, function (u) {
            J('failed to asynchronously prepare wasm: ' + u);
            L(u);
          });
      }
      var l = { a: Da };
      T++;
      a.monitorRunDependencies && a.monitorRunDependencies(T);
      if (a.instantiateWasm)
        try {
          return a.instantiateWasm(l, b);
        } catch (q) {
          return (
            J('Module.instantiateWasm callback failed with error: ' + q), !1
          );
        }
      (function () {
        return K ||
          'function' !== typeof WebAssembly.instantiateStreaming ||
          xa() ||
          'function' !== typeof fetch
          ? m(c)
          : fetch(W, { credentials: 'same-origin' }).then(function (q) {
              return WebAssembly.instantiateStreaming(q, l).then(
                c,
                function (u) {
                  J('wasm streaming compile failed: ' + u);
                  J('falling back to ArrayBuffer instantiation');
                  return m(c);
                }
              );
            });
      })().catch(z);
      return {};
    })();
    var Ba = (a.___wasm_call_ctors = function () {
      return (Ba = a.___wasm_call_ctors = a.asm.f).apply(null, arguments);
    });
    a._open_buffer = function () {
      return (a._open_buffer = a.asm.g).apply(null, arguments);
    };
    var ia = (a._close_buffer = function () {
        return (ia = a._close_buffer = a.asm.h).apply(null, arguments);
      }),
      ca = (a._get_length = function () {
        return (ca = a._get_length = a.asm.i).apply(null, arguments);
      }),
      ba = (a._get_channels = function () {
        return (ba = a._get_channels = a.asm.j).apply(null, arguments);
      }),
      da = (a._get_rate = function () {
        return (da = a._get_rate = a.asm.k).apply(null, arguments);
      });
    a._get_time = function () {
      return (a._get_time = a.asm.l).apply(null, arguments);
    };
    a._get_streams = function () {
      return (a._get_streams = a.asm.m).apply(null, arguments);
    };
    var ea = (a._read_float = function () {
        return (ea = a._read_float = a.asm.n).apply(null, arguments);
      }),
      F = (a._free = function () {
        return (F = a._free = a.asm.o).apply(null, arguments);
      }),
      B = (a._malloc = function () {
        return (B = a._malloc = a.asm.p).apply(null, arguments);
      }),
      na = (a.stackSave = function () {
        return (na = a.stackSave = a.asm.q).apply(null, arguments);
      }),
      pa = (a.stackRestore = function () {
        return (pa = a.stackRestore = a.asm.r).apply(null, arguments);
      }),
      P = (a.stackAlloc = function () {
        return (P = a.stackAlloc = a.asm.s).apply(null, arguments);
      });
    a.ccall = D;
    a.getValue = fa;
    var Y;
    function Ca(b) {
      this.name = 'ExitStatus';
      this.message = 'Program terminated with exit(' + b + ')';
      this.status = b;
    }
    V = function Ea() {
      Y || Z();
      Y || (V = Ea);
    };
    function Z() {
      function b() {
        if (!Y && ((Y = !0), (a.calledRun = !0), !O)) {
          X(ta);
          X(ua);
          x(a);
          if (a.onRuntimeInitialized) a.onRuntimeInitialized();
          if (a.postRun)
            for (
              'function' == typeof a.postRun && (a.postRun = [a.postRun]);
              a.postRun.length;

            ) {
              var c = a.postRun.shift();
              va.unshift(c);
            }
          X(va);
        }
      }
      if (!(0 < T)) {
        if (a.preRun)
          for (
            'function' == typeof a.preRun && (a.preRun = [a.preRun]);
            a.preRun.length;

          )
            wa();
        X(sa);
        0 < T ||
          (a.setStatus
            ? (a.setStatus('Running...'),
              setTimeout(function () {
                setTimeout(function () {
                  a.setStatus('');
                }, 1);
                b();
              }, 1))
            : b());
      }
    }
    a.run = Z;
    if (a.preInit)
      for (
        'function' == typeof a.preInit && (a.preInit = [a.preInit]);
        0 < a.preInit.length;

      )
        a.preInit.pop()();
    noExitRuntime = !0;
    Z();

    return Oggmented.ready;
  };
})();
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = Oggmented;
else if (typeof define === 'function' && define['amd'])
  define([], function () {
    return Oggmented;
  });
else if (typeof exports === 'object') exports['Oggmented'] = Oggmented;

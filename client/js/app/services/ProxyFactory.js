"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var ProxyFactory;

  function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

  return {
    setters: [],
    execute: function () {
      _export("ProxyFactory", ProxyFactory = /*#__PURE__*/function () {
        function ProxyFactory() {
          _classCallCheck(this, ProxyFactory);
        }

        _createClass(ProxyFactory, null, [{
          key: "create",
          value: function create(objeto, props, acao) {
            return new Proxy(objeto, {
              get: function get(target, prop, receiver) {
                if (props.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {
                  return function () {
                    console.log("interceptando ".concat(prop));
                    var retorno = Reflect.apply(target[prop], target, arguments);
                    acao(target);
                    return retorno;
                  };
                }

                return Reflect.get(target, prop, receiver);
              },
              set: function set(target, prop, value, receiver) {
                var retorno = Reflect.set(target, prop, value, receiver);
                if (props.includes(prop)) acao(target);
                return retorno;
              }
            });
          }
        }, {
          key: "_ehFuncao",
          value: function _ehFuncao(func) {
            return _typeof(func) == (typeof Function === "undefined" ? "undefined" : _typeof(Function));
          }
        }]);

        return ProxyFactory;
      }());
    }
  };
});
//# sourceMappingURL=ProxyFactory.js.map
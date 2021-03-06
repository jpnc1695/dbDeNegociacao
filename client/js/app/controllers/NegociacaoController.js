"use strict";

System.register(["../helpers/DateHelper.js", "../helpers/Bind.js", "../models/ListaNegociacoes.js", "../models/Mensagem.js", "../views/MensagemView.js", "../models/Negociacao.js", "../views/NegociacoesView.js", "../services/NegociacaoService.js"], function (_export, _context) {
  "use strict";

  var DateHelper, Bind, ListaNegociacoes, Mensagem, MensagemView, Negociacao, NegociacoesView, NegociacaoService, NegociacaoController, negociacaoController;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

  function currentInstance() {
    return negociacaoController;
  }

  _export("currentInstance", currentInstance);

  return {
    setters: [function (_helpersDateHelperJs) {
      DateHelper = _helpersDateHelperJs.DateHelper;
    }, function (_helpersBindJs) {
      Bind = _helpersBindJs.Bind;
    }, function (_modelsListaNegociacoesJs) {
      ListaNegociacoes = _modelsListaNegociacoesJs.ListaNegociacoes;
    }, function (_modelsMensagemJs) {
      Mensagem = _modelsMensagemJs.Mensagem;
    }, function (_viewsMensagemViewJs) {
      MensagemView = _viewsMensagemViewJs.MensagemView;
    }, function (_modelsNegociacaoJs) {
      Negociacao = _modelsNegociacaoJs.Negociacao;
    }, function (_viewsNegociacoesViewJs) {
      NegociacoesView = _viewsNegociacoesViewJs.NegociacoesView;
    }, function (_servicesNegociacaoServiceJs) {
      NegociacaoService = _servicesNegociacaoServiceJs.NegociacaoService;
    }],
    execute: function () {
      _export("NegociacaoController", NegociacaoController = /*#__PURE__*/function () {
        function NegociacaoController() {
          _classCallCheck(this, NegociacaoController);

          var $ = document.querySelector.bind(document);
          this._inputData = $('#data');
          this._inputQuantidade = $('#quantidade');
          this._inputValor = $('#valor');
          this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia', 'ordena');
          this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');
          this._service = new NegociacaoService();

          this._init();
        }

        _createClass(NegociacaoController, [{
          key: "_init",
          value: function _init() {
            var _this = this;

            this._service.lista().then(function (negociacoes) {
              return negociacoes.forEach(function (negociacao) {
                return _this._listaNegociacoes.adiciona(negociacao);
              });
            })["catch"](function (erro) {
              return _this._mensagem.texto = erro;
            });

            setInterval(function () {
              _this.importaNegociacoes();
            }, 3500);
          }
        }, {
          key: "adiciona",
          value: function adiciona(event) {
            var _this2 = this;

            event.preventDefault();

            var negociacao = this._criaNegociacao();

            this._service.cadastra(negociacao).then(function (mensagem) {
              _this2._listaNegociacoes.adiciona(negociacao);

              _this2._mensagem.texto = mensagem;

              _this2._limpaFormulario();
            })["catch"](function (erro) {
              return _this2._mensagem.texto = erro;
            });
          }
        }, {
          key: "importaNegociacoes",
          value: function importaNegociacoes() {
            var _this3 = this;

            this._service.importa(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
              return negociacoes.forEach(function (negociacao) {
                _this3._listaNegociacoes.adiciona(negociacao);

                _this3._mensagem.texto = 'Negocia????es importadas com sucesso';
              });
            })["catch"](function (erro) {
              return _this3._mensagem.texto = erro;
            });
          }
        }, {
          key: "apaga",
          value: function apaga() {
            var _this4 = this;

            this._service.apaga().then(function (mensagem) {
              _this4._mensagem.texto = mensagem;

              _this4._listaNegociacoes.esvazia();
            })["catch"](function (erro) {
              console.log(erro);
              _this4._mensagem.texto = erro;
            });
          }
        }, {
          key: "_criaNegociacao",
          value: function _criaNegociacao() {
            return new Negociacao(DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
          }
        }, {
          key: "ordenaNegociacao",
          value: function ordenaNegociacao(coluna) {
            this._listaNegociacoes.ordena(function (a, b) {
              return a[coluna] - b[coluna];
            });
          }
        }, {
          key: "_limpaFormulario",
          value: function _limpaFormulario() {
            this._inputData.value = '';
            this._inputQuantidade.value = 1;
            this._inputValor.value = 0.0;

            this._inputData.focus();
          }
        }]);

        return NegociacaoController;
      }());

      negociacaoController = new NegociacaoController();
    }
  };
});
//# sourceMappingURL=NegociacaoController.js.map
sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("campeonatobrasileiro.controller.Main", {
      onInit: function () {
        //vamos criar um modelo
        //antes, as variaveis que vão no modelo
        /*var dadosGerais = {
                    rodada : '89a',
                    campeonato : "Brasileirão 2023 do Canal FioriNET"
                };

                // agora sim vamos criar o modelo
                var dadosModel = new JSONModel();
                dadosModel.setData(dadosGerais);
                var view = this.getView();
                view.setModel(dadosModel, "ModeloDadosGerais");
                */
        // 3 objetos vazios
        var dadosGerais = {};
        var classificacao = {};
        var partidas = {};

        //3 modelos - 1 pra cada objeto
        // variavel dentro do parentesis substitui o comando setData
        var dadosModel = new JSONModel(dadosGerais);
        var classificacaoModel = new JSONModel(classificacao);
        var partidasModel = new JSONModel(partidas);

        // atribuimos 3 modelos à tela - view
        this.getView().setModel(dadosModel, "ModeloDadosGerais");
        this.getView().setModel(classificacaoModel, "ModeloClassificacao");
        this.getView().setModel(partidasModel, "ModeloPartidas");

        this.buscarDadosGerais();
        this.buscarClassificacao();
      },
      buscarDadosGerais: function () {
        //obter o model a ser atualizado
        var dadosModel2 = this.getView().getModel("ModeloDadosGerais");

        const configuracoes = {
          url: "https://api.api-futebol.com.br/v1/campeonatos/14",
          method: "GET",
          async: true,
          crossDomain: true,
          headers: {
            Authorization: "Bearer test_9dbbae3d263f53a92c8b671e01ec43",
          },
        };

        //fazemos a chamada à API
        $.ajax(configuracoes)

          //sucesso
          .done(
            function (resposta) {
              debugger;
              dadosModel2.setData(resposta);
              this.buscarPartidas(resposta.rodada_atual.rodada);
            }.bind(this)
          )

          //erro
          .fail(function (erro) {
            debugger;
          });
      },
      buscarClassificacao: function () {
        //obter o model a ser atualizado
        var classificacaoModel2 = this.getView().getModel(
          "ModeloClassificacao"
        );

        const configuracoes = {
          url: "https://api.api-futebol.com.br/v1/campeonatos/14/tabela",
          method: "GET",
          async: true,
          crossDomain: true,
          headers: {
            Authorization: "Bearer test_9dbbae3d263f53a92c8b671e01ec43",
          },
        };

        //fazemos a chamada à API
        $.ajax(configuracoes)

          //sucesso
          .done(function (resposta) {
            classificacaoModel2.setData({ Classificacao: resposta });
          })

          //erro
          .fail(function (erro) {
            debugger;
          });
      },

      buscarPartidas: function (rodada) {
        //obter o model a ser atualizado
        var partidasModel2 = this.getView().getModel("ModeloPartidas");

        const configuracoes = {
          url:
            "https://api.api-futebol.com.br/v1/campeonatos/14/rodadas/" +
            rodada,
          method: "GET",
          async: true,
          crossDomain: true,
          headers: {
            Authorization: "Bearer test_9dbbae3d263f53a92c8b671e01ec43",
          },
        };

        //fazemos a chamada à API
        $.ajax(configuracoes)

          //sucesso
          .done(function (resposta) {
            debugger;
            partidasModel2.setData(resposta);
          })

          //erro
          .fail(function (erro) {
            debugger;
          });
      },
    });
  }
);

import { HttpService } from "./HttpService.js";
import { ConnectionFactory } from "./ConnectionFactory.js";
import { Negociacao } from "../models/Negociacao.js";
import { NegociacaoDao } from "../dao/NegociacaoDao.js";

export class NegociacaoService {

        constructor(){
          this._http = new HttpService();
        }

          obterNegociacoesDaSemana() {

              return new Promise((resolve, reject) => {
                  this._http.get('negociacoes/semana')
                  .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                  }).catch(erro => {
                    console.log(erro);
                    reject('Não foi possível receber as negociações da semana')
                  })
          });
        }
        
          obterNegociacoesDaSemanaAnterior() {

              return new Promise((resolve, reject) => {
                this._http.get('negociacoes/anterior')
                .then(negociacoes => {
                  resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                }).catch(erro => {
                  console.log(erro);
                  reject('Não foi possível receber as negociações da semana')
                })
            });

        }

    
          obterNegociacoesDaSemanaRetrasada() {

              return new Promise((resolve, reject) => {
                this._http.get('negociacoes/retrasada')
                .then(negociacoes => {
                  resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                }).catch(erro => {
                  console.log(erro);
                  reject('Não foi possível receber as negociações da semana')
                })
            });

      }

          async obterNegociacoes() {
        
            try {
              const periodos = await Promise.all([
                this.obterNegociacoesDaSemana(),
                this.obterNegociacoesDaSemanaAnterior(),
                this.obterNegociacoesDaSemanaRetrasada()
              ]);
              let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), [])
                .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor));
              return negociacoes;
            } catch (erro) {
              throw new Error(erro);
            }
      } 


        async cadastra(negociacao) {
            
              return ConnectionFactory
                      .getConnection()
                      .then(connection => new NegociacaoDao(connection))
                      .then(dao => dao.adiciona(negociacao))
                      .then(()=>'Negociação adiciona com sucesso')
                      .catch(erro =>{
                          console.log(erro)
                          throw new Error('Erro ao adicionar a negociação')
                      });
      }

        async lista(){
            return ConnectionFactory
                      .getConnection()
                      .then(connection => new NegociacaoDao(connection))
                      .then(dao => dao.listaTodos())
                      .then(()=>'Negociação adiciona com sucesso')
                      .catch(erro =>{
                          console.log(erro)
                          throw new Error('Não foi possível listar as negociações')
                      });
      }

        async  apaga(){
            return ConnectionFactory
                    .getConnection()
                    .then(connection => new NegociacaoDao(connection))
                    .then(dao => dao.apagaTodos())
                    .then(() => 'Negociações apagadas com sucesso')
                    .catch(erro =>{
                        console.log(erro)
                        throw new Error('Não foi possível apagar as negociações')
                    })

      }

          async importa(listaAtual) {

            return this.obterNegociacoes()
                      .then(negociacoes =>
                            negociacoes.filter(negociacao => 
                                !listaAtual.some(negociacaoExistente =>
                                    negociacao.isEquals(negociacaoExistente)))
                      ).catch(erro => {
                        console.log(erro);
                        throw new Error('Não foi possível importas as negociações')
                      });
      
      }

}

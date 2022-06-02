import { DateHelper} from "../helpers/DateHelper.js";
import { Bind } from "../helpers/Bind.js";
import { ListaNegociacoes } from "../models/ListaNegociacoes.js";
import { Mensagem } from "../models/Mensagem.js";
import { MensagemView } from "../views/MensagemView.js";
import { Negociacao } from "../models/Negociacao.js";
import { NegociacoesView } from "../views/NegociacoesView.js";
import { NegociacaoService } from "../services/NegociacaoService.js";

export class NegociacaoController {
    
    constructor() {
        
        let $ = document.querySelector.bind(document);
        
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
         
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(), 
            new NegociacoesView($('#negociacoesView')), 
            'adiciona', 'esvazia','ordena');
       
        this._mensagem = new Bind(
            new Mensagem(), new MensagemView($('#mensagemView')),
            'texto');       
        this._service =  new NegociacaoService();

        this._init();    
        
    }

    _init() {

        this._service
            .lista()
            .then(negociacoes =>
                  negociacoes.forEach(negociacao =>
                    this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => this._mensagem.texto = erro );

            setInterval(()=>{
                    this.importaNegociacoes();
            },3500)                         
    }

    
    adiciona(event) {
        event.preventDefault();

        let negociacao = this._criaNegociacao();

        this._service
            .cadastra(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = mensagem ; 
                this._limpaFormulario();   
            }).catch(erro => this._mensagem.texto = erro);
    }


    importaNegociacoes(){
        
        this._service
            .importa(this._listaNegociacoes.negociacoes)
            .then(negociacoes => negociacoes.forEach(negociacao =>{
                this._listaNegociacoes.adiciona(negociacao)
                this._mensagem.texto = 'Negociações importadas com sucesso'
            }))
            .catch(erro => this._mensagem.texto = erro);
    }           

    apaga() {
        this._service
            .apaga()
            .then(mensagem => {
                this._mensagem.texto = mensagem;
                this._listaNegociacoes.esvazia();
            }) 
            .catch(erro => {
                console.log(erro)
                this._mensagem.texto = erro;
            })             
     
    }
    
    _criaNegociacao() {
        
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
            )  
    }

    ordenaNegociacao(coluna){
            this._listaNegociacoes.ordena((a,b) => a[coluna] - b[coluna]);
    }

    _limpaFormulario() {
     
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();   
    }
}

let negociacaoController = new NegociacaoController();

export function currentInstance() {
    return negociacaoController;
}
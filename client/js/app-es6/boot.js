import { currentInstance } from "./controllers/NegociacaoController.js";
import { } from "./polyfill/fetch.js";

let negociacaoController = currentInstance();

document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
document.querySelector('#botao_apaga').onclick = negociacaoController.adiciona.bind(negociacaoController);


/*$('.form').onsubmit(negociacaoController.adiciona());
$('#botao_apaga').onclick(negociacaoController.apaga())*/


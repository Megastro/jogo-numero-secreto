//MODO MANUAL
/*let titulo= document.querySelector("h1");
titulo.innerHTML= "Jogo do número secreto";

let paragrafo= document.querySelector("p");
paragrafo.innerHTML= "Escolha um número de 1 a 10";
*/

let listaDeNumerosSorteados= [];
let numeroLimite= 10;
let numSecreto= gerarNumeroAleatório();
let tentativa=1;

//MODO AUTOMÁTICO
function exibirTextoTela(tag, texto){
    let campo= document.querySelector(tag);
    campo.innerHTML= texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
}

function exibirMensagensIniciais(){
    exibirTextoTela("h1", "Jogo do número secreto");
    exibirTextoTela("p", "Escolha um número de 1 a 10");
}

exibirMensagensIniciais();

function verificarChute(){
    let chute= document.querySelector("input").value;
    if(chute == numSecreto){
        let palavraTentativa= tentativa > 1 ? "tentativas":"tentativa";
        let mensagemTentativa= "Você descobriu o número secreto em "+ tentativa +" " + palavraTentativa;
        exibirTextoTela("h1", "Acertou");
        exibirTextoTela("p", mensagemTentativa);
        document.getElementById("reiniciar").removeAttribute("disabled");
    }

    else{
        if(chute>numSecreto){
            exibirTextoTela("p", "O número secreto é menor");
        }
        else{
            exibirTextoTela("p", "O número secreto é maior");
        }
        tentativa++;
        limarCampo();
    }
}

function gerarNumeroAleatório() {
    let numeroEscolhido= parseInt(Math.random()*numeroLimite+1);
    let qtdDeElementos= listaDeNumerosSorteados.length;
    if(qtdDeElementos== numeroLimite){
        listaDeNumerosSorteados=[];
    }
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatório();
    }
    else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limarCampo(){
    chute= document.querySelector("input");
    chute.value="";
}

function reiniciarJogo(){
    numSecreto= gerarNumeroAleatório();
    limarCampo();
    tentativa=1;
    exibirMensagensIniciais();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}
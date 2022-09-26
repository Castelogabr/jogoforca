import React from "react";
import palavras from "./palavras";
import forca0 from "./assets/forca0.png";
import forca1 from "./assets/forca1.png";
import forca2 from "./assets/forca2.png";
import forca3 from "./assets/forca3.png";
import forca4 from "./assets/forca4.png";
import forca5 from "./assets/forca5.png";
import forca6 from "./assets/forca6.png";

let palavraEscolhida;
let erros=0;
let acertos=0;
let random;

export default function App() {

    const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const [Linha, setLinha]= React.useState([" "]);
    const [styleLinha, setStyle]= React.useState("linha")
    const [clicados, setClicados] = React.useState([]);
    const [img, setImg] = React.useState(forca0)
    const [inputChute, setInput]= React.useState("");

    function escolherPalavra() {
        erros=0;
        acertos=0;
        setImg(forca0)
        setStyle("linha")
        setInput("");
        random = Math.floor(Math.random() * palavras.length);
        let aceitaAcento = palavras[random];
        let aceitandoAcento = aceitaAcento.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        palavraEscolhida = array(aceitandoAcento);
        setClicados(alfabeto)
        Linhas()
    }

    function Linhas(){
        let vazio=[];
        for(let i=0;i<palavraEscolhida.length;i++){
            vazio[i]= "_ ";
            
        }
        setLinha(vazio)
    }

    function array(palavra) {
        let arrayPalavra = [];
        for (let i = 0; i < palavra.length; i++) {
            arrayPalavra[i] = palavra[i];
        }
        return arrayPalavra;
    }

    function verificaLetra(letra){
        
        let achou=0

        let novoArrayLetra=[...clicados]
        for(let i=0; i<26;i++){
            if(letra === novoArrayLetra[i]){
                novoArrayLetra[i]=" ";
            }
        }
        setClicados(novoArrayLetra)
        
        let novoArray=[...Linha];
        for(let i=0;i<palavraEscolhida.length;i++){
            if(palavraEscolhida[i] === letra){
                achou=1;
            }
        }
        if(achou===1){
            
            for(let i=0;i<palavraEscolhida.length;i++){
                if(letra === palavraEscolhida[i]){
                    novoArray[i]=letra+" ";
                    acertos++;
                }
            
            }
            setLinha(novoArray)
            if(acertos === palavraEscolhida.length){
                fimJogo("ganhou")
            }
        }
        else{
            erros++;
            if(erros === 1){
                setImg(forca1)
            }
            else if(erros === 2){
                setImg(forca2)
            }
            else if(erros === 3){
                setImg(forca3)
            }
            else if(erros === 4){
                setImg(forca4)
            }
            else if(erros === 5){
                setImg(forca5)
            }
            else if(erros === 6){
                setImg(forca6)
                fimJogo("perdeu")

            }            
        }

    }

    function fimJogo(estado){    
         
        if(estado === "perdeu"){
            setStyle("errou")
            setImg(forca6)
            setLinha(palavraEscolhida)
        }
        else{
            setStyle("ganhou")
        }
    }

    function botaoChute(){
        let palavraChute = inputChute;
        if(palavraChute === palavras[random]){
            fimJogo("ganhou")
        }
        else{
            fimJogo("perdeu")
        }
        
    }

    return (
        <>
            <div className="caixa-topo">
                <img src={img} alt="" />
                <div>
                    <button onClick={escolherPalavra}>Escolher Palavra</button>
                    <div className={styleLinha}> {Linha.map((letra) => (<span>{letra}</span>))}</div>
                </div>
            </div>
            <footer>
                <div className="botoes">
                    {alfabeto.map((letra,indice) => <button 
                    className={clicados.includes(letra) ? "habilitado" : "desabilitado"} 
                    key={indice} onClick={() => verificaLetra(letra)}>{letra}</button>)}
                </div>
                <div className="chute">
                    <p>Já sei a palavra!</p>
                    <input onChange={event => setInput(event.target.value)} type="text" />
                    <button onClick={botaoChute}>Chutar</button>
                </div>
            </footer>
        </>
    );
}
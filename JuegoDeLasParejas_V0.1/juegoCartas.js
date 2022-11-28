/* autor: DanielTortondaRuiz */

let tablero = new Array();
let caja = document.createElement("div");
caja.id = "caja";
let seleccion=false;
let seleccionada;
let cancion;

/* Inicia el tablero con una nueva diposición aleatoria de las imágenes */
function iniciarJuego(){
    let arrayJuego = new Array();
    arrayJuego.push("imagenes/archer.png");
    arrayJuego.push("imagenes/barbarian.png");
    arrayJuego.push("imagenes/giant.png");
    arrayJuego.push("imagenes/wizard.png");
    arrayJuego.push("imagenes/archer.png");
    arrayJuego.push("imagenes/barbarian.png");
    arrayJuego.push("imagenes/giant.png");
    arrayJuego.push("imagenes/wizard.png");
    while(arrayJuego.length>1){
        let num = Math.floor(Math.random()*(arrayJuego.length-1)+1);
        tablero.push(arrayJuego.splice(num,1));
    }
    tablero.push(arrayJuego[0]);
    /* cancion = document.body.createElement("audio");
    cancion.src = "sonidos/fondo.mp3";
    cancion.id = "fondo";
    cancion.loop = true;
    cancion.volume = 1; 
    cancion.autoplay = true; */
}

/* Despliega el tablero  */
function desplegarTablero(){
    for(let x=0; x<8;x++){
        let div = document.createElement("div");
        div.className = "carta";
        let imagen = document.createElement("img");
        imagen.src = "imagenes/back.png";
        imagen.id = "c"+ x.toString();
        imagen.addEventListener("click",descubrirCarta);
        div.appendChild(imagen);
        caja.appendChild(div);
    }
    document.body.appendChild(caja);
    document.body.appendChild(cancion);
}

/* Voltea las cartas y comprueba las jugadas */
function descubrirCarta(){
    let cartaSelect = document.getElementById(this.id);
    let posicion = parseInt(this.id.charAt(1));
    cartaSelect.src = tablero[posicion];
    if(seleccion && seleccionada.id != cartaSelect.id){
        if(seleccionada.src != cartaSelect.src ){
            setTimeout(()=>{seleccionada.src = "imagenes/back.png",cartaSelect.src = "imagenes/back.png"},1000)
        }
        seleccion=false;
    }else{
        seleccionada = cartaSelect;
        seleccion=true;
    }
}

iniciarJuego(); 
desplegarTablero()







const body = document.querySelector("body");

//Rutas de la imágenes 
const lugia = "imagenes/Lugia.png";
const mewtwo = "imagenes/Mewtwo.png";
const groudon = "imagenes/Groudon.png";
const kyogre = "imagenes/Kyogre.png";
const rayquaza = "imagenes/Rayquaza.png";
const giratina = "imagenes/Giratina.png";
const dialga = "imagenes/Dialga.png";
const xerneas = "imagenes/Xerneas.png";
const yveltal = "imagenes/Yveltal.png";
const solgaleo = "imagenes/Solgaleo.png";
const lunala = "imagenes/Lunala.png";
const palkia = "imagenes/Palkia.png";
const regirock = "imagenes/Regirock.png";
const regice = "imagenes/Regice.png";
const registeel = "imagenes/Registeel.png";
const deoxys = "imagenes/Deoxys.png";
const regigigas = "imagenes/Regigigas.png";
const arceus = "imagenes/Arceus.png";
const cobalion = "imagenes/Cobalion.png";
const volcanion = "imagenes/Volcanion.png";


//Variables de juego
let dificultad;

// contenedor padre
const contenedor = document.createElement("div");
contenedor.id = "contenedor";

// div titulo y título
const titulo = document.createElement("div");
titulo.id = "divTitulo";
const texto = document.createElement("h1");
texto.id="textoTitulo";
texto.textContent = "Seleccione el nivel de dificultad:";
titulo.appendChild(texto);
contenedor.appendChild(titulo);

// div botones
const botones = document.createElement("div");
botones.id = "botones";
let dificultades = ["Fácil", "Medio", "Difícil"];
for (let x = 0; x < 3; x++) {
  const boton = document.createElement("button");
  boton.id = x;
  boton.className = "button";
  boton.textContent = dificultades[x];
  boton.value = x;
  boton.addEventListener("click",function() {iniciarJuego(x)});
  botones.appendChild(boton);
}
contenedor.appendChild(botones);

// div activar sonidos
const sonidos = document.createElement("div");
sonidos.id="sonidos";

const textoSonido = document.createElement("p");
textoSonido.innerText = "Sonidos:";
sonidos.appendChild(textoSonido);

const activadoP = document.createElement("p");
activadoP.innerText = "ON";
sonidos.appendChild(activadoP);

const activado = document.createElement("input");
activado.setAttribute("type", "radio");
activado.setAttribute("name", "selectorSonido");
activado.setAttribute("value", "activado");
activado.addEventListener("change", function() {selectorSonidoF("activado")});
sonidos.appendChild(activado);

const desactivadoP = document.createElement("p");
desactivadoP.innerText="OFF";
sonidos.appendChild(desactivadoP);

const desactivado = document.createElement("input");
desactivado.setAttribute("type", "radio");
desactivado.setAttribute("name", "selectorSonido");
desactivado.setAttribute("checked", "checked");
desactivado.setAttribute("value", "desactivado");
desactivado.addEventListener("change",  function() {selectorSonidoF("desactivado")});
sonidos.appendChild(desactivado);

contenedor.appendChild(sonidos);
body.appendChild(contenedor);

let volumenMusica;

// div selector sonido
function selectorSonidoF(estado) {
  
  if (estado == "activado") {
    const divSonido = document.createElement("div");
    divSonido.setAttribute("id", "divSonido");
    contenedor.appendChild(divSonido);
    
    const pSonido = document.createElement("p");
    pSonido.setAttribute("id", "pSonido");
    pSonido.innerText = "Volumen de música: ";
    divSonido.appendChild(pSonido);
    
    volumenMusica = document.createElement("input");
    volumenMusica.setAttribute("id", "volumenMusica");
    volumenMusica.setAttribute("type", "range");
    volumenMusica.setAttribute("min", "0");
    volumenMusica.setAttribute("max", "1");
    volumenMusica.setAttribute("step", "0.1");
    volumenMusica.setAttribute("value", "0.5");
    divSonido.appendChild(volumenMusica);
  } else {
    contenedor.removeChild(divSonido);
  }
}


//Variables para el tablero
let tablero = new Array();
let caja = document.createElement("div");
caja.id = "caja";
let seleccion = false;
let seleccionada;
let error = null;
let correcto = null;


/* Inicia el tablero con una nueva diposición aleatoria de las imágenes */
function iniciarJuego(dificultad) {

  let selectorRadio = document.querySelector('input[name="selectorSonido"]:checked').value;
  console.log(selectorRadio);

  if (selectorRadio == "activado") {
  //Sonidos
  correcto = document.createElement("audio");
  correcto.id= "correcto";
  correcto.src = "sonidos/correcto.mp3";
  body.appendChild(correcto);
  
  error = document.createElement("audio");
  error.id= "error";
  error.src = "sonidos/error.mp3";
  body.appendChild(error);

  musicaFondo = document.createElement("audio");
  musicaFondo.id= "musicaFondo";
  musicaFondo.src = "sonidos/BandaSonora.mp3";
  musicaFondo.volume=volumenMusica.value;
  body.appendChild(musicaFondo);
  musicaFondo.play();
  }

  crearCrono();

  let arrayJuego = [lugia,mewtwo,groudon,kyogre,rayquaza,giratina,dialga,xerneas,
    yveltal,solgaleo,lugia,mewtwo,groudon,kyogre,rayquaza,giratina,dialga,xerneas,
    yveltal,solgaleo];

  switch(dificultad){
    case 0:
      textodificultad = "Fácil";
      caja.className = "cajaFacil";
      break;
    case 1:
      textodificultad = "Medio";
      arrayJuego.push(lunala,palkia,regirock,regice,registeel,
        lunala,palkia,regirock,regice,registeel);
      caja.className = "cajaMedio";
      break;
    case 2:
      textodificultad = "Difícil";
      arrayJuego.push(lunala,palkia,regirock,regice,registeel,
        deoxys,regigigas,arceus,cobalion,volcanion,lunala,palkia,
        regirock,regice,registeel,deoxys,regigigas,arceus,cobalion,
        volcanion);
      caja.className = "cajaDificil";
      break;
    
  }

  while (arrayJuego.length > 1) {
    let num = Math.floor(Math.random() * (arrayJuego.length - 1) + 1);
    tablero.push(arrayJuego.splice(num, 1));
  }
  tablero.push(arrayJuego[0]);

// borro los botones y demás, todo el div padre luego despliego tablero
  contenedor.remove();
  desplegarTablero();
}

/* Despliega el tablero  */
function desplegarTablero() {
  console.log(tablero);
  for (let x = 0; x < tablero.length; x++) {
    let div = document.createElement("div");
    div.className = "carta";
    let imagen = document.createElement("img");
    imagen.src = "imagenes/back.png";
    imagen.id = x;
    imagen.addEventListener("click", descubrirCarta);
    div.appendChild(imagen);
    caja.appendChild(div);
  }
  document.body.appendChild(caja);
}

/* Voltea las cartas y comprueba las jugadas */
function descubrirCarta() {
  let cartaSelect = document.getElementById(this.id);
  let posicion = this.id;
  cartaSelect.src = tablero[posicion];
  if (seleccion && seleccionada.id != cartaSelect.id) {
    if (seleccionada.src != cartaSelect.src) {
      setTimeout(() => {
        (seleccionada.src = "imagenes/back.png"),
          (cartaSelect.src = "imagenes/back.png");
      }, 1000);

      if (error!=null) {
        error.play();  
      }  
    } else {
      if (correcto != null) {
        correcto.play();
      }
    }
    seleccion = false;
  } else {
    seleccionada = cartaSelect;
    seleccion = true;
  }
}

// añadir div cronometro

function crearCrono() {

  const CronoContenedor = document.createElement("div");
  CronoContenedor.setAttribute("id", "CronoContenedor");

  const minutos = document.createElement("div");
  minutos.setAttribute("id", "minutos");
  CronoContenedor.appendChild(minutos);

  const segundos = document.createElement("div");
  segundos.setAttribute("id", "segundos");
  CronoContenedor.appendChild(segundos);

  const decimas = document.createElement("div");
  decimas.setAttribute("id", "decimas");
  CronoContenedor.appendChild(decimas);

  body.appendChild(CronoContenedor);
}
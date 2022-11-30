const body = document.querySelector("body");

// contenedor padre
const contenedor = document.createElement("div");
contenedor.id = "contenedor";

// div titulo y título
const titulo = document.createElement("div");
titulo.id = "divTitulo";
const texto = document.createElement("h1");
texto.id="textoTitulo";
texto.textContent = "Seleccione el nivel de dificultad:";

// div botones y botones
const botones = document.createElement("div");
botones.id = "botones";
const button1 = document.createElement("button");
button1.id = 1;
button1.className = "button";
button1.textContent = "Fácil";
const button2 = document.createElement("button");
button2.id = 2;
button2.className = "button";
button2.textContent = "Medio";
const button3 = document.createElement("button");
button3.id = 3;
button3.className = "button";
button3.textContent = "Difícil";

body.appendChild(contenedor);
contenedor.appendChild(titulo);
titulo.appendChild(texto);
contenedor.appendChild(botones);
botones.appendChild(button1);
botones.appendChild(button2);
botones.appendChild(button3);

button1.addEventListener("click", iniciarJuego);
button2.addEventListener("click", iniciarJuego);
button3.addEventListener("click", iniciarJuego);

let tablero = new Array();
let caja = document.createElement("div");
caja.id = "caja";
let seleccion = false;
let seleccionada;

/* Inicia el tablero con una nueva diposición aleatoria de las imágenes */
function iniciarJuego() {
  let arrayJuego = new Array();
  arrayJuego.push("imagenes/archer.png");
  arrayJuego.push("imagenes/barbarian.png");
  arrayJuego.push("imagenes/giant.png");
  arrayJuego.push("imagenes/wizard.png");
  arrayJuego.push("imagenes/archer.png");
  arrayJuego.push("imagenes/barbarian.png");
  arrayJuego.push("imagenes/giant.png");
  arrayJuego.push("imagenes/wizard.png");
  while (arrayJuego.length > 1) {
    let num = Math.floor(Math.random() * (arrayJuego.length - 1) + 1);
    tablero.push(arrayJuego.splice(num, 1));
  }
  tablero.push(arrayJuego[0]);
  /* cancion = document.body.createElement("audio");
    cancion.src = "sonidos/fondo.mp3";
    cancion.id = "fondo";
    cancion.loop = true;
    cancion.volume = 1; 
    cancion.autoplay = true; */

// borro los botones y demás, todo el div padre luego despliego tablero
  contenedor.remove();
  desplegarTablero();
}

/* Despliega el tablero  */
function desplegarTablero() {
  for (let x = 0; x < 8; x++) {
    let div = document.createElement("div");
    div.className = "carta";
    let imagen = document.createElement("img");
    imagen.src = "imagenes/back.png";
    imagen.id = "c" + x.toString();
    imagen.addEventListener("click", descubrirCarta);
    div.appendChild(imagen);
    caja.appendChild(div);
  }
  document.body.appendChild(caja);
}

/* Voltea las cartas y comprueba las jugadas */
function descubrirCarta() {
  let cartaSelect = document.getElementById(this.id);
  let posicion = parseInt(this.id.charAt(1));
  cartaSelect.src = tablero[posicion];
  if (seleccion && seleccionada.id != cartaSelect.id) {
    if (seleccionada.src != cartaSelect.src) {
      setTimeout(() => {
        (seleccionada.src = "imagenes/back.png"),
          (cartaSelect.src = "imagenes/back.png");
      }, 1000);
    }
    seleccion = false;
  } else {
    seleccionada = cartaSelect;
    seleccion = true;
  }
}

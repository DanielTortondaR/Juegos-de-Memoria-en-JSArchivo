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



// div botones y botones
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

body.appendChild(contenedor);

//Variables para el tablero
let tablero = new Array();
let caja = document.createElement("div");
caja.id = "caja";
let seleccion = false;
let seleccionada;



/* Inicia el tablero con una nueva diposición aleatoria de las imágenes */
function iniciarJuego(dificultad) {

  let arrayJuego = [lugia,mewtwo,groudon,kyogre,rayquaza,giratina,dialga,xerneas,
    yveltal,solgaleo,lugia,mewtwo,groudon,kyogre,rayquaza,giratina,dialga,xerneas,
    yveltal,solgaleo];

  switch(dificultad){
    case 0:
      textodificultad = "Fácil";

      break;
    case 1:
      textodificultad = "Medio";
      arrayJuego.push(lunala,palkia,regirock,regice,registeel,
        lunala,palkia,regirock,regice,registeel);
      break;
    case 2:
      textodificultad = "Difícil";
      arrayJuego.push(lunala,palkia,regirock,regice,registeel,
        deoxys,regigigas,arceus,cobalion,volcanion,lunala,palkia,
        regirock,regice,registeel,deoxys,regigigas,arceus,cobalion,
        volcanion);
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
    }
    seleccion = false;
  } else {
    seleccionada = cartaSelect;
    seleccion = true;
  }
}

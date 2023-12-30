function setearNivel(id) {
  cantidadIntentosUsuario = CANTIDAD_INTENTOS[id];
}

function avisarCantidadTurnos(cantidad) {
  const $cartelAvisoTurnos = document.querySelector("#contenedor-aviso-turnos");
  $cartelAvisoTurnos.classList.remove("oculto");
  $cartelAvisoTurnos.textContent = `Tenés ${
    cantidad ? cantidad : "∞"
  } intentos.`;
}

function habilitarJuego() {
  $botonInicioJuego.classList.remove("disabled");
}

const $botonesNiveles = [
  document.querySelector("#boton-nivel-facil"),
  document.querySelector("#boton-nivel-medio"),
  document.querySelector("#boton-nivel-dificil"),
];
const $botonInicioJuego = document.querySelector("#boton-inicio-juego");

const CANTIDAD_INTENTOS = {
  "boton-nivel-facil": false,
  "boton-nivel-medio": 15,
  "boton-nivel-dificil": 20,
};

$botonesNiveles.forEach((btn) => {
  btn.onclick = (e) => {
    setearNivel(e.target.id);
    avisarCantidadTurnos(cantidadIntentosUsuario);
    habilitarJuego();
  };
});

$botonInicioJuego.onclick = () => {
  document.querySelector("#pantalla-inicio").classList.add("oculto");
  document.querySelector("#pantalla-juego").classList.remove("oculto");
  //muestra intentos
  document.querySelector("#cantidad-intentos").textContent =
    cantidadIntentosUsuario.toString() | "infinitos";
};

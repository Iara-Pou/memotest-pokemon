function setearNivel(id) {
  cantidadIntentosUsuario = cantidadIntentos[id];
}

function avisarCantidadTurnos(cantidad) {
  const $cartelAvisoTurnos = document.querySelector("#contenedor-aviso-turnos");
  $cartelAvisoTurnos.classList.remove("oculto");
  $cartelAvisoTurnos.textContent = `Tenés ${
    cantidad ? cantidad : "∞"
  } intentos.`;
}

const cantidadIntentos = {
  "boton-nivel-facil": false,
  "boton-nivel-medio": 15,
  "boton-nivel-dificil": 20,
};

let $botones = [
  document.querySelector("#boton-nivel-facil"),
  document.querySelector("#boton-nivel-medio"),
  document.querySelector("#boton-nivel-dificil"),
];

$botones.forEach((btn) => {
  btn.onclick = (e) => {
    setearNivel(e.target.id);
    avisarCantidadTurnos(cantidadIntentosUsuario);
  };
});

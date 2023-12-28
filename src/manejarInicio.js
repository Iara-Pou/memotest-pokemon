function setearNivel(id) {
  cantidadIntentosUsuario = cantidadIntentos[id];
  console.log(cantidadIntentosUsuario);
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
  btn.onclick = () => {
    setearNivel(event.target.id);
  };
});

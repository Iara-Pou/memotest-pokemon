const $tablero = document.querySelector("#tablero");
const $tarjetas = $tablero.querySelectorAll(".col");
const $botonReinicio = document.querySelector("#boton-reinicio-juego");
const $botonJugar = document.querySelector("#boton-jugar");
const $botonNivelFacil = document.querySelector("#boton-facil");
const $botonNivelMedio = document.querySelector("#boton-medio");
const $botonNivelDificil = document.querySelector("#boton-dificil");

const TOTAL_PARES = 6;
let $tarjetaAnterior = null;
let contadorParesHallados = 0;
let partidaIniciada;
let turnosRestantes;

$tablero.onclick = manejarClick;
$botonJugar.onclick = manejarInicioPartida;
$botonReinicio.onclick = reiniciarPartida;
$botonNivelFacil.onclick = () => asignarTotalTurnos(30);
$botonNivelMedio.onclick = () => asignarTotalTurnos(15);
$botonNivelDificil.onclick = () => asignarTotalTurnos(10);

function asignarTotalTurnos (totalTurnos){
  turnosRestantes = totalTurnos;
  actualizarTurnosRestantes(turnosRestantes);
}

function actualizarTurnosRestantes(){
  document.querySelector("#turnos-restantes").textContent = turnosRestantes;
  if(turnosRestantes <= 0){
  alert("perdiste");
  }
}

function manejarInicioPartida(){
const nivelNoSeleccionado = turnosRestantes === undefined;

if(nivelNoSeleccionado){
  remarcarSeleccionarTurno();
  return;
} else if (partidaIniciada){
  return;
}

iniciarJuego();
partidaIniciada = true
}

function manejarClick(e) {
  const $tarjeta = e.target;
  const clickEnTarjeta = $tarjeta.classList.contains("tarjeta");
  const tarjetaHabilitada = !$tarjeta.classList.contains("deshabilitada");

  if (tarjetaHabilitada && clickEnTarjeta) {
    if ($tarjeta === $tarjetaAnterior) {
      return;
    }

    mostrarPokemon($tarjeta);

    if ($tarjetaAnterior === null) {
      $tarjetaAnterior = $tarjeta;
      return;
    } else if ($tarjeta.className === $tarjetaAnterior.className) {
      setTimeout(() => {
        deshabilitar($tarjetaAnterior);
        deshabilitar($tarjeta);
        $tarjetaAnterior = null;

        contadorParesHallados++;
        if (contadorParesHallados === TOTAL_PARES) {
          ganar(turnosRestantes);
        }
      }, 500);
    } else if ($tarjeta.className !== $tarjetaAnterior.className) {
      setTimeout(() => {
        esconderPokemon($tarjetaAnterior);
        esconderPokemon($tarjeta);
        $tarjetaAnterior = null;
      }, 500);
    }

    turnosRestantes--;
    actualizarTurnosRestantes();
    deshabilitarTurnoUsuario();

  }
}

function iniciarJuego() {
  const POKEMONES = [
    "pickachu",
    "bulbasaur",
    "charmander",
    "caterpie",
    "pidgey",
    "squirtle",
  ];
  const pokemonesDuplicados = POKEMONES.concat(POKEMONES);
  let pokemonesMezclados = mezclarArray(pokemonesDuplicados);

  asignarPokemones(pokemonesMezclados);
  deshabilitarBotonesNiveles();
}

function remarcarSeleccionarTurno(){
  const $mensajeSeleccionarTurno = document.querySelector("#mensaje-seleccionar-nivel");
  $mensajeSeleccionarTurno.classList.add("animate__animated", "animate__shakeX");
  $mensajeSeleccionarTurno.addEventListener('animationend', () => {
    $mensajeSeleccionarTurno.classList.remove("animate__animated", "animate__shakeX");
  });
}

function deshabilitarBotonesNiveles(){
  [$botonNivelFacil, $botonNivelMedio, $botonNivelDificil].forEach((boton)=>{
    boton.onclick = () => {};
    boton.className = "btn btn-outline-light disabled w-100 mt-1";
  });

}

function mezclarArray(array) {
  return array.sort(() => 0.5 - Math.random());
}

function asignarPokemones(pokemonesMezclados) {
  $tarjetas.forEach(function (tarjeta, indice) {
    tarjeta.classList.add(`${pokemonesMezclados[indice]}`, "tarjeta");
  });
}

function deshabilitar($tarjeta) {
  $tarjeta.classList.add("tarjeta-deshabilitada");
}

function mostrarPokemon($tarjeta) {
  reproducirSonido();
  $tarjeta.classList.remove("tarjeta");
}

function esconderPokemon($tarjeta) {
  $tarjeta.classList.add("tarjeta");
}

function reproducirSonido() {
  const audio = new Audio("./audio/click.mp3");
  audio.play();
}

function deshabilitarTurnoUsuario() {
  $tablero.onclick = function () {};
  setTimeout(() => {
    $tablero.onclick = manejarClick;
  }, 500);
}

function ganar(turnosRestantes) {
  reproducirSonidoGanar();
  const $mensajeGanar = document.querySelector("#mensaje-ganar");
  const cantidadIntentosRestantes = document.querySelector("#mensaje-ganar strong");
  $mensajeGanar.classList.remove("oculto");
  cantidadIntentosRestantes.textContent = turnosRestantes;
}

function reproducirSonidoGanar() {
  const audioGanar = new Audio("./audio/ganar.mp3");
  audioGanar.play();
}

function reiniciarPartida() {
  esconderCartelFinal();
  reiniciarValoresIniciales();
  iniciarJuego();
}

function reiniciarValoresIniciales() {
  $tarjetaAnterior = null;
  contadorParesHallados = 0;
  turnosRestantes = undefined;
  reiniciarTarjetas();
}

function reiniciarTarjetas() {
  $tarjetas.forEach((tarjeta) => (tarjeta.className = "col rounded"));
}

function esconderCartelFinal() {
  document.querySelector("#mensaje-ganar").classList.add("oculto");
}

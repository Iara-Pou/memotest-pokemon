const $tablero = document.querySelector("#tablero");
const $tarjetas = $tablero.querySelectorAll(".col");
const $botonReinicio = document.querySelector("#boton-reinicio-juego");
const $botonJugar = document.querySelector("#boton-jugar");

const TOTAL_PARES = 6;
let $tarjetaAnterior = null;
let contadorParesHallados = 0;
let partidaIniciada;
let turnosRestantes;

$tablero.onclick = manejarClick;
$botonJugar.onclick = manejarInicioPartida;
$botonReinicio.onclick = reiniciarPartida;
document.querySelector("#boton-facil").onclick = () => asignarTotalTurnos(30);
document.querySelector("#boton-medio").onclick = () => asignarTotalTurnos(15);
document.querySelector("#boton-dificil").onclick = () => asignarTotalTurnos(10);

function asignarTotalTurnos(totalTurnos) {
  turnosRestantes = totalTurnos;
  actualizarTurnosRestantes(turnosRestantes);
}

function actualizarTurnosRestantes() {
  document.querySelector("#turnos-restantes").textContent = turnosRestantes;

  if (turnosRestantes <= 0) {
    setTimeout(() => {
      perder();
    }, 500);
  }
}

function manejarInicioPartida() {
  const nivelNoSeleccionado = turnosRestantes === undefined;

  if (nivelNoSeleccionado) {
    remarcarSeleccionarTurno();
    return;
  } else if (partidaIniciada) {
    return;
  }

  iniciarJuego();
  partidaIniciada = true;
}

function manejarClick(e) {
  const $tarjeta = e.target;
  const clickEnTarjeta = $tarjeta.classList.contains("tarjeta");
  const tarjetaHabilitada = ! $tarjeta.classList.contains("deshabilitado");

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

function remarcarSeleccionarTurno() {
  const $mensajeSeleccionarTurno = document.querySelector(
    "#mensaje-seleccionar-nivel"
  );
  $mensajeSeleccionarTurno.classList.add(
    "animate__animated",
    "animate__shakeX"
  );
  $mensajeSeleccionarTurno.addEventListener("animationend", () => {
    $mensajeSeleccionarTurno.classList.remove(
      "animate__animated",
      "animate__shakeX"
    );
  });
}

function deshabilitarBotonesNiveles() {
  const $botonNivelFacil = document.querySelector("#boton-facil");
  const $botonNivelMedio = document.querySelector("#boton-medio");
  const $botonNivelDificil = document.querySelector("#boton-dificil");
  const botonesNiveles = [
    $botonNivelFacil,
    $botonNivelMedio,
    $botonNivelDificil,
  ];
  botonesNiveles.forEach((boton) => {
    deshabilitar(boton);
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

function deshabilitar($elemento) {
  $elemento.onclick = () => {};
  $elemento.classList.add("deshabilitado");
  if($elemento.tagName === "BUTTON"){
    //cancela :hover y :active default en botones bootstrap
    $elemento.classList.add("disabled");
  }
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
  document.querySelector("#mensaje-final").classList.remove("oculto");
  document.querySelector("#ganador").classList.remove("oculto");
  const cantidadIntentosRestantes = document.querySelector(
    "#mensaje-final strong"
  );
  cantidadIntentosRestantes.textContent = turnosRestantes;
}

function perder() {
  deshabilitarTarjetas();
  reproducirSonidoPerder();
  document.querySelector("#mensaje-final").classList.remove("oculto");
  document.querySelector("#perdedor").classList.remove("oculto");
}

function deshabilitarTarjetas(){
  $tarjetas.forEach(($tarjeta)=>{
    deshabilitar($tarjeta);
  })
}

function reproducirSonidoPerder() {
  const audioPerder = new Audio("./audio/perder.mp3");
  audioPerder.play();
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
  document.querySelector("#mensaje-final").classList.add("oculto");
}

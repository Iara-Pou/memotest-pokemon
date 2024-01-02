const $tablero = document.querySelector("#tablero");
const $tarjetas = $tablero.querySelectorAll(".col");
const $botonReinicio = document.querySelector("#boton-reinicio-juego");
const TOTAL_PARES = 6;
const configuracionUsuario = {
  sonido: true,
  musica: true,
};

let $tarjetaAnterior = null;
let contadorParesHallados = 0;
let contadorIntentos = 0;
let cantidadIntentosUsuario = false;
let usuarioConTurnos = cantidadIntentosUsuario !== false;

iniciarJuego();
$tablero.onclick = manejarClick;
$botonReinicio.onclick = reiniciarPartida;

document.querySelector("#boton-sonido").onclick = (e) => {
  if (configuracionUsuario.sonido) {
    configuracionUsuario.sonido = false;
    e.target.classList = "bi bi-ear-fill";
  } else {
    configuracionUsuario.sonido = true;
    e.target.classList = "bi bi-ear";
  }
};

document.querySelector("#boton-musica").onclick = (e) => {
  if (configuracionUsuario.musica) {
    configuracionUsuario.musica = false;
    e.target.classList = "bi bi-volume-down-fill";
  } else {
    configuracionUsuario.musica = true;
    e.target.classList = "bi bi-volume-down";
  }
};

function deshabilitarTarjetas() {
  $tarjetas.forEach((tarjeta) => {
    tarjeta.classList.add("tarjeta-deshabilitada");
  });
}

function manejarClick(e) {
  const $tarjeta = e.target;
  const clickEnTarjeta = $tarjeta.classList.contains("tarjeta");
  const tarjetaHabilitada = !$tarjeta.classList.contains(
    "tarjeta-deshabilitada"
  );

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
          ganar(contadorIntentos);
        } else if (
          cantidadIntentosUsuario === 0 &&
          contadorParesHallados !== TOTAL_PARES
        ) {
          perder();
        }
      }, 500);
    } else if ($tarjeta.className !== $tarjetaAnterior.className) {
      setTimeout(() => {
        esconderPokemon($tarjetaAnterior);
        esconderPokemon($tarjeta);
        $tarjetaAnterior = null;
      }, 500);
    }

    deshabilitarTurnoUsuario();
    contadorIntentos++;
    //si no está en fácil donde cantidadIntentos es 0, cuenta los turnos.
    if (cantidadIntentosUsuario !== false) manejarTurnosRestantes();
  }
}

function manejarTurnosRestantes() {
  cantidadIntentosUsuario--;
  mostrarTurnosRestantes();
}

function mostrarTurnosRestantes() {
  document.querySelector("#cantidad-intentos").textContent =
    cantidadIntentosUsuario;
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
  if (configuracionUsuario.sonido) reproducirSonido();
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

function ganar(contadorIntentos) {
  if (configuracionUsuario.musica) reproducirSonidoGanar();

  const $mensajeGanar = document.querySelector("#mensaje-ganar");
  const cantidadIntentos = document.querySelector("#mensaje-ganar strong");
  $mensajeGanar.classList.remove("oculto");
  cantidadIntentos.textContent = contadorIntentos;
}

function perder() {
  const $mensajePerder = document.querySelector("#mensaje-perder");
  $mensajePerder.classList.remove("oculto");
  deshabilitarTarjetas();
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
  contadorIntentos = 0;
  reiniciarTarjetas();
}

function reiniciarTarjetas() {
  $tarjetas.forEach((tarjeta) => (tarjeta.className = "col rounded"));
}

function esconderCartelFinal() {
  document.querySelector("#mensaje-ganar").classList.add("oculto");
}

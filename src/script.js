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
let usuarioTieneTurnos;

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
    if (usuarioTieneTurnos) manejarTurnosRestantes();

    //ganar o perder
    setTimeout(() => {
      if (
        cantidadIntentosUsuario === 0 &&
        contadorParesHallados !== TOTAL_PARES
      ) {
        perder();
      } else if (contadorParesHallados === TOTAL_PARES) {
        ganar(contadorIntentos);
      }
    }, 500);
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
  mostrarResultadoPartida(
    "¡Ganaste!",
    "Ganaste en " + contadorIntentos + " intentos."
  );
}

function perder() {
  mostrarResultadoPartida("¡Perdiste!", "Te quedaste sin intentos.");
  deshabilitarTarjetas();
}

function mostrarResultadoPartida(titulo, mensajeResultado) {
  document.querySelector("#mensaje-resultado").classList.remove("oculto");
  document.querySelector("#mensaje-resultado #resultado-titulo").textContent =
    titulo;
  document.querySelector(
    "#mensaje-resultado #resultado-informacion-intentos"
  ).textContent = mensajeResultado;
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

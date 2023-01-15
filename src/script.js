const $tablero = document.querySelector("#tablero");
const $tarjetas = $tablero.querySelectorAll(".col");
const $botonReinicio = document.querySelector("#boton-reinicio-juego")
const TOTAL_PARES = 6;
let $tarjetaAnterior = null;
let contadorParesHallados = 0;
let contadorIntentos = 0;

iniciarJuego();
$tablero.onclick = manejarClick;
$botonReinicio.onclick = reiniciarPartida;

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
                    ganar(contadorIntentos);
                }

            }, 500)

        } else if ($tarjeta.className !== $tarjetaAnterior.className) {
            setTimeout(() => {
                esconderPokemon($tarjetaAnterior);
                esconderPokemon($tarjeta);
                $tarjetaAnterior = null;

            }, 500)
        }

        deshabilitarTurnoUsuario();
        contadorIntentos++;
    }

}

function iniciarJuego() {
    const POKEMONES = ["pickachu", "bulbasaur", "charmander", "caterpie", "pidgey", "squirtle"];
    const pokemonesDuplicados = POKEMONES.concat(POKEMONES);
    let pokemonesMezclados = mezclarArray(pokemonesDuplicados);

    asignarPokemones(pokemonesMezclados);
}

function mezclarArray(array) {
    return array.sort(() => .5 - Math.random());
}

function asignarPokemones(pokemonesMezclados) {
    $tarjetas.forEach(function (tarjeta, indice) {
        tarjeta.classList.add(`${pokemonesMezclados[indice]}`, "tarjeta");
    })
}

function deshabilitar($tarjeta) {
    $tarjeta.classList.add("tarjeta-deshabilitada")
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
    $tablero.onclick = function () { };
    setTimeout(() => {
        $tablero.onclick = manejarClick;
    }, 500)
}

function ganar(contadorIntentos) {
    reproducirSonidoGanar();
    const $mensajeGanar = document.querySelector("#mensaje-ganar");
    const cantidadIntentos = document.querySelector("#mensaje-ganar strong");
    $mensajeGanar.classList.remove("oculto");
    cantidadIntentos.textContent = contadorIntentos;
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
    $tarjetas.forEach(tarjeta => tarjeta.className = "col rounded")
}

function esconderCartelFinal() {
    document.querySelector("#mensaje-ganar").classList.add("oculto");
}

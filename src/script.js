function manejarClick(e) {
    const $tarjeta = e.target;
    const clickEnTarjeta = $tarjeta.classList.contains("tarjeta");
    const tarjetahabilitada = !$tarjeta.classList.contains("deshabilitada");

    if (tarjetahabilitada && clickEnTarjeta) {

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
                if (contadorParesHallados === 6) {
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
    const pokemones = ["pickachu", "bulbasaur", "charmander", "caterpie", "pidgey", "squirtle"];
    const pokemonesDuplicados = pokemones.concat(pokemones);
    let pokemonesMezclados = mezclarArray(pokemonesDuplicados);

    asignarEstilos(pokemonesMezclados);
}

function mezclarArray(array) {
    return array.sort(() => .5 - Math.random());
}

function asignarEstilos(pokemonesMezclados) {
    $tarjetas.forEach(function (tarjeta, indice) {
        tarjeta.classList.add(`${pokemonesMezclados[indice]}`);
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
    const audio = new Audio("../audio/click.mp3");
    audio.play();
}

function ganar(contadorIntentos) {
    reproducirSonidoGanar();
    mostrarMensajeGanar(contadorIntentos);
}

function mostrarMensajeGanar(contadorIntentos) {
    const $mensajeGanar = document.querySelector("#mensaje-ganar");
    const cantidadIntentos = document.querySelector("#mensaje-ganar strong");
    $mensajeGanar.classList.remove("oculto");
    cantidadIntentos.textContent = contadorIntentos;
}

function reproducirSonidoGanar() {
    const audio = new Audio("../audio/ganar.mp3");
    audio.play();
}

function deshabilitarTurnoUsuario(){
    $tablero.onclick = function(){};
    setTimeout(()=> {$tablero.onclick = manejarClick;
    } , 500)
}

const $tablero = document.querySelector("#tablero");
const $tarjetas = $tablero.querySelectorAll(".col");
let $tarjetaAnterior = null;
let contadorParesHallados = 0;
let contadorIntentos = 0;

iniciarJuego();
$tablero.onclick = manejarClick;

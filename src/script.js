const $pantalla = document.querySelector(".container");
const $tarjetas = $pantalla.querySelectorAll(".col");
let $tarjetaAnterior = null;

inicializarjuego();

function inicializarjuego() {
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

$pantalla.onclick = function (e) {
    const $tarjeta = e.target;
}
}

function mostrarPokemon($tarjeta) {
    reproducirSonido();
    $tarjeta.classList.remove("tarjeta");
}

function esconderPokemon($tarjeta){
    $tarjeta.classList.add("tarjeta");
}

function reproducirSonido(){
    const audio = new Audio("../audio/click.mp3");
    audio.play();
}

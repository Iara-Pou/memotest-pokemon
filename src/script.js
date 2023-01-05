const $pantalla = document.querySelector(".container");
const $tarjetas = $pantalla.querySelectorAll(".col");

inicializarjuego();

function inicializarjuego() {
    const pokemones = ["pickachu", "bulbasaur", "charmander", "caterpie", "pidgey", "squirtle"];
    const pokemonesDuplicados = pokemones.concat(pokemones);
    let pokemonesMezclados = mezclarArray(pokemonesDuplicados);
function mezclarArray(array) {
    return array.sort(() => .5 - Math.random());
}
}
}

function reiniciarPartida() {
  reiniciarValoresIniciales();
  volverInicioJuego();
}

function volverInicioJuego() {
  esconderCartelFinal();
  esconderTablero();
  mostrarInicio();
}

function reiniciarValoresIniciales() {
  $tarjetaAnterior = null;
  contadorParesHallados = 0;
  contadorIntentos = 0;
  reiniciarPantallaInicio();
  reiniciarTarjetas();
}

function reiniciarPantallaInicio() {
  document.querySelector("#contenedor-aviso-turnos").classList.add("oculto");
}

function reiniciarTarjetas() {
  $tarjetas.forEach((tarjeta) => (tarjeta.className = "col rounded"));
}

function esconderCartelFinal() {
  document.querySelector("#mensaje-resultado").classList.add("oculto");
}

function esconderTablero() {
  document.querySelector("#pantalla-juego").classList.add("oculto");
}

function mostrarInicio() {
  document.querySelector("#pantalla-inicio").classList.remove("oculto");
}

const $botonReinicio = document.querySelector("#boton-reinicio-juego");
$botonReinicio.onclick = reiniciarPartida;

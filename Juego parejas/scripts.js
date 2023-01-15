// Constante para todo el script, donde recojo todos los divs que tengan como clase celda
const celdas = document.querySelectorAll('.celda');

//Variables auxuliares pora controlar que gira o no gira. Es decir, que sea el data valor de la celda igual al del otro.
let variable_Auxiliar = false;
let variable_Auxiliar_Dos = false;
//Variables para mis celdas, parejas.
let primeraCarta, segundaCarta;
//contador para el número de aciertos que se mostrará en el input
let contador_Aciertos = 0;

// Funcion que invierte las celdas y comprueba si son iguales
function girar_Celda() {
  if (variable_Auxiliar_Dos) return;
  if (this === primeraCarta) return;
  // añade la clase flip para darle efecto a la celda cuando esta va a girar
  this.classList.add('flip');
  if (!variable_Auxiliar) {
    variable_Auxiliar = true;
    primeraCarta = this;
    return;
  }
  segundaCarta = this;
  comprobar_Pareja();
}

//Comprueba si las dos celdas son iguales. El resultado se almacena en una variable pareja.
//Si es true desactiva las celdas(desactivar_Celdas), Si es false le quita la clase flip del css(quitar_Giro_Celdas)
function comprobar_Pareja() {
  //Para acceder a cualquier data-- valor del html utilizamos dataset y su nombre
  let pareja = primeraCarta.dataset.valor === segundaCarta.dataset.valor;
  pareja ? desactivar_Celdas() : quitar_Giro_Celdas();
}

// Funcion que elimina el listener para que no se les pueda dar la vuelta y va sumando al acertar en el contador
function desactivar_Celdas() {
  primeraCarta.removeEventListener('click', girar_Celda);
  segundaCarta.removeEventListener('click', girar_Celda);
  // Actualiza el contador de aciertos
  contador_Aciertos++;
  document.getElementById("input").value = contador_Aciertos;
  // Le pongo la clase verde para que se ponga el borde en verde
  primeraCarta.classList.add('verde');
  segundaCarta.classList.add('verde');
  resetear_Valores();
}

function quitar_Giro_Celdas() {
  variable_Auxiliar_Dos = true;

  setTimeout(() => {
    primeraCarta.classList.remove('flip');
    segundaCarta.classList.remove('flip');
    resetear_Valores();
  }, 1500);
}
// Resetar valores para seguir jugando
function resetear_Valores() {
  [variable_Auxiliar, variable_Auxiliar_Dos] = [false, false];
  [primeraCarta, segundaCarta] = [null, null];
}

// Funcion que reinicia el contador a 0 y ordena aleatoriamente las celdas. Uso una funcion local para usar las variables solo dentro de la funcion.
(function posicion_Aleatoria_Celdas() {
  contador_Aciertos = 0;
  document.getElementById("input").value = contador_Aciertos;
  // Genera aleatoriamente el orden donde estará cada celda
  celdas.forEach(card => {
    let posicion_Aleatoria = Math.floor(Math.random() * 12);
    card.style.order = posicion_Aleatoria;
  });
})();

// a cada celda le pongo el listener girar_Celda, para que gire al hacer click. Ira a la funcion invertir celda
celdas.forEach(card => card.addEventListener('click', girar_Celda));


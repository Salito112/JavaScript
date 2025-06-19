// =====================================
// Parte 3: Entrada y Salida de Datos
// =====================================

let edad = prompt("¿Cuál es tu edad?");
console.log("Tienes " + edad + " años");

alert("¡Bienvenido/a al sitio!");

let continuar = confirm("¿Deseas continuar?");
console.log("¿Desea continuar?:", continuar);
// =====================================
// Parte 5: Condicionales
// =====================================

let numero = Number(prompt("Ingresa un número:"));
if (numero > 10) {
  console.log(numero+ " Es mayor que 10");
} else if (numero < 10) {
  console.log(numero+ " Es menor que 10");
} else {
  console.log(numero+ " Es igual a 10");
}

let usuario = prompt("¿Cuál es tu nombre?");
if (usuario === "Admin") {
  console.log("¡Bienvenido, administrador!");
} else {
  console.log("Hola, " + usuario);
}

let num = prompt("Introduce un número para determinar si es par o impar:");
let esPar = num % 2 === 0 ? "par" : "impar";
console.log("El número " +num +" es "+ esPar);

// =====================================
// Parte 6: Consola del Navegador
// =====================================

console.info("Este es un mensaje informativo");
console.warn("¡Cuidado! Esto es una advertencia");
console.error("¡Error! Algo salió mal");

console.group("Grupo de mensajes");
console.log("Mensaje dentro del grupo 1");
console.log("Mensaje dentro del grupo 2");
console.groupEnd();
console.time("14/02/2025")

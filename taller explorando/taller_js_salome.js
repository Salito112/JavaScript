// Parte 2: Variables y Tipos de Datos
// =====================================

let nombre = "Salo";
console.log("Hola, " + nombre);

let numeroEntero = 10;
let numeroDecimal = 3.5;
let texto = "Hola mundo";
console.log(numeroEntero, numeroDecimal, texto);

const PI = 3.1416;
// PI = 3.15; // Esto causará un error porque PI es constante

let sinValor;
console.log(sinValor); // undefined

let vacio = null;
let booleano = true;
console.log(vacio, booleano);



// =====================================
// Parte 4: Operadores
// =====================================

let a = 15;
let b = 4;
console.log("Suma:", a + b);
console.log("Resta:", a - b);
console.log("Multiplicación:", a * b);
console.log("División:", a / b);
console.log("Módulo:", a % b);

let saludo = "Hola";
let persona = "Luis";
let mensaje = saludo + " " + persona;
console.log(mensaje);

console.log(5 == "5");     // true
console.log(5 === "5");    // false
console.log(true && false); // false
console.log(false || true); // true
console.log(!true);         // false



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

console.time("Tiempo de ejecución");
for (let i = 0; i < 1000000; i++) {}
console.timeEnd("Tiempo de ejecución");

// =====================================
// Parte 7: Comentarios
// =====================================

// Comentario de una línea
// Mostramos un mensaje de saludo

/*
  Bloque de comentarios:
  Esta parte sirve para explicar múltiples líneas
*/

let saludoUsuario = "Hola de nuevo";
console.log(saludoUsuario);
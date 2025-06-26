//=============================
// Clasificador de triangulos
//=============================

let lado1 = parseFloat(prompt("Ingresa el primer lado del triángulo: "));
let lado2 = parseFloat(prompt("Ingresa el segundo lado del triángulo: "));
let lado3 = parseFloat(prompt("Ingresa el tercer lado del triángulo: "));
if (lado1 === lado2 && lado2 === lado3) {
    console.log("El triángulo es equilátero.");
}else if (lado1 === lado2 || lado2 === lado3 || lado1 === lado3) {
    console.log("El triángulo es isósceles.");
}else if (lado1 !== lado2 && lado2 !== lado3 && lado1 !== lado3) {
    console.log("El triángulo es escaleno.");
}else {
    console.log("No es un triángulo válido.");
}
//======================
//Metodos de las listas
//======================
// Ejercicio 1: Quita el primer elemento
let frutas = ["Fresa", "banano", "mango"];
frutas.shift();
console.log(frutas); 

//Ejercicio 2: Agrega un número al final
let numeros = [1, 2, 3];
numeros.push(4);
console.log(numeros);

// Ejercicio 3: Agrega un elemento al principio
let palabras = ["voleibol", "futbol"];
palabras.unshift("basquetbol");
console.log(palabras);

// Ejercicio 4: Elimina el último elemento
let colores = ["rosa", "verde", "azul"];
colores.pop();
console.log(colores); 

// Ejercicio 5: Extrae un valor sin modificar original
let animales = ["perro", "gato", "caballo", "vaca"];
let algunos = animales.slice(1, 3);
console.log(algunos); 
console.log(animales); 

// Ejercicio 6: Reemplaza un elemento
let comidas = ["pizza", "hamburguesa", "salchipapas"];
comidas[1] = "perros";
console.log(comidas); 

//Ejercicio 7: Une en un string en una frase
let palabras2 = ["Hola", "bienvenido a", "JavaScript"];
let frase = palabras2.join(" ");
console.log(frase); 

// Ejercicio 8: Ordena alfabéticamente
let nombres = ["Andres", "Camila", "Miguel", "Pablo"];
nombres.sort();
console.log(nombres);

// Ejercicio 9: Invierte el orden
let numeros2 = [1, 2, 3, 4];
numeros2.reverse();
console.log(numeros2);

// Ejercicio 10: Verifica si existe un valor
let colores2 = ["rojo", "verde", "azul"];
let existe = colores2.includes("verde");
console.log(existe);

//========================================
//Ejercicios con for, for...in y for...of
//========================================
//Imprimir los caracteres de una palabra
let palabra = "Hola";
for (let letra of palabra) {
  console.log(letra);
}

//Contar del 1 al 5 usando for clásico
for (let i = 1; i <= 5; i++) {
  console.log(i);
}

//Mostrar la posición de cada letra en una palabra usando for...in
let palabra2 = "Hola";
for (let indice in palabra2) {
  console.log(`Índice ${indice}: ${palabra2[indice]}`);
}
 
//====================================
//For, for... in y for...of con arrays
//====================================
//Recorrer una lista de nombres usando for...of
let nombres2 = ["Ana", "Luis", "Carlos"];
for (let nombre of nombres2) {
  console.log(`Hola, ${nombre}`);
}

//Imprimir índices de una lista usando for...in
let color = ["rojo", "verde", "azul"];
for (let indice in color) {
  console.log(indice);
}

//Imprimir índice y valor de cada número en un array
let number = [10, 20, 30, 40];
for (let i in number) {
  console.log(`Índice ${i}: ${number[i]}`);
}

//=====================
//Ejercicios de objetos
//=====================
//Crear un objeto persona 
let persona = {
  nombre: "Laura",
  edad: 28,
  ciudad: "Bogotá"
};

//Mostrar el valor de una propiedad específica
console.log(persona.nombre);  // "Laura"

// Modificar una propiedad existente en un objeto libro:
let libro = {
  titulo: "El Principito",
  autor: "Antoine de Saint-Exupéry"
};

libro.titulo = "El Principito (Edición Especial)";
console.log(libro.titulo);

// Agregar una nueva propiedad a un objeto auto:
let auto = {
  marca: "Toyota",
  modelo: "Corolla"
};

auto.color = "Rojo";
console.log(auto);

//Recorrer un objeto estudiante y mostrar claves y valores:
let estudiante = {
  nombre: "Sofia",
  edad: 21,
  carrera: "Ingeniería"
};

for (let clave in estudiante) {
  console.log(`${clave}: ${estudiante[clave]}`);
}

//===================================
//Ejercicios para practicar funciones
//===================================
//Saludo personalizado:
function saludar(nombre) {
  return `Hola, ${nombre}!`;
}
console.log(saludar("Salo"));

//Suma de dos números:
function sumar(a, b) {
  return a + b;
}

console.log(sumar(5, 3));

// Número par o impar:
function esPar(num) {
  return num % 2 === 0;
}
console.log(esPar(4));  // true
console.log(esPar(7));  // false

//Calcular el área de un rectángulo:

function areaRectangulo(base, altura) {
  return base * altura;
}
console.log(areaRectangulo(4, 5)); // 20

//Convertir grados Celsius a Fahrenheit:
function celsiusAFahrenheit(celsius) {
  return celsius * 1.8 + 32;
}
console.log(celsiusAFahrenheit(30));  // 86





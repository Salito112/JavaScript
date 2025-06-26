//============================
//Inicializacion del programa
//============================
console.log("Bienvenido al menu de la veterinaria!")

// ===========================
// Funciones flecha 
// ===========================

// Filtrar mascotas vacunadas
const filtrarVacunados = () => mascotas.filter(m => m.vacunado);

// Calcular el promedio de edad
const calcularPromedioEdad = () => {
  const totalEdad = mascotas.reduce((acc, m) => acc + m.edad, 0);
  return mascotas.length ? (totalEdad / mascotas.length).toFixed(2) : 0;
};

// Ordenar mascotas por edad (de menor a mayor)
const ordenarPorEdad = () => [...mascotas].sort((a, b) => a.edad - b.edad);


let mascotas = [
  { nombre: "Salchichon", especie: "Perro", edad: 3, vacunado: true },
  { nombre: "Aguapanela", especie: "Gato", edad: 5, vacunado: false },
  { nombre: "Mariana", especie: "Hamster", edad: 2, vacunado: true },
  { nombre: "Samuel", especie: "Iguana", edad: 2, vacunado: false}
];

// ===========================
//  funciones principales
// ===========================

// Agregar nueva mascota
function agregarMascota() {
  const nombre = prompt("Nombre de la mascota:");
  const especie = prompt("Especie (Perro, Gato, Hamster, Iguana):");
  const edad = parseInt(prompt("Edad:"));
  const vacunado = prompt("¿Está vacunado? (sí/no):").toLowerCase() === "sí";

  if (nombre && especie && !isNaN(edad)) {
    mascotas.push({ nombre, especie, edad, vacunado });
    alert("Mascota agregada correctamente.");
  } else {
    alert("Datos inválidos. Intenta de nuevo.");
  }
}

// Buscar mascota por nombre
function buscarMascota() {
  const nombreBuscado = prompt("Nombre de la mascota a buscar:");
  const encontrada = mascotas.find(m => m.nombre.toLowerCase() === nombreBuscado.toLowerCase());

  if (encontrada) {
    alert(`Mascota encontrada:\n${formatearMascota(encontrada)}`);
  } else {
    alert(" Mascota no encontrada.");  }
}

// =========================================
// resultados en navegador
// ===========================================

// Mostrar todas las mascotas
function mostrarTodasMascotas() {
  console.log("Lista de todas las mascotas:");
  mascotas.forEach(m => console.log(formatearMascota(m)));
  alert(mascotas)
}

// Mostrar mascotas vacunadas
function mostrarVacunadas() {
  const vacunadas = filtrarVacunados();
  if (vacunadas.length) {
    console.log("Mascotas vacunadas:");
    vacunadas.forEach(m => console.log(formatearMascota(m)));
  } else {
    alert("No hay mascotas vacunadas.");
  }
}

// Mostrar mascotas ordenadas por edad
function mostrarOrdenadasEdad() {
  const ordenadas = ordenarPorEdad();
  console.log("Mascotas ordenadas por edad:");
  ordenadas.forEach(m => console.log(formatearMascota(m)));
  alert( n  )
}

// Mostrar promedio de edad
function mostrarPromedioEdad() {
  const promedio = calcularPromedioEdad();
  alert(`Promedio de edad: ${promedio} años`);
}

// Función para formatear una mascota en texto legible
function formatearMascota(m) {
return `Nombre=${m.nombre}; Especie=${m.especie}; Edad= ${m.edad}; Vacunado=${m.vacunado ? "Sí" : "No"}`;
}

// ===========================
//  Menú principal
// ===========================

function mostrarMenu() {
  let opcion;
  do {
    opcion = prompt(
      "Gestor de Mascotas\n\n" +
      "1. Agregar nueva mascota\n" +
      "2. Buscar mascota por nombre\n" +
      "3. Mostrar todas las mascotas\n" +
      "4. Ver solo mascotas vacunadas\n" +
      "5. Ver promedio de edad\n" +
      "6. Mostrar mascotas ordenadas por edad\n" +
      "0. Salir\n\n" +
      "Ingrese una opción:"
    );

    switch (opcion) {
      case "1": agregarMascota(); break;
      case "2": buscarMascota(); break;
      case "3": mostrarTodasMascotas(); break;
      case "4": mostrarVacunadas(); break;
      case "5": mostrarPromedioEdad(); break;
      case "6": mostrarOrdenadasEdad(); break;
      case "0": alert("Saliendo del gestor..."); break;
      default: alert("Opción no válida. Intenta nuevamente.");
    }
  } while (opcion !== "0");
}

// Ejecutar el menú al iniciar
mostrarMenu();
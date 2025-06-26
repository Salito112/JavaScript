let array = [0,1,2,3]

let container = document.getElementById('container');

container.innerHTML= `<ul>`
container.innerHTML += `<h1>HOLAAA</h1>`
array.forEach(numero => {
    container.innerHTML +=`<li>${numero}</li>`
})
container.innerHTML += `</ul>`


// Imprimir mensaje por cada color

let colores = ["amrrillo", "rosado", "azul","verde"]

container.innerHTML+= `<ul>`
container.innerHTML += `<h1>HOLAAA</h1>`
colores.forEach(color => {
    container.innerHTML +=`<li class= > EL color ${color} es muy bonito </li>`
})
container.innerHTML += `</ul>`


//Frases motivadoras

let frases = ["Si estas mal, salome esta peor", "the true gonorrea of the coding", "Comer baguette sana el alma"]

container.innerHTML+= `<ul>`
container.innerHTML += `<h1>Frases</h1>`
frases.forEach(frase => {
    container.innerHTML +=`<li>${frase}</li>`
})
container.innerHTML += `</ul>`

//  Lista de números
let numeros = [10, 20, 30];
let listaNumeros = document.getElementById("numeros");
numeros.forEach(num => {
  listaNumeros.innerHTML += `<li>${num}</li>`;
});

// Tarjeta persona
let persona = { nombre: "Ana", edad: 28, ocupacion: "Vendedora" };
document.getElementById("persona").innerHTML = `

    <h2>${persona.nombre}</h2>
    <p>Edad: ${persona.edad}</p>
    <p>Ocupación: ${persona.ocupacion}</p>`
;

//  Canción
let cancion = { titulo: "Mujeres Talentosas", artista: "Luigi 21 ", duracion: "5:44" };
document.getElementById("cancion").innerHTML = `
  <div class="cancion">
    <h3>${cancion.titulo}</h3>
    <p>Artista: ${cancion.artista}</p>
    <p>Duración: ${cancion.duracion}</p>
  </div>`
;

// Producto
let producto = { nombre: "Apple", precio: 2500, stock: 12 };
document.getElementById("producto").innerHTML = `
  <ul>
    <li>Nombre: ${producto.nombre}</li>
    <li>Precio: $${producto.precio}</li>
    <li>Stock: ${producto.stock}</li>
  </ul>`


// 7. Tarjetas de usuarios
let usuarios = [
  { nombre: "Pablo", correo: "Yanomas@gmail.com" },
  { nombre: "Mariana", correo: "garota@gmail.com" }
]
let containerUsuarios = document.getElementById("usuarios");
usuarios.forEach(user => {
  containerUsuarios.innerHTML += `
      <h4>${user.nombre}</h4>
      <p>${user.correo}</p>`

})

// 8. Lista de libros
let libros = [
  { titulo: "El principito", autor: "Antoine de Saint-Exupéry", año: 1943 },
  { titulo: "Cien años de soledad", autor: "Gabriel Garcia. Márquez", año: 1967 }
]
let listaLibros = document.getElementById("libros");
libros.forEach(libro => {
  listaLibros.innerHTML += `<li>${libro.titulo} (${libro.año}) - ${libro.autor}</li>`;
});

// 9. Lista de tareas con íconos
let tareas = [
  { descripcion: "Teorica DOM", completada: true },
  { descripcion: "Hacer ejercicios", completada: false }
];
let containerTareas = document.getElementById("tareas");  
let icono = tareas.completada ? "✅" : "❌";
containerTareas.innerHTML += `<p>${icono} ${tareas.descripcion}</p>`
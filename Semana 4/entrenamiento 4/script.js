// Mostrar datos almacenados al cargar la página
window.onload = () => {
    displayData();  //Inmediatamente cuando se termina de cargar toda la pagina se llama a la funcion para que muestre los datos guardados (nombre y edad) en caso tal de que aun no haya muestra el mensaje por defecto
    showInteractionCount(); // Mostrar contador desde el inicio
};

// Guardar datos en localStorage
document.getElementById('saveButton').addEventListener('click', () => { // Para escuchar los click del boton guardar, despues accedo a los capos del formulario y almaceno sus referencias en constantes
    const nameInput = document.getElementById('name');
    const ageInput = document.getElementById('age');

    const name = nameInput.value.trim(); // validaciones primera para eliminar espacios al final y al inicio del  nombre la segunda para convertir la edad de texto a entero
    const age = parseInt(ageInput.value);

    if (name && !isNaN(age)) { //Si el texto no es vacio y lo que hay en la variable edad es un numero de tipo numero en este caso entero entra al codicional y almacena las variables en el localStorage
        localStorage.setItem('userName', name); 
        localStorage.setItem('userAge', age); // recordar (key, valor)
        console.log(`El nombre: ${name} y la edad: ${age} han sido almacenados correctamente`)
        displayData();
        updateInteractionCount(); // Para contar clic en "Guardar Datos"

        nameInput.value = '';
        ageInput.value = '';    //Despues de dar click en el boton guardar limpio mis input de manera automatica
    } else {
        alert("Por favor ingresa un nombre válido y una edad numérica");
    } // mensaje por defecto se muestra cuanto no se cumple la afirmacion del if ejemplo si el nombre esta vacio o el tipo de dato de la variable edad no es un numero
});

// Mostrar datos guardados
function displayData() {
    const name = localStorage.getItem('userName');
    const age = localStorage.getItem('userAge'); // usamos .getItem para recuperar los datos guardados en el local
    const outputDiv = document.getElementById("output");

    if (name && age) { // si los datos son verdaderos me inserta el mensaje concatenado en el html
        outputDiv.textContent = `Hola ${name}, tienes ${age} años.`;
        console.log(`Datos insertados en el DOM de manera exitosa`)

    } else {
        outputDiv.textContent = `No hay datos almacenados.`;
        console.log(`Aun no has introducido datos en el formulario`)
    }
}

// Inicializar contador si no existe (solo la primera vez en esta pestaña)
if (!sessionStorage.getItem('interactionCount')) {
    sessionStorage.setItem('interactionCount', 0);
    console.log(`Contado inicializado en cero por primera vez`)
}

// Actualizar contador de interacciones
function updateInteractionCount() {
    let count = parseInt(sessionStorage.getItem('interactionCount')) || 0;
    count++;
    console.log(`Aumentando contador +1`)
    sessionStorage.setItem('interactionCount', count);
    showInteractionCount();
}

// Mostrar contador en pantalla
function showInteractionCount() {
    const counterDiv = document.getElementById('counter');
    const count = sessionStorage.getItem('interactionCount') || 0;
    counterDiv.textContent = `Interacciones en esta sesión: ${count}`;
}

// Botón para limpiar datos
document.getElementById("clearButton").addEventListener('click', () => {
    localStorage.clear();   
    console.log(`Eliminado memoria del localStorage`)      
    displayData();               
    updateInteractionCount();     
});
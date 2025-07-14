const API_URL_USUARIOS = "http://localhost:3000/usuarios"
const API_URL_RESERVAS = "http://localhost:3000/reservas"
const API_URL_LIBROS = "http://localhost:3000/libros"

const routes = {
    '#/': 'vistas/login.html',
    '#/registro': 'vistas/formRegistro.html',
    '#/admin': 'vistas/admin.html',
    '#/usuario': 'vistas/usuario.html',
    '#/formAgregar': 'vistas/formAgregar.html',
    '#/formModificar': 'vistas/formModificar.html'
}

function isLogin(){
    const result = localStorage.getItem("Login") || null;
    const resultBool = result == "true"
    return resultBool;
}

function isAdmin(){
    const result = localStorage.getItem("role") || null;
    const resultAdmin = result == "admin"
    return resultAdmin;
}

function isUser(){
    const result = localStorage.getItem("role") || null;
    const resultUser = result == "usuario"
    return resultUser;
}

// Función asincrónica para renderizar la vista según el hash actual de la URL
async function renderRoute() {

    if(isUser()){
        location.hash = '#/usuario'
    }

    if (isAdmin()) {
        console.log(location.hash)
        const rutasProhibidasParaAdmin = ['#/usuario', '#/', '#/registro', '#/formRegistro'];
        if (rutasProhibidasParaAdmin.includes(location.hash)) {
            location.hash = '#/admin';
        }
    }

    // Obtiene el hash actual de la URL. Si no hay hash, usa '#/' que representa la página de inicio
    const path = location.hash || '#/';

    const rutasPublicas = ['#/', '#/registro'];

    if (!isLogin() && !rutasPublicas.includes(path)) {
        location.hash = '#/';
        return;
    }

    // Busca el archivo HTML correspondiente a esa ruta. Si no existe, intentamos cargar una vista 404 (no encontrada)
    const archivo = routes[path];

    try {
        // Usa fetch para solicitar el archivo HTML dinámicamente
        const res = await fetch(archivo);

        // Si la respuesta no es exitosa (ej. 404), lanzamos un error para manejarlo en el catch
        if (!res.ok) throw new Error('Archivo no encontrado');

        // Extraemos el texto HTML de la respuesta
        const html = await res.text();

        // Insertamos el contenido HTML en el contenedor principal de la página
        document.getElementById('contenedor-index').innerHTML = html;

        //logica para login segun el rol
        if (path === "#/") setupLoginForm();
        if (path === "#/registro") setupRegistro();
        if (path === "#/usuario") {
            tablaUserLibros();
            mostrarTodasLasReservas()
        }

        if (path === "#/formAgregar") setupAgregar();
        if (path === "#/admin") {
            tablaAdminLibros();
            tablaAdminReserva();
            tablaAdminUsuario();
        }
        if (path === "#/admin" || path === "#/usuario") cerrarSesion ();

    } catch (e) {
        // En caso de error (fetch fallido o archivo no encontrado), mostramos un mensaje simple en pantalla
        document.getElementById('contenedor-index').innerHTML = '<h1>Error cargando la vista</h1>';

        // También imprimimos el error en consola para desarrollo
        console.error(e);
    }

}

function onNavClick(e) {
    const link = e.target.closest('[data-link]');
    if (link) {
        e.preventDefault();
        const path = link.getAttribute('href');
        location.hash = path;
    }
}

// function setupModificar(){
//     const formModificar = document.getElementById('form-modificar');
// }

function setupAgregar(){
    const formAgregar = document.getElementById('form-agregar');

    formAgregar.addEventListener('submit', async (e) => {
        e.preventDefault();

        const titulo = document.getElementById('titulo').value;
        const autor = document.getElementById('autor').value;
        const unidades = document.getElementById('unidades').value;

        const newBook = {
            titulo: titulo,
            autor: autor,
            unidades: unidades
        }

        fetch(API_URL_LIBROS, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newBook)
        })
        .then(res => res.json())
        .then(data => {
            console.log("Usuario agregado con éxito:", data);
            formRegistro.reset();
            location.hash = "#/";  
        })
        .catch(error => console.error("Error al agregar libro:", error));
    });
}

function setupRegistro() {
    const formRegistro = document.getElementById('form-registro');

    formRegistro.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombreRe = document.getElementById('nombreRegistro').value;
        const correoRe = document.getElementById('correoRegistro').value;
        const contraseñaRe = document.getElementById('contraseñaRegistro').value;
        const rolRe = document.getElementById('roleRegistro').value;

        const newUser = {
            nombre: nombreRe,
            correo: correoRe,
            contraseña: contraseñaRe,
            role: rolRe
        };

        fetch(API_URL_USUARIOS, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data => {
            console.log("Usuario agregado con éxito:", data);
            formRegistro.reset();
            location.hash = "#/";  
        })
        .catch(error => console.error("Error al agregar usuario:", error));
    });
}



function setupLoginForm(){
    const formLogin = document.getElementById('form-login');

    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();

        const user = document.getElementById('usuarioLogin').value;
        const pass = document.getElementById('contraseñaLogin').value;

        //vamos a hacer una peticion a getUser desde la base de datos para que me traiga los usuarios
        const users = await getUsers();

        // Buscar usuario que coincida
        const foundUser = users.find(
        (userDB) => userDB.nombre == user && String(userDB.contraseña) == pass);
        
        if (foundUser) {
            localStorage.setItem("Login", "true");
            localStorage.setItem("role", foundUser.role)
            if(foundUser.role == "usuario"){
                location.hash = "#/usuario";
            } else{
                location.hash = "#/admin";
            }
        } else {
            alert("usuario o contraseña son incorrectos");
        }
    })
}

//funcion para hacer la peticion y traer usuarios
async function getUsers() {
    const res = await fetch(API_URL_USUARIOS);
    const data = await res.json();
    return data;
}

//funcion para cerrar sesion
function cerrarSesion (){
    const buttonClose = document.getElementById('close-sesion');

    buttonClose.addEventListener('click', () => {
        localStorage.setItem("Login", "false")
        localStorage.removeItem("role")
        location.hash = "#/";
    })
}

//vista de admin vamos a mostrar distintas tablas books, user, reservation
function tablaAdminUsuario(){
    fetch(API_URL_USUARIOS)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById('tabla-admin-usuarios');
            tbody.innerHTML = "";

            data.forEach(usuario => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${usuario.id}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.correo}</td>
                    <td>${usuario.contraseña}</td>
                    <td>${usuario.role}</td>
                    `;
                
                const celdaAcciones = document.createElement("td");
                const buttonEdit = document.createElement("button");
                const buttonDelete = document.createElement("button");

                buttonEdit.classList.add("buttonDisplay");
                buttonEdit.textContent = "Editar";
                buttonDelete.classList.add("buttonDisplay");
                buttonDelete.textContent = "Eliminar";

                // Eliminar jugador
                buttonDelete.addEventListener('click', () => {
                    if (confirm("¿Deseas eliminar este usuario?")) {
                        fetch(`${API_URL_USUARIOS}/${usuario.id}`, {
                            method: "DELETE"
                        })
                        .then(() => console.log("Eliminacion de usuario correcta"))
                        .catch(error => console.error("Error al eliminar usuario", error));
                    }
                });

                // // Editar jugador
                // buttonEdit.addEventListener('click', () => {
                //     document.getElementById('nombreRegistro').value = usuario.nombre;
                //     document.getElementById('correoRegistro').value = usuario.correo;
                //     document.getElementById('contraseñaRegistro').value = usuario.contraseña;
                //     document.getElementById('roleRegistro').value = usuario.role;
                //     document.getElementById('form-registro').dataset.editingId = usuario.id;
                // });
                //Para usarse se deben tener formularios desde admin

                celdaAcciones.appendChild(buttonDelete);
                celdaAcciones.appendChild(buttonEdit);
                row.appendChild(celdaAcciones);
                tbody.appendChild(row);
            });
        });
}

function tablaAdminReserva(){
    fetch(API_URL_RESERVAS)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById('tabla-admin-reserva');
            tbody.innerHTML = "";

            data.forEach(reserva => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${reserva.id}</td>
                    <td>${reserva.nombre}</td>
                    <td>${reserva.titulo}</td>
                    `;

                const celdaAcciones = document.createElement("td");
                const buttonEdit = document.createElement("button");
                const buttonDelete = document.createElement("button");

                buttonEdit.classList.add("buttonDisplay");
                buttonEdit.textContent = "Editar";
                buttonDelete.classList.add("buttonDisplay");
                buttonDelete.textContent = "Eliminar";

                // Eliminar jugador
                buttonDelete.addEventListener('click', () => {
                    if (confirm("¿Deseas eliminar esta reserva?")) {
                        fetch(`${API_URL_RESERVAS}/${reserva.id}`, {
                            method: "DELETE"
                        })
                        .then(() => console.log("Eliminacion de reserva correcta"))
                        .catch(error => console.error("Error al eliminar reserva", error));
                    }
                });

                celdaAcciones.appendChild(buttonDelete);
                celdaAcciones.appendChild(buttonEdit);
                row.appendChild(celdaAcciones);
                tbody.appendChild(row);
            });
        });
}

function tablaAdminLibros(){
    fetch(API_URL_LIBROS)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById('tabla-admin-libros');
            tbody.innerHTML = "";

            data.forEach(libro => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${libro.id}</td>
                    <td>${libro.titulo}</td>
                    <td>${libro.autor}</td>
                    <td>${libro.unidades}</td>
                    `;

                const celdaAcciones = document.createElement("td");
                const buttonEdit = document.createElement("button");
                const buttonDelete = document.createElement("button");

                buttonEdit.classList.add("buttonDisplay");
                buttonEdit.textContent = "Editar";
                buttonDelete.classList.add("buttonDisplay");
                buttonDelete.textContent = "Eliminar";

                // Eliminar jugador
                buttonDelete.addEventListener('click', () => {
                    if (confirm("¿Deseas eliminar este libro?")) {
                        fetch(`${API_URL_LIBROS}/${libro.id}`, {
                            method: "DELETE"
                        })
                        .then(() => console.log("Eliminacion de reserva correcta"))
                        .catch(error => console.error("Error al eliminar reserva", error));
                    }
                });

                celdaAcciones.appendChild(buttonDelete);
                celdaAcciones.appendChild(buttonEdit);
                row.appendChild(celdaAcciones);
                tbody.appendChild(row);
            });
        });
}


//vista usuario vamos a agregar tabla de libros con el boton reservar
function tablaUserLibros(){
    fetch(API_URL_LIBROS)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById('tabla-user-libros');
            tbody.innerHTML = "";

            data.forEach(libro => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${libro.id}</td>
                    <td>${libro.titulo}</td>
                    <td>${libro.autor}</td>
                    <td>${libro.unidades}</td>
                    `;

                const celdaAcciones = document.createElement("td");
                const buttonReservar = document.createElement("button");

                buttonReservar.classList.add("buttonDisplay");
                buttonReservar.textContent = "Reservar";



                buttonReservar.addEventListener('click', () => {
                    if (libro.unidades <= 0) {
                        alert("Este libro no está disponible.");
                        return;
                    }

                    const nombre = prompt("Ingresa tu nombre para completar la reserva:");
                    if (!nombre) {
                        alert("Nombre requerido para reservar.");
                        return;
                    }

                    const nuevaReserva = {
                        // id: crypto.randomUUID(), // o puedes usar Date.now().toString()
                        nombre: nombre,
                        titulo: libro.titulo
                    };

                    fetch(API_URL_RESERVAS, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(nuevaReserva)
                    })
                    .then(() => {
                        // actualizar unidades del libro
                        return fetch(`${API_URL_LIBROS}/${libro.id}`, {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ unidades: libro.unidades - 1 })
                        });
                    })
                    .then(() => {
                        alert("Reserva realizada con éxito.");
                        tablaUserLibros(); // refrescar la tabla
                    })
                    .catch(error => {
                        console.error("Error al reservar:", error);
                        alert("Error al hacer la reserva.");
                    });
                });



                celdaAcciones.appendChild(buttonReservar);
                row.appendChild(celdaAcciones);
                tbody.appendChild(row);
            });
        });
}

function mostrarTodasLasReservas() {
    fetch(API_URL_RESERVAS)
        .then(res => res.json())
        .then(reservas => {
            const tbody = document.getElementById("tabla-user-reservas");
            tbody.innerHTML = "";

            if (reservas.length === 0) {
                alert("El libro ya no esta disponible")
                return;
            }

            reservas.forEach(reserva => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${reserva.id || '-'}</td>
                    <td>${reserva.nombre}</td>
                    <td>${reserva.titulo}</td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => {console.error("Error al cargar reservas:", error);
        });
}




// Cuando el DOM está cargado, renderizamos la vista actual (útil para carga directa en una URL)
window.addEventListener('DOMContentLoaded', renderRoute);

// Cuando cambia el hash en la URL (cuando se navega entre vistas), renderizamos la vista nueva
window.addEventListener('hashchange', renderRoute);

// Escuchamos clicks para poder interceptar y manejar la navegación SPA sin recarga
window.addEventListener('click', onNavClick);
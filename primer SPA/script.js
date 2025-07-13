import { get, post, deletes, update } from "./service.js";
const urlUsers = "http://localhost:3000/Users"
const routes = {
  "/": "./users.html",
  "/users": "./users.html",
  "/newuser": "./newuser.html",
  "/about": "./about.html",
  "/login": "./login.html"
};

document.body.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    navigate(e.target.getAttribute("href"));
  }
});

async function navigate(pathname) {
  const route = routes[pathname];
  const html = await fetch(route).then((res) => res.text());
  document.getElementById("content").innerHTML = html;
  history.pushState({}, "", pathname);

  const currentUser = JSON.parse(sessionStorage.getItem("logguedUser"));

  // if (pathname === "/newuser" && currentUser?.role !== "admin") {
  //   alert("No tienes permisos para crear un nuevo usuario, no eres administrador");
  //   navigate("/users");
  //   return;
  // }
  if (pathname === "/newuser") {
    newuserform();
  }
  
  if (pathname === "/login") {
    loginform();
    register();
  }
  if (pathname == "/users") {
    renderusers();
  }
}

window.addEventListener("popstate", () =>
  navigate(location.pathname)
);

async function renderusers (){
  let containerusers = document.getElementById("container-users")
  containerusers.innerHTML = "";

  const usersData  = await get(urlUsers)
  const currentUser = JSON.parse(sessionStorage.getItem("logguedUser"));

  
  
  usersData.forEach(user => {
    containerusers.innerHTML+= 
    `<p>${user.name} </p> 
    <p>${user.email} </p>
    <p>${user.phone} </p>
    ${currentUser.role === "admin" ?`
    <button class="editbutton" data-id= "${user.id}">Editar</button>
    <button class="deletebutton" data-id= "${user.id}">Eliminar</button> 
    ` : ""}
    `
  });

  if (currentUser.role === "admin") {
    editusers();
    deleteusers();
  }
} 

function newuserform () {
  //const currentUser = JSON.parse(sessionStorage.getItem("logguedUser"));

  // if (!currentUser || currentUser.role !== "admin") {
  //   alert("No tienes permisos para crear un nuevo usuario, no ereds administrador");
  //   navigate("/about");
  //   return; 
  // }

  const buttonsave = document.getElementById("saveuser")
  if (buttonsave) {
    buttonsave.addEventListener("click", async () => {
      const newuser = {
        name:document.getElementById("name").value,
        email:document.getElementById("email").value,
        phone:document.getElementById("phone").value,
        password:document.getElementById("password").value,
        dateOfAdmission: document.getElementById("dateOfAdmission").value,
        role: "user"
      };
      await post(urlUsers, newuser);
      alert ("Se ha creado el usuario correctaemente")
      navigate("/users");
    });
  }
} 


function editusers () {
const currentUser = JSON.parse(sessionStorage.getItem("logguedUser"));
const editForm = document.getElementById("editform");
const editName = document.getElementById("editName");
const editEmail = document.getElementById("editEmail");
const editPhone = document.getElementById("editPhone");
const editpassword = document.getElementById("editPassword");
const editDateofadmission = document.getElementById("editDateofadmission");
const saveEdit = document.getElementById("saveEdit");

if (!currentUser || currentUser.role !== "admin") {
  if (editForm) {
    editForm.style.display = "none";
  }
  return;
}


if (!editForm || !editName || !editEmail || !editPhone || !editpassword || !editDateofadmission || !saveEdit) {
  return;
}

editForm.style.display = "none";

const newSaveEdit = saveEdit.cloneNode(true);
saveEdit.parentNode.replaceChild(newSaveEdit, saveEdit);

const editbuttons = document.querySelectorAll(".editbutton");

  editbuttons.forEach(button => {
    button.addEventListener("click", async () => {
      const id = button.getAttribute("data-id");
      const users = await get(urlUsers);
      const user = users.find(u => u.id == id);

      editName.value = user.name;
      editEmail.value = user.email;
      editPhone.value = user.phone;
      editpassword.value = user.password;
      editDateofadmission.value = user.dateOfAdmission;


      editForm.style.display = "block";

      newSaveEdit.onclick = async () => {
        const updatedUser = {
          name: editName.value,
          email: editEmail.value,
          phone: editPhone.value,
          password: editpassword.value,
          dateOfAdmission: editDateofadmission.value,
        };

        await update(urlUsers, id, updatedUser);
        alert("Usuario actualizado correctamente");
        editForm.style.display = "none";
        renderusers();
      };
    });
  });
}

function deleteusers () {
  const deletebuttons = document.querySelectorAll(".deletebutton")
  deletebuttons.forEach(button => {
    button.addEventListener("click", async () => {
      const id = button.getAttribute("data-id");
      await deletes(urlUsers, id);
      alert("Usuario eliminado correctamente");
      renderusers();
    });
  });
}

function loginform() {
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.onclick = async () => {
      loginBtn.disabled = true;
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      const users = await get(urlUsers);
      const foundUser = users.find(user => user.email === email && user.password === password);

      if (foundUser) {
        sessionStorage.setItem("logguedUser", JSON.stringify(foundUser));
        alert(`Bienvenido ${foundUser.name}`);
        navigate(foundUser.role === "admin" ? "/users" : "/about");
      } else {
        alert("Credenciales incorrectas o el usuario no existe, por favor intente de nuevo");
        loginBtn.disabled = false;
      }
    };
  }
}

function register() {
  const registerBtn = document.getElementById("register");
  if (!registerBtn) return;

  registerBtn.addEventListener("click", () => {
    navigate("/newuser");
  });
}


document.addEventListener("DOMContentLoaded", () => {
  const loggued = sessionStorage.getItem("logguedUser");
  if (!loggued) {
    navigate("/login");
 } else {
  const user = JSON.parse(loggued);
  navigate(user.role === "admin" ? "/users" : "/about");
 }
});





























/*function editusers () {
  const editbuttons = document.querySelectorAll(".editbutton")

  editbuttons.forEach(button => {
    button.addEventListener("click", async () => {
      const id = button.getAttribute("data-id");

      const users = await get(urlUsers)
      const user = users.find(u => u.id == id);
      document.getElementById("editform")

       document.getElementById("editName")
       document.getElementById("editEmail")
       document.getElementById("editPhone")
       document.getElementById("editpassword")
       document.getElementById("editDateofadmission")
       

       saveEdit.addEventListener("click", async () => {
        const updatedUser = {
          name: document.getElementById("editName").value,
          email: document.getElementById("editEmail").value,
          phone: document.getElementById("editPhone").value,
          password: document.getElementById("editpassword").value,
          dateOfAdmission: document.getElementById("editDateofadmission").value,
        };

        await update (urlUsers, id, updatedUser);
        document.getElementById("editform")
        renderusers()
         })
    })
  })
} 



function loginform() {
  
  const loginBtn = document.getElementById("loginBtn");


  if(loginBtn) {
     const handleLogin = async () => {
      loginBtn.disabled = true;
      
      const email = document.getElementById("loginEmail").value
      const password = document.getElementById("loginPassword").value

      const users = await get(urlUsers)
      const foundUser = users.find(user => user.email === email && user.password === password)

      if (foundUser) {
        sessionStorage.setItem("logguedUser", JSON.stringify(foundUser))
        alert(`Bienvenido ${foundUser.name}`);
        navigate(foundUser.role === "admin" ? "/users" : "/about");
      } else {
        alert("Credenciales incorrectas o el usuario no existe, por favor intente de nuevo");
        loginBtn.disabled = false;
      }
    };
    loginBtn.replaceWith(loginBtn.cloneNode(true));
    const newLoginBtn = document.getElementById("loginBtn");
    newLoginBtn.addEventListener("click", handleLogin);
  }
}*/


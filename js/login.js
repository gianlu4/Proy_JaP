function login() {
  //Variables para traer los valores introducidos en login.html

  let usuario = document.getElementById("username").value;
  let contrasenia = document.getElementById("password").value;


  if (usuario === "" && contrasenia === "") {
    
    Swal.fire({
        title: '¡Faltan datos!',
        text: "El usuario y la contraseña son los campos requeridos.",
        icon: 'warning',
    })

  } else if (contrasenia === "") {
    
    Swal.fire({
        title: '¡Faltan datos!',
        text: "La contraseña es un campo requerido.",
        icon: 'warning',
    })

  } else if (usuario === "") {
    
    Swal.fire({
        title: '¡Faltan datos!',
        text: "El usuario es un campo requerido.",
        icon: 'warning',
    })

  } else {

    sessionStorage.setItem("user", usuario);
    location.href = "index.html";
    
  }
}
//google oauth
function onSignIn(googleUser) {
  let profile = googleUser.getBasicProfile();

  console.log("ID: " + profile.getId());
  console.log("Full Name: " + profile.getName());
  console.log("Given Name: " + profile.getGivenName());
  console.log("Family Name: " + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());

  let id_token = googleUser.getAuthResponse().id_token;

  document.getElementById("accessGoogle").innerHTML = profile;
}


//google oauth
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log("User signed out.");
  });
}



//esto es para darle funcionalidad a la tecla enter

/*document.addEventListener("keydown", function (presionarBotonEnter) {
      
    function presionarBotonEnter(event) {
      const tecla_enter = event.Key;
      
      if (tecla_enter == "Enter") {
        console.log("voooooy");

      }
     
    }
   });
*/

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("inicio").addEventListener("click", () => {
    login();
  });
});


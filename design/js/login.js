/********** variables du projet login **********/
const email = document.querySelector("#form__user .email");
const password = document.querySelector("#form__user .password");
const form = document.getElementById("form__user");
const messageError = document.getElementById("message__error");

/********** récupération des users sur json-server ***********/
async function getUsers() {
  const response = await fetch("http://localhost:3000/users");
  return await response.json();
}

/********** création d'une fonction pour les bordures rouge d'erreur ***********/
function borderError() {
  email.classList.add("inputErrorLogin");
  password.classList.add("inputErrorLogin");
}

async function login() {
  const users = await getUsers();
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    /********** récupération des valeurs email et password **********/
    const userEmail = email.value;
    const userPassword = password.value;
    users.forEach((user) => {
      if (
        user.email === userEmail &&
        user.password === userPassword &&
        user.admin === true
      ) {
        window.sessionStorage.loged = true;
        window.location.href = "./index.html";
      } else {
        borderError();
        messageError.textContent =
          "Veuillez renseigner un Email et un mot de passe valide !";
        console.error("erreur lors de la connection: ");
      }
    });
  });
}
login();

/********** suite et fin du code sur le fichier script.js **********/

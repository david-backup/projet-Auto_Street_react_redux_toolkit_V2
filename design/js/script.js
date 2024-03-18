/********** liste des variables du projet **********/
const gallery = document.querySelector(".gallery");
const btnFilter = document.querySelector(".btn__filters");

/********** récupération du tableau des projets "works" **********/
async function getWorks() {
  try {
    const response = await fetch("http://localhost:3000/works");
    return response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des projets :", error);
  }
}

/********** création d'un seul projet *********/
function createWork(work) {
  const figure = document.createElement("figure");
  const projectImg = document.createElement("img");
  const figcaption = document.createElement("figcaption");
  projectImg.src = work.imageUrl;
  projectImg.alt = work.title;
  figcaption.textContent = work.title;
  gallery.classList.add("projects");
  gallery.appendChild(figure);
  figure.classList.add("figure__style");
  figure.appendChild(projectImg);
  figure.appendChild(figcaption);
  figcaption.classList.add("gallery__name");
}

/********** création et affichage des 12 projets sur le dom *********/
async function displayWorks() {
  gallery.innerHTML = "";
  const arrayWorks = await getWorks();
  arrayWorks.forEach((work) => {
    createWork(work);
  });
}
displayWorks();

/********** récupération du tableau des catégories "categories" **********/
async function getCategories() {
  try {
    const response = await fetch("http://localhost:3000/categories");
    return response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des categories :", error);
  }
}

/********** création et affichage des boutons de filtrage sur le dom *********/
async function displayButtons() {
  const arrayCategories = await getCategories();
  arrayCategories.forEach((category) => {
    const btn = document.createElement("button");
    btnFilter.appendChild(btn);
    btn.id = category.id;
    btn.textContent = category.name;
  });
}
displayButtons();

/********** filtrage des boutons par catégorie *********/
async function filterWorks() {
  const arrayWorks = await getWorks();
  const buttons = document.querySelectorAll(".btn__filters button");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const buttonId = e.target.id;
      gallery.innerHTML = "";
      if (buttonId !== "0") {
        const arrayNew = arrayWorks.filter((work) => {
          return work.categoryId == buttonId;
        });
        arrayNew.forEach((work) => {
          createWork(work);
        });
      } else {
        displayWorks();
      }
    });
  });
}
filterWorks();

/********** !!! dernière partie de la logique de connection
  une fois que l'utilisateur est connecté !!! **********/
const loged = window.sessionStorage.loged;
const logout = document.querySelector(".logout");
const admin = document.querySelector(".admin");

/********** fonction d'ajout de la partie edition dans le header **********/
function displayBannerEdition() {
  const header = document.getElementById("header");
  const headerTitle = document.querySelector(".header__title");
  const bannerEdition = document.createElement("div");
  const infoEdition = document.createElement("p");
  bannerEdition.classList.add("edition__mode");
  infoEdition.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> Mode édition`;
  header.appendChild(bannerEdition);
  bannerEdition.appendChild(infoEdition);
  headerTitle.classList.add("header__margin");
}

/********** fonction d'ajout du bouton d'edition **********/
function displayBtnEdition() {
  const btnFilters = document.querySelector(".btn__filters");
  const galleryTitle = document.querySelector(".title");
  const btnModifier = document.createElement("div");
  btnModifier.classList.add("btn__modifier");
  galleryTitle.appendChild(btnModifier);
  const infoEdition = document.createElement("p");
  infoEdition.innerHTML = `<i class="fa-regular fa-pen-to-square"></i> Mode édition`;
  btnModifier.appendChild(infoEdition);
  btnFilters.classList.add("btn__filter__remove");
}

/********** bouton logout et logique de déconnection ***********/
if (loged === "true") {
  logout.textContent = "Logout";
  admin.textContent = "Admin";
  displayBannerEdition();
  displayBtnEdition();
  logout.addEventListener("click", () => {
    window.sessionStorage.loged = false;
  });
}

/********** condition de redirection html login/logout**********/
logout.addEventListener("click", () => {
  if (loged === "true") {
    window.location.href = "./index.html";
  } else {
    window.location.href = "./login.html";
  }
});

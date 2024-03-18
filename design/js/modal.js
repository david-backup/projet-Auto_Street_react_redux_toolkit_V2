/********** variables de la partie "modal" **********/
const modalContainer = document.querySelector(".modal__container");
const trash = document.querySelector(".fa-xmark");
const containerFile = document.querySelector(".modal__containerFile");
const inputFile = containerFile.querySelector("#file");

/********** ouverture et fermeture de la modal au click *********/
const btnModifier = document.querySelector(".btn__modifier");
btnModifier.addEventListener("click", () => {
  modalContainer.style.display = "flex";
});
function closeModal() {
  trash.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });
  modalContainer.addEventListener("click", (e) => {
    if (e.target === modalContainer) {
      modalContainer.style.display = "none";
    }
  });
}
closeModal();

/**********création du contenue de la modal **********/
async function createModal() {
  const modalGarage = document.querySelector(".modal__garage");
  modalGarage.innerHTML = "";
  const arrayWorks = await getWorks();
  arrayWorks.forEach((work) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const trashDiv = document.createElement("div");
    const trash = document.createElement("i");
    trash.classList.add("fa-solid", "fa-trash-can");
    trash.id = work.id;
    img.src = work.imageUrl;
    modalGarage.appendChild(figure);
    trashDiv.appendChild(trash);
    figure.appendChild(trashDiv);
    figure.appendChild(img);
  });
  deleteProject(); /********** => => => ATTENTION !!! faire jouer la fonction deleteProjet
  une fois que la fonction projectModal ai fini d'être lu !!! ATTENTION **********/
}
createModal();

/********** suppréssion de projets dans la modal **********/
function deleteProject() {
  const trashIcons = document.querySelectorAll(".fa-trash-can");
  const deleteMessage = document.querySelector(".delete__message");
  trashIcons.forEach((trash) => {
    trash.addEventListener("click", async (e) => {
      const id = trash.id;
      const response = await fetch("http://localhost:3000/works/" + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        deleteMessage.textContent = "Votre projet été supprimé avec succès !";
        console.log("la suppression a réussi !");
        createModal();
        displayWorks();
      } else {
        console.error("Erreur lors de la suppression:", response.statusText);
      }
    });
  });
}

/********** création et affichage de la deuxième modal **********/
function displaySecondModal() {
  /********** variables de la deuxième modal ***********/
  const btnDisplayModal = document.querySelector(".modal__projets .button");
  const modalAddProjects = document.querySelector(".modal__addProjets");
  const modalProjets = document.querySelector(".modal__projets");
  const arrowLeft = document.querySelector(".modal__addProjets .fa-arrow-left");
  const modalXmark = document.querySelector(".modal__addProjets .fa-xmark");

  btnDisplayModal.addEventListener("click", () => {
    modalAddProjects.style.display = "flex";
    modalProjets.style.display = "none";
  });
  arrowLeft.addEventListener("click", () => {
    modalAddProjects.style.display = "none";
    modalProjets.style.display = "flex";
  });
  modalXmark.addEventListener("click", () => {
    modalContainer.style.display = "none";
    window.location = "index.html";
  });
}
displaySecondModal();

/********** prévisualisation de l'image du projet **********/
function imageCharged() {
  /********** variables de imageCharged() ***********/
  const previewImg = containerFile.querySelector("img");
  const labelFile = containerFile.querySelector("label");
  const iconFile = containerFile.querySelector(".fa-image");
  const pFile = containerFile.querySelector("p");

  inputFile.addEventListener("change", () => {
    console.log("Input file changed!");
    const file = inputFile.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        previewImg.src = e.target.result;
        containerFile.style.display = "flex";
        [labelFile, iconFile, pFile].forEach((element) => {
          element.style.display = "none";
        });
        /******* Affichage de l'image une fois chargée *******/
        previewImg.style.display = "block";
      };
      reader.readAsDataURL(file);
    }
  });
}
imageCharged();

function newProject() {
  /********** variables de newProject() ***********/
  const form = document.querySelector("form");
  const title = document.querySelector("#modal__title");
  const category = document.querySelector("#modal__category");
  const formError = document.querySelector(".error");
  const formMessageOk = document.querySelector(".message__ok");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    /* Vérifier si les champs titre et catégorie sont vides */
    if (!title.value.trim() || category.value === "") {
      console.log(category.value);
      formError.textContent =
        "Veuillez renseigner un titre et choisir une catégorie.";
      form.appendChild(formError);

      /* Afficher une erreur et empêcher l'envoi du formulaire */
      console.error("Veuillez remplir tous les champs du formulaire.");
    }
    const formData = new FormData();
    formData.append("image", inputFile.files[0]);
    formData.append("title", title.value);
    formData.append("category", category.value);

    const response = await fetch("http://localhost:3000/works", {
      method: "POST",
      headers: {
        Authorization: { "Content-Type": "application/json" },
      },
      body: formData,
    });

    if (response.ok) {
      formError.style.display = "none";
      formMessageOk.textContent = "Votre projet a été ajouté avec succès !";
      console.log("Félicitations, nouveau projet créé avec succés !");
      projectsModal();
      displayWorks();
    } else {
      console.error("Erreur lors de l'envoi :", response.statusText);
    }
  });
}
newProject();

/********** tableau des images et titres **********/
const slides = [
  {
    imageSrc: "assets/img/banner1.jpg",
    tagLine: "Garage Auto Street <span>Contactez-nous: 04.75.60.76.27</span>",
  },
  {
    imageSrc: "assets/img/banner2.jpg",
    tagLine: "Mécanique générale<span>et entretiens</span>",
  },
  {
    imageSrc: "assets/img/banner3.jpg",
    tagLine: "Montage pneus<span>neufs et occasions</span>",
  },
  {
    imageSrc: "assets/img/banner4.jpg",
    tagLine: "Atelier de carosserie<span>réparations ou mise à neuf</span>",
  },
];

/********** variables du projet **********/
const dots = document.querySelector(".dots");
let index = 0;
const arrowRight = document.querySelector(".arrow_right");
const arrowLeft = document.querySelector(".arrow_left");
const img = document.querySelector(".banner__img");
const text = document.querySelector("#banner p");
const imgBanner = document.querySelectorAll("#banner img");

/********** border-radius injecté sur les images du slider **********/
function borderRadiusSlider() {
  imgBanner.forEach((img) => {
    img.style.borderRadius = "40px";
  });
}

/********** fonction affichage des dot **********/
function displayDots() {
  for (i = 0; i < slides.length; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dots.appendChild(dot);
    if (i == index) {
      dot.classList.add("dot_selected");
    }
  }
}

/**********fonction update des dot, images et textes du slide **********/
function updateSlides() {
  const arrayDot = document.querySelectorAll(".dot");
  img.src = slides[index].imageSrc;
  text.innerHTML = slides[index].tagLine;
  arrayDot[index].classList.add("dot_selected");
}

/********** fonction pour enlever la class dot **********/
function removeDot() {
  const arrayDot = document.querySelectorAll(".dot");
  arrayDot[index].classList.remove("dot_selected");
}

/********** fonction fléche de droite **********/
function displayRight() {
  arrowRight.addEventListener("click", () => {
    removeDot();
    index++;
    if (index > slides.length - 1) {
      index = 0;
    }
    updateSlides();
  });
}

/********** fonction fléche de gauche **********/
function displayLeft() {
  arrowLeft.addEventListener("click", () => {
    removeDot();
    index--;
    if (index < 0) {
      index = slides.length - 1;
    }
    updateSlides();
  });
}

/********** fonction setInterval du slider **********/
function slidesTimer() {
  setInterval(() => {
    removeDot();
    index++;
    if (index > slides.length - 1) {
      index = 0;
    }
    updateSlides();
  }, 5000);
}

/********** main fonction **********/
function main() {
  borderRadiusSlider();
  displayDots();
  displayRight();
  displayLeft();
  slidesTimer();
}
main();

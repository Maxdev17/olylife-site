const track = document.querySelector(".carousel-track");
const dots = document.querySelectorAll(".dot");
let currentIndex = 0;

function goToSlide(index) {
  track.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[index].classList.add("active");
  currentIndex = index;
}

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    track.style.transition = "transform 0.5s ease";
    const index = parseInt(dot.dataset.index);
    goToSlide(index);
  });
});

setInterval(() => {
  const nextIndex = currentIndex + 1;

  if (nextIndex >= dots.length) {
    track.style.transition = "none";
    goToSlide(0);
    track.offsetHeight;
    track.style.transition = "transform 0.5s ease";
  } else {
    track.style.transition = "transform 0.5s ease";
    goToSlide(nextIndex);
  }
}, 3000);

const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("open");
  hamburger.classList.toggle("active");
});

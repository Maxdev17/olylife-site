const track = document.querySelector(".carousel-track");
const dots = document.querySelectorAll(".dot");
let currentIndex = 0;

if (track) {
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
}

const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");

if (hamburger && nav) {
  hamburger.addEventListener("click", () => {
    nav.classList.toggle("open");
    hamburger.classList.toggle("active");
  });
}

const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);

let ytPlayers = [];

function onYouTubeIframeAPIReady() {
  const videoFrames = document.querySelectorAll(
    ".video-horizontal iframe, .video-horizontal-large iframe, .video-vertical iframe",
  );

  videoFrames.forEach((frame) => {
    const player = new YT.Player(frame.id, {
      events: {
        onStateChange: onPlayerStateChange,
      },
    });
    ytPlayers.push(player);
  });
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    ytPlayers.forEach((player) => {
      if (player !== event.target) {
        player.pauseVideo();
      }
    });
  }
}

const orderForm = document.getElementById("orderForm");
if (orderForm) {
  const urlParams = new URLSearchParams(window.location.search);
  const preselectedProduct = urlParams.get("product");

  if (preselectedProduct) {
    const productSelect = document.getElementById("order-product");
    if (productSelect) {
      Array.from(productSelect.options).forEach((option) => {
        if (
          option.value
            .toLowerCase()
            .includes(preselectedProduct.toLowerCase().replace(/-/g, " "))
        ) {
          option.selected = true;
        }
      });
    }
  }

  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const product = document.getElementById("order-product").value;
    const name = document.getElementById("order-name").value;
    const phone = document.getElementById("order-phone").value;
    const location = document.getElementById("order-location").value;
    const notes = document.getElementById("order-notes").value;

    const message =
      `Hello IMGconcepts! I would like to place an order.\n\n` +
      `*Product:* ${product}\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Location:* ${location}` +
      (notes ? `\n*Notes:* ${notes}` : "");

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/2348139285443?text=${encoded}`, "_blank");
  });
}

const reviewForm = document.getElementById("reviewForm");
if (reviewForm) {
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("reviewer-name").value;
    const product = document.getElementById("reviewer-product").value;
    const message = document.getElementById("reviewer-message").value;

    const text =
      `Hello IMGconcepts! Here is my product review.\n\n` +
      `*Name:* ${name}\n` +
      `*Product:* ${product}\n` +
      `*Experience:* ${message}`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/2348139285443?text=${encoded}`, "_blank");
  });
}

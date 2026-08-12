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

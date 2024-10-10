// Select all game elements and overlay elements
const gameElements = document.querySelectorAll(".game_1, .game_2, .game_3");
const overlayElements = document.querySelectorAll(".overlay");
const navbar = document.querySelector(".navbar");

// Video sources for the backgrounds
const backgroundVideos = [
  "doom/dd.mp4", // Background for the first game
  "poke/pk5.mp4", // Background for the second game
  "mine/mine.mp4", // Background for the third game
];

// Add mouseenter and mouseleave events for each game element
gameElements.forEach((gameElement, index) => {
  let video = null; // Declare the video element outside the event listeners

  gameElement.addEventListener("mouseenter", () => {
    overlayElements[index].classList.add("fade-in");

    // Lazy load the video on hover (if not already created)
    if (!video) {
      video = document.createElement("video");
      video.src = backgroundVideos[index];
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      overlayElements[index].appendChild(video);
    }

    // Hide the other game elements
    gameElements.forEach((el, i) => {
      if (i !== index) {
        el.classList.add("hidden");
      }
    });
  });

  gameElement.addEventListener("mouseleave", () => {
    overlayElements[index].classList.remove("fade-in");

    // Optional: Remove the video when leaving to free up memory
    if (video) {
      video.remove(); // Remove the video element
      video = null; // Reset the video variable for future hovers
    }

    // Show the hidden game elements
    gameElements.forEach((el) => {
      el.classList.remove("hidden");
    });
  });
});

// Mouse-following circles
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
  "#ffb56b",
  "#fdaf69",
  "#f89d63",
  "#f59761",
  "#ef865e",
  "#ec805d",
  "#e36e5c",
  "#df685c",
  "#d5585c",
  "#d1525c",
  "#c5415d",
  "#c03b5d",
  "#b22c5e",
  "#ac265e",
  "#9c155f",
  "#950f5f",
  "#830060",
  "#7c0060",
  "#680060",
  "#60005f",
  "#48005f",
  "#3d005e",
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function (e) {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";

    circle.style.scale = (circles.length - index) / circles.length;

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.4;
    y += (nextCircle.y - y) * 0.4;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();

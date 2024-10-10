// Select all game elements and overlay elements
const gameElements = document.querySelectorAll(".game_1, .game_2, .game_3");
const overlayElements = document.querySelectorAll(".overlay");

// Video sources for the backgrounds
const backgroundVideos = [
  "doom/dd.mp4", // Background for the first game
  "poke/pk5.mp4", // Background for the second game
  "mine/mine.mp4", // Background for the third game
];

// Add mouseenter and mouseleave events for each game element
gameElements.forEach((gameElement, index) => {
  gameElement.addEventListener("mouseenter", () => {
    overlayElements[index].classList.add("fade-in");
    // Hide the other game elements
    gameElements.forEach((el, i) => {
      if (i != index) {
        
        el.classList.add("hidden");
      }
    });
  });

  gameElement.addEventListener("mouseleave", () => {
    overlayElements[index].classList.remove("fade-in");
    // Show the hidden game elements 
    gameElements.forEach((el) => {
      el.classList.remove("hidden");

    });
  });

  // Set video source for each overlay
  const video = document.createElement('video');
  video.src = backgroundVideos[index];
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  overlayElements[index].appendChild(video);
});

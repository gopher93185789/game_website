// Select all game elements and overlay elements
const gameElements = document.querySelectorAll(".game_1, .game_2, .game_3");
const overlayElements = document.querySelectorAll(".overlay");

const backgroundImages = [
  "doom/dm.jpg", // Background for the first game
  "poke/poke.jpg", // Background for the second game
  "mine/mine.png", // Background for the third game
];

// Add mouseenter and mouseleave events for each game element
gameElements.forEach((gameElement, index) => {
  gameElement.addEventListener("mouseenter", () => {
    overlayElements[index].classList.add("fade-in");

    // Blur the other game elements
    gameElements.forEach((el, i) => {
      if (i !== index) {
        el.classList.add("blur");
      }
    });
  });

  gameElement.addEventListener("mouseleave", () => {
    overlayElements[index].classList.remove("fade-in");

    // Remove blur from other game elements
    gameElements.forEach((el) => {
      el.classList.remove("blur");
    });
  });

  // Set background image for each overlay
  overlayElements[
    index
  ].style.backgroundImage = `url('${backgroundImages[index]}')`;
});

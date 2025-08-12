(function () {
  "use strict";

  // Set dark mode state based on localStorage
  let isInverted = localStorage.getItem("isInverted");

  if (isInverted === null) {
    // Default to light mode (which means "inverted" is applied)
    isInverted = "true"; // Set it to true so that .inverted is added
    localStorage.setItem("isInverted", isInverted);
  }

  isInverted = isInverted === "true"; // Convert to boolean

  // Ensure the class is applied based on the state
  document.documentElement.classList.toggle("inverted", isInverted);
})();

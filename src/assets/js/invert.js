// Function to toggle 'inverted' class and persist the state
function toggleInvert() {
  const isInverted = localStorage.getItem("isInverted") === "true";

  // Toggle class on the <html> element directly
  document.documentElement.classList.toggle("inverted", !isInverted);

  // Store the new state in localStorage
  localStorage.setItem("isInverted", !isInverted);

  // Toggle the visual icons and their color
  toggleIcons(!isInverted);

  // Apply or remove filters based on whether the mode is inverted
  applyImageFilters(!isInverted);
}

// Toggle between light and dark icons, and change SVG color
function toggleIcons(isInverted) {
  const lightIcon = document.getElementById("light-icon"); // Sun icon (light mode indicator)
  const darkIcon = document.getElementById("dark-icon"); // Moon icon (dark mode indicator)

  // Toggle icons visibility (sun in dark mode, moon in light mode)
  if (isInverted) {
    lightIcon.classList.add("hidden"); // Hide sun (light mode indicator)
    darkIcon.classList.remove("hidden"); // Show moon (dark mode indicator)

    // Set the sun to yellow and the moon to dark
    darkIcon.classList.remove("icon-light"); // Moon should be dark in light mode
    darkIcon.classList.add("icon-dark"); // Moon should be dark when visible
  } else {
    lightIcon.classList.remove("hidden"); // Show sun (light mode indicator)
    darkIcon.classList.add("hidden"); // Hide moon (dark mode indicator)

    // Set the sun to light yellow
    lightIcon.classList.remove("icon-dark");
    lightIcon.classList.add("icon-light"); // Sun should be light when visible
  }
}

// Apply or remove filters on images based on light/dark mode
function applyImageFilters(isInverted) {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    if (img.classList.contains("fix-filter")) {
      // Apply specific filters for images with 'fix-filter' class
      if (isInverted) {
        // Light mode: invert and grayscale
        img.style.filter = "invert(1) grayscale(1)";
      } else {
        // Dark mode: only grayscale
        img.style.filter = "grayscale(1)";
      }
    } else {
      // Apply specific filters for images without 'fix-filter' class
      if (isInverted) {
        // Light mode: only invert
        img.style.filter = "invert(1)";
      } else {
        // Dark mode: no filter
        img.style.filter = "none";
      }
    }
  });
}

// Set up the initial state based on localStorage
function initializeInvertState() {
  let isInverted = localStorage.getItem("isInverted");

  if (isInverted === null) {
    // Default to light mode (not inverted)
    isInverted = "false";
    localStorage.setItem("isInverted", isInverted);
  }

  isInverted = isInverted === "true"; // Convert to boolean

  // Apply the mode to the HTML element
  document.documentElement.classList.toggle("inverted", isInverted);

  // Set the correct icon and color on load
  toggleIcons(isInverted);

  // Apply or remove filters on load based on initial state
  applyImageFilters(isInverted);
}

// Add event listener for the toggle button
document
  .getElementById("toggle-invert")
  .addEventListener("click", toggleInvert);

// Initialize the state immediately after defining functions
initializeInvertState();

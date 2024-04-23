document.addEventListener("DOMContentLoaded", function () {
  const cursorBigCircle = document.querySelector(".cursor__ball--big");

  // Move the cursor
  document.addEventListener("mousemove", function (e) {
    // Subtract half the width and height of the SVG to center it on the cursor
    gsap.to(cursorBigCircle, 0.1, {
      x: e.clientX - 15, // 15 is half the width of the SVG
      y: e.clientY - 15, // 15 is half the height of the SVG
    });
  });

  // Scaling effect for hoverables
  const hoverables = document.querySelectorAll("a, .hoverable");
  hoverables.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      gsap.to(cursorBigCircle, 0.3, { scale: 4, opacity: 0.7 });
    });
    item.addEventListener("mouseleave", () => {
      gsap.to(cursorBigCircle, 0.3, { scale: 1, opacity: 1 });
    });
  });
});

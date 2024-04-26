document.addEventListener("DOMContentLoaded", function () {
  const cursorBigCircle = document.querySelector(".cursor__ball--big");
  const cursorSmallCircle = document.querySelector(".cursor__ball");

  if (window.innerWidth >= 1024) {
    // Only apply cursor effects if the screen is wide enough
    document.addEventListener("mousemove", function (e) {
      gsap.to(cursorBigCircle, {
        duration: 0.1,
        x: e.clientX - 15,
        y: e.clientY - 15,
      });
      gsap.to(cursorSmallCircle, {
        duration: 0.1,
        x: e.clientX - 5,
        y: e.clientY - 5,
      });
    });

    const hoverables = document.querySelectorAll("a, .hoverable");
    hoverables.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        gsap.to([cursorBigCircle, cursorSmallCircle], {
          duration: 0.3,
          scale: 4,
          opacity: 0.7,
        });
      });
      item.addEventListener("mouseleave", () => {
        gsap.to([cursorBigCircle, cursorSmallCircle], {
          duration: 0.3,
          scale: 1,
          opacity: 1,
        });
      });
    });
  }
});

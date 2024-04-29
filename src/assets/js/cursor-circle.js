document.addEventListener("DOMContentLoaded", function () {
  if (
    "querySelector" in document &&
    "addEventListener" in window &&
    gsap &&
    window.innerWidth >= 1024
  ) {
    const cursorBigCircle = document.querySelector(".cursor__ball--big");
    const cursorSmallCircle = document.querySelector(".cursor__ball");

    // Set initial properties for cursor elements
    gsap.set([cursorBigCircle, cursorSmallCircle], {
      xPercent: -50,
      yPercent: -50,
    });

    document.addEventListener("mousemove", function (e) {
      gsap.to(cursorBigCircle, {
        duration: 0.1,
        x: e.clientX,
        y: e.clientY,
        overwrite: "auto",
      });
      gsap.to(cursorSmallCircle, {
        duration: 0.1,
        x: e.clientX,
        y: e.clientY,
        overwrite: "auto",
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

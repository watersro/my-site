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

    // Retrieve the last cursor position from sessionStorage (if available)
    const lastX = sessionStorage.getItem("cursorX") || window.innerWidth / 2;
    const lastY = sessionStorage.getItem("cursorY") || window.innerHeight / 2;

    // Immediately set cursor position based on last stored position
    gsap.set(cursorBigCircle, { x: lastX, y: lastY });
    gsap.set(cursorSmallCircle, { x: lastX, y: lastY });

    document.addEventListener("mousemove", function (e) {
      const { clientX, clientY } = e;

      // Update sessionStorage with the latest cursor position
      sessionStorage.setItem("cursorX", clientX);
      sessionStorage.setItem("cursorY", clientY);

      // Smoothly move the cursor elements to the new position
      gsap.to(cursorBigCircle, {
        duration: 0.1,
        x: clientX,
        y: clientY,
        overwrite: "auto",
      });
      gsap.to(cursorSmallCircle, {
        duration: 0.1,
        x: clientX,
        y: clientY,
        overwrite: "auto",
      });
    });

    // Add hover effects for links or elements with 'hoverable' class
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

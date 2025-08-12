(function () {
  "use strict";

  requestAnimationFrame(() => {
    const lastX = sessionStorage.getItem("cursorX") || window.innerWidth / 2;
    const lastY = sessionStorage.getItem("cursorY") || window.innerHeight / 2;

    if (window.gsap) {
      gsap.set(".cursor__ball--big", { x: lastX, y: lastY });
      gsap.set(".cursor__ball", { x: lastX, y: lastY });
    }
  });
})();

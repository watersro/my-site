window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // Reduced canvas resolution to further decrease the number of pixels processed
  canvas.width = window.innerWidth / 4;
  canvas.height = window.innerHeight / 4;
  canvas.style.width = "100%";
  canvas.style.height = "100%";

  const header = document.querySelector("header");
  const headerLinksDiv = document.querySelector(".header__links");
  const noise = new SimplexNoise();
  let time = 0;
  let transitionDuration = 500;
  let lastColorChangeTime = 0;
  let baseColor = { r: 12, g: 20, b: 27 };
  let targetColor = { ...baseColor };
  let currentColor = { ...baseColor };

  function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  function lerp(start, end, t) {
    return start + (end - start) * t;
  }

  function rgbToCss(r, g, b) {
    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
  }

  function updateColorTransition() {
    let deltaTime = Date.now() - lastColorChangeTime;
    let t = Math.min(1, deltaTime / transitionDuration);

    currentColor.r = lerp(baseColor.r, targetColor.r, t);
    currentColor.g = lerp(baseColor.g, targetColor.g, t);
    currentColor.b = lerp(baseColor.b, targetColor.b, t);

    if (t < 1) {
      requestAnimationFrame(updateColorTransition);
    } else {
      baseColor = { ...targetColor };
    }
  }

  let lastFrameTime = 0;
  const frameInterval = 50;

  function draw() {
    const now = Date.now();
    if (now - lastFrameTime < frameInterval) {
      requestAnimationFrame(draw);
      return;
    }
    lastFrameTime = now;

    time += 0.01;
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;
    let frequency = 0.003;
    let amplitude = 25;

    for (let x = 0; x < canvas.width; x++) {
      for (let y = 0; y < canvas.height; y++) {
        let v =
          ((1 + noise.noise3D(x * frequency, y * frequency, time)) / 2) *
          amplitude;
        let index = (x + y * canvas.width) * 4;
        data[index] = Math.min(255, Math.max(0, currentColor.r + v));
        data[index + 1] = Math.min(255, Math.max(0, currentColor.g + v));
        data[index + 2] = Math.min(255, Math.max(0, currentColor.b + v));
        data[index + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(draw);

    updateDOMColors();
  }

  function updateDOMColors() {
    const newColorCss = rgbToCss(
      currentColor.r,
      currentColor.g,
      currentColor.b
    );
    if (header.style.backgroundColor !== newColorCss) {
      header.style.backgroundColor = newColorCss;
      headerLinksDiv.style.backgroundColor = newColorCss;
    }
  }

  const $panels = $(".panel");

  $(window).scroll(
    debounce(function () {
      let scroll = $(window).scrollTop() + $(window).height() / 2;
      let currentPanel = $panels
        .filter(function () {
          return (
            $(this).position().top <= scroll &&
            $(this).position().top + $(this).outerHeight() > scroll
          );
        })
        .data("color");

      if (
        currentPanel &&
        JSON.stringify(targetColor) !== JSON.stringify(hexToRgb(currentPanel))
      ) {
        targetColor = hexToRgb(currentPanel);
        lastColorChangeTime = Date.now();
        updateColorTransition();
      }
    }, 100)
  );

  function debounce(func, wait) {
    let timeout;
    return function () {
      const context = this,
        args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  draw();
});

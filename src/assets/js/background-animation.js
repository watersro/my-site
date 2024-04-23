window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const header = document.querySelector("header"); // Selector for the header
  const headerLinksDiv = document.querySelector(".header__links"); // Selector for the header links div

  const noise = new SimplexNoise();
  let time = 0;

  let baseColor = { r: 203, g: 235, b: 242 }; // Initial color: #CBEBF2
  let targetColor = { ...baseColor };
  let lerpFactor = 0.05;

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

  function draw() {
    time += 0.01;
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;
    let frequency = 0.0099; // Noise frequency
    let amplitude = 20; // Noise amplitude

    let avgR = 0,
      avgG = 0,
      avgB = 0; // Average color values
    let count = 0;

    for (let x = 0; x < canvas.width; x++) {
      for (let y = 0; y < canvas.height; y++) {
        let v =
          ((1 + noise.noise3D(x * frequency, y * frequency, time)) / 2) *
          amplitude;

        let index = (x + y * canvas.width) * 4;
        data[index] = Math.min(255, Math.max(0, baseColor.r + v));
        data[index + 1] = Math.min(255, Math.max(0, baseColor.g + v));
        data[index + 2] = Math.min(255, Math.max(0, baseColor.b + v));
        data[index + 3] = 255; // Alpha value

        avgR += data[index];
        avgG += data[index + 1];
        avgB += data[index + 2];
        count++;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(draw);

    avgR /= count;
    avgG /= count;
    avgB /= count;

    const avgColorCss = rgbToCss(avgR, avgG, avgB);
    header.style.backgroundColor = avgColorCss; // Apply to header background
    headerLinksDiv.style.backgroundColor = avgColorCss; // Apply to header links div background

    baseColor.r = lerp(baseColor.r, targetColor.r, lerpFactor);
    baseColor.g = lerp(baseColor.g, targetColor.g, lerpFactor);
    baseColor.b = lerp(baseColor.b, targetColor.b, lerpFactor);
  }

  $(window).scroll(function () {
    let scroll = $(window).scrollTop() + $(window).height() / 2;
    let $panel = $(".panel");

    let currentPanel = $panel
      .filter(function () {
        return (
          $(this).position().top <= scroll &&
          $(this).position().top + $(this).outerHeight() > scroll
        );
      })
      .data("color");

    if (currentPanel) {
      targetColor = hexToRgb(currentPanel); // Update target color based on panel
    }
  });

  draw();
});

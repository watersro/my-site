window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const header = document.querySelector("header"); // Ensure this selector targets your header

  const noise = new SimplexNoise();
  let time = 0;

  let baseColor = { r: 203, g: 235, b: 242 }; // Initial color: #CBEBF2
  let targetColor = { ...baseColor };
  let lerpFactor = 0.045;

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
    let frequency = 0.009; // The frequency of the noise
    let amplitude = 20; // The amplitude of the noise

    // Variables to store average color values for the header
    let avgR = 0,
      avgG = 0,
      avgB = 0;
    let count = 0;

    for (let x = 0; x < canvas.width; x++) {
      for (let y = 0; y < canvas.height; y++) {
        let v =
          ((1 + noise.noise3D(x * frequency, y * frequency, time)) / 2) *
          amplitude;

        let index = (x + y * canvas.width) * 4;
        data[index] = Math.min(255, Math.max(0, baseColor.r + v)); // Red
        data[index + 1] = Math.min(255, Math.max(0, baseColor.g + v)); // Green
        data[index + 2] = Math.min(255, Math.max(0, baseColor.b - v)); // Blue
        data[index + 3] = 255; // Alpha

        // Accumulate values to calculate average
        if (x % 10 === 0 && y % 10 === 0) {
          // Sample the colors sparsely
          avgR += data[index];
          avgG += data[index + 1];
          avgB += data[index + 2];
          count++;
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(draw);

    // Calculate average colors for the header
    avgR /= count;
    avgG /= count;
    avgB /= count;

    // Apply the average noise color to the header's background
    header.style.backgroundColor = rgbToCss(avgR, avgG, avgB);

    // Smoothly transition base color towards the target color
    baseColor.r = lerp(baseColor.r, targetColor.r, lerpFactor);
    baseColor.g = lerp(baseColor.g, targetColor.g, lerpFactor);
    baseColor.b = lerp(baseColor.b, targetColor.b, lerpFactor);
  }

  $(window).scroll(function () {
    let scroll = $(window).scrollTop() + $(window).height() / 2,
      $panel = $(".panel");

    let currentPanel = $panel
      .filter(function () {
        return (
          $(this).position().top <= scroll &&
          $(this).position().top + $(this).outerHeight() > scroll
        );
      })
      .data("color");

    if (currentPanel) {
      targetColor = hexToRgb(currentPanel);
    }
  });

  draw();
});

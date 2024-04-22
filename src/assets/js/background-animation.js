document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const noise = new SimplexNoise();
  let time = 0;

  let mouse = { x: -100, y: -100 }; // Initialize mouse position off screen

  // Update mouse coordinates on mouse move
  canvas.addEventListener("mousemove", function (e) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  let baseColor = { r: 203, g: 235, b: 242 }; // Initial color: #CBEBF2
  let targetColor = { ...baseColor };
  let lerpFactor = 0.06; // Adjust this for faster or slower transitions

  function draw() {
    time += 0.01; // Speed of the animation
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;

    for (let x = 0; x < canvas.width; x++) {
      for (let y = 0; y < canvas.height; y++) {
        let dx = mouse.x - x;
        let dy = mouse.y - y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        let localAmplitude = 20; // Default amplitude
        let localFrequency = 0.009; // Default frequency

        // Change frequency and amplitude based on distance to mouse
        if (dist < 150) {
          // Effect radius of 150 pixels around the mouse
          const factor = (150 - dist) / 150; // Normalize factor (0 at edge and 1 at center of radius)
          localFrequency += 0.04 * factor; // Increase frequency based on factor
          localAmplitude += 40 * factor; // Increase amplitude based on factor
        }

        let v =
          ((1 + noise.noise3D(x * localFrequency, y * localFrequency, time)) /
            2) *
          localAmplitude;

        let index = (x + y * imageData.width) * 4;
        data[index] = baseColor.r + v; // Red channel
        data[index + 1] = baseColor.g + v; // Green channel
        data[index + 2] = baseColor.b - v; // Blue channel
        data[index + 3] = 255; // Alpha channel fully opaque
      }
    }

    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(draw);

    // Update the base color towards the target color smoothly
    baseColor.r = lerp(baseColor.r, targetColor.r, lerpFactor);
    baseColor.g = lerp(baseColor.g, targetColor.g, lerpFactor);
    baseColor.b = lerp(baseColor.b, targetColor.b, lerpFactor);
  }

  draw();
});

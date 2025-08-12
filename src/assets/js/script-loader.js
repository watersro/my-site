(function () {
  "use strict";

  // Lightweight script loader to reduce unused JavaScript
  const ScriptLoader = {
    loadedScripts: new Set(),

    load: function (src, callback) {
      if (this.loadedScripts.has(src)) {
        if (callback) callback();
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = () => {
        this.loadedScripts.add(src);
        if (callback) callback();
      };
      document.head.appendChild(script);
    },

    // Load scripts only when user interacts with the page
    loadOnInteraction: function (scripts) {
      let loaded = false;
      const loadScripts = () => {
        if (loaded) return;
        loaded = true;

        scripts.forEach((script) => {
          this.load(script);
        });

        // Remove event listeners after loading
        document.removeEventListener("mousemove", loadScripts, {
          passive: true,
        });
        document.removeEventListener("scroll", loadScripts, { passive: true });
        document.removeEventListener("touchstart", loadScripts, {
          passive: true,
        });
        document.removeEventListener("keydown", loadScripts, { passive: true });
      };

      // Add event listeners for user interaction
      document.addEventListener("mousemove", loadScripts, { passive: true });
      document.addEventListener("scroll", loadScripts, { passive: true });
      document.addEventListener("touchstart", loadScripts, { passive: true });
      document.addEventListener("keydown", loadScripts, { passive: true });

      // Fallback: load after 5 seconds if no interaction
      setTimeout(loadScripts, 5000);
    },
  };

  window.ScriptLoader = ScriptLoader;
})();

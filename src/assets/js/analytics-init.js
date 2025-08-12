(function () {
  "use strict";

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());

  // Set default consent to denied
  gtag("consent", "default", {
    analytics_storage: "denied",
  });

  gtag("config", "G-KX7SGWZHD6");
})();

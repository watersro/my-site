(function () {
  "use strict";

  // Only load Google Analytics if user has explicitly accepted cookies
  const consent = getCookie("cookie-consent");

  if (consent === "accepted") {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());

    // Set most restrictive consent settings to minimize third-party cookies
    gtag("consent", "default", {
      analytics_storage: "granted",
      ad_storage: "denied", // Always deny ad storage for better privacy
      ad_user_data: "denied", // Deny ad user data
      ad_personalization: "denied", // Deny ad personalization
      functionality_storage: "denied",
      personalization_storage: "denied",
      security_storage: "granted",
    });

    gtag("config", "G-KX7SGWZHD6", {
      anonymize_ip: true, // Enhanced privacy
      cookie_flags: "SameSite=Strict;Secure", // Better cookie security
      cookie_expires: 60 * 60 * 24 * 7, // Only 7 days instead of 30
      cookie_update: false, // Don't update cookies on page load
      cookie_domain: "romanwaters.com", // Use first-party domain only
      allow_google_signals: false, // Disable Google signals for better privacy
      allow_ad_personalization_signals: false, // Disable ad personalization
      send_page_view: false, // Manually control page view events
      client_storage: "none", // Disable client-side storage where possible
    });

    // Send page view manually to have more control
    gtag("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      custom_parameters: {
        // Use custom parameters to reduce data sent to Google
        privacy_mode: true,
      },
    });
  }

  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
})();

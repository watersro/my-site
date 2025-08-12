(function () {
  "use strict";

  const COOKIE_NAME = "cookie-consent";
  const COOKIE_DURATION = 365; // days

  function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict;Secure`;
    // Also store in localStorage for faster access
    localStorage.setItem(name, value);
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

  function showBanner() {
    const banner = document.getElementById("cookie-banner");
    if (banner) {
      banner.style.display = "block";
      // Use requestAnimationFrame to ensure the display change is applied before the transform
      requestAnimationFrame(() => {
        banner.classList.remove("translate-y-full");
        banner.classList.add("translate-y-0");
      });
    }
  }

  function hideBanner() {
    const banner = document.getElementById("cookie-banner");
    if (banner) {
      banner.classList.remove("translate-y-0");
      banner.classList.add("translate-y-full");
      // Hide the banner completely after the animation
      setTimeout(() => {
        banner.style.display = "none";
      }, 300);
    }
  }

  function acceptCookies() {
    setCookie(COOKIE_NAME, "accepted", COOKIE_DURATION);
    hideBanner();
    // Enable analytics if cookies are accepted
    enableAnalytics();
    // Dispatch event to trigger GA loading
    window.dispatchEvent(new CustomEvent("cookieConsentChanged"));
  }

  function declineCookies() {
    setCookie(COOKIE_NAME, "declined", COOKIE_DURATION);
    hideBanner();
    // Disable analytics if cookies are declined
    disableAnalytics();
  }

  function enableAnalytics() {
    // Enable Google Analytics with minimal third-party data sharing
    if (typeof gtag !== "undefined") {
      gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "denied", // Keep ad storage denied for privacy
        ad_user_data: "denied", // Deny ad user data
        ad_personalization: "denied", // Deny ad personalization
      });
    }
  }

  function disableAnalytics() {
    // Disable Google Analytics completely
    if (typeof gtag !== "undefined") {
      gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }
  }

  function manageCookies() {
    // Clear existing cookie consent to force the banner to show again
    document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    localStorage.removeItem("cookie-consent"); // Also clear localStorage
    showBanner();
  }

  function initCookieBanner() {
    const consent = getCookie(COOKIE_NAME);

    if (!consent) {
      // Show banner if no consent has been given
      showBanner();
    } else if (consent === "accepted") {
      enableAnalytics();
    } else if (consent === "declined") {
      disableAnalytics();
    }

    // Add event listeners
    const acceptBtn = document.getElementById("accept-cookies");
    const declineBtn = document.getElementById("decline-cookies");
    const manageCookiesBtn = document.getElementById("manage-cookies");

    if (acceptBtn) {
      acceptBtn.addEventListener("click", acceptCookies);
    }

    if (declineBtn) {
      declineBtn.addEventListener("click", declineCookies);
    }

    if (manageCookiesBtn) {
      manageCookiesBtn.addEventListener("click", manageCookies);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCookieBanner);
  } else {
    initCookieBanner();
  }
})();

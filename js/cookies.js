// Bandeau de consentement cookies (RGPD) + chargement conditionnel de l'outil de mesure d'audience.
(function () {
  var STORAGE_KEY = 'fovia_cookie_consent'; // 'accepted' | 'refused'
  var banner = document.querySelector('#cookie-banner');
  var acceptBtn = document.querySelector('#cookie-accept');
  var refuseBtn = document.querySelector('#cookie-refuse');

  function loadAnalytics() {
    // Outil de mesure d'audience sans cookie (ex. Plausible). Remplacer data-domain
    // par le domaine réel une fois le compte créé — voir README « Analytics ».
    if (document.querySelector('#fovia-analytics')) return;
    var s = document.createElement('script');
    s.id = 'fovia-analytics';
    s.defer = true;
    s.setAttribute('data-domain', 'fovia.fr');
    s.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(s);
  }

  function getConsent() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function setConsent(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) {}
  }

  var consent = getConsent();
  if (consent === 'accepted') {
    loadAnalytics();
  } else if (consent !== 'refused' && banner) {
    banner.hidden = false;
  }

  if (acceptBtn) {
    acceptBtn.addEventListener('click', function () {
      setConsent('accepted');
      if (banner) banner.hidden = true;
      loadAnalytics();
    });
  }
  if (refuseBtn) {
    refuseBtn.addEventListener('click', function () {
      setConsent('refused');
      if (banner) banner.hidden = true;
    });
  }
})();

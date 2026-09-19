// Menu mobile
const menu = document.querySelector('#menu'), nav = document.querySelector('#navigation');
if (menu) {
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', open);
  });
}
if (nav) {
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    menu && menu.setAttribute('aria-expanded', 'false');
  }));
}

// Année dynamique du footer
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

// Date de mise à jour des pages légales (CGU, confidentialité)
document.querySelectorAll('#legal-date').forEach((el) => {
  el.textContent = new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
});

// Formulaire de contact : validation + anti-spam (honeypot + délai minimal) + envoi via mailto
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  const loadedAtField = document.querySelector('#form-loaded-at');
  if (loadedAtField) loadedAtField.value = Date.now();

  const fields = {
    name: { el: document.querySelector('#name'), error: document.querySelector('#name-error') },
    email: { el: document.querySelector('#email'), error: document.querySelector('#email-error') },
    message: { el: document.querySelector('#message'), error: document.querySelector('#message-error') },
    consent: { el: document.querySelector('#consent'), error: document.querySelector('#consent-error') }
  };
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(field, msg) {
    if (!field.error) return;
    field.error.textContent = msg || '';
    if (field.el) field.el.setAttribute('aria-invalid', msg ? 'true' : 'false');
  }

  function validate() {
    let ok = true;
    const name = fields.name.el.value.trim();
    if (name.length < 2) { setError(fields.name, 'Merci de renseigner votre nom (2 caractères minimum).'); ok = false; }
    else setError(fields.name, '');

    const email = fields.email.el.value.trim();
    if (!emailRe.test(email)) { setError(fields.email, 'Merci de renseigner une adresse e-mail valide.'); ok = false; }
    else setError(fields.email, '');

    const message = fields.message.el.value.trim();
    if (message.length < 10) { setError(fields.message, 'Votre message doit contenir au moins 10 caractères.'); ok = false; }
    else setError(fields.message, '');

    if (!fields.consent.el.checked) { setError(fields.consent, 'Merci d\'accepter la politique de confidentialité pour continuer.'); ok = false; }
    else setError(fields.consent, '');

    return ok;
  }

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const status = document.querySelector('#status');

    // Honeypot : un champ invisible pour les humains, souvent rempli par les robots
    const honeypot = document.querySelector('#website');
    if (honeypot && honeypot.value.trim() !== '') {
      // On ne montre pas d'erreur explicite à un robot ; on bloque simplement l'envoi.
      return false;
    }

    // Délai minimal entre l'affichage du formulaire et l'envoi (protection anti-bot simple)
    const loadedAt = Number(loadedAtField && loadedAtField.value);
    if (loadedAt && (Date.now() - loadedAt) < 2000) {
      if (status) status.textContent = 'Merci de patienter quelques secondes avant d\'envoyer le formulaire.';
      return false;
    }

    if (!validate()) {
      if (status) status.textContent = 'Merci de corriger les champs signalés ci-dessus.';
      return false;
    }

    const n = fields.name.el.value.trim();
    const em = fields.email.el.value.trim();
    const m = fields.message.el.value.trim();

    if (status) status.textContent = 'Ouverture de votre messagerie…';
    location.href = 'mailto:Alfred.association@fovia.fr?subject=' + encodeURIComponent('Contact FOVIA — ' + n) +
      '&body=' + encodeURIComponent('Nom : ' + n + '\nE-mail : ' + em + '\n\n' + m);
    return false;
  });
}

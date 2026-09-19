FOVIA — site v3 (audit et corrections)
========================================

Structure :
index.html, association.html, actions.html, projets.html, rejoindre.html,
dons.html, contact.html, 404.html
+ pages légales : mentions-legales.html, confidentialite.html, cgu.html, accessibilite.html
css/style.css, js/script.js, js/cookies.js
robots.txt, sitemap.xml, .htaccess
favicon.svg / favicon.ico / favicon-*.png / apple-touch-icon.png
img/og-image.png (image de partage réseaux sociaux)

Domaine prévu : https://fovia.fr/

------------------------------------------------------------
RÉCAPITULATIF DES 20 POINTS DEMANDÉS
------------------------------------------------------------
1.  Page RGPD              -> confidentialite.html (créée)
2.  Page CGU                -> cgu.html (créée)
3.  API hors front-end      -> déjà conforme : aucune clé/API n'est appelée
    côté navigateur (formulaire en mailto:, pas de backend). À respecter
    aussi pour tout futur ajout (paiement en ligne, envoi de formulaire
    par API : toujours passer par un serveur, jamais une clé secrète
    dans le JS du site).
4.  Force le HTTPS          -> .htaccess (redirection 301 HTTP -> HTTPS +
    HSTS). Fonctionne sur hébergement Apache classique (OVH, o2switch,
    Ionos...). Si l'hébergement final est Netlify/Vercel/Cloudflare
    Pages, dites-le-moi : la configuration est différente (netlify.toml
    ou réglage natif de la plateforme) et .htaccess sera ignoré.
5.  Bannière cookies        -> js/cookies.js + bloc en bas de chaque page.
    Aucun cookie non essentiel n'est déposé avant acceptation.
6.  Meta title              -> titres réécrits, uniques et descriptifs par page.
7.  Image réseaux (OG)      -> img/og-image.png généré + balises
    Open Graph / Twitter Card sur toutes les pages.
8.  Favicon                 -> favicon.svg + .ico + PNG (16/32/48/192) +
    apple-touch-icon.png. Design provisoire aux couleurs FOVIA (à
    remplacer par votre logo définitif si vous en créez un).
9.  Sitemap + robots.txt    -> sitemap.xml + robots.txt (racine du site).
10. Textes images (alt)     -> aucune photo réelle n'est présente dans le
    site actuel (uniquement un bloc "PHOTO / ÉVÉNEMENT À AJOUTER" en
    texte, sur projets.html). Rien à corriger pour l'instant. Quand vous
    ajouterez de vraies photos : toujours utiliser <img alt="description
    du contenu de la photo, pas juste son nom de fichier">.
11. Compresse images        -> pas de photos à compresser actuellement ;
    les images créées (favicons, image réseaux sociaux) sont déjà
    optimisées (og-image.png ≈ 25 Ko). Quand vous ajouterez des photos :
    exportez-les en WebP/JPEG optimisé, largeur max ~1600px pour les
    photos pleine largeur, via un outil comme squoosh.app ou TinyPNG.
12. Vitesse pages           -> scripts en "defer", cache navigateur et
    compression gzip activés (.htaccess), CSS/JS déjà très légers
    (~8 Ko / ~3 Ko). Le site est mono-page-statique sans dépendance
    externe : les temps de chargement devraient être excellents une
    fois ces règles serveur actives.
13. Contraste               -> vérifié (calcul WCAG) : tous les textes du
    site respectent le ratio minimum de 4,5:1. Le bleu d'accent a été
    légèrement assombri (#1677d2 -> #0f66bf) pour une marge de sécurité
    plus confortable sur les libellés en bleu sur fond blanc.
14. Site responsive          -> déjà bien implémenté (menu mobile, grilles
    qui s'empilent, 2 points de rupture 900px/600px) ; vérifié, non modifié.
15. Page 404 custom          -> 404.html créée, référencée dans .htaccess
    (ErrorDocument 404).
16. Répare liens cassés      -> les liens "Mentions légales / Confidentialité
    / Accessibilité" du pied de page pointaient vers "#" (aucune page) :
    corrigés vers les nouvelles pages. Un lien "CGU" a été ajouté. Les
    deux boutons de don "bientôt disponibles" utilisaient un lien
    href="#" trompeur : remplacés par de vrais boutons désactivés
    (<button disabled>), plus honnêtes et plus accessibles.
17. Valid formulaires        -> formulaire de contact : validation en
    temps réel (nom, e-mail, message ≥10 caractères), messages d'erreur
    accessibles (aria-live), et ajout d'une case de consentement RGPD
    obligatoire avant envoi.
18. Anti-spam                -> champ "honeypot" invisible (piège à robots)
    + délai minimal de 2 secondes entre l'affichage et l'envoi du
    formulaire. Le formulaire actuel ouvre la messagerie de l'internaute
    (mailto:) : le risque de spam automatisé est déjà faible, mais ces
    protections sont prêtes pour le jour où vous brancherez un vrai
    service d'envoi (Formspree, Netlify Forms, etc.).
19. Outil d'analytics        -> intégration prête (js/cookies.js) pour
    Plausible (mesure d'audience sans cookie, respectueuse du RGPD),
    chargée uniquement après consentement. ATTENTION : le script pointe
    vers data-domain="fovia.fr" mais AUCUN compte n'est créé/payé à ce
    stade — je n'ai pas de compte à votre nom. Pour l'activer : créez un
    compte sur plausible.io (ou remplacez par Matomo/GA4 si vous
    préférez), vérifiez le domaine fovia.fr, et c'est tout.
20. Un seul CTA              -> vérifié page par page. La page d'accueil
    n'avait déjà qu'un seul bouton "fort" (jaune) par page, les autres
    étant en style secondaire (contour/sombre) — conforme. Sur la page
    "Faire un don", plusieurs options sont proposées côte à côte
    (ponctuel / mensuel / virement / autre) : ce n'est pas une
    compétition de CTA mais un choix de moyen de don, donc volontairement
    conservé tel quel plutôt que réduit à un seul bouton.

------------------------------------------------------------
À FAIRE DE VOTRE CÔTÉ AVANT MISE EN LIGNE (informations que je
ne peux pas inventer à votre place) :
------------------------------------------------------------
- mentions-legales.html : adresse du siège, n° RNA/SIRET, nom du
  responsable de publication, nom + adresse de l'hébergeur définitif.
- confidentialite.html : adresse du siège, nom du représentant légal.
- Les données bancaires (dons.html) et l'éligibilité au mécénat/réduction
  d'impôt restent volontairement en attente, comme dans la v2 — à
  confirmer avant d'émettre des reçus fiscaux.
- Créer/relier un compte Plausible (ou autre outil) pour activer
  réellement l'analytics.
- Me confirmer l'hébergeur final si ce n'est pas un Apache classique,
  pour adapter la configuration HTTPS/cache.

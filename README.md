# Topaze Prestige — Site VTC

Site vitrine ultra futuriste (noir · or · blanc) pour **Topaze Prestige**, service de chauffeur privé VTC haut de gamme.

## Contenu

- **Tableau de bord de réservation** en ouverture : départ, arrivée, date, heure, véhicule, passagers, estimation de prix en direct, envoi de la demande par e-mail.
- **Flotte automobile** : 4 catégories de véhicules avec tarifs (prise en charge, prix au km, transfert aéroport).
- **Savoir-faire** : présentation du métier avec photo du chauffeur en costume noir, valeurs et chiffres clés animés.
- **Contact / footer**.

## Structure

```
index.html        Page unique du site
css/style.css     Styles (noir, or, blanc, effets futuristes)
js/main.js        Estimation de prix, réservation, animations, particules
assets/           Favicon + images
```

## Personnalisation rapide

- **Tarifs** : modifier la grille `TARIFS` en haut de `js/main.js` et les montants affichés dans les cartes de `index.html` (section `#flotte`).
- **Téléphone / e-mail** : rechercher `06 00 00 00 00` et `contact@topaze-prestige.fr` dans `index.html` et `js/main.js`.
- **Photo du chauffeur** : déposer votre photo sous `assets/chauffeur.jpg` (format portrait 4:5 conseillé). À défaut, une photo libre de droits est chargée automatiquement.

## Lancement

Aucune dépendance : ouvrir `index.html` dans un navigateur, ou héberger le dossier tel quel (GitHub Pages, Netlify, etc.).

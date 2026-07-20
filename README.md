# Topaze Prestige — Site VTC

Site vitrine ultra futuriste (noir · or · blanc) pour **Topaze Prestige**, service de chauffeur privé VTC haut de gamme.

## Contenu

- **Tableau de bord de réservation** en ouverture : départ, arrivée, date, heure, véhicule, passagers, estimation de prix en direct, envoi de la demande par e-mail.
- **Flotte automobile** : BMW Série 7, Mercedes Classe V, Mercedes Sprinter VIP, moto Honda Gold Wing — avec tarifs (prise en charge, prix au km, transfert aéroport Marseille-Provence) et renvoi téléphonique pour tout autre véhicule.
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
- **Coordonnées** : téléphone `06 58 96 94 13`, e-mail `topazeprestige@gmail.com`, adresse Le Canet — 13014 Marseille (dans `index.html` et `js/main.js`).
- **Photos des véhicules** : déposer les fichiers `assets/flotte/bmw-serie-7.jpg`, `assets/flotte/mercedes-classe-v.jpg`, `assets/flotte/sprinter-vip.jpg`, `assets/flotte/gold-wing.jpg` (format paysage 16:9 conseillé). Elles remplacent automatiquement les visuels dorés.
- **Photo du chauffeur** : déposer votre photo sous `assets/chauffeur.jpg` (format portrait 4:5 conseillé). À défaut, une photo libre de droits est chargée automatiquement.

## Lancement

Aucune dépendance : ouvrir `index.html` dans un navigateur, ou héberger le dossier tel quel (GitHub Pages, Netlify, etc.).

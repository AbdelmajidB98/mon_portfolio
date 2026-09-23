# Abdelmajid Bouchoucha — Portfolio Full-Stack

Code source du portfolio professionnel bilingue (français et anglais) d’Abdelmajid Bouchoucha. Il présente son parcours, ses compétences et 14 projets professionnels, freelance et académiques, classés par organisation et période de développement. Le site est développé avec React, TypeScript et Vite ; il peut être consulté localement sans service externe.

## Démarrage

Prérequis : Node.js 20.19+ ou 22 LTS, npm.

```sh
npm install
npm run dev
```

Ouvrir l’adresse affichée par Vite, généralement http://127.0.0.1:5173.

```sh
npm run check
npm run build
npm run preview
```

Le build de production est généré dans `dist/`. `preview` permet de le tester localement.

## Fonctionnalités

- FR / EN avec détection initiale, préférence persistante et contenu équivalent.
- Navigation fixe, repérage de la section active, menu mobile et navigation au clavier.
- Écosystème technique animé, parcours professionnel, compétences, formation et langues.
- 14 projets regroupés par catégorie puis par organisation, du plus récent au plus ancien dans chaque groupe. Trois boutons permettent d’isoler les catégories professionnelles, freelance et académiques ; un second clic réaffiche les trois. Six fiches majeures conservent un aperçu visuel.
- Fiches détaillées : contexte, besoin, solution, rôle, architecture, périmètre, technologies, enjeux et axes d’apprentissage.
- Illustrations conceptuelles en HTML/CSS : aucune fausse capture ni donnée client.
- Respect du réglage de réduction des animations, lien d’évitement et focus visibles.
- Métadonnées FR/EN, OpenGraph, Twitter, favicon et robots.txt.
- Contact par `mailto:` ; aucune simulation d’envoi de formulaire.
- CV automatiquement proposé au démarrage/build uniquement si son fichier existe.
- Pages projets et 404 chargées à la demande ; polices Inter hébergées localement.

## Technologies

React 19, TypeScript, Vite, Tailwind CSS 4, Framer Motion, React Router, Lucide React, i18next, react-i18next et Inter. Prettier est disponible pour le formatage.

## Architecture

```text
public/
  cv/                         # CV PDF à fournir
  images/projects/            # Captures autorisées à ajouter
  favicon.svg
  robots.txt
scripts/
  verify-content.mjs          # Contrôle de parité des traductions
src/
  components/
    layout.tsx                # Navbar, langue, menu, CV, footer, scroll
    Hero.tsx                  # Hero, TechOrbit, RecruiterSnapshot
    Sections.tsx              # About, Experience, Skills, Education, Contact
    Projects.tsx              # Galerie, catégories, cartes
    ProjectVisual.tsx         # Illustrations sans dépendance à des images
    SEO.tsx
    ui.tsx                    # AnimatedSection, SectionHeader, TechStack
  data/
    projects.ts
    experiences.ts
    education.ts
    skills.ts
  i18n/
    index.ts
    locales/{fr,en}/
      common.json
      experience.json
      projects.json
  pages/
    Home.tsx
    ProjectDetails.tsx
    NotFound.tsx
  styles/index.css            # Tokens, composants et responsive
  types/index.ts
  App.tsx
  main.tsx
netlify.toml
vite.config.ts
```

## Pages et projets

La page `/` regroupe le portfolio. Les sections possèdent des ancres stables : `home`, `about`, `experience`, `projects`, `skills`, `education`, `contact`.

| Catégorie      | Organisation                    | Projets et période                                                                                                                  |
| -------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Professionnels | NEXTIRA                         | `apa-pieces-auto`, `bybuy`, `fleet` · période d’expérience décembre 2025 – août 2026                                                |
| Professionnels | Millesima Technologies / MyVioo | `myvioo` · février – juillet 2025                                                                                                   |
| Professionnels | Social Media Conseils           | `digital-prospecting` · période d’expérience juin – septembre 2023                                                                  |
| Freelance      | —                               | `wedding-invitation` · août 2026 ; `civil-engineering-dms` · 2025                                                                   |
| Académiques    | ITEAM University                | `iteam-freelance-connect` · PFA juin 2024 ; `iteam-elearning` · PFS janvier 2024 ; `bank-management` · PFA juin 2023                |
| Académiques    | CrocoCoder                      | `training-fleet`, `auto-ecommerce`, `doctor-appointments`, `training-management` · période de formation octobre 2021 – février 2022 |

Pour NEXTIRA, Social Media Conseils et CrocoCoder, les mois individuels de développement de chaque projet ne sont pas connus : l’interface indique donc explicitement la période de l’expérience ou de la formation. Le PFA ITEAM Freelance Connect mentionne Scrum, l’organisation en sprints et le Sprint Backlog.

Les routes inconnues, y compris les slugs de projet invalides, affichent une page 404 traduite. Sur un hébergement SPA, la réponse HTTP de fallback est 200 ; l’interface 404 pose `noindex`.

La fiche ByBuy décrit l’ERP développé pour gérer les comptes fournisseurs et clients de chaque GIE. Elle renvoie au [site public ByBuy](https://by-buy.net/) pour situer l’activité, en précisant que ce site et l’ERP sont distincts. Les commandes, devis et stocks ne sont pas présentés comme des fonctions de cet ERP faute de confirmation.

## Traductions

`src/i18n/index.ts` initialise trois espaces de noms : `common`, `experience`, `projects`.

Au premier accès, un navigateur dont la langue commence par `fr` reçoit le français ; les autres reçoivent l’anglais. Le fallback est le français. Une sélection manuelle est enregistrée dans `localStorage` sous `portfolio-language`. La langue est conservée entre les routes et les rechargements. En cas de stockage bloqué, le changement reste fonctionnel pendant la session.

Modifier chaque clé dans **les deux langues**. Ne pas traduire les noms de technologies. Les tableaux doivent contenir la même quantité d’informations. Lancer `npm run check` pour contrôler la parité. Les composants utilisent `useTranslation()` sans duplication FR/EN.

## Modifier le contenu et ajouter un projet

1. Modifier les données techniques dans `src/data/` ; les textes vivent dans les JSON correspondants.
2. Pour un projet, ajouter une entrée typée dans `projects.ts` avec un slug unique, une catégorie, son organisation, `periodSort` au format `AAAAMM` pour le classement, les technologies et un style d’illustration. Ajouter toute nouvelle organisation au type `ProjectOrganization` et à `organizationOrder`. Si seule l’année est connue, utiliser `AAAA00` ; si seule la période d’expérience est connue, la décrire comme telle dans le libellé visible.
3. Ajouter l’objet du même slug aux deux `projects.json`, en suivant une fiche existante. Champs : `period`, `title`, `subtitle`, `description`, `context`, `problem`, `solution`, `role`, `architecture`, `features`, `concepts`, `challenges`, `learning` ; `scope` est facultatif.
4. `featured: true` place le projet dans la sélection principale. Les autres cartes sont plus compactes.
5. Les liens `github`, `demo` et `publicWebsite` sont facultatifs : ne renseigner que des adresses réelles et publiables. `publicWebsite` désigne le site public lié au projet, sans le présenter comme une démonstration du logiciel développé.
6. Les informations personnelles et liens sociaux se trouvent dans `common.json`, `layout.tsx` et `Sections.tsx`.

Les missions professionnelles proviennent du prompt fourni. Les périmètres incertains sont indiqués comme tels. Les axes d’apprentissage sont des thèmes techniques du projet, pas des résultats chiffrés. Aucun employeur, témoignage, gain de performance ou dépôt GitHub de projet n’a été inventé.

## Captures et visuels

Déposer les captures autorisées dans `public/images/projects/`, idéalement en WebP ou AVIF, puis définir par exemple `image: '/images/projects/apa.webp'` sur le projet. Sans image, le composant `ProjectVisual` génère une illustration HTML/CSS légère. Les illustrations actuelles sont explicitement signalées comme conceptuelles. Après ajout d’une vraie capture, adapter sa légende et son texte alternatif dans `ProjectVisual` / `ProjectDetails` si l’image apporte une information non décrite dans le texte.

## CV

Déposer le fichier exact :

```text
public/cv/Abdelmajid-Bouchoucha-CV.pdf
```

Redémarrer Vite ou relancer le build. La présence est vérifiée par Vite : le bouton n’est pas un lien lorsque le PDF est absent. Le document n’a pas été fabriqué à partir du prompt.

## SEO et URL publique

Copier `.env.example` vers `.env.local` et remplacer `VITE_SITE_URL` par l’URL publique finale. Une URL `.example` n’est jamais publiée comme canonical. Les canonical et `og:url` ne sont émis qu’après configuration d’une véritable URL.

Les métadonnées sont mises à jour côté client pour la langue et la route. Les robots ne rendant pas JavaScript peuvent uniquement lire les métadonnées initiales françaises d’`index.html`. Pour des aperçus sociaux spécifiques à chaque projet dans ces robots, un prérendu ou rendu serveur sera nécessaire. Aucun score Lighthouse n’est revendiqué sans mesure.

## Netlify — prêt, non déployé

Build command : `npm run build`.

Publish directory : `dist`.

`netlify.toml` est déjà configuré avec le fallback React Router `/* → /index.html` (200), ce qui permet les accès directs et rechargements sur les pages projets. Aucun compte Netlify n’a été connecté et aucune publication n’a été effectuée.

## Éléments à fournir

- CV PDF final.
- Captures réelles et autorisées si vous souhaitez remplacer les illustrations.
- URL publique pour les canonical.
- Liens de démo / dépôts publiables, uniquement s’ils existent.
- Détails personnels supplémentaires sur les rôles, réalisations et enseignements des projets dont le périmètre n’est pas confirmé.

## Vérifications réalisées

- `npm install` : installation réussie, audit npm sans vulnérabilité signalée au moment de la livraison.
- `npm run check` : TypeScript et parité FR/EN des trois espaces de noms validés.
- `npm run build` : succès, sortie `dist/`, sans avertissement de taille de bundle après découpage.
- Accueil et fiche projet : absence de débordement horizontal aux largeurs 320, 375, 390, 430, 768, 1024, 1280, 1440 et 1920 px.
- 14 routes projet ouvertes en FR et EN ; versions anglaises également contrôlées sur mobile.
- Trois catégories vérifiées : 5 projets professionnels, 2 freelance et 7 académiques/formation. Un second clic réaffiche les 14 projets.
- Classement vérifié dans le navigateur : NEXTIRA → MyVioo → Social Media Conseils ; invitation d’août 2026 → génie civil 2025 ; PFA juin 2024 → PFS janvier 2024 → PFA juin 2023 → CrocoCoder. La fiche du PFA 2024 affiche Scrum et le Sprint Backlog en FR et EN.
- Persistance de la langue après rechargement, navigation projet et précédent/suivant ; menu mobile, sélecteur mobile et fermeture par Échap.
- Page 404 en FR et EN, titres SEO traduits, absence de lien CV cassé.
- Build servi et consulté avec `npm run preview`, navigation vers une fiche puis retour navigateur vérifiés.
- Rendu desktop/mobile examiné visuellement ; illustrations adaptées aux données du prompt plutôt qu’aux textes fictifs de la maquette de conception.

Ces contrôles ne constituent pas un audit Lighthouse ni une certification d’accessibilité.

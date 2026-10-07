# Documentation projet — Site mariage Sheila & Loïc

**Version :** octobre 2026  
**Dépôt :** https://github.com/guillaumywamba/sheila-loic-wedding  
**Production :** https://sheila-loic-wedding.vercel.app  
**Administration :** https://sheila-loic-wedding.vercel.app/admin/login  

---

## 1. Résumé exécutif

Ce projet est une **réplique fidèle et évolutive** du site Zite « Sheila & Loïc Wedding Hub », enrichie d’une **console d’administration** protégée, d’un **formulaire RSVP**, d’un **monitoring des invités** et d’un hébergement **Vercel** connecté à **GitHub**.

Objectifs atteints :

- Site public responsive (desktop + mobile), charte visuelle rose / vert
- Navigation mobile fixe en barre pillule verte avec icônes
- Édition complète du contenu via l’admin (textes, images, événements, galerie)
- Persistance des données en production (GitHub API, Vercel Blob ou Redis)
- Export Excel des réponses RSVP

---

## 2. Chronologie des réalisations

| Étape | Description |
|-------|-------------|
| **1. Analyse** | Audit du site source (https://mde81vgch5.zite.so/) : structure, textes, images Fillout, polices Playfair / Cormorant / Inter, couleurs (#00674f, #fdc1c5). |
| **2. Initialisation** | Création du projet Next.js 16 (App Router), TypeScript, Tailwind CSS 4, dépôt Git. |
| **3. Modèle de contenu** | Schéma `SiteContent` (types TypeScript) + `default-content.ts` avec l’intégralité du contenu initial (hero, bienvenue, 4 événements, logistique, biographie, histoire, 30 photos galerie, RSVP, contact). |
| **4. Interface publique** | Composants : `WeddingSite`, navigation, compte à rebours, carrousels, sections logistique / hébergements, galerie masonry, formulaire RSVP, pied de page. |
| **5. Admin & auth** | Login JWT (cookie httpOnly), middleware de protection, dashboard par onglets pour éditer chaque section. |
| **6. Stockage** | Fichiers locaux `data/` en dev ; en production : priorité **GitHub Contents API**, puis **Vercel Blob**, **Upstash Redis**. |
| **7. Déploiement** | GitHub `guillaumywamba/sheila-loic-wedding` → Vercel (région Paris `cdg1`). |
| **8. Mobile** | Barre de navigation basse fixe, safe-area, icônes par section. |
| **9. Galerie admin** | Upload depuis la galerie de l’appareil (`/api/upload`), enregistrement automatique. |
| **10. Monitoring RSVP** | Statistiques présents / absents, tableau détaillé, export **Excel** (`.xlsx`). |
| **11. Typographie** | Justification des paragraphes (`site-justify`) pour un rendu plus propre. |
| **12. Crédits** | Pied de page : « Design By LeCousinEnQuestion ». |

---

## 3. Stack technique

### Frontend

| Technologie | Rôle |
|-------------|------|
| **Next.js 16.3** | Framework React, SSR/SSG, routes API, déploiement serverless |
| **React 19** | Interface utilisateur |
| **TypeScript 5** | Typage strict du contenu et des API |
| **Tailwind CSS 4** | Styles utilitaires, thème couleurs mariage |
| **Google Fonts** | Playfair Display, Cormorant Garamond, Inter (via CSS `@import`) |

### Backend (routes API App Router)

| Route | Méthode | Rôle |
|-------|---------|------|
| `/api/content` | GET / PUT | Lecture / écriture du contenu site (admin pour PUT) |
| `/api/auth/login` | POST | Authentification admin |
| `/api/auth/logout` | POST | Déconnexion |
| `/api/rsvp` | GET / POST | Liste RSVP (admin) / soumission invité |
| `/api/rsvp/export` | GET | Export Excel des invités |
| `/api/upload` | POST | Upload images galerie (admin, multipart) |
| `/api/storage-status` | GET | État du stockage (admin) |

### Sécurité

- **jose** : JWT pour sessions admin (`wedding_admin_session`)
- **bcryptjs** : comparaison mot de passe (hash optionnel via env)
- Variables : `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `SESSION_SECRET`

### Persistance

| Couche | Usage |
|--------|--------|
| **Fichiers `data/*.json`** | Développement local |
| **GitHub API** | `data/site-content.json`, `data/rsvps.json` sur branche `master` |
| **Vercel Blob** | Images uploadées + fallback JSON si configuré |
| **Upstash Redis** | Alternative clé/valeur JSON |

Variables production recommandées :

- `GITHUB_TOKEN` + `GITHUB_REPO` + `GITHUB_BRANCH`
- ou `BLOB_READ_WRITE_TOKEN` (Blob store Vercel)
- ou `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`

### Outils & déploiement

- **Git / GitHub** : versionning, déclenchement Vercel
- **Vercel** : hébergement, HTTPS, CDN, serverless functions
- **xlsx** (SheetJS) : génération export Excel
- **@vercel/blob** : stockage fichiers
- **@upstash/redis** : client Redis optionnel

---

## 4. Architecture logicielle

```
sheila-loic-wedding/
├── app/
│   ├── page.tsx              # Page d'accueil (dynamic)
│   ├── layout.tsx            # Layout global, polices
│   ├── admin/                # Login + dashboard
│   └── api/                  # Routes REST
├── components/
│   ├── site/                 # UI publique
│   └── admin/                # Dashboard, galerie, monitoring RSVP
├── lib/
│   ├── default-content.ts    # Contenu par défaut
│   ├── content-storage.ts    # Abstraction persistance
│   ├── github-storage.ts     # GitHub Contents API
│   ├── auth.ts               # Sessions admin
│   └── upload-image.ts       # Validation + Blob / disque
├── types/site.ts             # Types SiteContent, RSVP, etc.
├── data/                     # JSON versionnés (fallback)
├── middleware.ts             # Protection /admin/dashboard
└── vercel.json               # Région cdg1, env publics GitHub
```

Flux visiteur : **Page** → `getSiteContent()` → `WeddingSite` → sections ancrées `#accueil`, `#evenements`, etc.

Flux admin : **Login** → cookie JWT → **Dashboard** → PUT `/api/content` → stockage cloud.

---

## 5. Fonctionnalités détaillées

### Site public

- **Hero** : image plein écran, titre, sous-titre, dates, CTA RSVP, compte à rebours temps réel
- **Bienvenue** : textes + carrousel photos
- **Événements** : onglets (Civil, Traditionnel, Religieux, Soirée) + détails logistique
- **Logistique** : lieux, dress code, hébergements par tranches de prix (liens Google Maps)
- **Histoire** : biographie + récit long
- **Galerie** : grille masonry
- **Cadeaux** : section placeholder
- **RSVP** : formulaire (nom, email, téléphone, présence, message)
- **Contact** : coordonnées organisateur

### Navigation mobile

- Barre **fixe en bas**, fond vert (`primary`), coins arrondis, ombre
- 7 entrées avec **icônes SVG** : Accueil, Événements, Logistique, **Cœur (Histoire)**, Galerie, RSVP, **Téléphone (Contact)**
- Padding body pour ne pas masquer le contenu (`safe-area-inset-bottom`)

### Console d’administration

- Onglets : Général, Accueil, Bienvenue, Événements, Logistique, Histoire, Galerie, Cadeaux, RSVP, Contact, **Monitoring RSVP**
- **Galerie** : bouton « Ajouter depuis la galerie », aperçu grille, suppression, sauvegarde auto après upload
- **Monitoring** : cartes Total / Présents / Absents (%), tableau, bouton **Télécharger Excel**
- Bandeau si stockage non configuré sur Vercel

---

## 6. Hébergement et exploitation

1. Push sur `master` → build Vercel automatique  
2. Configurer **GITHUB_TOKEN** (scope repo, Contents write) dans les variables Vercel **ou** activer un **Blob store**  
3. Changer `ADMIN_PASSWORD` et `SESSION_SECRET` en production  
4. URL de partage : `https://sheila-loic-wedding.vercel.app`

Identifiants admin par défaut (à modifier) : voir `.env.example`.

---

## 7. Évolutions possibles

- Notification e-mail à chaque RSVP (Resend / SendGrid)
- Multilingue FR / EN
- Domaine personnalisé (ex. mariage-sheila-loic.com)
- Cache ISR avec revalidation après save admin

---

## 8. Contacts & crédits

- **Couple :** Sheila & Loïc — mariage 02 & 03 avril 2027, Douala  
- **Crédit design site :** LeCousinEnQuestion  
- **Organisation :** 237 Wedding Concept  

---

*Document généré pour le projet sheila-loic-wedding — stack Next.js / Vercel / GitHub.*

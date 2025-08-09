# Plateforme de Réseau Social - Projet Final TT4 2025

## Description
Une plateforme de réseau social complète développée avec Angular (frontend) et Node.js/Express (backend), utilisant Sequelize ORM avec SQLite comme base de données. Ce projet implémente toutes les fonctionnalités essentielles d'un réseau social moderne.

## Fonctionnalités

### Authentification et Gestion des Utilisateurs
- **Inscription** : Création de nouveaux comptes utilisateurs
- **Connexion** : Authentification sécurisée avec JWT
- **Gestion de profil** : Mise à jour des informations personnelles
- **Sécurité** : Protection des endpoints avec JWT

### Gestion des Posts
- **Création** : Publication de nouveaux posts avec titre, contenu et image optionnelle
- **Lecture** : Affichage de tous les posts avec informations de l'auteur
- **Modification** : Édition des posts par leurs auteurs
- **Suppression** : Suppression des posts par leurs auteurs

### Système de Commentaires
- **Ajout** : Commentaires sur les posts
- **Affichage** : Liste des commentaires avec auteurs
- **Modification** : Édition des commentaires par leurs auteurs
- **Suppression** : Suppression des commentaires par leurs auteurs

### Système de Likes
- **Posts** : Like/Unlike des posts
- **Commentaires** : Like/Unlike des commentaires
- **Compteurs** : Affichage du nombre de likes
- **Statut** : Vérification si l'utilisateur a liké

## Architecture Technique

### Backend (Node.js/Express)
```
backend/
├── config/
│   └── database.js          # Configuration Sequelize/SQLite
├── controllers/
│   ├── UsersController.js    # Gestion des utilisateurs
│   ├── PostsController.js    # Gestion des posts
│   ├── CommentsController.js # Gestion des commentaires
│   └── LikesController.js    # Gestion des likes
├── models/
│   ├── User.js              # Modèle utilisateur
│   ├── Post.js              # Modèle post
│   ├── Comment.js           # Modèle commentaire
│   ├── Like.js              # Modèle like
│   └── index.js             # Relations entre modèles
├── middleware/
│   └── auth.js              # Middleware JWT
├── routes/
│   └── index.js             # Routes API
├── .env                     # Variables d'environnement
├── package.json             # Dépendances backend
└── server.js                # Point d'entrée serveur
```

### Frontend (Angular)
```
src/app/
├── components/
│   ├── login/               # Composant de connexion
│   ├── register/            # Composant d'inscription
│   └── dashboard/           # Composant principal
├── services/
│   ├── auth.service.ts      # Service d'authentification
│   ├── post.service.ts      # Service des posts
│   ├── comment.service.ts   # Service des commentaires
│   └── like.service.ts      # Service des likes
├── models/
│   ├── user.model.ts        # Interface utilisateur
│   ├── post.model.ts        # Interface post
│   ├── comment.model.ts     # Interface commentaire
│   └── like.model.ts        # Interface like
├── guards/
│   └── auth.guard.ts        # Protection des routes
├── interceptors/
│   └── auth.interceptor.ts  # Intercepteur JWT
└── app.routes.ts            # Configuration des routes
```

## API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion

### Utilisateurs
- `GET /api/users/profile` - Profil utilisateur
- `PUT /api/users/profile` - Mise à jour profil
- `GET /api/users` - Liste des utilisateurs

### Posts
- `POST /api/posts` - Créer un post
- `GET /api/posts` - Lister tous les posts
- `GET /api/posts/:id` - Détails d'un post
- `PUT /api/posts/:id` - Modifier un post
- `DELETE /api/posts/:id` - Supprimer un post
- `GET /api/users/:userId/posts` - Posts d'un utilisateur

### Commentaires
- `POST /api/comments` - Créer un commentaire
- `GET /api/posts/:postId/comments` - Commentaires d'un post
- `GET /api/comments/:id` - Détails d'un commentaire
- `PUT /api/comments/:id` - Modifier un commentaire
- `DELETE /api/comments/:id` - Supprimer un commentaire

### Likes
- `POST /api/posts/:postId/like` - Toggle like post
- `POST /api/comments/:commentId/like` - Toggle like commentaire
- `GET /api/posts/:postId/likes` - Likes d'un post
- `GET /api/comments/:commentId/likes` - Likes d'un commentaire

## Installation et Démarrage

### Prérequis
- Node.js (v16+)
- npm ou yarn
- Angular CLI

### Backend
```bash
cd backend
npm install
npm start
```

Le serveur backend démarre sur http://localhost:3000

### Frontend
```bash
# À la racine du projet Angular
npm install
ng serve
```

L'application frontend démarre sur http://localhost:4200

## Base de Données

### Modèles et Relations
- **User** : Informations utilisateur avec authentification
- **Post** : Publications avec titre, contenu et image
- **Comment** : Commentaires liés aux posts
- **Like** : Likes pour posts et commentaires

### Relations
- User → Posts (1:N)
- User → Comments (1:N)
- User → Likes (1:N)
- Post → Comments (1:N)
- Post → Likes (1:N)
- Comment → Likes (1:N)

## Sécurité
- Authentification JWT
- Hachage des mots de passe avec bcrypt
- Protection CORS
- Validation des données
- Autorisation basée sur la propriété des ressources

## Technologies Utilisées

### Backend
- Node.js
- Express.js
- Sequelize ORM
- SQLite
- JWT (jsonwebtoken)
- bcryptjs
- CORS

### Frontend
- Angular 18+
- TypeScript
- RxJS
- Angular Router
- HTTP Client

## Fonctionnalités Avancées
- Interface utilisateur moderne et responsive
- Gestion d'état réactive avec RxJS
- Intercepteurs HTTP pour l'authentification automatique
- Guards de route pour la protection
- Validation de formulaires
- Gestion d'erreurs complète

## Développement Académique
Ce projet a été développé dans un contexte académique en suivant les meilleures pratiques de développement web moderne. Il démontre une compréhension complète du développement full-stack avec Angular et Node.js.

## Auteur
Projet Final TT4 2025 - Plateforme de Réseau Social

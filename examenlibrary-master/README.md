
# Library App - MERN Stack avec Docker/Podman

## Description

Cette application utilise le stack MERN pour gérer une bibliothèque. L'application se compose d'un **frontend React**, d'une **API Express** et d'une base de données **MongoDB**. Nous avons conteneurisé les trois parties avec **Podman** sans utiliser **docker-compose** initialement, mais nous allons maintenant intégrer **Podman Compose** pour gérer les conteneurs plus facilement.

---

## Prérequis

- **Podman** installé sur votre machine
- **Podman Compose** installé pour gérer les conteneurs
- **Node.js** et **npm** pour le frontend et l'API

---

## Étapes pour construire et lancer les conteneurs

### 1. Construire les images

#### Frontend
Depuis le répertoire `frontend` :

```bash
podman build -t frontend-image .
```

#### Backend
Depuis le répertoire `backend` :

```bash
podman build -t backend-image .
```

#### MongoDB
Nous utiliserons **MongoDB** depuis l'image officielle de MongoDB dans Podman.

```bash
podman pull mongo:latest
```

### 2. Créer un volume pour la base de données

```bash
podman volume create mongodb-data
```

### 3. Lancer les conteneurs

Nous allons configurer un réseau pour que les conteneurs puissent communiquer entre eux.

```bash
podman network create mern-network
```

#### Lancer le conteneur MongoDB

```bash
podman run -d --name mongo --net mern-network -v mongodb-data:/data/db mongo:latest
```

#### Lancer le conteneur Backend (API)

```bash
podman run -d --name backend --net mern-network -p 5000:5000 backend-image
```

#### Lancer le conteneur Frontend

```bash
podman run -d --name frontend --net mern-network -p 3000:3000 frontend-image
```

### 4. Vérifier le bon fonctionnement

Une fois les trois conteneurs en cours d'exécution, vous pouvez :

- Accéder à l'**API backend** via `http://localhost:5000`
- Accéder au **frontend** via `http://localhost:3000`

---

## Changements à effectuer dans le code

1. **Frontend - URL API** :
   - Modifiez l'URL de l'API dans le frontend pour qu'il utilise le nom du conteneur backend dans le réseau Docker, au lieu de `localhost` :
   ```ts
   const BACKEND_URL = 'http://backend:5000/api/books';
   ```

2. **Backend - Connexion MongoDB** :
   - Dans votre backend, assurez-vous que l'URL de la base de données MongoDB utilise `mongo:27017` comme hostname :
   ```js
   mongoose.connect('mongodb://mongo:27017/library', { useNewUrlParser: true, useUnifiedTopology: true });
   ```

---

## Commandes Podman Compose (si vous souhaitez automatiser avec `podman-compose`)

Si vous préférez utiliser **Podman Compose** pour automatiser la gestion des conteneurs, créez un fichier `podman-compose.yml` :

```yaml
version: '3'
services:
  frontend:
    build:
      context: ./frontend
    ports:
      - "3000:3000"
    networks:
      - mern-network

  backend:
    build:
      context: ./backend
    ports:
      - "5000:5000"
    networks:
      - mern-network
    depends_on:
      - mongo

  mongo:
    image: mongo:latest
    volumes:
      - mongodb-data:/data/db
    networks:
      - mern-network

networks:
  mern-network:
    driver: bridge

volumes:
  mongodb-data:
```

Ensuite, pour démarrer les conteneurs :

```bash
podman-compose up --build
```

---

## Arrêter les conteneurs

Pour arrêter tous les conteneurs :

```bash
podman-compose down
```

---

Avec cette mise à jour, tu peux maintenant utiliser **Podman Compose** pour lancer l'application. Cela te permet de gérer facilement le cycle de vie des conteneurs sans avoir besoin d'écrire chaque commande individuellement.

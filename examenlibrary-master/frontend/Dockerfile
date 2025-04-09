# Utiliser l'image officielle Node.js comme image parente
FROM node:16

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application
COPY . .

# Exposer le port sur lequel le frontend sera accessible
EXPOSE 5173

# Lancer Vite en mode développement
CMD ["npm", "run", "dev"]

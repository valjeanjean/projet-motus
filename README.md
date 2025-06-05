# Projet MOTUS - Master La Plateforme

# Principes de jeu :

Motus est un jeu de devinettes dans lequel le joueur doit retrouver un mot mystère. À chaque tentative, il reçoit des indices sur la position et la présence des lettres, à la manière du jeu télévisé du même nom. Si une case apparait rouge, vous avez trouvé la bonne lettre à la bonne case. Lorsqu'elle apparait jaune, c'est que la lettre n'est pas à la bonne case mais est tout de même présente dans le mot. Système de partie unique avec un gain de 10 points par victoire. Un classement des 10 premiers joueurs est proposé sur la page Hall of Fame.

# Stack

Ce projet repose sur la stack suivante : Next.js pour le frontend et les routes API, MySQL pour la base de données, et JWT pour la gestion de l’authentification. L'API utilisée pour la génération de mot : https://trouve-mot.fr

# Getting Started

⚠️ Ce projet est configuré sans .env. Toutes les informations de connexion (MySQL, JWT, etc.) sont intentionnellement incluses dans le code pour simplifier les tests en local.

Cloner le repo :

```bash
git clone https://github.com/valjeanjean/projet-motus.git
```

Naviguez dans le dossier adequat :

```bash
cd projet-motus
```

Puis, lancez cette commande pour installer toutes les dépendances :

```bash
npm install
```

# 🐳 Docker Compose

Services inclus :

   - 🐬 MySQL 8

   - 🧾 Adminer

    [⚠️] Assurez-vous que Docker est bien installé et lancé sur votre machine.

Avant de lancer le container, il faut être sûr que Docker n'ait pas de container lancé :

```bash
sudo docker compose down -v
```

Puis vérifier que Docker ne soit pas utilisé pour d'autres container :

```bash
sudo docker ps
```


Pour initialiser le container, dans votre terminal exécutez la commande suivante (Le programme sera exécuté en tâche de fond) :

```bash
docker compose up -d
```

Ensuite, lancez le serveur de développement :

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Ouvrez http://localhost:3000 avec votre navigateur.
# Il ne reste plus qu'à jouer !


# Movie Rating 🎞️⭐

## Présentation

Dans le cadre du module Web Applications Architectures, un projet de fin de module, dont le sujet a été laissé libre aux étudiants, a été mis en place.

En ce concerne notre projet. Nous avons choisi de concevoir un site de notation de films à mi chemin entre Imdb et Letterboxd.

### Fonctionnalités

- Navigation entre les différents films
- Visualiser les films les mieux notés
- Rechercher un film
- Des fiches individuelles pour les acteurs, réalisateurs ainsi que leurs films.
- *Commenter un film / noter un film*

## Stack utilisé

### Backend

#### Ingestion des données sql au sein de l'application et définitions des fonctionnalités backend / api

![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?logo=springboot&logoColor=white) 

#### API UI

![Swagger](https://img.shields.io/badge/Swagger-85EA2D?logo=swagger&logoColor=black) 

#### Base de données

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)

#### Serveur pages statiques / Reverse proxy

![Nginx](https://img.shields.io/badge/Nginx-009639?logo=nginx&logoColor=white)

### Frontend

![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)

#### Framework utilisé pour React :

![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)

### Containerization

![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)



Afin que l'ensemble des composants de l'application se lancent en même temps, il a été décidé d'utiliser Docker afin de créer un conteneur associé à chaque élément de l'application (la base de données, le backend et le frontend). 

## Comment mettre en route le projet

Lancer le projet

```sh
docker compose up
```

Vérifier le statut coté api
```sh
curl -s http://localhost:8080/api/v2/health | jq -r '.status'
```

Connexion à l'API

http://localhost:8080/swagger-ui/index.html

Lien de la page frontend :

http://localhost:5173/



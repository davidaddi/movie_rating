# Movie Rating 🎞️⭐

## Présentation

Dans le cadre du module Web Applications Architectures, un projet de fin de module, dont le sujet a été laissé libre aux étudiants, a été mis en place.

En ce concerne notre projet. Nous avons choisi de concevoir un site de notation de films à mi chemin entre Imdb et Letterboxd.

En ce qui concerne les fonctionnalités principales de site conçu. Nous avons la navigation entre les différents films, Des fiches individuelles pour les acteurs ainsi que les réalisateurs ainsi que leurs films.

## Stack utilisé

Backend : 
- Springboot (Ingestion des données sql au sein de l'API)

Frontend :
- React (Vite)

Base de données :
- Postgre

Conteneurisation :
- Docker

Afin que l'ensemble des composants de l'application se lancent en même temps, il a été décidé d'utiliser Docker afin de créer un conteneur associé à chaque élément de l'application (la base de données, le backend et le frontend). 

## Comment mettre en route le projet

```sh
docker compose up --build
```

Vérifier le statut coté back
```sh
curl -s http://localhost:8080/actuator/health | jq -r '.status'
```

Lien de la page frontend :

http://localhost:5173/



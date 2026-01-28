-- Drop tables if they exist (in reverse order of dependencies)
DROP TABLE IF EXISTS Rating CASCADE;
DROP TABLE IF EXISTS ActorParticipation CASCADE;
DROP TABLE IF EXISTS Movie CASCADE;
DROP TABLE IF EXISTS Director CASCADE;
DROP TABLE IF EXISTS Actor CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;

CREATE TABLE Actor (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    birthdate DATE
);

CREATE TABLE Director (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    birthdate DATE
);

CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Movie (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    release_date DATE,
    image_url VARCHAR(512),
    director_id INT NOT NULL,

    CONSTRAINT fk_movie_director
        FOREIGN KEY (director_id)
        REFERENCES Director(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE ActorParticipation (
    id SERIAL PRIMARY KEY,
    name_in_movie VARCHAR(255),
    wage FLOAT,
    movie_id INT NOT NULL,
    actor_id INT NOT NULL,

    CONSTRAINT fk_participation_movie
        FOREIGN KEY (movie_id)
        REFERENCES Movie(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_participation_actor
        FOREIGN KEY (actor_id)
        REFERENCES Actor(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Rating (
    id SERIAL PRIMARY KEY,
    rating FLOAT NOT NULL CHECK (rating >= 0 AND rating <= 10),
    movie_id INT NOT NULL,
    user_id INT NOT NULL,

    CONSTRAINT fk_rating_movie
        FOREIGN KEY (movie_id)
        REFERENCES Movie(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_rating_user
        FOREIGN KEY (user_id)
        REFERENCES "User"(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

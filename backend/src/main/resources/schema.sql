
CREATE TABLE IF NOT EXISTS Actor (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    birthdate DATE
);

CREATE TABLE IF NOT EXISTS Director (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    birthdate DATE
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Movie (
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

CREATE TABLE IF NOT EXISTS ActorParticipation (
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

CREATE TABLE IF NOT EXISTS Rating (
    id SERIAL PRIMARY KEY,
    rating FLOAT NOT NULL CHECK (rating >= 0 AND rating <= 5),
    comment TEXT,
    movie_id INT NOT NULL,
    user_id INT NOT NULL,

    CONSTRAINT fk_rating_movie
        FOREIGN KEY (movie_id)
        REFERENCES Movie(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_rating_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT unique_user_movie_rating
        UNIQUE (movie_id, user_id)
);

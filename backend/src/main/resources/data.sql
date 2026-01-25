INSERT INTO Director (firstname, lastname, birthdate) VALUES
('Christopher', 'Nolan', '1970-07-30'),
('Quentin', 'Tarantino', '1963-03-27'),
('Martin', 'Scorsese', '1942-11-17'),
('Steven', 'Spielberg', '1946-12-18'),
('Francis Ford', 'Coppola', '1939-04-07');

INSERT INTO Actor (firstname, lastname, birthdate) VALUES
('Leonardo', 'DiCaprio', '1974-11-11'),
('Robert', 'De Niro', '1943-08-17'),
('Al', 'Pacino', '1940-04-25'),
('Tom', 'Hanks', '1956-07-09'),
('Christian', 'Bale', '1974-01-30'),
('Morgan', 'Freeman', '1937-06-01'),
('Samuel L.', 'Jackson', '1948-12-21'),
('Brad', 'Pitt', '1963-12-18'),
('Margot', 'Robbie', '1990-07-02'),
('Scarlett', 'Johansson', '1984-11-22');

INSERT INTO Movie (name, description, release_date, image_url, director_id) VALUES
('Inception', 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', '2010-07-16', 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg', 1),
('The Dark Knight', 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', '2008-07-18', 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', 1),
('Pulp Fiction', 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.', '1994-10-14', 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg', 2),
('The Shawshank Redemption', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', '1994-09-23', 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg', 3),
('The Godfather', 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', '1972-03-24', 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg', 5);

INSERT INTO "User" (username, password) VALUES
('john_doe', 'password123'),
('jane_smith', 'securepass456'),
('movie_lover', 'cinema2024');

INSERT INTO ActorParticipation (name_in_movie, wage, movie_id, actor_id) VALUES
('Dom Cobb', 20000000, 1, 1),
('Arthur', 5000000, 1, 5),
('Bruce Wayne / Batman', 15000000, 2, 5),
('Joker', 10000000, 2, 6),
('Vincent Vega', 8000000, 3, 7),
('Jules Winnfield', 7000000, 3, 7),
('Andy Dufresne', 12000000, 4, 4),
('Ellis Boyd Redding', 9000000, 4, 6),
('Michael Corleone', 3500000, 5, 3);

INSERT INTO Rating (rating, movie_id, user_id) VALUES
(9.5, 1, 1),
(9.0, 1, 2),
(9.8, 2, 1),
(8.5, 2, 3),
(9.3, 3, 2),
(9.9, 4, 1),
(9.7, 4, 2),
(9.5, 4, 3),
(10.0, 5, 1),
(9.8, 5, 2);

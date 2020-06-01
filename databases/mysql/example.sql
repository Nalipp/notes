CREATE TABLE cats
(
  cat_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  age INT
);

INSERT INTO cats(name, age)
VALUES ('clyde', 2), 
       ('fe fe', 4),
       ('morris', 3),
       ('mazzy', 5);



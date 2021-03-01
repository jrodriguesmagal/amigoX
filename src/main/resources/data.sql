DROP TABLE IF EXISTS billionaires;
DROP TABLE IF EXISTS people;

CREATE TABLE people (
                              id INT AUTO_INCREMENT  PRIMARY KEY,
                              first_name VARCHAR(250) NOT NULL,
                              last_name VARCHAR(250) NOT NULL

);

INSERT INTO people (first_name, last_name) VALUES
('Aliko', 'Dangote'),
('Bill', 'Gates');

CREATE TABLE koalas_list (
    "id" serial PRIMARY KEY,
    "name" varchar(20) NOT NULL,
    "gender" char NOT NULL,
    "age" integer NOT NULL,
    "ready_to_transfer" boolean NOT NULL,
    "notes" varchar(255),
);

INSERT INTO koalas_list ("name", "gender", "age", "ready_to_transfer", "notes")
VALUES 
('Scotty', 'M', 4, TRUE, 'Born in Guatemala'),
('Jean', 'F', 5, TRUE, 'Allergic to lots of lava'),
('Ororo', 'F', 7, FALSE, 'Loves listening to Paula (Abdul)'),
('Logan', 'M', 15, FALSE, 'Loves the sauna'),
('Charlie', 'M', 9, TRUE, 'Favorite band is Nirvana'),
('Betsy', 'F', 4, TRUE, 'Has a pet iguana');



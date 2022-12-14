\?
\l
CREATE DATEBASE database_name;
\c database_name // connect

CREATE TABLE products (
    id INT,
    name VARCHAR(50),
    price INT,
    on_sale boolean
);

\d // show all tables
\d table_name

ALTER TABLE products ADD COLUMN featured boolean;
ALTER TABLE products DROP COLUMN featured;
DROP TABLE products;
DROP DATABASE practice;


CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL check(price_range >= 1 and price_range <= 5)
);


INSERT INTO restaurants (id, name, location, price_range) VALUES (123, 'McDonalds', 'NY', 10);


CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    rid BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    rating INT NOT NULL check(rating >= 1 and rating <= 5),
    review text NOT NULL
);

SELECT * FROM reviews INNER JOIN restaurants ON reviews.rid = restaurants.id;
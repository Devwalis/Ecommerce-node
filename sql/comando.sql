CREATE DATABASE nodeecomerce;

USE simple_ecommerce;
CREATE TABLE users(
    id INT AUTO_INCREMENT, PRYMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
CREATE TABLE products(
    id INT AUTO_INCREMENT, PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
);

INSERT INTO products(name, description, price, stock)
VALUES
        ('Product 1', 'This is product 1', 10.99, 100),
        ('Product 2', 'This is product 2', 9.99, 50),
        ('Product 3', 'This is product 3', 12.99, 200);

-- DROP DB bamazon if exists
DROP DATABASE IF EXISTS bamazon;
-- CREATE DB called bamazon
CREATE DATABASE bamazon;
-- USE bamazon
USE bamazon;

-- CREATE TABLE inside of DB called products w/ fields:
CREATE TABLE products(
  item_id INT(5) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  product_sales DECIMAL(8,2) DEFAULT '0.00' NULL,
  PRIMARY KEY (item_id)
);

-- Seed database with 10 different products
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Echo Dot", "Eletronics", 29.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("FireStic", "Eletronics", 24.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPad Pro", "Eletronics", 275.99, 180);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Samsung8", "Computers", 999.99, 70);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Macbook9","Computers", 2249.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Thinkpad", "Computers", 699.99, 55);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhoneXS", "cellphone", 999.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhoneXR","cellphone", 799.99, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Samsung2", "cellphone", 699.99, 270);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Roomba X", "appliances", 478.99, 880);

-- Select table
SELECT * FROM bamazon.products
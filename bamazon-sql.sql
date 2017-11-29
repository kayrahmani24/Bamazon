DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;
use bamazon;
CREATE TABLE products(
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(45) NOT NULL,
department_name VARCHAR(45) ,
price DECIMAL(10,2) ,
stock_quantity INT,
PRIMARY KEY (item_id)
);

INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES ("Chapstick","Cosmetics",2.65,100);
INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES ("Laptop","Technology",300,50);
INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES ("Winter Coat","Clothing",60,75);
INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES ("Computer Mouse","Technology",15.25,100);
INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES ("Timberland Boots","Shoes",220,25);
INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES ("Adidas Superstar's","Shoes",69.99,20);
INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES ("Flannel","Clothing",30,40);
INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES ("Hair Gel","Cosemetics",9.75,30);
INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES ("Cell phone","Technology",175,300);
INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES ("Socks","Clothing",12.99,20);
INSERT INTO products(product_name,department_name,price,stock_quantity) VALUES ("Shampoo","Cosmetics",7.85,15);
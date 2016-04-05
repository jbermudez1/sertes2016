CREATE DATABASE IF NOT EXISTS sertes;

USE sertes;

CREATE TABLE IF NOT EXISTS categories(
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_id INT UNSIGNED,
  subcategory1_id INT UNSIGNED,
  subcategory2_id INT UNSIGNED,
  title VARCHAR(100),
  subtitle TEXT,
  description TEXT,
  gas ENUM('gasoline', 'gas', 'diesel', 'none'),
  image MEDIUMTEXT,
  details MEDIUMTEXT
);

ALTER TABLE products ADD CONSTRAINT fk_product_category
FOREIGN KEY (category_id) REFERENCES categories(id);

ALTER TABLE products ADD CONSTRAINT fk_product_subcategory1
FOREIGN KEY (subcategory1_id) REFERENCES categories(id);

ALTER TABLE products ADD CONSTRAINT fk_product_subcategory2
FOREIGN KEY (subcategory2_id) REFERENCES categories(id);

CREATE DATABASE IF NOT EXISTS visitor_management
USE visitor_management

DROP TABLE IF EXISTS acc_types;
CREATE TABLE acc_types (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name CHAR(12) NOT NULL UNIQUE
);
INSERT INTO acc_types (name) VALUES
('admin'),
('agent'),
('contractor'),
('delivery'),
('security'),
('developer'),
('tenant'),
('visitor');

DROP TABLE IF EXISTS accounts;
CREATE TABLE accounts (
    type_id INT NOT NULL REFERENCES acc_types(id),
    email CHAR(50) NOT NULL,
    password CHAR(50) NOT NULL,
    PRIMARY KEY (type_id, email)
);

DROP TABLE IF EXISTS visitors;
CREATE TABLE visitors (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone CHAR(15) NOT NULL UNIQUE
);

DROP TABLE IF EXISTS deliveries;
CREATE TABLE deliveries (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone CHAR(15) NOT NULL UNIQUE,
	email CHAR(50) NOT NULL UNIQUE,
    license_id CHAR(30) NOT NULL UNIQUE,
    company_id INT NOT NULL REFERENCES companies(id)
--    register_date DATETIME NOT NULL
);

DROP TABLE IF EXISTS companies;
CREATE TABLE companies (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
    hot_line CHAR(15) NOT NULL UNIQUE
);

DROP TABLE IF EXISTS vehicles;
CREATE TABLE vehicles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    number VARCHAR(10) NOT NULL NOT NULL,
    color VARCHAR(15) NOT NULL,
    type VARCHAR(30) NOT NULL
);

DROP TABLE IF EXISTS visits;
CREATE TABLE visits (
    visitor_id INT NOT NULL PRIMARY KEY REFERENCES visitors(id),
    enter_datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    exit_datetime DATETIME NOT NULL,
    unit CHAR(7) NOT NULL,
    vehicle_id INT REFERENCES vehicles(id)
);
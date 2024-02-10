CREATE DATABASE IF NOT EXISTS visitor_management;

USE visitor_management;

DROP TABLE IF EXISTS acc_types;

CREATE TABLE
  acc_types (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name CHAR(15) NOT NULL UNIQUE
  );

INSERT INTO
  acc_types (name)
VALUES
  ('admin'),
  ('agent'),
  ('contractor'),
  ('delivery'),
  ('security'),
  ('developer'),
  ('tenant'),
  ('visitor');

DROP TABLE IF EXISTS accounts;

CREATE TABLE
  accounts (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type_id INT NOT NULL REFERENCES acc_types (id),
    email CHAR(50) NOT NULL,
    password CHAR(50) NOT NULL,
    name VARCHAR(50),
    phone CHAR(12),
    register_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

DROP TABLE IF EXISTS accounts_extra;

CREATE TABLE
  accounts_extra (
    acc_id INT NOT NULL PRIMARY KEY REFERENCES accounts (id),
    license_id INT NOT NULL,
    vehicle_plate CHAR(10) NOT NULL,
    company_name VARCHAR(50) NOT NULL REFERENCES companies (id)
  );

DROP TABLE IF EXISTS visits;

CREATE TABLE
  visits (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    acc_id INT NOT NULL REFERENCES accounts (id),
    enter_datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    exit_datetime DATETIME,
    unit CHAR(7) NOT NULL
  );

DROP TABLE IF EXISTS announcements;

CREATE TABLE
  announcements (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
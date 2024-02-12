CREATE DATABASE IF NOT EXISTS visitor_management;

USE visitor_management;

DROP TABLE IF EXISTS acc_types;

CREATE TABLE
  IF NOT EXISTS acc_types (
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
  IF NOT EXISTS accounts (
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
  IF NOT EXISTS accounts_extra (
    acc_id INT NOT NULL PRIMARY KEY REFERENCES accounts (id),
    license_id INT NOT NULL,
    vehicle_plate CHAR(10) NOT NULL,
    company_name VARCHAR(50) NOT NULL REFERENCES companies (id)
  );

DROP TABLE IF EXISTS announcements;

CREATE TABLE
  IF NOT EXISTS announcements (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

DROP TABLE IF EXISTS maintenances;

CREATE TABLE
  IF NOT EXISTS maintenances (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    type CHAR(10) NOT NULL,
    assigned_to INT REFERENCES accounts (id),
    maintenance_datetime DATETIME NOT NULL
  );

DROP TABLE IF EXISTS maintenance_reports;

CREATE TABLE
  IF NOT EXISTS maintenance_reports (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    maintenance_id INT NOT NULL REFERENCES maintenances (id),
    description TEXT NOT NULL,
    resolved TINYINT (1) NOT NULL,
    approved TINYINT (1) NOT NULL DEFAULT 0,
    submitted_by INT NOT NULL REFERENCES accounts (id),
    submission_date DATE NOT NULL
  );

DROP TABLE IF EXISTS reports;

CREATE TABLE
  IF NOT EXISTS reports (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    type CHAR(20) NOT NULL,
    description TEXT NOT NULL
  );

DROP TABLE IF EXISTS visits;

CREATE TABLE
  IF NOT EXISTS visits (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    acc_id INT NOT NULL REFERENCES accounts (id),
    enter_datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    exit_datetime DATETIME,
    unit CHAR(7) NOT NULL
  );

DROP TABLE IF EXISTS qr_codes;

CREATE TABLE
  IF NOT EXISTS qr_codes (
    acc_id INT NOT NULL UNIQUE PRIMARY KEY REFERENCES accounts (id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

SET
  GLOBAL event_scheduler = ON;

DROP EVENT IF EXISTS delete_expired_qr_codes;

CREATE EVENT IF NOT EXISTS delete_expired_qr_codes ON SCHEDULE EVERY 1 MINUTE DO
DELETE FROM qr_codes
WHERE
  created_at < NOW () - INTERVAL 5 MINUTE;
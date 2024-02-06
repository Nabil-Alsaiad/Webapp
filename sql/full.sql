DROP TABLE accounts;
CREATE TABLE accounts (
	email CHAR(50) NOT NULL UNIQUE PRIMARY KEY,
	password CHAR(50) NOT NULL
);
INSERT INTO accounts (email, password) VALUES
('one@email.com', '601234567890'),
('two@email.com', '601998877661'),
('three@email.com', '601112233442'),
('four@email.com', '601456789013'),
('five@email.com', '601234567804');
SELECT * FROM accounts;

DROP TABLE visitors;
CREATE TABLE visitors (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone CHAR(15) NOT NULL UNIQUE
);
INSERT INTO visitors (name, phone) VALUES
('Ahmad Ali', '601234567890'),
('Norah Tan', '601998877661'),
('Ravi Kumar', '601112233442'),
('Siti Aishah', '601456789013'),
('David Lim', '601234567804');
SELECT * FROM visitors;

DROP TABLE deliveries;
CREATE TABLE deliveries (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone CHAR(15) NOT NULL UNIQUE,
	email CHAR(50) NOT NULL UNIQUE,
    license_id CHAR(30) NOT NULL UNIQUE,
    company_id INT NOT NULL REFERENCES companies(id)
--    register_date DATETIME NOT NULL
);
INSERT INTO deliveries (name, phone, email, license_id, company_id) VALUES
('Ahmad Ali', '601234567890', 'one@gmail.com', '981122334455', 1),
('Norah Tan', '601998877661', 'two@gmail.com', '990011223344', 2),
('Ravi Kumar', '601112233442', 'three@gmail.com', '971234567890', 3),
('Siti Aishah', '601456789013', 'four@gmail.com', '961234567891', 4),
('David Lim', '601234567804', 'five@gmail.com', '950987654321', 5);
SELECT * FROM deliveries;

DROP TABLE companies;
CREATE TABLE companies (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
    hot_line CHAR(15) NOT NULL UNIQUE
);
INSERT INTO companies (name, hot_line) VALUES
('ABC Corporation', '60123456788'),
('XYZ Industries', '60199887676'),
('LMN Ltd', '60111223341'),
('PQR Group', '60145678900'),
('Tech Solutions', '6012348888');
SELECT * FROM companies;

DROP TABLE vehicles;
CREATE TABLE vehicles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    number VARCHAR(10) NOT NULL NOT NULL,
    color VARCHAR(15) NOT NULL,
    type VARCHAR(30) NOT NULL
);
INSERT INTO vehicles (number, color, type) VALUES
('ABC123', 'Red', 'Car'),
('XYZ456', 'Blue', 'Motorcycle'),
('LMN789', 'Green', 'Truck'),
('PQR012', 'Black', 'SUV'),
('TUV345', 'White', 'Van');
SELECT * FROM vehicles;

DROP TABLE visits;
CREATE TABLE visits (
    visitor_id INT NOT NULL PRIMARY KEY REFERENCES visitors(id),
    enter_datetime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    exit_datetime DATETIME NOT NULL,
    unit CHAR(7) NOT NULL,
    vehicle_id INT REFERENCES vehicles(id)
);
INSERT INTO visits (visitor_id, exit_datetime, unit, vehicle_id) VALUES
(1, '2024-01-13 10:00:00', 'A-07-01', 1),
(2, '2024-01-13 11:30:00', 'B-11-10', NULL),
(3, '2024-01-13 12:45:00', 'C-09-08', NULL),
(4, '2024-01-13 14:15:00', 'D-15-08', 4),
(5, '2024-01-13 15:30:00', 'E-14-02', NULL);
SELECT * FROM visits;

-- get the names of all people who has visited between a two given time frames
SELECT v.name 
FROM visitors v 
JOIN visits s ON v.id = s.visitor_id
-- in JS, replace  the times with variables
WHERE s.enter_datetime BETWEEN '2023-01-01 00:00:00' AND '2023-01-31 23:59:59';

-- get all the vehicles of who has visited between a two given time frames
SELECT DISTINCT v.*
FROM visits s 
JOIN vehicles v ON s.vehicle_id = v.id
WHERE s.enter_datetime BETWEEN '2023-01-01 00:00:00' AND '2023-01-31 23:59:59';

-- get the data of all the vehicles a person has visited using
SELECT v.*
FROM visitors vis
JOIN visits s ON vis.id = s.visitor_id
JOIN vehicles v ON s.vehicle_id = v.id
WHERE vis.name = 'John Doe';
--- Insert dummy data into the tables

INSERT INTO accounts (type_id, email, password) VALUES
(1, 'one@email.com', '601234567890'),
(2, 'one@email.com', '601998877661'),
(3, 'one@email.com', '601112233442'),
(4, 'four@email.com', '601456789013'),
(5, 'five@email.com', '601234567804');

INSERT INTO visitors (name, phone) VALUES
('Ahmad Ali', '601234567890'),
('Norah Tan', '601998877661'),
('Ravi Kumar', '601112233442'),
('Siti Aishah', '601456789013'),
('David Lim', '601234567804');

INSERT INTO deliveries (name, phone, email, license_id, company_id) VALUES
('Ahmad Ali', '601234567890', 'one@gmail.com', '981122334455', 1),
('Norah Tan', '601998877661', 'two@gmail.com', '990011223344', 2),
('Ravi Kumar', '601112233442', 'three@gmail.com', '971234567890', 3),
('Siti Aishah', '601456789013', 'four@gmail.com', '961234567891', 4),
('David Lim', '601234567804', 'five@gmail.com', '950987654321', 5);

INSERT INTO companies (name, hot_line) VALUES
('ABC Corporation', '60123456788'),
('XYZ Industries', '60199887676'),
('LMN Ltd', '60111223341'),
('PQR Group', '60145678900'),
('Tech Solutions', '6012348888');

INSERT INTO vehicles (number, color, type) VALUES
('ABC123', 'Red', 'Car'),
('XYZ456', 'Blue', 'Motorcycle'),
('LMN789', 'Green', 'Truck'),
('PQR012', 'Black', 'SUV'),
('TUV345', 'White', 'Van');

INSERT INTO visits (visitor_id, exit_datetime, unit, vehicle_id) VALUES
(1, '2024-01-13 10:00:00', 'A-07-01', 1),
(2, '2024-01-13 11:30:00', 'B-11-10', NULL),
(3, '2024-01-13 12:45:00', 'C-09-08', NULL),
(4, '2024-01-13 14:15:00', 'D-15-08', 4),
(5, '2024-01-13 15:30:00', 'E-14-02', NULL);
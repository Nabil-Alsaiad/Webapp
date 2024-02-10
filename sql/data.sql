--- Insert dummy data into the tables
INSERT INTO
  accounts (type_id, email, password, name, phone)
VALUES
  (
    1,
    'yes@test.pro',
    '1234',
    'Yes Bro',
    '+60123456789'
  );

INSERT INTO
  accounts (type_id, email, password)
VALUES
  (2, 'one@email.com', '1234'),
  (4, 'four@email.com', '1234'),
  (5, 'five@email.com', '1234');

INSERT INTO
  accounts_extra (acc_id, license_id, vehicle_plate, company_name)
VALUES
  (1, '981122334455', '1234ABC', 'ABC Corporation'),
  (2, '961234567891', '1234ABC', 'PQR Group'),
  (3, '950987654321', '1234ABC', 'Tech Solutions');

INSERT INTO
  visits (acc_id, exit_datetime, unit)
VALUES
  (1, '2024-01-13 10:00:00', 'A-07-01'),
  (2, '2024-01-13 11:30:00', 'B-11-10'),
  (3, '2024-01-13 12:45:00', 'C-09-08'),
  (4, '2024-01-13 14:15:00', 'D-15-08'),
  (5, '2024-01-13 15:30:00', 'E-14-02');

CREATE TABLE
  announcements (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

INSERT INTO
  announcements (title, description)
VALUES
  (
    'Maintenance Work',
    'We are going to perform maintenance work on 2nd January 2024. Please make sure to park your vehicle in the designated area.'
  ),
  (
    'Security Alert',
    'We have received reports of suspicious activities in the area. Please be cautious and report any suspicious activities to the security.'
  );
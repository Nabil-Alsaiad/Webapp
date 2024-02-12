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

INSERT INTO
  maintenances (title, type, assigned_to, maintenance_datetime)
VALUES
  ('something', 'facility', 1, '2023-03-15 14:30:00'),
  ('something', 'webapp', 2, '2023-03-16 15:45:00');

INSERT INTO
  maintenance_reports (
    maintenance_id,
    description,
    resolved,
    submitted_by,
    submission_date
  )
VALUES
  (1, 'Dummy description 1', 1, 1, '2024-01-01'),
  (2, 'Dummy description 2', 0, 2, '2024-01-02');

INSERT INTO
  reports (title, type, description)
VALUES
  ('Report 1', 'facility', 'Description 1'),
  ('Report 2', 'webapp', 'Description 2'),
  ('Report 3', 'other', 'Description 3');
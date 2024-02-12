--- Insert dummy data into the tables
INSERT INTO
  accounts (type_id, email, password)
VALUES
  (
    1,
    'admin@gmail.com',
    '1234',
    'Khairi Shazwan Bin Dollmat',
    '+60123456789'
  ),
  (2, 'agent@gmail.com', '1234'),
  (3, 'contractor@gmail.com', '1234'),
  (4, 'delivery@gmail.com', '1234'),
  (5, 'security@gmail.com', '1234'),
  (6, 'developer@gmail.com', '1234'),
  (7, 'tenant@gmail.com', '1234'),
  (8, 'visitor@gmail.com', '1234');

INSERT INTO
  accounts_extra (acc_id, license_id, vehicle_plate, company_name)
VALUES
  (4, '981122334455', '1234ABC', 'ABC Corporation');

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
  ),
  (
    'Parking Lot Renovation',
    'The parking lot will be renovated from 15th to 20th March 2024. Please use the temporary parking area during this period.'
  ),
  (
    'New Security Measures',
    'New security measures will be implemented from 1st April 2024. Please check your email for more details.'
  ),
  (
    'Community Event',
    'A community event will be held on 30th April 2024. We hope to see you there!'
  ),
  (
    'Elevator Maintenance',
    'The elevator will be under maintenance on 5th May 2024. Please use the stairs during this time.'
  ),
  (
    'Power Outage',
    'There will be a scheduled power outage on 10th June 2024 for electrical maintenance. Please plan accordingly.'
  );

INSERT INTO
  maintenances (title, type, assigned_to, maintenance_datetime)
VALUES
  ('something', 'facility', 3, '2023-03-15 14:30:00'),
  ('something', 'webapp', 6, '2023-03-16 15:45:00'),
  (
    'Elevator Repair',
    'facility',
    3,
    '2023-04-01 09:00:00'
  ),
  (
    'Website Update',
    'webapp',
    6,
    '2023-04-02 22:00:00'
  ),
  (
    'Air Conditioning Service',
    'facility',
    3,
    '2023-04-03 14:00:00'
  ),
  (
    'Database Backup',
    'webapp',
    6,
    '2023-04-04 03:00:00'
  ),
  (
    'Fire System Inspection',
    'facility',
    3,
    '2023-04-05 10:00:00'
  ),
  (
    'Server Maintenance',
    'webapp',
    6,
    '2023-04-06 01:00:00'
  );

INSERT INTO
  maintenance_reports (
    maintenance_id,
    description,
    resolved,
    submitted_by,
    submission_date
  )
VALUES
  (
    1,
    'Elevator repair completed successfully. All functions are working as expected',
    1,
    3,
    '2024-01-01'
  ),
  (
    2,
    'Website update is still in progress. Encountered some issues with the new features',
    0,
    6,
    '2024-01-02'
  ),
  (
    3,
    'Elevator repair completed successfully. All functions are working as expected',
    1,
    3,
    '2024-01-01'
  ),
  (
    4,
    'Website update is still in progress. Encountered some issues with the new features',
    0,
    6,
    '2024-01-02'
  );

INSERT INTO
  reports (title, type, description)
VALUES
  (
    'Elevator Malfunction',
    'facility',
    'The elevator in building A is not working. It stops between floors.'
  ),
  (
    'Website Downtime',
    'webapp',
    'The company website was down for two hours on 15th March 2024. The issue was related to server overload.'
  ),
  (
    'Office Break-In',
    'other',
    'There was a break-in at the office on 16th March 2024. No valuable items were reported missing.'
  );

INSERT INTO
  visits (acc_id, exit_datetime, unit)
VALUES
  (1, '2024-01-13 10:00:00', 'A-07-01'),
  (2, '2024-01-13 11:30:00', 'B-11-10'),
  (3, '2024-01-13 12:45:00', 'C-09-08'),
  (4, '2024-01-13 14:15:00', 'D-15-08'),
  (5, '2024-01-13 15:30:00', 'E-14-02');
-- get the names of all people who has visited between a two given time frames
SELECT
  v.name
FROM
  visitors v
  JOIN visits s ON v.id = s.visitor_id
  -- in JS, replace  the times with variables
WHERE
  s.enter_datetime BETWEEN '2023-01-01 00:00:00' AND '2023-01-31 23:59:59';

-- get all the vehicles of who has visited between a two given time frames
SELECT DISTINCT
  v.*
FROM
  visits s
  JOIN vehicles v ON s.vehicle_id = v.id
WHERE
  s.enter_datetime BETWEEN '2023-01-01 00:00:00' AND '2023-01-31 23:59:59';

-- get the data of all the vehicles a person has visited using
SELECT
  v.*
FROM
  visitors vis
  JOIN visits s ON vis.id = s.visitor_id
  JOIN vehicles v ON s.vehicle_id = v.id
WHERE
  vis.name = 'John Doe';
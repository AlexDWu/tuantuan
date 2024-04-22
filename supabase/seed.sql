SELECT
  public.create_user ('localdev1@tuantuan.com', 'password');

SELECT
  public.create_user ('localdev2@tuantuan.com', 'password');

INSERT INTO
  public.runs (created_by_id, close_time, name)
SELECT
  users.id,
  t.close_time,
  t.name
FROM
  auth.users as users
  CROSS JOIN (
    VALUES
      ('My First Run', NOW () + INTERVAL '7 DAYS'),
      ('My Second Run', NOW () + INTERVAL '14 DAYS'),
      (NULL, NOW () + INTERVAL '21 DAYS')
  ) AS t (name, close_time);

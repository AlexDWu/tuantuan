SELECT
  public.create_user ('localdev1@tuantuan.com', 'password');

SELECT
  public.create_user ('localdev2@tuantuan.com', 'password');

INSERT INTO
  public.runs (created_by_id, close_time)
SELECT
  id,
  NOW () + INTERVAL '7 DAYS'
FROM
  auth.users;

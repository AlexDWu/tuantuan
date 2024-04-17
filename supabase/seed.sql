SELECT
  public.create_user ('localdev1@tuantuan.com', 'password');

SELECT
  public.create_user ('localdev2@tuantuan.com', 'password');

INSERT INTO
  public.runs (created_by_id)
SELECT
  id
FROM
  auth.users;

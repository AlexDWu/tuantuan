CREATE
OR REPLACE FUNCTION public.create_user (email text, password text) RETURNS void AS $$
  declare
  user_id uuid;
  encrypted_pw text;
BEGIN
  user_id := gen_random_uuid();
  encrypted_pw := crypt(password, gen_salt('bf', 12));

  INSERT INTO auth.users
    (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token)
  VALUES
    ('00000000-0000-0000-0000-000000000000', user_id, 'authenticated', 'authenticated', email, encrypted_pw, '2023-05-03 19:41:43.585805+00', '2023-04-22 13:10:03.275387+00', '2023-04-22 13:10:31.458239+00', '{"provider":"email","providers":["email"]}', '{}', '2023-05-03 19:41:43.580424+00', '2023-05-03 19:41:43.585948+00', '', '', '', '');

  INSERT INTO auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
  VALUES
    (gen_random_uuid(), user_id, user_id, format('{"sub":"%s","email":"%s"}', user_id::text, email)::jsonb, 'email', '2023-05-03 19:41:43.582456+00', '2023-05-03 19:41:43.582497+00', '2023-05-03 19:41:43.582497+00');
END;

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

$$ LANGUAGE plpgsql;

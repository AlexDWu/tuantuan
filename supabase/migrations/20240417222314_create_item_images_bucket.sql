-- Use Postgres to create a bucket.
insert into
  storage.buckets (
    id,
    name,
    public,
    allowed_mime_types,
    file_size_limit
  )
values
  (
    'item-images',
    'item-images',
    true,
    '{"image/*"}',
    1024 * 1024 * 5
  );

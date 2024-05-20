\set hashid `echo $HASH_ID`
create policy "Allow authenticated uploads"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'item-images' and
  (storage.foldername(name))[1] in select id_encode(id, '39351181224564913') from runs where runs.created_by_id = auth.uuid()
);


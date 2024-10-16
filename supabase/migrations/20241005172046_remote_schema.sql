CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();


create policy "Anyone can upload an avatar."
on "storage"."objects"
as permissive
for insert
to public
with check ((bucket_id = 'avatars'::text));


create policy "Avatar images are publicly accessible."
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = 'avatars'::text));


create policy "Basic-Post 1txee7v_0"
on "storage"."objects"
as permissive
for select
to authenticated
using ((bucket_id = 'PostImage'::text));


create policy "Basic-Post 1txee7v_1"
on "storage"."objects"
as permissive
for insert
to authenticated
with check ((bucket_id = 'PostImage'::text));


create policy "Basic-Post 1txee7v_2"
on "storage"."objects"
as permissive
for update
to authenticated
using ((bucket_id = 'PostImage'::text));


create policy "Basic-Post 1txee7v_3"
on "storage"."objects"
as permissive
for delete
to authenticated
using ((bucket_id = 'PostImage'::text));


create policy "Give users authenticated access to folder 1c70902_0"
on "storage"."objects"
as permissive
for select
to public
using (((bucket_id = 'private-image-backet'::text) AND ((storage.foldername(name))[1] = 'private'::text) AND (auth.role() = 'authenticated'::text)));


create policy "Give users authenticated access to folder 1c70902_1"
on "storage"."objects"
as permissive
for insert
to public
with check (((bucket_id = 'private-image-backet'::text) AND ((storage.foldername(name))[1] = 'private'::text) AND (auth.role() = 'authenticated'::text)));


create policy "Give users authenticated access to folder 1c70902_2"
on "storage"."objects"
as permissive
for update
to public
using (((bucket_id = 'private-image-backet'::text) AND ((storage.foldername(name))[1] = 'private'::text) AND (auth.role() = 'authenticated'::text)));


create policy "Give users authenticated access to folder 1c70902_3"
on "storage"."objects"
as permissive
for delete
to public
using (((bucket_id = 'private-image-backet'::text) AND ((storage.foldername(name))[1] = 'private'::text) AND (auth.role() = 'authenticated'::text)));




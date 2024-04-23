export default async function NewItemPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return <div>Hello World {slug}</div>;
}

import { hashids } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";

export default async function RunDetailsPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return <h1>Hello {hashids.decode(slug)}</h1>;
}

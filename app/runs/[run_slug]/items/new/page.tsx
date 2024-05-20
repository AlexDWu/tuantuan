import { createClient } from "@/utils/supabase/server";
import dynamic from "next/dynamic";
// import NewItemForm from "./form";

const NewItemForm = dynamic(() => import("./form"), { ssr: false });

export default async function NewItemPage({
  params: { run_slug },
  ...rest
}: {
  params: { run_slug: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect(`/login?from=%2Fruns%2F${run_slug}%2Fitems`);
  }

  return (
    <>
      <h1>Add an item to your run</h1>
      <NewItemForm run_slug={run_slug} />
    </>
  );
}

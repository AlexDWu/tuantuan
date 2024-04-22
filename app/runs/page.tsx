import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Card, CardHeader } from "@/components/ui/card";
import { hashids } from "@/lib/utils";

export default async function RunsPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login?from=%2Fruns");
  }

  const { data: runs } = await supabase
    .from("runs")
    .select()
    .eq("created_by_id", user.id);

  return (
    <div>
      <div>
        {runs?.map((run) => (
          <Card key={hashids.encode(run.id)}>
            <CardHeader></CardHeader>
          </Card>
        ))}
      </div>
      <pre>{JSON.stringify(runs, null, 2)}</pre>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { hashids } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

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
        {runs?.map((run) => {
          const hashId = hashids.encode(run.id);
          return (
            <Card key={hashId}>
              <CardHeader>
                <CardTitle>{run.name}</CardTitle>
                <CardDescription>
                  {run.status} | Close date: {run.close_time}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div>item images go here horizontally</div>
                <div>delivery locations go here horizontally</div>
              </CardContent>
              <CardFooter>
                {run.status === "draft" ? (
                  <Link href={`/runs/${hashId}`}>
                    <Button variant="link">Edit</Button>
                  </Link>
                ) : (
                  <Button variant="link">Details</Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
      <pre>{JSON.stringify(runs, null, 2)}</pre>
    </div>
  );
}

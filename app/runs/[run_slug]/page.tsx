import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { hashids } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function RunDetailsPage({
  params: { run_slug },
}: {
  params: { run_slug: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect(`/login?from=%2Fruns%2F${run_slug}`);
  }

  const runId = hashids.decode(run_slug);

  const { data: runs } = await supabase.from("runs").select().eq("id", runId);

  if (!runs) {
    return notFound();
  }

  const run = runs[0];

  return (
    <div className="w-full p-2">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Hello {run_slug}
      </h1>
      <p>Status: {run.status}</p>
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Items:
      </h2>
      <div className="flex flex-col gap-2">
        <Link href={`/runs/${run_slug}/items/new`}>
          <Button>Add Item</Button>
        </Link>
        {Array.from({ length: 7 }).map((_, itemIndex) => (
          <Card>
            <CardHeader>
              <CardTitle>Item Name</CardTitle>
              <CardDescription>Item description</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="px-8 flex flex-col items-center justify-center">
                <Carousel className="w-full">
                  <CarouselPrevious />
                  <CarouselContent>
                    {Array.from({ length: 7 }).map((_, index) => (
                      <CarouselItem className="basis-1/16 sm:md:basis-1/8 lg:2xl:basis-1/16">
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            <span>Image {index} goes here</span>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselNext />
                </Carousel>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="link">Edit</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

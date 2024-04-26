"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { createItem } from "@/lib/actions/items";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  images: z
    .any()
    .refine((files) => files.length <= 3, "Maximum of 3 images")
    .refine((files) =>
      Array.from(files).every(
        (file) => file.size <= MAX_FILE_SIZE,
        "Max image size is 5MB",
      ),
    ),
});

export default function NewItemForm() {
  const [formActionState, formAction] = useFormState(createItem, {
    message: "I got nothing",
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      images: [],
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("submitting");
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const images = form.watch("images");

  console.log("rendering!");

  return (
    <Form {...form}>
      <form action={formAction} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Run Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                Give your run a name that you can easily identify.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="images"
          render={({ field: { onChange, onBlur, ref, name } }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    onChange(e.target.files);
                  }}
                  onBlur={onBlur}
                  ref={ref}
                  name={name}
                />
              </FormControl>
              <FormDescription>These are your item images.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {images && (
          <Carousel className="w-full">
            <CarouselPrevious />
            <CarouselContent>
              {Array.from(images).map((image, index) => (
                <CarouselItem key={index} className="basis-1/16">
                  <Card className="w-48 h-48 p-2">
                    <img
                      className="object-contain w-full h-full"
                      src={URL.createObjectURL(image)}
                      alt={image.name}
                    />
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext />
          </Carousel>
        )}

        <Button type="submit" disabled={!form.formState.isValid}>
          Submit
        </Button>
        <div>
          {formActionState && <pre>{JSON.stringify(formActionState)}</pre>}
        </div>
      </form>
    </Form>
  );
}

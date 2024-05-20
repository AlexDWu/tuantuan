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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { createItem } from "@/lib/actions/items";
import { generateItemSchema } from "@/lib/schemas/items";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ItemSchema = generateItemSchema(z.instanceof(FileList));

const MAX_FILE_SIZE = 1024 * 1024 * 5;

export default function NewItemForm({ run_slug }: { run_slug: string }) {
  const [formActionState, formAction] = useFormState(createItem);
  const form = useForm<z.infer<typeof ItemSchema>>({
    resolver: zodResolver(ItemSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      price: "",
      quantity: "",
      max_qty_per_cust: "",
    },
  });

  async function onSubmit(data: z.infer<typeof ItemSchema>) {
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

  const images = form.getValues("images");

  return (
    <Form {...form}>
      <form action={formAction} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>Optional</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="max_qty_per_cust"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Quantity Pre Customer</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
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
              <FormDescription>Optional</FormDescription>
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

        <input type="hidden" id="run_slug" name="run_slug" value={run_slug} />

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

"use server";

import { z } from "zod";
import { generateItemSchema } from "@/lib/schemas/items";
import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

const ITEM_IMAGES_BUCKET = "item-images";
const ItemSchema = generateItemSchema(z.array(z.instanceof(File)));

export async function createItem(previousState, formData: FormData) {
  const validatedFields = ItemSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price") || null,
    quantity: formData.get("quantity") || null,
    max_qty_per_cust: formData.get("max_quantity_per_user") || null,
    images: formData.getAll("images"),
  });

  console.log("validated", validatedFields);

  const { images } = validatedFields.data;
  const runSlug = formData.get("run_slug");

  const bucketResponse = await Promise.all(images.map(async (image) => {
    console.log("sending image");
    // not choosing an image on the frontend will still send a file with size 0 to the backend
    if (image.size > 0) {
      return await supabase.storage.from(ITEM_IMAGES_BUCKET)
        .upload(`${runSlug}/${crypto.randomUUID()}`, image);
    }
  }));

  console.log("bucket response", bucketResponse);

  return ({ status: "success", message: "hello world" });
}

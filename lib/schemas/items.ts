import { z, ZodType } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;

// The backend uses an array of Files and frontend use FileList for "images.
// Using a function like this lets us share a mostly common validation schema
// between the front and backends.
export const generateItemSchema = (imagesSchema: ZodType) =>
  z.object({
    name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    description: z.string().optional(),
    price: z.coerce.number().optional(),
    quantity: z.coerce.number().optional(),
    max_qty_per_cust: z.coerce.number().optional(),
    images: imagesSchema
      .refine((files) => files.length <= 3, "Maximum of 3 files")
      .refine(
        (files) =>
          Array.from(files).every((file) => file.size <= MAX_FILE_SIZE),
        "Max image size is 5MB",
      )
      .optional(),
  });

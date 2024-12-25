import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const productsSchema = z.object({
  _id: z.string(),
  title: z.string(),
  price: z.number(),
  comment: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Products = z.infer<typeof productsSchema>;

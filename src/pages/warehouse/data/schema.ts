import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const warehouseSchema = z.object({
  _id: z.string(),
  title: z.string(),
  quantity: z.string(),
});

export type Products = z.infer<typeof warehouseSchema>;

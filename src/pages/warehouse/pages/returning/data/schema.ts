import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const locationsSchema = z.object({
  _id: z.string(),
  courierName: z.string(),
  count: z.number(),
  title: z.string(),
  quantity: z.number(),
});

export type Locations = z.infer<typeof locationsSchema>;

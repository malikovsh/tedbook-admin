import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const locationsSchema = z.object({
  _id: z.string(),
  region: z.string(),
  address: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Locations = z.infer<typeof locationsSchema>;

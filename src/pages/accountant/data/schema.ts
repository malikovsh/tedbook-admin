import { z } from 'zod';

export const accountantSchema = z.object({
  title: z.string(),
  totalPrice: z.string(),
  quantity: z.number(),
});

export type Accountant = z.infer<typeof accountantSchema>;

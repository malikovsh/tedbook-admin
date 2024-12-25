import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const usersSchema = z.object({
  _id: z.string(),
  name: z.string(),
  username: z.string(),
  // remainingDebts: z.string(),
  // remainingSalary: z.string(),
  salary: z.number().nullable().default(0),
  // giveSalary: z.any(),
  // giveDebt: z.any(),
  role: z.string(),
  isActive: z.boolean(),
});

export type User = z.infer<typeof usersSchema>;

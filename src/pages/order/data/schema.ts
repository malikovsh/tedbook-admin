import { z } from 'zod';

// Define the schema for OrderStatusType
const orderStatusSchema = z.object({
  _id: z.string(),
  title: z.string(),
  color: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Define the schema for ProductsType
const productSchema = z.object({
  _id: z.string(),
  title: z.string(),
  comment: z.string(),
  price: z.number(), // Assuming price is a number
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Define the schema for ShiftsType
const shiftSchema = z.object({
  _id: z.string(),
  name: z.string(),
  time: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Define the schema for SourcesType
const sourceSchema = z.object({
  _id: z.string(),
  title: z.string(),
  comment: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Define the schema for a logistician
const logisticianSchema = z.object({
  _id: z.string(),
  name: z.string(),
  username: z.string(),
});

// Define the schema for a courier
const courierSchema = z.object({
  _id: z.string(),
  name: z.string(),
  username: z.string(),
});

// Define the schema for an operator
const operatorSchema = z.object({
  _id: z.string(),
  name: z.string(),
  username: z.string(),
});

// Define the schema for a message
const messageSchema = z.object({
  commenterRole: z.string(),
  commentText: z.string(),
  _id: z.string(),
  createdAt: z.string(),
});

// Define the main order schema
const orderSchema = z.object({
  _id: z.string(),
  operatorId: operatorSchema, // Referring to operator schema
  courierId: courierSchema, // Referring to courier schema
  logisticianId: logisticianSchema, // Referring to logistician schema
  fullName: z.string(),
  phoneNumber: z.string(),
  phoneNumber2: z.string(),
  statusId: z.union([orderStatusSchema, z.null()]), // Optional: Can be null
  status: z.string(),
  productsIds: z.array(productSchema), // Referring to ProductsType schema
  paymentType: z.string(),
  shiftId: shiftSchema, // Referring to ShiftsType schema
  region: z.string(),
  address: z.string(),
  sourceId: sourceSchema, // Referring to SourcesType schema
  is_archive: z.boolean(),
  messages: z.array(messageSchema), // Referring to messages schema
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Orders = z.infer<typeof orderSchema>;

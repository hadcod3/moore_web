import { z } from "zod"


export const itemFormSchema = z.object({
    type: z.string(),
    name: z.string().min(2, 'Title must be at least 3 characters'),
    description: z.string().min(3, 'Description must be at least 3 characters').max(400, 'Description must be less than 400 characters'),
    imageUrl: z.string(),
    price: z.number().int().positive().optional(),
    stock: z.number().int().positive().optional(),
    minOrder: z.number().int().positive().optional(),
    category: z.string(),
})

export const addressShippingEditSchema = z.object({
    addressShipping: z.string()
    .min(1, 'Shipping address cannot be empty')
    .refine((value) => !/^\d+$/.test(value), {
        message: 'Shipping address cannot contain only numbers',
    }),
})

export const editProfileSchema = z.object({
    photo: z.string(),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long" })
      .max(30, { message: "Username must be at most 30 characters long" })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username can only contain letters, numbers, and underscores",
      }),
    firstName: z
      .string()
      .min(1, { message: "First name is required" })
      .max(20, { message: "First name must be at most 20 characters long" }),
    lastName: z
      .string()
      .min(1, { message: "Last name is required" })
      .max(20, { message: "Last name must be at most 20 characters long" }),
    city: z
      .string()
      .min(1, { message: "City is required" })
      .max(50, { message: "City must be at most 50 characters long" }),
    address: z
      .string()
      .min(5, { message: "Address must be at least 5 characters long" })
      .max(200, { message: "Address must be at most 200 characters long" })
      .optional(),
  });
  
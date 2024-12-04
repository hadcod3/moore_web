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
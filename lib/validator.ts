import { z } from "zod"

export const packetFormSchema = z.object({
    title: z.string().min(3, 'Title must be ata least 3 characters'),
    description: z.string().min(3, 'Description must be at least 3 characters').max(400, 'Description must be less than 400 characters'),
    imageUrl: z.string(),
    categoryId: z.string(),
    price: z.string(),
})

export const productFormSchema = z.object({
    title: z.string().min(3, 'Title must be ata least 3 characters'),
    description: z.string().min(3, 'Description must be at least 3 characters').max(400, 'Description must be less than 400 characters'),
    imageUrl: z.string(),
    categoryId: z.string(),
    price: z.string(),
    stock: z.string()
}
)
export const gearFormSchema = z.object({
    title: z.string().min(3, 'Title must be ata least 3 characters'),
    description: z.string().min(3, 'Description must be at least 3 characters').max(400, 'Description must be less than 400 characters'),
    imageUrl: z.string(),
    categoryId: z.string(),
    price: z.string(),
    stock: z.string()
})
"use server"

import { CreateProductCategoryParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import { ProductCategory } from "../database/models/category.model"

export const createProductCategory = async ({ productCategoryName }: CreateProductCategoryParams) => {
  try {
    await connectToDatabase();

    const newProductCategory = await ProductCategory.create({ name: productCategoryName });

    return JSON.parse(JSON.stringify(newProductCategory));
  } catch (error) {
    handleError(error)
  }
} 

export const getAllProductCategories = async () => {
  try {
    await connectToDatabase();

    const productCategories = await ProductCategory.find();

    return JSON.parse(JSON.stringify(productCategories));
  } catch (error) {
    handleError(error)
  }
}
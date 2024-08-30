"use server"

import { CreateGearCategoryParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import { GearCategory } from "../database/models/category.model"

export const createGearCategory = async ({ gearCategoryName }: CreateGearCategoryParams) => {
  try {
    await connectToDatabase();

    const newGearCategory = await GearCategory.create({ name: gearCategoryName });

    return JSON.parse(JSON.stringify(newGearCategory));
  } catch (error) {
    handleError(error)
  }
} 

export const getAllGearCategories = async () => {
  try {
    await connectToDatabase();

    const gearCategories = await GearCategory.find();

    return JSON.parse(JSON.stringify(gearCategories));
  } catch (error) {
    handleError(error)
  }
}
"use server"

import { CreatePacketCategoryParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import { PacketCategory } from "../database/models/category.model"

export const createPacketCategory = async ({ packetCategoryName }: CreatePacketCategoryParams) => {
  try {
    await connectToDatabase();

    const newPacketCategory = await PacketCategory.create({ name: packetCategoryName });

    return JSON.parse(JSON.stringify(newPacketCategory));
  } catch (error) {
    handleError(error)
  }
} 

export const getAllPacketCategories = async () => {
  try {
    await connectToDatabase();

    const packetCategories = await PacketCategory.find();

    return JSON.parse(JSON.stringify(packetCategories));
  } catch (error) {
    handleError(error)
  }
}
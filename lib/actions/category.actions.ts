"use server"

import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import { 
    CreatePacketCategoryParams, 
    CreateProductCategoryParams, 
    CreateGearCategoryParams, 
    CreateVendorCategoryParams 
} from "@/types"
import { 
    PacketCategory, 
    ProductCategory, 
    GearCategory, 
    VendorCategory 
} from "../database/models/category.model"

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

export const createVendorCategory = async ({ vendorCategoryName }: CreateVendorCategoryParams) => {
  try {
    await connectToDatabase();

    const newVendorCategory = await VendorCategory.create({ name: vendorCategoryName });

    return JSON.parse(JSON.stringify(newVendorCategory));
  } catch (error) {
    handleError(error)
  }
} 

export const getAllVendorCategories = async () => {
  try {
    await connectToDatabase();

    const vendorCategories = await VendorCategory.find();

    return JSON.parse(JSON.stringify(vendorCategories));
  } catch (error) {
    handleError(error)
  }
}
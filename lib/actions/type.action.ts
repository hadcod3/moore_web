"use server"

import { connectToDatabase } from "../database"
import ItemType from "../database/models/itemType.model";

// Function to fetch all type
export const getAllType = async () => {
    try {
        await connectToDatabase();
        
        const category = await ItemType.find();
  
        if (!category) throw new Error('Category not found');
        return JSON.parse(JSON.stringify(category));
    } catch (error) {
        console.error('Error fetching category:', error);
        throw new Error('Failed to fetch category');
    }
}
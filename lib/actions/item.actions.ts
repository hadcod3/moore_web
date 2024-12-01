'use server'

import { connectToDatabase } from '@/lib/database'
import Item from '../database/models/item.model';
import ItemCategory from '../database/models/itemCategory.model';
import ItemType from '../database/models/itemType.model';
import User from '../database/models/user.model';
import { GetItemsByTypeIdParams } from '@/types';
import { getCategoryById, getCategoryByName } from './category.actions';
import { revalidatePath } from 'next/cache';
import { handleError } from '../utils';

const populateItem = (query: any) => {
  return query
  .populate({ path: 'type', model: ItemType, select: '_id name' })
  .populate({ path: 'category', model: ItemCategory, select: '_id name typeFor' })
  .populate({ path: 'organizer', model: User, select: '_id email username firstName lastName photo city' })
}

interface GetItemsByOrganizerIdParams {
  organizerId: string;
  typeId: string;
}

interface CreateItemParams {
  data: {
    type: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    stock: number;
    minOrder: number;
    category: string;
    organizer: string;
  };
  path: string
}

interface UpdateItemParams {
  data: {
    _id: string;
    type: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    stock: number;
    minOrder: number;
    category: string;
    organizer: string;
  };
  path: string
}

interface DeleteItemParams {
  id: string;
  path: string;
}

export async function createItem({ data, path }: CreateItemParams) {
  try {
    await connectToDatabase();

    const newItem = await Item.create({
      ...data,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newItem));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateItem({ data, path }: UpdateItemParams) {
  try {
    await connectToDatabase()

    const { _id, ...updateData } = data; 

    const updatedItem = await Item.findByIdAndUpdate(
        _id,
        { ...updateData }, 
        { new: true }
    );

    if (!updatedItem) {
        throw new Error('Item not found or could not be updated');
    }
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedItem))
  } catch (error) {
    handleError(error)
  }
}

// GET ALL ITEMS
export async function getAllItems() {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Query to get all items
    const items = await populateItem(Item.find());

    // If no items are found, log and throw an error
    if (!items || items.length === 0) {
      console.log('No items found');
      throw new Error('No items available');
    }

    // Return the items
    return JSON.parse(JSON.stringify(items));
  } catch (error) {
    console.error('Error fetching all items:', error);
    if (error instanceof Error) {
      console.error(error.stack); // Log detailed error stack for further insights
    }
    throw new Error('Failed to fetch all items');
  }
}

// GET ALL ITEMS BY TYPE ID
export async function getItemsByTypeId({ typeId, query, category, limit, page }: GetItemsByTypeIdParams) {
    try {
      // Connect to the database
      await connectToDatabase();

      const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
      const categoryCondition = category ? await getCategoryByName(category) : null
      const conditions = {
          $and: [
              { type: typeId },
              titleCondition,
              // { category: categoryCondition._id },
          ]
      };

      const skipAmount = (Number(page) - 1) * limit
      const itemsQuery = Item.find(conditions)
          .sort({ createdAt: 'desc' })
          .skip(skipAmount)
          .limit(limit)
          
      const items = await populateItem(itemsQuery);
      const itemsCount = await Item.countDocuments(conditions)
      
      // If no items are found, throw an error
      if (!items || items.length === 0) {
          console.log('No items found for typeId:', typeId);
          throw new Error('No items found for the specified type');
      }

      return {
        data: JSON.parse(JSON.stringify(items)),
        totalPages: Math.ceil(itemsCount / limit),
      }

    } catch (error) {
      console.error('Error fetching items by type:', error);
      if (error instanceof Error) {
        console.error(error.stack);
      }
      throw new Error('Failed to fetch items by type');
    }
}

// GET ALL ITEM BY ORGANIZER ID AND TYPE ID
export async function getItemsByOrganizerId({ organizerId, typeId }: GetItemsByOrganizerIdParams) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Build the query conditions
    const conditions = {
      $and: [{ organizer: organizerId }, { type: typeId }],
    };

    // Query the items with pagination and sorting
    const itemsQuery = Item.find(conditions)
      .sort({ createdAt: 'desc' })

    const items = await populateItem(itemsQuery);

    if (!items || items.length === 0) {
      return {
        data: [],
        totalPages: 0,
      };
    }

    return {
      data: JSON.parse(JSON.stringify(items)),
    };
  } catch (error) {
    console.error('Error fetching items by organizer and type:', error);
    if (error instanceof Error) {
      console.error(error.stack);
    }
    throw new Error('Failed to fetch items by organizer and type');
  }
}

// GET ITEM BY ID
export async function getItemById(itemId: string) {
  try {
    await connectToDatabase();
    const itemQuery = Item.findById(itemId);
    const item = await populateItem(itemQuery);

    if (!item) {
      return {
        data: null,
        message: "Item not found",
      };
    }

    return JSON.parse(JSON.stringify(item))
  } catch (error) {
    console.error("Error fetching item by ID:", error);
    throw new Error("Failed to fetch item by ID");
  }
}

// DELETE
export async function deleteItem({ id, path }: DeleteItemParams) {
  try {
    await connectToDatabase()

    const deletedItem = await Item.findByIdAndDelete(id)
    if (deletedItem) revalidatePath(path)
  } catch (error) {
    handleError(error)
  }
}


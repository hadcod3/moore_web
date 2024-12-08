'use server'

import { connectToDatabase } from '@/lib/database'  
import User from '../database/models/user.model'
import Item from '../database/models/item.model'
import Transaction, { ITransaction } from '../database/models/transaction.model'

const populateItem = (query: any) => {
    return query
    .populate({ path: 'buyer', model: User, select: '_id firstName lastName' })
    .populate({ path: 'items', model: Item, select: '_id name organizer' })
}

export async function createTransactions(transactionsData: Omit<ITransaction, '_id' | 'createdAt' | 'updatedAt'>[]) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Create transactions in the database
    const createdTransactions = await Transaction.insertMany(
      transactionsData.map((transaction) => ({
        ...transaction,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );

    // Return the created transactions
    return JSON.parse(JSON.stringify(createdTransactions));
  } catch (error) {
    console.error('Error creating transactions:', error);
    if (error instanceof Error) {
      console.error(error.stack); // Log detailed error stack for further insights
    }
    throw new Error('Failed to create transactions');
  }
}

// GET ALL ITEMS
export async function getAllTransactions() {
    try {
      // Connect to the database
      await connectToDatabase();
      
      // Query to get all items
      const transactions = await populateItem(Transaction.find());
  
      // If no transactions are found, log and throw an error
      if (!transactions || transactions.length === 0) {
        console.log('No transactions found');
        throw new Error('No transactions available');
      }
  
      // Return the transactions
      return JSON.parse(JSON.stringify(transactions));
    } catch (error) {
      console.error('Error fetching all transactions:', error);
      if (error instanceof Error) {
        console.error(error.stack); // Log detailed error stack for further insights
      }
      throw new Error('Failed to fetch all transactions');
    }
}

// Get all items by organizer
export async function getAllTransactionsByItemsOrganizer(organizerId: string) {
  try {
    await connectToDatabase();

    const transactions = await Transaction.find()
      .populate({
        path: 'items',
        populate: {
          path: 'organizer', 
          match: { _id: organizerId } 
        }
      });

    const filteredTransactions = transactions.filter(transaction => 
      transaction.items.organizer && transaction.items.organizer._id.toString() === organizerId
    );

    if (!filteredTransactions || filteredTransactions.length === 0) {
      console.log('No transactions found for the given organizer');
      throw new Error('No transactions available for this organizer');
    }

    return JSON.parse(JSON.stringify(filteredTransactions));
  } catch (error) {
    console.error('Error fetching transactions by organizer:', error);
    if (error instanceof Error) {
      console.error(error.stack); // Log detailed error stack for further insights
    }
    throw new Error('Failed to fetch transactions for this organizer');
  }
}

// GET ALL ITEMS BY BUYER ID
export async function getTransactionByBuyerId(buyerId: string) {
    try {
      // Connect to the database
      await connectToDatabase();
  
      // Query to get all items by buyer ID
      const items = await Transaction.find({ buyer: buyerId })
      .populate({ path: 'items', model: Item, select: '_id name organizer' })
  
      // If no items are found, log and throw an error
      if (!items || items.length === 0) {
        console.log(`No items found for buyer ID: ${buyerId}`);
      }
  
      // Return the items
      return JSON.parse(JSON.stringify(items))
    } catch (error) {
      console.error('Error fetching items by buyer ID:', error);
      if (error instanceof Error) {
        console.error(error.stack); // Log detailed error stack for further insights
      }
      throw new Error('Failed to fetch items for this buyer');
    }
}
  
// GET ITEMS BY ITEM ID
export async function getTransactionByItemId(itemId: string) {
    try {
      // Connect to the database
      await connectToDatabase();
  
      // Query to get all items by item IDs
      const items = await populateItem(
        Transaction.find({ items: itemId }) // Use MongoDB's $in operator to match multiple IDs
      );
  
      // If no items are found, log and throw an error
      if (!items || items.length === 0) {
        console.log(`No items found for item IDs: ${itemId}`);
      }
  
      // Return the items
      return JSON.parse(JSON.stringify(items))
    } catch (error) {
      console.error('Error fetching items by item IDs:', error);
      if (error instanceof Error) {
        console.error(error.stack); // Log detailed error stack for further insights
      }
      throw new Error('Failed to fetch items for these IDs');
    }
}

export async function updateTransactionStatus(itemId : string, status: string){
  try {
    // Connect to the database
    await connectToDatabase();

    // Find and update the transaction
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      itemId,
      { status },
      { new: true } 
    );

    if (!updatedTransaction) {
      throw new Error(`Transaction with ID ${itemId} not found`);
    }

    console.log(`Transaction ${itemId} updated successfully:`, updatedTransaction);
    return updatedTransaction; // Return the updated transaction

  } catch (error) {
    console.error('Error fetching items by item IDs:', error);
    if (error instanceof Error) {
      console.error(error.stack); // Log detailed error stack for further insights
    }
    throw new Error('Failed to fetch items for these IDs');
  }
}
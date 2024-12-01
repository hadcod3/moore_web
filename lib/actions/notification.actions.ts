'use server'

import { connectToDatabase } from '@/lib/database'  
import Notification from '../database/models/notification.model'

// GET ALL ITEMS BY BUYER ID
export async function getNotificationByToId(id: string) {
    try {
      // Connect to the database
      await connectToDatabase();
  
      // Query to get all items by buyer ID
      const notifications = await Notification.find({ to: id });

      // If no items are found, log and throw an error
      if (!notifications || notifications.length === 0) {
        console.log(`No items found for buyer ID: ${id}`);
      }
  
      // Return the items
      return JSON.parse(JSON.stringify(notifications))
    } catch (error) {
      console.error('Error fetching items by to ID:', error);
    }
}
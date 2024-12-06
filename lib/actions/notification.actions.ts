'use server'

import { connectToDatabase } from '@/lib/database'  
import Notification from '../database/models/notification.model'

export async function createNotification(notificationData: {
  to: string;
  from: { _id: string; name: string; imageUrl: string };
  message: string;
}) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Create the notification
    const newNotification = await Notification.create({
      to: notificationData.to,
      from: notificationData.from,
      massage: notificationData.message, 
    });

    console.log(`Notification created successfully:`, newNotification);

    return JSON.parse(JSON.stringify(newNotification));
  } catch (error) {
    console.error('Error creating notification:', error);
    return null;
  }
}

// GET ALL ITEMS BY BUYER ID
export async function getNotificationByToId(id: string) {
    try {
      // Connect to the database
      await connectToDatabase();
  
      // Query to get all items by buyer ID
      const notifications = await Notification.find({ to: id });

      // If no items are found, log and throw an error
      if (!notifications || notifications.length === 0) {
        console.log(`No Notification found for current user ID: ${id}`);
      }
  
      // Return the items
      return JSON.parse(JSON.stringify(notifications))
    } catch (error) {
      console.error('Error fetching items by to ID:', error);
    }
}
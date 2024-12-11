'use server'

import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/database'
import User from '@/lib/database/models/user.model'
import Order from '@/lib/database/models/order.model'
import { handleError } from '@/lib/utils'
import { CreateUserParams, GetAllUsersAsVendorsParams, UpdateUserParams } from '@/types'
import Item from '../database/models/item.model'


export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase()
    user.isVendor = false;
    const newUser = await User.create(user)
    return JSON.parse(JSON.stringify(newUser))
  } catch (error) {
    handleError(error)
  }
}


export async function updateUser({ data }: UpdateUserParams) {
  try {
    await connectToDatabase()

    const { _id, ...updateData } = data; 

    const updatedUser = await User.findByIdAndUpdate( 
      _id , 
      updateData, 
      { new: true }
    )

    if (!updatedUser) throw new Error('User update failed')
    return JSON.parse(JSON.stringify(updatedUser))
  } catch (error) {
    handleError(error)
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase()

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId })

    if (!userToDelete) {
      throw new Error('User not found')
    }

    // Unlink relationships
    await Promise.all([
      // Update the 'events' collection to remove references to the user
      Item.updateMany(

        { _id: { $in: userToDelete.events } },
        { $pull: { organizer: userToDelete._id } }
      ),

      // Update the 'orders' collection to remove references to the user
      Order.updateMany({ _id: { $in: userToDelete.orders } }, { $unset: { buyer: 1 } }),
    ])

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id)
    revalidatePath('/')

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
  } catch (error) {
    handleError(error)
  }

}


// Get All Vendors
export async function getAllVendors() {
  try {
    await connectToDatabase();

    const users = await User.find({isVendor : true});

    if (!users) throw new Error('No users found');
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    handleError(error);
  }
}

// Get User by Clerk Id
export async function getUserByClerkId(clerkId: string) {
  try {
    await connectToDatabase()

    const user = await User.findOne({clerkId})

    if (!user) throw new Error('User not found')
    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    handleError(error)
  }
}

// Get User by id
export async function getUserById(_id: string) {
  try {
    await connectToDatabase()

    const user = await User.findById(_id)

    if (!user) throw new Error('User not found')
    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    handleError(error)
  }
}


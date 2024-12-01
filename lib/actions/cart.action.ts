import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";
import Cart from "../database/models/cart.models";
import { handleError } from "../utils";

interface DeleteItemParams {
    id: string;
    path: string;
  }

// Function to fetch category by typeFor id
export const fetchCartItemsByBuyerId = async (buyerId: string) => {
    try {
        await connectToDatabase();
        
        // Search for the category by its name
        const cart = await Cart.find({ buyer: buyerId });
  
        if (!cart) throw new Error('Cart not found');
        return JSON.parse(JSON.stringify(cart));
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw new Error('Failed to fetch cart');
    }
}

// DELETE
export async function deleteCartItem({ id, path }: DeleteItemParams) {
    try {
      await connectToDatabase()
  
      const deletedItem = await Cart.findByIdAndDelete(id)
      if (deletedItem) revalidatePath(path)
    } catch (error) {
      handleError(error)
    }
  }
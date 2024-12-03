import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import Cart from "../database/models/cart.model";


interface CreateCartParams {
    buyerId: string, 
    quantity: number,
    totalAmount: number,
    itemId: string, 
    vendorId: string,
    path: string
}

// Function to fetch category by typeFor id
export async function fetchCartItemsByBuyerId(buyer: string) {
    try {
        await connectToDatabase();
        
        // Search for the category by its name
        const cart = await Cart.find({ buyer });
  
        if (!cart) throw new Error('Cart not found');
        return JSON.parse(JSON.stringify(cart));
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw new Error('Failed to fetch cart');
    }
}

interface DeleteItemParams {
  id: string;
}
// DELETE
export async function deleteCartItem({ id }: DeleteItemParams) {
    try {
      await connectToDatabase()
  
      const deletedItem = await Cart.findByIdAndDelete(id)
    } catch (error) {
      handleError(error)
    }
}
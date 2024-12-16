
import React from 'react';
import CartScreen from '@/components/shared/CartScreen';
import { getUserById } from '@/lib/actions/user.actions';
import { fetchCartItemsByBuyerId } from '@/lib/actions/cart.actions';
import { getItemById } from '@/lib/actions/item.actions';
import { ICart } from '@/lib/database/models/cart.model';
import { auth } from '@clerk/nextjs';

const CartPage = async () => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
    const profile = await getUserById(userId as string);
    const cartItems = await fetchCartItemsByBuyerId(profile._id); 

    // Fetch item details for each cart item
    const itemsWithDetails = await Promise.all(
        cartItems.map(async (cartItem: ICart) => ({
            ...cartItem,
            itemDetails: await getItemById(cartItem.items),
        }))
    );

    // Pass pre-fetched data to the client component
    return <CartScreen cartContent={itemsWithDetails} buyer={profile}/>;
};

export default CartPage;

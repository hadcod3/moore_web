import React, { useState } from 'react'
import { Button } from '../ui/button';
import { IItem } from '@/lib/database/models/item.model';
import { addItemToCart, checkItemInCart } from '@/lib/actions/item.actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const Checkout = ({ item, buyerId }: { item: IItem, buyerId: string}) => {
    
    const router = useRouter();
    const outOfStock = item.stock === 0
    async function addToCart() {
        const existingCartItem = await checkItemInCart(buyerId, item._id);

        if (existingCartItem) {
            toast.info('Item is already in your cart!', {
                position: "bottom-right",
                
            });
        } else {
            const cart = await addItemToCart({
                buyerId: buyerId,
                quantity: item.minOrder,
                totalAmount: (item.minOrder * item.price),
                itemId: item._id,
                vendorId: item.organizer._id,
            })
            console.log("add to cart items:",cart)
            toast.success('Item has been added to your cart!', {
                position: "bottom-right",
                
                });
        }
    }

    return outOfStock ? (
        <Button size="lg" className="button text-red-600">
            Out Of Stock
        </Button>
    ) : item.type.name === "product" ? (
        <form action={addToCart} >
            <Button type="submit" role="link" size="lg" className="button">
                Add to Cart
            </Button>
            <ToastContainer />
        </form>
    ) : (
        <form action={() => router.push(`/payment/${item._id}`)} >
        <Button type="submit" role="link" size="lg" className="button">    
            Rent Now
        </Button>
        </form>
    );
}

export default Checkout
import React, { useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '../ui/button';
import { checkoutOrder } from '@/lib/actions/order.actions';
import { IItem } from '@/lib/database/models/item.model';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ value, userId, isRent, amount } 
    : { value: IItem, userId: string, isRent: boolean, amount: number }) => {
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
        console.log('Order placed! You will receive an email confirmation.');
        }

        if (query.get('canceled')) {
        console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
    }, []);

    const onCheckout = async () => {
        if (!('title' in value && '_id' in value && 'price' in value)) {
            console.error("Invalid value type:", value);
            return;
        }
    
        const order = {
            itemId: value._id,
            itemTitle: value.name,
            price: value.price,
            buyerId: userId,
            amount: amount
        };
    
        await checkoutOrder(order);
    };
    

    return (
        <form action={onCheckout} method="post">
            <Button type="submit" role="link" size="lg" className="p-medium-18 rounded-lg sm:w-fit text-primary-100 font-bold bg-primary-400 hover:bg-primary-500">
                {isRent ? "Rent Now" : "Buy Now"}
            </Button>
        </form>
    )
}

export default Checkout
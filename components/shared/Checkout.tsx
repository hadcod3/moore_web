import React, { useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '../ui/button';
import { checkoutOrder } from '@/lib/actions/order.actions';
import { IPacket } from '@/lib/database/models/packet.model';
import { IProduct } from '@/lib/database/models/product.model';
import { IGear } from '@/lib/database/models/gear.model';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ value, userId, isRent, amount } 
    : { value: IPacket | IProduct | IGear, userId: string, isRent: boolean, amount: number }) => {
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
        let order: any = {};

        switch (true) {
            case 'title' in value && '_id' in value && 'price' in value:
                // Assuming it's a packet
                order = {
                    itemTitle: (value as IPacket).title,
                    itemId: (value as IPacket)._id,
                    price: (value as IPacket).price,
                    buyerId: userId,
                    amount: amount
                };
                break;
            case 'title' in value && '_id' in value && 'price' in value:
                // Assuming it's a product
                order = {
                    itemTitle: (value as IProduct).title,
                    itemId: (value as IProduct)._id,
                    price: (value as IProduct).price,
                    buyerId: userId,
                    amount: amount
                };
                break;
            case 'title' in value && '_id' in value && 'price' in value:
                // Assuming it's a gear
                order = {
                    itemTitle: (value as IGear).title,
                    itemId: (value as IGear)._id,
                    price: (value as IGear).price,
                    buyerId: userId,
                    amount: amount
                };
                break;
            default:
                console.error("Invalid value type:", value);
                return;
        }

        await checkoutOrder(order);
    }

    return (
        <form action={onCheckout} method="post">
            <Button type="submit" role="link" size="lg" className="p-medium-18 rounded-lg sm:w-fit text-primary-100 font-bold bg-primary-400 hover:bg-primary-500">
                {isRent ? "Rent Now" : "Buy Now"}
            </Button>
        </form>
    )
}

export default Checkout
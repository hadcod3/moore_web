import stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createOrder } from '@/lib/actions/order.actions'
import { createTransactions, updateTransactionStatus } from '@/lib/actions/transaction.actions'
import { deleteManyCartItems } from '@/lib/actions/item.actions'
import { createNotification } from '@/lib/actions/notification.actions'

export async function POST(request: Request) {
    const body = await request.text()

    const sig = request.headers.get('stripe-signature') as string
    // const endpointSecret = 'we_1QSHGJ04ZdFmMN37bTHpBXnu'
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

    let event
    
    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
    } catch (err) {
        return NextResponse.json({ message: 'Webhook error', error: err })
    }

    // Get the ID and type
    const eventType = event.type

    // CREATE
    if (eventType === 'checkout.session.completed') {
        const { id, amount_total, metadata, } = event.data.object
        const buyerId = metadata?.buyerId || '';
        const itemIds = metadata?.itemId?.split(',') || [];
        const cartIds = metadata?.cartId?.split(',') || [];
        const shippingAddress = metadata?.shippingAddress || '';
        const transactionId = metadata?.transactionId || '';
        const forDate = metadata?.forDate ? new Date(metadata.forDate) : new Date();
        
        const itemsOrder = itemIds.map((itemId: string, index: number) => {
            const itemDetails = {
                _id: itemId,
                name: (metadata?.itemName?.split(',')[index] || '0'),
                quantity: parseInt(metadata?.quantities?.split(',')[index] || '0'), 
                totalAmount: parseInt(metadata?.prices?.split(',')[index] || '0'), 
            };
            return itemDetails;
        });
        const itemNames = itemsOrder.map(item => item.name).join(', ');
        
        if (transactionId) {
            // RENT EXCECUTION
            const order = {
                stripeId: id,
                buyer: buyerId,
                itemsOrder,
                totalAmount: amount_total ? (amount_total/100) : 0,
                shippingAddress,
                createdAt: new Date(),
                forDate: forDate,
            }

            const newOrder = await createOrder(order)
            const status = "paid"
            const updateStatus = await updateTransactionStatus(transactionId, status)
            
            // Trigger Notification
            await createNotification({
                to: buyerId,
                from: '6759c1c4e87d6ca7d0b61f81', // Admin ID
                message: `Your order ${itemNames} has been successfully created!`,
            });
            
            return NextResponse.json({ message: 'OK', order: newOrder, updateStatus })
        } else {
            // CART EXCECUTION
            const order = {
                stripeId: id,
                buyer: buyerId,
                itemsOrder,
                totalAmount: amount_total ? (amount_total/100) : 0,
                shippingAddress,
                createdAt: new Date(),
                forDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            }
    
            const transactions = itemsOrder.map(item => ({
                paymentId: id,
                buyer: buyerId,
                items: item._id,
                quantity: item.quantity,
                price: (item.totalAmount / item.quantity),
                totalAmount: item.totalAmount,
                shippingAddress,
                status: 'paid',
                forDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
            }));
 
            const newOrder = await createOrder(order)
            const newTransactions = await Promise.all(
                transactions.map(transaction => createTransactions([transaction] as any))
            );
            // Delete cart items was checkout
            const deleteCart = await deleteManyCartItems({ ids: cartIds });

            // Trigger Notification
            await createNotification({
                to: buyerId,
                from: '6759c1c4e87d6ca7d0b61f81', // Admin ID
                message: `Your order ${itemNames} has been successfully created!`,
            });

            return NextResponse.json({ message: 'OK', order: newOrder, transactions: newTransactions  })
        }
    }

    return new Response('', { status: 200 })
}

import stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createOrder } from '@/lib/actions/order.actions'
import { createTransactions } from '@/lib/actions/transaction.actions'
import { ITransaction } from '@/lib/database/models/transaction.model'

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
        const shippingAddress = metadata?.shippingAddress || '';

        const itemsOrder = itemIds.map((itemId: string, index: number) => {
            const itemDetails = {
                _id: itemId,
                quantity: parseInt(metadata?.quantities?.split(',')[index] || '0'), 
                totalAmount: parseInt(metadata?.prices?.split(',')[index] || '0'), 
            };
            return itemDetails;
        });

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
            shippingAddress, // FIXIT output = ""xxxxx"" => "xxxxx"
            status: 'paid',
            forDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
        }));

        const newOrder = await createOrder(order)
        const newTransactions = await Promise.all(
            transactions.map(transaction => createTransactions([transaction] as any))
        );
        return NextResponse.json({ message: 'OK', order: newOrder, transactions: newTransactions  })
    }

    return new Response('', { status: 200 })
}

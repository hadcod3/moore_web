import stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createOrder } from '@/lib/actions/order.actions'
import { toast } from 'react-toastify'

export async function POST(request: Request) {
    const body = await request.text()

    const sig = request.headers.get('stripe-signature') as string
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
        console.log('Parsed Metadata:', { buyerId, itemIds, metadata });

        const order = {
            stripeId: id,
            buyer: buyerId,
            itemsOrder: itemIds.map((itemId: string) => ({ _id: itemId })),
            totalAmount: amount_total ? (amount_total/100) : 0,
            shippingAddress,
            createdAt: new Date(),
            forDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        }

        const newOrder = await createOrder(order)
        return NextResponse.json({ message: 'OK', order: newOrder })
    }

    return new Response('', { status: 200 })
}

"use server"

import Stripe from 'stripe';
import { CreateCheckoutParams, CreateOrderParams, GetOrdersByItemParams, GetOrdersByPacketParams, GetOrdersByUserParams } from "@/types"
import { redirect } from 'next/navigation';
import { handleError } from '../utils';
import { connectToDatabase } from '../database';
import Order from '../database/models/order.model';
import User from '../database/models/user.model';
import {ObjectId} from 'mongodb';
import Item from '../database/models/item.model';

export const checkoutOrder = async (order: CreateCheckoutParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  // const price = order.totalAmount * 100;
  const shipmentCost = order.shipmentCost * 100; // 10% from grand total

  try {
      // Create the checkout session
      const session = await stripe.checkout.sessions.create({
        line_items: [
          ...order.itemsOrder.map((item) => ({
            price_data: {
              currency: 'idr',
              unit_amount: item.price * 100,
              product_data: {
                name: item.name,
              },
            },
            quantity: item.quantity,
          })),
          {
            price_data: {
              currency: 'idr',
              unit_amount: shipmentCost, 
              product_data: {
                name: 'Shipment Cost',
              },
            },
            quantity: 1,
          },
        ],
          metadata: {
              itemId: order.itemsOrder.map((item) => item._id).join(','),
              quantities: order.itemsOrder.map((item) => item.quantity).join(','), 
              prices: order.itemsOrder.map((item) => (item.price * 100)).join(','), // price per item
              buyerId: order.buyer.toString(),
              shippingAddress: JSON.stringify(order.shippingAddress),
              forDate: order.forDate.toISOString(),
          },
          mode: 'payment',
          success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
          cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
      });

      redirect(session.url!);
  } catch (error) {
      console.error('Error during checkout:', error);
      throw error; // Rethrow error if needed
  }
};

export const createOrder = async (order: CreateOrderParams) => {
    try {
        await connectToDatabase();
        
        const newOrder = await Order.create(order);
        return JSON.parse(JSON.stringify(newOrder));
    } catch (error) {
        handleError(error);
    }
}
  
// GET ORDERS BY EVENT
export async function getOrdersByEvent({ searchString, eventId }: GetOrdersByItemParams) {
    try {
      await connectToDatabase()
  
      if (!eventId) throw new Error('Event ID is required')
      const eventObjectId = new ObjectId(eventId)
  
      const orders = await Order.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'buyer',
            foreignField: '_id',
            as: 'buyer',
          },
        },
        {
          $unwind: '$buyer',
        },
        {
          $lookup: {
            from: 'events',
            localField: 'event',
            foreignField: '_id',
            as: 'event',
          },
        },
        {
          $unwind: '$event',
        },
        {
          $project: {
            _id: 1,
            totalAmount: 1,
            createdAt: 1,
            eventTitle: '$event.title',
            eventId: '$event._id',
            buyer: {
              $concat: ['$buyer.firstName', ' ', '$buyer.lastName'],
            },
          },
        },
        {
          $match: {
            $and: [{ eventId: eventObjectId }, { buyer: { $regex: RegExp(searchString, 'i') } }],
          },
        },
      ])
  
      return JSON.parse(JSON.stringify(orders))
    } catch (error) {
      handleError(error)
    }
  }
  
// GET ORDERS BY USER
export async function getOrdersByUser({ userId, limit = 3, page }: GetOrdersByUserParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { buyer: userId }

    const orders = await Order.distinct('items._id')
      .find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: 'item',
        model: Item,
        populate: {
          path: 'organizer',
          model: User,
          select: '_id firstName lastName',
        },
      })

    const ordersCount = await Order.distinct('event._id').countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(orders)), totalPages: Math.ceil(ordersCount / limit) }
  } catch (error) {
    handleError(error)
  }
}
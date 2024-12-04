import { Schema, model, models } from 'mongoose'
   
export interface IOrder extends Document { 
    _id: string;
    stripeId: string;
    buyer: string;
    itemsOrder: Array<{_id: string}>;
    totalAmount: number;
    shippingAddress: string;
    createdAt: Date;
    forDate: Date;
}

const OrderSchema = new Schema({
    stripeId: { type: String, required: true },
    buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    itemsOrder: [
        {
            _id: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
            name: { type: String },
            totalAmountPerItem: { type: Number },
        },
    ],
    totalAmount: { type: Number, required: true },
    shippingAddress: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    forDate: { type: Date, required: true },
});

   
const Order = models.Order || model('Order', OrderSchema)
  
export default Order
  
import { Schema, model, models } from 'mongoose'
import { IItem } from './item.model';
export interface IOrder extends Document { 
    _id: string;
    itemsOrder: {
        packet?: IItem,
        product?: IItem,
        gear?: IItem
    };
    quantity: number;
    totalAmount: number;
    address: string;
    stripeId: string;
    createdAt: Date;
    forDate: Date;
    buyer: { _id: string, firstName: string, lastName: string };
}

const OrderSchema = new Schema({
    itemsOrder: {
        packet: { type: Schema.Types.ObjectId, ref: 'Item' },
        product: { type: Schema.Types.ObjectId, ref: 'Item' },
        gear: { type: Schema.Types.ObjectId, ref: 'Item' }
    },
    quantity: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    address: { type: String, required: true },
    stripeId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    forDate: { type: Date, required: true },
    buyer: { type: Schema.Types.ObjectId, ref: 'User' },
})
   
const Order = models.Order || model('Order', OrderSchema)
  
export default Order
  
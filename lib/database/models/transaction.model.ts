import { Schema, model, models } from 'mongoose'
import { IItem } from './item.model';

export interface ITransaction extends Document { 
    _id: string; 
    paymentId?: string;
    buyer: string;
    items: {
        _id: string,
        name: string,
    }
    productData?: IItem;
    quantity: number;
    price: number;
    totalAmount: number;
    shippingAddress: string;
    status: 'paid'| 'packaging'| 'shipping'| 'under consideration'| 'confirm' | 'installation' | 'rejected' | "success";
    createdAt: Date;
    updatedAt: Date;
    forDate: Date;
} 

const TransactionSchema = new Schema({
    paymentId: { type: String, required: false },
    buyer: { type: Schema.Types.ObjectId, ref: 'User' },
    items: { type: Schema.Types.ObjectId, ref: 'Item' },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    shippingAddress: { type: String, required: true },
    status: {
        type: String,
        enum: ['paid', 'packaging', 'shipping', 'under consideration', 'installation', 'rejected'],
        default: 'paid',
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, require: false },
    forDate: { type: Date, required: false },
}) 
   
const Transaction = models.Transaction || model('Transaction', TransactionSchema)
    
export default Transaction
  
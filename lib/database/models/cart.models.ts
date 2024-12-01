import { Schema, model, models } from 'mongoose';

export interface ICart extends Document {
    _id: string,
    buyer: string,
    quantity: number,
    totalAmount: number,
    items: string,
    vendor: string,
}

const CartSchema = new Schema({
    buyer: { type: Schema.Types.ObjectId, ref: 'User' },
    quantity: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    items: {type: Schema.Types.ObjectId, ref: 'Item'},
    vendor: { type: Schema.Types.ObjectId, ref: 'User' }, 
}); 

const Cart = models.Cart || model('Cart', CartSchema);

export default Cart;

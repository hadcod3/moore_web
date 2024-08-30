import { Schema, model, models } from 'mongoose'

const OrderSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    stripeId: {
        type: String,
        required: true,
        unique: true,
    },
    amount: {
        type: String,
        required: true,
    },
    totalAmount: {
        type: String, 
        required: true,
    },
    event:{
        type: Schema.Types.ObjectId,
        refPath: ['Packet', 'Product', "Gear"],
    },
    itemName:{
        type: String,
        required: true,
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
})
   
const Order = models.Order || model('Order', OrderSchema)
  
export default Order
  
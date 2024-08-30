import { Document, Schema, model, models } from "mongoose";



 

export interface IProduct extends Document {
    _id: string;
    title: string;
    description: string;
    createdAt: Date;
    imageUrl: string;
    price: string;
    stock: string;
    category: { _id: string, name: string};
    organizer: { _id: string, firstName: string, lastName: string };
}

const ProductSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    imageUrl: { type: String, required: true },
    price: { type: String, required: true },
    stock: { type: String, required: true},
    category: { type: Schema.Types.ObjectId, ref: 'ProductCategory' },
    organizer: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Product = models.Product || model('Product', ProductSchema);

export default Product
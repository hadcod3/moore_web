import { Document, Schema, model, models } from "mongoose";

export interface IItem extends Document {
    _id: string;
    type: { _id: string, name: string};
    name: string;
    description: string;
    createdAt: Date;
    imageUrl: string;
    price: number;
    stock: number; 
    minOrder:  number;
    category: { _id: string, name: string, typeFor: string};
    organizer: { 
        _id: string, 
        email: string,
        username: string,
        firstName: string,
        lastName: string,
        photo: string,
        city: string, 
    };
}

const ItemSchema = new Schema({
    type: { type: String, required: true, ref: 'ItemType'},
    name: { type: String, required: true},
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true},
    minOrder: { type: Number, required: true},
    category: { type: Schema.Types.ObjectId, ref: 'ItemCategory' },
    organizer: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Item = models.Item || model('Item', ItemSchema);

export default Item
import { Document, Schema, model, models } from "mongoose";

export interface IGear extends Document {
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

const GearSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    imageUrl: { type: String, required: true },
    price: { type: String, required: true },
    stock: { type: String, required: true},
    category: { type: Schema.Types.ObjectId, ref: 'GearCategory' },
    organizer: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Gear = models.Gear || model('Gear', GearSchema);

export default Gear
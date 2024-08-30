import { Document, Schema, model, models } from "mongoose";

export interface IPacket extends Document { 
    _id: string;
    title: string;
    description: string;
    createdAt: Date;
    imageUrl: string;
    price: string;
    category: { _id: string, name: string};
    organizer: { _id: string, firstName: string, lastName: string };
}

const PacketSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    imageUrl: { type: String, required: true },
    price: { type: String },
    category: { type: Schema.Types.ObjectId, ref: 'PacketCategory' },
    organizer: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Packet = models.Packet || model('Packet', PacketSchema);

export default Packet
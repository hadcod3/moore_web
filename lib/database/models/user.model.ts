import { Document, Schema, model, models } from "mongoose";

export interface IVendor extends Document {
    clerkId: string;
    username: string;
    photo: string;
}

const UserSchema = new Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    photo: { type: String, required: true },
    created_at: { type: Date, required: true},
    updated_at: { type: Date, required: true},
    isVendor: { type: Boolean, required: true, default: false}
})

const User = models.User || model('User', UserSchema);

export default User;
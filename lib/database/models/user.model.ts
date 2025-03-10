import { Document, Schema, model, models } from "mongoose";

export interface IUser extends Document {
    _id: string,
    clerkId: string,
    email: string,
    username: string,
    firstName: string,
    lastName: string,
    photo: string,
    address: string,
    city: string,
    isVendor: boolean
}

const UserSchema = new Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    photo: { type: String, required: false },
    address: { type: String, required: false },
    city: { type: String, required: false },
    isVendor: { type: Boolean, required: true, default: false}
})

const User = models.User || model("User", UserSchema);
export default User
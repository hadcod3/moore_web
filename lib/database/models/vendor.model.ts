import { Document, Schema, model, models } from "mongoose";

// Vendor Permission Schema
export interface IVendorPermit extends Document {
    _id: string;
    isVendor: boolean; 
}
const VendorPermitSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isVendor: { type: Boolean, required: true, default: false }
})

const VendorPermit = models.VendorPermit || model('VendorPermit', VendorPermitSchema)

export default VendorPermit
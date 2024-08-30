import { Document, Schema, model, models } from "mongoose";

// Packet Category Model
export interface IPacketCategory extends Document {
  _id: string;
  name: string; 
}
const PacketCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
})
export const PacketCategory = models.PacketCategory || model('PacketCategory', PacketCategorySchema);
 
// Product Category Model
export interface IProductCategory extends Document {
  _id: string;
  name: string;
}
const ProductCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
})
export const ProductCategory = models.ProductCategory || model('ProductCategory', ProductCategorySchema);

// Gear Category Model
export interface IGearCategory extends Document {
  _id: string;
  name: string; 
}
const GearCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
})
export const GearCategory = models.GearCategory || model('GearCategory', GearCategorySchema);



// Vendor Category Model
export interface IVendorCategory extends Document {
  _id: string;
  name: string; 
}
const VendorCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
})
export const VendorCategory = models.VendorCategory || model('VendorCategory', VendorCategorySchema);


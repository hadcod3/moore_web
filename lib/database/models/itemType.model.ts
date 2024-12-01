import { Document, Schema, model, models } from "mongoose";

// Product Category Model
export interface IItemType extends Document {
  _id: string;
  name: string;
}

const ItemTypeSchema = new Schema({
  name: { type: String, required: true, unique: true },   
});
 
const ItemType = models.ItemType || model("ItemType", ItemTypeSchema);
export default ItemType;

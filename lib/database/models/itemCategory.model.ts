import { Document, Schema, model, models } from "mongoose";

// Product Category Model
export interface IItemCategory extends Document {
  _id: string;
  name: string;
  typeFor: string;  
}

const ItemCategorySchema = new Schema({
  name: { type: String, required: true }, 
  typeFor: { type: Schema.Types.ObjectId, ref: 'ItemType'},
});
 
const ItemCategory = models.ItemCategory || model("ItemCategory", ItemCategorySchema);
export default ItemCategory; 
 
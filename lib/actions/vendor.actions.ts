import { CreateVendorPermitParams } from "@/types";
import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import VendorPermit from "../database/models/vendor.model";

export const createVendorPermit = async ({ _id, isVendor }: CreateVendorPermitParams) => {
    try {
      await connectToDatabase();
  
      const newVendorPermit = await VendorPermit.create({ _id: _id, isVendor: isVendor});
  
      return JSON.parse(JSON.stringify(newVendorPermit));
    } catch (error) {
      handleError(error)
    }
} 
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
import { getCategoryByType } from "@/lib/actions/category.actions";
import { IItemCategory } from "@/lib/database/models/itemCategory.model"


type DropdownProps = {
    value: string
    onChangeHandler?: () => void
    typeFor: string | undefined
}
  
const Dropdown = ({ value, onChangeHandler, typeFor }: DropdownProps) => {
    const [categories, setCategories] = useState<IItemCategory[]>([]);
    
    if(!typeFor){
        console.log("Error fetching categories")
    }

    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const data = await getCategoryByType(typeFor as string);
          setCategories(data);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
      fetchCategories();
    }, [typeFor]);
    
  
    return (

        <Select onValueChange={onChangeHandler} defaultValue={value}>
            <SelectTrigger className="select-field bg-secondary-200">
              {categories.length > 0 ? (
                <SelectValue placeholder="Category" className="text-primary-300"/>
              ) : (
                <SelectValue placeholder="Set Type First" className="text-primary-300"/>
              )}
            </SelectTrigger>
            <SelectContent>
            {categories.length > 0 && categories.map((category) => (
                <SelectItem key={category._id} value={category._id} className="select-item p-regular-14">
                {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                </SelectItem>
            ))}
            </SelectContent>
        </Select>

    )
}
  
export default Dropdown
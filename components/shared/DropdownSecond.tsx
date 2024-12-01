import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
import { IItemCategory } from "@/lib/database/models/itemCategory.model"
import { getAllType } from "@/lib/actions/type.action";

type DropdownSecondProps = {
    value: string
    onChangeHandler?: (value: string) => void
}
  
const DropdownSecond = ({ value, onChangeHandler }: DropdownSecondProps) => {
    const [types, setTypes] = useState<IItemCategory[]>([]);
    
    useEffect(() => {
      const fetchTypes = async () => {
        try {
          const data = await getAllType()
          setTypes(data);
        } catch (error) {
          console.error("Error fetching types:", error);
        }
      };
      fetchTypes();
    }, []);
    
  
    return (

        <Select onValueChange={onChangeHandler} defaultValue={value}>
            <SelectTrigger className="select-field bg-secondary-200">
            <SelectValue placeholder="Type" className="text-primary-300"/>
            </SelectTrigger>
            <SelectContent>
            {types.length > 0 && types.map((type) => (
                <SelectItem key={type._id} value={type._id} className="select-item p-regular-14">
                {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                </SelectItem>
            ))}
            </SelectContent>
        </Select>

    )
}
  
export default DropdownSecond
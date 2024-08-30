import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { startTransition, useEffect, useState } from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "../ui/input"
import { IPacketCategory, IProductCategory, IGearCategory } from "@/lib/database/models/category.model"
import { createPacketCategory, getAllPacketCategories } from "@/lib/actions/category.actions"
import { createProductCategory, getAllProductCategories } from "@/lib/actions/category.actions"
import { createGearCategory, getAllGearCategories } from "@/lib/actions/category.actions"


type DropdownProps = {
    value?: string
    onChangeHandler?: () => void
    collectionTypes?: 'Packet_Categories' | 'Product_Categories' | 'Gear_Categories'
}
  
const Dropdown = ({ value, onChangeHandler, collectionTypes }: DropdownProps) => {
    const [categories, setCategories] = useState<(IPacketCategory | IProductCategory | IGearCategory)[]>([]);
    const [newCategory, setNewCategory] = useState('');

    const handleAddCategory = async () => {
        try {
          let category: IPacketCategory | IProductCategory | IGearCategory;
          switch (collectionTypes) {
            case 'Packet_Categories':
              category = await createPacketCategory({ packetCategoryName: newCategory.trim() });
              break;
            case 'Product_Categories':
              category = await createProductCategory({ productCategoryName: newCategory.trim() });
              break;
            case 'Gear_Categories':
              category = await createGearCategory({ gearCategoryName: newCategory.trim() });
              break;
            default:
              throw new Error('Invalid collection type');
          }
          setCategories(prevState => [...prevState, category]);
        } catch (error) {
          console.error('Error adding category:', error);
        }
    };
    
    useEffect(() => {
        if (collectionTypes) {
          const fetchCategories = async () => {
            try {
              let categoryList;
              switch (collectionTypes) {
                case 'Packet_Categories':
                  categoryList = await getAllPacketCategories();
                  break;
                case 'Product_Categories':
                  categoryList = await getAllProductCategories();
                  break;
                case 'Gear_Categories':
                  categoryList = await getAllGearCategories();
                  break;
                default:
                  throw new Error('Invalid collection type');
              }
              setCategories(categoryList);
            } catch (error) {
              console.error('Error fetching categories:', error);
            }
          };
          fetchCategories();
        }
      }, [collectionTypes]);
  
    return (

        <Select onValueChange={onChangeHandler} defaultValue={value}>
            <SelectTrigger className="select-field">
            <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
            {categories.length > 0 && categories.map((category) => (
                <SelectItem key={category._id} value={category._id} className="select-item p-regular-14">
                {category.name}
                </SelectItem>
            ))}
    
            <AlertDialog>
                <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-100 focus:text-primary-500">Add new category</AlertDialogTrigger>
                <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                    <AlertDialogTitle>New Category</AlertDialogTitle>
                    <AlertDialogDescription>
                    <Input type="text" placeholder="Category name" className="input-field mt-3" onChange={(e) => setNewCategory(e.target.value)} />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => startTransition(() => { handleAddCategory(); })} className="bg-primary-300">Add</AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            </SelectContent>
        </Select>

    )
}
  
export default Dropdown
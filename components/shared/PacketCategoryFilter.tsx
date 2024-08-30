"use client"
 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getAllPacketCategories } from "@/lib/actions/category.actions";
import { IPacketCategory } from "@/lib/database/models/category.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PacketCategoryFilter = () => {
    const [categories, setCategories] = useState<IPacketCategory[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const getCategories = async () => {
        const categoryList = await getAllPacketCategories();

        categoryList && setCategories(categoryList as IPacketCategory[])
        }

        getCategories();
    }, [])

    const onSelectCategory = (category: string) => {
        let newUrl = '';

        if(category && category !== 'All') {
            newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: 'category',
            value: category
            })
        } else {
            newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ['category']
            })
        }

        router.push(newUrl, { scroll: false });
    }

    return (
        <Select onValueChange={(value: string) => onSelectCategory(value)} >
            <SelectTrigger className="select-field ">
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="All" className="select-item p-regular-14">All</SelectItem>
                {categories.map((category) => (
                    <SelectItem value={category.name} key={category._id} className="select-item p-regular-14">
                        {category.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default PacketCategoryFilter
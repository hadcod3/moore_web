"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getAllProductCategories } from "@/lib/actions/category.actions";
import { IProductCategory } from "@/lib/database/models/category.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProductCategoryFilter = () => {
  const [categories, setCategories] = useState<IProductCategory[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllProductCategories();

      categoryList && setCategories(categoryList as IProductCategory[])
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
    <Select onValueChange={(value: string) => onSelectCategory(value)}>
      <SelectTrigger className="select-field">
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

    return (
        <Select onValueChange={(value: string) => onSelectCategory(value)}>
            <SelectTrigger className="select-field">
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

export default ProductCategoryFilter
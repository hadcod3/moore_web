"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { itemFormSchema } from "@/lib/validator"
import * as z from 'zod'
import { itemDefaultValues } from "@/constants"
import Dropdown from "./Dropdown"
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "./FileUploader"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useUploadThing } from '@/lib/uploadthing'
import { useRouter } from "next/navigation"
import { IItem } from "@/lib/database/models/item.model"
import AbandonedPage from "./AbandonedPage"
import { createItem, updateItem } from "@/lib/actions/item.actions"
import DropdownSecond from "./DropdownSecond"

type ItemFormProps = {
    userId: string;
    typeForm: "Create" | "Update";
    data?: IItem;
}

const ItemForm = ({ userId, typeForm, data }: ItemFormProps) => {
    const [files, setFiles] = useState<File[]>([])
    const [typeFor, setTypeFor] = useState(data?.category.typeFor)
    const router = useRouter();
    
    const transformedData = {
        ...data,
        type: data?.type?._id,
        category: data?.category?._id,
    };
    
    const initialValues = typeForm === 'Update' 
    ? transformedData
    : itemDefaultValues;
 
    const { startUpload } = useUploadThing('imageUploader')

    const form = useForm<z.infer<typeof itemFormSchema>>({
        resolver: zodResolver(itemFormSchema),
        defaultValues: initialValues
    })

    useEffect(() => {
        if (typeForm === 'Update' && data) {
            const updatedValues = {
                ...itemDefaultValues,
                ...transformedData,
            };
            form.reset(updatedValues);
        }
        const subscription = form.watch((value, { name }) => {
            if (name === "type" && value.type) {
                setTypeFor(value.type);
            }
        });

        return () => subscription.unsubscribe();
    }, [data, typeForm, form]);

    async function onSubmit(values: z.infer<typeof itemFormSchema>) {
        let uploadedImageUrl = values.imageUrl;
        const price = values.price ?? 0;
        const stock = values.stock ?? 0;
        const minOrder = values.minOrder ?? 1;

        if(files.length > 0) {
            const uploadedImages = await startUpload(files)

            if(!uploadedImages) {
                return
            }

            uploadedImageUrl = uploadedImages[0].url
        }

        if(!data){
            return <AbandonedPage/>
        }

        if(typeForm === 'Create') {
            try {
                if (!uploadedImageUrl || !userId) {
                    throw new Error("Missing required fields: uploadedImageUrl or UserId");
                  }
                const newItem = await createItem({
                    data: {
                        ...values, 
                        imageUrl: uploadedImageUrl, 
                        organizer: userId,
                        price,
                        stock,
                        minOrder 
                    },
                    path: '/profile'
                })

                if(newItem) {
                    form.reset();
                    router.push(`/items/${newItem._id}`)
                }
            } catch (error) {
                console.log(error);
            }
        }

        if(typeForm === 'Update') {
            if(!data._id) {
                router.back()
                return;
            }

            try {
                const updatedItem = await updateItem({
                    data: {
                        ...values,
                        _id: data._id,
                        imageUrl: uploadedImageUrl, 
                        organizer: userId,
                        price,
                        stock,
                        minOrder 
                    },
                    path: `/items/${data._id}`
                })

                if(updatedItem) {
                    form.reset();
                    router.push(`/items/${updatedItem._id}`)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 md:flex-row">
            <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                <FormItem className="w-full">
                    <FormControl>
                    <DropdownSecond onChangeHandler={(value) => {field.onChange(value); setTypeFor(value)}} value={field.value} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                <FormItem className="w-full">
                    <FormControl>
                    <Dropdown onChangeHandler={field.onChange} value={field.value} typeFor={typeFor} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            </div>

            <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem className="w-full">
                    <FormControl>
                    <Input placeholder="Name" {...field} className="input-field" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />   
                <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                    <FormItem className="w-full">
                    <FormControl>
                        <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-primary-100/0 border border-b-2 border-primary-100 px-4 py-2">
                        <Image
                            src="/assets/icons/link.svg"
                            alt="stock"
                            width={24}
                            height={24}
                            className="filter-grey"
                        />
                        <Input 
                        type="number" 
                        placeholder="Price" {...field}
                        value={field.value || ''}
                        onChange={(e) => field.onChange(Number(e.target.value))} 
                        className="bg-transparent border-transparent h-[54px] placeholder:text-grey-300 text-md px-5 py-3 focus-visible:ring-transparent focus:ring-transparent !important focus-visible:ring-offset-0" />
                        </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>

            <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                    <FormItem className="w-full">
                    <FormControl>
                        <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-primary-100/0 border border-b-2 border-primary-100 px-4 py-2">
                        <Image
                            src="/assets/icons/dollar.svg"
                            alt="dollar"
                            width={24}
                            height={24}
                            className="filter-grey"
                        />
                        <Input 
                        type="number" 
                        placeholder="Stock" {...field} 
                        value={field.value || ''}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="bg-transparent border-transparent h-[54px] placeholder:text-grey-300 text-md px-5 py-3 focus-visible:ring-transparent focus:ring-transparent !important focus-visible:ring-offset-0" />
                        </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />   
                <FormField
                control={form.control}
                name="minOrder"
                render={({ field }) => (
                    <FormItem className="w-full">
                    <FormControl>
                        <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-primary-100/0 border border-b-2 border-primary-100 px-4 py-2">
                        <Image
                            src="/assets/icons/link.svg"
                            alt="stock"
                            width={24}
                            height={24}
                            className="filter-grey"
                        />
                        <Input 
                        type="number" 
                        placeholder="Min. Order" {...field} 
                        value={field.value || ''}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="bg-transparent border-transparent h-[54px] placeholder:text-grey-300 text-md px-5 py-3 focus-visible:ring-transparent focus:ring-transparent !important focus-visible:ring-offset-0" />
                        </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>

            <div className="flex flex-col gap-5 md:flex-row">
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem className="w-full border-primary-100 rounded-2xl">
                    <FormControl className="h-72">
                        <Textarea placeholder="Description" {...field} className="textarea rounded-2xl resize-none" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                    <FormItem className="w-full border-primary-100 rounded-2xl">
                    <FormControl className="h-72">
                        <FileUploader  
                        onFieldChange={field.onChange}
                        imageUrl={field.value}
                        setFiles={setFiles}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>

            <Button 
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="button col-span-2 text-white w-full bg-primary-400"
            >
            {form.formState.isSubmitting ? (
                'Submitting...'
            ): `${typeForm} Item `}</Button>
            
        </form>
        </Form>
    )
}

export default ItemForm
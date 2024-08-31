"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { packetFormSchema } from "@/lib/validator"
import * as z from 'zod'
import { packetDefaultValues } from "@/constants"
import Dropdown from "./Dropdown"
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "./FileUploader"
import { useState } from "react"
import Image from "next/image"
import { useUploadThing } from '@/lib/uploadthing'
import { useRouter } from "next/navigation"
import { IPacket } from "@/lib/database/models/packet.model"
import { createPacket, updatePacket } from "@/lib/actions/packet.actions"

type PacketFormProps = {
    userId: string;
    type: "Create" | "Update";
    packet?: IPacket;
    packetId?: string;
}
 
const PacketForm = ({ userId, type, packet, packetId }: PacketFormProps) => {
    const [files, setFiles] = useState<File[]>([])
    const initialValues = packet && type === 'Update'
    ? { 
        ...packet, 
    }
    : packetDefaultValues;
    const router = useRouter();

    const { startUpload } = useUploadThing('imageUploader')

    const form = useForm<z.infer<typeof packetFormSchema>>({
        resolver: zodResolver(packetFormSchema),
        defaultValues: initialValues
    })
 
    async function onSubmit(values: z.infer<typeof packetFormSchema>) {
        let uploadedImageUrl = values.imageUrl;

        if(files.length > 0) {
            const uploadedImages = await startUpload(files)

            if(!uploadedImages) {
                return
            }

            uploadedImageUrl = uploadedImages[0].url
        }

        if(type === 'Create') {
            try {
                const newPacket = await createPacket({
                    userId,
                    packet: { ...values, imageUrl: uploadedImageUrl },
                    path: '/profile'
                })

                if(newPacket) {
                    form.reset();
                    router.push(`/packets/${newPacket._id}`)
                }
            } catch (error) {
                console.log(error);
            }
        }

        if(type === 'Update') {
            if(!packetId) {
                router.back()
                return;
            }

            try {
                const updatedPacket = await updatePacket({
                    userId,
                    packet: { ...values, imageUrl: uploadedImageUrl, _id: packetId },
                    path: `/packets/${packetId}`
                })

                if(updatedPacket) {
                    form.reset();
                    router.push(`/packets/${updatedPacket._id}`)
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
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Packet name" {...field} className="input-field" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> 
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown onChangeHandler={field.onChange} value={field.value} collectionTypes="Packet_Categories" />
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
                  <FormControl className="h-72 ">
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

        <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="price"
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
                      <Input type="number" placeholder="Price" {...field} className="bg-transparent border-transparent h-[54px] placeholder:text-grey-300 text-md px-5 py-3 focus-visible:ring-transparent focus:ring-transparent !important focus-visible:ring-offset-0" />
                    </div>

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
          className="button col-span-2 w-full bg-primary-400 text-white"
        >
          {form.formState.isSubmitting ? (
            'Submitting...'
          ): `${type} Packet `}</Button>
        
      </form>
    </Form>
  )
}

export default PacketForm
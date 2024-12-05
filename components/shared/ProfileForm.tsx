"use client"

import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "./FileUploader" 
import { useUploadThing } from "@/lib/uploadthing" 
import { useRouter } from "next/navigation"
import { IUser } from "@/lib/database/models/user.model" // Your user model type
import { editProfileSchema } from '@/lib/validator'
import { updateUser } from '@/lib/actions/user.actions'

type ProfileFormProps = {
    userId: string;
    userData: IUser;
}

const ProfileForm = ({ userId, userData }: ProfileFormProps) => {
    const [files, setFiles] = useState<File[]>([])
    const { startUpload } = useUploadThing("imageUploader")
    const router = useRouter()

    const initialValues = {
        username: userData.username || "",
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        address: userData.address || "",
        city: userData.city || "",
        photo: userData.photo || "" 
    }

    const form = useForm({
        resolver: zodResolver(editProfileSchema),
        defaultValues: initialValues
    })

    useEffect(() => {
        form.reset(initialValues)
    }, [userData, form])

    const onSubmit = async (values: any) => {
        let uploadedImageUrl = values.imageUrl

        // Upload new image if files are selected
        if (files.length > 0) {
            const uploadedImages = await startUpload(files)
            if (uploadedImages) {
                uploadedImageUrl = uploadedImages[0].url
            }
        }
        
        try {
            const updatedUser = await updateUser({
                data:{
                    ...values,
                    _id: userId,
                    photo: uploadedImageUrl
                }
            })
            if (updatedUser) {
                router.push(`/`)
            }
        } catch (error) {
            console.error("Error updating profile:", error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 py-5">
                <FormField
                    control={form.control}
                    name="photo"
                    render={({ field }) => (
                        <FormItem className='w-full py-5 flex justify-center'>
                            <FormControl>
                                <FileUploader
                                    imageUrl={field.value}
                                    onFieldChange={field.onChange}
                                    setFiles={setFiles}
                                    setHeightImg="h-32"
                                    setWidthImg="w-32"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="username" {...field} className='input-field'/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>FirstName</FormLabel>
                            <FormControl>
                                <Input placeholder="firstname" {...field} className='input-field' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>LastName</FormLabel>
                            <FormControl>
                                <Input placeholder="lastname" {...field} className='input-field' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Textarea placeholder="address" {...field} className='textarea'/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input placeholder="city" {...field} className='input-field' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button 
                type="submit"
                size="lg"
                disabled={form.formState.isSubmitting}
                className="button col-span-2 w-full"
                >
                    {form.formState.isSubmitting ? (
                        'Submitting...'
                    ): `Update Profile`}
                </Button>
            </form>
        </Form>
    )
}

export default ProfileForm

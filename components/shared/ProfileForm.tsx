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
import { IUser } from "@/lib/database/models/user.model" // Your user model type
import { updateProfileSchema } from '@/lib/validator'
import { updateUser } from '@/lib/actions/user.actions'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; 
import { Checkbox } from '../ui/checkbox'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { ScrollArea } from '../ui/scroll-area'
import { createNotification } from '@/lib/actions/notification.actions'
import axios from 'axios';

type ProfileFormProps = {
    userId: string;
    userData: IUser;
    isUpdate: boolean
}

const ProfileForm = ({ userId, userData, isUpdate }: ProfileFormProps) => {
    const [files, setFiles] = useState<File[]>([])
    const { startUpload } = useUploadThing("imageUploader")
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);

    const initialValues = {
        username: userData.username || "",
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        address: userData.address || "",
        city: userData.city || "",
        photo: userData.photo || "" ,
        isVendor: userData.isVendor || false,
        acceptTerms: false
    }

    const form = useForm({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: initialValues
    })

    const currentValues = form.watch()

    useEffect(() => {
        form.reset(initialValues)
    }, [userData, form])

    const hasChanges = JSON.stringify(currentValues) !== JSON.stringify(initialValues) || files.length > 0

    // Submit Form for Update Profile
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
                toast.success('Update profile successfully!', {
                    position: "bottom-right",
                });
            }
        } catch (error) {
            console.error("Error updating profile:", error)
        }
        window.location.reload();
    }

    // Submit Form for Vendor Registration
    const onRegistration = async (values: any) => {
        
        try {
            const updatedUser = await updateUser({
                data:{
                    ...values,
                    _id: userId,
                    isVendor: true
                }
            })

            if (updatedUser) {
                toast.success('Congrats! Your the Moore Vendor Now!', {
                    position: "bottom-right",
                });

                const notificationMessage = "Welcome to Moore as a new vendor! Your journey begins here—start managing your store, adding products, and connecting with customers."
                        
                await createNotification({
                    to: userId, 
                    from: {
                        _id: "665728b935e40bdd1e329870",
                        name: "Moore",
                        imageUrl: "https://utfs.io/f/3Dorr2QGMBZhREyG0rdhBrVTWjbJwQ45uLKRl8O7Adgn3yzs",
                    },
                    message: notificationMessage,
                });
            }
        } catch (error) {
            console.error("Error registration:", error)
        }
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsTermsAccepted(event.target.checked);
    };

    const termsCondition = (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md text-gray-800">
          <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
          <p className="mb-4">
            Welcome to the Wedding Organizer Marketplace. By registering as a vendor on our platform, you agree to the following terms and conditions. Please read them carefully.
          </p>
    
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">1. Vendor Eligibility</h2>
            <ul className="list-disc pl-6">
              <li>1.1. Vendors must be at least 18 years old to register.</li>
              <li>1.2. Vendors must provide accurate and truthful information during registration.</li>
            </ul>
          </div>
    
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">2. Use of the Platform</h2>
            <ul className="list-disc pl-6">
              <li>2.1. Vendors are responsible for the content, pricing, and availability of their listings.</li>
              <li>2.2. Vendors must ensure that their products and services comply with local laws and regulations.</li>
              <li>2.3. Vendors agree not to use the platform for any illegal, fraudulent, or harmful activities.</li>
            </ul>
          </div>
    
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">3. Payments and Fees</h2>
            <ul className="list-disc pl-6">
              <li>3.1. A commission fee of [X%] will be deducted from each transaction.</li>
              <li>3.2. Payments to vendors will be processed within [X] business days after successful transactions.</li>
            </ul>
          </div>
    
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">4. Cancellation and Refunds</h2>
            <ul className="list-disc pl-6">
              <li>4.1. Vendors must provide clear cancellation and refund policies in their listings.</li>
              <li>4.2. Vendors are responsible for resolving disputes with customers regarding cancellations or refunds.</li>
            </ul>
          </div>
    
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">5. Intellectual Property</h2>
            <ul className="list-disc pl-6">
              <li>5.1. Vendors grant the marketplace a non-exclusive license to use product images, descriptions, and other content for marketing and promotional purposes.</li>
              <li>5.2. Vendors must own or have the legal right to use the content they upload.</li>
            </ul>
          </div>
    
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">6. Termination</h2>
            <ul className="list-disc pl-6">
              <li>6.1. The marketplace reserves the right to terminate vendor accounts for violations of these terms.</li>
              <li>6.2. Vendors may deactivate their accounts at any time, but outstanding obligations must be fulfilled.</li>
            </ul>
          </div>
    
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">7. Liability</h2>
            <ul className="list-disc pl-6">
              <li>7.1. The marketplace is not liable for disputes between vendors and customers.</li>
              <li>7.2. The marketplace does not guarantee the accuracy or completeness of vendor listings.</li>
            </ul>
          </div>
    
          <p className="italic mb-4">
            By agreeing to these terms, you acknowledge that you have read, understood, and accepted them in their entirety.
          </p>
    
          <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
    
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">1. Information We Collect</h2>
            <ul className="list-disc pl-6">
              <li>1.1. Personal Information: Name, email, phone number, and address.</li>
              <li>1.2. Business Information: Business name, description, product or service details.</li>
              <li>1.3. Payment Information: Bank account details for payouts.</li>
            </ul>
          </div>
    
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6">
              <li>2.1. To verify your identity and eligibility as a vendor.</li>
              <li>2.2. To process transactions and payouts.</li>
              <li>2.3. To communicate important updates and promotional offers.</li>
              <li>2.4. To improve the functionality of the platform.</li>
            </ul>
          </div>
    
          <p className="text-sm mt-4 text-gray-600">
            For questions or concerns, please contact <a href="mailto:support@example.com" className="text-blue-600 underline">support@example.com</a>.
          </p>
        </div>
    )

    return isUpdate ? (
        // UPDATE PROFILE FORM
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
                disabled={!hasChanges || form.formState.isSubmitting}
                className="button col-span-2 w-full"
                >
                    {form.formState.isSubmitting ? (
                        'Submitting...'
                    ): `Update Profile`}
                </Button>
            </form>
        </Form>
    ) : (
        // VENDOR REGISTRATION
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onRegistration)} className="flex flex-col gap-5 py-5">
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
                 <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="terms"
                        className="checkbox"
                        onChange={handleCheckboxChange}
                    />
                    <label
                        className="flex gap-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Accept 
                        <Dialog>
                        <DialogTrigger asChild>
                            <p className='underline'>terms and conditions</p>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                            <DialogTitle>Terms and Conditions for Moore Vendors</DialogTitle>
                            <DialogDescription>
                            <ScrollArea className="h-[400px] w-full pr-4">
                                {termsCondition}
                            </ScrollArea>
                            </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                        </Dialog>
                    </label>
                </div>
                <Button
                    type="submit"
                    size="lg"
                    disabled={!isTermsAccepted || form.formState.isSubmitting}
                    className="button col-span-2 w-full"
                >
                    {form.formState.isSubmitting ? 'Submitting...' : `Process`}
                </Button>
            </form>
        </Form>
    )
}

export default ProfileForm

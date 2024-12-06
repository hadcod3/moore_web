"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { TbEdit, TbTransform } from 'react-icons/tb'
import { IUser } from '@/lib/database/models/user.model'
import ProfileForm from './ProfileForm'

interface UpdateProfileProps {
    userData: IUser
    isUpdate: boolean
}

const UpdateProfile = ({ userData, isUpdate } : UpdateProfileProps) => {

    return (
        <Dialog>
            <DialogTrigger>
                {isUpdate ? (
                    <div className='h-full button-ic'>
                        <TbEdit size={20}/>
                        Edit Profile
                    </div>
                ):(
                    <div className='h-full button-ic'>
                        <TbTransform size={20}/>
                        Be Vendor
                    </div>
                )}
            </DialogTrigger>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    {isUpdate ? (
                        "Edit Profile"
                    ):(
                        "Become a Vendor"
                    )}
                </DialogTitle>
                <DialogDescription>
                    <div className={`${!isUpdate ? ("h-fit") : ("h-96 overflow-y-scroll overflow-x-hidden styled-scrollbar pr-3")}`}>
                        <ProfileForm userId={userData._id} userData={userData} isUpdate={isUpdate}/>
                    </div>
                </DialogDescription>
            </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfile
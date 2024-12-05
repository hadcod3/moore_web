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
import { TbEdit } from 'react-icons/tb'
import { IUser } from '@/lib/database/models/user.model'
import ProfileForm from './ProfileForm'

interface EditProfileProps {
    userData: IUser
}

const EditProfile = ({ userData } : EditProfileProps) => {

    return (
        <Dialog>
            <DialogTrigger>
                <div className='h-full button-ic'>
                    <TbEdit size={20}/>
                    Edit Profile
                </div>
            </DialogTrigger>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                    <div className='h-96 overflow-y-scroll overflow-x-hidden styled-scrollbar'>
                        <ProfileForm userId={userData._id} userData={userData}/>
                    </div>
                </DialogDescription>
            </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default EditProfile
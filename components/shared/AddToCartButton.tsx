"use client"

import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import Checkout from './Checkout'
import Image from 'next/image'
import { IItem } from '@/lib/database/models/item.model'

type ButtonProps = {
    buttonType?: 'Packet' | 'Product' | 'Gear';
}

const AddToCartButton = (
    { 
        value, buttonType, amount 
    } : { 
        buttonType: ButtonProps['buttonType'], 
        value: IItem, 
        amount: number
    }) => {

    const { user } = useUser();
    const userId = user?.publicMetadata.userId as string;
 
    return (
        <div className="flex items-center gap-3 ">
            <Button type="submit" role="link" size="lg" className="flex gap-1 p-medium-18 rounded-lg sm:w-fit text-primary-500 font-bold border-2 border-primary-400">
                <Image
                    src={"/assets/icons/cart-outline.svg"}
                    alt="like button"
                    width={20}
                    height={20}
                />
                <div>Add to Cart</div>
            </Button>
        </div>
    )
}

export default AddToCartButton
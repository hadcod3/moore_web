"use client"

import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import Checkout from './Checkout'
import { IItem } from '@/lib/database/models/item.model'

type ButtonProps = {
    buttonType?: 'Rent' | 'Buy';
}

const CheckoutButton = (
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
            <>
                <SignedOut>
                    <Button asChild className="button rounded-full" size="lg">
                        <Link href="/sign-in">
                            Sign in
                        </Link>
                    </Button>
                </SignedOut>

                <SignedIn>
                    <Checkout value={value as IItem} userId={userId} isRent={true} amount={amount}/>
                </SignedIn>
            </>
        </div>
    )
}

export default CheckoutButton
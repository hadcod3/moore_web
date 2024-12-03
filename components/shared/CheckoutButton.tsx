"use client"
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import Checkout from './Checkout'
import { IItem } from '@/lib/database/models/item.model'

const CheckoutButton = ({ value  } : {value: IItem}) => {

    const { user } = useUser();
    const buyerId = user?.publicMetadata.userId as string;
 
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
                    <Checkout item={value} buyerId={buyerId}/>
                </SignedIn>
            </>
        </div>
    )
}

export default CheckoutButton
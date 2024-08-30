"use client"

import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import Checkout from './Checkout'
import { IPacket } from '@/lib/database/models/packet.model';
import { IProduct } from '@/lib/database/models/product.model';
import { IGear } from '@/lib/database/models/gear.model';

type ButtonProps = {
    buttonType?: 'Packet' | 'Product' | 'Gear';
}

const CheckoutButton = (
    { 
        value, buttonType, amount 
    } : { 
        buttonType: ButtonProps['buttonType'], 
        value: IPacket | IProduct | IGear, 
        amount: number

    // packet: IPacket 


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
                    {/* <Checkout value={value} userId={userId} /> */}
                    {buttonType === 'Packet' && (
                        <Checkout value={value as IPacket} userId={userId} isRent={true} amount={amount}/>
                    )}
                    {buttonType === 'Product' && (
                        <Checkout value={value as IProduct} userId={userId} isRent={false} amount={amount}/>
                    )}
                    {buttonType === 'Gear' && (

                        // <Checkout value={value as IGear} userId={userId} isRent={true} amount={amount}/>

                        <Checkout value={value as IGear} userId={userId} isRent={false} amount={amount}/>

                    )}
                </SignedIn>
            </>
        </div>
    )
}

export default CheckoutButton
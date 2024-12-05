
import React from 'react'
import { IoNotificationsOutline, IoReceiptOutline } from 'react-icons/io5'
import { BsCart3 } from 'react-icons/bs'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';

const HeaderAction = () => {
    const { user } = useUser();
    const userId = user?.publicMetadata.userId as string;
    const router = useRouter();
 
    return (
        <div className="flex items-center mr-3">
            <div className="relative flex gap-x-6 items-center justify-center">
                <button onClick={() => router.push(`/profile`)}>
                    <IoNotificationsOutline size={24} />
                </button>
                <button onClick={() => router.push(`/transaction`)}>
                    <IoReceiptOutline size={24} />
                </button>
                <button onClick={() => router.push(`/cart`)}>
                    <BsCart3 size={24} />
                </button>
            </div>
        </div>
    )
}

export default HeaderAction
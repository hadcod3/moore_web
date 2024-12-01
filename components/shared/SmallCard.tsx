'use client'
import Link from 'next/link'
import React from 'react'
import { DeleteConfirmation } from './DeleteConfirmation'
import { IItem } from '@/lib/database/models/item.model'
import Image from 'next/image'
import { BsClipboardCheck } from "react-icons/bs";

type ProductProps = {
    isOrganizer: boolean
    item: IItem
}

const SmallCard = ({ item, isOrganizer }: ProductProps) => {
    
    return (
        <div className="relative flex min-h-[270px] w-[180px] flex-col overflow-hidden rounded-[15px] bg-white shadow-lg border border-gray-100">
            <Link 
                href={`/items/${item._id}`}
                style={{backgroundImage: `url(${item.imageUrl})`}}
                className="flex-center flex-grow bg-gray-50 bg-cover bg-no-repeat bg-center text-grey-500 w-full max-h-[180px]"
            />

            {isOrganizer && (
                <div className="absolute right-2 top-2 flex flex-col items-center gap-4 rounded-xl bg-white/30 p-3 backdrop-blur-lg shadow-sm transition-all">
                    <Link href={`/items/${item._id}/update`}>
                        <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
                    </Link>
                    <Link href={`/profile/orders/items/${item._id}`}>
                        <BsClipboardCheck size={20} color='#000000'/>
                    </Link>
                    <DeleteConfirmation id={item._id} />
                </div>
            )}

            <div className="flex max-h-[130px] flex-col gap-1 p-2 md:gap-1"> 
                <Link href={`/items/${item._id}`}>
                    <p className="p-medium-16 line-clamp-1 flex-1 text-secondary-300 capitalize">{item.name}</p>
                </Link>
                <span className="font-semibold text-base text-secondary-400 font-aleo">
                    Rp {item.price.toLocaleString('id-ID')}
                </span>
                <div className="flex-between w-full">
                <p className="p-medium-14 text-primary-200">
                    Stock: {item.stock}
                </p>
                </div>
            </div>
        </div>
    )
}

export default SmallCard
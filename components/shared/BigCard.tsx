'use client'
import Link from 'next/link'
import React from 'react'
import { DeleteConfirmation } from './DeleteConfirmation'
import { IItem } from '@/lib/database/models/item.model'
import Image from 'next/image'
import { BsClipboardCheck } from 'react-icons/bs'

type PacketProps = {
    isOrganizer: boolean
    item: IItem
}
 
const BigCard = async ({ item, isOrganizer }: PacketProps) => {
    // const organizerProfile = await getUserById(item.organizer._id);

    return (
        <div className="group relative flex min-h-[350px] w-full max-w-[400px] flex-col overflow-hidden rounded-[15px] bg-white shadow-lg border border-gray-100">
        
            <div className='absolute top-2 left-2 '>
                <p className="p-semibold-14 px-4 py-1 text-white line-clamp-1 rounded-xl bg-black/30">
                    {item.category?.name}
                </p>
            </div>

            <Link 
                href={`/items/${item._id}`}
                style={{backgroundImage: `url(${item.imageUrl})`}}
                className="flex-center flex-grow bg-gray-50 bg-cover bg-center rounded-t-[15px] text-grey-100 shadow-inner-bold"
            />

            {isOrganizer && (
                <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white/30 p-3 backdrop-blur-lg shadow-sm transition-all">
                    <Link href={`/items/${item._id}/update`}>
                        <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
                    </Link>
                    <Link href={`/profile/orders/items/${item._id}`}>
                        <BsClipboardCheck size={20} color='#000000'/>
                    </Link>
                    <DeleteConfirmation id={item._id}/>
                </div>
            )}

            <div className="flex min-h-[150px] flex-col gap-2 p-3 border-r-[0.05px] border-l-[0.05px]">
                <h5 className='text-base font-playfair text-primary-300'>{item.organizer.firstName} {item.organizer.lastName} ~ {item.organizer.city}</h5>
                <Link href={`/items/${item._id}`}>
                    <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-secondary-400">{item.name}</p>
                </Link>
                <h1 className="p-bold-20 md:p-bold-24 text-secondary-400 font-aleo">Rp {item.price.toLocaleString('id-ID')}</h1>
            </div>
        </div>
    )
}

export default BigCard


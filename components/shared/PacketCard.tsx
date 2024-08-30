import { IPacket } from '@/lib/database/models/packet.model'
import Link from 'next/link'
import React, { useState } from 'react'
import { auth } from '@clerk/nextjs'
import { DeleteConfirmation } from './DeleteConfirmation'
import Image from 'next/image'
import { getUserById } from '@/lib/actions/user.actions';
import { LikeButton } from './LikeButton'


type PacketProps = {
    item: IPacket,
    organized: boolean,
}

const PacketCard = async ({ item, organized }: PacketProps) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
    const isOrganizer = userId === item.organizer._id.toString();
    const organizerProfile = await getUserById(item.organizer._id);
    
    return (
        <div className="group relative flex min-h-[350px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg">
            <Link 
                href={`/packets/${item._id}`}
                style={{backgroundImage: `url(${item.imageUrl})`}}
                className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
            />

            {/* IS PACKET ORGANIZER */}
            {isOrganizer && organized === true && (
                <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white/30 p-3 backdrop-blur-lg shadow-sm transition-all">
                    <Link href={`/packets/${item._id}/update`}>
                        <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
                    </Link>
                    <DeleteConfirmation itemId={item._id} deleteType="Packet"/>
                </div>
            )}

            {organized === false && (
                <LikeButton/>
            ) }


            <div className="flex min-h-[150px] flex-col gap-2 p-3">
                <div className="flex gap-2">
                    <span className="p-semibold-14 rounded-full border-b border-primary-100 px-4 py-1  text-primary-300">
                        {organizerProfile.username}
                    </span>
                    <p className="p-semibold-14 rounded-full border-b border-primary-100 px-4 py-1 text-primary-300 line-clamp-1">
                        {item.category?.name}
                    </p>
                </div>
                <Link href={`/packets/${item._id}`}>
                    <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-secondary-400">{item.title}</p>
                </Link>
                <p className="p-bold-20 md:p-bold-24 text-secondary-400 font-aleo">Rp {parseInt(item.price).toLocaleString()}</p>
            </div>
        </div>
    )
}

export default PacketCard
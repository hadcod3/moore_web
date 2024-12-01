'use client'
import Image from "next/image"
import { MdLocationPin } from "react-icons/md";
import Link from "next/link";
import { IUser } from "@/lib/database/models/user.model";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type VendorProps = {
    data: IUser
}

const VendorCard = ({ data } : VendorProps) => {
    const router = useRouter();
    return (
        <div className='flex flex-wrap gap-2 justify-between items-center p-3 rounded-md bg-grey-100/60 border border-gray-200'>
            <div className='flex gap-3'>
                <Image
                src={data.photo}
                alt="avatar"
                width={50}
                height={50}
                className="object-cover object-center rounded-full"
                />
                <div className='flex flex-col'>
                    <p className='p-medium-20 text-secondary-300 capitalize'>{data.firstName} {data.lastName}</p>
                    <p className='text-sm text-primary-500 flex '><MdLocationPin size={20} />{data.city}</p>
                </div>
            </div>
            <div className='flex gap-1 items-center'>
                <Button onClick={() => router.push(`/vendors/${data._id}`)} className='p-medium-16 text-white bg-primary-400 w-[120px] border-2 border-primary-400 rounded-[10px]'>Profil</Button>
            </div>
        </div>
    )
}

export default VendorCard
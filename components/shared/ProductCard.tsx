import { IProduct } from '@/lib/database/models/product.model'
import Link from 'next/link'
import React from 'react'
import { auth } from '@clerk/nextjs'
import { DeleteConfirmation } from './DeleteConfirmation'
import Image from 'next/image'
import { LikeButton } from './LikeButton'

type ProductProps = {
    item: IProduct,
    organized: boolean,
}

const ProductCard = ({ item, organized }: ProductProps) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
    const isOrganizer = userId === item.organizer._id.toString();
    
    return (
        <div className="relative flex min-h-[270px] w-[180px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg ">
            <Link 
                href={`/products/${item._id}`}
                style={{backgroundImage: `url(${item.imageUrl})`}}
                className="flex-center flex-grow bg-gray-50 bg-cover bg-no-repeat bg-center text-grey-500 w-full max-h-[180px]"
            />

            {/* IS item ORGANIZER */}
            {isOrganizer && organized === true && (

                <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl  bg-white/30 p-3 backdrop-blur-lg shadow-sm transition-all">

                    <Link href={`/products/${item._id}/update`}>
                        <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
                    </Link>
                    <DeleteConfirmation itemId={item._id} deleteType="Product"/>
                </div>
            )}

            {organized === false && (
                <LikeButton/>
            )}

            <div className="flex max-h-[130px] flex-col gap-1 p-2 md:gap-1"> 
                <Link href={`/products/${item._id}`}>
                    <p className="p-medium-16 line-clamp-1 flex-1 text-primary-300 capitalize">{item.title}</p>
                </Link>
                <span className="font-semibold text-base text-primary-500 font-aleo">
                    Rp {parseInt(item.price).toLocaleString()}
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

export default ProductCard
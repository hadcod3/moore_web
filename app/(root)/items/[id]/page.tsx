import CheckoutButton from '@/components/shared/CheckoutButton';
import { SearchParamProps } from '@/types'
import Image from 'next/image';
import { auth } from '@clerk/nextjs'
import { getUserById } from '@/lib/actions/user.actions';
import { Button } from '@/components/ui/button';
import VendorCard from '@/components/shared/VendorCard';
import { getItemById } from '@/lib/actions/item.actions';

const ItemDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
    const item = await getItemById(id);
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
    const isOrganizer = userId === item.organizer._id;
    const organizerProfile = await getUserById(item.organizer._id);

    return (
        <>
            <div className="py-10 px-3">
                <section className="flex justify-center content-start">
                    <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl gap-8">
                        <div className='flex justify-center'>
                            <Image 
                            src={item.imageUrl}
                            alt="item thumbnail"
                            width={1000}
                            height={1000}
                            className="h-full min-h-[300px] object-cover object-center"/>
                        </div>
                        <div className="flex w-full flex-col gap-3">
                            <div className="flex flex-col gap-3">
                                <div className='flex gap-2'>
                                    <p className="w-fit px-4 p-1 border border-gray-100 bg-gray-50 rounded-2xl">
                                        {item.type.name}
                                    </p>
                                    <p className="w-fit px-4 p-1 border border-gray-100 bg-gray-50 rounded-2xl">
                                        {item.category.name}
                                    </p>
                                </div>
                                <h2 className='font-medium text-[24px] text-secondary-300'>{item.name}</h2>
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                    <div className="flex flex-col gap-3">
                                        <p className="text-[32px] font-bold text-secondary-400 font-aleo">
                                            Rp {parseInt(item.price).toLocaleString()}
                                        </p> 
                                        <div className="flex flex-col">
                                            <p className="text-base text-gray-400">Min. Order : {item.minOrder}</p>
                                            <p className="text-base text-gray-400">Stock : {item.stock}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {!isOrganizer && (
                                <CheckoutButton value={item}/>
                            )}

                            <div className="flex flex-col gap-1">
                                <p className="p-bold-20 text-secondary-400">Description:</p>
                                <p className="p-medium-16 lg:p-regular-18 text-secondary-300">{item.description}</p>
                            </div>
                            <VendorCard data={organizerProfile}/>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default ItemDetails
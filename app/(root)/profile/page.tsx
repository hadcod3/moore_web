import GearCollection from '@/components/shared/GearCollection'
import PacketCollection from '@/components/shared/PacketCollection'
import ProductCollection from '@/components/shared/ProductCollection'
import VerificationButton from '@/components/shared/VerificationButton'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/toaster'
import { getGearsByUser } from '@/lib/actions/gear.actions'
import { getOrdersByUser } from '@/lib/actions/order.actions'
import { getPacketsByUser } from '@/lib/actions/packet.actions'
import { getProductsByUser } from '@/lib/actions/product.actions'
import Link from 'next/link'
import React from 'react'
import { getUserById } from '@/lib/actions/user.actions'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs'
import Image from 'next/image'
    

const Profile = async ({ searchParams }: SearchParamProps) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    const ordersPage = Number(searchParams?.ordersPage) || 1;
    const packetsPage = Number(searchParams?.packetsPage) || 1;
    const productsPage = Number(searchParams?.productsPage) || 1;
    const gearsPage = Number(searchParams?.gearsPage) || 1;
    const orders = await getOrdersByUser({ userId, page: ordersPage})
    const organizedPackets = await getPacketsByUser({ userId, page: packetsPage })
    const organizedProducts = await getProductsByUser({ userId, page: productsPage })
    const organizedGears = await getGearsByUser({ userId, page: gearsPage })
    const profile = await getUserById(userId) 

    return (
        <>
            {/* PROFILE SECTION */}
            <section className='wrapper flex gap-5 py-5 md:py-10 w-14'>
                <Image
                    src={profile.photo}
                    alt="add packet"
                    width={150}
                    height={150}
                    className="text-primary-500 rounded-3xl"
                />
                <div className=' flex flex-col justify-between'>
                    <div>
                        <div className='flex gap-2'>
                            <h3 className='h2-bold capitalize text-primary-500'>{profile.firstName}</h3>
                            <h3 className='h2-bold capitalize text-primary-500'>{profile.lastName}</h3>
                        </div>
                        <h5 className='h5-medium'>{profile.email}</h5>
                    </div>
                    {/* <h2>{profile.username}</h2> */}
                    <VerificationButton userId={userId}/>
                </div>
            </section>

            {/* PACKETS CONTAINER START */} 
            
            <section className="bg-grey-100/50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <div className="wrapper flex items-center justify-center sm:justify-between">
                    <h3 className='h3-bold text-center sm:text-left text-secondary-300'>Packets Organized</h3>
                    <Button size="lg" className="button-ic">
                        <Link href="/packets/create">
                            Add Packet +

                        </Link>
                    </Button>
                </div>
            </section>

            <section className="wrapper my-8">
                <PacketCollection 
                data={organizedPackets?.data}
                emptyTitle="No packets have been created yet"
                emptyStateSubtext="Go create some now"
                collectionType="Packets_Organized"
                limit={3}
                page={packetsPage}
                urlParamName="packetsPage"
                totalPages={organizedPackets?.totalPages}
                />
            </section>
            
            {/* PACKETS CONTAINER END*/}

            {/* PRODUCTS CONTAINER START */}

            <section className="bg-grey-100/50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <div className="wrapper flex items-center justify-center sm:justify-between">
                    <h3 className='h3-bold text-center sm:text-left text-secondary-300'>Products Organized</h3>
                    <Button size="lg" className="button-ic">
                        <Link href="/products/create">
                            Add Product +

                        </Link>
                    </Button>
                </div>
            </section>

            <section className="wrapper my-8">
                <ProductCollection 
                data={organizedProducts?.data}
                emptyTitle="No products have been created yet"
                emptyStateSubtext="Go create some now"
                collectionType="Products_Organized"
                limit={5}
                page={productsPage}
                urlParamName="productsPage"
                totalPages={organizedProducts?.totalPages}
                />
            </section>

            {/* PRODUCTS CONTAINER END*/}

            {/* GEARS CONTAINER START */}

            <section className="bg-grey-100/50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <div className="wrapper flex items-center justify-center sm:justify-between">
                    <h3 className='h3-bold text-center sm:text-left text-secondary-300'>Gears Organized</h3>
                    <Button size="lg" className="button-ic">
                        <Link href="/gears/create">
                            Add Gear +

                        </Link>
                    </Button>
                </div>
            </section>

            <section className="wrapper my-8">
                <GearCollection 
                data={organizedGears?.data}
                emptyTitle="No gears have been created yet"
                emptyStateSubtext="Go create some now"
                collectionType="Gears_Organized"
                limit={5}
                page={gearsPage}
                urlParamName="gearsPage"
                totalPages={organizedGears?.totalPages}
                />
            </section>

            {/* GEARS CONTAINER END*/}

            <Toaster/>

        </>
    )
}

export default Profile


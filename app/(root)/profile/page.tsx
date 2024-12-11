
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { getUserById } from '@/lib/actions/user.actions'
import Image from 'next/image'
import { MdAlternateEmail } from "react-icons/md";
import { RxSewingPin } from "react-icons/rx";
import { getItemsByOrganizerId } from '@/lib/actions/item.actions'
import Collection from '@/components/shared/Collection'
import { TbTransform } from "react-icons/tb";
import AbandonedPage from '@/components/shared/AbandonedPage'
import { IUser } from '@/lib/database/models/user.model'
import { BsClipboardCheck } from 'react-icons/bs'
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import TableOrders from '@/components/shared/TableOrders'
import { getTransactionByBuyerId } from '@/lib/actions/transaction.actions'
import { getCurrentUserId } from '@/lib/utils_server'
import { getNotificationByToId } from '@/lib/actions/notification.actions'
import NotificationModal from '@/components/shared/NotificationModal'
import { HiOutlinePlus } from 'react-icons/hi2'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import UpdateProfile from '@/components/shared/UpdateProfile'

const Profile = async () => {

    const userId = getCurrentUserId();
    const profile : IUser = await getUserById(userId as string);
    const notificationData = await getNotificationByToId(userId as string)
    
    const fetchItemsByVendor = async ({ organizerId, typeId}: { organizerId: string; typeId: string;}) => {
        try {
        const items = await getItemsByOrganizerId({organizerId, typeId});
        return items?.data || [];
        } catch (error) {
        return [];
        }
    };
    
    const packetTypeId = "6717aa0a78fed7ee045a8402" // ID of packet type
    const productTypeId = "6717aa0a78fed7ee045a8403" // ID of product type
    const gearTypeId = "6717aa0a78fed7ee045a8401" // ID of gear type

    if(!profile){
        return <AbandonedPage/>
    }

    const organizedPackets = await fetchItemsByVendor({
        organizerId: profile._id,
        typeId: packetTypeId,
    })
    const organizedProducts = await fetchItemsByVendor({
        organizerId: profile._id,
        typeId: productTypeId,
    })
    const organizedGears = await fetchItemsByVendor({
        organizerId: profile._id,
        typeId: gearTypeId,
    })
    
    const transactionData = await getTransactionByBuyerId(userId as string)

    return (
        <>
            {/* PROFILE SECTION */}
            <section className='wrapper flex justify-between items-center'>
                <div className='flex gap-5 py-5 md:py-10'>
                    <Image
                        src={profile.photo}
                        alt="add packet"
                        width={150}
                        height={150}
                        className="text-primary-500 rounded-3xl"
                    />
                    <div className=' flex flex-col justify-between'>
                        <div className="w-fit py-2 px-5 border border-gray-200 bg-gray-50 rounded-2xl shadow-sm">
                            <div className='flex gap-2'>
                                <h3 className='h2-bold capitalize text-secondary-300 font-playfair'>{profile.firstName}</h3>
                                <h3 className='h2-bold capitalize text-secondary-300 font-playfair'>{profile.lastName}</h3>
                            </div>
                            <div className='flex gap-2 opacity-80'>
                                <div className='flex gap-1 items-center'>
                                    <MdAlternateEmail size={20} />
                                    <h5 className='h5-medium text-base font-medium'>{profile.email}</h5>
                                </div>
                                {profile.city && (
                                <div className='flex gap-1 items-center'>
                                    <RxSewingPin size={20} />
                                    <h5 className='h5-medium text-base font-medium'>{profile.city}</h5>
                                </div>
                                )}
                            </div>
                        </div>
                        <div className='flex space-x-3'>
                            {!profile.isVendor && (
                                <UpdateProfile userData={profile} isUpdate={false}/>
                            )}
                            <UpdateProfile userData={profile} isUpdate={true}/>
                            {profile.isVendor && (
                                <Button size="lg" className="button-ic">
                                    <BsClipboardCheck size={20}/>
                                    <Link href="/profile/orders">
                                        Orders
                                    </Link>
                                </Button>
                            )}
                            <NotificationModal value={notificationData}/>
                        </div>
                    </div>
                </div>
            </section>
            {profile.isVendor &&(
                <div className="h-fit flex justify-center items-center gap-x-4 pb-10">
                    <div className="w-60 h-20 bg-gray-50 flex items-center border border-gray-100 rounded-2xl p-4 gap-x-3 shadow-sm overflow-hidden">
                        <div className='p-4 flex items-center justify-center rounded-full bg-gray-100'>
                            <Image
                                src="/assets/icons/ic_packet.png"
                                alt="packet"
                                width={20}
                                height={20}
                            />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold">{organizedPackets.length}</h1>
                            <p className='text-sm'>Packets Organized</p>
                        </div>
                    </div>
                    <div className="w-60 h-20 bg-gray-50 flex items-center border border-gray-100 rounded-2xl p-4 gap-x-3 shadow-sm overflow-hidden">
                        <div className='p-4 flex items-center justify-center rounded-full bg-gray-100'>
                            <Image
                                src="/assets/icons/ic_product.png"
                                alt="packet"
                                width={20}
                                height={20}
                            />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold">{organizedProducts.length}</h1>
                            <p className='text-sm'>Products Organized</p>
                        </div>
                    </div>
                    <div className="w-60 h-20 bg-gray-50 flex items-center border border-gray-100 rounded-2xl p-4 gap-x-3 shadow-sm overflow-hidden">
                        <div className='p-4 flex items-center justify-center rounded-full bg-gray-100'>
                            <Image
                                src="/assets/icons/ic_gear.png"
                                alt="packet"
                                width={20}
                                height={20}
                            />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold">{organizedGears.length}</h1>
                            <p className='text-sm'>Gears Organized</p>
                        </div>
                    </div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Link href={"/items/create"} className="relative w-20 h-20 bg-gray-50 flex items-center border border-gray-100 rounded-2xl p-4 gap-x-3 shadow-sm overflow-hidden">
                                    <div className='p-4 flex items-center justify-center rounded-full bg-gray-100'>
                                        <HiOutlinePlus />
                                    </div>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                            <p>Add Items</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            )}

            {!profile.isVendor ? (
                <>
                    <div className="wrapper flex justify-between">
                        <div>
                            <h2 className="h2-bold font-playfair">Transaction</h2>
                        </div>
                    </div>
                    <section className="wrapper mt-8">
                        <Table>
                            <TableCaption>A list of your recent transaction.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Item Name</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Total Amount</TableHead>
                                    <TableHead>Shipping Address</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead>For Date</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableOrders
                                data={transactionData}
                                emptyTitle="No Transaction Found"
                                emptyStateSubtext="Check later"
                                model="Transaction"
                                />
                            </TableBody>
                        </Table>
                    </section>
                </>
            ) : (
                <>
                    {/* PACKETS CONTAINER START */}

                    {organizedPackets.length > 0 && profile.isVendor && (
                        <>
                            <section className="bg-grey-100/50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                                <div className="wrapper flex justify-center">
                                    <h3 className='h3-bold text-center sm:text-left text-secondary-300'>Packets Organized</h3>
                                </div>
                            </section>

                            <section className="wrapper my-8">
                                <Collection
                                data={organizedPackets}
                                emptyTitle="No Packets Found"
                                emptyStateSubtext="Check later"
                                collectionType="Packet"
                                collectionModel="isOrganizer"
                                limit={15}
                                page={1}
                                totalPages={organizedPackets?.totalPages}
                                />
                            </section>
                        </>
                    )}
                    
                    {/* PACKETS CONTAINER END*/}

                    {/* PRODUCTS CONTAINER START */}

                    {organizedProducts.length > 0 && profile.isVendor && (
                        <>
                            <section className="bg-grey-100/50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                                <div className="wrapper flex justify-center">
                                    <h3 className='h3-bold text-center sm:text-left text-secondary-300'>Products Organized</h3>
                                </div>
                            </section>

                            <section className="wrapper my-8">
                                <Collection
                                data={organizedProducts}
                                emptyTitle="No Products Found"
                                emptyStateSubtext="Check later"
                                collectionType="Product"
                                collectionModel="isOrganizer"
                                limit={15}
                                page={1}
                                totalPages={organizedProducts?.totalPages}
                                />
                            </section>
                        </>
                    )}


                    {/* PRODUCTS CONTAINER END*/}

                    {/* GEARS CONTAINER START */}

                    {organizedGears.length > 0 && profile.isVendor && (
                        <>
                            <section className="bg-grey-100/50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                                <div className="wrapper flex justify-center">
                                    <h3 className='h3-bold text-center sm:text-left text-secondary-300'>Gears Organized</h3>
                                </div>
                            </section>

                            <section className="wrapper my-8">
                                <Collection
                                data={organizedGears}
                                emptyTitle="No Gears Found"
                                emptyStateSubtext="Check later"
                                collectionType="Gear"
                                collectionModel="isOrganizer"
                                limit={15}
                                page={1}
                                totalPages={organizedGears?.totalPages}
                                />
                            </section>
                        </>
                    )}

                    {/* GEARS CONTAINER END*/}
                </>
            )}
        </>
    )
}

export default Profile


import { SearchParamProps } from '@/types'
import Image from 'next/image';
import { getUserById } from '@/lib/actions/user.actions';
import { getItemsByOrganizerId } from '@/lib/actions/item.actions';
import { MdAlternateEmail } from "react-icons/md";
import { RxSewingPin } from "react-icons/rx";
import Collection from '@/components/shared/Collection';

const PackageDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
    const vendorProfile = await getUserById(id)

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

    const organizedPackets = await fetchItemsByVendor({
        organizerId: id,
        typeId: packetTypeId,
    })
    const organizedProducts = await fetchItemsByVendor({
        organizerId: id,
        typeId: productTypeId,
    })
    const organizedGears = await fetchItemsByVendor({
        organizerId: id,
        typeId: gearTypeId,
    })

    return (
        <>
            <div className='wrapper flex flex-col gap-8'>

                <Image
                    src={"/assets/images/vendor_banner.jpg"}
                    alt="banner"
                    width={2000}
                    height={150}
                    className='object-cover object-center w-full h-44 rounded-3xl'
                />

                <div className='w-full flex justify-between'>
                    <div className='flex gap-4'>
                        <Image
                            src={vendorProfile.photo}
                            alt="ava"
                            width={120}
                            height={120}
                            className='w-32 h-32 rounded-full overflow-hidden'
                        />
                        <div className="w-fit py-2 px-5 border border-gray-200 bg-gray-50 rounded-2xl shadow-sm">
                            <div className='flex gap-2'>
                                <h3 className='h2-bold capitalize text-secondary-300 font-playfair'>{vendorProfile.firstName}</h3>
                                <h3 className='h2-bold capitalize text-secondary-300 font-playfair'>{vendorProfile.lastName}</h3>
                            </div>
                            <div className='flex flex-col opacity-80'>
                                <div className='flex gap-1 items-center'>
                                    <MdAlternateEmail size={20} />
                                    <h5 className='h5-medium text-base font-medium'>{vendorProfile.email}</h5>
                                </div>
                                <div className='flex gap-1 items-center'>
                                    <RxSewingPin size={20} />
                                    <h5 className='h5-medium text-base font-medium'>{vendorProfile.city}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-x-4">
                        <div className="w-28 h-32 flex flex-col items-center border border-gray-100 rounded-2xl bg-gray-50 p-4 pt-2 shadow-sm overflow-hidden">
                            <div className='relative p-2 flex items-center justify-center rounded-full border border-gray-100 shadow-inner'>
                                <Image
                                    src="/assets/icons/ic_packet.png"
                                    alt="packet"
                                    width={14}
                                    height={14}
                                />
                            </div>
                            <h1 className="text-[36px] font-semibold">{organizedPackets.length}</h1>
                            <p className='text-base font-semibold'>Packets</p>
                        </div>
                        <div className="w-28 h-32 flex flex-col items-center border border-gray-100 rounded-2xl bg-gray-50 p-4 pt-2 shadow-sm overflow-hidden">
                            <div className='relative p-2 flex items-center justify-center rounded-full border border-gray-100 shadow-inner'>
                                <Image
                                    src="/assets/icons/ic_product.png"
                                    alt="product"
                                    width={14}
                                    height={14}
                                />
                            </div>
                            <h1 className="text-[36px] font-semibold">{organizedProducts.length}</h1>
                            <p className='text-base font-semibold'>Product</p>
                        </div>
                        <div className="w-28 h-32 flex flex-col items-center border border-gray-100 rounded-2xl bg-gray-50 p-4 pt-2 shadow-sm overflow-hidden">
                            <div className='relative p-2 flex items-center justify-center rounded-full border border-gray-100 shadow-inner'>
                                <Image
                                    src="/assets/icons/ic_gear.png"
                                    alt="gear"
                                    width={14}
                                    height={14}
                                />
                            </div>
                            <h1 className="text-[36px] font-semibold">{organizedGears.length}</h1>
                            <p className='text-base font-semibold'>Gears</p>
                        </div>
                    </div>
                </div>

                {/* PACKETS CONTAINER START */}

                {organizedPackets.length > 0 && (
                    <>
                        <h2 className="h2-bold text-center text-secondary-300 font-playfair">~ Packets ~</h2>

                        <section className="wrapper my-8">
                            <Collection
                            data={organizedPackets}
                            emptyTitle="No Packets Found"
                            emptyStateSubtext="Check later"
                            collectionType="Packet"
                            collectionModel="Full_Content"
                            limit={15}
                            page={1}
                            totalPages={organizedPackets?.totalPages}
                            />
                        </section>
                    </>
                )}
                
                {/* PACKETS CONTAINER END*/}

                {/* PRODUCTS CONTAINER START */}

                {organizedProducts.length > 0 && (
                    <>
                        <h2 className="h2-bold text-center text-secondary-300 font-playfair">~ Products ~</h2>

                        <section className="wrapper my-8">
                            <Collection
                            data={organizedProducts}
                            emptyTitle="No Products Found"
                            emptyStateSubtext="Check later"
                            collectionType="Product"
                            collectionModel="Full_Content"
                            limit={15}
                            page={1}
                            totalPages={organizedProducts?.totalPages}
                            />
                        </section>
                    </>
                )}


                {/* PRODUCTS CONTAINER END*/}

                {/* GEARS CONTAINER START */}

                {organizedGears.length > 0 && (
                    <>
                        <h2 className="h2-bold text-center text-secondary-300 font-playfair">~ Products ~</h2>

                        <section className="wrapper my-8">
                            <Collection
                            data={organizedGears}
                            emptyTitle="No Gears Found"
                            emptyStateSubtext="Check later"
                            collectionType="Gear"
                            collectionModel="Full_Content"
                            limit={15}
                            page={1}
                            totalPages={organizedGears?.totalPages}
                            />
                        </section>
                    </>
                )}

                {/* GEARS CONTAINER END*/}
            </div>

        </>
    )
}

export default PackageDetails
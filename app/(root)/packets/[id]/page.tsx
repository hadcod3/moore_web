import CheckoutButton from '@/components/shared/CheckoutButton';
import PacketCollection from '@/components/shared/PacketCollection';
import { getPacketById, getRelatedPacketsByCategory } from '@/lib/actions/packet.actions'
import { SearchParamProps } from '@/types'
import Image from 'next/image';
import { auth } from '@clerk/nextjs'
import { getUserById } from '@/lib/actions/user.actions';
import { Button } from '@/components/ui/button';
import VendorCard from '@/components/shared/VendorCard';

const PackageDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
    const packet = await getPacketById(id);

    const relatedPackets = await getRelatedPacketsByCategory({
        categoryId: packet.category._id,
        packetId: packet._id,
        page: searchParams.page as string,
    })

    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
    const isOrganizer = userId === packet.organizer._id.toString();
    const organizerProfile = await getUserById(packet.organizer._id);

    return (
        <>
            
        <div className="py-10 px-3">
            <section className="flex justify-center content-start">
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl gap-8">
                    <div className='flex justify-center'>
                        <Image 
                        src={packet.imageUrl}
                        alt="packet thumbnail"
                        width={1000}
                        height={1000}
                        className="h-full min-h-[300px] object-cover object-center"/>
                    </div>
                    <div className="flex w-full flex-col gap-3">
                        <div className="flex flex-col gap-3">
                            <div className='flex gap-2'>
                                <p className="p-medium-16 rounded-full w-fit bg-primary-100/30 px-4 p-1 text-primary-300">
                                    packet
                                </p>
                                <p className="p-medium-16 rounded-full w-fit bg-primary-100/30 px-4 p-1 text-primary-300">
                                    {packet.category.name}
                                </p>
                            </div>
                            <h2 className='font-medium text-[24px] text-secondary-300'>{packet.title}</h2>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <div className="flex gap-3">
                                    <p className="text-[32px] font-bold text-primary-300 font-aleo">
                                        Rp {parseInt(packet.price).toLocaleString()}
                                    </p> 
                                </div>
                            </div>
                        </div>

                        {!isOrganizer && (
                            <CheckoutButton value={packet} buttonType="Packet" amount={1}/>
                        )}

                        <div className="flex flex-col gap-1">
                            <p className="p-bold-20 text-secondary-400">Description:</p>
                            <p className="p-medium-16 lg:p-regular-18 text-secondary-300">{packet.description}</p>
                        </div>
                        {/* <div className="flex flex-col gap-1">
                            <p className="p-bold-20 text-primary-500">Includes:</p>
                            <p className="p-medium-16 lg:p-regular-18 text-primary-400">{packet.description}</p>
                        </div> */}
                        <VendorCard vendorAva={organizerProfile.photo} vendorName={organizerProfile.username}/>
                    </div>
                </div>
            </section>

            {/* Packets with the same category */}
            <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
                <h2 className="h2-bold text-secondary-300">Related Packets</h2>
                <PacketCollection 
                    data={relatedPackets?.data}
                    emptyTitle="No Packets Found"
                    emptyStateSubtext="Come back later"
                    collectionType="All_Packets"
                    limit={3}
                    page={searchParams.page as string}
                    totalPages={relatedPackets?.totalPages}
                />
            </section>
        </div>
        </>
    )
}

export default PackageDetails
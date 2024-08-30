import AbandonedPage from "@/components/shared/AbandonedPage";
import PacketForm from "@/components/shared/PacketForm"
import { Button } from "@/components/ui/button";
import { getPacketById } from "@/lib/actions/packet.actions"
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

type UpdatePacketProps = {
    params: {
        id: string
    }
}

const UpdatePacket = async ({ params: { id } }: UpdatePacketProps) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
    const packet = await getPacketById(id)

    return (
        <>
            { packet.organizer._id !== userId ? (
                <AbandonedPage/>
            ) : (
                <>
                    <div className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">

                        <h3 className="wrapper h3-bold text-center sm:text-left">Update Packet</h3>

                        <div className="wrapper flex items-center justify-center sm:justify-between">
                            <h3 className='h3-bold text-center sm:text-left text-primary-500'>Update Packet</h3>
                            <Button size="lg" className="button-ic">
                                <Image
                                    src="/assets/icons/left_arrow.svg"
                                    alt="stock"
                                    width={24}
                                    height={24}
                                    className="filter-grey"
                                />
                                <Link href="/profile">
                                    Back
                                </Link>
                            </Button>
                        </div>

                    </div>
        
                    <div className="wrapper my-8">
                        <PacketForm 
                        type="Update" 
                        packet={packet} 
                        packetId={packet._id} 
                        userId={userId} 
                        />
                    </div>
                </>
            )}
        </>
    )
}

export default UpdatePacket
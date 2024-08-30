import AbandonedPage from "@/components/shared/AbandonedPage";
import GearForm from "@/components/shared/GearForm"
import { Button } from "@/components/ui/button";
import { getGearById } from "@/lib/actions/gear.actions"
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";


type UpdateGearProps = {
    params: {
        id: string
    }
}

const UpdateGear = async ({ params: { id } }: UpdateGearProps) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
    const gear = await getGearById(id)

    return (
        <>
            { gear.organizer._id !== userId ? (
                <AbandonedPage/>
            ) : (
                <>
                    <div className="flex justify-between bg-primary-100/30 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                        <div className="wrapper flex items-center justify-center sm:justify-between">
                            <h3 className='h3-bold text-center sm:text-left text-primary-500'>Update Gear</h3>
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
                        <GearForm 
                        type="Update" 
                        gear={gear} 
                        gearId={gear._id} 
                        userId={userId} 
                        />
                    </div>
                </>
            )}
        </>
    )
}

export default UpdateGear
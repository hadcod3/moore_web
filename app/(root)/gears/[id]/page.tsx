import CheckoutButton from '@/components/shared/CheckoutButton';
import GearCollection from '@/components/shared/GearCollection';
import { Input } from '@/components/ui/input';
import { getGearById, getRelatedGearsByCategory } from '@/lib/actions/gear.actions';
import { SearchParamProps } from '@/types'
import Image from 'next/image';
import { auth } from '@clerk/nextjs'
import { getUserById } from '@/lib/actions/user.actions';
import VendorCard from '@/components/shared/VendorCard';
import AddToCartButton from '@/components/shared/AddToCartButton';
import Counter from '@/components/shared/Counter';

const GearDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
    const gear = await getGearById(id);

    const relatedGears = await getRelatedGearsByCategory({
        categoryId: gear.category._id,
        gearId: gear._id,
        page: searchParams.page as string,
    })

    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
    const isOrganizer = userId === gear.organizer._id.toString();
    const organizerProfile = await getUserById(gear.organizer._id);

    return (
        <>
            <div className="py-10 px-3">
                <section className="flex justify-center content-start">
                    <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl gap-8">
                        <div className='flex justify-center'>
                            <Image 
                            src={gear.imageUrl}
                            alt="gear thumbnail"
                            width={1000}
                            height={1000}
                            className="max-h-[400px] max-w-[400px] object-cover object-center rounded-3xl"
                            />
                        </div>

                        <div className="flex w-full flex-col gap-3">
                            <div className="flex flex-col gap-3">
                                <div className='flex gap-2'>
                                    <p className="p-medium-16 rounded-full w-fit bg-primary-100/30 px-4 p-1 text-primary-300">
                                        gear
                                    </p>
                                    <p className="p-medium-16 rounded-full w-fit bg-primary-100/30 px-4 p-1 text-primary-300">
                                        {gear.category.name}
                                    </p>
                                </div>
                                <h2 className='font-medium text-[24px] text-secondary-300'>{gear.title}</h2>
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                    <div className="flex gap-3">
                                        <p className="text-[32px] font-bold text-primary-400 font-aleo">
                                            Rp {parseInt(gear.price).toLocaleString()}
                                        </p> 
                                    </div>
                                </div>
                                <h5 className='text-base text-primary-200/70'>Stock : {gear.stock}</h5>
                            </div>

                            {!isOrganizer && (
                                <div className='flex gap-2'>
                                    <CheckoutButton value={gear} buttonType="Gear" amount={2}/>
                                    <AddToCartButton value={gear} buttonType="Gear" amount={2}/>
                                </div>
                            )}

                            {/* <Counter counter={0}/> */}

                            <div className="flex flex-col gap-1">
                                <p className="p-bold-20 text-secondary-400">Description:</p>
                                <p className="p-medium-16 lg:p-regular-18 text-secondary-300">{gear.description}</p>
                            </div>

                            {/* <Input type='number' placeholder='pcs'/> */}
                            <VendorCard vendorAva={organizerProfile.photo} vendorName={organizerProfile.username}/>

                        </div>
                    </div>
                </section>

                {/* Gears with the same category */}
                <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
                    <h2 className="h2-bold text-secondary-300">Related Gears</h2>
                    <GearCollection 
                        data={relatedGears?.data}
                        emptyTitle="No Gears Found"
                        emptyStateSubtext="Come back later"
                        collectionType="All_Gears"
                        limit={3}
                        page={searchParams.page as string}
                        totalPages={relatedGears?.totalPages}
                        />
                </section>
            </div>
        </>
    )
}

export default GearDetails
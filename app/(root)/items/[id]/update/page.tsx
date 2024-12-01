import AbandonedPage from "@/components/shared/AbandonedPage";
import ItemForm from "@/components/shared/ItemForm";
import { Button } from "@/components/ui/button";
import { getItemById } from "@/lib/actions/item.actions";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

type UpdateItemProps = {
    params: {
        id: string
    }
}

const UpdateItem = async ({ params: { id } }: UpdateItemProps) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
    const item = (await getItemById(id)) || null;

    return (
        <>
            { item.organizer._id !== userId ? (
                <AbandonedPage/>
            ) : (
                <>
                    <div className="flex justify-between bg-primary-100/30 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                        <div className="wrapper flex items-center justify-center sm:justify-between">
                            <h3 className='h3-bold text-center sm:text-left text-primary-500'>Update Item</h3>
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
                        <ItemForm userId={userId} typeForm="Update" data={item}/>
                    </div>
                </>
            )}
        </>
    )
}

export default UpdateItem
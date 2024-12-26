import AbandonedPage from "@/components/shared/AbandonedPage";
import ItemForm from "@/components/shared/ItemForm";
import { getItemById } from "@/lib/actions/item.actions";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";

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
                    <div className="flex justify-between bg-gray-100/50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                        <div className="wrapper flex items-center justify-center sm:justify-between">
                            <h3 className='h3-bold text-center sm:text-left text-secondary-300'>Update Item</h3>
                            <Link href="/profile" className="button-ic">
                                <IoIosArrowRoundBack size={20}/>
                                <p>Back</p>
                            </Link>
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
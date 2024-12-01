
import Collection from "@/components/shared/Collection"
import CategoryFilter from "@/components/shared/CategoryFilter"
import Search from "@/components/shared/Search"
import { getItemsByTypeId } from "@/lib/actions/item.actions"
import { SearchParamProps } from "@/types"
 
const Packets = async ({ searchParams }: SearchParamProps) => {
    const page = Number(searchParams?.page) || 1;
    const searchText = (searchParams?.query as string) || '';
    const category = (searchParams?.category as string) || '';
    const packetTypeId = "6717aa0a78fed7ee045a8402" // ID of packet type
    
    const packets = await getItemsByTypeId({
        typeId: packetTypeId,
        query: searchText,
        category,
        page,
        limit: 9
    })

    return (
        <>
            <section className="wrapper my-8 flex flex-col md:gap-12">
                <div className="flex w-full flex-col gap-5 py-5 md:flex-row">
                    <Search placeholder="Search"/>
                    <CategoryFilter typeId={packetTypeId}/>
                </div>
                <Collection
                data={packets?.data}
                emptyTitle="No Packets Found"
                emptyStateSubtext="Check later"
                collectionType="Packet"
                collectionModel="Full_Content"
                limit={9}
                page={page}
                totalPages={packets?.totalPages}
                />
            </section>
        </>
    )
}

export default Packets

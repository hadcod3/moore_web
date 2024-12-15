import Collection from "@/components/shared/Collection"
import CategoryFilter from "@/components/shared/CategoryFilter"
import Search from "@/components/shared/Search"
import { getItemsByTypeId } from "@/lib/actions/item.actions"
import { SearchParamProps } from "@/types"
 
const Gears = async ({ searchParams }: SearchParamProps) => {
    const page = Number(searchParams?.page) || 1;
    const searchText = (searchParams?.query as string) || '';
    const category = (searchParams?.category as string) || '';
    const gearTypeId = "6717aa0a78fed7ee045a8401" // ID of gear type

    const gears = await getItemsByTypeId({
        typeId: gearTypeId,
        query: searchText,
        category,
        page,
        limit: 15
    })

    return (
        <section className="wrapper my-8 flex flex-col md:gap-12">
            <div className="flex w-full flex-col gap-5 py-5 md:flex-row">
                <Search placeholder="Search"/>
                <CategoryFilter typeId={gearTypeId}/>
            </div>
            <Collection
            data={gears?.data}
            emptyTitle="No Gears Found"
            emptyStateSubtext="Check later"
            collectionType="Gear"
            collectionModel="Full_Content"
            limit={15}
            page={page}
            totalPages={gears?.totalPages}
            />
        </section>
    )
}

export default Gears

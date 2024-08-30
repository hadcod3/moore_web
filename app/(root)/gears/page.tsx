import GearCategoryFilter from "@/components/shared/GearCategoryFilter"
import GearCollection from "@/components/shared/GearCollection"
import Search from "@/components/shared/Search"
import { getAllGears } from "@/lib/actions/gear.actions"
import { SearchParamProps } from "@/types"
 
const Gears = async ({ searchParams }: SearchParamProps) => {
    const page = Number(searchParams?.page) || 1;
    const searchText = (searchParams?.query as string) || '';
    const category = (searchParams?.category as string) || '';
    
    const gears = await getAllGears({
        query: searchText,
        category,
        page,
        limit: 15
    })

    return (
        <>
            <section className="wrapper my-8 flex flex-col md:gap-12">

                <h2 className="h2-bold font-playfair text-primary-500">Trusted by <br/> Thousands of customers</h2>

                <div className="flex w-full flex-col gap-5 py-5 md:flex-row">
                    <Search placeholder="Search"/>
                    <GearCategoryFilter/>
                </div>
                <GearCollection
                    data={gears?.data}
                    emptyTitle="No Gears Found"
                    emptyStateSubtext="Check later"
                    collectionType="All_Gears"
                    limit={15}
                    page={page}
                    totalPages={gears?.totalPages}
                />
            </section>
            </>
    )
}

export default Gears

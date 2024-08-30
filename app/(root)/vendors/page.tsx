import VendorCategoryFilter from "@/components/shared/VendorCategoryFilter"
// import VendorCollection from "@/components/shared/VendorCollection"
import Search from "@/components/shared/Search"
import { getAllVendors } from "@/lib/actions/user.actions"
import { SearchParamProps } from "@/types"
import ProductCollection from "@/components/shared/ProductCollection"
import { getAllPackets } from "@/lib/actions/packet.actions"
import { getAllProducts } from "@/lib/actions/product.actions"
import VendorCollection from "@/components/shared/VendorCollection"
 
const Vendors = async ({ searchParams }: SearchParamProps) => {
    const page = Number(searchParams?.page) || 1;
    const searchText = (searchParams?.query as string) || '';
    const category = (searchParams?.category as string) || '';
    
    const vendors = await getAllVendors({
        query: searchText,
        category,
        page,
        limit: 15 
    })

    return (
        <>
            <section className="wrapper my-8 flex flex-col md:gap-12">
                <div className="flex w-full flex-col gap-5 py-5 md:flex-row">
                    <Search placeholder="Search"/>
                    <VendorCategoryFilter/>
                </div>
                <VendorCollection
                data={vendors?.data}
                emptyTitle="No Vendors Found"
                emptyStateSubtext="Check later"
                collectionType="All_Vendors"
                limit={15}
                page={page}
                totalPages={vendors?.totalPages}
                />
            </section>
        </>
    )
}

export default Vendors

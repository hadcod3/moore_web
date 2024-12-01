import Collection from "@/components/shared/Collection"
import CategoryFilter from "@/components/shared/CategoryFilter"
import Search from "@/components/shared/Search"
import { getItemsByTypeId } from "@/lib/actions/item.actions"
import { SearchParamProps } from "@/types"
 
const Products = async ({ searchParams }: SearchParamProps) => {
    const page = Number(searchParams?.page) || 1;
    const searchText = (searchParams?.query as string) || '';
    const category = (searchParams?.category as string) || '';
    const productTypeId = "6717aa0a78fed7ee045a8403" // ID of product type
    
    const products = await getItemsByTypeId({
        typeId: productTypeId,
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
                    <CategoryFilter typeId={productTypeId}/>
                </div>
                <Collection
                data={products?.data}
                emptyTitle="No Products Found"
                emptyStateSubtext="Check later"
                collectionType="Product"
                collectionModel="Full_Content"
                limit={15}
                page={page}
                totalPages={products?.totalPages}
                />
            </section>
        </>
    )
}

export default Products

import ProductCategoryFilter from "@/components/shared/ProductCategoryFilter"
import ProductCollection from "@/components/shared/ProductCollection"
import Search from "@/components/shared/Search"
import { getAllProducts } from "@/lib/actions/product.actions"
import { SearchParamProps } from "@/types"
 
const Products = async ({ searchParams }: SearchParamProps) => {
    const page = Number(searchParams?.page) || 1;
    const searchText = (searchParams?.query as string) || '';
    const category = (searchParams?.category as string) || '';
    
    const product = await getAllProducts({
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
                    <ProductCategoryFilter/>
                </div>
                <ProductCollection
                    data={product?.data}
                    emptyTitle="No Product Found"
                    emptyStateSubtext="Check later"
                    collectionType="All_Products"
                    limit={15}
                    page={page}
                    totalPages={product?.totalPages}
                />
            </section>
        </>
    )
}

export default Products

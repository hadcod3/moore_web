import AbandonedPage from "@/components/shared/AbandonedPage";
import ProductForm from "@/components/shared/ProductForm"
import { Button } from "@/components/ui/button";
import { getProductById } from "@/lib/actions/product.actions"
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";


type UpdateProductProps = {
    params: {
        id: string
    }
}

const UpdateProduct = async ({ params: { id } }: UpdateProductProps) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
    const product = await getProductById(id)

    return (
        <>
            { product.organizer._id !== userId ? (
                <AbandonedPage/>
            ) : (
                <>
                    <div className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">

                        <h3 className="wrapper h3-bold text-center sm:text-left">Update Product</h3>

                        <div className="wrapper flex items-center justify-center sm:justify-between">
                            <h3 className='h3-bold text-center sm:text-left text-primary-500'>Update Product</h3>
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
                        <ProductForm 
                        type="Update" 
                        product={product} 
                        productId={product._id} 
                        userId={userId} 
                        />
                    </div>
                </>
            )}
        </>
    )
}

export default UpdateProduct
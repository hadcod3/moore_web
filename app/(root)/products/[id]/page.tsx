import CheckoutButton from '@/components/shared/CheckoutButton'; 
import ProductCollection from '@/components/shared/ProductCollection';
import { getProductById, getRelatedProductsByCategory } from '@/lib/actions/product.actions';
import { SearchParamProps } from '@/types'
import Image from 'next/image'; 
import { auth } from '@clerk/nextjs'
import { getUserById } from '@/lib/actions/user.actions';
import VendorCard from '@/components/shared/VendorCard';
import AddToCartButton from '@/components/shared/AddToCartButton';

const ProductDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
    const product = await getProductById(id);

    const relatedProducts = await getRelatedProductsByCategory({
        categoryId: product.category._id,
        productId: product._id,
        page: searchParams.page as string,
    })

    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
    const isOrganizer = userId === product.organizer._id.toString();
    const organizerProfile = await getUserById(product.organizer._id);

    return (
        <div className='py-10 px-3'>
            <section className="flex justify-center content-start">
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl gap-8">
                    <div className='flex justify-center'>
                        <Image 
                        src={product.imageUrl}
                        alt="product thumbnail"
                        width={1000}
                        height={1000}
                        className="max-h-[400px] max-w-[400px] object-cover object-center rounded-3xl"
                        />
                    </div>
                    <div className="flex w-full flex-col gap-3">
                        <div className="flex flex-col gap-3">
                            <div className='flex gap-2'>
                                <p className="p-medium-16 rounded-full w-fit bg-primary-100/30 px-4 p-1 text-primary-300">
                                    product
                                </p>
                                <p className="p-medium-16 rounded-full w-fit bg-primary-100/30 px-4 p-1 text-primary-300">
                                    {product.category.name}
                                </p>
                            </div>
                            <h2 className='font-medium text-[24px] text-secondary-300'>{product.title}</h2>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <div className="flex gap-3">
                                    <p className="text-[32px] font-bold text-secondary-400 font-aleo">Rp {parseInt(product.price).toLocaleString()}</p> 
                                </div>
                            </div>
                            <h5 className='text-base text-primary-300/70'>Stock : {product.stock}</h5>
                        </div>

                        {!isOrganizer && (
                            <div className='flex gap-2'>
                                <CheckoutButton value={product} buttonType="Product" amount={2}/>
                                <AddToCartButton value={product} buttonType="Product" amount={2}/>
                            </div>
                        )}

                        <div className="flex flex-col gap-1">
                            <p className="p-bold-20 text-secondary-400">Description:</p>
                            <p className="p-medium-16 lg:p-regular-18 text-secondary-300">{product.description}</p>
                        </div>
                        <VendorCard vendorAva={organizerProfile.photo} vendorName={organizerProfile.username}/>
                    </div>
                </div>
            </section>
            
            {/* Packets with the same category */}
            <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
            <h2 className="h2-bold text-secondary-300">Related Products</h2>

            <ProductCollection 
                data={relatedProducts?.data}
                emptyTitle="No Product Found"
                emptyStateSubtext="Come back later"
                collectionType="All_Products"
                limit={3}
                page={searchParams.page as string}
                totalPages={relatedProducts?.totalPages}
                />
            </section>
        </div>
    )
}

export default ProductDetails
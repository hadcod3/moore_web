
import React from 'react'
import Pagination from './Pagination'
import { Button } from '../ui/button'
import Link from 'next/link'
import VendorCard from './VendorCard'
import { IUser } from '@/lib/database/models/user.model'

type VendorCollectionProps = {
  data: IUser[],
  emptyTitle: string,
  emptyStateSubtext: string,
  limit: number,
  page: number | string,
  totalPages?: number,
  urlParamName?: string,
  collectionType?: 'All_Vendors' | 'Sample_Vendors'
}
 
const VendorCollection = ({
    data = [],
    emptyTitle,
    emptyStateSubtext,
    page,
    totalPages = 0,
    collectionType,
    urlParamName,
}: VendorCollectionProps) => {
    return (
        <>
            {data.length > 0 ? (
                <div className="flex flex-col items-center gap-10">
                    <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
                        {data.map((item) => {
                            return (
                                <li key={item._id} className="flex justify-center">
                                    <VendorCard data={item}/>
                                </li>
                            )
                        })}
                    </ul>

                    {totalPages > 1 && collectionType !== 'Sample_Vendors' && (
                        <Pagination urlParamName={urlParamName} page={page} totalPages={totalPages} />
                    )}

                    {/* { collectionType === 'Sample_Vendors' && (
                        <Button size="lg" asChild className="button w-full sm:w-fit bg-primary-400 hover:bg-primary-500 transition-colors duration-200 ease-in-out">
                            <Link href="/packets">See More Packets</Link>
                        </Button>
                    )} */}
                </div>
            ) : (
                <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
                    <h3 className="p-bold-20 md:h5-bold text-primary-500">{emptyTitle}</h3>
                    <p className="p-regular-14 text-primary-500">{emptyStateSubtext}</p>
                </div>
            )} 
        </>
    )
}

export default VendorCollection
import { IPacket } from '@/lib/database/models/packet.model'
import React from 'react'
import PacketCard from './PacketCard'
import Pagination from './Pagination'
import { Button } from '../ui/button'
import Link from 'next/link'

type PacketCollectionProps = {
  data: IPacket[],
  emptyTitle: string,
  emptyStateSubtext: string,
  limit: number,
  page: number | string,
  totalPages?: number,
  urlParamName?: string,
  collectionType?: 'Packets_Organized' | 'All_Packets' | 'Sample_Packets'
}
 
const PacketCollection = ({
    data,
    emptyTitle,
    emptyStateSubtext,
    page,
    totalPages = 0,
    collectionType,
    urlParamName,
}: PacketCollectionProps) => {
    return (
        <>
            {data.length > 0 ? (
                <div className="flex flex-col items-center gap-10">
                    <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
                        {data.map((item) => {
                            return (
                                <li key={item._id} className="flex justify-center">
                                    { collectionType === "Packets_Organized" ? (
                                        <PacketCard item={item} organized={true}/>
                                    ) : (
                                        <PacketCard item={item} organized={false}/>
                                    )}
                                </li>
                            )
                        })}
                    </ul>

                    {totalPages > 1 && collectionType !== 'Sample_Packets' && (
                        <Pagination urlParamName={urlParamName} page={page} totalPages={totalPages} />
                    )}

                    { collectionType === 'Sample_Packets' && (
                        <Button size="lg" asChild className="button-ic w-full sm:w-fit">
                            <Link href="/packets">See More Packets</Link>
                        </Button>
                    )}
                </div>
            ) : (
                <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
                    <h3 className="p-bold-20 md:h5-bold text-secondary-300">{emptyTitle}</h3>
                    <p className="p-regular-14 text-primary-500">{emptyStateSubtext}</p>
                </div>
            )} 
        </>
    )
}

export default PacketCollection
'use client'
import React, { startTransition, useState } from 'react';
import { IItem } from '@/lib/database/models/item.model';
import BigCard from './BigCard';
import SmallCard from './SmallCard';
import Link from 'next/link';
import { Button } from '../ui/button';
import Pagination from './Pagination';

type CollectionProps = {
  data: IItem[],
  emptyTitle: string,
  emptyStateSubtext: string,
  limit: number,
  page: number | string,
  totalPages?: number,
  urlParamName?: string,
  collectionType?: 'Packet' | 'Product' | 'Gear',
  collectionModel?: "Sample" | "Full_Content" | "isOrganizer",
};
 
const Collection = ({
    data,
    emptyTitle,
    emptyStateSubtext,
    page,
    totalPages = 0,
    urlParamName,
    collectionType,
    collectionModel,
}: CollectionProps) => {
    
    const type = collectionType === "Packet" ? "Packets" : collectionType === "Product" ? "Products" : "Gears";
    const linkHref = type === 'Packets' ? '/packets' : type === "Products" ? '/products' : '/gears';
    const gridCols = collectionType === "Packet" 
      ? "grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" 
      : "gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5";

    return (
        <div>
            {data.length > 0 ? (
                <div className="flex flex-col items-center gap-10">
                    <ul className={`grid w-full ${gridCols} xl:gap-10`}>
                        {data.map((item) => (
                            <li key={item._id} className="flex justify-center">
                                {collectionType === "Packet" ? (
                                    <BigCard key={item._id} item={item} isOrganizer={collectionModel==="isOrganizer"} />
                                ) : (
                                    <SmallCard key={item._id} item={item} isOrganizer={collectionModel==="isOrganizer"} />
                                )}
                            </li>
                        ))}
                    </ul>
                    {totalPages > 1 && collectionModel !== 'Sample' && (
                        <Pagination urlParamName={urlParamName} page={page} totalPages={totalPages} />
                    )}
                    {collectionModel === "Sample" && (
                        <Button size="lg" asChild className="button-ic w-full sm:w-fit hover:bg-primary-200 transition-colors duration-200 ease-in-out">
                            <Link href={linkHref}>See More {type}</Link>
                        </Button>
                    )}
                </div>
            ) : (
                <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
                    <h3 className="p-bold-20 md:h5-bold text-secondary-300">{emptyTitle}</h3>
                    <p className="p-regular-14 text-primary-500">{emptyStateSubtext}</p>
                </div>
            )}
        </div>
    );
};

export default Collection;

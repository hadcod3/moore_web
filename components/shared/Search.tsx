"use client"

import Image from 'next/image';
import { useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

const Search = ({ placeholder = 'Search title...' }: { placeholder?: string }) => {
    const [query, setQuery] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
        let newUrl = '';

        if(query) {
            newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: 'query',
            value: query
            })
        } else {
            newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ['query']
            })
        }

        router.push(newUrl, { scroll: false });
        }, 300)

        return () => clearTimeout(delayDebounceFn);
    }, [query, searchParams, router])

    return (

        <div className="flex items-center input-field">
            <Image src="/assets/icons/search.svg" alt="search" width={24} height={24} />
            <Input 
                type="text"
                placeholder={placeholder}
                onChange={(e) => setQuery(e.target.value)}
                className="p-regular-16 border-0 bg-primary-100/0 outline-offset-0 placeholder:text-grey-300 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
        </div>
    )
}

export default Search
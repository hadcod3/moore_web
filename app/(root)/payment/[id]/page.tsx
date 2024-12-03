import React, { useEffect, useMemo, useState } from 'react'
import AbandonedPage from '@/components/shared/AbandonedPage'
import { getItemById } from '@/lib/actions/item.actions';
import { SearchParamProps } from '@/types';
import { getCurrentUserId } from '@/lib/utils_server';
import RentPaymentScreen from '@/components/shared/RentPaymentScreen';
import { getUserById } from '@/lib/actions/user.actions';

const PaymentScreen = async ({ params: { id }, searchParams }: SearchParamProps) => {
    const item = await getItemById(id);
    const userId = getCurrentUserId();
    const profile = await getUserById(userId as string);
    const isOrganizer = userId === item.organizer._id;

    return isOrganizer ? (
        <AbandonedPage/>
    ) : (
        <RentPaymentScreen item={item} buyer={profile}/>
    )
}

export default PaymentScreen


import React from 'react'
import AbandonedPage from '@/components/shared/AbandonedPage'
import { getItemById } from '@/lib/actions/item.actions';
import { SearchParamProps } from '@/types';
import RentPaymentScreen from '@/components/shared/RentPaymentScreen';
import { getUserById } from '@/lib/actions/user.actions';
import { getTransactionById } from '@/lib/actions/transaction.actions';
import { auth } from '@clerk/nextjs';

const PaymentScreen = async ({ params: { id }, searchParams }: SearchParamProps) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
    const profile = await getUserById(userId as string);
    
    let isConfirm = false
    let isOrganizer = false
    let item = []
    try {
        item = await getItemById(id);
        isOrganizer = userId === item.organizer._id;
        isConfirm = false
    } catch {
        item = await getTransactionById(id);
        isConfirm = true
    }

    console.log(item, "payment page")

    return isOrganizer ? (
        <AbandonedPage/>
    ) : (
        <RentPaymentScreen item={item} buyer={profile} isConfirm={isConfirm}/>
    )
}

export default PaymentScreen


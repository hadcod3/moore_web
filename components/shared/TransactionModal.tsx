"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { ITransaction } from '@/lib/database/models/transaction.model'
import { FaRegCircleXmark } from "react-icons/fa6";
import { formatDateTime } from '@/lib/utils'
import { updateTransactionStatus } from '@/lib/actions/transaction.actions'
import { createNotification } from '@/lib/actions/notification.actions'
import { IUser } from '@/lib/database/models/user.model'

interface TransactionModalProps {
    value: ITransaction
    buyer: string
    itemType: string
    currentUser: IUser
}

const TransactionModal = ({ value, buyer, itemType, currentUser } : TransactionModalProps) => {
    const [modalView, setModalView] = useState(false)

    const handleModal = () => {
        setModalView(true)
    }

    const handleUpdateStatus = async (itemId: string, status: string) => {
        try {
            await updateTransactionStatus(itemId, status);
            console.log("Transaction status updated");
    
            let notificationMessage = "";
            if (status === "rejected") {
                notificationMessage = "Sorry, your transaction has been rejected.";
            } else if (status === "confirm") {
                notificationMessage = "Your transaction has been confirmed, please make payment immediately.";
            }
                    
            await createNotification({
                to: value.buyer, 
                from: {
                    _id: currentUser._id,
                    name: (`${currentUser.firstName} ${currentUser.lastName}`),
                    imageUrl: currentUser.photo,
                },
                message: notificationMessage,
            });
            console.log(`Notification sent for status: ${status}`);
        } catch (error) {
            console.error(`Error handling update status (${status}):`, error);
        }
        setModalView(false)
        window.location.reload();
    }
 
    return (
        <div className="flex items-center gap-3">
            <button onClick={handleModal}>
                <div className="flex flex-col gap-3 rounded-xl bg-white/30 w-11 h-fit py-3 items-center justify-center backdrop-blur-lg shadow-sm transition-all">
                    <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
                </div>
            </button>

            {modalView && (
                <div className='fixed top-0 left-0 w-full h-full bg-black/30 z-40 flex items-center justify-center'>
                    <div className='w-80 min-h-40 h-fit bg-white rounded-2xl border border-gray-300 p-5'>
                        <div className='flex w-full justify-between pb-3 '>
                            <h1 className='text-xl font-semibold'>Order</h1>
                            <button onClick={() => setModalView(false)}>
                                <FaRegCircleXmark size={20}/>
                            </button>
                        </div>
                        <div className='flex justify-between border-b border-t border-dashed border-gray-300 py-1'>
                            <p>Status</p>
                            <h1 className={`${
                            value.status === "success" || value.status === "confirm" ? "text-green-600" :
                            value.status === "rejected" ? "text-red-600" :
                            value.status === "paid" || value.status === "shipping" || value.status === "packaging" || value.status === "installation" ? "text-blue-600" :
                            value.status === "under consideration" ? "text-yellow-600" : ""
                            }`}>{value.status}</h1>
                        </div>
                        <div className='flex flex-col gap-y-0 py-2'>
                            <p className='font-light text-sm text-gray-400'>Order id: {value._id}</p>
                            <h1 className='font-light text-sm text-gray-400'>Ordered: {formatDateTime(value.createdAt)}</h1>
                            <h1 className='font-light text-sm text-gray-400'>Estimated: {formatDateTime(value.forDate)}</h1>
                        </div>
                        <div className='py-2 border-t border-gray-300 border-dashed'>
                            <p className='text-sm text-gray-500'>Buyer</p>
                            <h1 className='text-base font-medium'>{buyer}</h1>
                            <h1 className='text-base font-medium'>{value.shippingAddress}</h1>
                        </div>
                        <div className='py-2 border-t border-gray-300 border-dashed'>
                            <p className='text-sm text-gray-500'>Item</p>
                            <h1 className='text-base font-medium'>{value.items.name}</h1>
                            <div className='flex gap-x-1'>
                                <h1 className='text-base font-medium'>Rp{value.price.toLocaleString("id-ID")} x</h1>
                                <h1 className='text-base font-medium'>{value.quantity} {value.quantity === 1 ? "pc" : "pcs"}</h1>
                            </div>
                        </div>
                        <div className='py-2 border-t border-gray-300 border-dashed'>
                            <p className='text-sm text-gray-500'>Total Amount</p>
                            <h1 className='text-base font-medium'>Rp{value.totalAmount.toLocaleString("id-ID")}</h1>
                            <p className='text-xs text-gray-500'>{`+ shipment cost (10% from subtotal)`}</p>
                        </div>
                        {
                            value.status === "under consideration" ? (
                                <div className='w-full flex items-center justify-between'>
                                    <Button 
                                    className='w-[49%] rounded-md bg-red-600 text-white'
                                    onClick={() => handleUpdateStatus(value._id, "rejected")}>
                                        Reject
                                    </Button>
                                    <Button 
                                    className='w-[49%] rounded-md bg-green-600 text-white'
                                    onClick={() => handleUpdateStatus(value._id, "confirm")}>
                                        Confirm
                                    </Button>
                                </div>
                            ) : value.status === "paid" && itemType === "gear" ?(
                                <div className='w-full'>
                                    <Button 
                                    className='w-full rounded-md bg-yellow-600 text-white'
                                    onClick={() => handleUpdateStatus(value._id, "shipping")}>
                                        Shipping
                                    </Button>
                                </div>
                            ) : value.status === "paid" && itemType === "packet" ?(
                                <div className='w-full'>
                                    <Button 
                                    className='w-full rounded-md bg-yellow-600 text-white'
                                    onClick={() => handleUpdateStatus(value._id, "installation")}>
                                        Installation
                                    </Button>
                                </div>
                            ) : value.status === "confirm" ? (
                                <div className='w-full text-center'>
                                    <p className='text-xs text-gray-400'>Waiting customer payment</p>
                                </div>
                            ) : value.status === "rejected" ? (
                                <div className='w-full text-center'>
                                    <p className='text-xs text-red-400'>This order was rejected</p>
                                </div>
                            ) : (
                                <div className='w-full text-center'>
                                    <p className='text-xs text-gray-400'>Waiting customer confirmation</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            )}
            {/* <Checkout item={value} buyerId={buyerId}/> */}
        </div>
    )
}

export default TransactionModal
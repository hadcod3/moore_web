"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { formatDateTime } from '@/lib/utils'
import { INotification } from '@/lib/database/models/notification.model'
import { IoClose, IoNotificationsOutline } from 'react-icons/io5'

interface NotificationModalProps {
    value: INotification[]
}

const NotificationModal = ({ value } : NotificationModalProps) => {
    const [modalView, setModalView] = useState(false)
    const [selectedNotification, setSelectedNotification] = useState<INotification | null>(null);

    const handleModal = () => {
        setModalView(true)
    }
 
    const handleSelectNotification = (notification: INotification) => {
        setSelectedNotification(notification);
      };

    return (
        <div className="flex items-center gap-3">
            <Button onClick={handleModal} size="lg" className="button-ic">
                <IoNotificationsOutline  />
                <p>Notifications</p>
            </Button>

            {modalView && (
                <div className='fixed top-0 left-0 w-full h-full bg-black/30 z-50 flex flex-col items-center justify-center gap-y-4'>
                    <div className='w-[836px] flex justify-end'>
                        <Button onClick={() => setModalView(false)} size="lg" className="button-ic">
                            <IoClose/>
                            <p>Close</p>
                        </Button>
                    </div>
                    <div className='flex gap-4'>
                        {/* NOTIFICATION DETAIL */}
                        <div className="w-[500px] min-h-40 h-fit bg-white rounded-2xl border border-gray-300 p-5">
                        {selectedNotification ? (
                            <>
                            <div className="flex gap-x-3 pb-3 mb-2 border-b border-gray-200">
                                <Image
                                src={selectedNotification.from.photo}
                                alt="sender ava"
                                width={100}
                                height={100}
                                className="rounded-3xl w-16 h-16 object-cover object-center"
                                />
                                <div>
                                <h1 className="font-semibold text-lg">{selectedNotification.from.firstName} {selectedNotification.from.lastName}</h1>
                                <p className="text-gray-400 text-sm italic">
                                    {formatDateTime(selectedNotification.createdAt)}
                                </p>
                                </div>
                            </div>
                            <div>
                                <p>{selectedNotification.massage}</p>
                            </div>
                            </>
                        ) : (
                            <p className="text-gray-500 text-sm italic">Select a notification to view details</p>
                        )}
                        </div>

                        <div className='w-80 h-96 bg-white rounded-2xl border border-gray-300 p-3 overflow-hidden'>
                            <div className=' w-full h-full overflow-y-scroll bg-scroll styled-scrollbar'>
                                {value.length > 0 ? (
                                    value.map((data) => (
                                        <button 
                                        key={data._id} 
                                        onClick={() => handleSelectNotification(data)} 
                                        className={`flex gap-2 w-full border-b border-gray-100 p-2 hover:bg-gray-100 transition-colors ease-in-out ${
                                          selectedNotification && selectedNotification._id === data._id
                                            ? "bg-gray-100"
                                            : ""
                                        }`}
                                        >
                                            <Image
                                                src={data.from.photo}
                                                alt="sender ava"
                                                width={100}
                                                height={100}
                                                className="rounded-2xl w-12 h-12 object-cover object-center border border-gray-100"
                                            />
                                            <div className='flex flex-col text-left'>
                                                <h1 className='line-clamp-1 text-sm font-medium'>{data.from.firstName} {data.from.lastName}</h1>
                                                <p className='line-clamp-1 text-xs'>{data.massage}</p>
                                                <p className='line-clamp-1 text-[8px]'>{formatDateTime(data.createdAt)}</p>
                                            </div>
                                        </button>
                                    ))
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-500 italic">
                                      No notifications available
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NotificationModal
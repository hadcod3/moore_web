'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Counter from './Counter';
import { IUser } from '@/lib/database/models/user.model';
import { IItem } from '@/lib/database/models/item.model';
import { HiOutlineCalendar } from 'react-icons/hi2';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const RentPaymentScreen = ({ item, buyer }: { item: IItem, buyer: IUser }) => {
    const [forDate, setForDate] = React.useState<Date>()
    const [quantity, setQuantity] = useState(item.minOrder);
    const [subtotal, setSubtotal] = useState(0);
    const [shipmentCost, setShipmentCost] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const dateInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const calculatedSubtotal = item.price * quantity;
        const calculatedShipmentCost = calculatedSubtotal * 0.1;
        const calculatedGrandTotal = calculatedSubtotal + calculatedShipmentCost;
        
        setSubtotal(calculatedSubtotal);
        setShipmentCost(calculatedShipmentCost);
        setGrandTotal(calculatedGrandTotal);
    }, [quantity, item.price]);

    const checkFunction = (itemId: string, value: number) => {
        console.log(`Updating item ${itemId} quantity to ${value}`);
        setQuantity(value);
    };

    return (
        <div className='wrapper flex flex-row justify-between'>
            {/* CART SECTION START */}
            <section className='w-[850px]'>
                <div>
                    <h1 className='h2-bold text-secondary-300 mb-2'>Rent Payment</h1>
                </div>
                <div className='w-full bg-gray-50 rounded-xl shadow-md border border-gray-100 pb-5'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <div className='flex gap-4'>
                                        <Image
                                            src={item.imageUrl}
                                            alt="item image"
                                            width={300}
                                            height={300}
                                            className='w-32 h-3w-32 aspect-square object-cover object-center border border-gray-100 rounded-lg'
                                        />
                                        <div>
                                            <h1>{item.organizer.firstName} {item.organizer.lastName} ~ {item.organizer.city}</h1>
                                            <h1 className='text-2xl font-semibold'>{item.name}</h1>
                                            <p className='text-md text-gray-400'>Stock: {item.stock}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Counter
                                        initialCount={item.minOrder}
                                        onChange={(value) => checkFunction(item._id, value)}
                                        minOrder={item.minOrder}
                                        maxOrder={item.stock}
                                    />
                                </TableCell>
                                <TableCell className='text-lg font-semibold'>Rp{item.price.toLocaleString('id-ID')}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </section>
            {/* CART SECTION END */}

            {/* PAYMENT SECTION START */}
            <section className='w-96 h-fit p-5 bg-gray-50 rounded-xl shadow-md border border-gray-100'>
                <div>
                    <h1 className='text-lg font-semibold'>Your order</h1>
                    <div className='flex flex-col gap-2'>
                        <div className='flex gap-3'>
                            <Image
                                src={item.imageUrl}
                                alt="item image"
                                width={200}
                                height={200}
                                className='w-20 h-20 aspect-square object-cover object-center border border-gray-100 rounded-lg'
                            />
                            <div className='flex flex-col'>
                                <h1 className='text-md text-ellipsis'>{item.name}</h1><h4 className='text-lg font-bold'>
                                    Rp{(item.price * quantity).toLocaleString('id-ID')}
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className='my-3 w-full border-t border-dashed border-gray-300'></div>
                    <div className='flex flex-col gap-1'>
                        <h1 className='text-lg font-semibold'>For Date</h1>
                        <div className='flex gap-2'>
                            <Input
                                type='date'
                                value={forDate ? format(forDate, 'yyyy-MM-dd') : ''}
                                ref={dateInputRef}
                                disabled
                                placeholder='Add shipping address'
                                className='w-full bg-white border-gray-200 rounded-lg h-[50px] placeholder:text-grey-300 text-md px-5 py-3 focus-visible:ring-transparent focus:ring-transparent !important focus-visible:ring-offset-0'
                            />
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "h-[50px] min-w-[50px] p-0 bg-white rounded-lg border border-gray-300",
                                        !forDate && "text-muted-foreground"
                                    )}
                                    >
                                        <HiOutlineCalendar size={20}/>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                    mode="single"
                                    selected={forDate}
                                    onSelect={setForDate}
                                    initialFocus
                                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div className='my-3 w-full border-t border-dashed border-gray-300'></div>
                    <div className='flex flex-col gap-1'>
                        <h1 className='text-lg font-semibold'>Shipping Address</h1>
                        <div className='flex gap-2'>
                            <Input type='text' placeholder='Add shipping address' defaultValue={buyer.address} className='w-full bg-white border-gray-200 rounded-lg h-[50px] placeholder:text-grey-300 text-md px-5 py-3 focus-visible:ring-transparent focus:ring-transparent !important focus-visible:ring-offset-0'/>
                            <Button className='h-[50px] min-w-[50px] p-0 bg-white rounded-lg border border-gray-300'>
                                <Image
                                    src={"/assets/icons/edit_bw.svg"}
                                    alt="edit"
                                    width={20}
                                    height={20}
                                />
                            </Button>
                        </div>
                    </div>
                    <div className='my-3 w-full border-t border-dashed border-gray-300'></div>
                    <div>
                        <div className='flex justify-between'>
                            <p className='text-gray-400'>Subtotal</p>
                            <p className='font-semibold'>Rp{subtotal.toLocaleString('id-ID')}</p>
                        </div>
                        <div className='flex justify-between'>
                            <p className='text-gray-400'>Discount</p>
                            <p className='font-semibold'>-Rp0</p>
                        </div>
                        <div className='flex justify-between'>
                            <p className='text-gray-400'>Shipment cost</p>
                            <p className='font-semibold'>Rp{shipmentCost.toLocaleString('id-ID')}</p>
                        </div>
                    </div>
                    <div className='my-3 w-full border-t border-dashed border-gray-300'></div>
                    <div className='mb-3 flex justify-between'>
                        <p className='text-gray-400'>Grand total</p>
                        <p className='font-semibold'>Rp{grandTotal.toLocaleString('id-ID')}</p>
                    </div>
                    <Button className='w-full rounded-lg border border-gray-200 bg-white'>
                        Make Request
                    </Button>
                </div>
            </section>
            {/* PAYMENT SECTION END */}
        </div>
    )
};

export default RentPaymentScreen;

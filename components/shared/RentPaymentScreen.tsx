'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
    Table,
    TableBody,
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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { createTransactions } from '@/lib/actions/transaction.actions';
import { useRouter } from 'next/navigation';
import { shippingAddressEditSchema } from '@/lib/validator';
import { ITransaction } from '@/lib/database/models/transaction.model';
import { rentPayment } from '@/lib/actions/order.actions';

const RentPaymentScreen = ({ item, buyer, isConfirm }: { item: IItem | ITransaction, buyer: IUser, isConfirm: boolean }) => {
    const router = useRouter();
    const [forDate, setForDate] = React.useState<Date>()
    const [quantity, setQuantity] = useState((item as IItem).minOrder);
    const [subtotal, setSubtotal] = useState(0);
    const [shipmentCost, setShipmentCost] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const dateInputRef = useRef<HTMLInputElement | null>(null);
    const [shippingAddress, setShippingAddress] = useState(buyer.address);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempAddress, setTempAddress] = useState(buyer.address);

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

    const handleEditAddress = () => {
        setIsModalOpen(true);
    };

    const handleSaveAddress = () => {
        try {
            shippingAddressEditSchema.parse({ shippingAddress: tempAddress });
            setShippingAddress(tempAddress); 
            setIsModalOpen(false);
            toast.success('Shipping address updated successfully!',{position: "bottom-right",});
        } catch (error: any) {
            toast.error(error.errors[0]?.message || 'Invalid address',{position: "bottom-right",});
        }
    };

    const handleCancelEdit = () => {
        setTempAddress(shippingAddress);
        setIsModalOpen(false);
    };

    const handleCreateTransaction = async () => {
        if (!forDate) {
            toast.error('Please select a date for the rental.',{position: "bottom-right",});
            return;
        }
    
        if (!shippingAddress) {
            toast.error('Please provide a shipping address.',{position: "bottom-right",});
            return;
        }

        try {
            const transactionData = {
                paymentId: undefined,
                buyer: buyer._id,
                items: item._id,
                quantity,
                price: item.price,
                totalAmount: grandTotal,
                shippingAddress: shippingAddress,
                status: 'under consideration',
                forDate,
            };

            const createdTransaction = await createTransactions([transactionData] as any);
            toast.success('Transaction created successfully!',{position:"bottom-right"});
            console.log('Created transaction:', createdTransaction);
        } catch (error) {
            console.error('Error creating transaction:', error);
            toast.error('Failed to create transaction. Please try again.',{position:"bottom-right"});
        }

        router.push("/profile")
    };

    
    const onPay = async () => {

        const order = {
            buyer: (item as ITransaction).buyer, 
            itemsOrder: {
                _id: (item as ITransaction).items._id,
                name: (item as ITransaction).items.name,
                quantity: (item as ITransaction).quantity, 
                price: (item as ITransaction).price, 
                totalAmountPerItem: (item as ITransaction).totalAmount,
            },
            shipmentCost, 
            shippingAddress: (item as ITransaction).shippingAddress, 
            createdAt: new Date(),
            forDate: (item as ITransaction).forDate, 
        };

        let transactionId = (item as ITransaction)._id
    
        try {
            await rentPayment(order, transactionId); 
            console.log(order,"rent payment")
        } catch (error) {
            console.error('Error during payment:', error); 
        }
    };

    return !isConfirm ? (
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
                                            src={(item as IItem).imageUrl}
                                            alt="item image"
                                            width={300}
                                            height={300}
                                            className='w-32 h-3w-32 aspect-square object-cover object-center border border-gray-100 rounded-lg'
                                        />
                                        <div>
                                            <h1>{(item as IItem).organizer.firstName} {(item as IItem).organizer.lastName} ~ {(item as IItem).organizer.city}</h1>
                                            <h1 className='text-2xl font-semibold'>{(item as IItem).name}</h1>
                                            <p className='text-md text-gray-400'>Stock: {(item as IItem).stock}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Counter
                                        initialCount={(item as IItem).minOrder}
                                        onChange={(value) => checkFunction((item as IItem)._id, value)}
                                        minOrder={(item as IItem).minOrder}
                                        maxOrder={(item as IItem).stock}
                                    />
                                </TableCell>
                                <TableCell className='text-lg font-semibold'>Rp{(item as IItem).price.toLocaleString('id-ID')}</TableCell>
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
                                src={(item as IItem).imageUrl}
                                alt="item image"
                                width={200}
                                height={200}
                                className='w-20 h-20 aspect-square object-cover object-center border border-gray-100 rounded-lg'
                            />
                            <div className='flex flex-col'>
                                <h1 className='text-md text-ellipsis'>{(item as IItem).name}</h1><h4 className='text-lg font-bold'>
                                    Rp{((item as IItem).price * quantity).toLocaleString('id-ID')}
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
                                className='w-full input-field'
                            />
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "h-[54px] min-w-[54px] button",
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
                            <Input type='text' disabled placeholder='Add shipping address' value={shippingAddress} className='w-full input-field'/>
                            <Button onClick={handleEditAddress} className='h-[54px] min-w-[54px] button'>
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
                    <form action={handleCreateTransaction} method='post'>
                        <Button
                            type='submit'
                            role="link"
                            className="w-full button"
                        >
                            Make Request
                        </Button>
                    </form>
                </div>
            </section>
            {/* PAYMENT SECTION END */}

            {/* EDIT SHIPPING ADDRESS MODAL START */}
            {isModalOpen && (
                <div className='fixed top-0 left-0 w-full h-full bg-black/30 flex items-center justify-center'>
                    <div className='bg-white p-4 rounded-2xl border-gray-300 flex flex-col gap-y-4'>
                        <h1>Edit Shipping Address</h1>
                        <div className=''>
                            <Input
                                type='text'
                                value={tempAddress}
                                onChange={(e) => setTempAddress(e.target.value)}
                                placeholder='Enter new shipping address'
                                className='min-w-80 h-[50px] input-field '
                            />
                        </div>
                        <div className='w-full flex justify-between'>
                            <Button variant='outline' onClick={handleCancelEdit} className='w-[48%] button-recolorable bg-red-600 text-white hover:bg-red-700 hover:text-white'>
                                Cancel
                            </Button>
                            <Button onClick={handleSaveAddress} className='w-[48%] button'>
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {/* EDIT SHIPPING ADDRESS MODAL END */}
            
        </div>
    ) : (
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
                                <TableHead>Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <div className='flex gap-4'>
                                        <Image
                                            src={(item as ITransaction).items.imageUrl}
                                            alt="item image"
                                            width={300}
                                            height={300}
                                            className='w-32 h-3w-32 aspect-square object-cover object-center border border-gray-100 rounded-lg'
                                        />
                                        <div>
                                            <h1 className='text-2xl font-semibold'>{(item as ITransaction).items.name}</h1>
                                            <p className='text-md text-gray-400'>Stock: {(item as ITransaction).items.stock}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className='text-lg font-semibold'>Rp{(item as ITransaction).items.price.toLocaleString('id-ID')}</TableCell>
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
                                src={(item as ITransaction).items.imageUrl}
                                alt="item image"
                                width={200}
                                height={200}
                                className='w-20 h-20 aspect-square object-cover object-center border border-gray-100 rounded-lg'
                            />
                            <div className='flex flex-col'>
                                <h1 className='text-md text-ellipsis'>{(item as ITransaction).items.name}</h1><h4 className='text-lg font-bold'>
                                    Rp{((item as ITransaction).price * (item as ITransaction).quantity).toLocaleString('id-ID')}
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
                                value={(item as ITransaction).forDate ? format((item as ITransaction).forDate, 'yyyy-MM-dd') : ''}
                                ref={dateInputRef}
                                disabled
                                placeholder='Add shipping address'
                                className='w-full input-field'
                            />
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                    variant={"outline"}
                                    disabled
                                    className={cn(
                                        "h-[54px] min-w-[54px] button",
                                        !forDate && "text-muted-foreground"
                                    )}
                                    >
                                        <HiOutlineCalendar size={20}/>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                    mode="single"
                                    selected={(item as ITransaction).forDate}
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
                            <Input type='text' disabled placeholder='Add shipping address' value={(item as ITransaction).shippingAddress} className='w-full input-field'/>
                            <Button disabled onClick={handleEditAddress} className='h-[54px] min-w-[54px] button'>
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
                            <p className='font-semibold'>Rp{((item as ITransaction).quantity * (item as ITransaction).price).toLocaleString('id-ID')}</p>
                        </div>
                        <div className='flex justify-between'>
                            <p className='text-gray-400'>Shipment cost</p>
                            <p className='font-semibold'>Rp{(((item as ITransaction).quantity * (item as ITransaction).price) * 0.1).toLocaleString('id-ID')}</p>
                        </div>
                    </div>
                    <div className='my-3 w-full border-t border-dashed border-gray-300'></div>
                    <div className='mb-3 flex justify-between'>
                        <p className='text-gray-400'>Grand total</p>
                        <p className='font-semibold'>Rp{(item as ITransaction).totalAmount.toLocaleString('id-ID')}</p>
                    </div>
                    <form action={() => console.log("pay button")} method='post'>
                        <Button
                            type='submit'
                            role="link"
                            className="w-full button"
                        >
                            Pay
                        </Button>
                    </form>
                </div>
            </section>
            {/* PAYMENT SECTION END */}

            {/* EDIT SHIPPING ADDRESS MODAL START */}
            {isModalOpen && (
                <div className='fixed top-0 left-0 w-full h-full bg-black/30 flex items-center justify-center'>
                    <div className='bg-white p-4 rounded-2xl border-gray-300 flex flex-col gap-y-4'>
                        <h1>Edit Shipping Address</h1>
                        <div className=''>
                            <Input
                                type='text'
                                value={tempAddress}
                                onChange={(e) => setTempAddress(e.target.value)}
                                placeholder='Enter new shipping address'
                                className='min-w-80 h-[50px] input-field '
                            />
                        </div>
                        <div className='w-full flex justify-between'>
                            <Button variant='outline' onClick={handleCancelEdit} className='w-[48%] button-recolorable bg-red-600 text-white hover:bg-red-700 hover:text-white'>
                                Cancel
                            </Button>
                            <Button onClick={handleSaveAddress} className='w-[48%] button'>
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {/* EDIT SHIPPING ADDRESS MODAL END */}
            
        </div>
    )
};

export default RentPaymentScreen;

'use client';

import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { FiCheckSquare, FiSquare } from 'react-icons/fi';
import Image from 'next/image';
import { ICart } from '@/lib/database/models/cart.model';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Counter from './Counter';
import { IUser } from '@/lib/database/models/user.model';
import { deleteCartItem, getItemById } from '@/lib/actions/item.actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { addressShippingEditSchema } from '@/lib/validator';
import { loadStripe } from '@stripe/stripe-js';
import { checkoutOrder } from '@/lib/actions/order.actions';
import { CreateCheckoutParams, CreateOrderParams } from '@/types';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CartScreen = ({ cartContent, buyer }: { cartContent: Array<ICart & { itemDetails: any }>, buyer: IUser }) => {
    const [showModal, setShowModal] = useState(false);
    const [addressShipping, setAddressShipping] = useState(buyer.address);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempAddress, setTempAddress] = useState(buyer.address);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

    const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
        cartContent.reduce((acc, item) => {
            acc[item._id] = false;
            return acc;
        }, {} as Record<string, boolean>)
    );
    console.log(selectedItems)

    const [updatedCartContent, setUpdatedCartContent] = useState(cartContent);

    // Function to check if all items are selected
    const allChecked = Object.values(selectedItems).every((isSelected) => isSelected);

    // Function to toggle "select all" checkbox
    const toggleSelectAll = () => {
        const newState = !allChecked;
        setSelectedItems(
            cartContent.reduce((acc, item) => {
                acc[item._id] = newState;
                return acc;
            }, {} as Record<string, boolean>)
        );
    };

    // Function to toggle the selection state of individual items
    const toggleSelect = (itemId: string) => {
        setSelectedItems((prevState) => ({
            ...prevState,
            [itemId]: !prevState[itemId],
        }));
    };
    
    const handleDelete = async () => {
        if (!selectedItemId) return;
        setShowModal(false);
        try {
            await deleteCartItem({ id: selectedItemId }); // Call the API
            setUpdatedCartContent((prevCart) =>
                prevCart.filter((item) => item._id !== selectedItemId)
            );
            toast.success('Remove successfully!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.log(`Deleted item with ID: ${selectedItemId}`);
        } catch (error) {
            console.error(`Error deleting item with ID: ${selectedItemId}`, error);
            toast.error('Failed to delete the item. Please try again.', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    // Function to update item quantity
    const checkFunction = (itemId: string, value: number) => {
        console.log(`Updating item ${itemId} quantity to ${value}`);
        setUpdatedCartContent((prevCart) =>
            prevCart.map((item) =>
                item._id === itemId ? { ...item, quantity: value } : item
            )
        );
    };

    const subtotal = updatedCartContent
        .filter((cartItem) => selectedItems[cartItem._id])
        .reduce((total, cartItem) => total + cartItem.itemDetails.price * cartItem.quantity, 0);
    const shipmentCost = subtotal * 0.1;
    const grandTotal = subtotal + shipmentCost;

    const handleEditAddress = () => {
        setIsModalOpen(true);
    };
  
    const handleSaveAddress = () => {
        try {
            addressShippingEditSchema.parse({ addressShipping: tempAddress });
            setAddressShipping(tempAddress); 
            setIsModalOpen(false);
            toast.success('Shipping address updated successfully!',{position: "bottom-right",});
        } catch (error: any) {
            toast.error(error.errors[0]?.message || 'Invalid address',{position: "bottom-right",});
        }
    };

    const handleCancelEdit = () => {
        setTempAddress(addressShipping);
        setIsModalOpen(false);
    };

    
    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
          console.log('Order placed! You will receive an email confirmation.');
        }
    
        if (query.get('canceled')) {
          console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
    }, []);

    const onCheckout = async () => {

        const selectedCartItems = updatedCartContent.filter(
            (cartItem) => selectedItems[cartItem._id]
        );
    
        if (selectedCartItems.length === 0) {
            toast.error("Please select items to checkout.");
            return;
        }

        const order = {
            buyer: buyer._id, 
            itemsOrder: selectedCartItems.map((item) => ({
                _id: item.itemDetails._id,
                name: item.itemDetails.name,
                totalAmountPerItem: item.quantity * item.totalAmount
            })),
            shipmentCost, 
            shippingAddress: addressShipping, 
            createdAt: new Date(),
            forDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Current time + 2 days for Product
        };
    
        try {
            await checkoutOrder(order); 
            console.log(order,"checkout order")
            toast.success('Checkout Success!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            console.error('Error during checkout:', error); 
        }
    };

    return (
        <div className="wrapper flex flex-row justify-between">
            <section className="w-[850px]">
                <h1 className="h2-bold text-secondary-300 mb-2">Cart</h1>
                <div className="w-full bg-gray-50 rounded-xl shadow-md border border-gray-100 pb-5">
                    <Table>
                        <TableCaption>A list of your recent cart items.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="cursor-pointer" onClick={toggleSelectAll}>
                                    {allChecked ? (
                                        <FiCheckSquare size={20} className="text-secondary-300" />
                                    ) : (
                                        <FiSquare size={20} className="text-gray-500" />
                                    )}
                                </TableHead>
                                <TableHead>Product</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {updatedCartContent.map((cartItem) => (
                                <TableRow key={cartItem._id}>
                                    <TableCell
                                        className="w-5 cursor-pointer"
                                        onClick={() => toggleSelect(cartItem._id)}
                                    >
                                        {selectedItems[cartItem._id] ? (
                                            <FiCheckSquare size={20} className="text-secondary-300" />
                                        ) : (
                                            <FiSquare size={20} className="text-gray-500" />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-4">
                                            <Image
                                                src={cartItem.itemDetails.imageUrl}
                                                alt="item image"
                                                width={120}
                                                height={120}
                                                className="border border-gray-100 rounded-lg"
                                            />
                                            <div>
                                                <h1 className="text-2xl font-semibold">
                                                    {cartItem.itemDetails.name}
                                                </h1>
                                                <p className="text-md text-gray-400">
                                                    Stock: {cartItem.itemDetails.stock}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="flex flex-col gap-y-5 justify-center items-center">
                                        <Counter
                                            initialCount={cartItem.quantity}
                                            onChange={(value) => checkFunction(cartItem._id, value)}
                                            minOrder={cartItem.itemDetails.minOrder}
                                            maxOrder={cartItem.itemDetails.stock}
                                        />
                                        <button
                                            onClick={() => {
                                                setSelectedItemId(cartItem._id);
                                                console.log(cartItem._id)
                                                setShowModal(true);
                                            }}
                                            className="flex gap-2 items-center"
                                        >
                                            <Image
                                                src="/assets/icons/delete_bw.svg"
                                                alt="edit"
                                                width={20}
                                                height={20}
                                            />
                                            <p className="text-base">Remove</p>
                                        </button>
                                    </TableCell>
                                    <TableCell className="text-lg font-semibold">
                                        Rp{cartItem.itemDetails.price.toLocaleString('id-ID')}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>

            {/* PAYMENT SECTION START */}
            <section className="w-96 h-fit p-5 bg-gray-50 rounded-xl shadow-md border border-gray-100">
                <div>
                    <h1 className="text-lg font-semibold">Your order</h1>
                    <div className="flex flex-col gap-2">
                    {updatedCartContent.filter(cartItem => selectedItems[cartItem._id]).length === 0 ? (
                        <p className="text-center text-gray-500">Your cart is empty. Please add items to your cart.</p>
                    ) : (
                        updatedCartContent.filter(cartItem => selectedItems[cartItem._id]).map((cartItem) => (
                            <div className="flex gap-3" key={cartItem._id}>
                                <Image
                                    src={cartItem.itemDetails.imageUrl}
                                    alt="item image"
                                    width={80}
                                    height={80}
                                    className="border border-gray-100 rounded-lg"
                                />
                                <div className="flex flex-col">
                                    <h1 className="text-md text-ellipsis">{cartItem.itemDetails.name}</h1>
                                    <h4 className="text-lg font-bold">
                                        Rp{(cartItem.itemDetails.price * cartItem.quantity).toLocaleString('id-ID')}
                                    </h4>
                                </div>
                            </div>
                        ))
                    )}
                    </div>
                    <div className="my-3 w-full border-t border-dashed border-gray-300"></div>
                    <div className="flex flex-col gap-1">
                        <h1 className="text-lg font-semibold">Shipping Address</h1>
                        <div className="flex gap-2">
                            <Input
                                type="text"
                                placeholder="Add shipping address"
                                disabled
                                value={addressShipping}
                                className="w-full bg-white border-gray-200 rounded-lg h-[50px] placeholder:text-grey-300 text-md px-5 py-3 focus-visible:ring-transparent focus:ring-transparent !important focus-visible:ring-offset-0"
                            />
                            <Button onClick={handleEditAddress} className="h-[50px] min-w-[50px] p-0 bg-white rounded-lg border border-gray-300">
                                <Image
                                    src={'/assets/icons/edit_bw.svg'}
                                    alt="edit"
                                    width={20}
                                    height={20}
                                />
                            </Button>
                        </div>
                    </div>
                    <div className="my-3 w-full border-t border-dashed border-gray-300"></div>
                    <div>
                        <div className="flex justify-between">
                            <p className="text-gray-400">Subtotal</p>
                            <p className="font-semibold">
                                Rp{subtotal.toLocaleString('id-ID')}
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-400">Discount</p>
                            <p className="font-semibold">-Rp0</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-400">Shipment cost (10%)</p>
                            <p className="font-semibold">Rp{shipmentCost.toLocaleString('id-ID')}</p>
                        </div>
                    </div>
                    <div className="my-3 w-full border-t border-dashed border-gray-300"></div>
                    <div className="mb-3 flex justify-between">
                        <p className="text-gray-400">Grand total</p>
                        <p className="font-semibold">
                            Rp{grandTotal.toLocaleString('id-ID')}
                        </p>
                    </div>
                    <form action={onCheckout} method='post'>
                        <Button
                            type='submit'
                            className="w-full rounded-lg border border-gray-200 bg-white"
                            disabled={updatedCartContent.filter(cartItem => selectedItems[cartItem._id]).length === 0}
                        >
                            Continue to payment
                        </Button>
                    </form>
                </div>
            </section>
            {/* PAYMENT SECTION END */}

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <p>Are you sure you want to delete this item from the cart?</p>
                        <div className="flex justify-center gap-4 mt-4">
                            <Button onClick={handleDelete} className='w-20 bg-red-600 text-white'>Yes</Button>
                            <Button onClick={() => setShowModal(false)} className='w-20 border border-gray-300'>No</Button>
                        </div>
                    </div>
                </div>
            )}

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
                                className='bg-white border-gray-200 rounded-lg w-80 h-[50px] text-md px-5 py-3 outline-none focus-visible:ring-transparent focus:ring-transparent !important'
                            />
                        </div>
                        <div className='w-full flex justify-between'>
                            <Button variant='outline' onClick={handleCancelEdit} className='w-[48%] bg-red-600 text-white'>
                                Cancel
                            </Button>
                            <Button onClick={handleSaveAddress} className='w-[48%] border border-gray-300'>
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {/* EDIT SHIPPING ADDRESS MODAL END */}

        </div>
    );
};

export default CartScreen;

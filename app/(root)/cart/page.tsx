'use client'
import React, { useEffect, useMemo, useState } from 'react'
import AbandonedPage from '@/components/shared/AbandonedPage'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { FiCheckSquare, FiSquare } from "react-icons/fi";
import Image from 'next/image';
import Counter from '@/components/shared/Counter';
import { IItem } from '@/lib/database/models/item.model';
import { IUser } from '@/lib/database/models/user.model';
import { getUserByClerkId, getUserById } from '@/lib/actions/user.actions';
import { useAuth } from '@clerk/nextjs';
import { deleteCartItem, fetchCartItemsByBuyerId } from '@/lib/actions/cart.action';
import { getItemById } from '@/lib/actions/item.actions';
import { usePathname } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface GroupedCartItem {
    vendorData: IUser;
    items: IItem[];
}

type GroupedCartItems = {
    [vendorId: string]: GroupedCartItem;
};

const CartScreen = async () => {
    // const pathname = usePathname()
    // const { userId } = useAuth()
    // const [cartData, setCartData] = useState<any[]>([]);
    // const [buyerName, setBuyerName] = useState<string | null>(null);
    // const [buyerId, setBuyerId] = useState<string | null>(null);
    // const [shippingAddress, setShippingAddress] = useState<string | null>(null);
    // const [vendorChecked, setVendorChecked] = useState<Record<string, boolean>>({});
    // const [itemChecked, setItemChecked] = useState<Record<string, Record<string, boolean>>>({});
    // const [allChecked, setAllChecked] = useState(false);
    // const [itemAmounts, setItemAmounts] = useState<Record<string, number>>({});
    // const [groupedCartItems, setGroupedCartItems] = useState<GroupedCartItems>({});

    
    // useEffect(() => {
    //     const fetchCartData = async () => {
    //     try {
    //         const user = await getUserByClerkId(userId as string);
    //         const data = await fetchCartItemsByBuyerId(user._id);
    
    //         if (data) {
    //         // Ensure `data` is properly typed
    //         const cartItems = data as { items: string; vendor: string; _id: string; quantity: number }[];

    //         // Extract unique item IDs and vendor IDs
    //         const uniqueItemIds = [...new Set(cartItems.map((item) => item.items))];
    //         const uniqueVendorIds = [...new Set(cartItems.map((item) => item.vendor))];

    //         // Fetch product data for unique item IDs
    //         const itemPromises = uniqueItemIds.map((itemId) =>
    //             getItemById(itemId)
    //         );
    //         const itemsData = await Promise.all(itemPromises);

    //         // Fetch vendor data for unique vendor IDs
    //         const vendorPromises = uniqueVendorIds.map((vendorId) =>
    //             getUserById(vendorId)
    //         );
    //         const vendorsData = await Promise.all(vendorPromises);

    //         // Create a mapping for easy lookup
    //         const itemsMap = Object.fromEntries(
    //             itemsData.map((item) => [item._id, item])
    //         );
    //         const vendorsMap = Object.fromEntries(
    //             vendorsData.map((vendor) => [vendor._id, vendor])
    //         );

    //         const groupedByVendor = cartItems.reduce((acc : GroupedCartItems, item) => {
    //             const vendorId = item.vendor;
    //             if (!acc[vendorId]) {
    //             acc[vendorId] = { vendorData: vendorsMap[vendorId], items: [] };
    //             }
    //             acc[vendorId].items.push({
    //             ...itemsMap[item.items],
    //             cartId: item._id,
    //             quantity: item.quantity,
    //             });
    //             return acc;
    //         }, {});
    
    //         // Update states
    //         setCartData(data);
    //         const initialAmounts = data.reduce((acc: Record<string, number>, cartItem: any) => {
    //             acc[cartItem.items] = cartItem.quantity; 
    //             return acc;
    //         }, {});
            
    //         setItemAmounts(initialAmounts);
    //         setBuyerName(`${user?.firstName} ${user?.lastName}`);
    //         setBuyerId(user?._id)
    //         setShippingAddress(user?.address || null);
    //         setGroupedCartItems(groupedByVendor);
    //         } else {
    //         // Handle null data case
    //         setCartData([]);
    //         setItemAmounts({});
    //         setBuyerName(null);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching cart items at cart session:", error);
    //     }
    //     };
    
    //     fetchCartData();
    // }, [userId]);

    
    // const isCartEmpty = Object.keys(groupedCartItems).length === 0;

    // const handleVendorCheckboxChange = (vendorId: string, vendorItems: IItem[]) => {
    //     const isChecked = !vendorChecked[vendorId];
    //     setVendorChecked((prev) => ({ ...prev, [vendorId]: isChecked }));

    //     const updatedItemChecked = vendorItems.reduce((acc, item) => {
    //     acc[item._id] = isChecked;
    //     return acc;
    //     }, {} as Record<string, boolean>);

    //     setItemChecked((prev) => ({ ...prev, [vendorId]: updatedItemChecked }));
    // };

    // const handleItemCheckboxChange = (vendorId: string, itemId: string, vendorItems: IItem[]) => {
    //     setItemChecked((prev) => {
    //     const updatedVendorItems = {
    //         ...prev,
    //         [vendorId]: {
    //         ...prev[vendorId],
    //         [itemId]: !prev[vendorId]?.[itemId],
    //         },
    //     };

    //     // Check if all items are checked to update vendor checkbox state
    //     const allChecked = vendorItems.every(item => updatedVendorItems[vendorId]?.[item._id]);
    //     setVendorChecked((prevVendor) => ({ ...prevVendor, [vendorId]: allChecked }));

    //     return updatedVendorItems;
    //     });
    // };

    // // Handle Select All Checkbox
    // const handleAllItemsCheckboxChange = () => {
    //     if (isCartEmpty) return; // Prevent action when cart is empty

    //     const isAllChecked = !allChecked;
    //     setAllChecked(isAllChecked);

    //     const updatedVendorChecked = Object.keys(groupedCartItems).reduce((acc, vendorIdStr) => {
    //     const vendorId = vendorIdStr;
    //     acc[vendorId] = isAllChecked;
    //     return acc;
    //     }, {} as Record<string, boolean>);

    //     const updatedItemChecked = Object.keys(groupedCartItems).reduce((acc, vendorIdStr) => {
    //     const vendorId = vendorIdStr;
    //     const vendorItems = groupedCartItems[vendorId].items;
    //     acc[vendorId] = vendorItems.reduce((itemAcc, item) => {
    //         itemAcc[item._id] = isAllChecked;
    //         return itemAcc;
    //     }, {} as Record<string, boolean>);
    //     return acc;
    //     }, {} as Record<string, Record<number, boolean>>);

    //     setVendorChecked(updatedVendorChecked);
    //     setItemChecked(updatedItemChecked);
    // };

    // // Update "Select All" checkbox state based on individual checkboxes
    // useEffect(() => {
    //     const allVendorsChecked = Object.keys(groupedCartItems).every(vendorIdStr => {
    //     const vendorId = vendorIdStr;
    //     const vendorItems = groupedCartItems[vendorId].items;
    //     return vendorItems.every(item => itemChecked[vendorId]?.[item._id]);
    //     });

    //     setAllChecked(allVendorsChecked);
    // }, [itemChecked]);

    // const handleDeleteItem = async ( id : string, path: string) => {
    //     await deleteCartItem({id, path: pathname});
    //     const user = await getUserByClerkId(userId as string);
    //     const data = await fetchCartItemsByBuyerId(user._id);
    //     setCartData(data);
    // };

    // const handleAmountChange = (itemId: string, amount: number) => {
    //     setItemAmounts((prev) => ({ ...prev, [itemId]: amount }));
    // };

    // // Calculate the total price of checked items
    // const totalCheckedPrice = useMemo(() => {
    //     let total = 0;

    //     Object.keys(itemChecked).forEach((vendorIdStr) => {
    //     const vendorId = vendorIdStr;
    //     const vendorItems = groupedCartItems[vendorId].items;

    //     vendorItems.forEach((item) => {
    //         if (itemChecked[vendorId]?.[item._id]) {
    //         const amount = itemAmounts[item._id] || 1;
    //         total += item.price * amount;
    //         }
    //     });
    //     });

    //     return total;
    // }, [itemChecked, itemAmounts]);

    // // Get all item ischecked
    // const getCheckedItems = () => {
    //     const checkedItems: IItem[] = [];
    
    //     // Loop through each vendor in itemChecked
    //     Object.keys(itemChecked).forEach((vendorId) => {
    //     const vendorItems = groupedCartItems[vendorId].items;
    
    //     vendorItems.forEach((item) => {
    //         // Check if the item is checked in itemChecked state
    //         if (itemChecked[vendorId]?.[item._id]) {
    //         checkedItems.push(item); // Directly push the IItem
    //         }
    //     });
    //     });
    
    //     return checkedItems;
    // };
  
    // // Example usage: log the checked items
    // useEffect(() => {
    //     const checkedItems = getCheckedItems();
    // }, [itemChecked]);

    // Handle checkout and payment creation
    // const onCheckout = async () => {

    //     // Create a payment intent
    //     const total = totalCheckedPrice;
    //     const response = await createPaymentIntent(Math.floor(total * 100));
    //     if (response.error) {
    //     console.error('Error creating payment intent:', response.error);
    //     return;
    //     }

    //     // Initialize the Payment Sheet
    //     const { error: paymentSheetError } = await initPaymentSheet({
    //     merchantDisplayName,
    //     paymentIntentClientSecret: response,
    //     defaultBillingDetails: {
    //         name: buyerName as string,
    //     },
    //     });
    //     if (paymentSheetError) {
    //     Alert.alert('Something went wrong', paymentSheetError.message);
    //     return;
    //     }

    //     // Present the Payment Sheet from Stripe
    //     const { error: paymentError } = await presentPaymentSheet();
    //     if (paymentError) {
    //     Alert.alert(`Error code: ${paymentError.code}`, paymentError.message);
    //     return;
    //     }

    //     // Payment was successful
    //     Alert.alert('Payment successful', 'Your payment was processed successfully.');

    //     // Create the order (for all items)
    //     // Get the cart ids
    //     const checkedItems = getCheckedItems();
    //     const itemsOrder = checkedItems.map(item => ({_id: item.cartId}))
    //     // Create the order data
    //     const orderData: Partial<IOrder> = {
    //         stripeId: response,
    //         buyer: buyerId as string,
    //         itemsOrder: itemsOrder,
    //         totalAmount: total,
    //         shippingAddress: shippingAddress as string,
    //     };
    //     try {
    //     const addedOrder = await addOrder(orderData as IOrder);
    //     console.log('Order created successfully:', addedOrder);
    //     } catch (error) {
    //     console.error('Error creating order:', error);
    //     }

    //     // Create the transaction (per item)
    //     const transactionData  = checkedItems.map(item => ({
    //     paymentId: response,
    //     buyer: buyerId as string,
    //     items: item._id,
    //     quantity: (itemAmounts[item._id] || 1),
    //     price: item.price,
    //     totalAmount: (itemAmounts[item._id] || 1) * item.price,
    //     shippingAddress: shippingAddress as string,
    //     status: 'paid',
    //     }));

    //     // Add transactions to the server
    //     try {
    //     const addedTransactions = await addTransactions(transactionData as any);
    //     console.log('Transactions added successfully:', addedTransactions);
    //     } catch (error) {
    //     console.error('Error creating transaction:', error);
    //     }

    //     // Creat notification for buyer
    //     const toUserId = buyerId as string;
    //     const fromUser = {
    //     _id: '665728b935e40bdd1e329870', // Admin ID's
    //     name: 'Moore',
    //     imageUrl: 'https://utfs.io/f/3Dorr2QGMBZhREyG0rdhBrVTWjbJwQ45uLKRl8O7Adgn3yzs',
    //     };
    //     const message = `Thank you for your purchase! Your payment has been successfully processed. We are preparing your items for shipment. Stay tuned your transactions for updates!`;
    //     const notification = await postNotification(toUserId, fromUser, message);

    //     // Notify each vendor
    //     const vendorNotifications = checkedItems.map(async (item) => {
    //     const toVendorId = item.organizer._id;
    //     const fromUser = {
    //         _id: '665728b935e40bdd1e329870', // Admin ID
    //         name: 'Moore',
    //         imageUrl: 'https://utfs.io/f/3Dorr2QGMBZhREyG0rdhBrVTWjbJwQ45uLKRl8O7Adgn3yzs',
    //     };
    //     const vendorMessage = `Your item "${item.name}" has been purchased. Please check your transaction and prepare the item for shipment.`;
    //     return postNotification(toVendorId, fromUser, vendorMessage);
    //     });

    //     // Delete cart items
    //     const cartIds = checkedItems.map(item => item.cartId);
    //     const deleteResponse = await deleteCartItemsBatch(cartIds);

    //     setModalVisible(false)
    //     setEditAddressModalVisible(false)
    //     router.push("/transaction")
    // };

    const checkFunction = (itemId:string,value: number) => {
        console.log("value")
    }

    const itemId = ""

    return (
        <div className='wrapper flex flex-row justify-between'>
            {/* CART SECTION START */}
            <section className='w-[850px]'>
                <div>
                    <h1 className='h2-bold text-secondary-300 mb-2'>Cart</h1>
                </div>
                <div className='w-full bg-gray-50 rounded-xl shadow-md border border-gray-100 pb-5'>
                    <Table>
                        <TableCaption>A list of your recent cart items.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead><FiSquare size={20}/></TableHead>
                                <TableHead>Product</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className='w-5'><FiCheckSquare  size={20}/></TableCell>
                                <TableCell>
                                    <div className='flex gap-4'>
                                        <Image
                                            src={"/assets/images/products/candle_holder.jpg"}
                                            alt="item image"
                                            width={120}
                                            height={120}
                                            className='border border-gray-100 rounded-lg'
                                        />
                                        <div>
                                            <h1 className='text-2xl font-semibold'>Candle Holder</h1>
                                            <p className='text-md text-gray-400'>Stock: 99999</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className='flex flex-col gap-y-5 justify-center items-center'>
                                    <Counter initialCount={2} onChange={(value) => checkFunction(itemId, value)} minOrder={100} maxOrder={100}/>
                                    <div className='flex gap-2'>
                                        <Image src="/assets/icons/delete_bw.svg" alt="edit" width={20} height={20} />
                                        <p className='text-base'>Remove</p>
                                    </div>
                                </TableCell>
                                <TableCell className='text-lg font-semibold'>Rp 27.000</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className='w-5'><FiSquare size={20}/></TableCell>
                                <TableCell>
                                    <div className='flex gap-4'>
                                        <Image
                                            src={"/assets/images/products/jefe_flower.jpg"}
                                            alt="item image"
                                            width={120}
                                            height={120}
                                            className='border border-gray-100 rounded-lg'
                                        />
                                        <div>
                                            <h1 className='text-2xl font-semibold'>Jefe Flower</h1>
                                            <p className='text-md text-gray-400'>Stock: 99999</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className='flex flex-col gap-y-5 justify-center items-center'>
                                    <Counter initialCount={2} onChange={(value) => checkFunction(itemId, value)} minOrder={2} maxOrder={100}/>
                                    <div className='flex gap-2'>
                                        <Image src="/assets/icons/delete_bw.svg" alt="edit" width={20} height={20} />
                                        <p className='text-base'>Remove</p>
                                    </div>
                                </TableCell>
                                <TableCell className='text-lg font-semibold'>Rp 40.000</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className='w-5'><FiSquare size={20}/></TableCell>
                                <TableCell>
                                    <div className='flex gap-4'>
                                        <Image
                                            src={"/assets/images/products/honey_jar.jpg"}
                                            alt="item image"
                                            width={120}
                                            height={120}
                                            className='border border-gray-100 rounded-lg'
                                        />
                                        <div>
                                            <h1 className='text-2xl font-semibold'>Honey Jar</h1>
                                            <p className='text-md text-gray-400'>Stock: 99999</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className='flex flex-col gap-y-5 justify-center items-center'>
                                    <Counter initialCount={2} onChange={(value) => checkFunction(itemId, value)} minOrder={100} maxOrder={100}/>
                                    <div className='flex gap-2'>
                                        <Image src="/assets/icons/delete_bw.svg" alt="edit" width={20} height={20} />
                                        <p className='text-base'>Remove</p>
                                    </div>
                                </TableCell>
                                <TableCell className='text-lg font-semibold'>Rp 8.000</TableCell>
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
                                src={"/assets/images/products/candle_holder.jpg"}
                                alt="item image"
                                width={80}
                                height={80}
                                className='border border-gray-100 rounded-lg'
                            />
                            <div className='flex flex-col'>
                                <h1 className='text-md text-ellipsis'>Candle Holder</h1>
                                <h4 className='text-lg font-bold'>Rp 2.700.000</h4>
                            </div>
                        </div>
                    </div>
                    <div className='my-3 w-full border-t border-dashed border-gray-300'></div>
                    <div className='flex flex-col gap-1'>
                        <h1 className='text-lg font-semibold'>Shipping Address</h1>
                        <div className='flex gap-2'>
                            <Input type='text' placeholder='Add shipping address' className='w-full bg-white border-gray-200 rounded-lg h-[50px] placeholder:text-grey-300 text-md px-5 py-3 focus-visible:ring-transparent focus:ring-transparent !important focus-visible:ring-offset-0'/>
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
                            <p className='font-semibold'>Rp 2.700.00</p>
                        </div>
                        <div className='flex justify-between'>
                            <p className='text-gray-400'>Discount</p>
                            <p className='font-semibold'>0</p>
                        </div>
                        <div className='flex justify-between'>
                            <p className='text-gray-400'>Shipment cost</p>
                            <p className='font-semibold'>Rp.27.000</p>
                        </div>
                    </div>
                    <div className='my-3 w-full border-t border-dashed border-gray-300'></div>
                    <div className='mb-3 flex justify-between'>
                        <p className='text-gray-400'>Grand total</p>
                        <p className='font-semibold'>Rp 2.727.000</p>
                    </div>
                    <Button className='w-full rounded-lg border border-gray-200 bg-white'>
                        Continue to payment
                    </Button>
                </div>
            </section>
            {/* PAYMENT SECTION END */}
        </div>
    )
}

export default CartScreen


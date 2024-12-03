
// import React from 'react'
// import { TableCell, TableRow } from '../ui/table'
// import { FiCheckSquare } from 'react-icons/fi'
// import Image from 'next/image'
// import { getItemById } from '@/lib/actions/item.actions'
// import { deleteCartItem } from '@/lib/actions/cart.action'
// import { Button } from '../ui/button'

// type CollectionProps = {
//     id: string,
//     cartId: string
// }

// const CartCard = async ({id, cartId}: CollectionProps) => {
//     const cartItemData = await getItemById(id)
//     console.log(cartItemData, "cart data item")

//     const deleteItemFromCart = (cartId : string) => {
//         if (window.confirm('Are you sure you want to delete this item from the cart?')) {
//             const deleteParams = { id: cartId };
//             deleteCartItem(deleteParams)
//                 .then(() => {
//                     console.log(`Item with ID ${cartId} deleted successfully`);
//                 })
//                 .catch(error => {
//                     console.error('Error deleting the item:', error);
//                 });
//         }
//     };

//     return (
//         <>
//             <TableRow>
//                 <TableCell className='w-5'><FiCheckSquare  size={20}/></TableCell>
//                 <TableCell>
//                     <div className='flex gap-4'>
//                         <Image
//                             src={cartItemData.imageUrl}
//                             alt="item image"
//                             width={120}
//                             height={120}
//                             className='border border-gray-100 rounded-lg'
//                         />
//                         <div>
//                             <h1 className='text-2xl font-semibold'>{cartItemData.name}</h1>
//                             <p className='text-md text-gray-400'>Stock: {cartItemData.stock}</p>
//                         </div>
//                     </div>
//                 </TableCell>
//                 <TableCell className='flex flex-col gap-y-5 justify-center items-center'>
//                     <Counter initialCount={2} onChange={(value) => checkFunction(itemId, value)} minOrder={100} maxOrder={100}/>
//                     {/* <Button onClick={() => deleteItemFromCart(cartId)} className='flex gap-2 items-center'>
//                         <Image src="/assets/icons/delete_bw.svg" alt="edit" width={20} height={20} />
//                         <p className='text-base'>Remove</p>
//                     </Button> */}
//                 </TableCell>
//                 <TableCell className='text-lg font-semibold'>Rp{cartItemData.price}</TableCell>
//             </TableRow>
//         </>
//     )
//   }

// export default CartCard

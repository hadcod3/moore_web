import React from 'react'
import { formatDateTime, formatPrice } from '@/lib/utils'
import { getUserById } from '@/lib/actions/user.actions'
import { ITransaction } from '@/lib/database/models/transaction.model'
import { TableCell, TableRow } from '../ui/table'
import Link from 'next/link'
import Image from 'next/image'
import { IOrder } from '@/lib/database/models/order.model'
import { ICart } from '@/lib/database/models/cart.model'
import { IItem } from '@/lib/database/models/item.model'
import Counter from './Counter'
import { FiCheckSquare } from 'react-icons/fi'

type TransactionProps = {
    data: ITransaction | IOrder | ICart | IItem
    model: "Transaction" | "Order" | "Cart" | "Rental"
}
const TableItem = async ({ data, model } : TransactionProps) => {

    // if (model === "Transaction" || "IOrder"){
    //     const userData = await getUserById((data as ITransaction).buyer)
    //     return userData
    // }
    const userData = await getUserById((data as ITransaction).buyer)

    return (
        <>
            {model === "Order" ? (
                <TableRow
                    key={data._id}
                    className="p-regular-14 lg:p-regular-16 border-b "
                    style={{ boxSizing: 'border-box' }}>
                    <TableCell><p className="text-secondary-300 max-w-[6ch] overflow-x-auto whitespace-nowrap" style={{scrollbarWidth: 'none'}}>{(data as IOrder)._id}</p></TableCell>
                    <TableCell><p className="text-secondary-300 max-w-[6ch] overflow-x-auto whitespace-nowrap" style={{scrollbarWidth: 'none'}}>{userData.firstName} {userData.lastName}</p></TableCell>
                    <TableCell><p className="text-secondary-300 max-w-[6ch] overflow-x-auto whitespace-nowrap" style={{scrollbarWidth: 'none'}}>{(data as ITransaction).items.name}</p></TableCell>
                    <TableCell className="text-secondary-300">{(data as ITransaction).quantity}</TableCell>
                    <TableCell className="text-secondary-300">{formatPrice((data as ITransaction).price)}</TableCell>
                    <TableCell className="text-secondary-300">{formatPrice((data as ITransaction).totalAmount)}</TableCell>
                    <TableCell ><p className="text-secondary-300 max-w-[10ch] overflow-x-auto whitespace-nowrap" style={{scrollbarWidth: 'none'}}>{(data as ITransaction).shippingAddress}</p></TableCell>
                    <TableCell className={`${
                        (data as ITransaction).status === "success" || (data as ITransaction).status === "confirm" ? "text-green-600" :
                        (data as ITransaction).status === "rejected" ? "text-red-600" :
                        (data as ITransaction).status === "paid" || (data as ITransaction).status === "shipping" || (data as ITransaction).status === "packaging" || (data as ITransaction).status === "installation" ? "text-blue-600" :
                        (data as ITransaction).status === "under consideration" ? "text-yellow-600" : ""
                        }`}>{(data as ITransaction).status}</TableCell>
                    <TableCell><p className="text-secondary-300 max-w-[6ch] overflow-x-auto whitespace-nowrap" style={{scrollbarWidth: 'none'}}>{formatDateTime((data as ITransaction).createdAt)}</p></TableCell>
                    <TableCell><p className="text-secondary-300 max-w-[6ch] overflow-x-auto whitespace-nowrap" style={{scrollbarWidth: 'none'}}>{formatDateTime((data as ITransaction).forDate)}</p></TableCell>
                    <TableCell className="text-secondary-300">
                        <div className="flex flex-col gap-3 rounded-xl bg-white/30 w-11 h-fit py-3 items-center justify-center backdrop-blur-lg shadow-sm transition-all">
                            <Link href={`/items`}>
                                <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
                            </Link>
                        </div>
                    </TableCell>
                </TableRow>
            ) : model === "Transaction" ? (
                <TableRow
                    key={data._id}
                    className="p-regular-14 lg:p-regular-16 border-b "
                    style={{ boxSizing: 'border-box' }}>
                    <TableCell><p className="text-secondary-300 max-w-[20ch] overflow-x-auto whitespace-nowrap" style={{scrollbarWidth: 'none'}}>{(data as ITransaction).items.name}</p></TableCell>
                    <TableCell className="text-secondary-300">{(data as ITransaction).quantity}</TableCell>
                    <TableCell className="text-secondary-300">{formatPrice((data as ITransaction).totalAmount)}</TableCell>
                    <TableCell ><p className="text-secondary-300 max-w-[20ch] overflow-x-auto whitespace-nowrap" style={{scrollbarWidth: 'none'}}>{(data as ITransaction).shippingAddress}</p></TableCell>
                    <TableCell className={`${
                          (data as ITransaction).status === "success" || (data as ITransaction).status === "confirm" ? "text-green-600" :
                          (data as ITransaction).status === "rejected" ? "text-red-600" :
                          (data as ITransaction).status === "paid" || (data as ITransaction).status === "shipping" || (data as ITransaction).status === "packaging" || (data as ITransaction).status === "installation" ? "text-blue-600" :
                          (data as ITransaction).status === "under consideration" ? "text-yellow-600" : ""
                        }`}>{(data as ITransaction).status}</TableCell>
                    <TableCell><p className="text-secondary-300 max-w-[6ch] overflow-x-auto whitespace-nowrap" style={{scrollbarWidth: 'none'}}>{formatDateTime((data as ITransaction).createdAt)}</p></TableCell>
                    <TableCell><p className="text-secondary-300 max-w-[6ch] overflow-x-auto whitespace-nowrap" style={{scrollbarWidth: 'none'}}>{formatDateTime((data as ITransaction).forDate)}</p></TableCell>
                </TableRow>
            ) : model === "Rental" ?(
                <></>
            ) : (
                <TableRow>
                    <TableCell><p className="text-secondary-300 max-w-[10ch]">No Item</p></TableCell>
                </TableRow>
            )}
        </>
    )
}
 
export default TableItem


import React from 'react'
import { formatDateTime, formatPrice } from '@/lib/utils'
import { getUserById } from '@/lib/actions/user.actions'
import { ITransaction } from '@/lib/database/models/transaction.model'
import { TableCell, TableRow } from '../ui/table'
import { IOrder } from '@/lib/database/models/order.model'
import TransactionModal from './TransactionModal'
import { getItemById } from '@/lib/actions/item.actions'
import { IUser } from '@/lib/database/models/user.model'
import { auth } from '@clerk/nextjs'

type TransactionProps = {
    data: ITransaction | IOrder 
    model: "Transaction" | "Order"
}
const TableItem = async ({ data, model } : TransactionProps) => {
    const userData = await getUserById((data as ITransaction).buyer)
    let itemType = await getItemById((data as ITransaction).items._id)
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
    const currentUser : IUser = await getUserById(userId as string);
    itemType = itemType.type.name

    return (
        <>
            {model === "Order" ? (
                // TRANSACTION FOR VENDOR
                <TableRow
                    key={data._id}
                    className="p-regular-14 lg:p-regular-16 border-b "
                    style={{ boxSizing: 'border-box' }}>
                    <TableCell><p className="text-secondary-300 max-w-[6ch] overflow-x-auto whitespace-nowrap" style={{scrollbarWidth: 'none'}}>{(data as ITransaction)._id}</p></TableCell>
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
                        <TransactionModal value={data as ITransaction} buyer={`${userData.firstName} ${userData.lastName}`} itemType={itemType} currentUser={currentUser}/>
                    </TableCell>
                </TableRow>
            ) : model === "Transaction" ? (
                // TRANSACTION FOR CLIENT
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
                    <TableCell className="text-secondary-300">
                        <TransactionModal value={data as ITransaction} buyer={`${userData.firstName} ${userData.lastName}`} itemType={itemType} currentUser={currentUser}/>
                    </TableCell>
                </TableRow>
            ) : (
                <TableRow>
                    <TableCell><p className="text-secondary-300 max-w-[10ch]">No Item</p></TableCell>
                </TableRow>
            )}
        </>
    )
}
 
export default TableItem

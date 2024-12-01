import React from 'react'
import { formatDateTime, formatPrice } from '@/lib/utils'
import { getUserById } from '@/lib/actions/user.actions'
import { ITransaction } from '@/lib/database/models/transaction.model'
import { TableCell, TableRow } from '../ui/table'
import Link from 'next/link'
import Image from 'next/image'

type TransactionProps = {
    transaction: ITransaction
    isTransaction: boolean
}
const TableItem = async ({ transaction, isTransaction } : TransactionProps) => {

    const userData = await getUserById(transaction.buyer)

    return (
        <>
            {!isTransaction ? (
                <TableRow
                    className="p-regular-14 lg:p-regular-16 border-b "
                    style={{ boxSizing: 'border-box' }}>
                    <TableCell><p className="text-secondary-300 max-w-[6ch] overflow-x-auto whitespace-nowrap" style={{scrollbarWidth: 'none'}}>{transaction._id}</p></TableCell>
                    <TableCell><p className="text-secondary-300 max-w-[6ch] overflow-x-auto whitespace-nowrap" style={{scrollbarWidth: 'none'}}>{userData.firstName} {userData.lastName}</p></TableCell>
                    <TableCell><p className="text-secondary-300 max-w-[6ch] overflow-x-auto whitespace-nowrap" style={{scrollbarWidth: 'none'}}>{transaction.items.name}</p></TableCell>
                    <TableCell className="text-secondary-300">{transaction.quantity}</TableCell>
                    <TableCell className="text-secondary-300">{formatPrice(transaction.price)}</TableCell>
                    <TableCell className="text-secondary-300">{formatPrice(transaction.totalAmount)}</TableCell>
                    <TableCell ><p className="text-secondary-300 max-w-[10ch] overflow-x-auto whitespace-nowrap" style={{scrollbarWidth: 'none'}}>{transaction.shippingAddress}</p></TableCell>
                    <TableCell className={`${
                        transaction.status === "success" || transaction.status === "confirm" ? "text-green-600" :
                        transaction.status === "rejected" ? "text-red-600" :
                        transaction.status === "paid" || transaction.status === "shipping" || transaction.status === "packaging" || transaction.status === "installation" ? "text-blue-600" :
                        transaction.status === "under consideration" ? "text-yellow-600" : ""
                        }`}>{transaction.status}</TableCell>
                    <TableCell><p className="text-secondary-300 max-w-[6ch] overflow-x-auto whitespace-nowrap" style={{scrollbarWidth: 'none'}}>{formatDateTime(transaction.createdAt)}</p></TableCell>
                    <TableCell><p className="text-secondary-300 max-w-[6ch] overflow-x-auto whitespace-nowrap" style={{scrollbarWidth: 'none'}}>{formatDateTime(transaction.forDate)}</p></TableCell>
                    <TableCell className="text-secondary-300">
                        <div className="flex flex-col gap-3 rounded-xl bg-white/30 w-11 h-fit py-3 items-center justify-center backdrop-blur-lg shadow-sm transition-all">
                            <Link href={`/items`}>
                                <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
                            </Link>
                            {/* <Link href={`/items`}>
                                <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
                            </Link> */}
                        </div>
                    </TableCell>
                </TableRow>
            ) : (
                <TableRow
                    className="p-regular-14 lg:p-regular-16 border-b "
                    style={{ boxSizing: 'border-box' }}>
                    <TableCell><p className="text-secondary-300 max-w-[20ch] overflow-x-auto whitespace-nowrap" style={{scrollbarWidth: 'none'}}>{transaction.items.name}</p></TableCell>
                    <TableCell className="text-secondary-300">{transaction.quantity}</TableCell>
                    <TableCell className="text-secondary-300">{formatPrice(transaction.totalAmount)}</TableCell>
                    <TableCell ><p className="text-secondary-300 max-w-[20ch] overflow-x-auto whitespace-nowrap" style={{scrollbarWidth: 'none'}}>{transaction.shippingAddress}</p></TableCell>
                    <TableCell className={`${
                          transaction.status === "success" || transaction.status === "confirm" ? "text-green-600" :
                          transaction.status === "rejected" ? "text-red-600" :
                          transaction.status === "paid" || transaction.status === "shipping" || transaction.status === "packaging" || transaction.status === "installation" ? "text-blue-600" :
                          transaction.status === "under consideration" ? "text-yellow-600" : ""
                        }`}>{transaction.status}</TableCell>
                    <TableCell><p className="text-secondary-300 max-w-[6ch] overflow-x-auto whitespace-nowrap" style={{scrollbarWidth: 'none'}}>{formatDateTime(transaction.createdAt)}</p></TableCell>
                    <TableCell><p className="text-secondary-300 max-w-[6ch] overflow-x-auto whitespace-nowrap" style={{scrollbarWidth: 'none'}}>{formatDateTime(transaction.forDate)}</p></TableCell>
                </TableRow>
            )}
        </>
    )
}

export default TableItem

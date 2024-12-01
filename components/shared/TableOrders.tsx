import { IOrder } from '@/lib/database/models/order.model'
import React from 'react'
import TableItem from './TableItem'
import { TableCell, TableRow } from '../ui/table'
import { ITransaction } from '@/lib/database/models/transaction.model'

type CollectionProps = {
    data: ITransaction[],
    emptyTitle: string,
    emptyStateSubtext: string,
    isTransaction: boolean
}

const TableOrders = ({
    data,
    emptyTitle,
    emptyStateSubtext,
    isTransaction
  }: CollectionProps) => {
    return (
        <>
            {data.length > 0 ? (
                <>
                    {data.map((item) => {
                        return (
                            <TableItem key={item._id} transaction={item} isTransaction={isTransaction}/>
                        )
                    })}
                </>
            ) : (
            <TableRow>
                <TableCell>
                    <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
                    <p className="p-regular-14">{emptyStateSubtext}</p>
                </TableCell>
            </TableRow>
            )} 
        </>
    )
  }

export default TableOrders

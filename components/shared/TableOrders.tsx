import { IOrder } from '@/lib/database/models/order.model'
import React from 'react'
import TableItem from './TableItem'
import { TableCell, TableRow } from '../ui/table'
import { ITransaction } from '@/lib/database/models/transaction.model'
import { ICart } from '@/lib/database/models/cart.model'
import { IItem } from '@/lib/database/models/item.model'

type CollectionProps = {
    data: ITransaction[] | IOrder[] ,
    emptyTitle: string,
    emptyStateSubtext: string,
    model: "Transaction" | "Order"
}

const TableOrders = ({
    data,
    emptyTitle,
    emptyStateSubtext,
    model
  }: CollectionProps) => {
    return (
        <>
            {data.length > 0 ? (
                <>
                    {data.map((item) => {
                        return (
                            <TableItem key={item._id} data={item} model={model}/>
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

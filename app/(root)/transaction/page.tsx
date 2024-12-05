
import TableOrders from "@/components/shared/TableOrders"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getAllTransactions, getTransactionByBuyerId } from "@/lib/actions/transaction.actions"
import { getCurrentUserId } from "@/lib/utils_server"
import Link from "next/link"
import { useState } from "react"
import { IoIosArrowRoundBack } from "react-icons/io"
import { IoArrowBack } from "react-icons/io5"

const TransactionScreen = async () => {
    
    const userId = getCurrentUserId();
    let transactionData = await getTransactionByBuyerId(userId as string)
 
    return (
        <>
            <div className="wrapper flex justify-between">
                <div>
                    <h2 className="h2-bold font-playfair">Transaction</h2>
                </div>
                <Link href="/profile" className="button-ic">
                    <IoIosArrowRoundBack size={20}/>
                    <p>Back</p>
                </Link>
            </div>
            <section className="wrapper mt-8">
                <Table>
                    <TableCaption>A list of your recent transaction.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Item Name</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Total Amount</TableHead>
                            <TableHead>Shipping Address</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead>For Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableOrders
                        data={transactionData}
                        emptyTitle="No Transaction Found"
                        emptyStateSubtext="Check later"
                        model="Transaction"
                        />
                    </TableBody>
                </Table>
            </section>
        </>
    )
}

export default TransactionScreen

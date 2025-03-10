
import TableOrders from "@/components/shared/TableOrders"
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getAllTransactionsByItemsOrganizer, getAllTransactions } from "@/lib/actions/transaction.actions"
import { auth } from "@clerk/nextjs"
import Link from "next/link"
import { IoIosArrowRoundBack } from "react-icons/io"

const OrderScreen = async () => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
    let transactionData = await getAllTransactionsByItemsOrganizer(userId as string)
 
    // console.log(transactionData, userId, "getAllTransactionsByItemsOrganizer")
    return (
        <>
            <div className="wrapper flex justify-between">
                <div>
                    <h2 className="h2-bold font-playfair">Orders</h2>
                </div>
                <Link href="/profile" className="button-ic">
                    <IoIosArrowRoundBack size={20}/>
                    <p>Back</p>
                </Link>
            </div>
            <section className="wrapper mt-8">
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Buyer</TableHead>
                            <TableHead>Item Name</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Total Amount</TableHead>
                            <TableHead>Shipping Address</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead>For Date</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableOrders
                        data={transactionData}
                        emptyTitle="No Orders Found"
                        emptyStateSubtext="Check later"
                        model="Order"
                        />
                    </TableBody>
                </Table>
            </section>
        </>
    )
}

export default OrderScreen

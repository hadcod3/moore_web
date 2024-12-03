
import TableOrders from "@/components/shared/TableOrders"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getItemById } from "@/lib/actions/item.actions"
import { getTransactionByItemId } from "@/lib/actions/transaction.actions"
import { SearchParamProps } from "@/types"
import Link from "next/link"
import { IoArrowBack } from "react-icons/io5";

const TransactionScreen = async ({ params: { id } }: SearchParamProps) => {
    
    const paramsData = await getItemById(id)
    const transactionData = await getTransactionByItemId(id)
 
    return (
        <>
            <div className="wrapper flex justify-between">
                <div>
                    <h2 className="h2-bold font-playfair">Orders</h2>
                    <p className="font-playfair">{paramsData.data.name}</p>
                </div>
                <Button size="lg" className="button-ic w-36">
                    <IoArrowBack /> 
                    <Link href="/profile">
                        Back
                    </Link>
                </Button>
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

export default TransactionScreen

'use client'

import { useTransition } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { deletePacket } from '@/lib/actions/packet.actions'
import { deleteProduct } from '@/lib/actions/product.actions'
import { deleteGear } from '@/lib/actions/gear.actions'

type deleteProps = {
    itemId: string
    deleteType: "Packet" | "Product" | "Gear"
}

export const DeleteConfirmation = ({ itemId, deleteType } : deleteProps ) => {
    const pathname = usePathname()
    let [isPending, startTransition] = useTransition()

    return (
        <AlertDialog>
        <AlertDialogTrigger>
            <Image src="/assets/icons/delete.svg" alt="edit" width={20} height={20} />
        </AlertDialogTrigger>

        <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
            <AlertDialogDescription className="p-regular-16 text-primary-500">
                This will permanently delete this event
            </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className='bg-danger'
                onClick={() =>
                startTransition(async () => {
                    {deleteType === "Packet" ? (
                        await deletePacket({ packetId : itemId, path: pathname })
                    ) : deleteType === "Product" ? (
                        await deleteProduct({ productId : itemId, path: pathname })
                    ) : (
                        await deleteGear({ gearId : itemId, path: pathname })
                    )}
                })
                }>
                {isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    )
}

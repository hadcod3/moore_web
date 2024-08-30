'use client'
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
} from "@/components/ui/alert-dialog"
import { Input } from "../ui/input";
import { startTransition, useState } from "react";
import { Toaster } from "../ui/toaster";
import { useToast } from "../ui/use-toast";
import { createVendorPermit } from "@/lib/actions/vendor.actions";
import { IVendorPermit } from "@/lib/database/models/vendor.model";

type VerificationProps = {
    userId: string
}

const VerificationButton = ({ userId } : VerificationProps ) => {
    const [permits, setPermits] = useState<IVendorPermit[]>([]);
    const { toast } = useToast()

    const formatDateTime = (date: Date): string => {
        
        const dayFormatter = new Intl.DateTimeFormat('id-ID', { weekday: 'long' });
        const dateFormatter = new Intl.DateTimeFormat('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
        const timeFormatter = new Intl.DateTimeFormat('id-ID', { hour: 'numeric', minute: 'numeric', hour12: true });
    
        const day = dayFormatter.format(date);
        const datePart = dateFormatter.format(date);
        const timePart = timeFormatter.format(date);
    
        return (`${day}, ${datePart} at ${timePart}`);
    };
    
    const currentDate = new Date();
    const dateTime = formatDateTime(currentDate);

    const handleVerificationVendor = async () => {
        // const newPermission = await createVendorPermit({ _id: userId, isVendor: false });

        // startTransition(() => { 
        //     toast(
        //         {title: "Verification was submitted",
        //         description: dateTime}
        //     );

        //     setPermits((prevPermits) => [...prevPermits, newPermission]);
        // });
    }
    
    return (
        <AlertDialog>
            <AlertDialogTrigger className="button-ic flex justify-center items-center py-2 w-[180px]">Be Vendor</AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                    <AlertDialogTitle>Verification Alert!</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                    onClick={handleVerificationVendor} className="bg-primary-300"
                    >Add</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default VerificationButton
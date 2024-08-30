import Image from "next/image"
import { Button } from "../ui/button"

type VendorProps = {
    vendorAva: string,
    vendorName: string,
}

const VendorCard = ({ vendorAva, vendorName } : VendorProps) => {
    return (
        <div className='flex flex-wrap gap-2 justify-between items-center p-3 rounded-md bg-grey-100/60'>
            <div className='flex gap-3'>
                <Image
                src={vendorAva}
                alt="avatar"
                width={50}
                height={50}
                className="object-cover object-center rounded-full"
                />
                <div className='flex flex-col'>
                    <p className='text-sm italic text-primary-500/70'>vendor</p>
                    <p className='p-medium-20 text-secondary-300 capitalize'>{vendorName}</p>
                </div>
            </div>
            <div className='flex gap-1 items-center'>
                <Button className='p-medium-16 text-white bg-primary-400 w-[120px] border-2 border-primary-400 rounded-[10px]'>Ikuti</Button>
                <Button className='p-medium-16 text-primary-400 bg-primary-100/0 w-[120px] border-2 border-primary-400 rounded-[10px]'>Profil</Button>
            </div>
        </div>
    )
}

export default VendorCard
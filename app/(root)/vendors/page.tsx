
import { getAllVendors } from "@/lib/actions/user.actions"
import Image from "next/image"
import { RxSewingPin } from "react-icons/rx";
import { IUser } from "@/lib/database/models/user.model"
import { getItemsByOrganizerId } from "@/lib/actions/item.actions";
import Link from "next/link";
 
const fetchItemsByVendor = async ({ organizerId, typeId}: { organizerId: string; typeId: string;}) => {
    try {
      const items = await getItemsByOrganizerId({organizerId, typeId});
      return items?.data?.length || 0;
    } catch (error) {
      return 0;
    }
};

const Vendors = async () => {
    const packetTypeId = "6717aa0a78fed7ee045a8402" // ID of packet type
    const productTypeId = "6717aa0a78fed7ee045a8403" // ID of product type
    const gearTypeId = "6717aa0a78fed7ee045a8401" // ID of gear type
    
    const vendors = await getAllVendors()
    const vendorItems = await Promise.all(
        vendors.map(async (vendor : IUser) => ({
          vendor,
          packetCount: await fetchItemsByVendor({
            organizerId: vendor._id,
            typeId: packetTypeId,
          }),
          productCount: await fetchItemsByVendor({
            organizerId: vendor._id,
            typeId: productTypeId,
          }),
          gearCount: await fetchItemsByVendor({
            organizerId: vendor._id,
            typeId: gearTypeId,
          }),
        }))
    );

    return (
        <>
            <section className="wrapper my-8 flex flex-col md:gap-12">
                <div className="flex w-full flex-col gap-5 py-5 md:flex-row">
                </div>
                {vendorItems.length > 0 ? (
                    <ul className="flex flex-row flex-wrap gap-5 justify-center">
                        {vendorItems.map(({vendor, packetCount, productCount, gearCount}) => (
                            <Link key={vendor._id} href={`/vendors/${vendor._id}`} className="w-48 h-60 flex flex-col items-center p-4 rounded-2xl shadow-lg border border-gray-100 transform transition-shadow ease-in-out duration-300 hover:shadow-xl">
                                <Image
                                    src={vendor.photo}
                                    alt="user avatar"
                                    width={64}
                                    height={64}
                                    className="object-contain object-center w-16 h-16 aspect-square rounded-full overflow-hidden"
                                />
                                <h1 className="text-base font-semibold line-clamp-1">{vendor.firstName} {vendor.lastName}</h1>
                                <div className="flex flex-row items-center line-clamp-1"><RxSewingPin size={14} /><p className="text-xs ">{vendor.city}</p></div>
                                <div className="h-20 flex justify-center items-center">
                                    <div className="flex flex-col px-4 items-center">
                                        <h1 className="text-sm">{packetCount}</h1>
                                        <Image
                                            src="/assets/icons/ic_packet.png"
                                            alt="packet"
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                    <div className="flex flex-col px-4 items-center border-l border-r border-gray-300">
                                        <h1 className="text-sm">{productCount}</h1>
                                        <Image
                                            src="/assets/icons/ic_product.png"
                                            alt="product"
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                    <div className="flex flex-col px-4 items-center">
                                        <h1 className="text-sm">{gearCount}</h1>
                                        <Image
                                            src="/assets/icons/ic_gear.png"
                                            alt="gear"
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </ul>
                ) : (
                    <div>no vendor</div>
                )}
            </section>
        </>
    )
}

export default Vendors

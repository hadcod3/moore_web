import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import NavItems from "./NavItems"
import MobileNav from "./MobileNav"
import { BsCart3 } from "react-icons/bs";
import { IoEllipsisHorizontal, IoNotificationsOutline, IoReceiptOutline } from "react-icons/io5"
import { getNotificationByToId } from "@/lib/actions/notification.actions"
import { getCurrentUserId, notificationData } from "@/lib/utils_server"

const Header = () => {
    // const [notToggle, setNotToggle] = useState(false)
    // const [notifications, setNotifications] = useState([]);
    // const userId = getCurrentUserId();

    // const notData = notificationData(userId as string)
    // setNotifications(notData)

    // const notificationData = await getNotificationByToId('')

    // const toggleNotification = () => {
    //     setNotToggle(prevNot => !prevNot)
    // }
    // console.log(notifications)

    return (
        <header className="w-full h-[75px] shadow fixed inset-0 z-50 bg-white/30 backdrop-blur-lg">
            <div className="wrapper flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/assets/images/moore_logo_bw.png"
                        alt="Had Wedding Logo"
                        width={36}
                        height={36}
                    />
                    <h2 className="text-3xl font-bold font-playfair text-secondary-300">Moore</h2>
                </Link>

                {/* Nav Item when user already sign in */}
                <SignedIn>
                    <nav className="md:flex-between hidden w-full max-w-sm">
                        <NavItems/>
                    </nav>
                </SignedIn>

                <div className="flex w-32 justify-end gap-3">
                    <SignedIn>
                        <div className="flex items-center gap-6">
                            <div className="relative flex items-center justify-center">
                                {/* <button onClick={toggleNotification}> */}
                                <button>
                                    <IoNotificationsOutline size={24} />
                                </button>
                                {/* {notToggle && (
                                    <div className="absolute top-10 right-0 w-26 h-fit bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                                        <div className="mb-3 pb-2 border-b border-gray-200 flex justify-between items-center">
                                            <h1>Notifications</h1>
                                            <IoEllipsisHorizontal size={16}/>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="w-[300px] flex gap-2">
                                                <div className="min-w-[50px] w-[50px] min-h-[50px] h-[50px] rounded-2xl p-2 border border-primary-300 overflow-hidden">
                                                    <Image
                                                        src="/assets/images/clover.png"
                                                        alt="flower"
                                                        width={50}
                                                        height={50}
                                                        className="object-cover object-center"
                                                    />
                                                </div>
                                                <div className="text-left">
                                                    <h1 className="text-sm font-semibold">Moore</h1>
                                                    <p className="text-xs line-clamp-1 flex-wrap">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa necessitatibus ipsum cum neque odio alias autem rem. Nam, maiores tenetur.</p>
                                                    <p className="text-xs italic text-gray-300">11:16 PM • 29.10.2024</p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                )} */}
                            </div>
                            <Link href={"/transaction"}>
                                <IoReceiptOutline size={24} />
                            </Link>
                            <Link href={"/cart"}>
                                <BsCart3 size={24} />
                            </Link>
                            <UserButton afterSignOutUrl="/" />
                            <MobileNav/>
                        </div>
                    </SignedIn>
                    <SignedOut>
                        <Button asChild className="rounded-full bg-primary-300 text-white" size="lg">
                            <Link href="/sign-in">Login</Link>
                        </Button>
                    </SignedOut>
                </div>
            </div>
        </header>
    )
}

export default Header
